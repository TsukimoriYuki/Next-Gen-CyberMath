import type { CourseSubject } from "@/types/course";
import { COUNTING_PROBABILITY_UNIT } from "./counting-probability";
import { DATA_ANALYSIS_UNIT } from "./data-analysis";
import { FIGURES_AND_MEASUREMENT_UNIT } from "./figures-and-measurement";
import { GEOMETRY_PROPERTIES_UNIT } from "./geometry-properties";
import { INTEGERS_UNIT } from "./integers";
import { NUMBERS_AND_EXPRESSIONS_UNIT } from "./numbers-and-expressions";
import { QUADRATIC_UNIT } from "./quadratic";
import { SETS_AND_LOGIC_UNIT } from "./sets-and-logic";

const QUADRATIC_UNIT_DESCRIPTION =
  "二次関数は、平方完成や判別式を覚えるだけの単元ではありません。最大最小、共有点・解の個数、文字の場合分け、解の配置、整数条件、絶対値・平方根・分数の定義条件を、問題文に応じて選び分ける単元です。基礎講座で軸・頂点・グラフを固め、完全攻略講座で初手・分岐・例外・検算まで判断できる状態を目指します。";

export const MATH_1A_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-1a",
  parentSubjectId: "math",
  subjectName: "数学IA",
  description:
    "数と式、集合と命題、二次関数、図形と計量、データの分析、場合の数と確率を単元ごとに整理します。",
  color: "#2563eb",
  units: [
    NUMBERS_AND_EXPRESSIONS_UNIT,
    SETS_AND_LOGIC_UNIT,
    {
      ...QUADRATIC_UNIT,
      subjectId: "math-1a",
      unitTitle: "二次関数",
      unitDescription: QUADRATIC_UNIT_DESCRIPTION,
    },
    FIGURES_AND_MEASUREMENT_UNIT,
    DATA_ANALYSIS_UNIT,
    COUNTING_PROBABILITY_UNIT,
    INTEGERS_UNIT,
    GEOMETRY_PROPERTIES_UNIT,
  ],
};

export * from "./counting-probability";
export * from "./data-analysis";
export * from "./figures-and-measurement";
export * from "./geometry-properties";
export * from "./integers";
export * from "./numbers-and-expressions";
export * from "./quadratic";
export * from "./sets-and-logic";
