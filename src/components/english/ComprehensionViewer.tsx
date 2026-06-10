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
  S:    { bg: "rgba(34,211,238,0.15)",  text: "#22d3ee", border: "rgba(34,211,238,0.4)"  },
  V:    { bg: "rgba(52,211,153,0.15)",  text: "#34d399", border: "rgba(52,211,153,0.4)"  },
  O:    { bg: "rgba(251,191,36,0.15)",  text: "#fbbf24", border: "rgba(251,191,36,0.4)"  },
  C:    { bg: "rgba(244,63,94,0.15)",   text: "#f43f5e", border: "rgba(244,63,94,0.4)"   },
  M:    { bg: "rgba(167,139,250,0.15)", text: "#a78bfa", border: "rgba(167,139,250,0.4)" },
  NONE: { bg: "transparent",            text: "rgba(255,255,255,0.5)", border: "transparent" },
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
    <div
      className="rounded-xl p-4 space-y-3"
      style={{ background: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.09)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 mb-4">
        構文解析 / Syntax Breakdown
      </p>

      {blocks.map((block, i) => {
        if (block.role === "NONE") {
          return (
            <p key={i} className="text-xs italic text-white/35">
              {block.text}
            </p>
          );
        }
        const c = SYNTAX_COLORS[block.role];
        return (
          <div key={i} className="flex items-start gap-3">
            {/* Role badge */}
            <span
              className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-bold"
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
                <p className="mt-1 pl-1 text-[11px] leading-relaxed text-white/40">
                  {block.translation}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div
        className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {(["S", "V", "O", "C", "M"] as SyntaxRole[]).map((role) => {
          const c = SYNTAX_COLORS[role];
          return (
            <span key={role} className="flex items-center gap-1.5 font-mono text-[10px]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-sm"
                style={{ background: c.bg, border: `1px solid ${c.border}` }}
              />
              <span style={{ color: c.text }}>{role}</span>
              <span className="text-white/30">= {SYNTAX_LABELS[role]}</span>
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

  // Score color
  const perfect = score === problem.questions.length;
  const passing = score >= Math.ceil(problem.questions.length / 2);
  const scoreColor = perfect ? "#34d399" : passing ? "#fbbf24" : "#f43f5e";
  const scoreBg = perfect
    ? "rgba(52,211,153,0.1)"
    : passing
    ? "rgba(251,191,36,0.1)"
    : "rgba(244,63,94,0.1)";
  const scoreBorder = perfect
    ? "rgba(52,211,153,0.3)"
    : passing
    ? "rgba(251,191,36,0.3)"
    : "rgba(244,63,94,0.3)";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
      {/* ── Mobile tab switcher (hidden on md+) ─────────────────────────── */}
      <div
        className="flex md:hidden"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
      >
        <button
          onClick={() => setMobileTab("passage")}
          className="flex-1 py-3 font-mono text-xs font-semibold transition-colors"
          style={{
            background: mobileTab === "passage" ? "rgba(34,211,238,0.1)" : "rgba(0,0,0,0.4)",
            color: mobileTab === "passage" ? "#22d3ee" : "rgba(255,255,255,0.35)",
            borderRight: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          本文
        </button>
        <button
          onClick={() => setMobileTab("questions")}
          className="flex-1 py-3 font-mono text-xs font-semibold transition-colors"
          style={{
            background: mobileTab === "questions" ? "rgba(34,211,238,0.1)" : "rgba(0,0,0,0.4)",
            color: mobileTab === "questions" ? "#22d3ee" : "rgba(255,255,255,0.35)",
          }}
        >
          設問
        </button>
      </div>

      <div className="grid md:grid-cols-2">
      {/* ── Left pane: Passage ──────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "passage" ? "" : "hidden"} md:block h-[65vh] md:h-[72vh] overflow-y-auto border-b md:border-b-0 md:border-r p-6 md:p-8`}
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.015)",
        }}
      >
        {/* Pane header */}
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="h-3.5 w-3.5 text-white/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            Passage · 本文
          </span>
        </div>

        {/* Passage paragraphs */}
        <div className="space-y-5">
          {problem.passage.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="text-sm leading-[1.95] text-white/72"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {para.trim()}
            </p>
          ))}
        </div>
      </div>

      {/* ── Right pane: Questions ────────────────────────────────────────── */}
      <div
        className={`${mobileTab === "questions" ? "" : "hidden"} md:block h-[65vh] md:h-[72vh] overflow-y-auto p-6 md:p-8`}
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        {/* Score summary (after submission) */}
        {submitted && (
          <div
            className="mb-6 rounded-xl p-4 text-center"
            style={{ background: scoreBg, border: `1px solid ${scoreBorder}` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1">
              Result
            </p>
            <p
              className="font-display text-4xl font-extrabold"
              style={{ color: scoreColor }}
            >
              {score}
              <span className="text-xl text-white/30"> / {problem.questions.length}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-white/35">
              {perfect ? "満点！" : passing ? "合格ライン突破" : "再挑戦してみよう"}
            </p>
            <button
              onClick={handleRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-mono text-xs transition-colors text-white/40 hover:text-white/70"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <RotateCcw className="h-3 w-3" />
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
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    ))}
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      Q{qIdx + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/85">
                      {q.questionText}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectOpt = optIdx === q.correctAnswerIndex;

                    let bg = "rgba(255,255,255,0.03)";
                    let border = "rgba(255,255,255,0.1)";
                    let textColor = "rgba(255,255,255,0.6)";

                    if (!submitted) {
                      if (isSelected) {
                        bg = "rgba(34,211,238,0.1)";
                        border = "rgba(34,211,238,0.5)";
                        textColor = "#22d3ee";
                      }
                    } else {
                      if (isCorrectOpt) {
                        bg = "rgba(52,211,153,0.12)";
                        border = "rgba(52,211,153,0.5)";
                        textColor = "#34d399";
                      } else if (isSelected) {
                        bg = "rgba(244,63,94,0.12)";
                        border = "rgba(244,63,94,0.5)";
                        textColor = "#f43f5e";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelect(qIdx, optIdx)}
                        disabled={submitted}
                        className="w-full flex items-start gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200"
                        style={{
                          background: bg,
                          border: `1px solid ${border}`,
                          cursor: submitted ? "default" : "pointer",
                        }}
                      >
                        <span
                          className="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded font-mono text-[11px] font-bold"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            color: textColor,
                          }}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: textColor }}
                        >
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation (after submission) */}
                {submitted && (
                  <div
                    className="mt-3 rounded-xl p-4"
                    style={{
                      background: isCorrect
                        ? "rgba(52,211,153,0.06)"
                        : "rgba(244,63,94,0.06)",
                      border: `1px solid ${isCorrect ? "rgba(52,211,153,0.2)" : "rgba(244,63,94,0.2)"}`,
                    }}
                  >
                    <p
                      className="font-mono text-[10px] uppercase tracking-widest mb-2"
                      style={{ color: isCorrect ? "#34d399" : "#f43f5e" }}
                    >
                      {isCorrect ? "✓ 正解" : "✗ 不正解"} · 解説
                    </p>
                    <p className="text-xs leading-relaxed whitespace-pre-line text-white/62">
                      {q.explanation}
                    </p>

                    {/* Syntax analysis toggle */}
                    {q.syntaxAnalysis && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggleSyntax(qIdx)}
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/38 transition-colors hover:text-white/68"
                        >
                          <Brain className="h-3 w-3" />
                          構文解析を{showSyntax[qIdx] ? "閉じる" : "表示する"}
                          {showSyntax[qIdx] ? (
                            <ChevronUp className="h-3 w-3" />
                          ) : (
                            <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                        {showSyntax[qIdx] && (
                          <div className="mt-3">
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
          <div
            className="mt-8 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="mb-3 text-center font-mono text-[11px] text-white/28">
              {answeredCount} / {problem.questions.length} 問 回答済み
            </p>
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full rounded-xl py-3 font-mono text-sm font-semibold transition-all duration-300"
              style={{
                background: allAnswered
                  ? "rgba(34,211,238,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${allAnswered ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: allAnswered ? "#22d3ee" : "rgba(255,255,255,0.22)",
                cursor: allAnswered ? "pointer" : "not-allowed",
              }}
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
