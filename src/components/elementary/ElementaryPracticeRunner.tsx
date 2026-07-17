"use client";

import { useId, useMemo, useState } from "react";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import { gradeElementaryAnswer } from "@/lib/elementary-grade";
import type { ElementaryInlineContent } from "@/types/elementary-content";
import type {
  ElementaryProblem,
} from "@/types/elementary-problems";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryPractice.module.css";

type Attempt = Readonly<{
  selected: readonly string[];
  raw: string;
  checked: boolean;
  correct: boolean;
}>;

const EMPTY_ATTEMPT: Attempt = { selected: [], raw: "", checked: false, correct: false };

function correctChoiceIdSet(problem: ElementaryProblem): ReadonlySet<string> {
  return new Set(
    problem.answer.kind === "numeric-input" ? [] : problem.answer.correctChoiceIds,
  );
}

function AnswerResult({
  problem,
  attempt,
}: {
  problem: ElementaryProblem;
  attempt: Attempt;
}) {
  const correctChoices =
    problem.answer.kind === "numeric-input"
      ? []
      : problem.choices.filter((choice) =>
          correctChoiceIdSet(problem).has(choice.id),
        );
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${styles.result} ${attempt.correct ? styles.resultCorrect : styles.resultIncorrect}`}
    >
      <p className={styles.resultHead}>
        <span className={styles.resultMark} aria-hidden="true">
          {attempt.correct ? "○" : "×"}
        </span>
        <span>
          {attempt.correct
            ? elementaryUiCopy("practice-correct")
            : elementaryUiCopy("practice-incorrect")}
        </span>
      </p>

      <p className={styles.answerLabel}>
        {elementaryUiCopy("practice-correct-answer-label")}：
        {problem.answer.kind === "numeric-input" ? (
          <>
            {problem.answer.numeric.value}
            <ElementaryText content={problem.answer.numeric.unit} />
          </>
        ) : (
          correctChoices.map((choice, index) => (
            <span key={choice.id}>
              {index > 0 ? "、" : null}
              <ElementaryText content={choice.label} />
            </span>
          ))
        )}
      </p>

      <div className={styles.explainBlock}>
        <p className={styles.explainLabel}>{elementaryUiCopy("practice-explanation-label")}</p>
        <p className={styles.explainText}>
          <ElementaryText content={problem.explanation.detailed} />
        </p>
      </div>
      <div className={styles.explainBlock}>
        <p className={styles.explainLabel}>{elementaryUiCopy("practice-verification-label")}</p>
        <p className={styles.explainText}>
          <ElementaryText content={problem.explanation.verification} />
        </p>
      </div>
      <div className={styles.explainBlock}>
        <p className={styles.explainLabel}>{elementaryUiCopy("practice-common-mistake-label")}</p>
        <p className={styles.explainText}>
          <ElementaryText content={problem.explanation.commonMistake} />
        </p>
      </div>
    </div>
  );
}

function ProblemCard({
  problem,
  attempt,
  onToggleChoice,
  onNumericChange,
  onSubmit,
}: {
  problem: ElementaryProblem;
  attempt: Attempt;
  onToggleChoice: (choiceId: string) => void;
  onNumericChange: (raw: string) => void;
  onSubmit: () => void;
}) {
  const numericId = useId();
  const isMulti = problem.type === "multiple-choice";
  const isNumeric = problem.type === "numeric-input";
  const correctSet = correctChoiceIdSet(problem);
  const canSubmit = isNumeric
    ? attempt.raw.trim().length > 0
    : attempt.selected.length > 0;
  const instruction = isNumeric
    ? elementaryUiCopy("practice-numeric-instruction")
    : isMulti
      ? elementaryUiCopy("practice-multi-instruction")
      : elementaryUiCopy("practice-single-instruction");

  return (
    <div className={styles.card}>
      <p className={styles.problemTitle}>
        <ElementaryText content={problem.title} />
      </p>
      <p className={styles.prompt}>
        <ElementaryText content={problem.prompt} />
      </p>
      <p className={styles.instruction}>{instruction}</p>

      <fieldset disabled={attempt.checked} style={{ border: 0, margin: 0, padding: 0 }}>
        {isNumeric ? (
          <div className={styles.numericRow}>
            <label className={styles.numericLabel} htmlFor={numericId}>
              {elementaryUiCopy("practice-numeric-label")}
            </label>
            <input
              id={numericId}
              className={styles.numericInput}
              inputMode="numeric"
              type="text"
              value={attempt.raw}
              onChange={(event) => onNumericChange(event.target.value)}
            />
            {problem.answer.kind === "numeric-input" ? (
              <span className={styles.numericUnit}>
                <ElementaryText content={problem.answer.numeric.unit} />
              </span>
            ) : null}
          </div>
        ) : (
          <ul className={styles.choiceList}>
            {problem.choices.map((choice) => {
              const selected = attempt.selected.includes(choice.id);
              const showCorrect = attempt.checked && correctSet.has(choice.id);
              const showWrong = attempt.checked && selected && !correctSet.has(choice.id);
              return (
                <li key={choice.id}>
                  <label
                    className={`${styles.choice} ${showCorrect ? styles.choiceCorrect : ""} ${showWrong ? styles.choiceWrongPick : ""}`}
                  >
                    <input
                      className={styles.choiceInput}
                      type={isMulti ? "checkbox" : "radio"}
                      name={problem.id}
                      value={choice.id}
                      checked={selected}
                      onChange={() => onToggleChoice(choice.id)}
                    />
                    <span>
                      <ElementaryText content={choice.label} />
                      {attempt.checked ? (
                        <span className={styles.choiceReason}>
                          <ElementaryText content={choice.reason} />
                        </span>
                      ) : null}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </fieldset>

      {!attempt.checked ? (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.buttonPrimary}
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {elementaryUiCopy("practice-submit")}
          </button>
        </div>
      ) : (
        <AnswerResult problem={problem} attempt={attempt} />
      )}

      <details className={styles.hint}>
        <summary>{elementaryUiCopy("practice-hint-show")}</summary>
        <p className={styles.hintText}>
          <ElementaryText content={problem.hint} />
        </p>
      </details>
    </div>
  );
}

function Summary({
  problems,
  attempts,
  completionMessage,
  minimumScoreMessage,
  onRetryWrong,
  onRestart,
}: {
  problems: readonly ElementaryProblem[];
  attempts: Record<string, Attempt>;
  completionMessage?: ElementaryInlineContent;
  minimumScoreMessage?: ElementaryInlineContent;
  onRetryWrong: () => void;
  onRestart: () => void;
}) {
  const correct = problems.filter((problem) => attempts[problem.id]?.correct).length;
  const total = problems.length;
  const hasWrong = correct < total;
  const message = hasWrong ? minimumScoreMessage : completionMessage;
  return (
    <div className={styles.summary}>
      <p className={styles.summaryScore}>
        {total}
        {elementaryUiCopy("practice-summary-of")} {correct}
        {elementaryUiCopy("practice-summary-unit")}
      </p>
      {message ? (
        <p className={styles.summaryMessage}>
          <ElementaryText content={message} />
        </p>
      ) : null}
      <ul className={styles.summaryList}>
        {problems.map((problem, index) => {
          const solved = attempts[problem.id]?.correct;
          return (
            <li key={problem.id} className={styles.summaryItem}>
              <span aria-hidden="true">{solved ? "○" : "×"}</span>
              <span>
                {elementaryUiCopy("practice-problem-label")} {index + 1}：
                <ElementaryText content={problem.title} />
              </span>
            </li>
          );
        })}
      </ul>
      <div className={styles.actions}>
        {hasWrong ? (
          <button type="button" className={styles.buttonSecondary} onClick={onRetryWrong}>
            {elementaryUiCopy("practice-retry-wrong")}
          </button>
        ) : null}
        <button type="button" className={styles.buttonSecondary} onClick={onRestart}>
          {elementaryUiCopy("practice-restart")}
        </button>
      </div>
    </div>
  );
}

export function ElementaryPracticeRunner({
  problems,
  completionMessage,
  minimumScoreMessage,
}: {
  problems: readonly ElementaryProblem[];
  completionMessage?: ElementaryInlineContent;
  minimumScoreMessage?: ElementaryInlineContent;
}) {
  const problemById = useMemo(
    () => new Map(problems.map((problem) => [problem.id, problem] as const)),
    [problems],
  );
  const [activeIds, setActiveIds] = useState<readonly string[]>(
    problems.map((problem) => problem.id),
  );
  const [cursor, setCursor] = useState(0);
  const [phase, setPhase] = useState<"solving" | "summary">("solving");
  const [attempts, setAttempts] = useState<Record<string, Attempt>>({});

  const activeProblems = activeIds
    .map((id) => problemById.get(id))
    .filter((problem): problem is ElementaryProblem => problem !== undefined);
  const current = activeProblems[cursor];
  const currentAttempt = current ? (attempts[current.id] ?? EMPTY_ATTEMPT) : EMPTY_ATTEMPT;

  function updateAttempt(problemId: string, next: Partial<Attempt>) {
    setAttempts((prev) => ({
      ...prev,
      [problemId]: { ...(prev[problemId] ?? EMPTY_ATTEMPT), ...next },
    }));
  }

  function toggleChoice(choiceId: string) {
    if (!current || currentAttempt.checked) return;
    const isMulti = current.type === "multiple-choice";
    const selected = isMulti
      ? currentAttempt.selected.includes(choiceId)
        ? currentAttempt.selected.filter((id) => id !== choiceId)
        : [...currentAttempt.selected, choiceId]
      : [choiceId];
    updateAttempt(current.id, { selected });
  }

  function submit() {
    if (!current) return;
    const response =
      current.type === "numeric-input"
        ? ({ kind: "numeric", raw: currentAttempt.raw } as const)
        : ({ kind: "choice", selectedChoiceIds: currentAttempt.selected } as const);
    const result = gradeElementaryAnswer(current, response);
    updateAttempt(current.id, { checked: true, correct: result.correct });
  }

  function goPrev() {
    setCursor((value) => Math.max(0, value - 1));
  }

  function goNext() {
    if (cursor >= activeProblems.length - 1) {
      setPhase("summary");
      return;
    }
    setCursor((value) => value + 1);
  }

  function retryWrong() {
    const wrongIds = activeProblems
      .filter((problem) => !attempts[problem.id]?.correct)
      .map((problem) => problem.id);
    setAttempts((prev) => {
      const next = { ...prev };
      for (const id of wrongIds) delete next[id];
      return next;
    });
    setActiveIds(wrongIds);
    setCursor(0);
    setPhase("solving");
  }

  function restart() {
    setAttempts({});
    setActiveIds(problems.map((problem) => problem.id));
    setCursor(0);
    setPhase("solving");
  }

  if (phase === "summary") {
    return (
      <section
        aria-label={elementaryUiCopy("practice-group-label")}
        className={styles.practice}
      >
        <h3 className={styles.progress}>{elementaryUiCopy("practice-summary-title")}</h3>
        <Summary
          problems={activeProblems}
          attempts={attempts}
          completionMessage={completionMessage}
          minimumScoreMessage={minimumScoreMessage}
          onRetryWrong={retryWrong}
          onRestart={restart}
        />
      </section>
    );
  }

  if (!current) return null;

  const total = activeProblems.length;
  const percent = Math.round(((cursor + 1) / total) * 100);
  const isLast = cursor >= total - 1;

  return (
    <section
      aria-label={elementaryUiCopy("practice-group-label")}
      className={styles.practice}
    >
      <p className={styles.progress}>
        {elementaryUiCopy("practice-problem-label")} {cursor + 1} / {total}
      </p>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-label={elementaryUiCopy("practice-progress-aria")}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={cursor + 1}
      >
        <span className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>

      <ProblemCard
        key={current.id}
        problem={current}
        attempt={currentAttempt}
        onToggleChoice={toggleChoice}
        onNumericChange={(raw) => updateAttempt(current.id, { raw })}
        onSubmit={submit}
      />

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.buttonSecondary}
          onClick={goPrev}
          disabled={cursor === 0}
        >
          {elementaryUiCopy("practice-prev")}
        </button>
        <button type="button" className={styles.buttonPrimary} onClick={goNext}>
          {isLast ? elementaryUiCopy("practice-see-result") : elementaryUiCopy("practice-next")}
        </button>
      </div>
    </section>
  );
}
