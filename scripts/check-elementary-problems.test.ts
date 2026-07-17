import {
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
} from "../src/data/elementary/curriculum";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import {
  ELEMENTARY_JAPANESE_PROBLEMS,
  ELEMENTARY_MATH_PROBLEMS,
  ELEMENTARY_SOCIAL_STUDIES_PROBLEMS,
} from "../src/data/elementary/problems";
import { ELEMENTARY_LESSONS } from "../src/data/elementary/lessons";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import { extractElementaryInlineText } from "../src/lib/elementary-text";
import type { ElementaryProblem } from "../src/types/elementary-problems";

// 本番 registry を変更しない fixture 方式のテスト。
// 実行例: npx tsx scripts/check-elementary-problems.test.ts

const lessonIds = new Set(ELEMENTARY_LESSONS.map((lesson) => lesson.id));
const unitIds = new Set(ELEMENTARY_UNITS.map((unit) => unit.id));
const grade3Policy = getElementaryKanjiPolicy("grade-3");
const VALID_TYPES = new Set(["single-choice", "multiple-choice", "numeric-input"]);

function plain(value: string) {
  return [{ type: "text", text: value }] as const;
}

// fixture を検証する独立バリデータ。1件でも問題があれば理由を返す。
function validateFixture(problem: ElementaryProblem): string[] {
  const issues: string[] = [];
  if (!VALID_TYPES.has(problem.type)) issues.push("unknown-type");
  if (problem.answer.kind !== problem.type) issues.push("answer-type-mismatch");
  if (!problem.lessonIds.every((id) => lessonIds.has(id))) issues.push("unknown-lesson");
  if (!unitIds.has(problem.unitId)) issues.push("unknown-unit");
  if (!problem.curriculumEntryIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[id]))) issues.push("unknown-curriculum-entry");
  if (!problem.curriculumObjectiveIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[id]))) issues.push("unknown-curriculum-objective");
  if (problem.publicationStatus !== "hidden") issues.push("not-hidden");
  if (extractElementaryInlineText(problem.explanation.detailed).trim().length === 0) issues.push("missing-explanation");

  if (problem.answer.kind === "numeric-input") {
    const numeric = problem.answer.numeric;
    if (!Number.isFinite(numeric.value)) issues.push("numeric-value-invalid");
    if (!Number.isFinite(numeric.tolerance) || numeric.tolerance < 0) issues.push("numeric-tolerance-invalid");
    if (extractElementaryInlineText(numeric.unit).trim().length === 0) issues.push("numeric-unit-missing");
  } else {
    const ids = problem.choices.map((choice) => choice.id);
    if (new Set(ids).size !== ids.length) issues.push("duplicate-choice");
    if (!problem.choices.every((choice) => extractElementaryInlineText(choice.reason).trim().length > 0)) issues.push("missing-distractor-reason");
    const correct = problem.answer.correctChoiceIds;
    if (correct.length === 0) issues.push("no-correct-answer");
    if (!correct.every((id) => ids.includes(id))) issues.push("correct-not-in-choices");
    if (problem.type === "single-choice" && correct.length !== 1) issues.push("single-choice-multiple-correct");
    if (problem.answer.kind === "multiple-choice") {
      if (problem.answer.selectionCount !== correct.length) issues.push("multiple-choice-count-mismatch");
      if (!extractElementaryInlineText(problem.prompt).includes(`${problem.answer.selectionCount}つ`)) issues.push("multiple-choice-count-not-stated");
    }
  }

  const fields = [
    problem.title,
    problem.prompt,
    problem.hint,
    problem.explanation.detailed,
    ...problem.choices.flatMap((choice) => [choice.label, choice.reason]),
  ];
  for (const content of fields) {
    const result = inspectElementaryText({
      content,
      grade: 3,
      audience: "learner",
      policy: grade3Policy,
      context: "lesson",
      sourceLocation: "fixture",
      contentId: problem.id,
      fieldPath: "fixture",
    });
    if (result.violations.length > 0) issues.push("unlearned-kanji");
  }
  return issues;
}

function clone(problem: ElementaryProblem): ElementaryProblem {
  return JSON.parse(JSON.stringify(problem)) as ElementaryProblem;
}

const failures: string[] = [];
function expectFail(name: string, mutate: (problem: ElementaryProblem) => ElementaryProblem, base: ElementaryProblem) {
  const issues = validateFixture(mutate(clone(base)));
  if (issues.length === 0) failures.push(`fixture "${name}" should have failed but passed`);
}
function expectPass(name: string, problem: ElementaryProblem) {
  const issues = validateFixture(clone(problem));
  if (issues.length > 0) failures.push(`fixture "${name}" should pass but failed: ${issues.join(", ")}`);
}

const mathNumeric = ELEMENTARY_MATH_PROBLEMS.find((p) => p.type === "numeric-input")!;
const jpChoice = ELEMENTARY_JAPANESE_PROBLEMS.find((p) => p.type === "single-choice")!;
const socialMulti = ELEMENTARY_SOCIAL_STUDIES_PROBLEMS.find((p) => p.type === "multiple-choice")!;

// 正常 fixture。
expectPass("valid-math-numeric", mathNumeric);
expectPass("valid-japanese-choice", jpChoice);
expectPass("valid-social-multiple", socialMulti);

// 異常 fixture。
expectFail("unknown-type", (p) => ({ ...p, type: "matching" as ElementaryProblem["type"] }), jpChoice);
expectFail("unknown-lesson", (p) => ({ ...p, lessonIds: ["no-such-lesson"] }), jpChoice);
expectFail("unknown-unit", (p) => ({ ...p, unitId: "no-such-unit" }), jpChoice);
expectFail("unknown-curriculum", (p) => ({ ...p, curriculumEntryIds: ["no-such-entry"] }), jpChoice);
expectFail("no-correct-answer", (p) => ({ ...p, answer: { kind: "single-choice", correctChoiceIds: [] as unknown as [string] } }), jpChoice);
expectFail("single-choice-multiple-correct", (p) => ({ ...p, answer: { kind: "single-choice", correctChoiceIds: ["a", "b"] as unknown as [string] } }), jpChoice);
expectFail("multiple-choice-count-mismatch", (p) => ({ ...p, answer: { kind: "multiple-choice", correctChoiceIds: ["a", "b"], selectionCount: 3 } }), socialMulti);
expectFail("numeric-tolerance-invalid", (p) => ({ ...p, answer: { kind: "numeric-input", numeric: { value: 3, tolerance: -1, unit: plain("こ") } } }), mathNumeric);
expectFail("duplicate-choice", (p) => ({ ...p, choices: [p.choices[0]!, p.choices[0]!, p.choices[2]!, p.choices[3]!] }), jpChoice);
expectFail("missing-distractor-reason", (p) => ({ ...p, choices: p.choices.map((c, i) => (i === 1 ? { ...c, reason: plain("") } : c)) }), jpChoice);
expectFail("missing-explanation", (p) => ({ ...p, explanation: { ...p.explanation, detailed: plain("") } }), jpChoice);
expectFail("public-pilot-content", (p) => ({ ...p, publicationStatus: "public" }), jpChoice);
expectFail("unlearned-kanji", (p) => ({ ...p, title: plain("方位") }), jpChoice);

if (failures.length) {
  console.error(`elementary problem fixture test FAILED: ${failures.length} issue(s).`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log("elementary problem fixture test passed: valid fixtures accepted, invalid fixtures rejected (type, lesson, unit, curriculum, answers, tolerance, duplicate, reason, explanation, publication, kanji).");
}
