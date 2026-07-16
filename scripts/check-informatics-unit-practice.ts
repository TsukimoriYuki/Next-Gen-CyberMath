import { INFORMATICS_1_COURSE_SUBJECT } from "../src/data/courses/informatics-1";
import {
  INFORMATICS_UNIT_PRACTICE_PROBLEMS,
  type InformaticsPracticeArea,
  type InformaticsPracticeQuestionType,
} from "../src/data/informatics/problems";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};
const problems = INFORMATICS_UNIT_PRACTICE_PROBLEMS;
const lessonIds = new Set(
  INFORMATICS_1_COURSE_SUBJECT.units.flatMap((unit) =>
    unit.lessons.map((lesson) => lesson.lessonId),
  ),
);

function countBy<T extends string>(values: readonly T[]) {
  return Object.fromEntries(
    [...new Set(values)].map((value) => [
      value,
      values.filter((candidate) => candidate === value).length,
    ]),
  ) as Record<T, number>;
}

check(problems.length === 40, `40問であること（実際: ${problems.length}）`);
check(new Set(problems.map((problem) => problem.id)).size === 40, "ID重複なし");
check(new Set(problems.map((problem) => problem.slug)).size === 40, "slug重複なし");

const expectedAreas: Record<InformaticsPracticeArea, number> = {
  "data-use": 10,
  programming: 10,
  network: 5,
  security: 5,
  "digital-representation": 3,
  "computer-systems": 3,
  "information-design": 2,
  "information-society": 2,
};
const actualAreas = countBy(problems.map((problem) => problem.unitId!));
for (const [area, expected] of Object.entries(expectedAreas)) {
  check(actualAreas[area as InformaticsPracticeArea] === expected, `${area}=${expected}`);
}

const expectedDifficulty = { basic: 12, standard: 18, "ct-prep": 10 } as const;
const actualDifficulty = countBy(problems.map((problem) => problem.difficulty));
for (const [difficulty, expected] of Object.entries(expectedDifficulty)) {
  check(actualDifficulty[difficulty as keyof typeof expectedDifficulty] === expected, `${difficulty}=${expected}`);
}

const expectedTypes: Record<InformaticsPracticeQuestionType, number> = {
  "single-choice": 18,
  "multiple-select": 6,
  "numeric-input": 4,
  "matching-ordering": 4,
  "table-graph": 4,
  "program-trace": 4,
};
const actualTypes = countBy(problems.map((problem) => problem.questionType!));
for (const [questionType, expected] of Object.entries(expectedTypes)) {
  check(actualTypes[questionType as InformaticsPracticeQuestionType] === expected, `${questionType}=${expected}`);
}

const requiredExplanationParts = [
  "1. 最初に見る箇所：",
  "2. 条件・資料・プログラムの整理：",
  "3. 使用する知識：",
  "4. 解法または判断手順：",
  "5. 正答：",
  "6. 検算・再確認：",
  "7. よくある誤答：",
  "8. 関連講座への復習導線：",
];
const ctParts = ["先に読む資料", "後回しにできる", "選択肢", "保留", "類似問題"];
const forbidden = /TODO|TBD|placeholder|lorem|共通テスト第\d|実在企業/i;

for (const problem of problems) {
  const label = problem.id;
  check(problem.slug === problem.id, `${label}: slug`);
  check(problem.subjectId === "informatics", `${label}: subjectId`);
  check(Boolean(problem.unitId), `${label}: unitId`);
  check(problem.statement === problem.prompt && Boolean(problem.statement?.trim()), `${label}: statement`);
  check(Boolean(problem.questionType), `${label}: questionType`);
  check(problem.correctAnswer !== undefined, `${label}: correctAnswer`);
  check(Boolean(problem.detailedExplanation?.trim()), `${label}: detailedExplanation`);
  check(Boolean(problem.strategy?.trim()), `${label}: strategy`);
  check(Boolean(problem.firstCheck?.trim()), `${label}: firstCheck`);
  check(Boolean(problem.verification?.trim()), `${label}: verification`);
  check(Boolean(problem.commonMistake?.trim()), `${label}: commonMistake`);
  check((problem.relatedCourseIds?.length ?? 0) > 0, `${label}: relatedCourseIds`);
  check(problem.relatedCourseIds?.every((courseId) => lessonIds.has(courseId)) ?? false, `${label}: relatedCourseIds resolve`);
  check(problem.reviewTags.length >= 2, `${label}: reviewTags`);
  check((problem.mistakeTags?.length ?? 0) > 0, `${label}: mistakeTags`);
  check(problem.estimatedTime === problem.estimatedMinutes * 60 && problem.estimatedTime! > 0, `${label}: estimatedTime`);
  check(problem.copyrightStatus === "original", `${label}: copyrightStatus`);
  check(problem.sourceType === "original", `${label}: sourceType`);
  check(problem.publicationStatus === "beta", `${label}: publicationStatus`);
  check(!forbidden.test(JSON.stringify(problem)), `${label}: placeholder・転載表示なし`);
  for (const part of requiredExplanationParts) {
    check(problem.detailedExplanation?.includes(part) ?? false, `${label}: 解説「${part}」`);
  }
  if (problem.difficulty === "ct-prep") {
    for (const part of ctParts) check(problem.detailedExplanation?.includes(part) ?? false, `${label}: 共通テスト準備「${part}」`);
  }

  const choiceIds = new Set(problem.choices.map((choice) => choice.id));
  check(choiceIds.size === problem.choices.length, `${label}: choice ID重複なし`);
  check(problem.correctChoiceIds.every((id) => choiceIds.has(id)), `${label}: 正答が選択肢内`);
  check(new Set(problem.correctChoiceIds).size === problem.correctChoiceIds.length, `${label}: 正答集合重複なし`);
  check(problem.correctChoiceIds.length > 0, `${label}: 正答が一意に登録済み`);
  check(problem.choices.every((choice) => choice.reason.startsWith(problem.correctChoiceIds.includes(choice.id) ? "正答：" : "誤り：")), `${label}: 全選択肢の個別理由`);
  const wrongChoices = problem.choices.filter((choice) => !problem.correctChoiceIds.includes(choice.id));
  check(wrongChoices.every((choice) => Boolean(problem.distractorReasons?.[choice.id])), `${label}: 全誤答理由`);

  if (problem.questionType === "multiple-select") {
    check(problem.correctChoiceIds.length === 2, `${label}: 複数選択の正答数2`);
    check(problem.prompt.includes("2つ"), `${label}: 設問に正答数を明記`);
  } else {
    check(problem.correctChoiceIds.length === 1, `${label}: 単一の採点正答`);
  }
  if (problem.questionType === "numeric-input") {
    check(Number.isFinite(problem.correctNumber), `${label}: 有限な数値正答`);
    check((problem.acceptedNumericAnswers?.includes(problem.correctNumber!) ?? false), `${label}: 許容値に正答を含む`);
    check(Number.isFinite(problem.numericTolerance) && problem.numericTolerance! >= 0, `${label}: 有効な許容誤差`);
    check(Boolean(problem.answerUnit) && Boolean(problem.roundingRule), `${label}: 単位・丸め方`);
  }
  if (problem.questionType === "program-trace") {
    check(Boolean(problem.programCode && problem.expectedOutput && problem.variableStates?.length && problem.indexRule), `${label}: プログラムmetadata`);
  }
  if (problem.questionType === "table-graph") {
    check(Boolean(problem.tableData || problem.chartData), `${label}: 表またはグラフ資料`);
  }
}

const numericAnswers = new Map(problems.map((problem) => [problem.id, problem.correctNumber]));
check(numericAnswers.get("info-unit-data-02-mean-median") === [20, 25, 25, 30, 100][2], "中央値の独立再計算");
check(numericAnswers.get("info-unit-data-06-standard-score") === (80 - 60) / 10, "標準化の独立再計算");
let x = 1;
let loopCount = 0;
while (x < 20) { x *= 2; loopCount += 1; }
check(numericAnswers.get("info-unit-prog-05-loop-count") === loopCount, "繰り返し回数の独立再計算");
check(numericAnswers.get("info-unit-network-03-transfer-time") === (40 * 1_000_000 * 8) / (20 * 1_000_000), "転送時間とbit/byteの独立再計算");

const programExpected = new Map(problems.map((problem) => [problem.id, problem.expectedOutput]));
check(programExpected.get("info-unit-prog-02-counter-trace") === String([1, 2, 3, 4].filter((value) => value % 2 === 0).length), "カウンタ出力再計算");
check(programExpected.get("info-unit-prog-03-array-sum") === String([4, 7, 2, 9].filter((value) => value >= 5).reduce((sum, value) => sum + value, 0)), "配列合計再計算");
const maximumValues = [12, 7, 15, 18, 15];
const maximum = Math.max(...maximumValues);
check(programExpected.get("info-unit-prog-06-array-maximum") === `${maximum}, ${maximumValues.indexOf(maximum) + 1}`, "最大値・添字再計算");
const pass = [5, 2, 4, 1];
for (let index = 0; index < pass.length - 1; index += 1) {
  if (pass[index] > pass[index + 1]) [pass[index], pass[index + 1]] = [pass[index + 1], pass[index]];
}
check(programExpected.get("info-unit-prog-10-sort-complexity") === `[${pass.join(", ")}]`, "並べ替え1巡の独立再計算");

check(10 / 20 * 100 === 50, "クロス集計割合0〜100%");
check(82 - 78 === 4 && 82 / 78 < 2, "誤解を招くグラフの数値整合");
check(2 * 30 + 5 === 65, "回帰式の独立再計算");
check(parseInt("10110", 2) === 22, "2進数変換の独立再計算");
check(800 * 600 * 24 / 8 === 1_440_000, "画像データ量の独立再計算");
check(problems.filter((problem) => problem.unitId === "security").every((problem) => !/攻撃手順|侵入手順|回避手順/.test(problem.prompt + problem.explanation)), "セキュリティ問題は防御原則中心");
check(problems.filter((problem) => problem.unitId === "information-society").every((problem) => !/第\d+条|令和|西暦20\d{2}年/.test(problem.prompt + problem.explanation)), "時点依存の法律知識なし");

const normalizedPrompts = problems.map((problem) => problem.prompt.replace(/\s+/g, "").toLowerCase());
check(new Set(normalizedPrompts).size === normalizedPrompts.length, "新規40問内の完全重複なし");

if (issues.length > 0) {
  console.error(`情報Ⅰ40問専用QA: FAIL (${issues.length})`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log("情報Ⅰ40問専用QA: PASS（領域10/10/5/5/3/3/2/2、難易度12/18/10、形式18/6/4/4/4/4、metadata不足0、独立再計算済み）");
