"use client";

import { useState } from "react";
import {
  BookOpen,
  Brain,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { ComprehensionProblem, SyntaxRole, SyntaxBlock } from "@/lib/english-types";
import { saveEnglishAttempt } from "@/lib/english-history";

// ── Syntax role color palette ─────────────────────────────────────────────

const SYNTAX_COLORS: Record<SyntaxRole, { bg: string; text: string; border: string }> = {
  S: { bg: "#eff6ff", text: "#1d4ed8", border: "#bfdbfe" },
  V: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" },
  O: { bg: "#fffbeb", text: "#b45309", border: "#fde68a" },
  C: { bg: "#fff1f2", text: "#be123c", border: "#fecdd3" },
  M: { bg: "#f5f3ff", text: "#6d28d9", border: "#ddd6fe" },
  NONE: { bg: "transparent", text: "#475569", border: "transparent" },
};

const SYNTAX_LABELS: Record<SyntaxRole, string> = {
  S: "主語 Subject",
  V: "動詞 Verb",
  O: "目的語 Object",
  C: "補語 Complement",
  M: "修飾語 Modifier",
  NONE: "",
};

// ── Sub-components ────────────────────────────────────────────────────────

function SyntaxVisualizer({ blocks }: { blocks: SyntaxBlock[] }) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="mb-4 text-xs font-semibold text-slate-600">
        構文解析 / Syntax Breakdown
      </p>

      {blocks.map((block, i) => {
        if (block.role === "NONE") {
          return (
            <p key={i} className="text-xs italic text-slate-600">
              {block.text}
            </p>
          );
        }
        const c = SYNTAX_COLORS[block.role];
        return (
          <div key={i} className="flex items-start gap-3">
            {/* Role badge */}
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold"
              style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}
            >
              {block.role}
            </span>
            {/* Text + translation */}
            <div className="flex-1 min-w-0">
              <p
                className="rounded px-2.5 py-1.5 text-sm font-medium leading-relaxed"
                style={{
                  background: c.bg,
                  color: c.text,
                  border: `1px solid ${c.border}`,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                }}
              >
                {block.text}
              </p>
              {block.translation && (
                <p className="mt-1 pl-1 text-xs leading-relaxed text-slate-600">
                  {block.translation}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-slate-200 pt-3">
        {(["S", "V", "O", "C", "M"] as SyntaxRole[]).map((role) => {
          const c = SYNTAX_COLORS[role];
          return (
            <span key={role} className="flex items-center gap-1.5 text-xs">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              />
              <span style={{ color: c.text }}>{role}</span>
              <span className="text-slate-600">= {SYNTAX_LABELS[role]}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function ComprehensionViewer({ problem }: { problem: ComprehensionProblem }) {
  const [selected, setSelected] = useState<(number | null)[]>(() =>
    problem.questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [showSyntax, setShowSyntax] = useState<Record<number, boolean>>({});
  const [mobileTab, setMobileTab] = useState<"passage" | "questions">("passage");

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
    setShowSyntax({});
  };

  const handleSubmit = () => {
    const score = problem.questions.filter(
      (q, i) => selected[i] === q.correctAnswerIndex,
    ).length;
    saveEnglishAttempt({
      problemId: problem.id,
      mode: "comprehension",
      level: problem.level,
      score,
      total: problem.questions.length,
    });
    setSubmitted(true);
  };

  const toggleSyntax = (i: number) => {
    setShowSyntax((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  const perfect = score === problem.questions.length;
  const passing = score >= Math.ceil(problem.questions.length / 2);
  const scoreTone = perfect
    ? { container: "border-emerald-200 bg-emerald-50", text: "text-emerald-700" }
    : passing
      ? { container: "border-amber-200 bg-amber-50", text: "text-amber-700" }
      : { container: "border-rose-200 bg-rose-50", text: "text-rose-700" };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ── Mobile tab switcher (hidden on md+) ─────────────────────────── */}
      <div
        className="flex gap-1 border-b border-slate-200 bg-slate-50 p-1 md:hidden"
        role="group"
        aria-label="表示する内容"
      >
        <button
          type="button"
          onClick={() => setMobileTab("passage")}
          aria-pressed={mobileTab === "passage"}
          className={`min-h-11 flex-1 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
            mobileTab === "passage"
              ? "border-blue-200 bg-white text-blue-800 shadow-sm"
              : "border-transparent text-slate-600 hover:bg-white hover:text-slate-950"
          }`}
        >
          本文
        </button>
        <button
          type="button"
          onClick={() => setMobileTab("questions")}
          aria-pressed={mobileTab === "questions"}
          className={`min-h-11 flex-1 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
            mobileTab === "questions"
              ? "border-blue-200 bg-white text-blue-800 shadow-sm"
              : "border-transparent text-slate-600 hover:bg-white hover:text-slate-950"
          }`}
        >
          設問
        </button>
      </div>

      <div className="grid md:grid-cols-2">
      {/* ── Left pane: Passage ──────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "passage" ? "" : "hidden"} h-[65vh] overflow-y-auto border-b border-slate-200 bg-white p-6 md:block md:h-[72vh] md:border-b-0 md:border-r md:p-8`}
        role="region"
        aria-label="英文本文"
      >
        {/* Pane header */}
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <span className="text-xs font-semibold text-slate-600">
            Passage · 本文
          </span>
        </div>

        {/* Passage paragraphs */}
        <div className="space-y-5">
          {problem.passage.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm leading-[1.95] text-slate-800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {para.trim()}
            </p>
          ))}
        </div>
      </div>

      {/* ── Right pane: Questions ────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "questions" ? "" : "hidden"} h-[65vh] overflow-y-auto bg-slate-50 p-6 md:block md:h-[72vh] md:p-8`}
        role="region"
        aria-label="設問"
      >
        {/* Score summary (after submission) */}
        {submitted && (
          <div className={`mb-6 rounded-xl border p-4 text-center ${scoreTone.container}`}>
            <p className="mb-1 text-xs font-semibold text-slate-600">
              Result
            </p>
            <p className={`text-4xl font-extrabold ${scoreTone.text}`}>
              {score}
              <span className="text-xl text-slate-500"> / {problem.questions.length}</span>
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {perfect ? "満点！" : passing ? "合格ライン突破" : "再挑戦してみよう"}
            </p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
            const isCorrect =
              submitted && userAnswer === q.correctAnswerIndex;

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
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Q{qIdx + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-800">
                      {q.questionText}
                    </p>
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
                    <p
                      className={`mb-2 text-xs font-semibold uppercase tracking-widest ${
                        isCorrect ? "text-emerald-800" : "text-rose-800"
                      }`}
                    >
                      {isCorrect ? "✓ 正解" : "✗ 不正解"} · 解説
                    </p>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
                      {q.explanation}
                    </p>

                    {/* Syntax analysis toggle */}
                    {q.syntaxAnalysis && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => toggleSyntax(qIdx)}
                          aria-expanded={Boolean(showSyntax[qIdx])}
                          aria-controls={`syntax-analysis-${qIdx}`}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                        >
                          <Brain className="h-4 w-4" aria-hidden="true" />
                          構文解析を{showSyntax[qIdx] ? "閉じる" : "表示する"}
                          {showSyntax[qIdx] ? (
                            <ChevronUp className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                        {showSyntax[qIdx] && (
                          <div id={`syntax-analysis-${qIdx}`} className="mt-3">
                            <SyntaxVisualizer blocks={q.syntaxAnalysis} />
                          </div>
                        )}
                      </div>
                    )}
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
