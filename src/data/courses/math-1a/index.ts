import type { CourseSubject } from "@/types/course";
import { getCourseUnit } from "./quadratic";

const quadraticUnit = getCourseUnit("math-1a", "quadratic");

export const MATH_1A_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-1a",
  subjectName: "数学IA",
  description:
    "数と式、二次関数、図形と計量、データの分析、場合の数と確率を、講座単位で整理します。",
  color: "#2563eb",
  units: quadraticUnit
    ? [
        {
          ...quadraticUnit,
          subjectId: "math-1a",
          unitTitle: "二次関数",
          unitDescription:
            "放物線の基本、平方完成、最大・最小、定義域つき問題までを段階的に学びます。",
        },
      ]
    : [],
};

