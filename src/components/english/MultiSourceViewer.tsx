"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Database,
  List,
  FileText,
  Layers,
} from "lucide-react";
import type { MultiSourceProblem, SourceBlock } from "@/lib/english-types";
import { saveEnglishAttempt } from "@/lib/english-history";

// ── Source color palette ─────────────────────────────────────────────────

const SOURCE_PALETTE = [
  { label: "A", badge: "border-blue-200 bg-blue-50 text-blue-800", dot: "bg-blue-600" },
  { label: "B", badge: "border-amber-200 bg-amber-50 text-amber-800", dot: "bg-amber-600" },
  { label: "C", badge: "border-violet-200 bg-violet-50 text-violet-800", dot: "bg-violet-600" },
  { label: "D", badge: "border-emerald-200 bg-emerald-50 text-emerald-800", dot: "bg-emerald-600" },
  { label: "E", badge: "border-rose-200 bg-rose-50 text-rose-800", dot: "bg-rose-600" },
];

function getPalette(index: number) {
  return SOURCE_PALETTE[index % SOURCE_PALETTE.length];
}

// ── Sub-components ────────────────────────────────────────────────────────

function TableRenderer({ content }: { content: string[][] }) {
  if (content.length < 2) return null;
  const [headers, ...rows] = content;
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-max text-xs">
        <thead>
          <tr className="bg-blue-50">
            {headers.map((h, i) => (
              <th
                key={i}
                className={`whitespace-nowrap border-b border-slate-200 px-3 py-2.5 text-left font-semibold text-blue-900 ${
                  i < headers.length - 1 ? "border-r" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className={`whitespace-nowrap px-3 py-2.5 text-slate-700 ${
                    ci === 0 ? "font-medium text-slate-900" : ""
                  } ${ri < rows.length - 1 ? "border-b border-slate-200" : ""} ${
                    ci < row.length - 1 ? "border-r border-slate-200" : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TYPE_ICON = {
  TEXT:    FileText,
  TABLE:   Database,
  BULLETS: List,
} as const;

function SourceCard({ block, index }: { block: SourceBlock; index: number }) {
  const p = getPalette(index);
  const Icon = TYPE_ICON[block.type];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header bar */}
      <div className="flex items-center gap-2.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-bold ${p.badge}`}>
          {p.label}
        </span>
        <Icon className="h-4 w-4 text-slate-500" aria-hidden="true" />
        <span className="truncate text-xs font-medium text-slate-700">
          {block.title}
        </span>
      </div>

      {/* Content area */}
      <div className="p-4">
        {block.type === "TEXT" && (
          <div className="space-y-3">
            {block.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed text-slate-700"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        {block.type === "TABLE" && <TableRenderer content={block.content} />}

        {block.type === "BULLETS" && (
          <ul className="space-y-2">
            {block.content.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${p.dot}`} />
                <span className="text-sm leading-relaxed text-slate-700">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CrossRefBadge({ sourceRef }: { sourceRef: string }) {
  const match = sourceRef.match(/Source ([A-E])/);
  const idx = match ? match[1].charCodeAt(0) - 65 : 0;
  const p = getPalette(idx);
  return (
    <span className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold ${p.badge}`}>
      {sourceRef}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function MultiSourceViewer({ problem }: { problem: MultiSourceProblem }) {
  const [selected, setSelected] = useState<(number | null)[]>(() =>
    problem.questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [mobileTab, setMobileTab] = useState<"sources" | "questions">("sources");

  const answeredCount = selected.filter((s) => s !== null).length;
  const allAnswered = answeredCount === problem.questions.length;
  const score = submitted
    ? problem.questions.filter((q, i) => selected[i] === q.correctAnswerIndex).length
    : 0;

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setSelected((prev) => prev.map((s, i) => (i === qIdx ? optIdx : s)));
  };

  const handleRetry = () => {
    setSelected(problem.questions.map(() => null));
    setSubmitted(false);
  };

  const handleSubmit = () => {
    const score = problem.questions.filter(
      (q, i) => selected[i] === q.correctAnswerIndex,
    ).length;
    saveEnglishAttempt({
      problemId: problem.id,
      mode: "multi-source",
      level: problem.level,
      score,
      total: problem.questions.length,
    });
    setSubmitted(true);
  };

  const perfect = score === problem.questions.length;
  const passing = score >= Math.ceil(problem.questions.length / 2);
  const scoreTone = perfect
    ? {
        panel: "border-emerald-200 bg-emerald-50",
        score: "text-emerald-800",
      }
    : passing
      ? {
          panel: "border-amber-200 bg-amber-50",
          score: "text-amber-800",
        }
      : {
          panel: "border-rose-200 bg-rose-50",
          score: "text-rose-800",
        };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ── Mobile tab switcher (hidden on md+) ─────────────────────────── */}
      <div className="flex border-b border-slate-200 md:hidden" role="group" aria-label="表示する内容">
        <button
          type="button"
          onClick={() => setMobileTab("sources")}
          aria-pressed={mobileTab === "sources"}
          className={`min-h-11 flex-1 border-r border-slate-200 px-4 py-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 ${
            mobileTab === "sources"
              ? "bg-blue-50 text-blue-800"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          資料
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("questions")}
          aria-pressed={mobileTab === "questions"}
          className={`min-h-11 flex-1 px-4 py-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 ${
            mobileTab === "questions"
              ? "bg-blue-50 text-blue-800"
              : "bg-white text-slate-600 hover:bg-slate-50"
          }`}
        >
          設問
        </button>
      </div>

      <div className="grid md:grid-cols-2">
      {/* ── Left pane: Sources ──────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "sources" ? "" : "hidden"} h-[65vh] space-y-4 overflow-y-auto border-b border-slate-200 bg-white p-4 md:block md:h-[80vh] md:border-b-0 md:border-r md:p-5`}
        role="region"
        aria-label="資料"
      >
        <div className="flex items-center gap-2 pb-1">
          <Layers className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            Sources · 資料
          </span>
        </div>

        {problem.sources.map((block, i) => (
          <SourceCard key={block.id} block={block} index={i} />
        ))}
      </div>

      {/* ── Right pane: Questions ────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "questions" ? "" : "hidden"} h-[65vh] overflow-y-auto bg-slate-50 p-5 md:block md:h-[80vh] md:p-6`}
        role="region"
        aria-label="設問"
      >
        {/* Score summary */}
        {submitted && (
          <div className={`mb-6 rounded-xl border p-4 text-center ${scoreTone.panel}`}>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-slate-600">
              Result
            </p>
            <p className={`text-4xl font-extrabold ${scoreTone.score}`}>
              {score}
              <span className="text-xl text-slate-500"> / {problem.questions.length}</span>
            </p>
            <p className="mt-1 text-xs font-medium text-slate-700">
              {perfect ? "満点！" : passing ? "合格ライン突破" : "再挑戦してみよう"}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              もう一度
            </button>
          </div>
        )}

        {/* Question list */}
        <div className="space-y-8">
          {problem.questions.map((q, qIdx) => {
            const userAnswer = selected[qIdx];
            const isCorrect = submitted && userAnswer === q.correctAnswerIndex;

            return (
              <div key={qIdx}>
                {/* Question header */}
                <div className="flex items-start gap-2.5 mb-3">
                  {submitted &&
                    (isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" aria-hidden="true" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" aria-hidden="true" />
                    ))}
                  <div className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Q{qIdx + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-800">
                      {q.questionText}
                    </p>
                    {/* Cross-reference hints (always visible) */}
                    {q.crossReferences && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {q.crossReferences.map((ref) => (
                          <CrossRefBadge key={ref} sourceRef={ref} />
                        ))}
                        <span className="text-xs text-slate-600">を参照</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectOpt = optIdx === q.correctAnswerIndex;

                    let optionTone =
                      "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50";

                    if (!submitted) {
                      if (isSelected) {
                        optionTone = "border-blue-500 bg-blue-50 text-blue-900";
                      }
                    } else {
                      if (isCorrectOpt) {
                        optionTone = "border-emerald-500 bg-emerald-50 text-emerald-900";
                      } else if (isSelected) {
                        optionTone = "border-rose-500 bg-rose-50 text-rose-900";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelect(qIdx, optIdx)}
                        disabled={submitted}
                        className={`english-option flex min-h-11 w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-default ${optionTone}`}
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-current bg-white text-xs font-bold">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="min-w-0 flex-1 whitespace-normal break-words text-sm leading-relaxed">
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (after submission) */}
                {submitted && (
                  <div
                    className={`mt-3 rounded-xl border p-4 ${
                      isCorrect
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-rose-200 bg-rose-50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <p
                        className={`text-xs font-semibold uppercase tracking-widest ${
                          isCorrect ? "text-emerald-800" : "text-rose-800"
                        }`}
                      >
                        {isCorrect ? "✓ 正解" : "✗ 不正解"} · 解説
                      </p>
                      {q.crossReferences && (
                        <div className="flex flex-wrap gap-1">
                          {q.crossReferences.map((ref) => (
                            <CrossRefBadge key={ref} sourceRef={ref} />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                      {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit bar */}
        {!submitted && (
          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="mb-3 text-center text-xs font-medium text-slate-600">
              {answeredCount} / {problem.questions.length} 問 回答済み
            </p>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`min-h-11 w-full rounded-xl border px-4 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
                allAnswered
                  ? "border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
                  : "border-slate-200 bg-slate-100 text-slate-400"
              }`}
            >
              答え合わせをする
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
