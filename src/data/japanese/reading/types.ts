import type {
  JapaneseChoice,
  JapaneseDifficulty,
  JapaneseQuestionType,
} from "../types";

export type JapaneseReadingGenre = "criticism" | "fiction" | "essay" | "practical";
export type JapaneseReadingLength = "short" | "medium" | "long" | "multi-source";
export type JapaneseAnswerMode = "single" | "multiple" | "sequence";
export type JapaneseReadingExamFormat =
  | "single-choice"
  | "multiple-select"
  | "fill-matching"
  | "ordering"
  | "material-condition";

export type JapaneseReadingParagraph = Readonly<{
  id: string;
  text: string;
  sectionTitle?: string;
}>;

export type JapaneseReadingMaterial = Readonly<{
  id: string;
  title: string;
  type: "notice" | "email" | "memo" | "table" | "chart" | "opinions";
  body?: string;
  headers?: readonly string[];
  rows?: readonly (readonly string[])[];
  bars?: readonly Readonly<{ label: string; value: number; unit: string }>[];
  items?: readonly string[];
}>;

export type JapaneseReadingQuestion = Readonly<{
  id: string;
  slug: string;
  passageSetId: string;
  questionNumber: number;
  prompt: string;
  questionType: JapaneseQuestionType;
  examFormat?: JapaneseReadingExamFormat;
  answerMode: JapaneseAnswerMode;
  choices: readonly JapaneseChoice[];
  correctAnswer: string | readonly string[];
  correctAnswers: readonly string[];
  evidenceParagraphIds: readonly string[];
  evidenceText: string;
  explanation: string;
  detailedExplanation: string;
  firstLook: string;
  firstCheck: string;
  comparisonMethod: string;
  readingStrategy: string;
  verification: string;
  questionSkill: string;
  distractorReasons: Readonly<Record<string, string>>;
  difficulty: JapaneseDifficulty;
  estimatedTime: number;
  reviewTags: readonly string[];
  mistakeTags: readonly string[];
  relatedCourseIds: readonly string[];
  copyrightStatus: "original";
  sourceType: "original";
  publicationStatus: "beta";
}>;

export type JapaneseReadingPassage = Readonly<{
  id: string;
  slug: string;
  title: string;
  genre: JapaneseReadingGenre;
  length: JapaneseReadingLength;
  theme: string;
  paragraphs: readonly JapaneseReadingParagraph[];
  materials?: readonly JapaneseReadingMaterial[];
  questions: readonly JapaneseReadingQuestion[];
  estimatedReadingTime: number;
  sourceType: "original";
  copyrightStatus: "original";
  people?: readonly string[];
  practiceKind?: "passage" | "exam-set";
  displayNumber?: number;
}>;

export const READING_GENRE_LABEL: Readonly<Record<JapaneseReadingGenre, string>> = {
  criticism: "評論",
  fiction: "小説",
  essay: "随筆",
  practical: "実用文・複数資料",
};
