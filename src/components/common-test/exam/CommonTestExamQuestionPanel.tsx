"use client";

import katex from "katex";
import { Flag } from "lucide-react";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestConfidence } from "@/lib/common-test-history";

interface Props {
  question: CommonTestDrillQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  markedForReview: boolean;
  confidence: CommonTestConfidence | null;
  theme: CommonTestTheme;
  onAnswer: (answer: string) => void;
  onToggleFlag: () => void;
  onSetConfidence: (c: CommonTestConfidence) => void;
}

const CONFIDENCE_OPTIONS: { value: CommonTestConfidence; label: string; color: string }[] = [
  { value: "confident", label: "自信あり", color: "#22c55e" },
  { value: "unsure", label: "微妙", color: "#fbbf24" },
  { value: "guessed", label: "ヤマ", color: "#f97316" },
  { value: "blank", label: "わからない", color: "#6b7280" },
];

export function CommonTestExamQuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  markedForReview,
  confidence,
  theme,
  onAnswer,
  onToggleFlag,
  onSetConfidence,
}: Props) {
  const isMath = question.subjectId !== "english-reading";
  const sectionNum = parseInt(question.sectionId.replace("section-", ""), 10);

  return (
    <div className="space-y-5">
      {/* Question header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em]"
            style={{
              background: `rgba(${theme.glowRgb},0.12)`,
              border: `1px solid rgba(${theme.glowRgb},0.30)`,
              color: theme.primary,
            }}
          >
            第{sectionNum}問
          </span>
          <span className="font-mono text-[10px] font-bold text-white/70">
            問{questionNumber} / {totalQuestions}
          </span>
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[8px] uppercase"
            style={{
              background:
                question.difficulty === "HARD"
                  ? "rgba(239,68,68,0.10)"
                  : question.difficulty === "STANDARD"
                  ? "rgba(251,191,36,0.10)"
                  : "rgba(34,197,94,0.10)",
              border:
                question.difficulty === "HARD"
                  ? "1px solid rgba(239,68,68,0.25)"
                  : question.difficulty === "STANDARD"
                  ? "1px solid rgba(251,191,36,0.25)"
                  : "1px solid rgba(34,197,94,0.25)",
              color:
                question.difficulty === "HARD"
                  ? "#ef4444"
                  : question.difficulty === "STANDARD"
                  ? "#fbbf24"
                  : "#22c55e",
            }}
          >
            {question.difficulty}
          </span>
        </div>

        {/* Flag button */}
        <button
          type="button"
          onClick={onToggleFlag}
          className="shrink-0 flex items-center gap-1.5 rounded-xl px-3 py-2 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80 active:scale-95"
          style={{
            background: markedForReview ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)",
            border: markedForReview ? "1px solid rgba(251,191,36,0.40)" : "1px solid rgba(255,255,255,0.12)",
            color: markedForReview ? "#fbbf24" : "rgba(255,255,255,0.30)",
          }}
        >
          <Flag className={`h-3.5 w-3.5 ${markedForReview ? "fill-current" : ""}`} />
          見直し
        </button>
      </div>

      {/* Question title */}
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
        {question.title}
      </div>

      {/* Passage (English) */}
      {question.passage && (
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">
            PASSAGE
          </div>
          <pre className="font-sans text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
            {question.passage}
          </pre>
        </div>
      )}

      {/* Context (table/info) */}
      {question.context && (
        <div
          className="rounded-xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-white/25 mb-3">
            REFERENCE
          </div>
          <pre className="font-mono text-xs leading-relaxed text-white/65 whitespace-pre-wrap">
            {question.context}
          </pre>
        </div>
      )}

      {/* Statement */}
      <div
        className="rounded-xl p-4 text-sm leading-relaxed text-white/85"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        {isMath ? <RenderMath text={question.statement} /> : question.statement}
      </div>

      {/* Answer options */}
      {question.type === "blank-number" ? (
        <BlankNumberInput
          value={selectedAnswer ?? ""}
          onChange={onAnswer}
          theme={theme}
        />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {(question.options ?? []).map((opt, idx) => {
            const label = String.fromCharCode(65 + idx);
            const isSelected = selectedAnswer === opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => onAnswer(opt)}
                className="flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-150 hover:opacity-90 active:scale-[0.99]"
                style={{
                  background: isSelected
                    ? `rgba(${theme.glowRgb},0.10)`
                    : "rgba(255,255,255,0.03)",
                  border: isSelected
                    ? `1px solid rgba(${theme.glowRgb},0.55)`
                    : "1px solid rgba(255,255,255,0.09)",
                  boxShadow: isSelected
                    ? `0 0 12px rgba(${theme.glowRgb},0.12)`
                    : "none",
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-extrabold"
                  style={{
                    background: isSelected
                      ? `rgba(${theme.glowRgb},0.18)`
                      : "rgba(255,255,255,0.05)",
                    color: isSelected ? theme.primary : "rgba(255,255,255,0.40)",
                  }}
                >
                  {label}
                </span>
                <span
                  className="flex-1 text-sm leading-snug"
                  style={{ color: isSelected ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)" }}
                >
                  {isMath ? <RenderMath text={opt} /> : opt}
                </span>
                {isSelected && (
                  <div
                    className="mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center"
                    style={{ background: `rgba(${theme.glowRgb},0.3)`, border: `1px solid rgba(${theme.glowRgb},0.6)` }}
                  >
                    <div className="h-2 w-2 rounded-full" style={{ background: theme.primary }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Confidence picker */}
      <div>
        <div className="font-mono text-[8px] text-white/25 uppercase tracking-[0.15em] mb-2">
          自信度（任意）
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CONFIDENCE_OPTIONS.map((opt) => {
            const isSelected = confidence === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSetConfidence(opt.value)}
                className="rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80 active:scale-95"
                style={{
                  background: isSelected ? `${opt.color}22` : "rgba(255,255,255,0.04)",
                  border: isSelected ? `1px solid ${opt.color}66` : "1px solid rgba(255,255,255,0.10)",
                  color: isSelected ? opt.color : "rgba(255,255,255,0.30)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Blank number input ────────────────────────────────────────────────────
function BlankNumberInput({
  value,
  onChange,
  theme,
}: {
  value: string;
  onChange: (v: string) => void;
  theme: CommonTestTheme;
}) {
  return (
    <div className="space-y-2">
      <div className="font-mono text-[9px] text-white/35 uppercase tracking-[0.15em]">
        答えを入力
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="数値を入力..."
        className="w-full max-w-xs rounded-xl px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: value ? `1px solid rgba(${theme.glowRgb},0.50)` : "1px solid rgba(255,255,255,0.14)",
          boxShadow: value ? `0 0 10px rgba(${theme.glowRgb},0.10)` : "none",
        }}
      />
    </div>
  );
}

// ── KaTeX renderer ────────────────────────────────────────────────────────
function RenderMath({ text }: { text: string }) {
  const parts = text.split(/(\$\$[^$]+\$\$|\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          const math = part.slice(2, -2);
          try {
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(math, { displayMode: true, throwOnError: false }),
                }}
              />
            );
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        if (part.startsWith("$") && part.endsWith("$")) {
          const math = part.slice(1, -1);
          try {
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(math, { throwOnError: false }),
                }}
              />
            );
          } catch {
            return <span key={i}>{part}</span>;
          }
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
