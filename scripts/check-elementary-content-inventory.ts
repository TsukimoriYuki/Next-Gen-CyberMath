import { ELEMENTARY_VISUAL_ASSETS } from "../src/data/elementary/assets";
import {
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
} from "../src/data/elementary/curriculum";
import { ELEMENTARY_LESSONS } from "../src/data/elementary/lessons";
import { ELEMENTARY_PROBLEMS } from "../src/data/elementary/problems";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import {
  buildElementaryContentInventory,
  buildElementarySegmentedContentInventory,
  ElementaryInventoryIntegrityError,
} from "../src/lib/elementary-inventory";
import { buildContentInventory } from "./content-inventory-lib";
import type { ElementaryInventoryIntegrityIssue } from "../src/types/elementary-inventory";

const issues: ElementaryInventoryIntegrityIssue[] = [];

function check(
  axis: string,
  expected: unknown,
  actual: unknown,
  registryId = "elementary",
  sourceFile = "src/lib/elementary-inventory.ts",
) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    issues.push({ axis, expected, actual, registryId, sourceFile });
  }
}

let inventory: ReturnType<typeof buildElementaryContentInventory> | undefined;
try {
  inventory = buildElementaryContentInventory();
} catch (error) {
  if (error instanceof ElementaryInventoryIntegrityError) issues.push(...error.issues);
  else throw error;
}

if (inventory) {
  const segmented = buildElementarySegmentedContentInventory();
  const totals = inventory.totals;
  check("unitCount", 3, totals.unitCount, "ELEMENTARY_UNITS", "src/data/elementary/units/index.ts");
  check("lessonCount", 3, totals.lessonCount, "ELEMENTARY_LESSONS", "src/data/elementary/lessons/index.ts");
  check("problemCount", 24, totals.problemCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("subjectCount", 3, inventory.subjects.length);
  check("singleChoiceCount", 17, totals.singleChoiceCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("multipleChoiceCount", 3, totals.multipleChoiceCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("numericInputCount", 4, totals.numericInputCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("basicCount", 18, totals.basicCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("standardCount", 6, totals.standardCount, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("approved visualAssetCount", 2, totals.visualAssetCount, "ELEMENTARY_VISUAL_ASSETS", "src/data/elementary/assets/visual-assets.ts");
  check("publicationStatus", "beta", totals.publicationStatus);
  check("reviewStatus", "pilot", totals.reviewStatus);
  check("lessonCoverage", { "not-started": 0, partial: 3, covered: 0, reviewed: 0 }, totals.lessonCoverage);
  check("assessmentCoverage", { "not-started": 0, partial: 3, covered: 0, reviewed: 0 }, totals.assessmentCoverage);

  for (const subject of inventory.subjects) {
    check("subject.lessonCount", 1, subject.lessonCount, subject.subject, "src/data/elementary/lessons/index.ts");
    check("subject.problemCount", 8, subject.problemCount, subject.subject, "src/data/elementary/problems/index.ts");
  }
  const summedSubjectProblems = inventory.subjects.reduce((sum, subject) => sum + subject.problemCount, 0);
  const summedSubjectLessons = inventory.subjects.reduce((sum, subject) => sum + subject.lessonCount, 0);
  check("subject problem total", totals.problemCount, summedSubjectProblems);
  check("subject lesson total", totals.lessonCount, summedSubjectLessons);
  check("grade problem total", totals.problemCount, inventory.grades.reduce((sum, grade) => sum + grade.problemCount, 0));
  check("grade lesson total", totals.lessonCount, inventory.grades.reduce((sum, grade) => sum + grade.lessonCount, 0));

  check("duplicate unit IDs", ELEMENTARY_UNITS.length, new Set(ELEMENTARY_UNITS.map((unit) => unit.id)).size, "ELEMENTARY_UNITS", "src/data/elementary/units/index.ts");
  check("duplicate lesson IDs", ELEMENTARY_LESSONS.length, new Set(ELEMENTARY_LESSONS.map((lesson) => lesson.id)).size, "ELEMENTARY_LESSONS", "src/data/elementary/lessons/index.ts");
  check("duplicate problem IDs", ELEMENTARY_PROBLEMS.length, new Set(ELEMENTARY_PROBLEMS.map((problem) => problem.id)).size, "ELEMENTARY_PROBLEMS", "src/data/elementary/problems/index.ts");
  check("showcase excluded", false, inventory.lessonIds.includes(ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE.id), ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE.id, "src/data/elementary/showcases/division-dialogue.ts");

  for (const lesson of ELEMENTARY_LESSONS) {
    const linkedProblems = ELEMENTARY_PROBLEMS.filter((problem) => problem.lessonIds.includes(lesson.id));
    check("lesson problem count", 8, linkedProblems.length, lesson.id, "src/data/elementary/lessons/index.ts");
    check("lesson problemIds and registry", [...lesson.problemIds].sort(), linkedProblems.map((problem) => problem.id).sort(), lesson.id, "src/data/elementary/lessons/index.ts");
    check("lesson coverage is partial", true, lesson.requirementCoverage.every((coverage) => coverage.lessonCoverage === "partial"), lesson.id, "src/data/elementary/lessons/index.ts");
    check("assessment coverage is partial", true, lesson.requirementCoverage.every((coverage) => coverage.assessmentCoverage === "partial"), lesson.id, "src/data/elementary/lessons/index.ts");
    check("curriculum entry references resolve", true, lesson.curriculumReferenceIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[id])), lesson.id, "src/data/elementary/lessons/index.ts");
    check("curriculum objective references resolve", true, lesson.curriculumObjectiveIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[id])), lesson.id, "src/data/elementary/lessons/index.ts");
    check(
      "assessment coverage has real problem references",
      true,
      lesson.requirementCoverage.every((coverage) =>
        linkedProblems.some(
          (problem) =>
            problem.curriculumEntryIds.includes(coverage.entryId) &&
            problem.curriculumObjectiveIds.some((id) => coverage.objectiveIds.includes(id)),
        ),
      ),
      lesson.id,
      "src/data/elementary/lessons/index.ts",
    );
  }

  check(
    "approved assets are counted once",
    ELEMENTARY_VISUAL_ASSETS.filter((asset) => asset.reviewStatus === "approved" && inventory?.visualAssetIds.includes(asset.id)).length,
    totals.visualAssetCount,
    "ELEMENTARY_VISUAL_ASSETS",
    "src/data/elementary/assets/visual-assets.ts",
  );
  check("formal content contains TODO or placeholder", false, /\b(?:TODO|TBD|placeholder)\b/iu.test(JSON.stringify({ units: ELEMENTARY_UNITS, lessons: ELEMENTARY_LESSONS, problems: ELEMENTARY_PROBLEMS })));
  check("inventory result is immutable", true, Object.isFrozen(inventory) && Object.isFrozen(inventory.totals) && Object.isFrozen(inventory.subjects));

  const highSchool = buildContentInventory("inventory-qa", "2026-01-01T00:00:00.000Z");
  check("highSchool problemCount", 1348, highSchool.totals.scorableQuestionCount, "highSchool", "scripts/content-inventory-lib.ts");
  check("combined problemCount", 1372, highSchool.totals.scorableQuestionCount + totals.problemCount, "combined", "scripts/content-inventory-lib.ts");
  check("hidden unitCount", 4, segmented.hiddenPilot.totals.unitCount, "hiddenPilot", "src/lib/elementary-inventory.ts");
  check("hidden lessonCount", 6, segmented.hiddenPilot.totals.lessonCount, "hiddenPilot", "src/lib/elementary-inventory.ts");
  check("hidden problemCount", 48, segmented.hiddenPilot.totals.problemCount, "hiddenPilot", "src/lib/elementary-inventory.ts");
  check("registered unitCount", 7, segmented.registeredTotal.totals.unitCount, "registeredTotal", "src/lib/elementary-inventory.ts");
  check("registered lessonCount", 9, segmented.registeredTotal.totals.lessonCount, "registeredTotal", "src/lib/elementary-inventory.ts");
  check("registered problemCount", 72, segmented.registeredTotal.totals.problemCount, "registeredTotal", "src/lib/elementary-inventory.ts");
  check("published combined problemCount", 1372, segmented.combinedProblemCounts.published, "combined", "src/lib/elementary-inventory.ts");
  check("registered combined problemCount", 1420, segmented.combinedProblemCounts.registered, "combined", "src/lib/elementary-inventory.ts");

  let failClosed = false;
  try {
    buildElementaryContentInventory({
      units: ELEMENTARY_UNITS,
      lessons: ELEMENTARY_LESSONS,
      problems: ELEMENTARY_PROBLEMS.slice(1),
      visualAssets: ELEMENTARY_VISUAL_ASSETS,
      curriculumEntries: Object.values(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID),
    });
  } catch (error) {
    failClosed = error instanceof ElementaryInventoryIntegrityError && error.issues.length > 0;
  }
  check("unknown reference fails closed", true, failClosed, "fixture:missing-problem", "scripts/check-elementary-content-inventory.ts");
}

if (issues.length) {
  console.error(`elementary content inventory QA failed: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`- axis: ${issue.axis}`);
    console.error(`  expected: ${JSON.stringify(issue.expected)}`);
    console.error(`  actual: ${JSON.stringify(issue.actual)}`);
    console.error(`  registry ID: ${issue.registryId}`);
    console.error(`  source file: ${issue.sourceFile}`);
  }
  process.exitCode = 1;
} else if (inventory) {
  console.log(
    `elementary content inventory QA passed: published 3 units / 3 lessons / 24 problems / 2 assets; hidden 4 units / 6 lessons / 48 problems; registered 7 / 9 / 72; high school 1348 / published combined 1372 / registered combined 1420`,
  );
}
