import type {
  CommonTestAnswerFormat,
  CommonTestDrillQuestion,
} from "@/data/common-test-drills";

export function getCommonTestAnswerFormat(
  question: Pick<CommonTestDrillQuestion, "answerFormat" | "type">
): CommonTestAnswerFormat {
  if (question.answerFormat) return question.answerFormat;
  if (question.type === "blank-number") return "number";
  return "choice";
}

export function isCommonTestMarkSheetQuestion(
  question: Pick<CommonTestDrillQuestion, "answerFormat" | "subjectId" | "type">
): boolean {
  return (
    question.subjectId !== "english-reading" &&
    getCommonTestAnswerFormat(question) !== "choice"
  );
}

export function normalizeCommonTestAnswer(value: string): string {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[−‐‑‒–—―ー]/g, "-")
    .replace(/[　\s]/g, "")
    .replace(/[，,]/g, "")
    .trim();
}

function toComparable(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return normalizeCommonTestAnswer(String(value));
}

function exactChoiceMatch(
  selected: string | string[] | number | null | undefined,
  correct: string | string[] | number | null | undefined
): boolean {
  if (selected === null || selected === undefined) return false;
  if (correct === null || correct === undefined) return false;

  if (Array.isArray(correct)) {
    if (Array.isArray(selected)) {
      return (
        selected.length === correct.length &&
        selected.every((answer) => correct.includes(answer))
      );
    }
    return correct.includes(String(selected));
  }

  if (Array.isArray(selected)) return false;
  return String(selected) === String(correct);
}

const FINITE_DECIMAL_PATTERN = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/;

function toFiniteDecimal(value: string | number | null | undefined): number | null {
  const normalized = toComparable(value);
  if (!normalized || !FINITE_DECIMAL_PATTERN.test(normalized)) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function numericMatch(
  selected: string | string[] | number | null | undefined,
  correct: string | string[] | number | null | undefined,
): boolean {
  if (Array.isArray(selected)) return false;
  const selectedNumber = toFiniteDecimal(selected);
  if (selectedNumber === null) return false;

  const expectedAnswers = Array.isArray(correct) ? correct : [correct];
  return expectedAnswers.some((answer) => {
    const correctNumber = toFiniteDecimal(answer);
    return correctNumber !== null && selectedNumber === correctNumber;
  });
}

export function isCommonTestAnswerCorrect(
  selected: string | string[] | number | null | undefined,
  correct: string | string[] | number | null | undefined,
  answerFormat: CommonTestAnswerFormat = "choice"
): boolean {
  if (answerFormat === "choice") {
    return exactChoiceMatch(selected, correct);
  }

  if (answerFormat === "number") {
    return numericMatch(selected, correct);
  }

  const selectedValue = Array.isArray(selected)
    ? selected.map((v) => toComparable(v)).join("")
    : toComparable(selected);

  if (!selectedValue) return false;

  if (Array.isArray(correct)) {
    return correct.some((answer) => selectedValue === toComparable(answer));
  }

  return selectedValue === toComparable(correct);
}
