import type { CommonTestMockExam } from "../src/data/common-test-mock-exams";
import { COMMON_TEST_MATH_1A_MANUAL_002 } from "../src/data/common-test/manual-mocks/math1a-002";
import {
  handleExamAttemptPost,
  type ExamAttemptWriteData,
} from "../src/lib/exam-attempt-api";

const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

type SerializedAnswer =
  | { questionId: string; value: string | string[] }
  | { questionId: string; blanks: Array<{ blankId: string; value: string }> };

function hasBlanks(
  answer: SerializedAnswer,
): answer is Extract<SerializedAnswer, { blanks: unknown }> {
  return "blanks" in answer;
}

function serializePerfectAnswers(exam: CommonTestMockExam): SerializedAnswer[] {
  return exam.sections.flatMap((section) =>
    section.questions.map((question) =>
      question.blanks && question.blanks.length > 0
        ? {
            questionId: question.id,
            blanks: question.blanks.map((blank) => ({
              blankId: blank.id,
              value: blank.correctAnswer,
            })),
          }
        : {
            questionId: question.id,
            value:
              typeof question.answer === "string" || Array.isArray(question.answer)
                ? question.answer
                : "",
          },
    ),
  );
}

function request(body: unknown, ip = "203.0.113.10") {
  return new Request("http://localhost/api/exam/attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

async function submit({
  body,
  authenticatedUserId = null,
  findExam,
  ip,
  useRealRateLimit = false,
}: {
  body: unknown;
  authenticatedUserId?: string | null;
  findExam?: (examId: string) => CommonTestMockExam | undefined;
  ip?: string;
  useRealRateLimit?: boolean;
}) {
  let stored: ExamAttemptWriteData | null = null;
  const response = await handleExamAttemptPost(request(body, ip), {
    getSession: async () =>
      authenticatedUserId ? { sub: authenticatedUserId } : null,
    persistAttempt: async (data) => {
      stored = data;
      return { id: "attempt-test" };
    },
    findExam,
    applyRateLimit: useRealRateLimit
      ? undefined
      : () => ({ ok: true, remaining: 5, retryAfter: 0 }),
  });
  return {
    response,
    json: (await response.json()) as Record<string, unknown>,
    stored: stored as ExamAttemptWriteData | null,
  };
}

const exam = COMMON_TEST_MATH_1A_MANUAL_002;
const basePayload = {
  examId: exam.id,
  sessionId: "11111111-2222-4333-8444-555555555555",
  durationSec: 3600,
  answers: serializePerfectAnswers(exam),
};

async function main() {
  const normal = await submit({ body: basePayload });
  check(normal.response.status === 200, `normal submission should be 200, got ${normal.response.status}`);
  check(normal.stored?.score === 100, `normal submission should store score 100, got ${normal.stored?.score}`);
  check(normal.stored?.totalCount === 100, "max score must come from the server exam data");
  check(normal.stored?.userId === null, "anonymous submission must not invent a userId");

  const tampered = await submit({
    body: { ...basePayload, score: 0, maxScore: 1, weakTags: ["forged"] },
  });
  check(tampered.response.status === 200, "bounded client score fields may be accepted for compatibility");
  check(tampered.stored?.score === 100, "client score must be ignored and recomputed");
  check(tampered.stored?.totalCount === 100, "client maxScore must be ignored and recomputed");
  check(!tampered.stored?.weakTags.includes("forged"), "client weakTags must be ignored");

  const fictional = await submit({ body: { ...basePayload, examId: "fictional-exam" } });
  check(fictional.response.status === 400, "fictional examId must be rejected");

  for (const [label, durationSec] of [["negative", -1], ["huge", 28_801], ["NaN", null]] as const) {
    const result = await submit({ body: { ...basePayload, durationSec } });
    check(result.response.status === 400, `${label} duration must be rejected`);
  }
  const hugeScore = await submit({ body: { ...basePayload, score: Number.MAX_SAFE_INTEGER } });
  check(hugeScore.response.status === 400, "huge client score must be rejected");

  const invalidBlankAnswers = serializePerfectAnswers(exam);
  const blankEntry = invalidBlankAnswers.find(
    (answer) => hasBlanks(answer) && answer.blanks.length > 0,
  );
  const firstBlank = blankEntry && hasBlanks(blankEntry) ? blankEntry.blanks[0] : null;
  if (firstBlank && blankEntry && hasBlanks(blankEntry)) {
    blankEntry.blanks[0] = { ...firstBlank, blankId: "not-a-real-blank" };
  }
  const invalidBlank = await submit({ body: { ...basePayload, answers: invalidBlankAnswers } });
  check(invalidBlank.response.status === 400, "unknown blankId must be rejected");

  const duplicateBlankAnswers = serializePerfectAnswers(exam);
  const duplicateEntry = duplicateBlankAnswers.find(
    (answer) => hasBlanks(answer) && answer.blanks.length > 0,
  );
  if (duplicateEntry && hasBlanks(duplicateEntry)) {
    duplicateEntry.blanks.push({ ...duplicateEntry.blanks[0] });
  }
  const duplicateBlank = await submit({ body: { ...basePayload, answers: duplicateBlankAnswers } });
  check(duplicateBlank.response.status === 400, "duplicate blankId must be rejected");

  const duplicateQuestion = await submit({
    body: { ...basePayload, answers: [basePayload.answers[0], basePayload.answers[0]] },
  });
  check(duplicateQuestion.response.status === 400, "duplicate questionId must be rejected");

  const missing = await submit({ body: { ...basePayload, answers: [] } });
  check(missing.response.status === 200, "missing answers must be treated as unanswered, not malformed");
  check(missing.stored?.score === 0, "missing answers must score 0 on the server");
  check(missing.json.unansweredCount === 9, "missing answers must report every question unanswered");

  const partialAnswers = serializePerfectAnswers(exam);
  const partialEntry = partialAnswers.find(
    (answer) => answer.questionId === "m1a-manual-002-s1-1-sets" && hasBlanks(answer),
  );
  if (partialEntry && hasBlanks(partialEntry)) partialEntry.blanks[0].value = "__wrong__";
  const partial = await submit({ body: { ...basePayload, answers: partialAnswers } });
  check(partial.stored?.score === 96, `one wrong scoring group should store 96, got ${partial.stored?.score}`);

  const numericExam: CommonTestMockExam = {
    id: "numeric-api-test",
    title: "numeric API test",
    subject: "math-1a",
    durationMinutes: 1,
    totalPoints: 100,
    targetAverage: { min: 0, max: 100 },
    source: "manual-pdf",
    status: "published",
    sections: [
      {
        id: "section-1",
        title: "section",
        unit: "test",
        points: 100,
        estimatedMinutes: 1,
        theme: "test",
        leadText: "test",
        questions: [
          {
            id: "numeric-question",
            prompt: "8を入力",
            answerFormat: "numeric",
            points: 100,
            difficulty: "basic",
            skillTags: ["数値"],
            commonMistakes: [],
            answer: "8",
            explanation: "8",
            measuredAbility: "数値入力",
            timeSavingTip: "なし",
          },
        ],
      },
    ],
  };
  const numeric = await submit({
    body: {
      examId: numericExam.id,
      sessionId: basePayload.sessionId,
      durationSec: 1,
      answers: [{ questionId: "numeric-question", value: "08.000" }],
    },
    findExam: (examId) => (examId === numericExam.id ? numericExam : undefined),
  });
  check(numeric.stored?.score === 100, "numeric equivalent answer must score on the server");

  const authenticated = await submit({
    body: basePayload,
    authenticatedUserId: "trusted-user-id",
  });
  check(authenticated.stored?.userId === "trusted-user-id", "authenticated userId must come from the signed session");
  const spoofedUser = await submit({ body: { ...basePayload, userId: "attacker" } });
  check(spoofedUser.response.status === 400, "client-supplied userId must be rejected");
  const spoofedTimestamp = await submit({ body: { ...basePayload, createdAt: "2099-01-01" } });
  check(spoofedTimestamp.response.status === 400, "client-supplied timestamp must be rejected");

  const rateIp = "203.0.113.77";
  const statuses: number[] = [];
  for (let index = 0; index < 7; index += 1) {
    statuses.push(
      (await submit({ body: basePayload, ip: rateIp, useRealRateLimit: true })).response.status,
    );
  }
  check(statuses.slice(0, 6).every((status) => status === 200), "first six submissions should pass rate limit");
  check(statuses[6] === 429, "seventh submission in one minute must be rate limited");

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`exam-attempt API QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log("exam-attempt API QA passed: validation, server scoring, partial credit, auth binding, and rate limit.");
}

void main();
