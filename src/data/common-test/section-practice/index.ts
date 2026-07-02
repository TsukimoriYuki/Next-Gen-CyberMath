import type { CommonTestMockExam } from "@/data/common-test-mock-exams";
import { NUMBERS_EXPRESSIONS_PRACTICES } from "./numbers-expressions-practice";
import { SETS_LOGIC_PRACTICES } from "./sets-logic-practice";
import { FUSION_PRACTICES } from "./fusion-practice";

// 大問1問分の単独演習（大問型演習）を1箇所に集約する。
// 冊子型模試（PDF正本、4大問・70分）とは別物で、第3回PDF模試の代わりに
// 「診断→復習→再演習」の往復を強化するために追加した。
export const SECTION_PRACTICE_EXAMS: CommonTestMockExam[] = [
  ...NUMBERS_EXPRESSIONS_PRACTICES,
  ...SETS_LOGIC_PRACTICES,
  ...FUSION_PRACTICES,
];

export function getSectionPracticeExam(id: string): CommonTestMockExam | undefined {
  return SECTION_PRACTICE_EXAMS.find((exam) => exam.id === id);
}

export {
  NUMBERS_EXPRESSIONS_PRACTICES,
  SETS_LOGIC_PRACTICES,
  FUSION_PRACTICES,
};
