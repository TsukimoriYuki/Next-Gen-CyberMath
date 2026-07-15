"use client";

import { useId, useState } from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type { InformaticsProblem } from "@/data/informatics/problem-types";
import { INFORMATICS_KIND_META } from "@/data/informatics/problem-types";
import { isCommonTestAnswerCorrect } from "@/lib/common-test-answer-normalize";

// 情報Ⅰ 演習問題の解答UI。
// 選択 → 答え合わせ → 全選択肢の理由と解説を表示、の流れを1画面で完結させる。

export function InformaticsProblemPractice({
  problem,
}: {
  problem: InformaticsProblem;
}) {
  const groupId = useId();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [numberAnswer, setNumberAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isMultiSelect = problem.kind === "multi-select";
  const isNumber = problem.kind === "number";
  const correctSet = new Set(problem.correctChoiceIds);
  const isCorrect =
    submitted &&
    (isNumber
      ? isCommonTestAnswerCorrect(numberAnswer, problem.correctNumber, "number")
      : selected.length === correctSet.size &&
        selected.every((id) => correctSet.has(id)));

  function toggleChoice(choiceId: string) {
    if (submitted) return;
    if (isMultiSelect) {
      setSelected((prev) =>
        prev.includes(choiceId)
          ? prev.filter((id) => id !== choiceId)
          : [...prev, choiceId],
      );
    } else {
      setSelected([choiceId]);
    }
  }

  function reset() {
    setSelected([]);
    setNumberAnswer("");
    setSubmitted(false);
  }

  return (
    <div>
      <fieldset disabled={submitted}>
        <legend className="text-sm font-medium text-slate-600">
          {INFORMATICS_KIND_META[problem.kind].instruction}
        </legend>
        {isNumber ? (
          <label className="mt-3 block max-w-sm text-sm font-semibold text-slate-800">
            数値を入力
            <input
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={numberAnswer}
              onChange={(event) => setNumberAnswer(event.target.value)}
              className="mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-950 shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </label>
        ) : (
        <div className="mt-3 space-y-2.5">
          {problem.choices.map((choice) => {
            const checked = selected.includes(choice.id);
            const showAsCorrect = submitted && correctSet.has(choice.id);
            const showAsWrongPick =
              submitted && checked && !correctSet.has(choice.id);
            return (
              <label
                key={choice.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border bg-white p-4 text-sm leading-6 shadow-sm transition-colors ${
                  showAsCorrect
                    ? "border-emerald-300 bg-emerald-50/60"
                    : showAsWrongPick
                      ? "border-rose-300 bg-rose-50/60"
                      : checked
                        ? "border-teal-400 bg-teal-50/40"
                        : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type={isMultiSelect ? "checkbox" : "radio"}
                  name={groupId}
                  value={choice.id}
                  checked={checked}
                  onChange={() => toggleChoice(choice.id)}
                  className="mt-1 h-4 w-4 shrink-0 accent-teal-700"
                />
                <span className="min-w-0">
                  <span className="font-medium text-slate-900">{choice.text}</span>
                  {submitted && (
                    <span className="mt-1.5 block text-slate-700">
                      <span
                        className={`mr-1.5 font-semibold ${
                          correctSet.has(choice.id)
                            ? "text-emerald-800"
                            : "text-rose-800"
                        }`}
                      >
                        {correctSet.has(choice.id) ? "正答" : "誤答"}：
                      </span>
                      {choice.reason}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
        )}
      </fieldset>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            className="button-primary"
            disabled={isNumber ? numberAnswer.trim().length === 0 : selected.length === 0}
            onClick={() => setSubmitted(true)}
          >
            答え合わせ
          </button>
        ) : (
          <button type="button" className="button-secondary" onClick={reset}>
            <RotateCcw className="mr-1.5 inline h-4 w-4" aria-hidden="true" />
            もう一度解く
          </button>
        )}
      </div>

      <div aria-live="polite">
        {submitted && (
          <div
            className={`mt-5 flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : "border-rose-200 bg-rose-50 text-rose-950"
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            )}
            <div>
              <p className="font-bold">
                {isCorrect ? "正解です" : "不正解です"}
              </p>
              {isNumber && (
                <p className="mt-1">正答：{problem.correctNumber}</p>
              )}
              {isMultiSelect && (
                <p className="mt-1">
                  正答：
                  {problem.choices
                    .filter((choice) => correctSet.has(choice.id))
                    .map((choice) => choice.text)
                    .join(" ／ ")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {submitted && (
        <section
          aria-label="解説"
          className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-950">解説</h2>
          <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
            {problem.explanation}
          </p>
          {problem.solutionProcess && (
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
              {problem.solutionProcess}
            </p>
          )}
          {isNumber && (
            <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
              <h3 className="font-bold text-slate-900">代表的な考え方</h3>
              {problem.choices.map((choice) => (
                <p key={choice.id} className="text-sm leading-6 text-slate-700">
                  <span className="font-semibold">{choice.text}：</span>{choice.reason}
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
