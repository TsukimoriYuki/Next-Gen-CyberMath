import type { CourseSubject } from "@/types/course";
import { CLASSICAL_JAPANESE_UNIT } from "./classical-japanese";
import { KANBUN_UNIT } from "./kanbun";
import { MODERN_VOCABULARY_UNIT } from "./modern-vocabulary";
import { MODERN_READING_UNIT } from "./modern-reading";

export const JAPANESE_COURSE_SUBJECT: CourseSubject = {
  subjectId: "japanese",
  parentSubjectId: "japanese",
  subjectName: "国語",
  description: "文脈・文法・主語・論理関係から、本文根拠を言葉にして読む国語講座です。",
  color: "#9333ea",
  badges: ["β"],
  units: [MODERN_VOCABULARY_UNIT, MODERN_READING_UNIT, KANBUN_UNIT, CLASSICAL_JAPANESE_UNIT],
};

export type JapaneseRelatedCourseLink = Readonly<{
  id: string;
  title: string;
  href: string;
}>;

export function getJapaneseRelatedCourseLinks(
  lessonIds: readonly string[],
): JapaneseRelatedCourseLink[] {
  const wanted = new Set(lessonIds);
  return JAPANESE_COURSE_SUBJECT.units.flatMap((unit) =>
    unit.lessons
      .filter((lesson) => wanted.has(lesson.lessonId))
      .map((lesson) => ({
        id: lesson.lessonId,
        title: lesson.lessonTitle,
        href: `/courses/japanese/${unit.unitId}/${lesson.lessonId}`,
      })),
  );
}

export * from "./classical-japanese";
export * from "./kanbun";
export * from "./modern-vocabulary";
export * from "./modern-reading";
