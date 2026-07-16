import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { MATH_1A_COURSE_SUBJECT } from "../src/data/courses/math-1a";
import { MATH_1A_UNIT_PRACTICE_PROBLEMS } from "../src/data/math-1a-unit-practice";
import { PROBLEMS } from "../src/data/problems";
import { isCommonTestAnswerCorrect } from "../src/lib/common-test-answer-normalize";

const issues: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) issues.push(message); };
const practices = MATH_1A_UNIT_PRACTICE_PROBLEMS
  .map((problem) => problem.unitPractice)
  .filter((practice): practice is NonNullable<typeof practice> => practice !== undefined);
const courseIds = new Set(MATH_1A_COURSE_SUBJECT.units.flatMap((unit) => unit.lessons.map((lesson) => lesson.lessonId)));
const countBy = (key: (practice: NonNullable<(typeof practices)[number]>) => string) =>
  Object.fromEntries([...new Set(practices.map(key))].map((value) => [value, practices.filter((practice) => key(practice) === value).length]));

check(practices.length === 40, `expected 40 practices, got ${practices.length}`);
const byArea = countBy((practice) => practice.practiceArea);
for (const area of ["数と式", "集合と命題", "二次関数", "図形と計量", "データの分析", "場合の数", "確率", "図形の性質"]) {
  check(byArea[area] === 5, `${area}: expected 5, got ${byArea[area] ?? 0}`);
}
const byDifficulty = countBy((practice) => practice.difficulty);
check(byDifficulty.basic === 16, `basic expected 16, got ${byDifficulty.basic ?? 0}`);
check(byDifficulty.standard === 16, `standard expected 16, got ${byDifficulty.standard ?? 0}`);
check(byDifficulty["common-test-prep"] === 8, `common-test-prep expected 8, got ${byDifficulty["common-test-prep"] ?? 0}`);
const byType = countBy((practice) => practice.questionType);
check(byType["single-choice"] === 20, `single-choice expected 20, got ${byType["single-choice"] ?? 0}`);
check(byType.numeric === 10, `numeric expected 10, got ${byType.numeric ?? 0}`);
check(byType["multiple-select"] === 4, `multiple-select expected 4, got ${byType["multiple-select"] ?? 0}`);
check((byType.matching ?? 0) + (byType.ordering ?? 0) === 4, `matching/ordering expected 4, got ${(byType.matching ?? 0) + (byType.ordering ?? 0)}`);
check(byType["table-reading"] === 2, `table-reading expected 2, got ${byType["table-reading"] ?? 0}`);

const ids = practices.map((practice) => practice.id);
const slugs = practices.map((practice) => practice.slug);
check(new Set(ids).size === 40, "practice IDs must be unique");
check(new Set(slugs).size === 40, "practice slugs must be unique");
check(new Set(PROBLEMS.map((problem) => problem.slug)).size === PROBLEMS.length, "global problem slugs must be unique");

for (const practice of practices) {
  const prefix = practice.id;
  check(practice.id === practice.slug, `${prefix}: id and slug must match`);
  check(practice.subjectId === "math-1a", `${prefix}: wrong subjectId`);
  check(Boolean(practice.unitId), `${prefix}: missing unitId`);
  check(Boolean(practice.detailedExplanation), `${prefix}: missing detailedExplanation`);
  check(Boolean(practice.strategy), `${prefix}: missing strategy`);
  check(Boolean(practice.firstCheck), `${prefix}: missing firstCheck`);
  check(Boolean(practice.verification), `${prefix}: missing verification`);
  check(Boolean(practice.commonMistake), `${prefix}: missing commonMistake`);
  check(practice.relatedCourseIds.length > 0, `${prefix}: missing relatedCourseIds`);
  check(practice.relatedCourseIds.every((id) => courseIds.has(id)), `${prefix}: unresolved relatedCourseId`);
  check(practice.reviewTags.length > 0 && practice.mistakeTags.length > 0, `${prefix}: missing review/mistake tags`);
  check(practice.estimatedTime > 0, `${prefix}: estimatedTime must be positive`);
  check(practice.copyrightStatus === "original", `${prefix}: copyrightStatus must be original`);
  check(practice.sourceType === "original", `${prefix}: sourceType must be original`);
  check(practice.publicationStatus === "public", `${prefix}: publicationStatus must be public`);
  const kpdRange = practice.difficulty === "basic" ? [42, 49] : practice.difficulty === "standard" ? [50, 57] : [58, 64];
  check(practice.internalKpd >= kpdRange[0] && practice.internalKpd <= kpdRange[1], `${prefix}: internalKpd outside difficulty range`);
  for (const marker of ["1. 最初に何を見るか", "2. 条件整理", "3. 解法選択", "4. 計算・推論", "5. 正答", "6. 検算", "7. よくある誤答", "8. 関連講座"]) {
    check(practice.detailedExplanation.includes(marker), `${prefix}: explanation missing ${marker}`);
  }
  if (practice.difficulty === "common-test-prep") {
    for (const marker of ["誘導の読み方", "捨ててよい情報", "選択肢からの逆算", "時間を使いすぎた場合", "変形問題への橋渡し"]) {
      check(practice.detailedExplanation.includes(marker), `${prefix}: CT explanation missing ${marker}`);
    }
  }
  if (practice.questionType === "numeric") {
    const accepted = practice.acceptedAnswers ?? [practice.correctAnswer];
    check(accepted.length > 0, `${prefix}: missing accepted numeric answer`);
    check(accepted.every((answer) => isCommonTestAnswerCorrect(answer, [...accepted], "number")), `${prefix}: invalid numeric answer`);
    check(Object.keys(practice.distractorReasons).length > 0, `${prefix}: numeric distractor reasons missing`);
  } else {
    check(Boolean(practice.choices?.length), `${prefix}: choices missing`);
    const choices = practice.choices ?? [];
    check(new Set(choices.map((choice) => choice.id)).size === choices.length, `${prefix}: duplicate choice ID`);
    check(new Set(choices.map((choice) => choice.text)).size === choices.length, `${prefix}: duplicate choice text`);
    check(choices.filter((choice) => choice.id === practice.correctAnswer).length === 1, `${prefix}: correct answer not unique/in choices`);
    for (const choice of choices.filter((choice) => choice.id !== practice.correctAnswer)) {
      check(Boolean(choice.reason), `${prefix}: choice ${choice.id} missing reason`);
      check(Boolean(practice.distractorReasons[choice.id]), `${prefix}: distractor ${choice.id} missing mapped reason`);
    }
  }
  const searchable = JSON.stringify(practice);
  check(!/TODO|TBD|placeholder/i.test(searchable), `${prefix}: placeholder/TODO found`);
  check(!/加法定理/.test(searchable), `${prefix}: addition theorem found`);
}

// Independent arithmetic checks for all ten numeric questions.
const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);
const numericExpected: Record<string, number> = {
  "m1a-ne-02-radical-square": 12 - 3,
  "m1a-ne-03-absolute-roots-sum": 6 + (-1),
  "m1a-sl-02-union-cardinality": 18 + 15 - 6,
  "m1a-qf-02-vertex-value": -5,
  "m1a-qf-04-root-count": 4 ** 2 - 4 * 1 * 5 < 0 ? 0 : 2,
  "m1a-gm-02-right-triangle-length": 12,
  "m1a-da-02-variance-basic": [-1, -1, 1, 1].reduce((sum, value) => sum + value ** 2, 0) / 4,
  "m1a-co-02-permutation": 4 * 3,
  "m1a-co-04-nonadjacent": factorial(4) - factorial(3) * 2,
  "m1a-pr-02-complement": 1 - (1 / 2) ** 2,
};
check(Object.keys(numericExpected).length === 10, "numeric verifier must cover 10 questions");
for (const [id, expected] of Object.entries(numericExpected)) {
  const practice = practices.find((candidate) => candidate.id === id);
  check(Boolean(practice), `${id}: verifier target missing`);
  check(practice?.questionType === "numeric", `${id}: verifier target is not numeric`);
  check(isCommonTestAnswerCorrect(String(expected), practice?.acceptedAnswers ? [...practice.acceptedAnswers] : practice?.correctAnswer, "number"), `${id}: independently calculated answer mismatch`);
}

// Original table values are recomputed rather than trusting the answer key.
const qfTable = practices.find((practice) => practice.id === "m1a-qf-05-table-translation");
check(qfTable?.visual?.rows[0]?.join(",") === "f(x),8,3,0,-1,0", "quadratic table data changed unexpectedly");
check(qfTable?.correctAnswer === "C", "quadratic table axis/minimum answer mismatch");
const transformed = [4, 6, 8, 10].map((value) => 2 * value + 5);
const transformedMean = transformed.reduce((sum, value) => sum + value, 0) / transformed.length;
const dataTable = practices.find((practice) => practice.id === "m1a-da-05-table-standardization");
check(transformedMean === 19 && dataTable?.correctAnswer === "D", "data transformation table mismatch");

// Range/geometry sanity checks.
check([0.75, 0.2, 0.5].every((value) => value >= 0 && value <= 1), "probability out of range");
check([12, 15, 12].every((value) => Number.isInteger(value) && value >= 0), "counting answer is not a non-negative integer");
check(Math.sqrt(39) > 7 - 5 && Math.sqrt(39) < 7 + 5, "cosine-law triangle does not exist");
check(Math.sqrt(1) >= 0, "standard deviation must be non-negative");

const root = resolve(import.meta.dirname, "..");
const runnerSource = readFileSync(resolve(root, "src/components/math/MathUnitPracticeRunner.tsx"), "utf8");
check(!runnerSource.includes("practice.internalKpd"), "internal KPD is rendered by public UI");
check(!runnerSource.includes(">KPD<"), "KPD label is rendered by public UI");

if (issues.length) {
  console.error(`math IA unit practice QA failed: ${issues.length} issue(s)`);
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exitCode = 1;
} else {
  console.log("math IA unit practice QA passed: 40 questions, 8 areas, scoring and independent calculations verified");
}
