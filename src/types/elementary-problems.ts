import type {
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "@/types/elementary";
import type { ElementaryInlineContent } from "@/types/elementary-content";

// 小学生版の採点可能問題の型。
// 高校版 Problem 型（tier / LogicSteps 前提）へは混ぜず、選択式・数値入力中心の
// 小学生用に独立して定義する。問題文・解説も構造化テキスト（ElementaryInlineContent）で持つ。

export type ElementaryProblemType =
  | "single-choice"
  | "multiple-choice"
  | "numeric-input";

export type ElementaryProblemDifficulty = "basic" | "standard";

export type ElementaryProblemReviewStatus =
  | "prototype"
  | "pilot"
  | "reviewed"
  | "approved";

export type ElementaryChoice = Readonly<{
  id: string;
  label: ElementaryInlineContent;
  /** 正答・誤答のどちらでも、この選択肢が正しい／誤りである理由を持つ。 */
  reason: ElementaryInlineContent;
}>;

export type ElementaryNumericAnswerSpec = Readonly<{
  value: number;
  /** 0 以上の有限の許容誤差。整数の答えでは 0。 */
  tolerance: number;
  /** 単位（例：「こ」「人」「本」）。 */
  unit: ElementaryInlineContent;
}>;

export type ElementaryAnswerSpec =
  | Readonly<{ kind: "single-choice"; correctChoiceIds: readonly [string] }>
  | Readonly<{
      kind: "multiple-choice";
      correctChoiceIds: readonly string[];
      /** 正答の数。問題文にも明記する。 */
      selectionCount: number;
    }>
  | Readonly<{ kind: "numeric-input"; numeric: ElementaryNumericAnswerSpec }>;

export type ElementaryProblemExplanation = Readonly<{
  detailed: ElementaryInlineContent;
  firstCheck: ElementaryInlineContent;
  verification: ElementaryInlineContent;
  commonMistake: ElementaryInlineContent;
}>;

export type ElementaryProblem = Readonly<{
  id: string;
  slug: string;
  grade: ElementaryGradeId;
  subject: ElementarySubjectId;
  unitId: string;
  lessonIds: readonly string[];
  order: number;
  title: ElementaryInlineContent;
  prompt: ElementaryInlineContent;
  type: ElementaryProblemType;
  /** 選択式のときの選択肢。numeric-input のときは空配列。 */
  choices: readonly ElementaryChoice[];
  answer: ElementaryAnswerSpec;
  explanation: ElementaryProblemExplanation;
  hint: ElementaryInlineContent;
  /** 問題が参照する視覚素材（社会の地図など）。 */
  visualAssetId?: string;
  curriculumEntryIds: readonly string[];
  curriculumObjectiveIds: readonly string[];
  difficulty: ElementaryProblemDifficulty;
  estimatedSeconds: number;
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  publicationStatus: ElementaryPublicationStatus;
  reviewStatus: ElementaryProblemReviewStatus;
  sourceType: "original";
  copyrightStatus: "original";
}>;

export type ElementaryAnswerResponse =
  | Readonly<{ kind: "choice"; selectedChoiceIds: readonly string[] }>
  | Readonly<{ kind: "numeric"; raw: string }>;

export type ElementaryProblemResult = Readonly<{
  problemId: string;
  answered: boolean;
  correct: boolean;
}>;
