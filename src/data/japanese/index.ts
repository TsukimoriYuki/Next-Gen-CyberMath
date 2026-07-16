import { indexByUniqueRegistryKey } from "@/lib/registry";
import { CLASSICAL_JAPANESE_PROBLEMS } from "./classical-problems";
import { KANBUN_PROBLEMS } from "./kanbun-problems";
import { MODERN_VOCABULARY_PROBLEMS } from "./modern-vocabulary-problems";
import { JAPANESE_READING_PROBLEMS } from "./reading";
import type { JapaneseProblem } from "./types";

// Curriculum modules are added by area. Keeping a single registry prevents
// duplicate IDs/slugs and gives pages/review guards one lookup source.
export const JAPANESE_PROBLEMS: readonly JapaneseProblem[] = [
  ...KANBUN_PROBLEMS,
  ...CLASSICAL_JAPANESE_PROBLEMS,
  ...MODERN_VOCABULARY_PROBLEMS,
  ...JAPANESE_READING_PROBLEMS,
];

export const JAPANESE_PROBLEMS_BY_ID = indexByUniqueRegistryKey(
  JAPANESE_PROBLEMS,
  (problem) => problem.id,
  "Japanese problem ID registry",
);

export const JAPANESE_PROBLEMS_BY_SLUG = indexByUniqueRegistryKey(
  JAPANESE_PROBLEMS,
  (problem) => problem.slug,
  "Japanese problem slug registry",
);

export function getJapaneseProblem(idOrSlug: string): JapaneseProblem | undefined {
  return JAPANESE_PROBLEMS_BY_ID[idOrSlug] ?? JAPANESE_PROBLEMS_BY_SLUG[idOrSlug];
}

export * from "./types";
export * from "./classical-problems";
export * from "./kanbun-problems";
export * from "./modern-vocabulary-problems";
export * from "./reading";
