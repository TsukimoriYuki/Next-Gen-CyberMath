import fs from "node:fs";
import path from "node:path";
import { ELEMENTARY_SITE } from "../src/data/elementary";
import { ELEMENTARY_VISUAL_ASSETS } from "../src/data/elementary/assets";
import { ELEMENTARY_EXPANSION_WAVE_1 } from "../src/data/elementary/expansion-wave-1";
import { ELEMENTARY_LESSONS } from "../src/data/elementary/lessons";
import { ELEMENTARY_PROBLEMS } from "../src/data/elementary/problems";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import { ELEMENTARY_CURRICULUM_ENTRIES } from "../src/data/elementary/curriculum";
import { SUBJECTS } from "../src/data/subjects";
import { evaluateElementaryPublication } from "../src/lib/elementary-publication";
import { isElementaryLimitedBetaActive } from "../src/lib/elementary-release";
import { buildElementaryContentInventory } from "../src/lib/elementary-inventory";
import { evaluateSubjectPublication } from "../src/lib/subject-publication";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

const rollbackFixture = Object.freeze({ publicationStatus: "hidden" as const });
const waveLessonIds: ReadonlySet<string> = new Set(ELEMENTARY_EXPANSION_WAVE_1.lessonIds);
const waveUnitIds: ReadonlySet<string> = new Set(ELEMENTARY_EXPANSION_WAVE_1.unitIds);
const waveRollbackInventory = buildElementaryContentInventory({
  units: ELEMENTARY_UNITS.map((unit) => waveUnitIds.has(unit.id) ? { ...unit, publicationStatus: "hidden" as const } : unit),
  lessons: ELEMENTARY_LESSONS.map((lesson) => waveLessonIds.has(lesson.id) ? { ...lesson, publicationStatus: "hidden" as const } : lesson),
  problems: ELEMENTARY_PROBLEMS.map((problem) => problem.lessonIds.some((id) => waveLessonIds.has(id)) ? { ...problem, publicationStatus: "hidden" as const } : problem),
  visualAssets: ELEMENTARY_VISUAL_ASSETS,
  curriculumEntries: ELEMENTARY_CURRICULUM_ENTRIES,
});

check(waveRollbackInventory.totals.unitCount === 3, "wave-only rollback must retain 3 original units");
check(waveRollbackInventory.totals.lessonCount === 3, "wave-only rollback must retain 3 original lessons");
check(waveRollbackInventory.totals.problemCount === 24, "wave-only rollback must retain 24 original problems");
check(waveRollbackInventory.totals.visualAssetCount === 2, "wave-only rollback must retain 2 original assets");
const protectedScopes = [
  "elementary root",
  "grade-3",
  "subject",
  "unit",
  "lesson",
  "guardian page",
  "credits page",
] as const;

for (const scope of protectedScopes) {
  const decision = evaluateElementaryPublication(rollbackFixture.publicationStatus, "production");
  check(!decision.allowed, `${scope} must be 404 after the release-only hidden switch`);
}

check(
  !isElementaryLimitedBetaActive(rollbackFixture.publicationStatus),
  "/learn elementary card must be absent after the release-only hidden switch",
);
check(
  ELEMENTARY_SITE.publicationStatus === "beta",
  "rollback fixture must not mutate the live elementary registry",
);
check(
  ELEMENTARY_EXPANSION_WAVE_1.publicationStatus === "beta" && ELEMENTARY_EXPANSION_WAVE_1.releaseStatus === "active",
  "wave-only rollback fixture must not mutate the live expansion registry",
);
check(
  SUBJECTS.every((subject) => evaluateSubjectPublication(subject, undefined, "production").allowed),
  "rollback fixture must not affect high-school publication",
);

const documentSource = fs.readFileSync(
  path.join(process.cwd(), "docs/elementary-limited-beta-release.md"),
  "utf8",
);
for (const requiredText of [
  "ELEMENTARY_SITE.publicationStatus",
  "Expansion Wave 1",
  "元の3講座・24問",
  "beta",
  "hidden",
  "DB rollbackは不要",
  "高校版全体を停止しない",
]) {
  check(documentSource.includes(requiredText), `rollback document is missing: ${requiredText}`);
}

if (issues.length) {
  console.error(`elementary limited beta rollback test FAILED: ${issues.length} issue(s).`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log("elementary limited beta rollback test passed: wave-only rollback restores 3 lessons / 24 problems / 2 assets, and the full release-only hidden switch protects all elementary routes without affecting high school.");
}
