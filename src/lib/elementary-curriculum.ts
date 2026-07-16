import {
  ELEMENTARY_CURRICULUM_ENTRIES,
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
  ELEMENTARY_CURRICULUM_SOURCES_BY_ID,
} from "@/data/elementary/curriculum";
import type { ElementarySubjectId } from "@/types/elementary";
import type { ElementaryLesson } from "@/types/elementary-content";
import type {
  ElementaryCurriculumCoverage,
  ElementaryCurriculumCoverageStatus,
  ElementaryCurriculumCoverageSummary,
  ElementaryCurriculumEntry,
  ElementaryCurriculumObjective,
} from "@/types/elementary-curriculum";

export type CurriculumAwareLesson = ElementaryLesson & Readonly<{
  curriculumObjectiveIds: readonly string[];
  requirementCoverage: readonly ElementaryCurriculumCoverage[];
  enrichmentReferenceIds: readonly string[];
}>;

const STATUS_RANK: Readonly<Record<ElementaryCurriculumCoverageStatus, number>> = {
  "not-started": 0,
  partial: 1,
  covered: 2,
  reviewed: 3,
};

function stableEntries(entries: readonly ElementaryCurriculumEntry[]) {
  return Object.freeze([...entries].sort((left, right) =>
    left.subject.localeCompare(right.subject) ||
    left.domainId.localeCompare(right.domainId) ||
    left.id.localeCompare(right.id),
  ));
}

function maxStatus(
  statuses: readonly ElementaryCurriculumCoverageStatus[],
): ElementaryCurriculumCoverageStatus {
  return statuses.reduce<ElementaryCurriculumCoverageStatus>(
    (highest, status) => STATUS_RANK[status] > STATUS_RANK[highest] ? status : highest,
    "not-started",
  );
}

export function getElementaryCurriculumEntry(
  entryId: string,
): ElementaryCurriculumEntry | undefined {
  return ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[entryId];
}

export function getCurriculumEntriesForGrade(
  gradeId: string,
): readonly ElementaryCurriculumEntry[] {
  return stableEntries(ELEMENTARY_CURRICULUM_ENTRIES.filter((entry) => entry.grade === gradeId));
}

export function getCurriculumEntriesForSubject(
  subjectId: ElementarySubjectId | string,
  gradeId = "grade-3",
): readonly ElementaryCurriculumEntry[] {
  return stableEntries(
    ELEMENTARY_CURRICULUM_ENTRIES.filter(
      (entry) => entry.grade === gradeId && entry.subject === subjectId,
    ),
  );
}

export function getRequiredCurriculumEntries(): readonly ElementaryCurriculumEntry[] {
  return stableEntries(ELEMENTARY_CURRICULUM_ENTRIES.filter((entry) => entry.requirementType === "required"));
}

export function getEnrichmentCurriculumEntries(): readonly ElementaryCurriculumEntry[] {
  return stableEntries(ELEMENTARY_CURRICULUM_ENTRIES.filter((entry) => entry.requirementType === "enrichment"));
}

export function getCurriculumObjectives(
  entryId: string,
): readonly ElementaryCurriculumObjective[] {
  return Object.freeze([...(getElementaryCurriculumEntry(entryId)?.objectives ?? [])]);
}

export function getPrerequisiteEntries(entryId: string): readonly ElementaryCurriculumEntry[] {
  const entry = assertCurriculumReferenceResolved(entryId);
  return Object.freeze(entry.prerequisiteEntryIds.map(assertCurriculumReferenceResolved));
}

export function getNextEntries(entryId: string): readonly ElementaryCurriculumEntry[] {
  const entry = assertCurriculumReferenceResolved(entryId);
  return Object.freeze(entry.nextEntryIds.map(assertCurriculumReferenceResolved));
}

export function getCurriculumCoverageForLesson(
  lesson: CurriculumAwareLesson,
): readonly ElementaryCurriculumCoverage[] {
  for (const entryId of [...lesson.curriculumReferenceIds, ...lesson.enrichmentReferenceIds]) {
    assertCurriculumReferenceResolved(entryId);
  }
  for (const objectiveId of lesson.curriculumObjectiveIds) {
    if (!ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[objectiveId]) {
      throw new Error(`Unknown elementary curriculum objective: ${objectiveId}`);
    }
  }
  return Object.freeze(lesson.requirementCoverage.map((coverage) => Object.freeze({
    ...coverage,
    objectiveIds: Object.freeze([...coverage.objectiveIds]),
  })));
}

export function getCurriculumCoverageForUnit(
  unitId: string,
  lessons: readonly CurriculumAwareLesson[],
): readonly ElementaryCurriculumCoverageSummary[] {
  const unitLessons = lessons.filter((lesson) => lesson.unitId === unitId);
  const referencedEntryIds = new Set(unitLessons.flatMap((lesson) =>
    [...lesson.curriculumReferenceIds, ...lesson.enrichmentReferenceIds],
  ));
  return getCurriculumCoverageSummary(unitLessons).filter((summary) =>
    referencedEntryIds.has(summary.entryId),
  );
}

export function getCurriculumCoverageSummary(
  lessons: readonly CurriculumAwareLesson[],
): readonly ElementaryCurriculumCoverageSummary[] {
  return Object.freeze(ELEMENTARY_CURRICULUM_ENTRIES.map((entry) => {
    const matched = lessons.flatMap((lesson) =>
      getCurriculumCoverageForLesson(lesson)
        .filter((coverage) => coverage.entryId === entry.id)
        .map((coverage) => ({ lesson, coverage })),
    );
    return Object.freeze({
      entryId: entry.id,
      lessonCoverage: maxStatus(matched.map(({ coverage }) => coverage.lessonCoverage)),
      assessmentCoverage: maxStatus(matched.map(({ coverage }) => coverage.assessmentCoverage)),
      objectiveIds: Object.freeze([...new Set(matched.flatMap(({ coverage }) => coverage.objectiveIds))]),
      lessonIds: Object.freeze([...new Set(matched.map(({ lesson }) => lesson.id))]),
      problemIds: Object.freeze([...new Set(matched.flatMap(({ lesson }) => lesson.problemIds))]),
    });
  }));
}

export function getLessonsForCurriculumEntry(
  entryId: string,
  lessons: readonly CurriculumAwareLesson[],
): readonly CurriculumAwareLesson[] {
  assertCurriculumReferenceResolved(entryId);
  return Object.freeze(lessons.filter((lesson) =>
    lesson.curriculumReferenceIds.includes(entryId) ||
    lesson.enrichmentReferenceIds.includes(entryId),
  ));
}

export function getCurriculumSource(sourceId: string) {
  return ELEMENTARY_CURRICULUM_SOURCES_BY_ID[sourceId];
}

export function assertCurriculumReferenceResolved(entryId: string): ElementaryCurriculumEntry {
  const entry = getElementaryCurriculumEntry(entryId);
  if (!entry) throw new Error(`Unknown elementary curriculum entry: ${entryId}`);
  return entry;
}
