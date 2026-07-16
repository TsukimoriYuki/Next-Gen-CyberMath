import type {
  ElementaryKanjiEntry,
  ElementaryKanjiGrade,
} from "@/types/elementary-kanji";

const ASSIGNMENT_SOURCE_IDS = [
  "mext-elementary-curriculum-2017",
  "mext-onkun-allocation-2017",
] as const;

export function createElementaryKanjiEntries(
  grade: ElementaryKanjiGrade,
  characters: readonly string[],
): readonly ElementaryKanjiEntry[] {
  return Object.freeze(
    characters.map((character, index) =>
      Object.freeze({
        character,
        grade,
        sourceIds: ASSIGNMENT_SOURCE_IDS,
        order: index + 1,
      }),
    ),
  );
}
