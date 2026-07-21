import { createHash } from "node:crypto";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { ELEMENTARY_VISUAL_ASSETS_BY_ID } from "../src/data/elementary/assets";
import {
  ELEMENTARY_CURRICULUM_ENTRIES_BY_ID,
  ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID,
} from "../src/data/elementary/curriculum";
import { ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS } from "../src/data/elementary/expansion-wave-2-final-audit";
import { ELEMENTARY_EXPANSION_WAVE_2 } from "../src/data/elementary/expansion-wave-2";
import { ELEMENTARY_EXPANSION_WAVE_2_LESSONS } from "../src/data/elementary/lessons/expansion-wave-2";
import { ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS } from "../src/data/elementary/problems/expansion-wave-2";
import { ELEMENTARY_UNITS } from "../src/data/elementary/units";
import { buildElementarySegmentedContentInventory } from "../src/lib/elementary-inventory";
import { extractElementaryInlineText } from "../src/lib/elementary-text";

type Issue = Readonly<{
  id: string;
  area: string;
  ruleId: string;
  expected: unknown;
  actual: unknown;
  source: string;
}>;

const issues: Issue[] = [];
const add = (id: string, area: string, ruleId: string, expected: unknown, actual: unknown, source: string) =>
  issues.push({ id, area, ruleId, expected, actual, source });
const check = (condition: boolean, id: string, area: string, ruleId: string, expected: unknown, actual: unknown, source: string) => {
  if (!condition) add(id, area, ruleId, expected, actual, source);
};

type ExpectedLessonAnswers = Readonly<{
  lessonId: string;
  choices: readonly (readonly string[])[];
  numerics: readonly Readonly<{ value: number; unit: string }>[];
}>;

// 問題registryとは別に計算・定義から再生成した期待値。
const EXPECTED_ANSWERS: readonly ExpectedLessonAnswers[] = Object.freeze([
  { lessonId: "elementary-grade-3-math-read-large-numbers", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 60_000 + 200, unit: "" }, { value: Math.trunc(85_304 / 10_000), unit: "" }, { value: 20_000 + 1_000 * 5, unit: "" }, { value: 4_300 * 10, unit: "" }] },
  { lessonId: "elementary-grade-3-math-large-number-addition-subtraction", choices: [["a"], ["a"], ["a"], ["a", "b"]], numerics: [{ value: 2_347 + 1_526, unit: "" }, { value: 4_205 - 1_832, unit: "" }, { value: 1_980 + 2_050, unit: "" }, { value: 1_825 + 375, unit: "さつ" }] },
  { lessonId: "elementary-grade-3-math-two-digit-times-one-digit", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 32 * 3, unit: "" }, { value: 47 * 2, unit: "" }, { value: 28 * 3, unit: "本" }, { value: 36 * 4, unit: "きゃく" }] },
  { lessonId: "elementary-grade-3-math-three-digit-times-one-digit", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 123 * 4, unit: "" }, { value: 246 * 3, unit: "" }, { value: 304 * 2, unit: "" }, { value: 215 * 4, unit: "まい" }] },
  { lessonId: "elementary-grade-3-math-measure-length", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 3, unit: "mm" }, { value: 2 * 100, unit: "cm" }, { value: 85 - 47, unit: "cm" }, { value: 1_000 - 620, unit: "m" }] },
  { lessonId: "elementary-grade-3-math-measure-weight", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 3 * 1_000, unit: "g" }, { value: 50 * 7, unit: "g" }, { value: 750 + 480, unit: "g" }, { value: 920 - 170, unit: "g" }] },
  { lessonId: "elementary-grade-3-math-time-and-duration", choices: [["a"], ["a"], ["a"], ["a"]], numerics: [{ value: 2 * 60, unit: "秒" }, { value: 60 - 20, unit: "分" }, { value: (35 + 50) - 60, unit: "分" }, { value: 35 + 50, unit: "分" }] },
  { lessonId: "elementary-grade-3-math-classify-triangles", choices: [["a"], ["a"], ["a"], ["a"], ["a"], ["a", "b"]], numerics: [{ value: 3, unit: "本" }, { value: 5 + 5 + 8, unit: "cm" }] },
  { lessonId: "elementary-grade-3-math-circles-and-spheres", choices: [["a"], ["a"], ["a"], ["a"], ["a"], ["a", "b"]], numerics: [{ value: 4 * 2, unit: "cm" }, { value: 14 / 2, unit: "cm" }] },
  { lessonId: "elementary-grade-3-math-tables-and-bar-graphs", choices: [["a"], ["a"], ["a"], ["a"], ["a"], ["a", "b"]], numerics: [{ value: 12 - 8, unit: "人" }, { value: 12 + 8 + 6 + 4, unit: "人" }] },
]);

const audit = ELEMENTARY_EXPANSION_WAVE_2.finalTechnicalAudit;
check(Boolean(audit), ELEMENTARY_EXPANSION_WAVE_2.id, "metadata", "final-audit-present", "present", audit, "src/data/elementary/expansion-wave-2.ts");
if (audit) {
  for (const [field, expected, actual] of [
    ["status", "complete", audit.status], ["auditedLessonCount", 10, audit.auditedLessonCount],
    ["auditedProblemCount", 80, audit.auditedProblemCount], ["auditedAssetCount", 8, audit.auditedAssetCount],
    ["correctedProblemCount", 5, audit.correctedProblemCount], ["correctedLessonTextCount", 1, audit.correctedLessonTextCount],
    ["correctedAssetCount", 3, audit.correctedAssetCount], ["remainingTechnicalIssueCount", 0, audit.remainingTechnicalIssueCount],
    ["remainingBlockingIssueCount", 0, audit.remainingBlockingIssueCount],
  ] as const) check(actual === expected, ELEMENTARY_EXPANSION_WAVE_2.id, "metadata", `final-audit-${field}`, expected, actual, "src/data/elementary/expansion-wave-2.ts");
}

check(ELEMENTARY_EXPANSION_WAVE_2.publicationStatus === "hidden", ELEMENTARY_EXPANSION_WAVE_2.id, "release", "publication-remains-hidden", "hidden", ELEMENTARY_EXPANSION_WAVE_2.publicationStatus, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval === "pending", ELEMENTARY_EXPANSION_WAVE_2.id, "release", "approval-remains-pending", "pending", ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval, "src/data/elementary/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2.automaticRelease === false, ELEMENTARY_EXPANSION_WAVE_2.id, "release", "automatic-release-disabled", false, ELEMENTARY_EXPANSION_WAVE_2.automaticRelease, "src/data/elementary/expansion-wave-2.ts");
check(Object.values(ELEMENTARY_EXPANSION_WAVE_2.humanReviews).every((status) => status === "not-reviewed"), ELEMENTARY_EXPANSION_WAVE_2.id, "review", "technical-audit-is-not-human-review", "all not-reviewed", ELEMENTARY_EXPANSION_WAVE_2.humanReviews, "src/data/elementary/expansion-wave-2.ts");

const waveUnits = ELEMENTARY_UNITS.filter((unit) => ELEMENTARY_EXPANSION_WAVE_2.unitIds.includes(unit.id as never));
const waveAssets = ELEMENTARY_EXPANSION_WAVE_2.assetIds?.map((id) => ELEMENTARY_VISUAL_ASSETS_BY_ID[id]) ?? [];
check(waveUnits.length === 7, ELEMENTARY_EXPANSION_WAVE_2.id, "registry", "unit-count", 7, waveUnits.length, "src/data/elementary/units/index.ts");
check(ELEMENTARY_EXPANSION_WAVE_2_LESSONS.length === 10, ELEMENTARY_EXPANSION_WAVE_2.id, "registry", "lesson-count", 10, ELEMENTARY_EXPANSION_WAVE_2_LESSONS.length, "src/data/elementary/lessons/expansion-wave-2.ts");
check(ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.length === 80, ELEMENTARY_EXPANSION_WAVE_2.id, "registry", "problem-count", 80, ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.length, "src/data/elementary/problems/expansion-wave-2.ts");
check(waveAssets.length === 8 && waveAssets.every(Boolean), ELEMENTARY_EXPANSION_WAVE_2.id, "registry", "asset-count", 8, waveAssets.filter(Boolean).length, "src/data/elementary/assets/visual-assets.ts");

for (const expected of EXPECTED_ANSWERS) {
  const lesson = ELEMENTARY_EXPANSION_WAVE_2_LESSONS.find((entry) => entry.id === expected.lessonId);
  const problems = ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.lessonIds.includes(expected.lessonId)).sort((a, b) => a.order - b.order);
  check(Boolean(lesson), expected.lessonId, "registry", "lesson-reference-resolved", "resolved", lesson?.id, "src/data/elementary/lessons/expansion-wave-2.ts");
  check(problems.length === 8 && lesson?.problemIds.length === 8, expected.lessonId, "registry", "eight-problems", 8, problems.length, "src/data/elementary/{lessons,problems}/expansion-wave-2.ts");
  if (!lesson) continue;
  check(Boolean(ELEMENTARY_CURRICULUM_ENTRIES_BY_ID[lesson.curriculumReferenceIds[0]]), lesson.id, "curriculum", "entry-resolved", "resolved", lesson.curriculumReferenceIds, "src/data/elementary/curriculum/grade-3-math.ts");
  check(lesson.curriculumObjectiveIds.every((id) => Boolean(ELEMENTARY_CURRICULUM_OBJECTIVES_BY_ID[id])), lesson.id, "curriculum", "objective-resolved", "all resolved", lesson.curriculumObjectiveIds, "src/data/elementary/curriculum/grade-3-math.ts");
  check(lesson.requirementCoverage.every((coverage) => coverage.lessonCoverage === "partial" && coverage.assessmentCoverage === "partial"), lesson.id, "curriculum", "coverage-remains-partial", "partial / partial", lesson.requirementCoverage, "src/data/elementary/lessons/expansion-wave-2.ts");

  const expectedRows = [
    ...expected.choices.map((correctChoiceIds) => ({ kind: "choice" as const, correctChoiceIds })),
    ...expected.numerics.map((numeric) => ({ kind: "numeric" as const, numeric })),
  ];
  problems.forEach((problem, index) => {
    const row = expectedRows[index];
    check(Boolean(row), problem.id, "answer", "independent-expectation-present", "present", row, "scripts/check-elementary-expansion-wave-2-final-audit.ts");
    if (!row) return;
    const choiceIds = problem.choices.map((choice) => choice.id);
    check(new Set(choiceIds).size === choiceIds.length, problem.id, "answer", "choice-id-unique", choiceIds.length, new Set(choiceIds).size, "src/data/elementary/problems/expansion-wave-2.ts");
    check(new Set(problem.choices.map((choice) => extractElementaryInlineText(choice.label))).size === problem.choices.length, problem.id, "answer", "choice-label-unique", problem.choices.length, new Set(problem.choices.map((choice) => extractElementaryInlineText(choice.label))).size, "src/data/elementary/problems/expansion-wave-2.ts");
    check(problem.choices.every((choice) => extractElementaryInlineText(choice.reason).trim().length > 0), problem.id, "explanation", "all-choice-reasons-present", "all non-empty", problem.choices.map((choice) => extractElementaryInlineText(choice.reason)), "src/data/elementary/problems/expansion-wave-2.ts");
    check(Object.values(problem.explanation).every((value) => extractElementaryInlineText(value).trim().length > 0), problem.id, "explanation", "all-explanation-fields-present", "all non-empty", problem.explanation, "src/data/elementary/problems/expansion-wave-2.ts");
    check(extractElementaryInlineText(problem.hint).trim().length > 0, problem.id, "explanation", "hint-present", "non-empty", extractElementaryInlineText(problem.hint), "src/data/elementary/problems/expansion-wave-2.ts");
    check(problem.visualAssetId === lesson.visualAssetIds[0], problem.id, "asset", "problem-lesson-asset-match", lesson.visualAssetIds[0], problem.visualAssetId, "src/data/elementary/{lessons,problems}/expansion-wave-2.ts");

    if (row.kind === "choice") {
      const actual = problem.answer.kind === "single-choice" || problem.answer.kind === "multiple-choice"
        ? [...problem.answer.correctChoiceIds]
        : [];
      check(JSON.stringify(actual) === JSON.stringify(row.correctChoiceIds), problem.id, "answer", "independent-choice-answer", row.correctChoiceIds, actual, "src/data/elementary/problems/expansion-wave-2.ts");
      check(row.correctChoiceIds.every((id) => choiceIds.includes(id)), problem.id, "answer", "correct-choice-resolved", row.correctChoiceIds, choiceIds, "src/data/elementary/problems/expansion-wave-2.ts");
      if (problem.answer.kind === "multiple-choice") {
        check(problem.answer.selectionCount === row.correctChoiceIds.length, problem.id, "answer", "multiple-selection-count", row.correctChoiceIds.length, problem.answer.selectionCount, "src/data/elementary/problems/expansion-wave-2.ts");
        check(extractElementaryInlineText(problem.prompt).includes(`${row.correctChoiceIds.length}つ`), problem.id, "answer", "multiple-count-in-prompt", `${row.correctChoiceIds.length}つ`, extractElementaryInlineText(problem.prompt), "src/data/elementary/problems/expansion-wave-2.ts");
      }
    } else {
      const numeric = problem.answer.kind === "numeric-input" ? problem.answer.numeric : undefined;
      const actualUnit = numeric ? extractElementaryInlineText(numeric.unit) : undefined;
      check(numeric?.value === row.numeric.value, problem.id, "answer", "independent-numeric-answer", row.numeric.value, numeric?.value, "src/data/elementary/problems/expansion-wave-2.ts");
      check(numeric?.tolerance === 0, problem.id, "answer", "exact-numeric-tolerance", 0, numeric?.tolerance, "src/data/elementary/problems/expansion-wave-2.ts");
      check(actualUnit === row.numeric.unit, problem.id, "answer", "numeric-unit", row.numeric.unit, actualUnit, "src/data/elementary/problems/expansion-wave-2.ts");
      check(extractElementaryInlineText(problem.explanation.detailed).includes(String(row.numeric.value)), problem.id, "explanation", "numeric-explanation-matches", String(row.numeric.value), extractElementaryInlineText(problem.explanation.detailed), "src/data/elementary/problems/expansion-wave-2.ts");
    }
  });
}

const formatCounts = {
  single: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "single-choice").length,
  multiple: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "multiple-choice").length,
  numeric: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "numeric-input").length,
  basic: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.difficulty === "basic").length,
  standard: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.difficulty === "standard").length,
};
check(JSON.stringify(formatCounts) === JSON.stringify({ single: 42, multiple: 4, numeric: 34, basic: 60, standard: 20 }), ELEMENTARY_EXPANSION_WAVE_2.id, "inventory", "format-difficulty-counts", { single: 42, multiple: 4, numeric: 34, basic: 60, standard: 20 }, formatCounts, "src/data/elementary/problems/expansion-wave-2.ts");

const reviewTotals = ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS.reduce((totals, record) => ({
  problems: totals.problems + record.correctedProblemCount,
  text: totals.text + record.correctedLessonTextCount,
  assets: totals.assets + record.correctedAssetCount,
}), { problems: 0, text: 0, assets: 0 });
check(ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS.length === 10, ELEMENTARY_EXPANSION_WAVE_2.id, "review-page", "ten-review-records", 10, ELEMENTARY_EXPANSION_WAVE_2_LESSON_AUDITS.length, "src/data/elementary/expansion-wave-2-final-audit.ts");
check(JSON.stringify(reviewTotals) === JSON.stringify({ problems: 5, text: 1, assets: 3 }), ELEMENTARY_EXPANSION_WAVE_2.id, "metadata", "correction-totals-match", { problems: 5, text: 1, assets: 3 }, reviewTotals, "src/data/elementary/expansion-wave-2-final-audit.ts");

const assetRoot = join(process.cwd(), "public", "elementary", "assets");
for (const asset of waveAssets) {
  if (!asset) continue;
  const absolutePath = join(process.cwd(), "public", asset.localPath.replace(/^\//u, ""));
  const content = readFileSync(absolutePath, "utf8");
  const checksum = createHash("sha256").update(readFileSync(absolutePath)).digest("hex");
  check(checksum === asset.checksumSha256, asset.id, "asset", "checksum-match", asset.checksumSha256, checksum, "src/data/elementary/assets/visual-assets.ts");
  check(statSync(absolutePath).size === asset.fileSizeBytes, asset.id, "asset", "file-size-match", asset.fileSizeBytes, statSync(absolutePath).size, "src/data/elementary/assets/visual-assets.ts");
  for (const unsafe of [/<script\b/iu, /<foreignObject\b/iu, /\son\w+=/iu, /(?:href|xlink:href)=["'](?:https?:|\/\/)/iu]) {
    check(!unsafe.test(content), asset.id, "asset", "unsafe-svg-zero", false, unsafe.test(content), asset.localPath);
  }
}

const weightSvg = readFileSync(join(assetRoot, "weight-scale-and-time-line.svg"), "utf8");
const placeValueSvg = readFileSync(join(assetRoot, "large-number-place-value-chart.svg"), "utf8");
check([">万<", ">千<", ">百<", ">十<", ">一<", ">3<", ">5<"].every((token) => placeValueSvg.includes(token)) && (placeValueSvg.match(/>0</gu)?.length ?? 0) === 3, "large-number-place-value-chart", "math", "place-value-chart-30005", "3 / 0 / 0 / 0 / 5", placeValueSvg.match(/>[0-9]</gu), "public/elementary/assets/large-number-place-value-chart.svg");

const columnsSvg = readFileSync(join(assetRoot, "addition-subtraction-columns.svg"), "utf8");
check(['x="310" y="225">2<', 'x="430" y="225">3<', 'x="550" y="225">4<', 'x="670" y="225">5<', 'x="430" y="295">4<', 'x="550" y="295">0<', 'x="670" y="295">8<'].every((token) => columnsSvg.includes(token)), "addition-subtraction-columns", "math", "column-place-alignment", "2345 + 408 aligned by place", columnsSvg.match(/x="(?:310|430|550|670)" y="(?:225|295)">[0-9]</gu), "public/elementary/assets/addition-subtraction-columns.svg");

const multiplicationSvg = readFileSync(join(assetRoot, "multiplication-decomposition-array.svg"), "utf8");
check((multiplicationSvg.match(/>20こ</gu)?.length ?? 0) === 3 && (multiplicationSvg.match(/>4こ</gu)?.length ?? 0) === 3 && multiplicationSvg.includes(">60＋12＝72<"), "multiplication-decomposition-array", "math", "multiplication-array-count", "20×3 + 4×3 = 72", multiplicationSvg.match(/>(?:20こ|4こ|60＋12＝72)</gu), "public/elementary/assets/multiplication-decomposition-array.svg");

const lengthSvg = readFileSync(join(assetRoot, "length-ruler-and-route.svg"), "utf8");
check(lengthSvg.includes('d="M170 130H420"') && lengthSvg.includes(">7−2＝5cm<") && lengthSvg.includes(">400＋350＝750m<"), "length-ruler-and-route", "math", "ruler-route-values-match", "2→7 = 5cm / 400+350 = 750m", lengthSvg.match(/>(?:7−2＝5cm|400＋350＝750m)</gu), "public/elementary/assets/length-ruler-and-route.svg");

check(weightSvg.includes('data-scale-step-grams="50"') && weightSvg.includes('data-pointer-grams="350"') && weightSvg.includes(">350g<"), "weight-scale-and-time-line", "math", "scale-mark-and-pointer-match", "50g steps / 350g pointer", weightSvg.match(/data-(?:scale-step|pointer)-grams="\d+"/gu), "public/elementary/assets/weight-scale-and-time-line.svg");
check(weightSvg.includes("10時50分") && weightSvg.includes("11時") && weightSvg.includes("11時10分") && (weightSvg.match(/>10分</gu)?.length ?? 0) === 2, "weight-scale-and-time-line", "math", "time-line-base-sixty", "10 + 10 minutes", weightSvg.match(/>[^<]*(?:時|分)[^<]*</gu), "public/elementary/assets/weight-scale-and-time-line.svg");

const triangleSvg = readFileSync(join(assetRoot, "triangle-classification.svg"), "utf8");
const equilateralMatch = triangleSvg.match(/data-shape="equilateral"[^>]*d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)z"/u);
if (!equilateralMatch) {
  add("triangle-classification", "math", "equilateral-coordinates-present", "three vertices", null, "public/elementary/assets/triangle-classification.svg");
} else {
  const points = [[+equilateralMatch[1], +equilateralMatch[2]], [+equilateralMatch[3], +equilateralMatch[4]], [+equilateralMatch[5], +equilateralMatch[6]]] as const;
  const distance = (a: readonly number[], b: readonly number[]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const sides = [distance(points[0], points[1]), distance(points[1], points[2]), distance(points[2], points[0])];
  check(Math.max(...sides) - Math.min(...sides) < 0.01, "triangle-classification", "math", "equilateral-side-lengths", "three equal sides", sides, "public/elementary/assets/triangle-classification.svg");
}

const circleSvg = readFileSync(join(assetRoot, "circle-sphere-structure.svg"), "utf8");
const radiusMatch = circleSvg.match(/data-radius-length="150" d="M([\d.]+) ([\d.]+)L([\d.]+) ([\d.]+)"/u);
const radiusLength = radiusMatch ? Math.hypot(+radiusMatch[3] - +radiusMatch[1], +radiusMatch[4] - +radiusMatch[2]) : 0;
check(Math.abs(radiusLength - 150) < 0.01, "circle-sphere-structure", "math", "radius-reaches-circle", 150, radiusLength, "public/elementary/assets/circle-sphere-structure.svg");
check(circleSvg.includes('d="M110 250H410"'), "circle-sphere-structure", "math", "diameter-through-center", "110→410 through center 260", circleSvg.match(/d="M110 250H410"/u)?.[0], "public/elementary/assets/circle-sphere-structure.svg");

const graphSvg = readFileSync(join(assetRoot, "table-and-bar-graph.svg"), "utf8");
for (const token of [">12<", ">8<", ">6<", ">4<", 'height="300"', 'height="200"', 'height="150"', 'height="100"']) {
  check(graphSvg.includes(token), "table-and-bar-graph", "math", "graph-data-match", token, graphSvg.includes(token), "public/elementary/assets/table-and-bar-graph.svg");
}

const triangleProblem = ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.find((problem) => problem.id === "eg3-math-classify-triangles-06");
check(triangleProblem?.choices.some((choice) => extractElementaryInlineText(choice.label) === "3本のへんが同じ長さ") === true, triangleProblem?.id ?? "triangle-problem", "math", "no-forced-set-inclusion", "unambiguous grade-3 rule", triangleProblem?.choices.map((choice) => extractElementaryInlineText(choice.label)), "src/data/elementary/problems/expansion-wave-2.ts");

const inventory = buildElementarySegmentedContentInventory();
check(inventory.publishedBeta.totals.lessonCount === 9 && inventory.publishedBeta.totals.problemCount === 72 && inventory.publishedBeta.totals.visualAssetCount === 6, "current-beta", "release", "published-beta-unaffected", "9 lessons / 72 problems / 6 assets", `${inventory.publishedBeta.totals.lessonCount} / ${inventory.publishedBeta.totals.problemCount} / ${inventory.publishedBeta.totals.visualAssetCount}`, "src/lib/elementary-inventory.ts");
check(inventory.combinedProblemCounts.published === 1420 && inventory.combinedProblemCounts.registered === 1500, "combined", "inventory", "published-registered-separated", "1420 / 1500", `${inventory.combinedProblemCounts.published} / ${inventory.combinedProblemCounts.registered}`, "src/lib/elementary-inventory.ts");

const reviewPage = join(process.cwd(), "src", "app", "elementary", "showcase", "expansion-wave-2-review", "page.tsx");
check(existsSync(reviewPage), "expansion-wave-2-review", "review-page", "page-exists", true, existsSync(reviewPage), "src/app/elementary/showcase/expansion-wave-2-review/page.tsx");
if (existsSync(reviewPage)) {
  const source = readFileSync(reviewPage, "utf8");
  check(!/<(?:input|form|button)\b/iu.test(source), "expansion-wave-2-review", "review-page", "no-browser-approval-input", "no form controls", source.match(/<(?:input|form|button)\b/giu), "src/app/elementary/showcase/expansion-wave-2-review/page.tsx");
  check(source.includes("robots: { index: false, follow: false"), "expansion-wave-2-review", "review-page", "noindex-nofollow", "noindex / nofollow", source.includes("robots: { index: false, follow: false"), "src/app/elementary/showcase/expansion-wave-2-review/page.tsx");
}

if (issues.length) {
  console.error(`elementary expansion wave 2 final audit failed: ${issues.length} issue(s)`);
  for (const issue of issues) {
    console.error(`- ID: ${issue.id}`);
    console.error(`  area: ${issue.area}`);
    console.error(`  rule ID: ${issue.ruleId}`);
    console.error(`  expected: ${JSON.stringify(issue.expected)}`);
    console.error(`  actual: ${JSON.stringify(issue.actual)}`);
    console.error(`  source: ${issue.source}`);
  }
  process.exitCode = 1;
} else {
  console.log("elementary expansion wave 2 final audit passed: 10 lessons / 80 problems / 8 assets; 5 problems, 1 lesson text, and 3 assets corrected; 0 blocking issues; human review pending and publication hidden.");
}
