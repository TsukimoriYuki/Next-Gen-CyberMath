import { ELEMENTARY_CURRICULUM_ENTRIES } from "../src/data/elementary/curriculum";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import {
  getCurriculumCoverageSummary,
  type CurriculumAwareLesson,
} from "../src/lib/elementary-curriculum";

const lesson = ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE as unknown as CurriculumAwareLesson;
const coverage = getCurriculumCoverageSummary([lesson]);
const division = coverage.find((entry) => entry.entryId === "g3-math-division");
const violations: string[] = [];

if (division?.lessonCoverage !== "partial") violations.push(`division lesson coverage expected partial; got ${division?.lessonCoverage}`);
if (division?.assessmentCoverage !== "not-started") violations.push(`division assessment coverage expected not-started; got ${division?.assessmentCoverage}`);
if (coverage.some((entry) => entry.lessonCoverage === "covered" || entry.lessonCoverage === "reviewed")) violations.push("prototype must not fully cover any curriculum entry");
if (coverage.some((entry) => entry.assessmentCoverage !== "not-started")) violations.push("assessment coverage must remain not-started without problems");
if (lesson.problemIds.length !== 0 || coverage.some((entry) => entry.problemIds.length !== 0)) violations.push("problem references must be empty in Phase F");
const notStarted = coverage.filter((entry) => entry.lessonCoverage === "not-started").length;
if (notStarted !== ELEMENTARY_CURRICULUM_ENTRIES.length - 1) violations.push(`not-started count must be derived as entries - 1; got ${notStarted}`);
if (coverage.length !== ELEMENTARY_CURRICULUM_ENTRIES.length) violations.push("coverage summary must include every registry entry");

if (violations.length > 0) {
  console.error(`elementary curriculum coverage QA FAILED: ${violations.length} issue(s).`);
  violations.forEach((value) => console.error(value));
  process.exitCode = 1;
} else {
  console.log(`elementary curriculum coverage QA passed: 1 partial lesson entry, ${notStarted} not-started entries, 0 covered entries, and 0 assessed problems.`);
}
