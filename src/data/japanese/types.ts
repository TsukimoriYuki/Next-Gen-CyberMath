export type JapaneseArea =
  | "modern-vocabulary"
  | "modern-reading"
  | "classical-japanese"
  | "kanbun";

export type JapaneseDifficulty = "basic" | "standard" | "common-test-ready";

export type JapaneseCopyrightStatus =
  | "original"
  | "public-domain-original"
  | "quoted-with-permission";

export type JapaneseQuestionType =
  | "meaning"
  | "context"
  | "paraphrase"
  | "connector"
  | "logic"
  | "blank"
  | "usage"
  | "matching"
  | "auxiliary-verb"
  | "honorific"
  | "subject"
  | "translation"
  | "emotion"
  | "content"
  | "reading-order"
  | "written-reading"
  | "construction"
  | "interpretation"
  | "person-relation";

export type JapaneseChoice = Readonly<{
  id: string;
  text: string;
}>;

export type JapaneseProblem = Readonly<{
  id: string;
  slug: string;
  title: string;
  area: JapaneseArea;
  passage: string;
  passageType: "original-modern" | "classical" | "kanbun";
  sourceType: "original" | "classical-work";
  sourceTitle?: string;
  sourceAuthor?: string;
  sourceEra?: string;
  copyrightStatus: JapaneseCopyrightStatus;
  evidence: string;
  evidenceRange?: Readonly<{ start: number; end: number }>;
  questionType: JapaneseQuestionType;
  prompt: string;
  choices: readonly JapaneseChoice[];
  correctAnswer: string;
  distractorReasons: Readonly<Record<string, string>>;
  explanation: string;
  modernTranslation?: string;
  writtenReading?: string;
  grammarPoint?: string;
  vocabularyTags: readonly string[];
  difficulty: JapaneseDifficulty;
  estimatedTime: number;
  reviewTags: readonly string[];
  relatedCourseIds: readonly string[];
  annotations?: readonly string[];
  people?: readonly string[];
}>;

export const JAPANESE_AREA_META: Readonly<
  Record<JapaneseArea, Readonly<{ label: string; description: string; unitId: string }>>
> = {
  "modern-vocabulary": {
    label: "現代文語彙",
    description: "抽象語と論理語を、定義・対比・文脈から判断します。",
    unitId: "modern-vocabulary",
  },
  "modern-reading": {
    label: "現代文読解",
    description: "長文読解の教材は次フェーズで追加します。",
    unitId: "modern-reading",
  },
  "classical-japanese": {
    label: "古文",
    description: "単語・助動詞・敬語・主語をつないで読みます。",
    unitId: "classical-japanese",
  },
  kanbun: {
    label: "漢文",
    description: "返り点・句法・主語・人物関係から読み解きます。",
    unitId: "kanbun",
  },
};
