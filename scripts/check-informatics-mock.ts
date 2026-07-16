import { INFORMATICS_1_COURSE_SUBJECT } from "../src/data/courses/informatics-1";
import { INFORMATICS_MOCK_EXAM_001 } from "../src/data/informatics/mock-exam";
import {
  scoreCommonTestMockExam,
  scoreCommonTestMockQuestion,
} from "../src/lib/common-test-mock-scoring";
import {
  handleExamAttemptPost,
  validateExamAttemptPayload,
} from "../src/lib/exam-attempt-api";
import { isCommonTestAnswerCorrect } from "../src/lib/common-test-answer-normalize";
import { canAccessReviewItem } from "../src/lib/review-publication";

const issues: string[] = [];
const check = (condition: boolean, message: string) => {
  if (!condition) issues.push(message);
};
const exam = INFORMATICS_MOCK_EXAM_001;
const questions = exam.sections.flatMap((section) => section.questions);
const lessonIds = new Set(
  INFORMATICS_1_COURSE_SUBJECT.units.flatMap((unit) => unit.lessons).map((lesson) => lesson.lessonId),
);

check(exam.durationMinutes === 60, "模試は60分である必要があります");
check(exam.totalPoints === 100, "模試は100点である必要があります");
check(exam.sections.length === 4, "模試は4大問である必要があります");
check(JSON.stringify(exam.sections.map((section) => section.points)) === JSON.stringify([20, 25, 30, 25]), "大問配点は20/25/30/25です");
check(exam.sections.reduce((sum, section) => sum + section.points, 0) === 100, "大問配点合計が100点ではありません");
check(new Set(questions.map((question) => question.id)).size === questions.length, "模試設問IDが重複しています");

for (const question of questions) {
  check(Boolean(question.answer), `${question.id}: 正答がありません`);
  check(Boolean(question.explanation.trim()), `${question.id}: 解説がありません`);
  check((question.diagnosticDomains?.length ?? 0) > 0, `${question.id}: 診断領域がありません`);
  check((question.mistakeCauseIds?.length ?? 0) > 0, `${question.id}: 誤答原因がありません`);
  for (const choice of question.choices ?? []) {
    if (!choice.isCorrect) check(Boolean(choice.trap?.trim()), `${question.id}: 誤答理由がありません`);
  }
  for (const href of question.reviewLinks ?? []) {
    check(lessonIds.has(href.split("/").at(-1) ?? ""), `${question.id}: 対応講座が存在しません`);
  }
}

const fullAnswers = Object.fromEntries(questions.map((question) => [question.id, question.answer]));
check(scoreCommonTestMockExam(exam, fullAnswers).totalScore === 100, "全問正解で100点になりません");
check(scoreCommonTestMockExam(exam, {}).totalScore === 0, "全問空欄で0点になりません");
const grouped = questions.find((question) => question.id === "im3-03")!;
check(scoreCommonTestMockQuestion(grouped, { after0: "0", after2: "" }).earnedPoints === 5, "採点群の部分点5点が不正です");
check(isCommonTestAnswerCorrect("1.140", "1.14", "number"), "数値同値判定が模試で利用できません");
check(
  canAccessReviewItem(
    { itemType: "informatics-exam", itemId: "im1-01", subjectId: "informatics" },
    "test",
  ),
  "情報Ⅰ模試の誤答を既存復習キューへ登録できません",
);

// 登録正答とは独立した式による検算。
const independent = new Map<string, string>([
  ["im2-01", String((1000 * 600 * 24) / 8)],
  ["im2-02", String(((1000 * 600 * 24) / 8) * 0.5)],
  ["im2-03", String(((16000 * 16 * 30) / 8) * 0.25)],
  ["im2-04", String(((((1000 * 600 * 24) / 8) * 0.5 + ((16000 * 16 * 30) / 8) * 0.25) * 8) / 8_000_000)],
  ["im3-01", String([2, 0, 3, 1, 2].reduce((sum, value) => sum + value, 0))],
  ["im3-05", String([2, 0, 3, 1, 2].reduce((wait, arrivals) => Math.max(0, wait + arrivals - 3), 0))],
]);
for (const [id, expected] of independent) {
  check(String(questions.find((question) => question.id === id)?.answer) === expected, `${id}: 独立検算と登録正答が不一致です`);
}

const payload = {
  examId: exam.id,
  sessionId: "info-session-0001",
  durationSec: 1200,
  score: 999,
  maxScore: 999,
  weakTags: ["改ざん値"],
  answers: questions.map((question) =>
    question.blanks
      ? { questionId: question.id, blanks: question.blanks.map((blank) => ({ blankId: blank.id, value: blank.correctAnswer })) }
      : { questionId: question.id, value: question.answer },
  ),
};
check(validateExamAttemptPayload(payload, (id) => (id === exam.id ? exam : undefined)).ok, "正常な模試提出が検証を通りません");
async function main() {
  let persistedScore = -1;
  const response = await handleExamAttemptPost(
    new Request("http://local/api/exam/attempts", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": "127.0.0.1" }, body: JSON.stringify(payload) }),
    {
      getSession: async () => null,
      findExam: (id) => (id === exam.id ? exam : undefined),
      applyRateLimit: () => ({ ok: true, remaining: 5, retryAfter: 0 }),
      persistAttempt: async (data) => { persistedScore = data.score; return { id: "attempt-info-1" }; },
    },
  );
  check(response.ok, "サーバー採点の正常提出が失敗しました");
  check(persistedScore === 100, "改ざんscoreではなくサーバー再計算100点を保存する必要があります");

  if (issues.length) {
    console.error(issues.map((issue) => `- ${issue}`).join("\n"));
    process.exit(1);
  }
  console.log(`✓ 情報Ⅰ模試: 4大問・${questions.length}問・100点・部分点・独立検算・サーバー再採点 OK`);
}

void main();
