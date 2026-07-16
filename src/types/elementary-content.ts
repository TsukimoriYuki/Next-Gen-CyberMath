import type {
  ElementaryCourseType,
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "@/types/elementary";
import type { ElementaryAssetUsagePurpose } from "@/types/elementary-assets";

export const ELEMENTARY_CHARACTER_EMOTIONS = [
  "neutral",
  "curious",
  "thinking",
  "confused",
  "surprised",
  "encouraging",
  "happy",
  "confident",
] as const;

export const ELEMENTARY_DIALOGUE_INTENTS = [
  "question",
  "prediction",
  "misconception",
  "retry",
  "self-explanation",
  "acknowledgement",
  "prompt",
  "hint",
  "explanation",
  "deepening",
  "summary",
] as const;

export type ElementaryCharacterId = "hinano" | "tomiyama";
export type ElementaryCharacterRole = "student" | "teacher";
export type ElementaryCharacterEmotion =
  (typeof ELEMENTARY_CHARACTER_EMOTIONS)[number];
export type ElementaryDialogueIntent =
  (typeof ELEMENTARY_DIALOGUE_INTENTS)[number];

export type ElementaryInlineSegment =
  | Readonly<{ type: "text"; text: string }>
  | Readonly<{ type: "ruby"; base: string; reading: string; exceptionId?: string }>
  | Readonly<{ type: "emphasis"; text: string }>
  | Readonly<{ type: "term"; text: string; definition?: string }>;

export type ElementaryInlineContent = readonly ElementaryInlineSegment[];

export type ElementaryCharacterFallback = Readonly<{
  symbol: string;
  label: string;
}>;

export type ElementarySpeechPolicy = Readonly<{
  principles: readonly string[];
  prohibitedApproaches: readonly string[];
}>;

export type ElementaryCharacterProfile = Readonly<{
  id: ElementaryCharacterId;
  role: ElementaryCharacterRole;
  displayName: string;
  displayNameContent: ElementaryInlineContent;
  characterLabel: string;
  accessibilityLabel: string;
  defaultEmotion: ElementaryCharacterEmotion;
  permittedIntents: readonly ElementaryDialogueIntent[];
  fallback: ElementaryCharacterFallback;
  speechPolicy: ElementarySpeechPolicy;
}>;

export type ElementaryGradeSpeechPolicy = Readonly<{
  gradeId: ElementaryGradeId;
  maxDialogueCharacters: 60 | 70 | 80 | 90;
  maxIdeasPerLine: 1;
  useConcreteExamples: boolean;
  rephraseDifficultTerms: boolean;
  guidance: readonly string[];
}>;

type ElementaryDialogueLineBase = Readonly<{
  id: string;
  speakerId: ElementaryCharacterId;
  emotion: ElementaryCharacterEmotion;
  content: ElementaryInlineContent;
  relatedLineId?: string;
}>;

export type ElementaryMisconceptionDialogueLine =
  ElementaryDialogueLineBase &
    Readonly<{
      intent: "misconception";
      misconceptionId: string;
      rationale: ElementaryInlineContent;
    }>;

export type ElementaryRegularDialogueLine = ElementaryDialogueLineBase &
  Readonly<{
    intent: Exclude<ElementaryDialogueIntent, "misconception">;
    misconceptionId?: never;
    rationale?: never;
  }>;

export type ElementaryDialogueLine =
  | ElementaryMisconceptionDialogueLine
  | ElementaryRegularDialogueLine;

type ElementaryLessonBlockBase = Readonly<{ id: string }>;

export type ElementaryOpeningQuestionBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "opening-question";
    question: ElementaryInlineContent;
  }>;

export type ElementaryLearningGoalsBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "learning-goals";
    items: readonly ElementaryInlineContent[];
  }>;

export type ElementaryDialogueBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "dialogue";
    title?: ElementaryInlineContent;
    purpose?: string;
    lines: readonly ElementaryDialogueLine[];
  }>;

export type ElementaryExplanationBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "explanation";
    title: ElementaryInlineContent;
    paragraphs: readonly ElementaryInlineContent[];
  }>;

export type ElementaryKeyPointBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "key-point";
    title: ElementaryInlineContent;
    points: readonly ElementaryInlineContent[];
  }>;

export type ElementaryGuidedExampleStep = Readonly<{
  id: string;
  content: ElementaryInlineContent;
}>;

export type ElementaryGuidedExampleBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "guided-example";
    title: ElementaryInlineContent;
    prompt: ElementaryInlineContent;
    steps: readonly ElementaryGuidedExampleStep[];
    answer: ElementaryInlineContent;
    check: ElementaryInlineContent;
  }>;

export type ElementaryVisualBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "visual";
    title: ElementaryInlineContent;
    assetId?: string;
    fallbackText: ElementaryInlineContent;
    captionOverride?: ElementaryInlineContent;
    creditDisplay: "inline" | "credits-page";
    visualPurpose: ElementaryAssetUsagePurpose;
  }>;

export type ElementaryRetryBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "retry";
    title: ElementaryInlineContent;
    originalMisconceptionId: string;
    prompt: ElementaryInlineContent;
    response: ElementaryRegularDialogueLine &
      Readonly<{
        speakerId: "hinano";
        intent: "retry" | "self-explanation";
      }>;
  }>;

export type ElementarySummaryBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "summary";
    items: readonly ElementaryInlineContent[];
  }>;

export type ElementaryEnrichmentBlock = ElementaryLessonBlockBase &
  Readonly<{
    type: "enrichment";
    title: ElementaryInlineContent;
    content: readonly ElementaryInlineContent[];
    requiredForCompletion: false;
  }>;

export type ElementaryLessonBlock =
  | ElementaryOpeningQuestionBlock
  | ElementaryLearningGoalsBlock
  | ElementaryDialogueBlock
  | ElementaryExplanationBlock
  | ElementaryKeyPointBlock
  | ElementaryGuidedExampleBlock
  | ElementaryVisualBlock
  | ElementaryRetryBlock
  | ElementarySummaryBlock
  | ElementaryEnrichmentBlock;

export type ElementaryLesson = Readonly<{
  id: string;
  slug: string;
  grade: ElementaryGradeId;
  subject: ElementarySubjectId;
  courseType: ElementaryCourseType;
  unitId: string;
  order: number;
  title: ElementaryInlineContent;
  description: ElementaryInlineContent;
  goals: readonly ElementaryInlineContent[];
  estimatedMinutes: number;
  prerequisiteLessonIds: readonly string[];
  curriculumReferenceIds: readonly string[];
  visualAssetIds: readonly string[];
  problemIds: readonly string[];
  blocks: readonly ElementaryLessonBlock[];
  publicationStatus: ElementaryPublicationStatus;
  reviewStatus: "prototype" | "reviewed";
  sourceType: "original";
  copyrightStatus: "original";
}>;
