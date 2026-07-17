import type {
  ElementaryCourseType,
  ElementaryGradeId,
  ElementaryPublicationStatus,
  ElementarySubjectId,
} from "@/types/elementary";
import type {
  ElementaryLessonReviewStatus,
} from "@/types/elementary-content";
import type {
  ElementaryCurriculumCoverageStatus,
} from "@/types/elementary-curriculum";

export type ElementaryInventoryCounts = Readonly<{
  unitCount: number;
  lessonCount: number;
  problemCount: number;
  singleChoiceCount: number;
  multipleChoiceCount: number;
  numericInputCount: number;
  basicCount: number;
  standardCount: number;
  visualAssetCount: number;
  curriculumEntryReferenceCount: number;
  curriculumObjectiveReferenceCount: number;
}>;

export type ElementaryCoverageBreakdown = Readonly<
  Record<ElementaryCurriculumCoverageStatus, number>
>;

export type ElementaryPublicationBreakdown = Readonly<
  Record<ElementaryPublicationStatus, number>
>;

export type ElementaryReviewBreakdown = Readonly<
  Record<ElementaryLessonReviewStatus, number>
>;

export type ElementaryInventoryScope = ElementaryInventoryCounts &
  Readonly<{
    schoolLevel: "elementary";
    grade: ElementaryGradeId;
    subject?: ElementarySubjectId;
    courseType: ElementaryCourseType;
    lessonCoverage: ElementaryCoverageBreakdown;
    assessmentCoverage: ElementaryCoverageBreakdown;
    publicationStatus: ElementaryPublicationStatus | "mixed";
    reviewStatus: ElementaryLessonReviewStatus | "mixed";
    publicationStatusBreakdown: ElementaryPublicationBreakdown;
    reviewStatusBreakdown: ElementaryReviewBreakdown;
  }>;

export type ElementaryContentInventory = Readonly<{
  schoolLevel: "elementary";
  grades: readonly ElementaryInventoryScope[];
  subjects: readonly ElementaryInventoryScope[];
  totals: ElementaryInventoryCounts &
    Readonly<{
      lessonCoverage: ElementaryCoverageBreakdown;
      assessmentCoverage: ElementaryCoverageBreakdown;
      publicationStatus: ElementaryPublicationStatus | "mixed";
      reviewStatus: ElementaryLessonReviewStatus | "mixed";
      publicationStatusBreakdown: ElementaryPublicationBreakdown;
      reviewStatusBreakdown: ElementaryReviewBreakdown;
    }>;
  unitIds: readonly string[];
  lessonIds: readonly string[];
  problemIds: readonly string[];
  visualAssetIds: readonly string[];
}>;

export type ElementaryInventoryIntegrityIssue = Readonly<{
  axis: string;
  expected: unknown;
  actual: unknown;
  registryId: string;
  sourceFile: string;
}>;
