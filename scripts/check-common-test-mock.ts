import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  COMMON_TEST_MATH_1A_AI_PROTOTYPE_001,
  COMMON_TEST_MATH_1A_MOCK_001,
  COMMON_TEST_MOCK_EXAMS,
  getPublicCommonTestMockExams,
  type CommonTestMockExam,
  type CommonTestQuestion,
} from "../src/data/common-test-mock-exams";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "../src/data/common-test/manual-mocks/math1a-001";
import { COMMON_TEST_MATH_1A_MANUAL_002 } from "../src/data/common-test/manual-mocks/math1a-002";
import {
  isCommonTestMockQuestionCorrect,
  scoreCommonTestMockExam,
  type CommonTestMockAnswers,
} from "../src/lib/common-test-mock-scoring";

const issues: string[] = [];
const root = process.cwd();
const publicManualExams = [
  COMMON_TEST_MATH_1A_MANUAL_001,
  COMMON_TEST_MATH_1A_MANUAL_002,
];

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

function routeExists(href: string) {
  if (href.startsWith("/courses/math-1a/")) {
    return existsSync(join(root, "src/app/courses/[subjectId]/[unitId]/page.tsx"));
  }
  if (href.startsWith("/common-test/simulator/")) {
    const slug = href.split("/").pop();
    return !!slug && existsSync(join(root, `src/app/common-test/simulator/${slug}/page.tsx`));
  }
  if (href.startsWith("/common-test/lectures/")) {
    return existsSync(join(root, "src/app/common-test/lectures/[slug]/page.tsx"));
  }
  return existsSync(join(root, `src/app${href}/page.tsx`));
}

function checkQuestion(question: CommonTestQuestion, blankIds: Set<string>) {
  check(/^m1a-manual-00[12]-/.test(question.id), `${question.id} should use a manual mock id prefix`);
  check(question.prompt.trim().length > 30, `${question.id} prompt is too short`);
  check(question.explanation.includes("方針:"), `${question.id} explanation missing 方針`);
  check(question.explanation.includes("計算過程:"), `${question.id} explanation missing 計算過程`);
  check(question.explanation.includes("答え:"), `${question.id} explanation missing 答え`);
  check(question.explanation.includes("よくあるミス:"), `${question.id} explanation missing よくあるミス`);
  check(question.explanation.includes("時短ポイント:"), `${question.id} explanation missing 時短ポイント`);
  check(question.explanation.includes("復習リンク:"), `${question.id} explanation missing 復習リンク`);
  check((question.reviewLinks?.length ?? 0) > 0, `${question.id} reviewLinks missing`);
  for (const href of question.reviewLinks ?? []) {
    check(routeExists(href), `${question.id} reviewLink does not resolve to a known route: ${href}`);
  }
  check(!/\\\(|\\\)|\\\[|\\\]/.test(question.prompt), `${question.id} contains raw TeX delimiters`);
  check(!question.prompt.includes("0 5 x 5 4"), `${question.id} contains broken 0≦x≦4 text`);

  if (question.blanks) {
    const answerRecord =
      typeof question.answer === "object" && !Array.isArray(question.answer) ? question.answer : {};
    check(
      question.blanks.length === Object.keys(answerRecord).length,
      `${question.id} blank count and answer key count differ`,
    );
    for (const blank of question.blanks) {
      check(!blankIds.has(blank.id), `duplicate blank id ${blank.id}`);
      blankIds.add(blank.id);
      check(blank.label.trim().length > 0, `${question.id} has empty blank label`);
      check(answerRecord[blank.id] === blank.correctAnswer, `${question.id} answer data mismatch for [${blank.label}]`);
      if (blank.label.length > 1) {
        check(blank.id in answerRecord, `${question.id} multi-character blank [${blank.label}] is not one answer slot`);
      }
    }
  }

  if (question.choices) {
    const correctChoices = question.choices.filter((choice) => choice.isCorrect);
    check(correctChoices.length > 0, `${question.id} has no correct choice`);
    for (const choice of question.choices) {
      check(choice.id === choice.label, `${question.id} choice id and label differ for ${choice.label}`);
    }
    if (question.answerFormat === "choice") {
      check(correctChoices.length === 1, `${question.id} single choice should have exactly one correct choice`);
      check(question.answer === correctChoices[0]?.id, `${question.id} choice answer does not match correct choice`);
    }
    if (question.answerFormat === "multi-choice") {
      check(Array.isArray(question.answer), `${question.id} multi-choice answer should be an array`);
      check(
        JSON.stringify([...(question.answer as string[])].sort()) ===
          JSON.stringify(correctChoices.map((choice) => choice.id).sort()),
        `${question.id} multi-choice answer does not match correct choices`,
      );
    }
  }
}

function checkExam(exam: CommonTestMockExam) {
  const questions = allQuestions(exam);
  const blankIds = new Set<string>();

  check(exam.source === "manual-pdf", `${exam.id} source should be manual-pdf`);
  check(exam.status === "published", `${exam.id} should be published`);
  check(exam.durationMinutes === 70, `${exam.id} duration should be 70, got ${exam.durationMinutes}`);
  check(exam.totalPoints === 100, `${exam.id} totalPoints should be 100, got ${exam.totalPoints}`);
  check(exam.sections.length === 4, `${exam.id} sections should be 4, got ${exam.sections.length}`);
  check(
    exam.sections.map((section) => section.points).join(",") === "30,30,20,20",
    `${exam.id} section points should be 30,30,20,20, got ${exam.sections.map((section) => section.points).join(",")}`,
  );

  const sectionPointSum = exam.sections.reduce((sum, section) => sum + section.points, 0);
  const questionPointSum = questions.reduce((sum, question) => sum + question.points, 0);
  check(sectionPointSum === 100, `${exam.id} section point sum should be 100, got ${sectionPointSum}`);
  check(questionPointSum === 100, `${exam.id} question point sum should be 100, got ${questionPointSum}`);
  check(typeof exam.pdfUrl === "string" && exam.pdfUrl.length > 0, `${exam.id} pdfUrl missing`);
  if (exam.pdfUrl) {
    check(
      existsSync(join(root, "public", exam.pdfUrl.replace(/^\//, ""))),
      `${exam.id} pdfUrl points to a missing file: ${exam.pdfUrl}`,
    );
  }

  for (const section of exam.sections) {
    check(section.leadText.trim().length > 0, `${exam.id}/${section.id} leadText missing`);
    check(section.questions.length > 0, `${exam.id}/${section.id} questions missing`);
    const points = section.questions.reduce((sum, question) => sum + question.points, 0);
    check(points === section.points, `${exam.id}/${section.id} question points ${points} != section points ${section.points}`);
    for (const asset of section.assets ?? []) {
      if (asset.type === "diagram") check(asset.alt.trim().length > 0, `${asset.id} diagram alt missing`);
    }
    for (const question of section.questions) checkQuestion(question, blankIds);
  }

  for (const question of questions) {
    check(isCommonTestMockQuestionCorrect(question, question.answer), `${question.id} stored answer does not score correct`);
  }

  const perfect = scoreCommonTestMockExam(exam, buildPerfectAnswers(questions));
  check(perfect.totalScore === 100, `${exam.id} perfect score should be 100, got ${perfect.totalScore}`);
  check(perfect.unansweredCount === 0, `${exam.id} perfect unanswered should be 0, got ${perfect.unansweredCount}`);

  const empty = scoreCommonTestMockExam(exam, {});
  check(empty.totalScore === 0, `${exam.id} empty score should be 0, got ${empty.totalScore}`);
  check(empty.unansweredCount === questions.length, `${exam.id} empty unanswered should be ${questions.length}, got ${empty.unansweredCount}`);
}

function main() {
  for (const exam of publicManualExams) checkExam(exam);

  check(COMMON_TEST_MATH_1A_MOCK_001.id === COMMON_TEST_MATH_1A_MANUAL_001.id, "public mock alias should point to manual PDF version 001");

  const publicMocks = getPublicCommonTestMockExams();
  check(
    publicMocks.map((exam) => exam.id).join(",") ===
      "common-test-math-1a-manual-001,common-test-math-1a-manual-002",
    `public mock order should be manual 001 then 002, got ${publicMocks.map((exam) => exam.id).join(",")}`,
  );
  check(!publicMocks.some((item) => item.id === "common-test-math-1a-mock-001"), "AI prototype should not be public");
  check(COMMON_TEST_MOCK_EXAMS.length === 2, "public mock registry should contain the two manual PDF mocks");
  check(COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.status === "draft", "AI prototype should be draft");
  check(COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.devOnly === true, "AI prototype should be devOnly");

  const ids = new Set(COMMON_TEST_MOCK_EXAMS.map((exam) => exam.id));
  check(ids.size === COMMON_TEST_MOCK_EXAMS.length, "public mock ids should be unique");
  const pdfUrls = new Set(COMMON_TEST_MOCK_EXAMS.map((exam) => exam.pdfUrl));
  check(pdfUrls.size === COMMON_TEST_MOCK_EXAMS.length, "public mock pdfUrls should be unique");

  const mock001Multi = allQuestions(COMMON_TEST_MATH_1A_MANUAL_001).find(
    (question) => question.id === "m1a-manual-001-s4-multi",
  );
  check(!!mock001Multi, "manual 001 multi-choice question [ヒ] missing");
  if (mock001Multi) {
    check(isCommonTestMockQuestionCorrect(mock001Multi, ["1", "2", "3", "4"]), "[ヒ] correct set should score correct");
    check(!isCommonTestMockQuestionCorrect(mock001Multi, ["0", "1", "2", "3", "4"]), "[ヒ] with option 0 should score wrong");
    check(!isCommonTestMockQuestionCorrect(mock001Multi, ["1", "2", "3", "4", "5"]), "[ヒ] with option 5 should score wrong");
  }

  const mock002Fractions = allQuestions(COMMON_TEST_MATH_1A_MANUAL_002).find(
    (question) => question.id === "m1a-manual-002-s4-probabilities",
  );
  check(!!mock002Fractions, "manual 002 fraction probability question missing");
  if (mock002Fractions && typeof mock002Fractions.answer === "object" && !Array.isArray(mock002Fractions.answer)) {
    check(isCommonTestMockQuestionCorrect(mock002Fractions, mock002Fractions.answer), "manual 002 fraction answers should score correct");
    check(
      !isCommonTestMockQuestionCorrect(mock002Fractions, {
        ...mock002Fractions.answer,
        "m1a-manual-002-s4-probabilities-ス": "4",
      }),
      "manual 002 wrong fraction denominator should score wrong",
    );
  }

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`manual common-test mock QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log("manual common-test mock QA passed: two PDF-source math-1a mocks / 70min / 100pt / 4 sections.");
}

main();
