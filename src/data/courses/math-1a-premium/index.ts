import type { CourseSubject, CourseUnit } from "@/types/course";
import { QUADRATIC_PREMIUM_UNIT } from "./quadratic";

function createPremiumUnit(unitId: string, unitTitle: string): CourseUnit {
  return {
    unitId,
    subjectId: "math-1a-premium",
    unitTitle,
    unitDescription: `${unitTitle}の発展講座は準備中です。入試標準から応用レベルまで扱う詳しい解説と実戦例題を追加予定です。`,
    lessons: [],
  };
}

export const MATH_1A_PREMIUM_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-1a-premium",
  subjectName: "数学I・A 有料版",
  description:
    "数学I・Aの内容を、入試標準〜応用レベルまで深く扱う発展講座です。無料版よりも詳しい解説、入試頻出パターン、つまずきやすいポイント、実戦的な例題を追加予定です。",
  color: "#db2777",
  courseKind: "premium",
  status: "preparing",
  statusLabel: "準備中",
  badges: ["有料版", "準備中"],
  units: [
    createPremiumUnit("numbers-sets-logic-advanced", "数と式・集合と論理"),
    QUADRATIC_PREMIUM_UNIT,
    createPremiumUnit("figures-measurement-advanced", "図形と計量"),
    createPremiumUnit("data-analysis-advanced", "データの分析"),
    createPremiumUnit("counting-probability-advanced", "場合の数と確率"),
    createPremiumUnit("integer-advanced", "整数の性質"),
    createPremiumUnit("geometry-properties-advanced", "図形の性質"),
  ],
};

export * from "./quadratic";
