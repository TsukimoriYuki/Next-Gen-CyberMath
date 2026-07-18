import {
  ELEMENTARY_GRADES,
  ELEMENTARY_SUBJECTS,
} from "@/data/elementary";
import { ELEMENTARY_VISUAL_ASSETS } from "@/data/elementary/assets";
import {
  ELEMENTARY_CURRICULUM_ENTRIES,
} from "@/data/elementary/curriculum";
import { ELEMENTARY_LESSONS } from "@/data/elementary/lessons";
import { ELEMENTARY_PROBLEMS } from "@/data/elementary/problems";
import { ELEMENTARY_UNITS } from "@/data/elementary/units";
import type { ElementaryVisualAsset } from "@/types/elementary-assets";
import type {
  ElementaryLesson,
  ElementaryLessonReviewStatus,
  ElementaryUnit,
} from "@/types/elementary-content";
import type {
  ElementaryCurriculumCoverageStatus,
  ElementaryCurriculumEntry,
} from "@/types/elementary-curriculum";
import type {
  ElementaryContentInventory,
  ElementaryCoverageBreakdown,
  ElementaryInventoryCounts,
  ElementaryInventoryIntegrityIssue,
  ElementaryInventoryScope,
  ElementaryPublicationBreakdown,
  ElementaryReviewBreakdown,
  ElementarySegmentedContentInventory,
} from "@/types/elementary-inventory";
import type { ElementaryProblem } from "@/types/elementary-problems";
import type {
  ElementaryCourseType,
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "@/types/elementary";

export type ElementaryInventoryRegistries = Readonly<{
  units: readonly ElementaryUnit[];
  lessons: readonly ElementaryLesson[];
  problems: readonly ElementaryProblem[];
  visualAssets: readonly ElementaryVisualAsset[];
  curriculumEntries: readonly ElementaryCurriculumEntry[];
}>;

export class ElementaryInventoryIntegrityError extends Error {
  readonly issues: readonly ElementaryInventoryIntegrityIssue[];

  constructor(issues: readonly ElementaryInventoryIntegrityIssue[]) {
    super(`Elementary content inventory has ${issues.length} unresolved or inconsistent reference(s).`);
    this.name = "ElementaryInventoryIntegrityError";
    this.issues = Object.freeze([...issues]);
  }
}

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const child of Object.values(value as Record<string, unknown>)) deepFreeze(child);
  }
  return value;
}

function uniqueSorted(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort((left, right) => left.localeCompare(right)));
}

function duplicateIds(values: readonly Readonly<{ id: string }>[]): readonly string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value.id)) duplicates.add(value.id);
    seen.add(value.id);
  }
  return uniqueSorted([...duplicates]);
}

function zeroCoverage(): Record<ElementaryCurriculumCoverageStatus, number> {
  return { "not-started": 0, partial: 0, covered: 0, reviewed: 0 };
}

function zeroPublication(): Record<ElementaryPublicationStatus, number> {
  return { hidden: 0, internal: 0, beta: 0, public: 0 };
}

function zeroReview(): Record<ElementaryLessonReviewStatus, number> {
  return { prototype: 0, pilot: 0, reviewed: 0, approved: 0 };
}

function coverageBreakdown(
  lessons: readonly ElementaryLesson[],
  field: "lessonCoverage" | "assessmentCoverage",
): ElementaryCoverageBreakdown {
  const result = zeroCoverage();
  for (const lesson of lessons) {
    for (const coverage of lesson.requirementCoverage) result[coverage[field]] += 1;
  }
  return Object.freeze(result);
}

function publicationBreakdown(
  units: readonly ElementaryUnit[],
  lessons: readonly ElementaryLesson[],
  problems: readonly ElementaryProblem[],
): ElementaryPublicationBreakdown {
  const result = zeroPublication();
  for (const item of [...units, ...lessons, ...problems]) result[item.publicationStatus] += 1;
  return Object.freeze(result);
}

function reviewBreakdown(
  units: readonly ElementaryUnit[],
  lessons: readonly ElementaryLesson[],
  problems: readonly ElementaryProblem[],
): ElementaryReviewBreakdown {
  const result = zeroReview();
  for (const item of [...units, ...lessons, ...problems]) result[item.reviewStatus] += 1;
  return Object.freeze(result);
}

function uniformStatus<T extends string>(values: readonly T[]): T | "mixed" {
  const unique = new Set(values);
  return unique.size === 1 ? values[0] : "mixed";
}

function countScope(
  units: readonly ElementaryUnit[],
  lessons: readonly ElementaryLesson[],
  problems: readonly ElementaryProblem[],
  approvedAssetIds: ReadonlySet<string>,
): ElementaryInventoryCounts {
  const visualAssetIds = uniqueSorted(
    lessons.flatMap((lesson) => lesson.visualAssetIds).filter((id) => approvedAssetIds.has(id)),
  );
  return Object.freeze({
    unitCount: units.length,
    lessonCount: lessons.length,
    problemCount: problems.length,
    singleChoiceCount: problems.filter((problem) => problem.type === "single-choice").length,
    multipleChoiceCount: problems.filter((problem) => problem.type === "multiple-choice").length,
    numericInputCount: problems.filter((problem) => problem.type === "numeric-input").length,
    basicCount: problems.filter((problem) => problem.difficulty === "basic").length,
    standardCount: problems.filter((problem) => problem.difficulty === "standard").length,
    visualAssetCount: visualAssetIds.length,
    curriculumEntryReferenceCount: uniqueSorted(
      lessons.flatMap((lesson) => lesson.curriculumReferenceIds),
    ).length,
    curriculumObjectiveReferenceCount: uniqueSorted(
      lessons.flatMap((lesson) => lesson.curriculumObjectiveIds),
    ).length,
  });
}

function buildScope(
  grade: ElementaryGradeId,
  subject: ElementarySubjectId | undefined,
  courseType: ElementaryCourseType,
  units: readonly ElementaryUnit[],
  lessons: readonly ElementaryLesson[],
  problems: readonly ElementaryProblem[],
  approvedAssetIds: ReadonlySet<string>,
): ElementaryInventoryScope {
  const allItems = [...units, ...lessons, ...problems];
  return deepFreeze({
    schoolLevel: "elementary" as const,
    grade,
    ...(subject ? { subject } : {}),
    courseType,
    ...countScope(units, lessons, problems, approvedAssetIds),
    lessonCoverage: coverageBreakdown(lessons, "lessonCoverage"),
    assessmentCoverage: coverageBreakdown(lessons, "assessmentCoverage"),
    publicationStatus: uniformStatus(allItems.map((item) => item.publicationStatus)),
    reviewStatus: uniformStatus(allItems.map((item) => item.reviewStatus)),
    publicationStatusBreakdown: publicationBreakdown(units, lessons, problems),
    reviewStatusBreakdown: reviewBreakdown(units, lessons, problems),
  });
}

function addIssue(
  issues: ElementaryInventoryIntegrityIssue[],
  axis: string,
  expected: unknown,
  actual: unknown,
  registryId: string,
  sourceFile: string,
) {
  issues.push({ axis, expected, actual, registryId, sourceFile });
}

function validateRegistries(registries: ElementaryInventoryRegistries) {
  const issues: ElementaryInventoryIntegrityIssue[] = [];
  const unitById = new Map(registries.units.map((unit) => [unit.id, unit]));
  const lessonById = new Map(registries.lessons.map((lesson) => [lesson.id, lesson]));
  const problemById = new Map(registries.problems.map((problem) => [problem.id, problem]));
  const assetById = new Map(registries.visualAssets.map((asset) => [asset.id, asset]));
  const entryById = new Map(registries.curriculumEntries.map((entry) => [entry.id, entry]));
  const objectiveById = new Map(
    registries.curriculumEntries.flatMap((entry) => entry.objectives.map((objective) => [objective.id, objective] as const)),
  );
  const gradeIds = new Set(ELEMENTARY_GRADES.map((grade) => grade.id));
  const subjectIds = new Set(ELEMENTARY_SUBJECTS.map((subject) => subject.id));

  for (const [axis, items, sourceFile] of [
    ["duplicate unit ID", registries.units, "src/data/elementary/units/index.ts"],
    ["duplicate lesson ID", registries.lessons, "src/data/elementary/lessons/index.ts"],
    ["duplicate problem ID", registries.problems, "src/data/elementary/problems/index.ts"],
    ["duplicate visual asset ID", registries.visualAssets, "src/data/elementary/assets/visual-assets.ts"],
  ] as const) {
    for (const id of duplicateIds(items)) addIssue(issues, axis, "unique", "duplicate", id, sourceFile);
  }

  for (const unit of registries.units) {
    if (!gradeIds.has(unit.grade)) addIssue(issues, "unit.grade", "registered grade", unit.grade, unit.id, "src/data/elementary/units/index.ts");
    if (!subjectIds.has(unit.subject)) addIssue(issues, "unit.subject", "registered subject", unit.subject, unit.id, "src/data/elementary/units/index.ts");
    for (const lessonId of unit.lessonIds) {
      if (!lessonById.has(lessonId)) addIssue(issues, "unit.lessonIds", "resolved lesson", "unresolved", unit.id, "src/data/elementary/units/index.ts");
    }
    for (const entryId of unit.curriculumEntryIds) {
      if (!entryById.has(entryId)) addIssue(issues, "unit.curriculumEntryIds", "resolved entry", entryId, unit.id, "src/data/elementary/units/index.ts");
    }
  }

  for (const lesson of registries.lessons) {
    if (!gradeIds.has(lesson.grade)) addIssue(issues, "lesson.grade", "registered grade", lesson.grade, lesson.id, "src/data/elementary/lessons/index.ts");
    if (!subjectIds.has(lesson.subject)) addIssue(issues, "lesson.subject", "registered subject", lesson.subject, lesson.id, "src/data/elementary/lessons/index.ts");
    const unit = unitById.get(lesson.unitId);
    if (!unit || !unit.lessonIds.includes(lesson.id)) addIssue(issues, "lesson.unitId", "unit containing lesson", lesson.unitId, lesson.id, "src/data/elementary/lessons/index.ts");
    for (const problemId of lesson.problemIds) {
      const problem = problemById.get(problemId);
      if (!problem || !problem.lessonIds.includes(lesson.id)) addIssue(issues, "lesson.problemIds", "problem linked back to lesson", problemId, lesson.id, "src/data/elementary/lessons/index.ts");
    }
    const linkedProblemIds = registries.problems.filter((problem) => problem.lessonIds.includes(lesson.id)).map((problem) => problem.id).sort();
    if (JSON.stringify([...lesson.problemIds].sort()) !== JSON.stringify(linkedProblemIds)) addIssue(issues, "lesson problem registry equality", [...lesson.problemIds].sort(), linkedProblemIds, lesson.id, "src/data/elementary/lessons/index.ts");
    for (const entryId of lesson.curriculumReferenceIds) {
      if (!entryById.has(entryId)) addIssue(issues, "lesson.curriculumReferenceIds", "resolved entry", entryId, lesson.id, "src/data/elementary/lessons/index.ts");
    }
    for (const objectiveId of lesson.curriculumObjectiveIds) {
      if (!objectiveById.has(objectiveId)) addIssue(issues, "lesson.curriculumObjectiveIds", "resolved objective", objectiveId, lesson.id, "src/data/elementary/lessons/index.ts");
    }
    for (const assetId of lesson.visualAssetIds) {
      if (!assetById.has(assetId)) addIssue(issues, "lesson.visualAssetIds", "resolved asset", assetId, lesson.id, "src/data/elementary/lessons/index.ts");
    }
  }

  for (const problem of registries.problems) {
    if (!gradeIds.has(problem.grade)) addIssue(issues, "problem.grade", "registered grade", problem.grade, problem.id, "src/data/elementary/problems/index.ts");
    if (!subjectIds.has(problem.subject)) addIssue(issues, "problem.subject", "registered subject", problem.subject, problem.id, "src/data/elementary/problems/index.ts");
    if (!unitById.has(problem.unitId)) addIssue(issues, "problem.unitId", "resolved unit", problem.unitId, problem.id, "src/data/elementary/problems/index.ts");
    for (const lessonId of problem.lessonIds) {
      if (!lessonById.has(lessonId)) addIssue(issues, "problem.lessonIds", "resolved formal lesson", lessonId, problem.id, "src/data/elementary/problems/index.ts");
    }
    for (const entryId of problem.curriculumEntryIds) {
      if (!entryById.has(entryId)) addIssue(issues, "problem.curriculumEntryIds", "resolved entry", entryId, problem.id, "src/data/elementary/problems/index.ts");
    }
    for (const objectiveId of problem.curriculumObjectiveIds) {
      if (!objectiveById.has(objectiveId)) addIssue(issues, "problem.curriculumObjectiveIds", "resolved objective", objectiveId, problem.id, "src/data/elementary/problems/index.ts");
    }
    if (problem.visualAssetId && !assetById.has(problem.visualAssetId)) addIssue(issues, "problem.visualAssetId", "resolved asset", problem.visualAssetId, problem.id, "src/data/elementary/problems/index.ts");
  }
  if (issues.length) throw new ElementaryInventoryIntegrityError(issues);
}

const DEFAULT_REGISTRIES: ElementaryInventoryRegistries = {
  units: ELEMENTARY_UNITS,
  lessons: ELEMENTARY_LESSONS,
  problems: ELEMENTARY_PROBLEMS,
  visualAssets: ELEMENTARY_VISUAL_ASSETS,
  curriculumEntries: ELEMENTARY_CURRICULUM_ENTRIES,
};

function buildInventoryFromRegistries(
  registries: ElementaryInventoryRegistries,
): ElementaryContentInventory {
  const approvedAssetIds = new Set(
    registries.visualAssets.filter((asset) => asset.reviewStatus === "approved").map((asset) => asset.id),
  );
  const grades = uniqueSorted(registries.lessons.map((lesson) => lesson.grade));
  const gradeScopes = grades.map((grade) => {
    const units = registries.units.filter((unit) => unit.grade === grade);
    const lessons = registries.lessons.filter((lesson) => lesson.grade === grade);
    const lessonIds = new Set(lessons.map((lesson) => lesson.id));
    const problems = registries.problems.filter((problem) => problem.lessonIds.some((id) => lessonIds.has(id)));
    return buildScope(grade as ElementaryGradeId, undefined, "regular", units, lessons, problems, approvedAssetIds);
  });
  const subjectScopes = grades.flatMap((grade) =>
    ELEMENTARY_SUBJECTS
      .filter((subject) => registries.lessons.some((lesson) => lesson.grade === grade && lesson.subject === subject.id))
      .sort((left, right) => left.order - right.order)
      .map((subject) => {
        const lessons = registries.lessons.filter((lesson) => lesson.grade === grade && lesson.subject === subject.id);
        const lessonIds = new Set(lessons.map((lesson) => lesson.id));
        return buildScope(
          grade as ElementaryGradeId,
          subject.id,
          "regular",
          registries.units.filter((unit) => unit.grade === grade && unit.subject === subject.id),
          lessons,
          registries.problems.filter((problem) => problem.lessonIds.some((id) => lessonIds.has(id))),
          approvedAssetIds,
        );
      }),
  );
  const totalsCounts = countScope(registries.units, registries.lessons, registries.problems, approvedAssetIds);
  const allItems = [...registries.units, ...registries.lessons, ...registries.problems];
  return deepFreeze({
    schoolLevel: "elementary" as const,
    grades: gradeScopes,
    subjects: subjectScopes,
    totals: {
      ...totalsCounts,
      lessonCoverage: coverageBreakdown(registries.lessons, "lessonCoverage"),
      assessmentCoverage: coverageBreakdown(registries.lessons, "assessmentCoverage"),
      publicationStatus: uniformStatus(allItems.map((item) => item.publicationStatus)),
      reviewStatus: uniformStatus(allItems.map((item) => item.reviewStatus)),
      publicationStatusBreakdown: publicationBreakdown(registries.units, registries.lessons, registries.problems),
      reviewStatusBreakdown: reviewBreakdown(registries.units, registries.lessons, registries.problems),
    },
    unitIds: uniqueSorted(registries.units.map((unit) => unit.id)),
    lessonIds: uniqueSorted(registries.lessons.map((lesson) => lesson.id)),
    problemIds: uniqueSorted(registries.problems.map((problem) => problem.id)),
    visualAssetIds: uniqueSorted(
      registries.lessons.flatMap((lesson) => lesson.visualAssetIds).filter((id) => approvedAssetIds.has(id)),
    ),
  });
}

/** 公開中の限定betaだけを返す。既存の公開件数表示・release gateの正本。 */
export function buildElementaryContentInventory(
  registries: ElementaryInventoryRegistries = DEFAULT_REGISTRIES,
): ElementaryContentInventory {
  validateRegistries(registries);
  const publishedLessonIds = new Set(
    registries.lessons.filter((lesson) => lesson.publicationStatus === "beta").map((lesson) => lesson.id),
  );
  return buildInventoryFromRegistries({
    ...registries,
    units: registries.units.filter((unit) => unit.publicationStatus === "beta"),
    lessons: registries.lessons.filter((lesson) => publishedLessonIds.has(lesson.id)),
    problems: registries.problems.filter(
      (problem) => problem.publicationStatus === "beta" && problem.lessonIds.some((id) => publishedLessonIds.has(id)),
    ),
  });
}

export function buildElementarySegmentedContentInventory(
  registries: ElementaryInventoryRegistries = DEFAULT_REGISTRIES,
): ElementarySegmentedContentInventory {
  validateRegistries(registries);
  const publishedLessonIds = new Set(registries.lessons.filter((lesson) => lesson.publicationStatus === "beta").map((lesson) => lesson.id));
  const hiddenLessonIds = new Set(registries.lessons.filter((lesson) => lesson.publicationStatus === "hidden").map((lesson) => lesson.id));
  const publishedBeta = buildInventoryFromRegistries({
    ...registries,
    units: registries.units.filter((unit) => unit.publicationStatus === "beta"),
    lessons: registries.lessons.filter((lesson) => publishedLessonIds.has(lesson.id)),
    problems: registries.problems.filter((problem) => problem.publicationStatus === "beta" && problem.lessonIds.some((id) => publishedLessonIds.has(id))),
  });
  const hiddenPilot = buildInventoryFromRegistries({
    ...registries,
    units: registries.units.filter((unit) => unit.publicationStatus === "hidden"),
    lessons: registries.lessons.filter((lesson) => hiddenLessonIds.has(lesson.id)),
    problems: registries.problems.filter((problem) => problem.publicationStatus === "hidden" && problem.lessonIds.some((id) => hiddenLessonIds.has(id))),
  });
  const registeredTotal = buildInventoryFromRegistries(registries);
  return deepFreeze({
    publishedBeta,
    hiddenPilot,
    registeredTotal,
    combinedProblemCounts: {
      highSchool: 1348 as const,
      published: 1348 + publishedBeta.totals.problemCount,
      registered: 1348 + registeredTotal.totals.problemCount,
    },
  });
}

export function getElementaryInventoryLabels() {
  return deepFreeze({
    grades: Object.fromEntries(ELEMENTARY_GRADES.map((grade) => [grade.id, grade.name])),
    subjects: Object.fromEntries(ELEMENTARY_SUBJECTS.map((subject) => [subject.id, subject.name])),
  });
}
