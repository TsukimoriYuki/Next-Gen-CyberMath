import {
  getCumulativeKanjiSetThroughGrade,
  getElementaryKanjiPolicyId,
} from "@/lib/elementary-kanji";
import type {
  ElementaryKanjiGrade,
  ElementaryKanjiPolicy,
} from "@/types/elementary-kanji";
import {
  ELEMENTARY_RUBY_EXCEPTIONS,
} from "./ruby-exceptions";

const GRADES = [1, 2, 3, 4, 5, 6] as const;

function createPolicy(grade: ElementaryKanjiGrade): ElementaryKanjiPolicy {
  const id = getElementaryKanjiPolicyId(grade);
  return {
    id,
    grade,
    cumulativeThroughGrade: grade,
    allowedKanjiSet: getCumulativeKanjiSetThroughGrade(grade),
    allowedRubyExceptionIds: ELEMENTARY_RUBY_EXCEPTIONS
      .filter((entry) => entry.reviewStatus === "approved" && entry.allowedGrades.includes(id))
      .map((entry) => entry.id),
    allowedCharacterCategories: [
      "assigned-kanji",
      "hiragana",
      "katakana",
      "latin",
      "number",
      "symbol",
    ],
    enforcementMode: "strict",
    sourceIds: [
      "mext-elementary-curriculum-2017",
      "mext-elementary-japanese-guide-2017",
      "mext-onkun-allocation-2017",
    ],
  };
}

export const ELEMENTARY_KANJI_POLICIES: readonly ElementaryKanjiPolicy[] =
  GRADES.map(createPolicy);

export const ELEMENTARY_KANJI_POLICIES_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_KANJI_POLICIES.map((policy) => [policy.id, policy])),
) as Readonly<Record<string, ElementaryKanjiPolicy>>;

export function getElementaryKanjiPolicy(
  policyId: string,
): ElementaryKanjiPolicy | undefined {
  return ELEMENTARY_KANJI_POLICIES_BY_ID[policyId];
}
