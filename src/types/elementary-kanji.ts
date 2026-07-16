import type { ElementaryGradeId } from "@/types/elementary";

export type ElementaryKanjiGrade = 1 | 2 | 3 | 4 | 5 | 6;

export type ElementaryKanjiPolicyId =
  | "grade-1"
  | "grade-2"
  | "grade-3"
  | "grade-4"
  | "grade-5"
  | "grade-6";

export type ElementaryKanjiSourceId =
  | "mext-elementary-curriculum-2017"
  | "mext-elementary-japanese-guide-2017"
  | "mext-onkun-allocation-2017";

export type ElementaryKanjiEntry = Readonly<{
  character: string;
  grade: ElementaryKanjiGrade;
  sourceIds: readonly ElementaryKanjiSourceId[];
  order: number;
}>;

export type ElementaryKanjiSource = Readonly<{
  id: ElementaryKanjiSourceId;
  authority: "MEXT";
  title: string;
  documentYear: 2017;
  noticeYear: 2017;
  officialUrl: `https://www.mext.go.jp/${string}`;
  retrievedAt: `${number}-${number}-${number}`;
  usage: "primary-assignment-table" | "interpretation" | "independent-grade-cross-check";
  reviewStatus: "reviewed";
  notes: string;
}>;

export type ElementaryTextAudience = "learner" | "developer" | "internal";

export type ElementaryTextFieldContext =
  | "lesson"
  | "dialogue"
  | "ui-copy"
  | "accessibility"
  | "metadata"
  | "visual-fallback"
  | "tsx-static";

export type ElementaryRubyExceptionCategory =
  | "proper-name"
  | "place-name"
  | "historical-name"
  | "historical-term"
  | "official-name"
  | "source-title";

export type ElementaryRubyException = Readonly<{
  id: string;
  surface: string;
  reading: string;
  unassignedCharacters: readonly string[];
  category: ElementaryRubyExceptionCategory;
  allowedGrades: readonly ElementaryKanjiPolicyId[];
  reason: string;
  reviewStatus: "approved" | "pending" | "rejected";
}>;

export type ElementaryKanjiEnforcementMode = "strict";

export type ElementaryReadonlyKanjiSet = Readonly<{
  readonly size: number;
  has(value: string): boolean;
  values(): SetIterator<string>;
  [Symbol.iterator](): SetIterator<string>;
}>;

export type ElementaryKanjiPolicy = Readonly<{
  id: ElementaryKanjiPolicyId;
  grade: ElementaryKanjiGrade;
  cumulativeThroughGrade: ElementaryKanjiGrade;
  allowedKanjiSet: ElementaryReadonlyKanjiSet;
  allowedRubyExceptionIds: readonly string[];
  allowedCharacterCategories: readonly (
    | "assigned-kanji"
    | "hiragana"
    | "katakana"
    | "latin"
    | "number"
    | "symbol"
  )[];
  enforcementMode: ElementaryKanjiEnforcementMode;
  sourceIds: readonly ElementaryKanjiSourceId[];
}>;

export type ElementaryKanjiViolationType =
  | "unlearned-kanji"
  | "unassigned-kanji"
  | "invalid-ruby"
  | "missing-ruby-exception"
  | "ruby-exception-mismatch"
  | "unapproved-exception"
  | "disallowed-variant"
  | "empty-reading"
  | "empty-base"
  | "learner-text-without-policy"
  | "unresolved-dynamic-copy";

export type ElementaryKanjiViolation = Readonly<{
  type: ElementaryKanjiViolationType;
  grade: ElementaryKanjiGrade | null;
  character: string;
  normalizedCharacter: string;
  assignedGrade: ElementaryKanjiGrade | null;
  sourceLocation: string;
  contentId: string;
  fieldPath: string;
  surroundingText: string;
  exceptionId: string | null;
  reason: string;
  suggestedAction: string;
}>;

export type ElementaryKanjiInspectionResult = Readonly<{
  audience: ElementaryTextAudience | "unknown";
  grade: ElementaryKanjiGrade | null;
  inspectedStringCount: number;
  inspectedHanCount: number;
  approvedExceptionCount: number;
  excluded: boolean;
  violations: readonly ElementaryKanjiViolation[];
}>;

export type ElementaryKanjiGradeResolution = Readonly<{
  grade: ElementaryKanjiGrade;
  policyId: ElementaryKanjiPolicyId;
  elementaryGradeId: ElementaryGradeId | null;
}>;
