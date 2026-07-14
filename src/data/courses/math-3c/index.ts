import type { CourseSubject } from "@/types/course";
import { COMPLEX_PLANE_UNIT } from "./complex-plane";
import { CURVES_UNIT } from "./curves";
import { DIFFERENTIAL_CALCULUS_UNIT } from "./differential-calculus";
import { INTEGRAL_CALCULUS_UNIT } from "./integral-calculus";
import { LIMITS_UNIT } from "./limits";

export const MATH_3C_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-3c",
  parentSubjectId: "math",
  subjectName: "数学III・C",
  description:
    "極限、微分法、積分法、複素数平面、式と曲線を単元ごとに整理します。",
  color: "#0891b2",
  status: "preparing",
  statusLabel: "準備中",
  badges: ["公開予定"],
  units: [
    LIMITS_UNIT,
    DIFFERENTIAL_CALCULUS_UNIT,
    INTEGRAL_CALCULUS_UNIT,
    COMPLEX_PLANE_UNIT,
    CURVES_UNIT,
  ],
};

export * from "./complex-plane";
export * from "./curves";
export * from "./differential-calculus";
export * from "./integral-calculus";
export * from "./limits";
