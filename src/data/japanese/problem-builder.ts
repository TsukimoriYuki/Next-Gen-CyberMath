import type {
  JapaneseArea,
  JapaneseChoice,
  JapaneseDifficulty,
  JapaneseProblem,
  JapaneseQuestionType,
} from "./types";

type ChoiceDraft = readonly [id: string, text: string, reason?: string];

export type JapaneseProblemDraft = Readonly<{
  id: string;
  title: string;
  area: JapaneseArea;
  courseId: string;
  passage: string;
  prompt: string;
  choices: readonly ChoiceDraft[];
  correctAnswer: string;
  evidence: string;
  explanation: string;
  questionType: JapaneseQuestionType;
  difficulty: JapaneseDifficulty;
  grammarPoint?: string;
  vocabularyTags?: readonly string[];
  reviewTags: readonly string[];
  estimatedTime?: number;
  sourceTitle?: string;
  sourceAuthor?: string;
  sourceEra?: string;
  modernTranslation?: string;
  writtenReading?: string;
  annotations?: readonly string[];
  people?: readonly string[];
}>;

export function makeJapaneseProblem(draft: JapaneseProblemDraft): JapaneseProblem {
  const choices: JapaneseChoice[] = draft.choices.map(([id, text]) => ({ id, text }));
  const distractorReasons: Record<string, string> = {};
  for (const [id, , reason] of draft.choices) {
    if (id !== draft.correctAnswer) {
      if (!reason) throw new Error(`${draft.id}: distractor ${id} has no reason`);
      distractorReasons[id] = reason;
    }
  }

  const classical = draft.area === "classical-japanese";
  const kanbun = draft.area === "kanbun";
  const usesClassicalSource = Boolean(draft.sourceTitle) && (classical || kanbun);
  return {
    id: draft.id,
    slug: draft.id,
    title: draft.title,
    area: draft.area,
    passage: draft.passage,
    passageType: classical ? "classical" : kanbun ? "kanbun" : "original-modern",
    sourceType: usesClassicalSource ? "classical-work" : "original",
    sourceTitle: draft.sourceTitle,
    sourceAuthor: draft.sourceAuthor,
    sourceEra: draft.sourceEra,
    copyrightStatus: usesClassicalSource ? "public-domain-original" : "original",
    evidence: draft.evidence,
    questionType: draft.questionType,
    prompt: draft.prompt,
    choices,
    correctAnswer: draft.correctAnswer,
    distractorReasons,
    explanation: draft.explanation,
    modernTranslation: draft.modernTranslation,
    writtenReading: draft.writtenReading,
    grammarPoint: draft.grammarPoint,
    vocabularyTags: draft.vocabularyTags ?? [],
    difficulty: draft.difficulty,
    estimatedTime: draft.estimatedTime ?? (draft.difficulty === "basic" ? 60 : draft.difficulty === "standard" ? 90 : 120),
    reviewTags: draft.reviewTags,
    relatedCourseIds: [draft.courseId],
    annotations: draft.annotations,
    people: draft.people,
  };
}

export function lessonDifficulty(position: number): JapaneseDifficulty {
  return position <= 2 ? "basic" : position <= 4 ? "standard" : "common-test-ready";
}
