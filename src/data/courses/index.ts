import type { CourseLesson, CourseSubject, CourseUnit } from "@/types/course";
import { MATH_1A_COURSE_SUBJECT } from "./math-1a";
import { MATH_1A_PREMIUM_COURSE_SUBJECT } from "./math-1a-premium";
import { MATH_2BC_COURSE_SUBJECT } from "./math-2bc";
import { MATH_2BC_PREMIUM_COURSE_SUBJECT } from "./math-2bc-premium";
import { MATH_3C_COURSE_SUBJECT } from "./math-3c";

export const COURSE_SUBJECTS: CourseSubject[] = [
  MATH_1A_COURSE_SUBJECT,
  MATH_2BC_COURSE_SUBJECT,
  MATH_3C_COURSE_SUBJECT,
  MATH_1A_PREMIUM_COURSE_SUBJECT,
  MATH_2BC_PREMIUM_COURSE_SUBJECT,
];

export const STANDARD_COURSE_SUBJECTS: CourseSubject[] = COURSE_SUBJECTS.filter(
  (subject) => (subject.courseKind ?? "standard") === "standard",
);

export const PREMIUM_COURSE_SUBJECTS: CourseSubject[] = COURSE_SUBJECTS.filter(
  (subject) => subject.courseKind === "premium",
);

export const COURSE_SUBJECT_MAP: Record<string, CourseSubject> =
  Object.fromEntries(COURSE_SUBJECTS.map((subject) => [subject.subjectId, subject]));

export function getCourseSubject(subjectId: string): CourseSubject | undefined {
  return COURSE_SUBJECT_MAP[subjectId];
}

export function getCourseUnit(
  subjectId: string,
  unitId: string,
): CourseUnit | undefined {
  return getCourseSubject(subjectId)?.units.find((unit) => unit.unitId === unitId);
}

export function getCourseLesson(
  subjectId: string,
  unitId: string,
  lessonId: string,
): CourseLesson | undefined {
  return getCourseUnit(subjectId, unitId)?.lessons.find(
    (lesson) => lesson.lessonId === lessonId,
  );
}

export * from "./math-1a";
export * from "./math-1a-premium";
export * from "./math-2bc";
export * from "./math-2bc-premium";
export * from "./math-3c";
