import type { CommonTestMockExam } from "@/data/common-test-mock-exams";
import { getCommonTestMockExam } from "@/data/common-test-mock-exams";
import {
  scoreCommonTestMockExam,
  type CommonTestMockAnswers,
} from "@/lib/common-test-mock-scoring";
import { getClientIp, rateLimit, rateLimitJson } from "@/lib/rate-limit";
import { canAccessSubjectResource } from "@/lib/subject-publication";

const MAX_BODY_BYTES = 64 * 1024;
const MAX_DURATION_SEC = 8 * 60 * 60;
const SESSION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{7,127}$/;
const TOP_LEVEL_KEYS = new Set([
  "examId",
  "sessionId",
  "durationSec",
  "answers",
  // Accepted only for old/new client compatibility. These values are validated,
  // then deliberately ignored in favor of the server-side result.
  "score",
  "maxScore",
  "weakTags",
]);

type ValidatedSubmission = {
  exam: CommonTestMockExam;
  sessionId: string;
  durationSec: number;
  answers: CommonTestMockAnswers;
};

export type ExamAttemptWriteData = {
  sessionId: string;
  tags: string[];
  difficulties: string[];
  problemSlugs: string[];
  timeLimitSec: number;
  wrongSlugs: string[];
  score: number;
  totalCount: number;
  durationSec: number;
  weakTags: string[];
  userId: string | null;
};

export type ExamAttemptApiDependencies = {
  getSession: () => Promise<{ sub: string } | null>;
  persistAttempt: (data: ExamAttemptWriteData) => Promise<{ id: string }>;
  findExam?: (examId: string) => CommonTestMockExam | undefined;
  applyRateLimit?: (
    key: string,
  ) => { ok: boolean; remaining: number; retryAfter: number };
};

type ValidationResult =
  | { ok: true; value: ValidatedSubmission }
  | { ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBoundedInteger(value: unknown, min: number, max: number): value is number {
  return typeof value === "number" && Number.isFinite(value) && Number.isInteger(value) && value >= min && value <= max;
}

function validateOptionalClientScore(body: Record<string, unknown>, key: "score" | "maxScore") {
  return !(key in body) || isBoundedInteger(body[key], 0, 10_000);
}

function findPublishedExam(examId: string): CommonTestMockExam | undefined {
  const exam = getCommonTestMockExam(examId);
  if (
    !exam ||
    exam.status !== "published" ||
    exam.devOnly ||
    !canAccessSubjectResource(exam.subject, "exams")
  ) {
    return undefined;
  }
  return exam;
}

export function validateExamAttemptPayload(
  input: unknown,
  findExam: (examId: string) => CommonTestMockExam | undefined = findPublishedExam,
): ValidationResult {
  if (!isRecord(input)) return { ok: false, error: "payload must be an object" };
  for (const key of Object.keys(input)) {
    if (!TOP_LEVEL_KEYS.has(key)) return { ok: false, error: `unexpected field: ${key}` };
  }

  const { examId, sessionId, durationSec, answers } = input;
  if (typeof examId !== "string" || examId.length > 100) {
    return { ok: false, error: "invalid examId" };
  }
  const exam = findExam(examId);
  if (!exam) return { ok: false, error: "unknown or unpublished examId" };
  if (typeof sessionId !== "string" || !SESSION_ID_PATTERN.test(sessionId)) {
    return { ok: false, error: "invalid sessionId" };
  }
  if (!isBoundedInteger(durationSec, 0, MAX_DURATION_SEC)) {
    return { ok: false, error: "invalid durationSec" };
  }
  if (!validateOptionalClientScore(input, "score") || !validateOptionalClientScore(input, "maxScore")) {
    return { ok: false, error: "invalid client score" };
  }
  if (
    "weakTags" in input &&
    (!Array.isArray(input.weakTags) ||
      input.weakTags.length > 50 ||
      !input.weakTags.every((tag) => typeof tag === "string" && tag.length <= 64))
  ) {
    return { ok: false, error: "invalid weakTags" };
  }
  if (!Array.isArray(answers) || answers.length > 100) {
    return { ok: false, error: "answers must be a bounded array" };
  }

  const questions = exam.sections.flatMap((section) => section.questions);
  const questionById = new Map(questions.map((question) => [question.id, question]));
  const seenQuestionIds = new Set<string>();
  const normalizedAnswers: CommonTestMockAnswers = {};

  for (const rawAnswer of answers) {
    if (!isRecord(rawAnswer)) return { ok: false, error: "invalid answer entry" };
    if (Object.keys(rawAnswer).some((key) => !["questionId", "value", "blanks"].includes(key))) {
      return { ok: false, error: "unexpected answer field" };
    }
    const questionId = rawAnswer.questionId;
    if (typeof questionId !== "string" || seenQuestionIds.has(questionId)) {
      return { ok: false, error: "invalid or duplicate questionId" };
    }
    seenQuestionIds.add(questionId);
    const question = questionById.get(questionId);
    if (!question) return { ok: false, error: "unknown questionId" };

    if (question.blanks && question.blanks.length > 0) {
      if ("value" in rawAnswer || !Array.isArray(rawAnswer.blanks)) {
        return { ok: false, error: "blank question requires blanks array" };
      }
      const validBlankIds = new Set(question.blanks.map((blank) => blank.id));
      const seenBlankIds = new Set<string>();
      const blankRecord: Record<string, string> = {};
      for (const rawBlank of rawAnswer.blanks) {
        if (!isRecord(rawBlank) || Object.keys(rawBlank).some((key) => !["blankId", "value"].includes(key))) {
          return { ok: false, error: "invalid blank entry" };
        }
        const { blankId, value } = rawBlank;
        if (
          typeof blankId !== "string" ||
          !validBlankIds.has(blankId) ||
          seenBlankIds.has(blankId)
        ) {
          return { ok: false, error: "unknown or duplicate blankId" };
        }
        if (typeof value !== "string" || value.length > 100) {
          return { ok: false, error: "invalid blank value" };
        }
        seenBlankIds.add(blankId);
        blankRecord[blankId] = value;
      }
      normalizedAnswers[questionId] = blankRecord;
      continue;
    }

    if ("blanks" in rawAnswer || !("value" in rawAnswer)) {
      return { ok: false, error: "non-blank question requires value" };
    }
    if (question.answerFormat === "multi-choice") {
      if (
        !Array.isArray(rawAnswer.value) ||
        rawAnswer.value.length > 20 ||
        !rawAnswer.value.every((value) => typeof value === "string" && value.length <= 100) ||
        new Set(rawAnswer.value).size !== rawAnswer.value.length
      ) {
        return { ok: false, error: "invalid multi-choice value" };
      }
      normalizedAnswers[questionId] = rawAnswer.value;
    } else {
      if (typeof rawAnswer.value !== "string" || rawAnswer.value.length > 100) {
        return { ok: false, error: "invalid answer value" };
      }
      normalizedAnswers[questionId] = rawAnswer.value;
    }
  }

  return {
    ok: true,
    value: { exam, sessionId, durationSec, answers: normalizedAnswers },
  };
}

export async function handleExamAttemptPost(
  request: Request,
  dependencies: ExamAttemptApiDependencies,
): Promise<Response> {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "payload too large" }, { status: 413 });
  }

  const rawBody = await request.text().catch(() => "");
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return Response.json({ ok: false, error: "payload too large" }, { status: 413 });
  }
  const body = (() => {
    try {
      return JSON.parse(rawBody) as unknown;
    } catch {
      return null;
    }
  })();
  const session = await dependencies.getSession();
  const untrustedSessionId =
    isRecord(body) && typeof body.sessionId === "string" && body.sessionId.length <= 128
      ? body.sessionId
      : "invalid";
  const limitKey = `exam-attempt:${getClientIp(request)}:${session?.sub ?? untrustedSessionId}`;
  const limited = (dependencies.applyRateLimit ?? ((key) => rateLimit(key, { limit: 6, windowMs: 60_000 })))(limitKey);
  if (!limited.ok) return rateLimitJson(limited.retryAfter);

  const parsed = validateExamAttemptPayload(body, dependencies.findExam ?? findPublishedExam);
  if (!parsed.ok) {
    return Response.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const { exam, answers, durationSec, sessionId } = parsed.value;
  const score = scoreCommonTestMockExam(exam, answers);
  const questionIds = exam.sections.flatMap((section) =>
    section.questions.map((question) => question.id),
  );
  const wrongQuestionIds = score.questionResults
    .filter((result) => !result.isCorrect)
    .map((result) => result.question.id);

  try {
    const attempt = await dependencies.persistAttempt({
      sessionId,
      tags: ["common-test", exam.subject],
      difficulties: [],
      problemSlugs: questionIds,
      timeLimitSec: exam.durationMinutes * 60,
      wrongSlugs: wrongQuestionIds,
      score: score.totalScore,
      totalCount: exam.totalPoints,
      durationSec,
      weakTags: score.weakTags,
      userId: session?.sub ?? null,
    });

    return Response.json({
      ok: true,
      id: attempt.id,
      score: score.totalScore,
      maxScore: exam.totalPoints,
      weakTags: score.weakTags,
      unansweredCount: score.unansweredCount,
    });
  } catch (error) {
    console.error("exam attempt save failed:", error);
    return Response.json({ ok: false, error: "db error" }, { status: 500 });
  }
}
