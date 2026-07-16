"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BookMarked, CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import type {
  InformaticsChartData,
  InformaticsProblem,
} from "@/data/informatics/problem-types";
import { INFORMATICS_KIND_META } from "@/data/informatics/problem-types";
import { isCommonTestAnswerCorrect } from "@/lib/common-test-answer-normalize";

// 情報Ⅰ 演習問題の解答UI。
// 選択 → 答え合わせ → 全選択肢の理由と解説を表示、の流れを1画面で完結させる。

function PracticeChart({ chart }: { chart: InformaticsChartData }) {
  if (chart.kind === "scatter") {
    const xs = chart.points.map((point) => point.x);
    const ys = chart.points.map((point) => point.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const scaleX = (value: number) => 36 + ((value - minX) / Math.max(maxX - minX, 1)) * 248;
    const scaleY = (value: number) => 144 - ((value - minY) / Math.max(maxY - minY, 1)) * 112;
    return (
      <figure aria-label={chart.title} className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
        <figcaption className="font-bold text-slate-900">{chart.title}</figcaption>
        <svg role="img" aria-label={`${chart.xLabel}と${chart.yLabel}の散布図`} viewBox="0 0 320 190" className="mt-3 h-auto w-full max-w-xl">
          <line x1="36" y1="144" x2="292" y2="144" stroke="currentColor" className="text-slate-500" />
          <line x1="36" y1="144" x2="36" y2="24" stroke="currentColor" className="text-slate-500" />
          {chart.points.map((point) => <circle key={point.label} cx={scaleX(point.x)} cy={scaleY(point.y)} r="5" className="fill-teal-600"><title>{point.label}: {point.x}, {point.y}</title></circle>)}
          <text x="164" y="178" textAnchor="middle" className="fill-slate-700 text-[11px]">{chart.xLabel}</text>
          <text x="12" y="84" textAnchor="middle" transform="rotate(-90 12 84)" className="fill-slate-700 text-[11px]">{chart.yLabel}</text>
        </svg>
        <ul className="sr-only">{chart.points.map((point) => <li key={point.label}>{point.label}: {chart.xLabel} {point.x}、{chart.yLabel} {point.y}</li>)}</ul>
      </figure>
    );
  }
  const baseline = chart.baseline ?? 0;
  const maximum = Math.max(...chart.values.map((value) => value.value - baseline));
  return (
    <figure aria-label={chart.title} className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
      <figcaption className="font-bold text-slate-900">{chart.title}</figcaption>
      <div className="mt-4 space-y-3">
        {chart.values.map((entry) => <div key={entry.label} className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 text-sm"><span className="text-slate-700">{entry.label}</span><span className="h-5 overflow-hidden rounded bg-slate-100"><span className="block h-full rounded bg-teal-600" style={{ width: `${maximum === 0 ? 0 : ((entry.value - baseline) / maximum) * 100}%` }} /></span><span className="font-semibold text-slate-900">{entry.value}{chart.unit}</span></div>)}
      </div>
      {chart.baseline != null && <p className="mt-3 text-xs text-slate-500">軸の開始値: {chart.baseline}{chart.unit}</p>}
    </figure>
  );
}

export function InformaticsProblemPractice({
  problem,
}: {
  problem: InformaticsProblem;
}) {
  const groupId = useId();
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [numberAnswer, setNumberAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviewState, setReviewState] = useState<
    "idle" | "saving" | "saved" | "login"
  >("idle");

  const isMultiSelect = problem.kind === "multi-select";
  const isNumber = problem.kind === "number";
  const correctSet = new Set(problem.correctChoiceIds);
  const numericValue = Number(numberAnswer.replace(/[０-９．－]/g, (character) => {
    if (character === "．") return ".";
    if (character === "－") return "-";
    return String(character.charCodeAt(0) - 0xff10);
  }));
  const numericAnswers = problem.acceptedNumericAnswers ??
    (problem.correctNumber == null ? [] : [problem.correctNumber]);
  const tolerance = problem.numericTolerance ?? 0;
  const isCorrect =
    submitted &&
    (isNumber
      ? numericAnswers.some(
          (answer) =>
            isCommonTestAnswerCorrect(numberAnswer, answer, "number") ||
            (Number.isFinite(numericValue) && Math.abs(numericValue - answer) <= tolerance),
        )
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
    setReviewState("idle");
  }

  async function addToReview() {
    setReviewState("saving");
    const response = await fetch("/api/review/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemType: "informatics-problem",
        itemId: problem.id,
        subjectId: "informatics",
        sectionId: problem.unitId ?? problem.lessonId,
        title: problem.title,
        source: "informatics-unit-practice",
        reasonFlags: [isCorrect ? "guessed-correct" : "wrong"],
        skillTags: problem.reviewTags,
      }),
    });
    setReviewState(
      response.status === 401 ? "login" : response.ok ? "saved" : "idle",
    );
  }

  return (
    <div>
      {problem.programCode && (
        <section aria-label="疑似コード" className="mb-5 rounded-xl border border-slate-200 bg-slate-950 p-4 text-slate-50">
          <h2 className="mb-2 text-sm font-bold text-teal-200">疑似コード</h2>
          <pre className="overflow-x-auto text-sm leading-7"><code>{problem.programCode}</code></pre>
          {problem.indexRule && <p className="mt-3 text-xs leading-5 text-slate-300">{problem.indexRule}</p>}
        </section>
      )}

      {problem.tableData && (
        <section aria-label="問題資料" className="mb-5">
          <div className="max-w-full overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full border-collapse bg-white text-left text-sm">
              <caption className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-left font-bold text-slate-900">
                {problem.tableData.caption}
              </caption>
              <thead>
                <tr>{problem.tableData.headers.map((header) => <th key={header} scope="col" className="whitespace-nowrap border-b border-slate-200 px-4 py-3 font-bold text-slate-800">{header}</th>)}</tr>
              </thead>
              <tbody>{problem.tableData.rows.map((row, rowIndex) => <tr key={`${problem.id}-row-${rowIndex}`} className="border-b border-slate-100 last:border-0">{row.map((cell, cellIndex) => <td key={`${problem.id}-${rowIndex}-${cellIndex}`} className="whitespace-nowrap px-4 py-3 text-slate-700">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>
          {problem.sourceNote && <p className="mt-2 text-xs leading-5 text-slate-500">{problem.sourceNote}</p>}
        </section>
      )}

      {problem.chartData && <PracticeChart chart={problem.chartData} />}

      {isNumber && (problem.answerUnit || problem.roundingRule) && (
        <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          解答条件：{problem.answerUnit ? `単位は${problem.answerUnit}。` : ""}{problem.roundingRule}
        </p>
      )}

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
                      {choice.reason.replace(/^(正答|誤り)：/, "")}
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
          {problem.detailedExplanation && problem.detailedExplanation !== problem.explanation && (
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
              {problem.detailedExplanation}
            </p>
          )}
          {problem.strategy && (
            <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
              <div className="rounded-lg bg-teal-50 p-3"><h3 className="font-bold text-teal-950">解く戦略</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.strategy}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><h3 className="font-bold text-slate-900">最初に見る箇所</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.firstCheck}</p></div>
              <div className="rounded-lg bg-emerald-50 p-3"><h3 className="font-bold text-emerald-950">検算・再確認</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.verification}</p></div>
              <div className="rounded-lg bg-rose-50 p-3"><h3 className="font-bold text-rose-950">よくある誤答</h3><p className="mt-1 text-sm leading-6 text-slate-700">{problem.commonMistake}</p></div>
            </div>
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
          <div className="mt-5 border-t border-slate-200 pt-4">
            <button
              type="button"
              onClick={addToReview}
              disabled={reviewState === "saving" || reviewState === "saved"}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-violet-300 bg-violet-50 px-4 py-2 font-bold text-violet-900 disabled:opacity-60"
            >
              <BookMarked className="h-4 w-4" aria-hidden="true" />
              {reviewState === "saved" ? "復習に登録済み" : reviewState === "saving" ? "登録中" : "復習に登録"}
            </button>
            {reviewState === "login" && <p className="mt-3 text-sm text-slate-700">復習登録には<Link href="/auth/login" className="font-bold text-teal-800 underline">ログイン</Link>が必要です。</p>}
          </div>
        </section>
      )}
    </div>
  );
}
