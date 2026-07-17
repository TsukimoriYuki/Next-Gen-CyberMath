import { ELEMENTARY_LESSONS } from "@/data/elementary/lessons";
import { ELEMENTARY_UNITS } from "@/data/elementary/units";
import type { ElementaryGradeId, ElementarySubjectId } from "@/types/elementary";
import type { ElementaryLesson, ElementaryUnit } from "@/types/elementary-content";

// 小学生版 pilot の単元・講座 resolver。unknown ID/slug は fail closed（undefined）。
// 出力順は order で安定させる。registry の配列は外部から変更しない。

const LESSON_BY_ID: ReadonlyMap<string, ElementaryLesson> = new Map(
  ELEMENTARY_LESSONS.map((lesson) => [lesson.id, lesson] as const),
);

const UNIT_BY_ID: ReadonlyMap<string, ElementaryUnit> = new Map(
  ELEMENTARY_UNITS.map((unit) => [unit.id, unit] as const),
);

function byOrder<T extends { order: number }>(a: T, b: T): number {
  return a.order - b.order;
}

export function getElementaryUnitById(
  unitId: string | null | undefined,
): ElementaryUnit | undefined {
  if (!unitId) return undefined;
  return UNIT_BY_ID.get(unitId);
}

export function getElementaryLessonById(
  lessonId: string | null | undefined,
): ElementaryLesson | undefined {
  if (!lessonId) return undefined;
  return LESSON_BY_ID.get(lessonId);
}

export function getElementaryUnitsForSubject(
  gradeId: ElementaryGradeId | string,
  subjectId: ElementarySubjectId | string,
): readonly ElementaryUnit[] {
  return ELEMENTARY_UNITS.filter(
    (unit) => unit.grade === gradeId && unit.subject === subjectId,
  ).sort(byOrder);
}

export function getElementaryUnitBySlug(
  gradeId: ElementaryGradeId | string,
  subjectId: ElementarySubjectId | string,
  unitSlug: string,
): ElementaryUnit | undefined {
  return ELEMENTARY_UNITS.find(
    (unit) =>
      unit.grade === gradeId &&
      unit.subject === subjectId &&
      unit.slug === unitSlug,
  );
}

export function getElementaryLessonsForUnit(
  unitId: string,
): readonly ElementaryLesson[] {
  const unit = getElementaryUnitById(unitId);
  if (!unit) return [];
  return unit.lessonIds
    .map((lessonId) => LESSON_BY_ID.get(lessonId))
    .filter((lesson): lesson is ElementaryLesson => lesson !== undefined);
}

export function getElementaryLessonBySlug(
  unitId: string,
  lessonSlug: string,
): ElementaryLesson | undefined {
  return getElementaryLessonsForUnit(unitId).find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

/** 単元内の次の講座（あれば）。lesson.nextLessonId を優先し、なければ順序で決める。 */
export function getNextElementaryLesson(
  lessonId: string,
): ElementaryLesson | undefined {
  const lesson = getElementaryLessonById(lessonId);
  if (!lesson) return undefined;
  if (lesson.nextLessonId) return getElementaryLessonById(lesson.nextLessonId);
  const siblings = getElementaryLessonsForUnit(lesson.unitId);
  const index = siblings.findIndex((entry) => entry.id === lesson.id);
  return index >= 0 ? siblings[index + 1] : undefined;
}
