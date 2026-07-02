// 大問型演習（section-practice）のデータ整合性を検査する。
// npm run qa:section-practice
//
// 冊子型模試のQA（check-common-test-mock.ts）と同じ考え方で、
// 保存された答えが実際に正解として採点されるかをプログラム的に検証する。

import { existsSync } from "node:fs";
import { join } from "node:path";
import { SECTION_PRACTICE_EXAMS } from "../src/data/common-test/section-practice";
import type { CommonTestMockExam, CommonTestQuestion } from "../src/data/common-test-mock-exams";
import {
  isCommonTestMockQuestionCorrect,
  scoreCommonTestMockExam,
  type CommonTestMockAnswers,
} from "../src/lib/common-test-mock-scoring";
import { SPECIAL_LECTURES } from "../src/data/specialLectures";

const issues: string[] = [];
const root = process.cwd();

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}

function allQuestions(exam: CommonTestMockExam) {
  return exam.sections.flatMap((section) => section.questions);
}

function buildPerfectAnswers(questions: CommonTestQuestion[]): CommonTestMockAnswers {
  const answers: CommonTestMockAnswers = {};
  for (const question of questions) answers[question.id] = question.answer;
  return answers;
}

const LECTURE_SLUGS = new Set(SPECIAL_LECTURES.map((lecture) => lecture.slug));

function lectureRouteExists(href: string) {
  const [path] = href.split("#");
  if (!path.startsWith("/common-test/lectures/")) return false;
  const slug = path.replace("/common-test/lectures/", "");
  return LECTURE_SLUGS.has(slug);
}

function checkQuestion(question: CommonTestQuestion, blankIds: Set<string>) {
  check(/^prac-/.test(question.id), `${question.id} should use a section-practice id prefix (prac-...)`);
  check(question.prompt.trim().length > 15, `${question.id} prompt is too short`);
  check(question.explanation.includes("方針:"), `${question.id} explanation missing 方針`);
  check(question.explanation.includes("計算過程:"), `${question.id} explanation missing 計算過程`);
  check(question.explanation.includes("答え:"), `${question.id} explanation missing 答え`);
  check(question.explanation.includes("よくあるミス:"), `${question.id} explanation missing よくあるミス`);
  check(question.explanation.includes("時短ポイント:"), `${question.id} explanation missing 時短ポイント`);
  check(question.explanation.includes("復習リンク:"), `${question.id} explanation missing 復習リンク`);
  check((question.reviewLinks?.length ?? 0) > 0, `${question.id} reviewLinks missing`);
  for (const href of question.reviewLinks ?? []) {
    check(lectureRouteExists(href), `${question.id} reviewLink does not resolve to a real lecture: ${href}`);
  }
  check(!/\\\(|\\\)|\\\[|\\\]/.test(question.prompt), `${question.id} contains raw TeX delimiters`);

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
  }
}

function checkExam(exam: CommonTestMockExam) {
  const questions = allQuestions(exam);
  const blankIds = new Set<string>();

  check(exam.source === "manual-section-practice", `${exam.id} source should be manual-section-practice`);
  check(exam.status === "published", `${exam.id} should be published`);
  check(exam.sections.length === 1, `${exam.id} should have exactly 1 section (大問1問分), got ${exam.sections.length}`);
  check(!exam.pdfUrl, `${exam.id} should not have a pdfUrl (section practice has no PDF booklet)`);
  check((exam.lectureLinks?.length ?? 0) > 0, `${exam.id} lectureLinks missing`);
  for (const link of exam.lectureLinks ?? []) {
    check(lectureRouteExists(link.href), `${exam.id} lectureLinks entry does not resolve to a real lecture: ${link.href}`);
  }
  check(
    existsSync(join(root, `src/app/common-test/practice/[practiceId]/page.tsx`)),
    "section-practice route src/app/common-test/practice/[practiceId]/page.tsx is missing",
  );

  const sectionPointSum = exam.sections.reduce((sum, section) => sum + section.points, 0);
  const questionPointSum = questions.reduce((sum, question) => sum + question.points, 0);
  check(sectionPointSum === exam.totalPoints, `${exam.id} section point sum ${sectionPointSum} != totalPoints ${exam.totalPoints}`);
  check(questionPointSum === exam.totalPoints, `${exam.id} question point sum ${questionPointSum} != totalPoints ${exam.totalPoints}`);

  for (const section of exam.sections) {
    check(section.leadText.trim().length > 0, `${exam.id}/${section.id} leadText missing`);
    check(section.questions.length >= 3, `${exam.id}/${section.id} should have at least 3 guided sub-questions, got ${section.questions.length}`);
    const points = section.questions.reduce((sum, question) => sum + question.points, 0);
    check(points === section.points, `${exam.id}/${section.id} question points ${points} != section points ${section.points}`);
    for (const question of section.questions) checkQuestion(question, blankIds);
  }

  for (const question of questions) {
    check(isCommonTestMockQuestionCorrect(question, question.answer), `${question.id} stored answer does not score correct`);
  }

  const perfect = scoreCommonTestMockExam(exam, buildPerfectAnswers(questions));
  check(perfect.totalScore === exam.totalPoints, `${exam.id} perfect score should be ${exam.totalPoints}, got ${perfect.totalScore}`);
  check(perfect.unansweredCount === 0, `${exam.id} perfect unanswered should be 0, got ${perfect.unansweredCount}`);

  const empty = scoreCommonTestMockExam(exam, {});
  check(empty.totalScore === 0, `${exam.id} empty score should be 0, got ${empty.totalScore}`);
}

function main() {
  check(SECTION_PRACTICE_EXAMS.length === 8, `expected 8 section-practice exams, got ${SECTION_PRACTICE_EXAMS.length}`);

  const ids = new Set(SECTION_PRACTICE_EXAMS.map((exam) => exam.id));
  check(ids.size === SECTION_PRACTICE_EXAMS.length, "section-practice ids should be unique");

  for (const exam of SECTION_PRACTICE_EXAMS) checkExam(exam);

  report();
}

function report() {
  if (issues.length > 0) {
    console.error(`section-practice QA FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }
  console.log(`section-practice QA passed (${SECTION_PRACTICE_EXAMS.length} section-practice exams, all answers verified correct).`);
}

main();
