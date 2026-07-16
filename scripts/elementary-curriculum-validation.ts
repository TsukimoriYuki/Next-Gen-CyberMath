import type {
  ElementaryCourseType,
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "../src/types/elementary";
import {
  ELEMENTARY_CURRICULUM_ASSESSMENT_SUITABILITIES,
  ELEMENTARY_CURRICULUM_COMPETENCIES,
  ELEMENTARY_CURRICULUM_COVERAGE_STATUSES,
  type ElementaryCurriculumCoverage,
  type ElementaryCurriculumDomain,
  type ElementaryCurriculumEntry,
  type ElementaryCurriculumInspectionResult,
  type ElementaryCurriculumSource,
  type ElementaryCurriculumViolation,
} from "../src/types/elementary-curriculum";

export type CurriculumLessonValidationShape = Readonly<{
  id: string;
  grade: ElementaryGradeId;
  subject: ElementarySubjectId;
  courseType: ElementaryCourseType;
  reviewStatus: "prototype" | "reviewed";
  publicationStatus: ElementaryPublicationStatus;
  curriculumReferenceIds: readonly string[];
  curriculumObjectiveIds: readonly string[];
  requirementCoverage: readonly ElementaryCurriculumCoverage[];
  enrichmentReferenceIds: readonly string[];
  problemIds: readonly string[];
}>;

export type ElementaryCurriculumValidationInput = Readonly<{
  sources: readonly ElementaryCurriculumSource[];
  domains: readonly ElementaryCurriculumDomain[];
  entries: readonly ElementaryCurriculumEntry[];
  lessons: readonly CurriculumLessonValidationShape[];
  requireCompleteGrade3Scope?: boolean;
}>;

const competencies = new Set<string>(ELEMENTARY_CURRICULUM_COMPETENCIES);
const assessmentSuitabilities = new Set<string>(ELEMENTARY_CURRICULUM_ASSESSMENT_SUITABILITIES);
const coverageStatuses = new Set<string>(ELEMENTARY_CURRICULUM_COVERAGE_STATUSES);
const allowedSubjects = new Set<string>(["math", "japanese", "social-studies"]);

function violation(
  entityId: string,
  fieldPath: string,
  ruleId: string,
  expected: unknown,
  actual: unknown,
): ElementaryCurriculumViolation {
  return Object.freeze({ entityId, fieldPath, ruleId, expected, actual });
}

function duplicates(values: readonly string[]) {
  const seen = new Set<string>();
  return values.filter((value) => {
    if (seen.has(value)) return true;
    seen.add(value);
    return false;
  });
}

function hasPlaceholder(value: string) {
  return /(?:TODO|TBD|PLACEHOLDER|LOREM)/iu.test(value);
}

function isMextHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "mext.go.jp" || url.hostname.endsWith(".mext.go.jp"));
  } catch {
    return false;
  }
}

function inspectSources(
  input: ElementaryCurriculumValidationInput,
  violations: ElementaryCurriculumViolation[],
) {
  const duplicateIds = duplicates(input.sources.map((source) => source.id));
  for (const id of duplicateIds) {
    violations.push(violation(id, "sources.id", "SOURCE_ID_UNIQUE", "unique", id));
  }
  for (const source of input.sources) {
    if (source.authority !== "MEXT") violations.push(violation(source.id, "authority", "SOURCE_AUTHORITY_MEXT", "MEXT", source.authority));
    if (!isMextHttpsUrl(source.officialUrl)) violations.push(violation(source.id, "officialUrl", "SOURCE_OFFICIAL_URL", "MEXT HTTPS URL", source.officialUrl));
    if (!isMextHttpsUrl(source.landingPageUrl)) violations.push(violation(source.id, "landingPageUrl", "SOURCE_LANDING_URL", "MEXT HTTPS URL", source.landingPageUrl));
    if (!/^\d{4}-\d{2}-\d{2}$/u.test(source.retrievedAt) || Number.isNaN(Date.parse(source.retrievedAt))) violations.push(violation(source.id, "retrievedAt", "SOURCE_RETRIEVED_AT_VALID", "valid ISO date", source.retrievedAt));
    if (source.reviewStatus !== "approved") violations.push(violation(source.id, "reviewStatus", "SOURCE_REVIEW_APPROVED", "approved", source.reviewStatus));
    if (source.applicableGrades.length === 0) violations.push(violation(source.id, "applicableGrades", "SOURCE_GRADES_REQUIRED", "at least one grade", source.applicableGrades));
    if (hasPlaceholder(`${source.title} ${source.notes}`)) violations.push(violation(source.id, "notes", "SOURCE_PLACEHOLDER_FORBIDDEN", "reviewed text", source.notes));
    if (!/^[a-f0-9]{64}$/u.test(source.verification.value)) violations.push(violation(source.id, "verification.value", "SOURCE_HASH_VALID", "64 lowercase hex chars", source.verification.value));
  }
}

function inspectDomains(
  input: ElementaryCurriculumValidationInput,
  sourceIds: ReadonlySet<string>,
  violations: ElementaryCurriculumViolation[],
) {
  for (const id of duplicates(input.domains.map((domain) => domain.id))) {
    violations.push(violation(id, "domains.id", "DOMAIN_ID_UNIQUE", "unique", id));
  }
  for (const key of duplicates(input.domains.map((domain) => `${domain.subject}:${domain.order}`))) {
    violations.push(violation(key, "domains.order", "DOMAIN_ORDER_UNIQUE", "unique per subject", key));
  }
  for (const domain of input.domains) {
    if (!allowedSubjects.has(domain.subject)) violations.push(violation(domain.id, "subject", "DOMAIN_SUBJECT_ALLOWED", [...allowedSubjects], domain.subject));
    if (!domain.gradeIds.includes("grade-3")) violations.push(violation(domain.id, "gradeIds", "DOMAIN_GRADE_APPLICABLE", "grade-3", domain.gradeIds));
    if (!domain.title.trim()) violations.push(violation(domain.id, "title", "DOMAIN_TITLE_REQUIRED", "non-empty", domain.title));
    for (const sourceId of domain.sourceIds) {
      if (!sourceIds.has(sourceId)) violations.push(violation(domain.id, "sourceIds", "DOMAIN_SOURCE_RESOLVES", "known source", sourceId));
    }
  }
}

function inspectEntries(
  input: ElementaryCurriculumValidationInput,
  sourceById: ReadonlyMap<string, ElementaryCurriculumSource>,
  domainById: ReadonlyMap<string, ElementaryCurriculumDomain>,
  violations: ElementaryCurriculumViolation[],
) {
  const entryById = new Map(input.entries.map((entry) => [entry.id, entry]));
  const objectiveOwner = new Map<string, string>();
  for (const id of duplicates(input.entries.map((entry) => entry.id))) {
    violations.push(violation(id, "entries.id", "ENTRY_ID_UNIQUE", "unique", id));
  }
  for (const key of duplicates(input.entries.map((entry) => `${entry.grade}:${entry.subject}:${entry.title}`))) {
    violations.push(violation(key, "entries.title", "ENTRY_TITLE_UNIQUE", "unique within grade and subject", key));
  }

  for (const entry of input.entries) {
    const domain = domainById.get(entry.domainId);
    if (entry.grade !== "grade-3") violations.push(violation(entry.id, "grade", "ENTRY_CURRENT_SCOPE_GRADE", "grade-3", entry.grade));
    if (!allowedSubjects.has(entry.subject)) violations.push(violation(entry.id, "subject", "ENTRY_CURRENT_SCOPE_SUBJECT", [...allowedSubjects], entry.subject));
    if (entry.courseType !== "regular") violations.push(violation(entry.id, "courseType", "ENTRY_REGULAR_COURSE", "regular", entry.courseType));
    if (!domain) violations.push(violation(entry.id, "domainId", "ENTRY_DOMAIN_RESOLVES", "known domain", entry.domainId));
    if (domain && (domain.subject !== entry.subject || !domain.gradeIds.includes(entry.grade))) violations.push(violation(entry.id, "domainId", "ENTRY_DOMAIN_MATCHES", { subject: entry.subject, grade: entry.grade }, domain));
    if (!entry.title.trim()) violations.push(violation(entry.id, "title", "ENTRY_TITLE_REQUIRED", "non-empty", entry.title));
    if (!entry.summary.trim() || entry.summary.length > 240) violations.push(violation(entry.id, "summary", "ENTRY_SUMMARY_CONCISE", "1-240 chars", entry.summary.length));
    if (!new Set(["required", "enrichment"]).has(entry.requirementType)) violations.push(violation(entry.id, "requirementType", "ENTRY_REQUIREMENT_VALID", "required or enrichment", entry.requirementType));
    if (entry.reviewStatus !== "approved") violations.push(violation(entry.id, "reviewStatus", "ENTRY_REVIEW_APPROVED", "approved", entry.reviewStatus));
    if (entry.publicationStatus !== "hidden") violations.push(violation(entry.id, "publicationStatus", "ENTRY_HIDDEN", "hidden", entry.publicationStatus));
    if (entry.objectives.length === 0) violations.push(violation(entry.id, "objectives", "ENTRY_OBJECTIVES_REQUIRED", "at least one", entry.objectives));
    if (entry.sourceIds.length === 0) violations.push(violation(entry.id, "sourceIds", "ENTRY_SOURCES_REQUIRED", "at least one", entry.sourceIds));
    if (entry.sourceLocators.length === 0) violations.push(violation(entry.id, "sourceLocators", "ENTRY_LOCATORS_REQUIRED", "at least one", entry.sourceLocators));
    if (hasPlaceholder(`${entry.title} ${entry.summary} ${entry.notes}`)) violations.push(violation(entry.id, "notes", "ENTRY_PLACEHOLDER_FORBIDDEN", "reviewed text", entry.notes));
    for (const competency of entry.competencies) {
      if (!competencies.has(competency)) violations.push(violation(entry.id, "competencies", "ENTRY_COMPETENCY_VALID", [...competencies], competency));
    }
    for (const sourceId of entry.sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) violations.push(violation(entry.id, "sourceIds", "ENTRY_SOURCE_RESOLVES", "known source", sourceId));
      if (source && source.subject !== "all" && source.subject !== entry.subject) violations.push(violation(entry.id, "sourceIds", "ENTRY_SOURCE_SUBJECT_MATCHES", entry.subject, source.subject));
      if (source && !source.applicableGrades.includes(entry.grade)) violations.push(violation(entry.id, "sourceIds", "ENTRY_SOURCE_GRADE_MATCHES", entry.grade, source.applicableGrades));
    }
    for (const locator of entry.sourceLocators) {
      if (!sourceById.has(locator.sourceId) || !entry.sourceIds.includes(locator.sourceId)) violations.push(violation(entry.id, "sourceLocators.sourceId", "ENTRY_LOCATOR_SOURCE_RESOLVES", entry.sourceIds, locator.sourceId));
      if (![locator.chapter, locator.section, locator.heading].every((value) => value.trim())) violations.push(violation(entry.id, "sourceLocators", "ENTRY_LOCATOR_STRUCTURED", "chapter, section and heading", locator));
    }
    for (const objective of entry.objectives) {
      const previousOwner = objectiveOwner.get(objective.id);
      if (previousOwner) violations.push(violation(objective.id, "objectives.id", "OBJECTIVE_ID_UNIQUE", "unique", previousOwner));
      objectiveOwner.set(objective.id, entry.id);
      if (!competencies.has(objective.competency)) violations.push(violation(objective.id, "competency", "OBJECTIVE_COMPETENCY_VALID", [...competencies], objective.competency));
      if (!assessmentSuitabilities.has(objective.assessmentSuitability)) violations.push(violation(objective.id, "assessmentSuitability", "OBJECTIVE_ASSESSMENT_VALID", [...assessmentSuitabilities], objective.assessmentSuitability));
      if (!objective.summary.trim() || objective.summary.length > 180) violations.push(violation(objective.id, "summary", "OBJECTIVE_SUMMARY_CONCISE", "1-180 chars", objective.summary.length));
      if (objective.sourceIds.length === 0 || objective.sourceIds.some((sourceId) => !sourceById.has(sourceId))) violations.push(violation(objective.id, "sourceIds", "OBJECTIVE_SOURCES_RESOLVE", "known source IDs", objective.sourceIds));
      if (objective.requirementType !== entry.requirementType) violations.push(violation(objective.id, "requirementType", "OBJECTIVE_REQUIREMENT_MATCHES_ENTRY", entry.requirementType, objective.requirementType));
    }
    if (entry.requirementType === "required" && !entry.objectives.some((objective) => objective.requirementType === "required")) violations.push(violation(entry.id, "objectives", "REQUIRED_ENTRY_HAS_REQUIRED_OBJECTIVE", "required objective", entry.objectives.map((objective) => objective.requirementType)));
  }

  for (const entry of input.entries) {
    for (const [fieldPath, references] of [
      ["prerequisiteEntryIds", entry.prerequisiteEntryIds],
      ["nextEntryIds", entry.nextEntryIds],
      ["relatedEntryIds", entry.relatedEntryIds],
    ] as const) {
      for (const referenceId of references) {
        if (referenceId === entry.id) violations.push(violation(entry.id, fieldPath, "ENTRY_REFERENCE_NOT_SELF", "different entry", referenceId));
        if (!entryById.has(referenceId)) violations.push(violation(entry.id, fieldPath, "ENTRY_REFERENCE_RESOLVES", "known entry", referenceId));
      }
    }
    for (const prerequisiteId of entry.prerequisiteEntryIds) {
      const prerequisite = entryById.get(prerequisiteId);
      if (prerequisite && !prerequisite.nextEntryIds.includes(entry.id)) violations.push(violation(entry.id, "prerequisiteEntryIds", "ENTRY_NEXT_PREREQUISITE_INVERSE", `${prerequisiteId}.nextEntryIds includes ${entry.id}`, prerequisite.nextEntryIds));
    }
    for (const nextId of entry.nextEntryIds) {
      const next = entryById.get(nextId);
      if (next && !next.prerequisiteEntryIds.includes(entry.id)) violations.push(violation(entry.id, "nextEntryIds", "ENTRY_PREREQUISITE_NEXT_INVERSE", `${nextId}.prerequisiteEntryIds includes ${entry.id}`, next.prerequisiteEntryIds));
    }
  }

  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (entryId: string, path: readonly string[]) => {
    if (visiting.has(entryId)) {
      violations.push(violation(entryId, "prerequisiteEntryIds", "ENTRY_PREREQUISITE_ACYCLIC", "acyclic graph", [...path, entryId]));
      return;
    }
    if (visited.has(entryId)) return;
    visiting.add(entryId);
    for (const prerequisiteId of entryById.get(entryId)?.prerequisiteEntryIds ?? []) visit(prerequisiteId, [...path, entryId]);
    visiting.delete(entryId);
    visited.add(entryId);
  };
  for (const entry of input.entries) visit(entry.id, []);
}

function inspectLessons(
  input: ElementaryCurriculumValidationInput,
  violations: ElementaryCurriculumViolation[],
) {
  const entryById = new Map(input.entries.map((entry) => [entry.id, entry]));
  const objectiveOwner = new Map(input.entries.flatMap((entry) => entry.objectives.map((objective) => [objective.id, entry.id] as const)));
  for (const lesson of input.lessons) {
    const allReferenceIds = [...lesson.curriculumReferenceIds, ...lesson.enrichmentReferenceIds];
    if (new Set(allReferenceIds).size !== allReferenceIds.length) violations.push(violation(lesson.id, "curriculumReferenceIds", "LESSON_REFERENCE_UNIQUE", "unique and disjoint", allReferenceIds));
    for (const entryId of lesson.curriculumReferenceIds) {
      const entry = entryById.get(entryId);
      if (!entry) violations.push(violation(lesson.id, "curriculumReferenceIds", "LESSON_REFERENCE_RESOLVES", "known entry", entryId));
      if (entry?.requirementType !== "required") violations.push(violation(lesson.id, "curriculumReferenceIds", "LESSON_REQUIRED_REFERENCE_MATCHES", "required entry", entry?.requirementType));
    }
    for (const entryId of lesson.enrichmentReferenceIds) {
      const entry = entryById.get(entryId);
      if (!entry) violations.push(violation(lesson.id, "enrichmentReferenceIds", "LESSON_REFERENCE_RESOLVES", "known entry", entryId));
      if (entry?.requirementType !== "enrichment") violations.push(violation(lesson.id, "enrichmentReferenceIds", "LESSON_ENRICHMENT_REFERENCE_MATCHES", "enrichment entry", entry?.requirementType));
    }
    for (const objectiveId of lesson.curriculumObjectiveIds) {
      const ownerId = objectiveOwner.get(objectiveId);
      if (!ownerId || !allReferenceIds.includes(ownerId)) violations.push(violation(lesson.id, "curriculumObjectiveIds", "LESSON_OBJECTIVE_RESOLVES", "objective of referenced entry", objectiveId));
    }
    for (const coverage of lesson.requirementCoverage) {
      if (!entryById.has(coverage.entryId) || !allReferenceIds.includes(coverage.entryId)) violations.push(violation(lesson.id, "requirementCoverage.entryId", "LESSON_COVERAGE_ENTRY_RESOLVES", allReferenceIds, coverage.entryId));
      if (!coverageStatuses.has(coverage.lessonCoverage) || !coverageStatuses.has(coverage.assessmentCoverage)) violations.push(violation(lesson.id, "requirementCoverage", "LESSON_COVERAGE_STATUS_VALID", [...coverageStatuses], coverage));
      for (const objectiveId of coverage.objectiveIds) {
        if (objectiveOwner.get(objectiveId) !== coverage.entryId || !lesson.curriculumObjectiveIds.includes(objectiveId)) violations.push(violation(lesson.id, "requirementCoverage.objectiveIds", "LESSON_COVERAGE_OBJECTIVE_RESOLVES", `objective of ${coverage.entryId} and declared by lesson`, objectiveId));
      }
      if (lesson.reviewStatus === "prototype" && new Set(["covered", "reviewed"]).has(coverage.lessonCoverage)) violations.push(violation(lesson.id, "requirementCoverage.lessonCoverage", "PROTOTYPE_NOT_FULLY_COVERED", "not-started or partial", coverage.lessonCoverage));
      if (lesson.problemIds.length === 0 && coverage.assessmentCoverage !== "not-started") violations.push(violation(lesson.id, "requirementCoverage.assessmentCoverage", "NO_PROBLEMS_NOT_ASSESSED", "not-started", coverage.assessmentCoverage));
    }
  }
}

export function inspectElementaryCurriculum(
  input: ElementaryCurriculumValidationInput,
): ElementaryCurriculumInspectionResult {
  const violations: ElementaryCurriculumViolation[] = [];
  const sourceById = new Map(input.sources.map((source) => [source.id, source]));
  const domainById = new Map(input.domains.map((domain) => [domain.id, domain]));
  inspectSources(input, violations);
  inspectDomains(input, new Set(sourceById.keys()), violations);
  inspectEntries(input, sourceById, domainById, violations);
  inspectLessons(input, violations);
  if (input.requireCompleteGrade3Scope) {
    for (const subject of allowedSubjects) {
      if (!input.entries.some((entry) => entry.subject === subject && entry.requirementType === "required")) violations.push(violation(subject, "entries", "SCOPE_REQUIRED_SUBJECT_ENTRY", "at least one required entry", 0));
    }
    if (!input.entries.some((entry) => entry.requirementType === "enrichment")) violations.push(violation("scope", "entries", "SCOPE_ENRICHMENT_SEPARATE", "at least one enrichment entry", 0));
  }
  return Object.freeze({ violations: Object.freeze(violations) });
}
