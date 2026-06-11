// ── 共通テスト EXAM SIMULATOR — 問題取得ユーティリティ ───────────────────

import { COMMON_TEST_DRILL_QUESTIONS } from "@/data/common-test-drills";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { getCommonTestExamPreset } from "@/data/common-test-exams";

export function getCommonTestExamQuestions(examId: string): CommonTestDrillQuestion[] {
  const preset = getCommonTestExamPreset(examId);
  if (!preset) return [];
  return COMMON_TEST_DRILL_QUESTIONS.filter(
    (q) =>
      q.subjectId === preset.subjectId &&
      preset.sectionIds.includes(q.sectionId)
  ).sort((a, b) => {
    const sa = parseInt(a.sectionId.replace("section-", ""), 10);
    const sb = parseInt(b.sectionId.replace("section-", ""), 10);
    if (sa !== sb) return sa - sb;
    return a.id.localeCompare(b.id);
  });
}
