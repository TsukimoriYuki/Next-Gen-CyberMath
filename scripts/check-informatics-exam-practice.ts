import { INFORMATICS_1_COURSE_SUBJECT } from "../src/data/courses/informatics-1";
import {
  INFORMATICS_DIAGNOSTIC_DOMAINS,
  INFORMATICS_MISTAKE_CAUSES,
  INFORMATICS_SECTION_PRACTICES,
} from "../src/data/informatics/exam-practice";
import { scoreCommonTestMockExam } from "../src/lib/common-test-mock-scoring";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};

const lessons = INFORMATICS_1_COURSE_SUBJECT.units.flatMap((unit) => unit.lessons);
const lessonIds = new Set(lessons.map((lesson) => lesson.lessonId));
const ids = new Set<string>();
const slugs = new Set<string>();

check(INFORMATICS_SECTION_PRACTICES.length === 6, "大問別演習は6セット必要です");
check(INFORMATICS_DIAGNOSTIC_DOMAINS.length === 6, "診断領域は6個必要です");
check(INFORMATICS_MISTAKE_CAUSES.length === 10, "誤答原因は10個必要です");

for (const exam of INFORMATICS_SECTION_PRACTICES) {
  const label = `practice ${exam.id}`;
  const questions = exam.sections.flatMap((section) => section.questions);
  check(!ids.has(exam.id), `${label}: IDが重複しています`);
  ids.add(exam.id);
  const slug = exam.slug ?? exam.id;
  check(!slugs.has(slug), `${label}: slugが重複しています`);
  slugs.add(slug);
  check(exam.subject === "informatics", `${label}: subjectが不正です`);
  check(exam.durationMinutes >= 15 && exam.durationMinutes <= 25, `${label}: 時間は15〜25分です`);
  check(questions.length >= 4 && questions.length <= 6, `${label}: 設問数は4〜6問です`);
  check(exam.sections.reduce((sum, section) => sum + section.points, 0) === exam.totalPoints, `${label}: 配点合計が不一致です`);
  check(new Set(exam.sections.flatMap((section) => section.assets?.map((asset) => asset.type) ?? [])).size >= 2, `${label}: 資料形式が2種類未満です`);
  check(questions.some((question) => question.dependsOnPrevious), `${label}: 前問依存の誘導がありません`);

  const fullAnswers = Object.fromEntries(
    questions.map((question) => [question.id, question.answer]),
  );
  check(scoreCommonTestMockExam(exam, fullAnswers).totalScore === exam.totalPoints, `${label}: 全問正解で満点になりません`);

  for (const question of questions) {
    check(!ids.has(question.id), `${label}: question ID ${question.id} が重複しています`);
    ids.add(question.id);
    check(Boolean(question.answer), `${question.id}: 正答がありません`);
    check(Boolean(question.explanation.trim()), `${question.id}: 解説がありません`);
    check(question.points > 0, `${question.id}: 配点がありません`);
    check((question.diagnosticDomains?.length ?? 0) > 0, `${question.id}: 診断領域がありません`);
    check((question.mistakeCauseIds?.length ?? 0) > 0, `${question.id}: 誤答原因がありません`);
    check((question.reviewLinks?.length ?? 0) > 0, `${question.id}: 復習導線がありません`);
    for (const href of question.reviewLinks ?? []) {
      check(lessonIds.has(href.split("/").at(-1) ?? ""), `${question.id}: 対応講座が存在しません (${href})`);
    }
    for (const choice of question.choices ?? []) {
      if (!choice.isCorrect) check(Boolean(choice.trap?.trim()), `${question.id}: 誤答 ${choice.id} の理由がありません`);
    }
  }
}

check(
  INFORMATICS_SECTION_PRACTICES.flatMap((exam) => exam.sections.flatMap((section) => section.questions)).length === 30,
  "設問合計は30問必要です",
);

// 登録正答を参照しない独立計算。数値条件と擬似コードの規則を別実装で検算する。
function binaryToDecimal(bits: string) {
  return [...bits].reduce((value, bit) => value * 2 + Number(bit), 0);
}
function sumInclusive(start: number, end: number) {
  let total = 0;
  for (let value = start; value <= end; value += 1) total += value;
  return total;
}
const independent = new Map<string, string>([
  ["isp-dig-01", String(binaryToDecimal("101101"))],
  ["isp-dig-03", String((800 * 600 * 24) / 8)],
  ["isp-dig-04", String((8000 * 8 * 10) / 8)],
  ["isp-dig-05", String((((800 * 600 * 24) / 8) * 0.4 * 8) / 4_000_000)],
  ["isp-pro-01", String(5 * 3 + 2)],
  ["isp-pro-02", String(sumInclusive(1, 5))],
  ["isp-pro-05", String([6, 2, 6].reduce((score, value) => score + (value === 6 ? 2 : 1), 0))],
]);
for (const [questionId, expected] of independent) {
  const question = INFORMATICS_SECTION_PRACTICES.flatMap((exam) => exam.sections)
    .flatMap((section) => section.questions)
    .find((entry) => entry.id === questionId);
  check(String(question?.answer) === expected, `${questionId}: 独立検算 ${expected} と登録正答が一致しません`);
}

if (issues.length > 0) {
  console.error(issues.map((issue) => `- ${issue}`).join("\n"));
  process.exit(1);
}
console.log("✓ 情報Ⅰ 大問別演習: 6セット・30問・独立検算・復習導線 OK");
