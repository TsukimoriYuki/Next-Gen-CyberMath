import {
  ELEMENTARY_JAPANESE_PROBLEMS,
  ELEMENTARY_MATH_PROBLEMS,
  ELEMENTARY_PROBLEMS,
  ELEMENTARY_SOCIAL_STUDIES_PROBLEMS,
} from "../src/data/elementary/problems";
import { ELEMENTARY_LESSONS } from "../src/data/elementary/lessons";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import {
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
} from "../src/data/elementary/curriculum";
import { getElementaryKanjiPolicy } from "../src/data/elementary/kanji/policies";
import { getApprovedElementaryVisualAsset } from "../src/lib/elementary-assets";
import { gradeElementaryAnswer } from "../src/lib/elementary-grade";
import { inspectElementaryText } from "../src/lib/elementary-kanji";
import { extractElementaryInlineText } from "../src/lib/elementary-text";
import type { ElementaryInlineContent } from "../src/types/elementary-content";
import type {
  ElementaryProblem,
  ElementaryProblemType,
} from "../src/types/elementary-problems";

// 情報の詳細は README ではなく現在のコードで確認する pilot 問題 QA。
// 実行例: npx tsx scripts/check-elementary-pilot-problems.ts

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

const lessonIds = new Set(ELEMENTARY_LESSONS.map((lesson) => lesson.id));
const unitIds = new Set(ELEMENTARY_UNITS.map((unit) => unit.id));
const grade3Policy = getElementaryKanjiPolicy("grade-3");

// わり算問題の答えを独立に検算する（既存問題の数値差し替えでないことの担保も兼ねる）。
const MATH_ANSWER_TABLE: Readonly<Record<string, number>> = {
  "eg3-math-division-equal-share-value": 3,
  "eg3-math-division-grouping-value": 3,
  "eg3-math-division-word-problem": 8,
  "eg3-math-division-check-answer": 21,
};
const MATH_CHOICE_TABLE: Readonly<Record<string, string>> = {
  "eg3-math-division-equal-share-op": "12÷3",
  "eg3-math-division-grouping-op": "20÷4",
  "eg3-math-division-choose-op-divide": "24÷8",
  "eg3-math-division-choose-op-multiply": "5×4",
};

function inspectContent(
  content: ElementaryInlineContent,
  contentId: string,
  fieldPath: string,
) {
  const result = inspectElementaryText({
    content,
    grade: 3,
    audience: "learner",
    policy: grade3Policy,
    context: "lesson",
    sourceLocation: "src/data/elementary/problems",
    contentId,
    fieldPath,
  });
  for (const violation of result.violations) {
    issues.push(
      `kanji ${contentId}.${fieldPath}: ${violation.type} "${violation.character}" (${violation.reason})`,
    );
  }
}

function inspectProblemText(problem: ElementaryProblem) {
  inspectContent(problem.title, problem.id, "title");
  inspectContent(problem.prompt, problem.id, "prompt");
  inspectContent(problem.hint, problem.id, "hint");
  inspectContent(problem.explanation.detailed, problem.id, "explanation.detailed");
  inspectContent(problem.explanation.firstCheck, problem.id, "explanation.firstCheck");
  inspectContent(problem.explanation.verification, problem.id, "explanation.verification");
  inspectContent(problem.explanation.commonMistake, problem.id, "explanation.commonMistake");
  problem.choices.forEach((choice, index) => {
    inspectContent(choice.label, problem.id, `choices[${index}].label`);
    inspectContent(choice.reason, problem.id, `choices[${index}].reason`);
  });
  if (problem.answer.kind === "numeric-input") {
    inspectContent(problem.answer.numeric.unit, problem.id, "answer.unit");
  }
}

function selfGrade(problem: ElementaryProblem) {
  const label = `problem "${problem.id}"`;
  const answer = problem.answer;
  if (answer.kind === "numeric-input") {
    const value = answer.numeric.value;
    check(
      gradeElementaryAnswer(problem, { kind: "numeric", raw: String(value) }).correct,
      `${label} must grade its own numeric answer as correct`,
    );
    check(
      !gradeElementaryAnswer(problem, {
        kind: "numeric",
        raw: String(value + 1 + answer.numeric.tolerance),
      }).correct,
      `${label} must reject a clearly wrong numeric answer`,
    );
    return;
  }
  const correctIds = [...answer.correctChoiceIds];
  check(
    gradeElementaryAnswer(problem, { kind: "choice", selectedChoiceIds: correctIds }).correct,
    `${label} must grade its own correct choice set as correct`,
  );
  const wrongId = problem.choices.find((choice) => !correctIds.includes(choice.id))?.id;
  if (wrongId) {
    check(
      !gradeElementaryAnswer(problem, {
        kind: "choice",
        selectedChoiceIds: [wrongId],
      }).correct,
      `${label} must reject a wrong single selection`,
    );
  }
}

function validateProblem(problem: ElementaryProblem) {
  const label = `problem "${problem.id}"`;
  check(problem.publicationStatus === "beta", `${label} must be limited-beta content`);
  check(problem.reviewStatus === "pilot", `${label} must be pilot`);
  check(problem.sourceType === "original", `${label} sourceType must be original`);
  check(problem.copyrightStatus === "original", `${label} copyrightStatus must be original`);
  check(problem.estimatedSeconds > 0, `${label} estimatedSeconds must be positive`);
  check(problem.reviewTags.length > 0, `${label} must declare review tags`);
  check(problem.mistakeTags.length > 0, `${label} must declare mistake tags`);
  check(problem.difficulty === "basic" || problem.difficulty === "standard", `${label} difficulty must be basic or standard`);
  check(lessonIds.has(problem.lessonIds[0] ?? ""), `${label} must reference a real lesson`);
  check(problem.lessonIds.every((id) => lessonIds.has(id)), `${label} lesson references must resolve`);
  check(unitIds.has(problem.unitId), `${label} must reference a real unit`);
  check(
    problem.curriculumEntryIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[id])),
    `${label} curriculum entry references must resolve`,
  );
  check(
    problem.curriculumObjectiveIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[id])),
    `${label} curriculum objective references must resolve`,
  );
  check(problem.answer.kind === problem.type, `${label} answer kind must match its type`);
  check(
    extractElementaryInlineText(problem.explanation.detailed).trim().length > 0,
    `${label} must have an explanation`,
  );
  check(extractElementaryInlineText(problem.hint).trim().length > 0, `${label} must have a hint`);
  check(extractElementaryInlineText(problem.explanation.firstCheck).trim().length > 0, `${label} must have a first check`);
  check(extractElementaryInlineText(problem.explanation.verification).trim().length > 0, `${label} must have a verification`);
  check(extractElementaryInlineText(problem.explanation.commonMistake).trim().length > 0, `${label} must note a common mistake`);
  check(
    !/(?:TODO|TBD|PLACEHOLDER|LOREM)/iu.test(JSON.stringify(problem)),
    `${label} must not contain placeholder tokens`,
  );

  if (problem.type === "numeric-input") {
    check(problem.choices.length === 0, `${label} numeric problem must have no choices`);
    if (problem.answer.kind === "numeric-input") {
      const numeric = problem.answer.numeric;
      check(Number.isFinite(numeric.value), `${label} numeric value must be finite`);
      check(Number.isFinite(numeric.tolerance) && numeric.tolerance >= 0, `${label} numeric tolerance must be valid`);
      check(extractElementaryInlineText(numeric.unit).trim().length > 0, `${label} numeric answer must state a unit`);
    }
  } else {
    check(problem.choices.length >= 2, `${label} must have at least 2 choices`);
    const choiceIds = problem.choices.map((choice) => choice.id);
    check(new Set(choiceIds).size === choiceIds.length, `${label} choice IDs must be unique`);
    const labels = problem.choices.map((choice) => extractElementaryInlineText(choice.label).trim());
    check(new Set(labels).size === labels.length, `${label} choice labels must not duplicate`);
    check(
      problem.choices.every((choice) => extractElementaryInlineText(choice.reason).trim().length > 0),
      `${label} every choice must carry a reason`,
    );
    if (problem.answer.kind !== "numeric-input") {
      const correctIds = problem.answer.correctChoiceIds;
      check(correctIds.length > 0, `${label} must declare a correct answer`);
      check(correctIds.every((id) => choiceIds.includes(id)), `${label} correct answers must exist among choices`);
      check(new Set(correctIds).size === correctIds.length, `${label} correct set must not repeat`);
      if (problem.type === "single-choice") {
        check(correctIds.length === 1, `${label} single-choice must have exactly one correct answer`);
      }
      if (problem.answer.kind === "multiple-choice") {
        check(problem.answer.selectionCount === correctIds.length, `${label} selectionCount must equal the number of correct answers`);
        check(correctIds.length >= 2, `${label} multiple-choice must have at least 2 correct answers`);
        const promptText = extractElementaryInlineText(problem.prompt);
        check(promptText.includes(`${problem.answer.selectionCount}つ`), `${label} prompt must state how many answers to select`);
      }
    }
  }

  if (problem.subject === "social-studies") {
    check(Boolean(problem.visualAssetId), `${label} social problem must reference the map asset`);
    check(
      Boolean(problem.visualAssetId && getApprovedElementaryVisualAsset(problem.visualAssetId)),
      `${label} social map asset must be approved`,
    );
  }

  if (problem.id in MATH_ANSWER_TABLE && problem.answer.kind === "numeric-input") {
    check(problem.answer.numeric.value === MATH_ANSWER_TABLE[problem.id], `${label} numeric answer failed independent re-check`);
  }
  if (problem.id in MATH_CHOICE_TABLE && problem.answer.kind === "single-choice") {
    const correctId = problem.answer.correctChoiceIds[0];
    const correct = problem.choices.find((choice) => choice.id === correctId);
    check(
      Boolean(correct) && extractElementaryInlineText(correct!.label) === MATH_CHOICE_TABLE[problem.id],
      `${label} correct choice failed independent re-check`,
    );
  }

  inspectProblemText(problem);
  selfGrade(problem);
}

function countType(problems: readonly ElementaryProblem[], type: ElementaryProblemType): number {
  return problems.filter((problem) => problem.type === type).length;
}

function main() {
  check(Boolean(grade3Policy), "grade-3 kanji policy must resolve");
  check(ELEMENTARY_PROBLEMS.length === 24, `pilot must ship 24 problems (found ${ELEMENTARY_PROBLEMS.length})`);
  check(ELEMENTARY_MATH_PROBLEMS.length === 8, "math must have 8 problems");
  check(ELEMENTARY_JAPANESE_PROBLEMS.length === 8, "Japanese must have 8 problems");
  check(ELEMENTARY_SOCIAL_STUDIES_PROBLEMS.length === 8, "social studies must have 8 problems");

  check(new Set(ELEMENTARY_PROBLEMS.map((p) => p.id)).size === 24, "problem IDs must be unique");
  check(new Set(ELEMENTARY_PROBLEMS.map((p) => p.slug)).size === 24, "problem slugs must be unique");

  // order は講座内で一意。
  for (const lesson of ELEMENTARY_LESSONS) {
    const orders = ELEMENTARY_PROBLEMS.filter((p) => p.lessonIds.includes(lesson.id)).map((p) => p.order);
    check(orders.length === 8, `lesson "${lesson.id}" must have exactly 8 problems`);
    check(new Set(orders).size === orders.length, `lesson "${lesson.id}" problem orders must be unique`);
  }

  // 形式内訳。
  check(countType(ELEMENTARY_PROBLEMS, "single-choice") === 17, "there must be 17 single-choice problems");
  check(countType(ELEMENTARY_PROBLEMS, "multiple-choice") === 3, "there must be 3 multiple-choice problems");
  check(countType(ELEMENTARY_PROBLEMS, "numeric-input") === 4, "there must be 4 numeric-input problems");
  check(countType(ELEMENTARY_MATH_PROBLEMS, "single-choice") === 4, "math must have 4 single-choice");
  check(countType(ELEMENTARY_MATH_PROBLEMS, "numeric-input") === 4, "math must have 4 numeric-input");
  check(countType(ELEMENTARY_JAPANESE_PROBLEMS, "single-choice") === 7, "Japanese must have 7 single-choice");
  check(countType(ELEMENTARY_JAPANESE_PROBLEMS, "multiple-choice") === 1, "Japanese must have 1 multiple-choice");
  check(countType(ELEMENTARY_SOCIAL_STUDIES_PROBLEMS, "single-choice") === 6, "social must have 6 single-choice");
  check(countType(ELEMENTARY_SOCIAL_STUDIES_PROBLEMS, "multiple-choice") === 2, "social must have 2 multiple-choice");

  // 難易度内訳。
  check(ELEMENTARY_PROBLEMS.filter((p) => p.difficulty === "basic").length === 18, "there must be 18 basic problems");
  check(ELEMENTARY_PROBLEMS.filter((p) => p.difficulty === "standard").length === 6, "there must be 6 standard problems");

  for (const problem of ELEMENTARY_PROBLEMS) validateProblem(problem);

  if (issues.length) {
    console.error(`elementary pilot-problem QA FAILED: ${issues.length} issue(s).`);
    issues.forEach((issue) => console.error(`- ${issue}`));
    process.exitCode = 1;
    return;
  }
  console.log(
    `elementary pilot-problem QA passed: 24 problems (math 8 / Japanese 8 / social 8), 17 single / 3 multi / 4 numeric, 18 basic / 6 standard, answers re-checked, kanji grade-3 clean.`,
  );
}

main();
