// ── 共通テスト EXAM SIMULATOR — 問題取得ユーティリティ ───────────────────

import { COMMON_TEST_DRILL_QUESTIONS } from "@/data/common-test-drills";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { getCommonTestExamPreset } from "@/data/common-test-exams";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";

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

/** 指定大問のみに絞り込む（選択制プリセットの開始時に使用。元の並び順を保持） */
export function filterExamQuestionsBySections(
  questions: CommonTestDrillQuestion[],
  sectionIds: string[]
): CommonTestDrillQuestion[] {
  const allowed = new Set(sectionIds);
  return questions.filter((q) => allowed.has(q.sectionId));
}

export interface ExamSectionInfo {
  sectionId: string;
  sectionNumber: number;
  title: string;
  maxScore: number;
  questionCount: number;
}

/** プリセットの大問情報（タイトル・配点・問題数）を科目定義から引く */
export function getExamSectionInfos(
  preset: CommonTestExamPreset,
  questions: CommonTestDrillQuestion[]
): ExamSectionInfo[] {
  const subject = COMMON_TEST_SUBJECTS_MAP[preset.subjectId];
  return preset.sectionIds
    .map((sectionId) => {
      const num = parseInt(sectionId.replace("section-", ""), 10);
      const section = subject.sections.find((s) => s.number === num);
      return {
        sectionId,
        sectionNumber: num,
        title: section?.title ?? `第${num}問`,
        maxScore: section?.maxScore ?? 0,
        questionCount: questions.filter((q) => q.sectionId === sectionId).length,
      };
    })
    .sort((a, b) => a.sectionNumber - b.sectionNumber);
}
