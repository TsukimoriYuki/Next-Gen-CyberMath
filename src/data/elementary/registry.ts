import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type {
  ElementaryCourseType,
  ElementaryCourseTypeConfig,
  ElementaryGradeId,
  ElementaryGradeSubjectConfig,
} from "@/types/elementary";
import { ELEMENTARY_GRADES } from "./grades";
import { ELEMENTARY_SUBJECTS } from "./subjects";

export const ELEMENTARY_COURSE_TYPES: readonly ElementaryCourseTypeConfig[] = [
  {
    id: "regular",
    slug: "regular",
    name: "通常コース",
    description: "学校の授業に沿って、基礎から順番に学ぶコースです。",
    order: 1,
    availability: "planned",
    publicationStatus: "beta",
  },
  {
    id: "exam-prep",
    slug: "exam-prep",
    name: "中学受験コース",
    description: "通常コースとは分けて、将来設計するコースです。",
    order: 2,
    availability: "unavailable",
    publicationStatus: "hidden",
  },
] as const;

export const ELEMENTARY_GRADE_SUBJECTS = ELEMENTARY_GRADES.flatMap((grade) =>
  ELEMENTARY_SUBJECTS.map(
    (subject): ElementaryGradeSubjectConfig => ({
      id: `${grade.id}:regular:${subject.id}`,
      gradeId: grade.id,
      courseType: "regular",
      subjectId: subject.id,
      order: subject.order,
      availability:
        grade.id === "grade-3" && subject.id !== "science"
          ? "planned"
          : "unavailable",
      publicationStatus:
        grade.id === "grade-3" && subject.id !== "science"
          ? "beta"
          : "hidden",
    }),
  ),
);

assertUniqueRegistryKeys(
  ELEMENTARY_COURSE_TYPES,
  (course) => course.id,
  "elementary course type registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_COURSE_TYPES,
  (course) => course.slug,
  "elementary course type slug registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_GRADE_SUBJECTS,
  (entry) => entry.id,
  "elementary grade-subject registry",
);

export const ELEMENTARY_GRADE_SUBJECTS_BY_ID = indexByUniqueRegistryKey(
  ELEMENTARY_GRADE_SUBJECTS,
  (entry) => entry.id,
  "elementary grade-subject registry",
);

export function getElementaryGradeSubjects(
  gradeId: ElementaryGradeId | string,
  courseType: ElementaryCourseType | string,
): readonly ElementaryGradeSubjectConfig[] {
  return ELEMENTARY_GRADE_SUBJECTS.filter(
    (entry) => entry.gradeId === gradeId && entry.courseType === courseType,
  ).sort((left, right) => left.order - right.order);
}

export function getElementaryCourseType(
  courseType: ElementaryCourseType | string,
): ElementaryCourseTypeConfig | undefined {
  return ELEMENTARY_COURSE_TYPES.find((entry) => entry.id === courseType);
}
