import { ELEMENTARY_VISUAL_ASSETS } from "../src/data/elementary/assets";
import { ELEMENTARY_EXPANSION_WAVE_1 } from "../src/data/elementary/expansion-wave-1";
import { ELEMENTARY_EXPANSION_WAVE_1_LESSONS } from "../src/data/elementary/lessons/expansion-wave-1";
import { ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS } from "../src/data/elementary/problems/expansion-wave-1";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { buildElementarySegmentedContentInventory } from "../src/lib/elementary-inventory";
import { gradeElementaryAnswer } from "../src/lib/elementary-grade";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import { extractElementaryInlineText, getElementaryLessonTextFields } from "../src/lib/elementary-text";
import type { ElementaryInlineContent } from "../src/types/elementary-content";

type Issue = Readonly<{ id: string; ruleId: string; expected: unknown; actual: unknown; source: string }>;
const issues: Issue[] = [];
const check = (condition: boolean, issue: Issue) => { if (!condition) issues.push(issue); };
const issue = (id: string, ruleId: string, expected: unknown, actual: unknown, source: string): Issue => ({ id, ruleId, expected, actual, source });
const policy = getElementaryKanjiPolicy("grade-3");

function inspectContent(content: ElementaryInlineContent, id: string, path: string, source: string) {
  const result = inspectElementaryText({ content, grade: 3, audience: "learner", policy, context: "lesson", sourceLocation: source, contentId: id, fieldPath: path });
  for (const violation of result.violations) issues.push(issue(id, `kanji:${violation.type}`, "grade-3 compliant text", `${violation.character}: ${violation.reason}`, source));
}

const inventory = buildElementarySegmentedContentInventory();
const published = inventory.publishedBeta.totals;
const hidden = inventory.hiddenPilot.totals;
const registered = inventory.registeredTotal.totals;

check(ELEMENTARY_EXPANSION_WAVE_1_LESSONS.length === 6, issue("wave-1", "lesson-count", 6, ELEMENTARY_EXPANSION_WAVE_1_LESSONS.length, "src/data/elementary/lessons/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.length === 48, issue("wave-1", "problem-count", 48, ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.length, "src/data/elementary/problems/expansion-wave-1.ts"));
check(new Set(ELEMENTARY_EXPANSION_WAVE_1_LESSONS.map((value) => value.id)).size === 6, issue("wave-1", "unique-lesson-id", 6, new Set(ELEMENTARY_EXPANSION_WAVE_1_LESSONS.map((value) => value.id)).size, "src/data/elementary/lessons/expansion-wave-1.ts"));
check(new Set(ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.map((value) => value.id)).size === 48, issue("wave-1", "unique-problem-id", 48, new Set(ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.map((value) => value.id)).size, "src/data/elementary/problems/expansion-wave-1.ts"));

for (const lesson of ELEMENTARY_EXPANSION_WAVE_1_LESSONS) {
  check(lesson.publicationStatus === "hidden", issue(lesson.id, "publication-hidden", "hidden", lesson.publicationStatus, "src/data/elementary/lessons/expansion-wave-1.ts"));
  check(lesson.reviewStatus === "pilot", issue(lesson.id, "review-pilot", "pilot", lesson.reviewStatus, "src/data/elementary/lessons/expansion-wave-1.ts"));
  check(lesson.problemIds.length === 8, issue(lesson.id, "lesson-problem-count", 8, lesson.problemIds.length, "src/data/elementary/lessons/expansion-wave-1.ts"));
  check(lesson.estimatedMinutes >= 30 && lesson.estimatedMinutes <= 45, issue(lesson.id, "duration", "30-45", lesson.estimatedMinutes, "src/data/elementary/lessons/expansion-wave-1.ts"));
  const types = new Set(lesson.blocks.map((block) => block.type));
  for (const required of ["opening-question", "learning-goals", "dialogue", "explanation", "key-point", "guided-example", "retry", "summary", "practice-set"]) {
    check(types.has(required as never), issue(lesson.id, `block:${required}`, "present", "missing", "src/data/elementary/lessons/expansion-wave-1.ts"));
  }
  for (const dialogue of lesson.blocks.filter((block) => block.type === "dialogue")) {
    check(dialogue.lines.length >= 4 && dialogue.lines.length <= 6, issue(lesson.id, "dialogue-line-count", "4-6", dialogue.lines.length, "src/data/elementary/lessons/expansion-wave-1.ts"));
  }
  for (const field of getElementaryLessonTextFields(lesson)) inspectContent(field.content, lesson.id, field.path, "src/data/elementary/lessons/expansion-wave-1.ts");
}

for (const problem of ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS) {
  check(problem.publicationStatus === "hidden", issue(problem.id, "publication-hidden", "hidden", problem.publicationStatus, "src/data/elementary/problems/expansion-wave-1.ts"));
  check(problem.choices.every((choice) => extractElementaryInlineText(choice.reason).trim().length > 0), issue(problem.id, "choice-reasons", "all non-empty", "missing", "src/data/elementary/problems/expansion-wave-1.ts"));
  check(problem.lessonIds.length === 1, issue(problem.id, "one-lesson", 1, problem.lessonIds.length, "src/data/elementary/problems/expansion-wave-1.ts"));
  inspectContent(problem.title, problem.id, "title", "src/data/elementary/problems/expansion-wave-1.ts");
  inspectContent(problem.prompt, problem.id, "prompt", "src/data/elementary/problems/expansion-wave-1.ts");
  inspectContent(problem.hint, problem.id, "hint", "src/data/elementary/problems/expansion-wave-1.ts");
  for (const [path, content] of Object.entries(problem.explanation)) inspectContent(content, problem.id, `explanation.${path}`, "src/data/elementary/problems/expansion-wave-1.ts");
  problem.choices.forEach((choice, index) => { inspectContent(choice.label, problem.id, `choices.${index}.label`, "src/data/elementary/problems/expansion-wave-1.ts"); inspectContent(choice.reason, problem.id, `choices.${index}.reason`, "src/data/elementary/problems/expansion-wave-1.ts"); });
  const response = problem.answer.kind === "numeric-input"
    ? { kind: "numeric" as const, raw: String(problem.answer.numeric.value) }
    : { kind: "choice" as const, selectedChoiceIds: problem.answer.correctChoiceIds };
  check(gradeElementaryAnswer(problem, response).correct, issue(problem.id, "self-grade", true, false, "src/data/elementary/problems/expansion-wave-1.ts"));
}

const count = (type: string) => ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.filter((problem) => problem.type === type).length;
check(count("single-choice") === 32, issue("wave-1", "single-choice", 32, count("single-choice"), "src/data/elementary/problems/expansion-wave-1.ts"));
check(count("multiple-choice") === 4, issue("wave-1", "multiple-choice", 4, count("multiple-choice"), "src/data/elementary/problems/expansion-wave-1.ts"));
check(count("numeric-input") === 12, issue("wave-1", "numeric-input", 12, count("numeric-input"), "src/data/elementary/problems/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.filter((problem) => problem.difficulty === "basic").length === 36, issue("wave-1", "basic", 36, ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.filter((problem) => problem.difficulty === "basic").length, "src/data/elementary/problems/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.filter((problem) => problem.difficulty === "standard").length === 12, issue("wave-1", "standard", 12, ELEMENTARY_EXPANSION_WAVE_1_PROBLEMS.filter((problem) => problem.difficulty === "standard").length, "src/data/elementary/problems/expansion-wave-1.ts"));

const libraryText = ELEMENTARY_EXPANSION_WAVE_1_LESSONS.find((lesson) => lesson.slug === "find-key-sentences")?.blocks.find((block) => block.id === "find-key-sentences-source-text");
const hallwayText = ELEMENTARY_EXPANSION_WAVE_1_LESSONS.find((lesson) => lesson.slug === "connect-paragraphs")?.blocks.find((block) => block.id === "connect-paragraphs-source-text");
const textLength = (block: typeof libraryText) => block?.type === "explanation" ? block.paragraphs.map((value) => extractElementaryInlineText(value)).join("").length : 0;
check(textLength(libraryText) >= 600 && textLength(libraryText) <= 900, issue("find-key-sentences", "original-text-length", "600-900", textLength(libraryText), "src/data/elementary/lessons/expansion-wave-1.ts"));
check(textLength(hallwayText) >= 700 && textLength(hallwayText) <= 1000, issue("connect-paragraphs", "original-text-length", "700-1000", textLength(hallwayText), "src/data/elementary/lessons/expansion-wave-1.ts"));

const expansionAssetIds = new Set(ELEMENTARY_EXPANSION_WAVE_1_LESSONS.flatMap((lesson) => lesson.visualAssetIds));
check(expansionAssetIds.size === 4, issue("wave-1", "asset-count", 4, expansionAssetIds.size, "src/data/elementary/assets/visual-assets.ts"));
check([...expansionAssetIds].every((id) => ELEMENTARY_VISUAL_ASSETS.some((asset) => asset.id === id && asset.reviewStatus === "approved" && asset.source.sourceType === "original")), issue("wave-1", "approved-original-assets", true, false, "src/data/elementary/assets/visual-assets.ts"));

for (const [key, expected, actual] of [
  ["published-lessons", 3, published.lessonCount], ["published-problems", 24, published.problemCount],
  ["hidden-units", 4, hidden.unitCount], ["hidden-lessons", 6, hidden.lessonCount], ["hidden-problems", 48, hidden.problemCount],
  ["registered-units", 7, registered.unitCount], ["registered-lessons", 9, registered.lessonCount], ["registered-problems", 72, registered.problemCount],
] as const) check(actual === expected, issue("inventory", key, expected, actual, "src/lib/elementary-inventory.ts"));
check(inventory.combinedProblemCounts.published === 1372, issue("inventory", "published-combined", 1372, inventory.combinedProblemCounts.published, "src/lib/elementary-inventory.ts"));
check(inventory.combinedProblemCounts.registered === 1420, issue("inventory", "registered-combined", 1420, inventory.combinedProblemCounts.registered, "src/lib/elementary-inventory.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1.explicitReleaseApproval === "approved", issue("wave-1", "approval", "approved", ELEMENTARY_EXPANSION_WAVE_1.explicitReleaseApproval, "src/data/elementary/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1.approvalSource === "user-explicit-approval", issue("wave-1", "approval-source", "user-explicit-approval", ELEMENTARY_EXPANSION_WAVE_1.approvalSource, "src/data/elementary/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1.releaseApprovalSource === "user-explicit-approval", issue("wave-1", "release-approval-source", "user-explicit-approval", ELEMENTARY_EXPANSION_WAVE_1.releaseApprovalSource, "src/data/elementary/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1.reviewerType === "human-owner" && ELEMENTARY_EXPANSION_WAVE_1.reviewSource === "user-explicit-review", issue("wave-1", "human-review-source", "human-owner / user-explicit-review", `${ELEMENTARY_EXPANSION_WAVE_1.reviewerType} / ${ELEMENTARY_EXPANSION_WAVE_1.reviewSource}`, "src/data/elementary/expansion-wave-1.ts"));
check(ELEMENTARY_EXPANSION_WAVE_1.automaticRelease === false, issue("wave-1", "automatic-release", false, ELEMENTARY_EXPANSION_WAVE_1.automaticRelease, "src/data/elementary/expansion-wave-1.ts"));
check(Object.values(ELEMENTARY_EXPANSION_WAVE_1.humanReviews).every((status) => status === "approved"), issue("wave-1", "human-review", "all approved", ELEMENTARY_EXPANSION_WAVE_1.humanReviews, "src/data/elementary/expansion-wave-1.ts"));

if (issues.length) {
  console.error(`elementary expansion wave 1 QA FAILED: ${issues.length} issue(s).`);
  issues.forEach((value) => console.error(JSON.stringify(value)));
  process.exitCode = 1;
} else {
  console.log(`elementary expansion wave 1 QA passed: 4 units, 6 hidden lessons, 48 problems, 4 assets; published 3/24, registered 9/72; original Japanese texts ${textLength(libraryText)}/${textLength(hallwayText)} chars.`);
}
