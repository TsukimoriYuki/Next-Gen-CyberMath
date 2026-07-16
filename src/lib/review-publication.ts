import { getSpecialLectureBySlug } from "@/data/specialLectures";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { getCommonTestDrillById } from "@/lib/common-test-drills";
import { getProblem } from "@/lib/content";
import { getCommonTestMockExam } from "@/data/common-test-mock-exams";
import {
  canAccessSubject,
  resolveTopLevelSubjectId,
  type SubjectPublicationRuntime,
  resolveSubjectPublicationRuntime,
} from "@/lib/subject-publication";

export type ReviewPublicationInput = Readonly<{
  itemId: string;
  itemType: string;
  subjectId: string | null | undefined;
}>;

const PUBLIC_ENGLISH_REVIEW_ITEM_IDS = new Set<string>([
  ...SPEED_READING_PROBLEMS.flatMap((problem) => [
    problem.id,
    `english/speed-reading/${problem.id}`,
  ]),
  ...COMPREHENSION_PROBLEMS.flatMap((problem) => [
    problem.id,
    `english/comprehension/${problem.id}`,
  ]),
  ...MULTI_SOURCE_PROBLEMS.flatMap((problem) => [
    problem.id,
    `english/multi-source/${problem.id}`,
  ]),
]);

const SUPPORTED_REVIEW_ITEM_TYPES = new Set([
  "math-problem",
  "english-problem",
  "common-test-lecture",
  "common-test-drill",
  "informatics-exam",
]);

export function resolveLectureTopLevelSubjectId(
  lectureSubject: string,
): "math" | "english" | undefined {
  if (lectureSubject.includes("英語")) return "english";
  if (lectureSubject.includes("数学")) return "math";
  return undefined;
}

function resolveLectureReviewSubjectId(itemId: string): string | undefined {
  const match = /^lecture:([^:]+):(.+)$/.exec(itemId);
  if (!match) return undefined;

  const lecture = getSpecialLectureBySlug(match[1]);
  if (
    !lecture ||
    !lecture.blocks.some(
      (block) => block.type === "problem" && block.id === match[2],
    )
  ) {
    return undefined;
  }

  return resolveLectureTopLevelSubjectId(lecture.subject);
}

function inferReviewSubjectId(
  itemType: string,
  itemId: string,
): string | undefined {
  if (itemType === "math-problem") {
    return getProblem(itemId) ? "math" : undefined;
  }
  if (itemType === "english-problem") {
    return PUBLIC_ENGLISH_REVIEW_ITEM_IDS.has(itemId) ? "english" : undefined;
  }
  if (itemType === "common-test-lecture") {
    return resolveLectureReviewSubjectId(itemId);
  }
  if (itemType === "common-test-drill") {
    return resolveTopLevelSubjectId(getCommonTestDrillById(itemId)?.subjectId);
  }
  if (itemType === "informatics-exam") {
    const exists = getCommonTestMockExam("informatics-original-mock-001")?.sections.some(
      (section) => section.questions.some((question) => question.id === itemId),
    );
    return exists ? "informatics" : undefined;
  }
  return undefined;
}

/**
 * Old rows may have a null subjectId. Infer those from their stable item type
 * or registered drill ID, but never accept an unknown non-null subject ID.
 */
export function resolveReviewTopLevelSubjectId({
  itemId,
  itemType,
  subjectId,
}: ReviewPublicationInput): string | undefined {
  if (!SUPPORTED_REVIEW_ITEM_TYPES.has(itemType)) return undefined;
  const inferred = inferReviewSubjectId(itemType, itemId);
  if (
    (itemType === "math-problem" ||
      itemType === "english-problem" ||
      itemType === "common-test-lecture" ||
      itemType === "common-test-drill" ||
      itemType === "informatics-exam") &&
    !inferred
  ) {
    return undefined;
  }
  if (subjectId == null || subjectId === "") return inferred;

  const explicit = resolveTopLevelSubjectId(subjectId);
  if (!explicit) return undefined;
  if (inferred && inferred !== explicit) return undefined;
  return explicit;
}

export function canAccessReviewItem(
  input: ReviewPublicationInput,
  runtime: SubjectPublicationRuntime = resolveSubjectPublicationRuntime(),
): boolean {
  const subjectId = resolveReviewTopLevelSubjectId(input);
  return Boolean(
    subjectId && canAccessSubject(subjectId, "review", runtime),
  );
}
