import { assertUniqueRegistryKeys } from "@/lib/registry";
import type { ElementaryLesson } from "@/types/elementary-content";
import { ELEMENTARY_JAPANESE_FEELINGS_LESSON } from "./japanese-feelings";
import { ELEMENTARY_MATH_DIVISION_LESSON } from "./math-division";
import { ELEMENTARY_SOCIAL_MAP_LESSON } from "./social-map";
import { ELEMENTARY_EXPANSION_WAVE_1_LESSONS } from "./expansion-wave-1";

// 小学生版 pilot 講座の集約 registry（正式 pilot のみ。開発用見本は含めない）。

export const ELEMENTARY_LESSONS: readonly ElementaryLesson[] = [
  ELEMENTARY_MATH_DIVISION_LESSON,
  ELEMENTARY_JAPANESE_FEELINGS_LESSON,
  ELEMENTARY_SOCIAL_MAP_LESSON,
  ...ELEMENTARY_EXPANSION_WAVE_1_LESSONS,
];

assertUniqueRegistryKeys(
  ELEMENTARY_LESSONS,
  (lesson) => lesson.id,
  "elementary lesson ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_LESSONS,
  (lesson) => `${lesson.grade}:${lesson.subject}:${lesson.slug}`,
  "elementary lesson slug registry",
);

export {
  ELEMENTARY_JAPANESE_FEELINGS_LESSON,
  ELEMENTARY_MATH_DIVISION_LESSON,
  ELEMENTARY_SOCIAL_MAP_LESSON,
  ELEMENTARY_EXPANSION_WAVE_1_LESSONS,
};
