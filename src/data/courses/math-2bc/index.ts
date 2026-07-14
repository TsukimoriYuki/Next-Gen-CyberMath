import type { CourseSubject } from "@/types/course";
import { CALCULUS_2_UNIT } from "./calculus-2";
import { COMPLEX_EQUATIONS_UNIT } from "./complex-equations";
import { EXPONENTIAL_LOGARITHMIC_FUNCTIONS_UNIT } from "./exponential-logarithmic-functions";
import { EXPRESSION_PROOF_UNIT } from "./expression-proof";
import { GEOMETRY_EQUATIONS_UNIT } from "./geometry-equations";
import { PLANE_CURVES_UNIT } from "./plane-curves";
import { SEQUENCES_UNIT } from "./sequences";
import { STATISTICS_UNIT } from "./statistics";
import { TRIGONOMETRIC_FUNCTIONS_UNIT } from "./trigonometric-functions";
import { VECTORS_UNIT } from "./vectors";

export const MATH_2BC_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-2bc",
  parentSubjectId: "math",
  subjectName: "数学II・B・C",
  description:
    "式と証明、複素数と方程式、図形と方程式、三角関数、指数・対数関数、微分・積分、数列、統計、ベクトルを単元ごとに整理します。",
  color: "#7c3aed",
  units: [
    EXPRESSION_PROOF_UNIT,
    COMPLEX_EQUATIONS_UNIT,
    GEOMETRY_EQUATIONS_UNIT,
    TRIGONOMETRIC_FUNCTIONS_UNIT,
    EXPONENTIAL_LOGARITHMIC_FUNCTIONS_UNIT,
    CALCULUS_2_UNIT,
    SEQUENCES_UNIT,
    STATISTICS_UNIT,
    VECTORS_UNIT,
    PLANE_CURVES_UNIT,
  ],
};

export * from "./calculus-2";
export * from "./complex-equations";
export * from "./exponential-logarithmic-functions";
export * from "./expression-proof";
export * from "./geometry-equations";
export * from "./plane-curves";
export * from "./sequences";
export * from "./statistics";
export * from "./trigonometric-functions";
export * from "./vectors";
