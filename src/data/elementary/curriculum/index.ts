import type { ElementaryCurriculumEntry } from "@/types/elementary-curriculum";
import { GRADE_3_JAPANESE_CURRICULUM } from "./grade-3-japanese";
import { GRADE_3_MATH_CURRICULUM } from "./grade-3-math";
import { GRADE_3_SOCIAL_STUDIES_CURRICULUM } from "./grade-3-social-studies";

export * from "./domains";
export * from "./sources";
export * from "./grade-3-japanese";
export * from "./grade-3-math";
export * from "./grade-3-social-studies";

export const ELEMENTARY_CURRICULUM_ENTRIES: readonly ElementaryCurriculumEntry[] =
  Object.freeze([
    ...GRADE_3_MATH_CURRICULUM,
    ...GRADE_3_JAPANESE_CURRICULUM,
    ...GRADE_3_SOCIAL_STUDIES_CURRICULUM,
  ]);

export const ELEMENTARY_CURRICULUM_ENTRIES_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_CURRICULUM_ENTRIES.map((entry) => [entry.id, entry])),
) as Readonly<Record<string, ElementaryCurriculumEntry>>;

export const ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID = Object.freeze(
  Object.fromEntries(
    ELEMENTARY_CURRICULUM_ENTRIES.flatMap((entry) =>
      entry.objectives.map((objective) => [objective.id, objective] as const),
    ),
  ),
);
