import type {
  ElementaryAnswerResponse,
  ElementaryProblem,
  ElementaryProblemResult,
} from "@/types/elementary-problems";

// 小学生問題の採点ロジック（純粋関数）。
// registry を import しないため、client component からも安全に使える。

const FULLWIDTH_DIGIT_START = 0xff10;

/** 全角数字・記号を半角へ直し、整数または小数として解釈する。読めなければ null。 */
export function normalizeElementaryNumericInput(raw: string): number | null {
  const half = raw
    .trim()
    .replace(/[０-９]/g, (character) =>
      String.fromCharCode(character.charCodeAt(0) - FULLWIDTH_DIGIT_START + 0x30),
    )
    .replace(/[．。]/g, ".")
    .replace(/[－ー―−]/g, "-")
    .replace(/\s+/g, "");
  if (half.length === 0) return null;
  if (!/^-?\d+(?:\.\d+)?$/u.test(half)) return null;
  const value = Number(half);
  return Number.isFinite(value) ? value : null;
}

export function isElementaryAnswerCorrect(
  problem: ElementaryProblem,
  response: ElementaryAnswerResponse,
): boolean {
  const answer = problem.answer;
  if (answer.kind === "numeric-input") {
    if (response.kind !== "numeric") return false;
    const value = normalizeElementaryNumericInput(response.raw);
    if (value === null) return false;
    return Math.abs(value - answer.numeric.value) <= answer.numeric.tolerance;
  }
  if (response.kind !== "choice") return false;
  const selected = new Set(response.selectedChoiceIds);
  const correct = new Set(answer.correctChoiceIds);
  if (selected.size !== correct.size) return false;
  for (const id of selected) {
    if (!correct.has(id)) return false;
  }
  return true;
}

export function gradeElementaryAnswer(
  problem: ElementaryProblem,
  response: ElementaryAnswerResponse,
): ElementaryProblemResult {
  const answered =
    response.kind === "numeric"
      ? response.raw.trim().length > 0
      : response.selectedChoiceIds.length > 0;
  return {
    problemId: problem.id,
    answered,
    correct: answered && isElementaryAnswerCorrect(problem, response),
  };
}
