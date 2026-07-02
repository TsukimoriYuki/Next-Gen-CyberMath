import type { CourseSubject, CourseUnit } from "@/types/course";
import { QUADRATIC_PREMIUM_UNIT } from "./quadratic";

function createPremiumUnit(unitId: string, unitTitle: string): CourseUnit {
  return {
    unitId,
    subjectId: "math-1a-premium",
    unitTitle,
    unitDescription: `${unitTitle}の発展編は内容設計中です。入試標準から応用レベルまで扱う詳しい解説と実戦例題を、単元ごとに順次追加していきます。`,
    lessons: [],
  };
}

export const MATH_1A_PREMIUM_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-1a-premium",
  subjectName: "数学I・A 発展編",
  description:
    "数学I・Aの内容を、入試標準〜応用レベルまで深く扱う発展編です。詳しい解説、入試頻出パターン、つまずきやすいポイント、実戦的な例題を単元ごとに追加していきます。",
  color: "#db2777",
  courseKind: "premium",
  status: "preparing",
  statusLabel: "内容設計中",
  badges: ["発展編", "構想中"],
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
