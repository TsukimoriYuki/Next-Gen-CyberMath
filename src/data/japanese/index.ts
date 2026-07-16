import { indexByUniqueRegistryKey } from "@/lib/registry";
import type { JapaneseProblem } from "./types";

// Curriculum modules are added by area. Keeping a single registry prevents
// duplicate IDs/slugs and gives pages/review guards one lookup source.
export const JAPANESE_PROBLEMS: readonly JapaneseProblem[] = [];

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
