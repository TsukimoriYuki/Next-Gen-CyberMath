import { assertUniqueRegistryKeys } from "@/lib/registry";
import type { ElementaryProblem } from "@/types/elementary-problems";
import { ELEMENTARY_JAPANESE_PROBLEMS } from "./japanese";
import { ELEMENTARY_MATH_PROBLEMS } from "./math";
import { ELEMENTARY_SOCIAL_STUDIES_PROBLEMS } from "./social-studies";
import { ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS } from "./expansion-wave-1";

// 小学生版 pilot 問題の集約 registry。
// 詳細な整合性（件数・難易度内訳・正答の一意性など）は
// scripts/check-elementary-pilot-problems.ts が検証する。

export const ELEMENTARY_PROBLEMS: readonly ElementaryProblem[] = Object.freeze([
  ...ELEMENTARY_MATH_PROBLEMS,
  ...ELEMENTARY_JAPANESE_PROBLEMS,
  ...ELEMENTARY_SOCIAL_STUDIES_PROBLEMS,
  ...ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS,
]);

assertUniqueRegistryKeys(
  ELEMENTARY_PROBLEMS,
  (problem) => problem.id,
  "elementary problem ID registry",
);
assertUniqueRegistryKeys(
  ELEMENTARY_PROBLEMS,
  (problem) => problem.slug,
  "elementary problem slug registry",
);

export {
  ELEMENTARY_JAPANESE_PROBLEMS,
  ELEMENTARY_MATH_PROBLEMS,
  ELEMENTARY_SOCIAL_STUDIES_PROBLEMS,
  ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS,
};
