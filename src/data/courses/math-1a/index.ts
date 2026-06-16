import type { CourseSubject } from "@/types/course";
import { COUNTING_PROBABILITY_UNIT } from "./counting-probability";
import { DATA_ANALYSIS_UNIT } from "./data-analysis";
import { FIGURES_AND_MEASUREMENT_UNIT } from "./figures-and-measurement";
import { GEOMETRY_PROPERTIES_UNIT } from "./geometry-properties";
import { INTEGERS_UNIT } from "./integers";
import { NUMBERS_AND_EXPRESSIONS_UNIT } from "./numbers-and-expressions";
import { getCourseUnit } from "./quadratic";
import { SETS_AND_LOGIC_UNIT } from "./sets-and-logic";

const quadraticUnit = getCourseUnit("math-1a", "quadratic");

export const MATH_1A_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-1a",
  subjectName: "数学IA",
  description:
    "数と式、集合と命題、二次関数、図形と計量、データの分析、場合の数と確率を単元ごとに整理します。",
  color: "#2563eb",
  units: [
    NUMBERS_AND_EXPRESSIONS_UNIT,
    SETS_AND_LOGIC_UNIT,
    ...(quadraticUnit
      ? [
          {
            ...quadraticUnit,
            subjectId: "math-1a",
            unitTitle: "二次関数",
            unitDescription:
              "放物線の基本、平方完成、最大・最小、定義域つき問題まで段階的に学ぶ単元です。",
          },
        ]
      : []),
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
