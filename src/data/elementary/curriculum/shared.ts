import type {
  ElementaryCurriculumAssessmentSuitability,
  ElementaryCurriculumCompetency,
  ElementaryCurriculumEntry,
  ElementaryCurriculumObjective,
  ElementaryCurriculumRequirementType,
  ElementaryCurriculumSourceLocator,
} from "@/types/elementary-curriculum";
import type { ElementarySubjectId } from "@/types/elementary";

type ObjectiveInput = Readonly<{
  id: string;
  competency: ElementaryCurriculumCompetency;
  summary: string;
  assessmentSuitability: ElementaryCurriculumAssessmentSuitability;
  suggestedEvidence: string;
}>;

type EntryInput = Readonly<{
  id: string;
  subject: Extract<ElementarySubjectId, "math" | "japanese" | "social-studies">;
  domainId: string;
  title: string;
  summary: string;
  requirementType?: ElementaryCurriculumRequirementType;
  objectives: readonly ObjectiveInput[];
  sourceLocators: readonly ElementaryCurriculumSourceLocator[];
  prerequisiteEntryIds?: readonly string[];
  nextEntryIds?: readonly string[];
  relatedEntryIds?: readonly string[];
  recommendedUnitIds?: readonly string[];
  notes: string;
}>;

export const MAIN_SOURCE_ID = "mext-elementary-curriculum-2017";
export const MATH_SOURCE_ID = "mext-elementary-math-commentary-2017";
export const JAPANESE_SOURCE_ID = "mext-elementary-japanese-commentary-2017";
export const SOCIAL_SOURCE_ID = "mext-elementary-social-commentary-2017";

export function defineGrade3CurriculumEntry(input: EntryInput): ElementaryCurriculumEntry {
  const requirementType = input.requirementType ?? "required";
  const sourceIds = Object.freeze([...new Set(input.sourceLocators.map((locator) => locator.sourceId))]);
  const objectives: readonly ElementaryCurriculumObjective[] = Object.freeze(
    input.objectives.map((objective) => Object.freeze({
      ...objective,
      requirementType,
      sourceIds,
    })),
  );
  return Object.freeze({
    id: input.id,
    grade: "grade-3",
    subject: input.subject,
    courseType: "regular",
    domainId: input.domainId,
    title: input.title,
    summary: input.summary,
    requirementType,
    competencies: Object.freeze([...new Set(objectives.map((objective) => objective.competency))]),
    objectives,
    sourceIds,
    sourceLocators: Object.freeze(input.sourceLocators.map((locator) => Object.freeze(locator))),
    prerequisiteEntryIds: Object.freeze([...(input.prerequisiteEntryIds ?? [])]),
    nextEntryIds: Object.freeze([...(input.nextEntryIds ?? [])]),
    relatedEntryIds: Object.freeze([...(input.relatedEntryIds ?? [])]),
    recommendedUnitIds: Object.freeze([...(input.recommendedUnitIds ?? [])]),
    reviewStatus: "approved",
    publicationStatus: "hidden",
    notes: input.notes,
  });
}

export function subjectLocators(
  sourceId: string,
  chapter: string,
  section: string,
  heading: string,
  printedPages: string,
): readonly ElementaryCurriculumSourceLocator[] {
  return [
    { sourceId: MAIN_SOURCE_ID, chapter: "第2章 各教科", section, heading },
    { sourceId, chapter, section, heading, printedPages },
  ];
}
