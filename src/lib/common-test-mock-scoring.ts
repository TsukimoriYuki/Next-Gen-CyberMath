import type {
  CommonTestMockExam,
  CommonTestQuestion,
  ExamBlank,
} from "@/data/common-test-mock-exams";

export type CommonTestMockAnswerValue = string | string[] | Record<string, string>;
export type CommonTestMockAnswers = Record<string, CommonTestMockAnswerValue | undefined>;
export type CommonTestMockFlags = Record<string, boolean>;

export type CommonTestMockQuestionResult = {
  question: CommonTestQuestion;
  selectedAnswer: CommonTestMockAnswerValue | undefined;
  isCorrect: boolean;
};

export type CommonTestMockSectionScore = {
  sectionId: string;
  title: string;
  score: number;
  maxScore: number;
  answeredCount: number;
  questionCount: number;
  weakTags: string[];
};

function normalize(value: string | number | null | undefined) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, "")
    .replace(/[０-９]/g, (ch) => String(ch.charCodeAt(0) - 0xff10))
    .replace(/−/g, "-");
}

function normalizeArray(value: string[] | string | undefined) {
  if (Array.isArray(value)) return value.map(normalize).filter(Boolean).sort();
  return normalize(value)
    .split(",")
    .map(normalize)
    .filter(Boolean)
    .sort();
}

export function getBlankAnswer(answer: CommonTestMockAnswerValue | undefined, blank: ExamBlank) {
  if (!answer || typeof answer !== "object" || Array.isArray(answer)) return "";
  return answer[blank.id] ?? "";
}

export function isCommonTestMockQuestionAnswered(
  question: CommonTestQuestion,
  answer: CommonTestMockAnswerValue | undefined,
) {
  if (question.blanks && question.blanks.length > 0) {
    return question.blanks.some((blank) => normalize(getBlankAnswer(answer, blank)) !== "");
  }
  if (Array.isArray(answer)) return answer.length > 0;
  if (typeof answer === "object") return false;
  return normalize(answer) !== "";
}

export function isCommonTestMockQuestionCorrect(
  question: CommonTestQuestion,
  answer: CommonTestMockAnswerValue | undefined,
) {
  if (!isCommonTestMockQuestionAnswered(question, answer)) return false;

  if (question.blanks && question.blanks.length > 0) {
    return question.blanks.every(
      (blank) => normalize(getBlankAnswer(answer, blank)) === normalize(blank.correctAnswer),
    );
  }

  if (question.answerFormat === "multi-choice") {
    const expected = normalizeArray(Array.isArray(question.answer) ? question.answer : []);
    const selected = normalizeArray(Array.isArray(answer) ? answer : []);
    return expected.length === selected.length && expected.every((v, i) => v === selected[i]);
  }

  return normalize(typeof answer === "string" ? answer : "") === normalize(String(question.answer));
}

export function scoreCommonTestMockExam(exam: CommonTestMockExam, answers: CommonTestMockAnswers) {
  const questionResults: CommonTestMockQuestionResult[] = exam.sections.flatMap((section) =>
    section.questions.map((question) => {
      const selectedAnswer = answers[question.id];
      return {
        question,
        selectedAnswer,
        isCorrect: isCommonTestMockQuestionCorrect(question, selectedAnswer),
      };
    }),
  );

  const sectionScores: CommonTestMockSectionScore[] = exam.sections.map((section) => {
    const results = section.questions.map((question) =>
      questionResults.find((result) => result.question.id === question.id)!,
    );
    const wrongOrBlank = results.filter((result) => !result.isCorrect);
    const weakTags = [
      ...new Set(wrongOrBlank.flatMap((result) => result.question.skillTags)),
    ].slice(0, 5);
    return {
      sectionId: section.id,
      title: section.title,
      score: results.reduce(
        (sum, result) => sum + (result.isCorrect ? result.question.points : 0),
        0,
      ),
      maxScore: section.points,
      answeredCount: results.filter((result) =>
        isCommonTestMockQuestionAnswered(result.question, result.selectedAnswer),
      ).length,
      questionCount: section.questions.length,
      weakTags,
    };
  });

  const totalScore = sectionScores.reduce((sum, section) => sum + section.score, 0);
  const totalQuestions = questionResults.length;
  const answeredCount = questionResults.filter((result) =>
    isCommonTestMockQuestionAnswered(result.question, result.selectedAnswer),
  ).length;
  const correctCount = questionResults.filter((result) => result.isCorrect).length;
  const weakTags = [
    ...new Set(
      questionResults
        .filter((result) => !result.isCorrect)
        .flatMap((result) => result.question.skillTags),
    ),
  ].slice(0, 8);

  return {
    questionResults,
    sectionScores,
    totalScore,
    maxScore: exam.totalPoints,
    answeredCount,
    unansweredCount: totalQuestions - answeredCount,
    correctCount,
    totalQuestions,
    weakTags,
  };
}
