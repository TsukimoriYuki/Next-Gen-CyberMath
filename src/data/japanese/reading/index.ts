import { indexByUniqueRegistryKey } from "@/lib/registry";
import type { JapaneseProblem } from "../types";
import type { JapaneseReadingPassage } from "./types";
import { CRITICISM_PASSAGES } from "./criticism";
import { ESSAY_PASSAGES } from "./essay";
import { FICTION_PASSAGES } from "./fiction";
import { PRACTICAL_PASSAGES } from "./practical";

export const JAPANESE_READING_PASSAGES: readonly JapaneseReadingPassage[] = [
  ...CRITICISM_PASSAGES,
  ...FICTION_PASSAGES,
  ...ESSAY_PASSAGES,
  ...PRACTICAL_PASSAGES,
];

export const JAPANESE_READING_PASSAGES_BY_ID = indexByUniqueRegistryKey(
  JAPANESE_READING_PASSAGES,
  (passage) => passage.id,
  "Japanese reading passage ID registry",
);

export const JAPANESE_READING_PASSAGES_BY_SLUG = indexByUniqueRegistryKey(
  JAPANESE_READING_PASSAGES,
  (passage) => passage.slug,
  "Japanese reading passage slug registry",
);

export function getJapaneseReadingPassage(idOrSlug: string) {
  return JAPANESE_READING_PASSAGES_BY_ID[idOrSlug] ?? JAPANESE_READING_PASSAGES_BY_SLUG[idOrSlug];
}

export const JAPANESE_READING_PROBLEMS: readonly JapaneseProblem[] =
  JAPANESE_READING_PASSAGES.flatMap((passage) =>
    passage.questions.map((question) => ({
      id: question.id,
      slug: question.id,
      title: `${passage.title} ${question.id.split("-").at(-1)?.toUpperCase() ?? "設問"}`,
      area: "modern-reading" as const,
      passage: passage.paragraphs.map((paragraph) => paragraph.text).join("\n\n"),
      passageType: "original-modern" as const,
      sourceType: "original" as const,
      copyrightStatus: "original" as const,
      evidence: question.evidenceText,
      questionType: question.questionType,
      prompt: question.prompt,
      choices: question.choices,
      correctAnswer: question.correctAnswers[0],
      distractorReasons: question.distractorReasons,
      explanation: question.explanation,
      grammarPoint: question.questionSkill,
      vocabularyTags: [],
      difficulty: question.difficulty,
      estimatedTime: question.estimatedTime,
      reviewTags: question.reviewTags,
      relatedCourseIds: question.relatedCourseIds,
      passageId: passage.id,
      paragraphIds: passage.paragraphs.map((paragraph) => paragraph.id),
      passageGenre: passage.genre,
      readingLength: passage.paragraphs.reduce((sum, paragraph) => sum + paragraph.text.length, 0),
      evidenceParagraphIds: question.evidenceParagraphIds,
      evidenceText: question.evidenceText,
      questionSkill: question.questionSkill,
      readingStrategy: question.firstLook,
      mistakeTags: question.mistakeTags,
      estimatedReadingTime: passage.estimatedReadingTime,
      people: passage.people,
    })),
  );

export function getNextJapaneseReadingPassage(passageId: string) {
  const index = JAPANESE_READING_PASSAGES.findIndex((passage) => passage.id === passageId);
  return index >= 0 ? JAPANESE_READING_PASSAGES[(index + 1) % JAPANESE_READING_PASSAGES.length] : undefined;
}

export * from "./types";
