import { ELEMENTARY_EXPANSION_WAVE_2 } from "../src/data/elementary/expansion-wave-2";
import { ELEMENTARY_VISUAL_ASSETS } from "../src/data/elementary/assets";
import { ELEMENTARY_LESSONS } from "../src/data/elementary/lessons";
import { ELEMENTARY_EXPANSION_WAVE_2_LESSONS } from "../src/data/elementary/lessons/expansion-wave-2";
import { ELEMENTARY_PROBLEMS } from "../src/data/elementary/problems";
import { ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS } from "../src/data/elementary/problems/expansion-wave-2";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import { buildElementarySegmentedContentInventory } from "../src/lib/elementary-inventory";
import { ELEMENTARY_LIMITED_BETA_RELEASE } from "../src/data/elementary/release";
import { extractElementaryInlineText, getElementaryLessonTextFields } from "../src/lib/elementary-text";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import type { ElementaryInlineContent } from "../src/types/elementary-content";

type Issue = Readonly<{ id: string; field: string; ruleId: string; expected: unknown; actual: unknown; source: string }>;
const issues: Issue[] = [];
const add = (id: string, field: string, ruleId: string, expected: unknown, actual: unknown, source: string) =>
  issues.push({ id, field, ruleId, expected, actual, source });
const check = (condition: boolean, id: string, field: string, ruleId: string, expected: unknown, actual: unknown, source: string) => {
  if (!condition) add(id, field, ruleId, expected, actual, source);
};

const waveUnits = ELEMENTARY_UNITS.filter((unit) => ELEMENTARY_EXPANSION_WAVE_2.unitIds.includes(unit.id as never));
const waveLessons = ELEMENTARY_EXPANSION_WAVE_2_LESSONS;
const waveProblems = ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS;
const waveAssets = ELEMENTARY_VISUAL_ASSETS.filter((asset) => ELEMENTARY_EXPANSION_WAVE_2.assetIds?.includes(asset.id as never));
const segmented = buildElementarySegmentedContentInventory();
const kanjiPolicy = getElementaryKanjiPolicy("grade-3");

function checkLearnerText(content: ElementaryInlineContent, id: string, field: string, source: string) {
  const result = inspectElementaryText({ content, grade: 3, audience: "learner", policy: kanjiPolicy, context: "lesson", sourceLocation: source, contentId: id, fieldPath: field });
  for (const violation of result.violations) add(id, field, `kanji:${violation.type}`, "grade-3 compliant text", `${violation.character}: ${violation.reason}`, source);
}

for (const [field, expected, actual] of [
  ["unitCount", 7, waveUnits.length], ["lessonCount", 10, waveLessons.length], ["problemCount", 80, waveProblems.length], ["assetCount", 8, waveAssets.length],
  ["singleChoiceCount", 42, waveProblems.filter((problem) => problem.type === "single-choice").length],
  ["multipleChoiceCount", 4, waveProblems.filter((problem) => problem.type === "multiple-choice").length],
  ["numericInputCount", 34, waveProblems.filter((problem) => problem.type === "numeric-input").length],
  ["basicCount", 60, waveProblems.filter((problem) => problem.difficulty === "basic").length],
  ["standardCount", 20, waveProblems.filter((problem) => problem.difficulty === "standard").length],
] as const) check(actual === expected, "grade-3-math-expansion-wave-2", field, `wave-two-${field}`, expected, actual, "src/data/elementary/expansion-wave-2.ts");

for (const [field, expected, actual] of [
  ["registeredUnits", 14, segmented.registeredTotal.totals.unitCount], ["registeredLessons", 19, segmented.registeredTotal.totals.lessonCount],
  ["registeredProblems", 152, segmented.registeredTotal.totals.problemCount], ["registeredAssets", 14, segmented.registeredTotal.totals.visualAssetCount],
  ["registeredSingle", 91, segmented.registeredTotal.totals.singleChoiceCount], ["registeredMultiple", 11, segmented.registeredTotal.totals.multipleChoiceCount],
  ["registeredNumeric", 50, segmented.registeredTotal.totals.numericInputCount], ["registeredBasic", 114, segmented.registeredTotal.totals.basicCount],
  ["registeredStandard", 38, segmented.registeredTotal.totals.standardCount], ["publishedProblems", 72, segmented.publishedBeta.totals.problemCount],
  ["publishedAssets", 6, segmented.publishedBeta.totals.visualAssetCount], ["publishedCombined", 1420, segmented.combinedProblemCounts.published],
  ["registeredCombined", 1500, segmented.combinedProblemCounts.registered],
] as const) check(actual === expected, "elementary-inventory", field, `inventory-${field}`, expected, actual, "src/lib/elementary-inventory.ts");

check(ELEMENTARY_EXPANSION_WAVE_2.publicationStatus === "hidden", ELEMENTARY_EXPANSION_WAVE_2.id, "publicationStatus", "wave-hidden", "hidden", ELEMENTARY_EXPANSION_WAVE_2.publicationStatus, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval === "pending", ELEMENTARY_EXPANSION_WAVE_2.id, "explicitReleaseApproval", "approval-pending", "pending", ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2.reviewSource === "none", ELEMENTARY_EXPANSION_WAVE_2.id, "reviewSource", "no-ai-approval", "none", ELEMENTARY_EXPANSION_WAVE_2.reviewSource, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2.automaticRelease === false, ELEMENTARY_EXPANSION_WAVE_2.id, "automaticRelease", "automatic-release-disabled", false, ELEMENTARY_EXPANSION_WAVE_2.automaticRelease, "src/data/elementary/expansion-wave-2.ts");
check(Object.values(ELEMENTARY_EXPANSION_WAVE_2.humanReviews).every((status) => status === "not-reviewed"), ELEMENTARY_EXPANSION_WAVE_2.id, "humanReviews", "human-review-pending", "all not-reviewed", ELEMENTARY_EXPANSION_WAVE_2.humanReviews, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_LIMITED_BETA_RELEASE.currentChannel === "limited-beta" && ELEMENTARY_LIMITED_BETA_RELEASE.approvedScope.some((scope) => scope.id === "total-problems" && scope.label.includes("72")), "current-limited-beta", "approvedScope", "current-beta-unaffected", "active 9 lessons / 72 problems", ELEMENTARY_LIMITED_BETA_RELEASE.approvedScope, "src/data/elementary/release.ts");

const requiredBlockTypes = ["opening-question", "learning-goals", "dialogue", "visual", "explanation", "guided-example", "key-point", "retry", "summary", "practice-set"];
for (const lesson of waveLessons) {
  const blocks = lesson.blocks;
  const linkedProblems = waveProblems.filter((problem) => problem.lessonIds.includes(lesson.id));
  check(lesson.publicationStatus === "hidden" && lesson.reviewStatus === "pilot", lesson.id, "status", "hidden-pilot-lesson", "hidden / pilot", `${lesson.publicationStatus} / ${lesson.reviewStatus}`, "src/data/elementary/lessons/expansion-wave-2.ts");
  check(linkedProblems.length === 8 && lesson.problemIds.length === 8, lesson.id, "problemIds", "eight-problems-per-lesson", 8, linkedProblems.length, "src/data/elementary/lessons/expansion-wave-2.ts");
  check(requiredBlockTypes.every((type) => blocks.some((block) => block.type === type)), lesson.id, "blocks", "required-lesson-blocks", requiredBlockTypes, blocks.map((block) => block.type), "src/data/elementary/lessons/expansion-wave-2.ts");
  check(blocks.filter((block) => block.type === "guided-example").length >= 2, lesson.id, "guidedExamples", "two-guided-examples", 2, blocks.filter((block) => block.type === "guided-example").length, "src/data/elementary/lessons/expansion-wave-2.ts");
  check(lesson.requirementCoverage.every((coverage) => coverage.lessonCoverage === "partial" && coverage.assessmentCoverage === "partial"), lesson.id, "requirementCoverage", "partial-not-covered", "partial / partial", lesson.requirementCoverage, "src/data/elementary/lessons/expansion-wave-2.ts");
  for (const field of getElementaryLessonTextFields(lesson)) checkLearnerText(field.content, lesson.id, field.path, "src/data/elementary/lessons/expansion-wave-2.ts");
}

for (const problem of waveProblems) {
  check(problem.publicationStatus === "hidden" && problem.reviewStatus === "pilot", problem.id, "status", "hidden-pilot-problem", "hidden / pilot", `${problem.publicationStatus} / ${problem.reviewStatus}`, "src/data/elementary/problems/expansion-wave-2.ts");
  check(problem.sourceType === "original" && problem.copyrightStatus === "original", problem.id, "rights", "original-source", "original / original", `${problem.sourceType} / ${problem.copyrightStatus}`, "src/data/elementary/problems/expansion-wave-2.ts");
  check(problem.curriculumEntryIds.length > 0 && problem.curriculumObjectiveIds.length > 0, problem.id, "curriculum", "curriculum-reference-required", "resolved IDs", problem.curriculumEntryIds, "src/data/elementary/problems/expansion-wave-2.ts");
  if (problem.answer.kind === "multiple-choice") check(problem.answer.correctChoiceIds.length === problem.answer.selectionCount, problem.id, "answer.selectionCount", "multiple-count-matches", problem.answer.correctChoiceIds.length, problem.answer.selectionCount, "src/data/elementary/problems/expansion-wave-2.ts");
  if (problem.answer.kind === "numeric-input") check(Number.isFinite(problem.answer.numeric.value) && problem.answer.numeric.tolerance === 0, problem.id, "answer.numeric", "finite-exact-numeric", "finite / tolerance 0", problem.answer.numeric, "src/data/elementary/problems/expansion-wave-2.ts");
  checkLearnerText(problem.title, problem.id, "title", "src/data/elementary/problems/expansion-wave-2.ts");
  checkLearnerText(problem.prompt, problem.id, "prompt", "src/data/elementary/problems/expansion-wave-2.ts");
  checkLearnerText(problem.hint, problem.id, "hint", "src/data/elementary/problems/expansion-wave-2.ts");
  for (const [field, content] of Object.entries(problem.explanation)) checkLearnerText(content, problem.id, `explanation.${field}`, "src/data/elementary/problems/expansion-wave-2.ts");
  problem.choices.forEach((choice, index) => {
    checkLearnerText(choice.label, problem.id, `choices.${index}.label`, "src/data/elementary/problems/expansion-wave-2.ts");
    checkLearnerText(choice.reason, problem.id, `choices.${index}.reason`, "src/data/elementary/problems/expansion-wave-2.ts");
  });
}

for (const asset of waveAssets) {
  check(asset.reviewStatus === "approved" && asset.source.sourceType === "original" && asset.rightsStatus === "cyber-math-original", asset.id, "assetReview", "original-approved-asset", "approved original", `${asset.reviewStatus} ${asset.source.sourceType}`, "src/data/elementary/assets/visual-assets.ts");
  check(asset.checksumSha256.length === 64 && asset.mimeType === "image/svg+xml", asset.id, "checksum/mime", "asset-integrity-metadata", "sha256 / image/svg+xml", `${asset.checksumSha256.length} / ${asset.mimeType}`, "src/data/elementary/assets/visual-assets.ts");
}

const serialized = [
  ...waveLessons.flatMap((lesson) => getElementaryLessonTextFields(lesson).map((field) => extractElementaryInlineText(field.content))),
  ...waveProblems.flatMap((problem) => [
    extractElementaryInlineText(problem.title), extractElementaryInlineText(problem.prompt), extractElementaryInlineText(problem.hint),
    ...problem.choices.flatMap((choice) => [extractElementaryInlineText(choice.label), extractElementaryInlineText(choice.reason)]),
    ...Object.values(problem.explanation).map((content) => extractElementaryInlineText(content)),
  ]),
].join("\n");
for (const [ruleId, pattern] of [
  ["no-todo", /\b(?:TODO|TBD|placeholder)\b/iu], ["no-two-digit-times-two-digit", /\b\d{2}[×x]\d{2}\b/u],
  ["no-circle-advanced-formulas", /円周率|面積|体積/u], ["no-time-base-one-hundred", /1時間[＝=]100分/u],
  ["no-developer-copy", /registry|publicationStatus|curriculum ID/iu],
] as const) check(!pattern.test(serialized), ELEMENTARY_EXPANSION_WAVE_2.id, "serializedContent", ruleId, false, pattern.test(serialized), "src/data/elementary/{lessons,problems}/expansion-wave-2.ts");

check(ELEMENTARY_LESSONS.length === 19 && ELEMENTARY_PROBLEMS.length === 152, "registered-total", "counts", "registered-registry-counts", "19 lessons / 152 problems", `${ELEMENTARY_LESSONS.length} / ${ELEMENTARY_PROBLEMS.length}`, "src/data/elementary/{lessons,problems}/index.ts");

if (issues.length) {
  console.error(`elementary expansion wave 2 QA failed: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`- ID: ${issue.id}`); console.error(`  field: ${issue.field}`); console.error(`  rule ID: ${issue.ruleId}`);
    console.error(`  expected: ${JSON.stringify(issue.expected)}`); console.error(`  actual: ${JSON.stringify(issue.actual)}`); console.error(`  source file: ${issue.source}`);
  }
  process.exitCode = 1;
} else {
  console.log("elementary expansion wave 2 QA passed: hidden 7 units / 10 lessons / 80 problems / 8 original assets; 42 single / 4 multiple / 34 numeric; 60 basic / 20 standard; published 1420 and registered 1500 remain separated.");
}
