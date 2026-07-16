import {
  assertUniqueRegistryKeys,
  indexByUniqueRegistryKey,
} from "@/lib/registry";
import type {
  ElementaryGradeConfig,
  ElementaryGradeId,
} from "@/types/elementary";

export const ELEMENTARY_GRADES: readonly ElementaryGradeConfig[] = [
  {
    id: "grade-3",
    slug: "grade-3",
    grade: 3,
    name: "小学3年生",
    shortName: "3年生",
    order: 3,
    availability: "planned",
    publicationStatus: "hidden",
    href: "/elementary/grade-3",
  },
  {
    id: "grade-4",
    slug: "grade-4",
    grade: 4,
    name: "小学4年生",
    shortName: "4年生",
    order: 4,
    availability: "unavailable",
    publicationStatus: "hidden",
  },
  {
    id: "grade-5",
    slug: "grade-5",
    grade: 5,
    name: "小学5年生",
    shortName: "5年生",
    order: 5,
    availability: "unavailable",
    publicationStatus: "hidden",
  },
  {
    id: "grade-6",
    slug: "grade-6",
    grade: 6,
    name: "小学6年生",
    shortName: "6年生",
    order: 6,
    availability: "unavailable",
    publicationStatus: "hidden",
  },
] as const;

assertUniqueRegistryKeys(
  ELEMENTARY_GRADES,
  (grade) => grade.id,
  "elementary grade ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_GRADES,
  (grade) => grade.slug,
  "elementary grade slug registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_GRADES.flatMap((grade) => (grade.href ? [grade.href] : [])),
  (href) => href,
  "elementary grade route registry",
);

export const ELEMENTARY_GRADES_BY_ID = indexByUniqueRegistryKey(
  ELEMENTARY_GRADES,
  (grade) => grade.id,
  "elementary grade ID registry",
);

export function getElementaryGrade(
  gradeId: ElementaryGradeId | string,
): ElementaryGradeConfig | undefined {
  return ELEMENTARY_GRADES_BY_ID[gradeId];
}
