import {
  ELEMENTARY_CURRICULUM_DOMAINS,
  ELEMENTARY_CURRICULUM_ENTRIES,
  ELEMENTARY_CURRICULUM_SOURCES,
} from "../src/data/elementary/curriculum";
import type {
  ElementaryCurriculumEntry,
  ElementaryCurriculumSource,
} from "../src/types/elementary-curriculum";
import {
  inspectElementaryCurriculum,
  type CurriculumLessonValidationShape,
} from "./elementary-curriculum-validation";

const productionEntry = (id: string) => {
  const entry = ELEMENTARY_CURRICULUM_ENTRIES.find((value) => value.id === id);
  if (!entry) throw new Error(`Missing fixture base entry: ${id}`);
  return entry;
};

const isolated = (entry: ElementaryCurriculumEntry): ElementaryCurriculumEntry => ({
  ...entry,
  prerequisiteEntryIds: [],
  nextEntryIds: [],
  relatedEntryIds: [],
});

const mathEntry = isolated(productionEntry("g3-math-division"));
const japaneseEntry = isolated(productionEntry("g3-japanese-reading-expository"));
const socialEntry = isolated(productionEntry("g3-social-local-area-municipality"));

const partialLesson: CurriculumLessonValidationShape = {
  id: "fixture-lesson",
  grade: "grade-3",
  subject: "math",
  courseType: "regular",
  reviewStatus: "prototype",
  publicationStatus: "hidden",
  curriculumReferenceIds: [mathEntry.id],
  curriculumObjectiveIds: [mathEntry.objectives[0].id],
  requirementCoverage: [{
    entryId: mathEntry.id,
    objectiveIds: [mathEntry.objectives[0].id],
    lessonCoverage: "partial",
    assessmentCoverage: "not-started",
  }],
  enrichmentReferenceIds: [],
  problemIds: [],
};

type Fixture = Readonly<{
  name: string;
  sources?: readonly ElementaryCurriculumSource[];
  entries?: readonly ElementaryCurriculumEntry[];
  lessons?: readonly CurriculumLessonValidationShape[];
  expectedRule?: string;
  expectPass?: boolean;
}>;

const badSource = {
  ...ELEMENTARY_CURRICULUM_SOURCES[0],
  authority: "OTHER",
} as unknown as ElementaryCurriculumSource;

const fixtures: readonly Fixture[] = [
  { name: "unknown source", entries: [{ ...mathEntry, sourceIds: ["missing"], sourceLocators: [{ ...mathEntry.sourceLocators[0], sourceId: "missing" }] }], expectedRule: "ENTRY_SOURCE_RESOLVES" },
  { name: "non-MEXT required source", sources: [badSource, ...ELEMENTARY_CURRICULUM_SOURCES.slice(1)], expectedRule: "SOURCE_AUTHORITY_MEXT" },
  { name: "missing locator", entries: [{ ...mathEntry, sourceLocators: [] }], expectedRule: "ENTRY_LOCATORS_REQUIRED" },
  { name: "unknown domain", entries: [{ ...mathEntry, domainId: "missing" }], expectedRule: "ENTRY_DOMAIN_RESOLVES" },
  { name: "unknown competency", entries: [{ ...mathEntry, competencies: ["unknown" as never] }], expectedRule: "ENTRY_COMPETENCY_VALID" },
  { name: "objective 0", entries: [{ ...mathEntry, objectives: [] }], expectedRule: "ENTRY_OBJECTIVES_REQUIRED" },
  { name: "source 0", entries: [{ ...mathEntry, sourceIds: [], sourceLocators: [] }], expectedRule: "ENTRY_SOURCES_REQUIRED" },
  { name: "self prerequisite", entries: [{ ...mathEntry, prerequisiteEntryIds: [mathEntry.id] }], expectedRule: "ENTRY_REFERENCE_NOT_SELF" },
  { name: "cyclic prerequisite", entries: [{ ...mathEntry, id: "cycle-a", prerequisiteEntryIds: ["cycle-b"] }, { ...mathEntry, id: "cycle-b", prerequisiteEntryIds: ["cycle-a"] }], expectedRule: "ENTRY_PREREQUISITE_ACYCLIC" },
  { name: "inconsistent next relation", entries: [{ ...mathEntry, id: "next-a", nextEntryIds: ["next-b"] }, { ...mathEntry, id: "next-b" }], expectedRule: "ENTRY_PREREQUISITE_NEXT_INVERSE" },
  { name: "required with enrichment-only objective", entries: [{ ...mathEntry, objectives: mathEntry.objectives.map((objective) => ({ ...objective, requirementType: "enrichment" })) }], expectedRule: "REQUIRED_ENTRY_HAS_REQUIRED_OBJECTIVE" },
  { name: "lesson unresolved reference", lessons: [{ ...partialLesson, curriculumReferenceIds: ["missing"] }], expectedRule: "LESSON_REFERENCE_RESOLVES" },
  { name: "lesson false covered state", lessons: [{ ...partialLesson, requirementCoverage: [{ ...partialLesson.requirementCoverage[0], lessonCoverage: "covered" }] }], expectedRule: "PROTOTYPE_NOT_FULLY_COVERED" },
  { name: "grade-4 detailed entry", entries: [{ ...mathEntry, grade: "grade-4" }], expectedRule: "ENTRY_CURRENT_SCOPE_GRADE" },
  { name: "science entry enabled", entries: [{ ...mathEntry, subject: "science" }], expectedRule: "ENTRY_CURRENT_SCOPE_SUBJECT" },
  { name: "valid grade-3 math entry", entries: [mathEntry], expectPass: true },
  { name: "valid grade-3 Japanese entry", entries: [japaneseEntry], expectPass: true },
  { name: "valid grade-3 social entry", entries: [socialEntry], expectPass: true },
  { name: "valid partial lesson coverage", entries: [mathEntry], lessons: [partialLesson], expectPass: true },
];

let failures = 0;
for (const fixture of fixtures) {
  const result = inspectElementaryCurriculum({
    sources: fixture.sources ?? ELEMENTARY_CURRICULUM_SOURCES,
    domains: ELEMENTARY_CURRICULUM_DOMAINS,
    entries: fixture.entries ?? [mathEntry],
    lessons: fixture.lessons ?? [],
  });
  const passed = fixture.expectPass
    ? result.violations.length === 0
    : result.violations.some((value) => value.ruleId === fixture.expectedRule);
  if (!passed) {
    failures += 1;
    console.error(`${fixture.name} FAILED: expected ${fixture.expectPass ? "no violations" : fixture.expectedRule}; got ${result.violations.map((value) => value.ruleId).join(", ")}`);
  }
}

if (failures > 0) {
  console.error(`elementary curriculum fixture FAILED: ${failures}/${fixtures.length}`);
  process.exitCode = 1;
} else {
  console.log(`elementary curriculum fixture passed: ${fixtures.length} source, domain, competency, relation, scope, lesson, and coverage boundaries.`);
}
