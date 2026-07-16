import type {
  ElementaryKanjiEntry,
  ElementaryKanjiGrade,
} from "@/types/elementary-kanji";
import { ELEMENTARY_GRADE_1_KANJI } from "./grade-1";
import { ELEMENTARY_GRADE_2_KANJI } from "./grade-2";
import { ELEMENTARY_GRADE_3_KANJI } from "./grade-3";
import { ELEMENTARY_GRADE_4_KANJI } from "./grade-4";
import { ELEMENTARY_GRADE_5_KANJI } from "./grade-5";
import { ELEMENTARY_GRADE_6_KANJI } from "./grade-6";

export const ELEMENTARY_KANJI_GRADES = [1, 2, 3, 4, 5, 6] as const;

export const ELEMENTARY_KANJI_EXPECTED_COUNTS: Readonly<
  Record<ElementaryKanjiGrade, number>
> = {
  1: 80,
  2: 160,
  3: 200,
  4: 202,
  5: 193,
  6: 191,
} as const;

export const ELEMENTARY_KANJI_EXPECTED_CUMULATIVE_COUNTS: Readonly<
  Record<ElementaryKanjiGrade, number>
> = {
  1: 80,
  2: 240,
  3: 440,
  4: 642,
  5: 835,
  6: 1026,
} as const;

export const ELEMENTARY_KANJI_BY_GRADE: Readonly<
  Record<ElementaryKanjiGrade, readonly ElementaryKanjiEntry[]>
> = {
  1: ELEMENTARY_GRADE_1_KANJI,
  2: ELEMENTARY_GRADE_2_KANJI,
  3: ELEMENTARY_GRADE_3_KANJI,
  4: ELEMENTARY_GRADE_4_KANJI,
  5: ELEMENTARY_GRADE_5_KANJI,
  6: ELEMENTARY_GRADE_6_KANJI,
} as const;

export const ELEMENTARY_KANJI_ENTRIES = ELEMENTARY_KANJI_GRADES.flatMap(
  (grade) => ELEMENTARY_KANJI_BY_GRADE[grade],
);

export {
  ELEMENTARY_GRADE_1_KANJI,
  ELEMENTARY_GRADE_2_KANJI,
  ELEMENTARY_GRADE_3_KANJI,
  ELEMENTARY_GRADE_4_KANJI,
  ELEMENTARY_GRADE_5_KANJI,
  ELEMENTARY_GRADE_6_KANJI,
};
