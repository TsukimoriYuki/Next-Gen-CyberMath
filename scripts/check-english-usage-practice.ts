import {
  ENGLISH_USAGE_PROBLEMS,
  type EnglishUsageArea,
  type EnglishUsageQuestionType,
} from "../src/data/english-usage";

const issues: string[] = [];
const check = (condition: boolean, message: string) => { if (!condition) issues.push(message); };
const countBy = <T extends string>(values: readonly T[]) => Object.fromEntries([...new Set(values)].map((value) => [value, values.filter((candidate) => candidate === value).length])) as Record<T, number>;
const problems = ENGLISH_USAGE_PROBLEMS;

check(problems.length === 40, `合計40問（実際: ${problems.length}）`);
check(new Set(problems.map((problem) => problem.id)).size === 40, "ID重複なし");
check(new Set(problems.map((problem) => problem.slug)).size === 40, "slug重複なし");

const expectedAreas: Record<EnglishUsageArea, number> = {
  "context-vocabulary": 10,
  "synonym-paraphrase": 6,
  "word-form": 4,
  collocation: 6,
  "phrasal-preposition": 4,
  "verb-usage": 4,
  "noun-adjective-adverb": 3,
  "conversation-notice": 3,
};
const areas = countBy(problems.map((problem) => problem.area));
for (const [area, expected] of Object.entries(expectedAreas)) check(areas[area as EnglishUsageArea] === expected, `${area}=${expected}`);

const difficulties = countBy(problems.map((problem) => problem.difficulty));
for (const [difficulty, expected] of Object.entries({ basic: 12, standard: 18, "ct-prep": 10 })) check(difficulties[difficulty as keyof typeof difficulties] === expected, `${difficulty}=${expected}`);

const expectedTypes: Record<EnglishUsageQuestionType, number> = {
  "single-choice": 24,
  "multiple-select": 4,
  "fill-blank": 6,
  matching: 3,
  ordering: 1,
  "dialogue-email": 2,
};
const types = countBy(problems.map((problem) => problem.questionType));
for (const [type, expected] of Object.entries(expectedTypes)) check(types[type as EnglishUsageQuestionType] === expected, `${type}=${expected}`);

const explanationParts = ["1. まず見る箇所：", "2. 文構造：", "3. 文脈上必要な意味：", "4. 正答表現の意味・語法：", "5. 正答を選ぶ理由：", "6. 全誤答を消す理由：", "7. 自然な日本語訳：", "8. 関連講座への復習導線："];
const ctParts = ["文章全体を読む必要", "空欄前後だけ", "選択肢を品詞", "保留", "読解問題"];
const forbidden = /TODO|TBD|placeholder|lorem|TOEIC|英検|センター試験|共通テスト第\d/i;

for (const problem of problems) {
  const label = problem.id;
  check(problem.slug === problem.id, `${label}: slug`);
  check(problem.subjectId === "english", `${label}: subjectId`);
  check(["vocab", "grammar"].includes(problem.unitId), `${label}: 既存unitId`);
  check(Boolean(problem.title && problem.statement && problem.questionType), `${label}: 基本metadata`);
  check(problem.choices.length === 4, `${label}: 4選択肢`);
  check(new Set(problem.choices.map((choice) => choice.text.toLowerCase())).size === 4, `${label}: 選択肢重複なし`);
  check(new Set(problem.correctChoiceIds).size === problem.correctChoiceIds.length && problem.correctChoiceIds.length > 0, `${label}: 正答集合が一意`);
  check(problem.correctChoiceIds.every((id) => problem.choices.some((choice) => choice.id === id)), `${label}: 正答が選択肢内`);
  check(problem.choices.every((choice) => choice.reason.startsWith(problem.correctChoiceIds.includes(choice.id) ? "正答：" : "誤答：")), `${label}: 全選択肢理由`);
  check(problem.choices.filter((choice) => !problem.correctChoiceIds.includes(choice.id)).every((choice) => Boolean(problem.distractorReasons[choice.id])), `${label}: 全誤答理由`);
  check(Boolean(problem.completedSentence) && !problem.completedSentence.includes("___"), `${label}: 正答英文`);
  check(/[ぁ-んァ-ヶ一-龠]/.test(problem.translationJa), `${label}: 日本語訳`);
  check(problem.detailedExplanation === problem.explanationJa, `${label}: explanationJa一致`);
  for (const part of explanationParts) check(problem.detailedExplanation.includes(part), `${label}: ${part}`);
  if (problem.difficulty === "ct-prep") for (const part of ctParts) check(problem.detailedExplanation.includes(part), `${label}: 共通テスト準備 ${part}`);
  check(Boolean(problem.strategy && problem.firstCheck && problem.verification && problem.commonMistake), `${label}: 解法metadata`);
  check(problem.relatedCourseIds.length > 0 && problem.relatedCourseIds.every((id) => id === "vocab" || id === "grammar"), `${label}: 関連講座解決`);
  check(problem.reviewTags.length >= 3 && problem.mistakeTags.length > 0, `${label}: 復習metadata`);
  check(problem.estimatedTime > 0, `${label}: 想定時間`);
  check(problem.copyrightStatus === "original" && problem.sourceType === "original", `${label}: 完全オリジナルmetadata`);
  check(problem.publicationStatus === "public", `${label}: public`);
  check(Boolean(problem.targetExpression && problem.targetSkill && problem.contextType && problem.grammarPoint && problem.vocabularyTags.length && problem.naturalnessNote), `${label}: 英語metadata`);
  check(!forbidden.test(JSON.stringify(problem)), `${label}: placeholder・外部転載表示なし`);
  if (problem.questionType === "multiple-select") {
    check(problem.correctChoiceIds.length === 2, `${label}: 複数選択正答2つ`);
    check(/TWO|two|2つ/.test(problem.statement) && /No partial credit|部分点なし/.test(problem.statement), `${label}: 正答数・部分点なし明記`);
  } else check(problem.correctChoiceIds.length === 1, `${label}: 単一採点正答`);
  if (problem.questionType === "fill-blank") {
    check(problem.statement.includes("___"), `${label}: 空欄あり`);
    const correctText = problem.choices.find((choice) => choice.id === problem.correctChoiceIds[0])?.text;
    check(Boolean(correctText && problem.completedSentence.toLowerCase().includes(correctText.toLowerCase())), `${label}: 正答代入英文`);
  }
  if (problem.questionType === "ordering") {
    check((problem.acceptedOrder?.length ?? 0) > 0 && new Set(problem.acceptedOrder).size === problem.acceptedOrder?.length, `${label}: 正答順一意`);
    check(/no extra words|不要語.*な/.test(problem.statement), `${label}: 不要語なし明記`);
    check(/Capitalization|大文字/.test(problem.statement) && /period|句点/.test(problem.statement), `${label}: 大文字・句読点条件`);
  }
}

const normalizedStatements = problems.map((problem) => problem.statement.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase());
check(new Set(normalizedStatements).size === 40, "新規40問内の完全重複なし");
check(problems.every((problem) => /[.!?]$/.test(problem.completedSentence)), "完成英文の文末記号");
check(problems.find((problem) => problem.id === "eng-usage-phrasal-02-result")?.completedSentence.includes("resulted from") ?? false, "result from検証");
check(problems.find((problem) => problem.id === "eng-usage-phrasal-02-result")?.completedSentence.includes("resulted in") ?? false, "result in検証");
check(problems.find((problem) => problem.id === "eng-usage-verb-02-remind-order")?.acceptedOrder?.join(" ") === "reminded us to bring our ID cards", "並べ替え独立検証");
check(problems.find((problem) => problem.id === "eng-usage-naa-03-nearly-enough")?.statement.includes("60-seat") ?? false, "定員資料あり");
check(60 - 56 === 4, "定員残数の独立再計算");

if (issues.length) {
  console.error(`英語語彙・語法40問専用QA: FAIL (${issues.length})`);
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}
console.log("英語語彙・語法40問専用QA: PASS（分類10/6/4/6/4/4/3/3、難易度12/18/10、形式24/4/6/3/1/2、metadata不足0）");
