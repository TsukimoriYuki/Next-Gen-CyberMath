import type { ExamAnswerSlot, ExamPaper } from "@/data/exam-papers";

export type ExamPaperAnswers = Record<string, string>;
export type ExamPaperFlags = Record<string, boolean>;

export type ExamSlotResult = {
  slot: ExamAnswerSlot;
  selectedAnswer: string;
  isCorrect: boolean;
};

export type ExamSectionScore = {
  sectionId: string;
  title: string;
  score: number;
  maxScore: number;
  correctSlots: number;
  totalSlots: number;
};

export function normalizeExamPaperAnswer(value: string | null | undefined) {
  return String(value ?? "").trim();
}

export function scoreExamPaper(paper: ExamPaper, answers: ExamPaperAnswers) {
  const slotResults: ExamSlotResult[] = paper.answerSlots.map((slot) => {
    const selectedAnswer = normalizeExamPaperAnswer(answers[slot.id]);
    return {
      slot,
      selectedAnswer,
      isCorrect: selectedAnswer !== "" && selectedAnswer === slot.correctAnswer,
    };
  });

  const totalScore = slotResults.reduce(
    (sum, result) => sum + (result.isCorrect ? result.slot.score : 0),
    0,
  );

  const sectionScores: ExamSectionScore[] = paper.sections.map((section) => {
    const sectionSlotIds = new Set(section.answerSlotIds);
    const results = slotResults.filter((result) => sectionSlotIds.has(result.slot.id));
    return {
      sectionId: section.id,
      title: section.title,
      score: results.reduce(
        (sum, result) => sum + (result.isCorrect ? result.slot.score : 0),
        0,
      ),
      maxScore: results.reduce((sum, result) => sum + result.slot.score, 0),
      correctSlots: results.filter((result) => result.isCorrect).length,
      totalSlots: results.length,
    };
  });

  return {
    slotResults,
    sectionScores,
    totalScore,
    maxScore: paper.answerSlots.reduce((sum, slot) => sum + slot.score, 0),
    answeredCount: slotResults.filter((result) => result.selectedAnswer !== "").length,
    unansweredCount: slotResults.filter((result) => result.selectedAnswer === "").length,
    correctSlots: slotResults.filter((result) => result.isCorrect).length,
    totalSlots: slotResults.length,
  };
}
