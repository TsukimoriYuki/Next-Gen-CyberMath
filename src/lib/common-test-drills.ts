// ── 共通テストドリル取得ユーティリティ ──────────────────────────────────
import {
  COMMON_TEST_DRILL_QUESTIONS,
  type CommonTestDrillQuestion,
  type CommonTestSubjectId,
} from "@/data/common-test-drills";

export function getCommonTestDrillsBySubject(
  subjectId: CommonTestSubjectId
): CommonTestDrillQuestion[] {
  return COMMON_TEST_DRILL_QUESTIONS.filter((q) => q.subjectId === subjectId);
}

export function getCommonTestDrillsBySection(
  subjectId: CommonTestSubjectId,
  sectionId: string
): CommonTestDrillQuestion[] {
  return COMMON_TEST_DRILL_QUESTIONS.filter(
    (q) => q.subjectId === subjectId && q.sectionId === sectionId
  );
}

export function getCommonTestDrillById(
  id: string
): CommonTestDrillQuestion | undefined {
  return COMMON_TEST_DRILL_QUESTIONS.find((q) => q.id === id);
}

export interface SectionSummary {
  sectionId: string;
  questionCount: number;
  difficulties: { BASIC: number; STANDARD: number; HARD: number };
  estimatedMinutes: number;
  allSkillTags: string[];
}

export function getCommonTestSectionSummary(
  subjectId: CommonTestSubjectId,
  sectionId: string
): SectionSummary {
  const questions = getCommonTestDrillsBySection(subjectId, sectionId);
  const difficulties = { BASIC: 0, STANDARD: 0, HARD: 0 };
  let estimatedMinutes = 0;
  const tagSet = new Set<string>();

  for (const q of questions) {
    difficulties[q.difficulty]++;
    estimatedMinutes += q.estimatedMinutes;
    q.skillTags.forEach((t) => tagSet.add(t));
  }

  return {
    sectionId,
    questionCount: questions.length,
    difficulties,
    estimatedMinutes,
    allSkillTags: Array.from(tagSet),
  };
}
