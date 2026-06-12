import type { CourseSubject, CourseUnit } from "@/types/course";

const units: CourseUnit[] = [
  {
    unitId: "limits",
    subjectId: "math-3c",
    unitTitle: "極限",
    unitDescription: "数列と関数の極限、無限級数への入り口を整理します。",
    lessons: [],
  },
  {
    unitId: "differentiation",
    subjectId: "math-3c",
    unitTitle: "微分法",
    unitDescription: "導関数、接線、増減、最大・最小、応用問題を扱います。",
    lessons: [],
  },
  {
    unitId: "integration",
    subjectId: "math-3c",
    unitTitle: "積分法",
    unitDescription: "置換積分、部分積分、面積・体積への応用を整理します。",
    lessons: [],
  },
  {
    unitId: "complex-plane",
    subjectId: "math-3c",
    unitTitle: "複素数平面",
    unitDescription: "複素数の図形的意味、回転、軌跡を扱う単元です。",
    lessons: [],
  },
  {
    unitId: "curves",
    subjectId: "math-3c",
    unitTitle: "式と曲線",
    unitDescription: "二次曲線、媒介変数表示、極座標を整理します。",
    lessons: [],
  },
];

export const MATH_3C_COURSE_SUBJECT: CourseSubject = {
  subjectId: "math-3c",
  subjectName: "数学III・C",
  description: "極限、微分法、積分法、複素数平面、式と曲線を体系的に整理します。",
  color: "#0891b2",
  units,
};

