import type { CourseSubject, CourseUnit } from "@/types/course";

const units: CourseUnit[] = [
  {
    unitId: "trigonometric-functions",
    subjectId: "math-2bc",
    unitTitle: "三角関数",
    unitDescription: "加法定理、合成、方程式・不等式、グラフの読み取りを扱う単元です。",
    lessons: [],
  },
  {
    unitId: "exponential-logarithmic",
    subjectId: "math-2bc",
    unitTitle: "指数・対数関数",
    unitDescription: "指数法則、対数の性質、指数・対数方程式、グラフを整理します。",
    lessons: [],
  },
  {
    unitId: "calculus",
    subjectId: "math-2bc",
    unitTitle: "微分・積分",
    unitDescription: "接線、増減、面積計算など、入試頻出の基本手順を扱います。",
    lessons: [],
  },
  {
    unitId: "sequences",
    subjectId: "math-2bc",
    unitTitle: "数列",
    unitDescription: "等差数列、等比数列、和、漸化式の基礎を整理します。",
    lessons: [],
  },
  {
    unitId: "statistics",
    subjectId: "math-2bc",
    unitTitle: "統計的な推測",
    unitDescription: "標本平均、信頼区間、仮説検定の考え方を扱う単元です。",
    lessons: [],
  },
  {
    unitId: "vectors",
    subjectId: "math-2bc",
    unitTitle: "ベクトル",
    unitDescription: "座標、内分点、内積、図形への応用を整理します。",
    lessons: [],
  },
];

export const MATH_2BC_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-2bc",
  subjectName: "数学II・B・C",
  description:
    "三角関数、指数・対数、微分積分、数列、統計、ベクトルを単元ごとに整理します。",
  color: "#7c3aed",
  units,
};

