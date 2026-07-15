import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { PRIMARY_NAVIGATION } from "../src/data/navigation";
import {
  INFORMATICS_1_COURSE_SUBJECT,
} from "../src/data/courses/informatics-1";
import {
  COURSE_SUBJECTS,
  PUBLIC_COURSE_SUBJECTS,
} from "../src/data/courses";
import {
  INFORMATICS_PROBLEMS,
  type InformaticsDifficulty,
} from "../src/data/informatics/problems";
import { PUBLIC_SUBJECTS, SUBJECTS } from "../src/data/subjects";
import { evaluateSubjectPublication } from "../src/lib/subject-publication";
import { isCommonTestAnswerCorrect } from "../src/lib/common-test-answer-normalize";

// 情報Ⅰ 第1〜第3スプリントの整合性QA。
// 実行例: npx tsx scripts/check-informatics.ts / npm run qa:informatics

const ROOT = process.cwd();
const issues: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

// ── 講座 registry ───────────────────────────────────────────────────────────

const units = INFORMATICS_1_COURSE_SUBJECT.units;
const lessons = units.flatMap((unit) => unit.lessons);
const lessonIds = new Set(lessons.map((lesson) => lesson.lessonId));

check(
  new Set(units.map((unit) => unit.unitId)).size === units.length,
  "informatics unit IDs must be unique",
);
check(lessonIds.size === lessons.length, "informatics lesson IDs must be unique");
check(lessons.length === 12, `informatics must have 12 lessons (found ${lessons.length})`);
check(
  COURSE_SUBJECTS.some((subject) => subject.subjectId === "informatics-1"),
  "informatics-1 must be registered in COURSE_SUBJECTS",
);

for (const lesson of lessons) {
  const label = `lesson "${lesson.lessonId}"`;
  check(lesson.goals.length > 0, `${label} must declare goals`);
  check(lesson.prerequisites.length > 0, `${label} must declare prerequisites`);
  check(lesson.estimatedMinutes > 0, `${label} must declare estimatedMinutes`);
  check(lesson.lessonBlocks.length >= 5, `${label} must have substantive blocks`);
  check(
    lesson.checkQuestions.length >= 3,
    `${label} must have at least 3 check questions`,
  );
  check(
    lesson.checkQuestions.every((q) => q.question.trim() && q.answer.trim()),
    `${label} check questions must all have answers`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "commonMistake"),
    `${label} must cover common mistakes`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "nextStep"),
    `${label} must point to the next lesson`,
  );
}

// ── 演習問題 registry ───────────────────────────────────────────────────────

check(
  INFORMATICS_PROBLEMS.length === 60,
  `informatics must ship exactly 60 problems (found ${INFORMATICS_PROBLEMS.length})`,
);
check(
  new Set(INFORMATICS_PROBLEMS.map((problem) => problem.id)).size ===
    INFORMATICS_PROBLEMS.length,
  "informatics problem IDs must be unique",
);
check(
  new Set(INFORMATICS_PROBLEMS.map((problem) => problem.slug ?? problem.id)).size ===
    INFORMATICS_PROBLEMS.length,
  "informatics problem slugs must be unique",
);

const byLesson = new Map<string, number>();
const byDifficulty = new Map<InformaticsDifficulty, number>();

for (const problem of INFORMATICS_PROBLEMS) {
  const label = `problem "${problem.id}"`;
  byLesson.set(problem.lessonId, (byLesson.get(problem.lessonId) ?? 0) + 1);
  byDifficulty.set(
    problem.difficulty,
    (byDifficulty.get(problem.difficulty) ?? 0) + 1,
  );

  check(lessonIds.has(problem.lessonId), `${label} must reference a real lesson`);
  check(Boolean(problem.prompt.trim()), `${label} must have a prompt`);
  check(Boolean(problem.explanation.trim()), `${label} must have an explanation`);
  check(problem.estimatedMinutes > 0, `${label} must declare estimatedMinutes`);
  check(problem.reviewTags.length > 0, `${label} must declare review tags`);
  check(problem.choices.length >= 2, `${label} must have at least 2 choices`);
  check(
    new Set(problem.choices.map((choice) => choice.id)).size ===
      problem.choices.length,
    `${label} choice IDs must be unique`,
  );
  check(
    problem.choices.every((choice) => choice.text.trim() && choice.reason.trim()),
    `${label} every choice (correct and incorrect) must carry a reason`,
  );

  const choiceIds = new Set(problem.choices.map((choice) => choice.id));
  check(
    problem.correctChoiceIds.length > 0,
    `${label} must declare a correct answer set`,
  );
  check(
    problem.correctChoiceIds.every((id) => choiceIds.has(id)),
    `${label} correct answers must exist among its choices`,
  );
  check(
    new Set(problem.correctChoiceIds).size === problem.correctChoiceIds.length,
    `${label} correct answer set must not repeat IDs`,
  );

  if (problem.kind === "multi-select") {
    check(
      problem.correctChoiceIds.length >= 1,
      `${label} multi-select must have a non-empty correct set`,
    );
  } else {
    check(
      problem.correctChoiceIds.length === 1,
      `${label} ${problem.kind} must have exactly one correct answer`,
    );
  }
  if (problem.kind === "true-false") {
    check(
      problem.choices.length === 2,
      `${label} true-false must have exactly 2 choices`,
    );
  }
  if (problem.kind === "number") {
    check(
      typeof problem.correctNumber === "number" && Number.isFinite(problem.correctNumber),
      `${label} numeric answer must be finite`,
    );
  }
}

for (const lesson of lessons) {
  const count = byLesson.get(lesson.lessonId) ?? 0;
  check(
    count === 5,
    `lesson "${lesson.lessonId}" must have exactly 5 problems (found ${count})`,
  );
}

const expectedDifficulty: Record<InformaticsDifficulty, number> = {
  basic: 24,
  standard: 24,
  "ct-prep": 12,
};
for (const [difficulty, expected] of Object.entries(expectedDifficulty)) {
  const actual = byDifficulty.get(difficulty as InformaticsDifficulty) ?? 0;
  check(
    actual === expected,
    `difficulty "${difficulty}" must have ${expected} problems (found ${actual})`,
  );
}

// ── 第2スプリント固有の教材・問題品質 ─────────────────────────────────────

const sprint2LessonIds = new Set([
  "computer-components-operation",
  "number-systems-bits",
  "digital-text-image-audio",
  "data-size-compression-error",
]);
const sprint2Lessons = lessons.filter((lesson) =>
  sprint2LessonIds.has(lesson.lessonId),
);
const sprint2Problems = INFORMATICS_PROBLEMS.filter((problem) =>
  sprint2LessonIds.has(problem.lessonId),
);

check(
  sprint2Lessons.length === 4,
  `sprint 2 must have 4 lessons (found ${sprint2Lessons.length})`,
);
check(
  sprint2Problems.length === 20,
  `sprint 2 must have 20 problems (found ${sprint2Problems.length})`,
);

for (const lesson of sprint2Lessons) {
  const label = `sprint 2 lesson "${lesson.lessonId}"`;
  check(
    lesson.lessonBlocks.some((block) => block.kind === "concept"),
    `${label} must explain basic concepts`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "comparisonTable"),
    `${label} must include an accurate table where a visual comparison is useful`,
  );
  check(
    lesson.lessonBlocks.some((block) => block.kind === "workedExample"),
    `${label} must include a worked example or calculation`,
  );
  check(
    lesson.qualityTags.includes("sprint-2"),
    `${label} must be tagged as sprint-2`,
  );
}

const sprint2Difficulty = new Map<InformaticsDifficulty, number>();
for (const problem of sprint2Problems) {
  sprint2Difficulty.set(
    problem.difficulty,
    (sprint2Difficulty.get(problem.difficulty) ?? 0) + 1,
  );

  const correctIds = new Set(problem.correctChoiceIds);
  for (const choice of problem.choices) {
    const isCorrect = correctIds.has(choice.id);
    check(
      isCorrect ? choice.reason.startsWith("正答。") : choice.reason.startsWith("誤り。"),
      `sprint 2 problem "${problem.id}" choice "${choice.id}" reason must agree with the registered answer`,
    );
  }
}

const expectedSprint2Difficulty: Record<InformaticsDifficulty, number> = {
  basic: 8,
  standard: 8,
  "ct-prep": 4,
};
for (const [difficulty, expected] of Object.entries(expectedSprint2Difficulty)) {
  const actual = sprint2Difficulty.get(difficulty as InformaticsDifficulty) ?? 0;
  check(
    actual === expected,
    `sprint 2 difficulty "${difficulty}" must have ${expected} problems (found ${actual})`,
  );
}

check(
  new Set(sprint2Problems.map((problem) => problem.kind)).size >= 4,
  "sprint 2 must include single-choice, multi-select, true-false, and scenario formats",
);
check(
  sprint2Problems.filter((problem) => problem.difficulty === "ct-prep").every(
    (problem) =>
      /生徒|会話|表|条件/.test(problem.prompt) &&
      problem.estimatedMinutes >= 3,
  ),
  "every sprint 2 ct-prep problem must combine a conversation, table, or multiple conditions",
);

function correctChoiceText(problemId: string): string {
  const problem = INFORMATICS_PROBLEMS.find((entry) => entry.id === problemId);
  if (!problem) return "";
  const correct = new Set(problem.correctChoiceIds);
  return problem.choices
    .filter((choice) => correct.has(choice.id))
    .map((choice) => choice.text)
    .join(" / ");
}

const decimalFromBinary = Number.parseInt("101101", 2);
const binaryFromDecimal = (58).toString(2);
const hexFromBinary = Number.parseInt("10101111", 2).toString(16).toUpperCase();
const sixBitStates = 2 ** 6;
const bitsFor50States = Math.ceil(Math.log2(50));
const bitsFor260States = Math.ceil(Math.log2(120 + 140));
const imageBytes = (800 * 600 * 24) / 8;
const audioBytes = (44_100 * 16 * 2 * 10) / 8;
const recordingPlanABytes = (32_000 * 16 * 1 * 30) / 8;
const recordingPlanBBytes = (48_000 * 16 * 2 * 20) / 8;
const transferSeconds = (24 * 8) / 12;
const compressionPercent = (5 / 20) * 100;
const combinedTransferSeconds = (10 * 8) / 8;

const numericalAnswerChecks = [
  ["joho-bin-to-decimal", String(decimalFromBinary)],
  ["joho-dec-to-binary", binaryFromDecimal],
  ["joho-bin-to-hex", hexFromBinary],
  ["joho-bit-states-required", `${sixBitStates}通り`],
  ["joho-bit-states-required", `最低${bitsFor50States} bit`],
  ["joho-bit-device-id-overflow", `最低${bitsFor260States} bit`],
  ["joho-media-image-size", `${imageBytes.toLocaleString("en-US")} B`],
  ["joho-media-audio-size", `${audioBytes.toLocaleString("en-US")} B`],
  ["joho-media-recording-plan", `${recordingPlanABytes.toLocaleString("en-US")} B`],
  ["joho-media-recording-plan", `${recordingPlanBBytes.toLocaleString("en-US")} B`],
  ["joho-size-transfer-time", `${transferSeconds}秒`],
  ["joho-compression-ratio", `圧縮率${compressionPercent}%`],
  ["joho-rounding-compression-plan", `理論転送時間は${combinedTransferSeconds}秒`],
] as const;

for (const [problemId, expectedText] of numericalAnswerChecks) {
  check(
    correctChoiceText(problemId).includes(expectedText),
    `numerical answer for "${problemId}" must contain independently calculated result "${expectedText}"`,
  );
}

const calculationProblemIds = [
  "joho-bin-to-decimal",
  "joho-dec-to-binary",
  "joho-bin-to-hex",
  "joho-bit-states-required",
  "joho-bit-device-id-overflow",
  "joho-media-image-size",
  "joho-media-audio-size",
  "joho-media-recording-plan",
  "joho-size-bit-byte-units",
  "joho-size-transfer-time",
  "joho-compression-ratio",
  "joho-rounding-compression-plan",
] as const;

for (const problemId of calculationProblemIds) {
  const problem = INFORMATICS_PROBLEMS.find((entry) => entry.id === problemId);
  check(Boolean(problem), `calculation problem "${problemId}" must exist`);
  check(
    Boolean(problem && /[=×÷+−<>≥]/.test(problem.explanation)),
    `calculation problem "${problemId}" must record reproducible intermediate calculations`,
  );
}

for (const problemId of [
  "joho-media-image-size",
  "joho-media-audio-size",
  "joho-size-bit-byte-units",
  "joho-size-transfer-time",
  "joho-rounding-compression-plan",
]) {
  const prompt =
    INFORMATICS_PROBLEMS.find((problem) => problem.id === problemId)?.prompt ?? "";
  check(
    prompt.includes("1 B = 8 bit") || prompt.includes("1 B=8 bit"),
    `data-size problem "${problemId}" must state the bit/byte definition`,
  );
}

for (const problemId of [
  "joho-media-image-size",
  "joho-media-audio-size",
  "joho-media-recording-plan",
]) {
  const problem = INFORMATICS_PROBLEMS.find((entry) => entry.id === problemId);
  check(
    Boolean(
      problem &&
        /ヘッダー/.test(problem.prompt) &&
        /理論/.test(problem.prompt + problem.explanation),
    ),
    `media problem "${problemId}" must distinguish the theoretical value from a real file size`,
  );
}

const hexProblem = INFORMATICS_PROBLEMS.find(
  (problem) => problem.id === "joho-bin-to-hex",
);
check(
  Boolean(hexProblem && /大文字・小文字|AFとaf/.test(hexProblem.explanation)),
  "hexadecimal problem must explain that upper- and lower-case digits are equivalent",
);

// ── 第3スプリント固有の教材・問題品質と独立検算 ─────────────────────────────

const sprint3LessonIds = new Set([
  "variables-expressions-io",
  "branching-loops",
  "arrays-functions-decomposition",
  "algorithms-search-simulation",
]);
const sprint3Lessons = lessons.filter((lesson) => sprint3LessonIds.has(lesson.lessonId));
const sprint3Problems = INFORMATICS_PROBLEMS.filter((problem) =>
  sprint3LessonIds.has(problem.lessonId),
);

check(sprint3Lessons.length === 4, `sprint 3 must have 4 lessons (found ${sprint3Lessons.length})`);
check(sprint3Problems.length === 20, `sprint 3 must have 20 problems (found ${sprint3Problems.length})`);

for (const lesson of sprint3Lessons) {
  const label = `sprint 3 lesson "${lesson.lessonId}"`;
  check(lesson.qualityTags.includes("sprint-3"), `${label} must be tagged sprint-3`);
  check(
    lesson.lessonBlocks.some((block) => block.kind === "comparisonTable"),
    `${label} must include a trace table`,
  );
  check(
    lesson.lessonBlocks.some((block) => /←|random\(|div/.test(block.body)),
    `${label} must include explicit pseudocode`,
  );
}

const sprint3Difficulty = new Map<InformaticsDifficulty, number>();
for (const problem of sprint3Problems) {
  sprint3Difficulty.set(
    problem.difficulty,
    (sprint3Difficulty.get(problem.difficulty) ?? 0) + 1,
  );
  check(problem.slug === problem.id, `sprint 3 problem "${problem.id}" must declare its slug`);
  check(Boolean(problem.solutionProcess?.trim()), `sprint 3 problem "${problem.id}" must record a calculation or trace`);
  const correctIds = new Set(problem.correctChoiceIds);
  for (const answerChoice of problem.choices) {
    const expectedPrefix = correctIds.has(answerChoice.id) ? "正答：" : "誤り：";
    check(
      answerChoice.reason.startsWith(expectedPrefix),
      `sprint 3 problem "${problem.id}" choice "${answerChoice.id}" must agree with registered answer`,
    );
  }
  if (problem.pseudocodeRules) {
    check(/←は代入/.test(problem.pseudocodeRules), `${problem.id} must define assignment`);
    check(/=は等価比較/.test(problem.pseudocodeRules), `${problem.id} must define equality`);
    check(/添字は1/.test(problem.pseudocodeRules), `${problem.id} must define array origin`);
    check(/両端を含む/.test(problem.pseudocodeRules), `${problem.id} must define loop endpoints`);
    check(/div/.test(problem.pseudocodeRules), `${problem.id} must define integer division`);
    check(/random\(a, b\)/.test(problem.pseudocodeRules), `${problem.id} must define random range`);
  }
}

for (const [difficulty, expected] of Object.entries({ basic: 8, standard: 8, "ct-prep": 4 })) {
  check(
    (sprint3Difficulty.get(difficulty as InformaticsDifficulty) ?? 0) === expected,
    `sprint 3 difficulty "${difficulty}" must have ${expected} problems`,
  );
}

check(
  new Set(sprint3Problems.map((problem) => problem.kind)).size >= 7,
  "sprint 3 must include the requested mix of answer formats",
);
check(
  sprint3Problems
    .filter((problem) => problem.difficulty === "ct-prep")
    .every((problem) => /生徒|会話|表|トレース/.test(problem.prompt) && problem.estimatedMinutes >= 5),
  "every sprint 3 ct-prep problem must include a conversation, table, or trace",
);

function assignmentValue(): number {
  let x = 6;
  const y = x + 4;
  x = y * 2;
  return x;
}

function loopSum(from: number, to: number): number {
  let sum = 0;
  for (let value = from; value <= to; value += 1) sum += value;
  return sum;
}

function doublingCount(initial: number, limit: number): number {
  let value = initial;
  let count = 0;
  while (value < limit) {
    value *= 2;
    count += 1;
  }
  return count;
}

function linearSearchOneBased(values: readonly number[], target: number): number {
  return values.findIndex((value) => value === target) + 1;
}

function binarySearchComparisons(values: readonly number[], target: number): number {
  let left = 0;
  let right = values.length - 1;
  let comparisons = 0;
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    comparisons += 1;
    if (values[middle] === target) return comparisons;
    if (values[middle] < target) left = middle + 1;
    else right = middle - 1;
  }
  return comparisons;
}

function oneAdjacentSwapPass(values: readonly number[]): number[] {
  const result = [...values];
  for (let index = 0; index < result.length - 1; index += 1) {
    if (result[index] > result[index + 1]) {
      [result[index], result[index + 1]] = [result[index + 1], result[index]];
    }
  }
  return result;
}

const sprint3IndependentAnswers = new Map<string, number>([
  ["joho-prog-assignment-value", assignmentValue()],
  ["joho-prog-expression-order", Math.floor((3 + 4 * 2 - 1) / 3)],
  ["joho-prog-loop-sum", loopSum(1, 5)],
  ["joho-prog-while-count", doublingCount(3, 50)],
  ["joho-prog-array-sum", [4, 7, 2, 9].reduce((sum, value) => sum + value, 0)],
  ["joho-prog-function-return", Math.floor((5 * 2 + 8) / 3)],
  ["joho-algo-linear-search", linearSearchOneBased([14, 6, 23, 9, 18], 9)],
  ["joho-algo-binary-search-count", binarySearchComparisons([3, 8, 12, 19, 27, 31, 44], 27)],
]);

for (const [problemId, expected] of sprint3IndependentAnswers) {
  const numericProblem = INFORMATICS_PROBLEMS.find((problem) => problem.id === problemId);
  check(numericProblem?.correctNumber === expected, `${problemId} must match independent result ${expected}`);
  check(
    numericProblem ? numericProblem.explanation.includes(String(expected)) : false,
    `${problemId} explanation must include independently calculated result ${expected}`,
  );
}

check(
  oneAdjacentSwapPass([5, 2, 4, 1]).join(",") === "2,4,1,5" &&
    correctChoiceText("joho-algo-sort-trace").includes("[2,4,1,5]"),
  "sorting trace must match an independent adjacent-swap pass",
);
check(
  correctChoiceText("joho-algo-simulation-ct").includes(String(2 * 1000)),
  "simulation question must independently confirm two random draws per trial",
);
for (const equivalent of ["20", "20.0", "020.000", "２０．０"]) {
  check(
    isCommonTestAnswerCorrect(equivalent, assignmentValue(), "number"),
    `numeric normalization must accept ${equivalent} as 20`,
  );
}
for (const invalid of ["", "NaN", "Infinity", "20/1", "√400"]) {
  check(
    !isCommonTestAnswerCorrect(invalid, assignmentValue(), "number"),
    `numeric normalization must reject ${invalid || "empty"}`,
  );
}

// ── 公開制御 ─────────────────────────────────────────────────────────────────

const informaticsSubject = SUBJECTS.find((subject) => subject.id === "informatics");
check(Boolean(informaticsSubject), "informatics subject must exist in subjects.ts");
check(
  informaticsSubject?.status === "hidden",
  "informatics must stay hidden until the publication decision",
);
check(
  !PUBLIC_SUBJECTS.some((subject) => subject.id === "informatics"),
  "informatics must not appear in PUBLIC_SUBJECTS (navigation/subject listing)",
);
check(
  !PUBLIC_COURSE_SUBJECTS.some((subject) => subject.subjectId === "informatics-1"),
  "informatics-1 must not appear in PUBLIC_COURSE_SUBJECTS (course listing/sitemap)",
);
check(
  !PRIMARY_NAVIGATION.some((item) => item.href.startsWith("/informatics")),
  "informatics must not appear in PRIMARY_NAVIGATION",
);

const sitemapSource = fs.readFileSync(
  path.join(ROOT, "src/app/sitemap.ts"),
  "utf8",
);
check(
  !sitemapSource.includes("informatics"),
  "sitemap.ts must not hardcode informatics routes",
);
const sitemapPaths = sitemap().map((entry) => new URL(entry.url).pathname);
check(
  !sitemapPaths.some((route) => route.includes("informatics")),
  "generated sitemap must not contain informatics routes",
);

if (informaticsSubject) {
  for (const runtime of ["production", "preview", "test"] as const) {
    check(
      !evaluateSubjectPublication(informaticsSubject, "courses", runtime).allowed,
      `informatics must be rejected (404) in ${runtime}`,
    );
  }
  check(
    evaluateSubjectPublication(informaticsSubject, "courses", "development").allowed,
    "informatics must stay inspectable in local development",
  );
}

// ── 結果 ─────────────────────────────────────────────────────────────────────

if (issues.length > 0) {
  console.error(`informatics QA failed: ${issues.length} issue(s).`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(
  `informatics QA passed: ${lessons.length} lessons, ${INFORMATICS_PROBLEMS.length} problems (overall basic 24 / standard 24 / ct-prep 12; sprint 3 basic 8 / standard 8 / ct-prep 4), sprint 2 calculations and sprint 3 traces independently verified, subject hidden with dev-only preview.`,
);
