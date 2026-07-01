import {
  COMMON_TEST_MATH_1A_MOCK_001,
  type CommonTestMockExam,
  type CommonTestQuestion,
} from "../src/data/common-test-mock-exams";
import {
  isCommonTestMockQuestionCorrect,
  scoreCommonTestMockExam,
  type CommonTestMockAnswers,
} from "../src/lib/common-test-mock-scoring";

const exam = COMMON_TEST_MATH_1A_MOCK_001;
const issues: string[] = [];

const ALLOWED_TAGS = new Set([
  "絶対値",
  "不等式",
  "条件整理",
  "平方完成",
  "二次式",
  "最小値",
  "集合",
  "必要十分条件",
  "反例選択",
  "反例",
  "命題",
  "整数",
  "二次関数",
  "頂点",
  "最大最小",
  "定義域",
  "グラフ読解",
  "データ読み取り",
  "外れ値",
  "相関",
  "データの解釈",
  "相関と因果",
  "選択肢消去",
  "余弦定理",
  "角度判定",
  "図形読解",
  "面積",
  "ヘロンの公式",
  "計算処理",
  "内接円",
  "前問利用",
  "接線の長さ",
  "線分比",
  "組合せ",
  "同様に確からしい",
  "場合の数",
  "確率",
  "場合分け",
  "条件付き確率",
  "母集団整理",
  "重複カウント",
  "余事象",
  "得点条件",
  "最大公約数",
  "互除法",
  "最小公倍数",
  "周期",
  "余り",
  "包除原理",
]);

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function allQuestions(mockExam: CommonTestMockExam) {
  return mockExam.sections.flatMap((section) => section.questions);
}

function buildPerfectAnswers(questions: CommonTestQuestion[]): CommonTestMockAnswers {
  const answers: CommonTestMockAnswers = {};
  for (const question of questions) answers[question.id] = question.answer;
  return answers;
}

function main() {
  const questions = allQuestions(exam);
  const blankLabels = new Set<string>();
  const questionIds = new Set<string>();

  check(exam.id === "common-test-math-1a-mock-001", "mock exam id should be stable and dedicated");
  check(exam.durationMinutes === 70, `duration should be 70, got ${exam.durationMinutes}`);
  check(exam.totalPoints === 100, `totalPoints should be 100, got ${exam.totalPoints}`);
  check(exam.targetAverage.min === 38 && exam.targetAverage.max === 45, "targetAverage should be 38-45");
  check(exam.sections.length === 5, `sections should be 5, got ${exam.sections.length}`);

  const sectionPointSum = exam.sections.reduce((sum, section) => sum + section.points, 0);
  const questionPointSum = questions.reduce((sum, question) => sum + question.points, 0);
  const estimatedMinutes = exam.sections.reduce((sum, section) => sum + section.estimatedMinutes, 0);
  check(sectionPointSum === 100, `section point sum should be 100, got ${sectionPointSum}`);
  check(questionPointSum === 100, `question point sum should be 100, got ${questionPointSum}`);
  check(estimatedMinutes >= 68 && estimatedMinutes <= 72, `estimated minutes should be near 70, got ${estimatedMinutes}`);

  const assetTypes = new Set(exam.sections.flatMap((section) => section.assets?.map((asset) => asset.type) ?? []));
  check(assetTypes.has("table"), "at least one table asset is required");
  check(assetTypes.has("diagram"), "at least one diagram asset is required");
  check(assetTypes.has("graph"), "at least one graph asset is required");
  check(assetTypes.has("conversation"), "at least one conversation asset is required");

  for (const section of exam.sections) {
    const sectionQuestionPoints = section.questions.reduce((sum, question) => sum + question.points, 0);
    check(section.leadText.trim().length >= 40, `${section.id} leadText is too short`);
    check(section.questions.length >= 2, `${section.id} should have at least 2 questions`);
    check(sectionQuestionPoints === section.points, `${section.id} question points ${sectionQuestionPoints} != section points ${section.points}`);
    check(section.theme.trim().length > 0, `${section.id} theme is missing`);

    for (const question of section.questions) {
      check(!questionIds.has(question.id), `duplicate question id ${question.id}`);
      questionIds.add(question.id);
      check(question.id.startsWith("m1a-mock-001-"), `question id should not reuse legacy ids: ${question.id}`);
      check(question.prompt.trim().length >= 25, `${question.id} prompt is too short`);
      check(question.points > 0, `${question.id} points should be positive`);
      check(question.explanation.trim().length >= 120, `${question.id} explanation is too short`);
      check(!!question.answer, `${question.id} answer is missing`);
      check(question.skillTags.length > 0, `${question.id} skillTags missing`);
      check(question.commonMistakes.length > 0, `${question.id} commonMistakes missing`);
      check((question.reviewLinks?.length ?? 0) > 0, `${question.id} reviewLinks missing`);
      check(question.measuredAbility.trim().length > 0, `${question.id} measuredAbility missing`);
      check(question.timeSavingTip.trim().length > 0, `${question.id} timeSavingTip missing`);

      for (const tag of question.skillTags) {
        check(ALLOWED_TAGS.has(tag), `${question.id} has out-of-scope or unknown tag "${tag}"`);
      }

      if (question.blanks) {
        for (const blank of question.blanks) {
          check(!blankLabels.has(blank.label), `duplicate blank label [${blank.label}]`);
          blankLabels.add(blank.label);
          check(blank.correctAnswer.trim().length > 0, `${question.id} blank ${blank.label} correctAnswer missing`);
        }
        const answerRecord = typeof question.answer === "object" && !Array.isArray(question.answer)
          ? question.answer
          : {};
        check(
          question.blanks.length === Object.keys(answerRecord).length,
          `${question.id} blank count and answer data count differ`,
        );
      }

      if (question.choices) {
        const correctChoices = question.choices.filter((choice) => choice.isCorrect);
        check(correctChoices.length > 0, `${question.id} choice question has no correct choice`);
        if (question.answerFormat === "choice") {
          check(correctChoices.length === 1, `${question.id} single choice should have exactly 1 correct choice`);
          check(correctChoices[0]?.id === question.answer, `${question.id} answer does not match correct choice id`);
        }
      }

      check(
        !/[ＤD]\+|EX|∞|math-2bc|math-3c/.test(`${question.prompt} ${question.explanation} ${question.skillTags.join(" ")}`),
        `${question.id} contains unsupported labels or out-of-scope subject text`,
      );
      check(!/\\\(|\\\)|\\\[|\\\]/.test(question.prompt), `${question.id} contains raw TeX delimiters`);
    }
  }

  const difficultyPoints = questions.reduce<Record<string, number>>((acc, question) => {
    acc[question.difficulty] = (acc[question.difficulty] ?? 0) + question.points;
    return acc;
  }, {});
  const approachable = (difficultyPoints.basic ?? 0) + (difficultyPoints.standard ?? 0);
  const hardSide =
    (difficultyPoints.hard ?? 0) +
    (difficultyPoints.trap ?? 0) +
    (difficultyPoints["time-consuming"] ?? 0);
  check(approachable >= 40 && approachable <= 50, `basic+standard points should be 40-50 for 38-45 average, got ${approachable}`);
  check(hardSide >= 50, `hard/trap/time-consuming points should be at least 50, got ${hardSide}`);

  for (const question of questions) {
    check(isCommonTestMockQuestionCorrect(question, question.answer), `${question.id} stored answer does not score correct`);
  }

  const perfect = scoreCommonTestMockExam(exam, buildPerfectAnswers(questions));
  check(perfect.totalScore === 100, `perfect score should be 100, got ${perfect.totalScore}`);
  check(perfect.unansweredCount === 0, `perfect unanswered should be 0, got ${perfect.unansweredCount}`);

  const empty = scoreCommonTestMockExam(exam, {});
  check(empty.totalScore === 0, `empty score should be 0, got ${empty.totalScore}`);
  check(empty.unansweredCount === questions.length, `empty unanswered should be ${questions.length}, got ${empty.unansweredCount}`);

  report(difficultyPoints);
}

function report(difficultyPoints: Record<string, number>) {
  if (issues.length > 0) {
    console.error(`common-test mock QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `common-test mock QA passed: ${exam.durationMinutes}min / ${exam.totalPoints}pt / ${exam.sections.length} sections / target average ${exam.targetAverage.min}-${exam.targetAverage.max}.`,
  );
  console.log(`difficulty points: ${JSON.stringify(difficultyPoints)}`);
}

main();
