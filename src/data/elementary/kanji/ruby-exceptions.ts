import type { ElementaryRubyException } from "@/types/elementary-kanji";

export const TOMIYAMA_RUBY_EXCEPTION_ID = "proper-name-tomiyama";

export const ELEMENTARY_RUBY_EXCEPTIONS: readonly ElementaryRubyException[] = [
  {
    id: TOMIYAMA_RUBY_EXCEPTION_ID,
    surface: "冨山",
    reading: "とみやま",
    unassignedCharacters: ["冨"],
    category: "proper-name",
    allowedGrades: ["grade-3", "grade-4", "grade-5", "grade-6"],
    reason: "キャラクター固有名の表記と読みを保つため。",
    reviewStatus: "approved",
  },
] as const;

export const ELEMENTARY_RUBY_EXCEPTIONS_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_RUBY_EXCEPTIONS.map((entry) => [entry.id, entry])),
) as Readonly<Record<string, ElementaryRubyException>>;
