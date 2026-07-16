import type {
  ElementaryCourseType,
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "@/types/elementary";

export const ELEMENTARY_CURRICULUM_COMPETENCIES = [
  "knowledge-and-skills",
  "thinking-judgment-expression",
  "learning-attitude",
] as const;

export const ELEMENTARY_CURRICULUM_ASSESSMENT_SUITABILITIES = [
  "directly-scorable",
  "observable-in-lesson",
  "project-or-discussion",
  "human-review-required",
] as const;

export const ELEMENTARY_CURRICULUM_COVERAGE_STATUSES = [
  "not-started",
  "partial",
  "covered",
  "reviewed",
] as const;

export type ElementaryCurriculumRequirementType = "required" | "enrichment";
export type ElementaryCurriculumCompetency =
  (typeof ELEMENTARY_CURRICULUM_COMPETENCIES)[number];
export type ElementaryCurriculumAssessmentSuitability =
  (typeof ELEMENTARY_CURRICULUM_ASSESSMENT_SUITABILITIES)[number];
export type ElementaryCurriculumCoverageStatus =
  (typeof ELEMENTARY_CURRICULUM_COVERAGE_STATUSES)[number];
export type ElementaryCurriculumDomainId = string;
export type ElementaryCurriculumEntryId = string;
export type ElementaryCurriculumSourceId = string;
export type ElementaryCurriculumReviewStatus = "approved" | "needs-review";

export type ElementaryCurriculumSource = Readonly<{
  id: ElementaryCurriculumSourceId;
  authority: "MEXT";
  title: string;
  documentType: "curriculum-guideline" | "curriculum-commentary";
  noticeYear: 2017;
  publicationYear: number;
  officialUrl: `https://${string}`;
  landingPageUrl: `https://${string}`;
  retrievedAt: `${number}-${number}-${number}`;
  subject: ElementarySubjectId | "all";
  applicableGrades: readonly ElementaryGradeId[];
  reviewStatus: ElementaryCurriculumReviewStatus;
  notes: string;
  verification: Readonly<{
    algorithm: "sha256";
    value: string;
    verifiedAt: `${number}-${number}-${number}`;
  }>;
}>;

export type ElementaryCurriculumDomain = Readonly<{
  id: ElementaryCurriculumDomainId;
  subject: ElementarySubjectId;
  gradeIds: readonly ElementaryGradeId[];
  title: string;
  developerLabel: string;
  childFacingTitle?: string;
  order: number;
  sourceIds: readonly ElementaryCurriculumSourceId[];
}>;

export type ElementaryCurriculumSourceLocator = Readonly<{
  sourceId: ElementaryCurriculumSourceId;
  chapter: string;
  section: string;
  heading: string;
  printedPages?: string;
}>;

export type ElementaryCurriculumObjective = Readonly<{
  id: string;
  competency: ElementaryCurriculumCompetency;
  summary: string;
  requirementType: ElementaryCurriculumRequirementType;
  sourceIds: readonly ElementaryCurriculumSourceId[];
  assessmentSuitability: ElementaryCurriculumAssessmentSuitability;
  suggestedEvidence: string;
}>;

export type ElementaryCurriculumEntry = Readonly<{
  id: ElementaryCurriculumEntryId;
  grade: ElementaryGradeId;
  subject: ElementarySubjectId;
  courseType: ElementaryCourseType;
  domainId: ElementaryCurriculumDomainId;
  title: string;
  summary: string;
  requirementType: ElementaryCurriculumRequirementType;
  competencies: readonly ElementaryCurriculumCompetency[];
  objectives: readonly ElementaryCurriculumObjective[];
  sourceIds: readonly ElementaryCurriculumSourceId[];
  sourceLocators: readonly ElementaryCurriculumSourceLocator[];
  prerequisiteEntryIds: readonly ElementaryCurriculumEntryId[];
  nextEntryIds: readonly ElementaryCurriculumEntryId[];
  relatedEntryIds: readonly ElementaryCurriculumEntryId[];
  recommendedUnitIds: readonly string[];
  reviewStatus: ElementaryCurriculumReviewStatus;
  publicationStatus: ElementaryPublicationStatus;
  notes: string;
}>;

export type ElementaryCurriculumReference = Readonly<{
  entryId: ElementaryCurriculumEntryId;
  objectiveIds: readonly string[];
  requirementType: ElementaryCurriculumRequirementType;
}>;

export type ElementaryCurriculumCoverage = Readonly<{
  entryId: ElementaryCurriculumEntryId;
  objectiveIds: readonly string[];
  lessonCoverage: ElementaryCurriculumCoverageStatus;
  assessmentCoverage: ElementaryCurriculumCoverageStatus;
}>;

export type ElementaryCurriculumCoverageSummary = Readonly<{
  entryId: ElementaryCurriculumEntryId;
  lessonCoverage: ElementaryCurriculumCoverageStatus;
  assessmentCoverage: ElementaryCurriculumCoverageStatus;
  objectiveIds: readonly string[];
  lessonIds: readonly string[];
  problemIds: readonly string[];
}>;

export type ElementaryCurriculumPrerequisite = Readonly<{
  prerequisiteEntryId: ElementaryCurriculumEntryId;
  nextEntryId: ElementaryCurriculumEntryId;
  crossesGrade: boolean;
}>;

export type ElementaryCurriculumViolation = Readonly<{
  entityId: string;
  fieldPath: string;
  ruleId: string;
  expected: unknown;
  actual: unknown;
}>;

export type ElementaryCurriculumInspectionResult = Readonly<{
  violations: readonly ElementaryCurriculumViolation[];
}>;
