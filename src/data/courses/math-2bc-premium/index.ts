import type { CourseSubject, CourseUnit } from "@/types/course";

function createPremiumUnit(unitId: string, unitTitle: string): CourseUnit {
  return {
    unitId,
    subjectId: "math-2bc-premium",
    unitTitle,
    unitDescription: `${unitTitle}の発展編は内容設計中です。詳しい解説と実戦的な問題を、単元ごとに順次追加していきます。`,
    lessons: [],
  };
}

export const MATH_2BC_PREMIUM_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-2bc-premium",
  subjectName: "数学II・B・C 発展編",
  description:
    "数学II・B・Cの内容を、入試標準〜応用レベルまで体系的に扱う発展編です。関数、図形、数列、ベクトル、統計などを深く掘り下げ、実戦的な解法まで単元ごとに追加していきます。",
  color: "#c2410c",
  courseKind: "premium",
  status: "preparing",
  statusLabel: "内容設計中",
  badges: ["発展編", "構想中"],
  units: [
    createPremiumUnit("expression-proof-advanced", "式と証明"),
    createPremiumUnit("complex-equations-advanced", "複素数と方程式"),
    createPremiumUnit("geometry-equations-advanced", "図形と方程式"),
    createPremiumUnit("trigonometric-functions-advanced", "三角関数"),
    createPremiumUnit("exponential-logarithmic-advanced", "指数関数・対数関数"),
    createPremiumUnit("calculus-advanced", "微分法・積分法"),
    createPremiumUnit("sequences-advanced", "数列"),
    createPremiumUnit("statistics-advanced", "統計的な推測"),
    createPremiumUnit("vectors-advanced", "ベクトル"),
    createPremiumUnit("plane-curves-advanced", "平面曲線"),
  ],
};
