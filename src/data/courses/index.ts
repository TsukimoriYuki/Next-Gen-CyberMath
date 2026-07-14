import type { CourseLesson, CourseSubject, CourseUnit } from "@/types/course";
import { MATH_1A_COURSE_SUBJECT } from "./math-1a";
import { MATH_1A_PREMIUM_COURSE_SUBJECT } from "./math-1a-premium";
import { MATH_2BC_COURSE_SUBJECT } from "./math-2bc";
import { MATH_2BC_PREMIUM_COURSE_SUBJECT } from "./math-2bc-premium";
import { MATH_3C_COURSE_SUBJECT } from "./math-3c";
import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";

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

export function isPublicCourseSubject(subject: CourseSubject): boolean {
  return (
    (subject.status ?? "available") === "available" &&
    subject.units.length > 0 &&
    subject.units.every((unit) => unit.lessons.length > 0)
  );
}

export const PUBLIC_COURSE_SUBJECTS: CourseSubject[] = COURSE_SUBJECTS.filter(
  isPublicCourseSubject,
);

export const PUBLIC_STANDARD_COURSE_SUBJECTS: CourseSubject[] =
  PUBLIC_COURSE_SUBJECTS.filter(
    (subject) => (subject.courseKind ?? "standard") === "standard",
  );

export const PUBLIC_PREMIUM_COURSE_SUBJECTS: CourseSubject[] =
  PUBLIC_COURSE_SUBJECTS.filter((subject) => subject.courseKind === "premium");

assertUniqueRegistryKeys(
  COURSE_SUBJECTS,
  (subject) => subject.subjectId,
  "course subject ID registry",
);
assertUniqueRegistryKeys(
  COURSE_SUBJECTS.flatMap((subject) => subject.units),
  (unit) => unit.unitId,
  "course unit ID registry",
);
assertUniqueRegistryKeys(
  COURSE_SUBJECTS.flatMap((subject) => subject.units.flatMap((unit) => unit.lessons)),
  (lesson) => lesson.lessonId,
  "course lesson ID registry",
);

export const COURSE_SUBJECT_MAP: Record<string, CourseSubject> =
  indexByUniqueRegistryKey(
    COURSE_SUBJECTS,
    (subject) => subject.subjectId,
    "course subject ID registry",
  );

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
