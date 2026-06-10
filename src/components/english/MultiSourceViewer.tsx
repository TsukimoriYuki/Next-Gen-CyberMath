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

// ── Source color palette (A=cyan, B=amber, C=violet, D=emerald …) ─────────

const SOURCE_PALETTE = [
  { label: "A", bg: "rgba(34,211,238,0.14)",  text: "#22d3ee", border: "rgba(34,211,238,0.38)" },
  { label: "B", bg: "rgba(251,191,36,0.14)",  text: "#fbbf24", border: "rgba(251,191,36,0.38)" },
  { label: "C", bg: "rgba(167,139,250,0.14)", text: "#a78bfa", border: "rgba(167,139,250,0.38)" },
  { label: "D", bg: "rgba(52,211,153,0.14)",  text: "#34d399", border: "rgba(52,211,153,0.38)" },
  { label: "E", bg: "rgba(244,63,94,0.14)",   text: "#f43f5e", border: "rgba(244,63,94,0.38)"  },
];

function getPalette(index: number) {
  return SOURCE_PALETTE[index % SOURCE_PALETTE.length];
}

// ── Sub-components ────────────────────────────────────────────────────────

function TableRenderer({ content }: { content: string[][] }) {
  if (content.length < 2) return null;
  const [headers, ...rows] = content;
  return (
    <div
      className="overflow-x-auto rounded-lg"
      style={{ border: "1px solid rgba(34,211,238,0.2)" }}
    >
      <table className="w-full min-w-max text-xs">
        <thead>
          <tr style={{ background: "rgba(34,211,238,0.1)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2.5 text-left font-mono font-semibold whitespace-nowrap"
                style={{
                  color: "#22d3ee",
                  borderBottom: "1px solid rgba(34,211,238,0.28)",
                  borderRight:
                    i < headers.length - 1
                      ? "1px solid rgba(34,211,238,0.14)"
                      : undefined,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                background:
                  ri % 2 === 0
                    ? "rgba(255,255,255,0.028)"
                    : "rgba(255,255,255,0.01)",
              }}
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="px-3 py-2.5 whitespace-nowrap"
                  style={{
                    color:
                      ci === 0
                        ? "rgba(255,255,255,0.88)"
                        : "rgba(255,255,255,0.66)",
                    fontWeight: ci === 0 ? "500" : "normal",
                    borderBottom:
                      ri < rows.length - 1
                        ? "1px solid rgba(255,255,255,0.055)"
                        : undefined,
                    borderRight:
                      ci < row.length - 1
                        ? "1px solid rgba(255,255,255,0.055)"
                        : undefined,
                  }}
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
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-2.5 px-4 py-2.5"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span
          className="shrink-0 flex h-5 w-5 items-center justify-center rounded font-mono text-[10px] font-bold"
          style={{ background: p.bg, color: p.text, border: `1px solid ${p.border}` }}
        >
          {p.label}
        </span>
        <Icon className="h-3 w-3 text-white/28" />
        <span className="font-mono text-[11px] text-white/48 truncate">
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
                className="text-xs leading-relaxed text-white/70"
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
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: p.text }}
                />
                <span className="text-xs leading-relaxed text-white/70">
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

function CrossRefBadge({ ref }: { ref: string }) {
  const match = ref.match(/Source ([A-E])/);
  const idx = match ? match[1].charCodeAt(0) - 65 : 0;
  const p = getPalette(idx);
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 font-mono text-[10px] font-semibold"
      style={{ background: p.bg, color: p.text, border: `1px solid ${p.border}` }}
    >
      {ref}
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────

export function MultiSourceViewer({ problem }: { problem: MultiSourceProblem }) {
  const [selected, setSelected] = useState<(number | null)[]>(() =>
    problem.questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

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

  const perfect = score === problem.questions.length;
  const passing = score >= Math.ceil(problem.questions.length / 2);
  const scoreColor = perfect ? "#34d399" : passing ? "#fbbf24" : "#f43f5e";
  const scoreBg    = perfect ? "rgba(52,211,153,0.1)"  : passing ? "rgba(251,191,36,0.1)"  : "rgba(244,63,94,0.1)";
  const scoreBorder= perfect ? "rgba(52,211,153,0.3)"  : passing ? "rgba(251,191,36,0.3)"  : "rgba(244,63,94,0.3)";

  return (
    <div
      className="grid md:grid-cols-2 rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {/* ── Left pane: Sources ──────────────────────────────────────────── */}
      <div
        className="md:h-[80vh] overflow-y-auto border-b md:border-b-0 md:border-r p-4 md:p-5 space-y-4"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div className="flex items-center gap-2 pb-1">
          <Layers className="h-3.5 w-3.5 text-white/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
            Sources · 資料
          </span>
        </div>

        {problem.sources.map((block, i) => (
          <SourceCard key={block.id} block={block} index={i} />
        ))}
      </div>

      {/* ── Right pane: Questions ────────────────────────────────────────── */}
      <div
        className="md:h-[80vh] overflow-y-auto p-5 md:p-6"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        {/* Score summary */}
        {submitted && (
          <div
            className="mb-6 rounded-xl p-4 text-center"
            style={{ background: scoreBg, border: `1px solid ${scoreBorder}` }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/35 mb-1">
              Result
            </p>
            <p className="font-display text-4xl font-extrabold" style={{ color: scoreColor }}>
              {score}
              <span className="text-xl text-white/30"> / {problem.questions.length}</span>
            </p>
            <p className="mt-1 font-mono text-xs text-white/35">
              {perfect ? "満点！" : passing ? "合格ライン突破" : "再挑戦してみよう"}
            </p>
            <button
              onClick={handleRetry}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
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
            const isCorrect = submitted && userAnswer === q.correctAnswerIndex;

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
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      Q{qIdx + 1}
                    </span>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/88">
                      {q.questionText}
                    </p>
                    {/* Cross-reference hints (always visible) */}
                    {q.crossReferences && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {q.crossReferences.map((ref) => (
                          <CrossRefBadge key={ref} ref={ref} />
                        ))}
                        <span className="font-mono text-[10px] text-white/25">を参照</span>
                      </div>
                    )}
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
                          style={{ background: "rgba(255,255,255,0.06)", color: textColor }}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: textColor }}>
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
                      border: `1px solid ${
                        isCorrect ? "rgba(52,211,153,0.22)" : "rgba(244,63,94,0.22)"
                      }`,
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <p
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: isCorrect ? "#34d399" : "#f43f5e" }}
                      >
                        {isCorrect ? "✓ 正解" : "✗ 不正解"} · 解説
                      </p>
                      {q.crossReferences && (
                        <div className="flex flex-wrap gap-1">
                          {q.crossReferences.map((ref) => (
                            <CrossRefBadge key={ref} ref={ref} />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed whitespace-pre-line text-white/62">
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
          <div
            className="mt-8 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="mb-3 text-center font-mono text-[11px] text-white/28">
              {answeredCount} / {problem.questions.length} 問 回答済み
            </p>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className="w-full rounded-xl py-3 font-mono text-sm font-semibold transition-all duration-300"
              style={{
                background: allAnswered
                  ? "rgba(34,211,238,0.15)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  allAnswered ? "rgba(34,211,238,0.5)" : "rgba(255,255,255,0.1)"
                }`,
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
  );
}
