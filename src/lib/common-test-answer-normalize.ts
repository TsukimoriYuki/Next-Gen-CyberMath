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

export function isCommonTestAnswerCorrect(
  selected: string | string[] | number | null | undefined,
  correct: string | string[] | number | null | undefined,
  answerFormat: CommonTestAnswerFormat = "choice"
): boolean {
  if (answerFormat === "choice") {
    return exactChoiceMatch(selected, correct);
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
