"use client";

import { useState, useEffect } from "react";
import katex from "katex";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestConfidence } from "@/lib/common-test-history";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react";

interface Props {
  question: CommonTestDrillQuestion;
  selectedAnswer: string | null;
  isRevealed: boolean;
  onSelect: (answer: string) => void;
  onNext: (confidence: CommonTestConfidence) => void;
  isLastQuestion: boolean;
  theme: CommonTestTheme;
}

export function CommonTestAnswerPanel({
  question,
  selectedAnswer,
  isRevealed,
  onSelect,
  onNext,
  isLastQuestion,
  theme,
}: Props) {
  const isMath = question.subjectId !== "english-reading";
  const isBlankNumber = question.type === "blank-number";
  const [selectedConfidence, setSelectedConfidence] =
    useState<CommonTestConfidence | null>(null);

  // Reset confidence each time a new question starts
  useEffect(() => {
    if (!isRevealed) setSelectedConfidence(null);
  }, [isRevealed]);

  return (
    <div className="space-y-4">
      {/* ── Options ──────────────────────────────────────────────────── */}
      {isBlankNumber ? (
        <BlankNumberInput
          question={question}
          isRevealed={isRevealed}
          onSelect={onSelect}
          theme={theme}
        />
      ) : (
        <div className="grid gap-2 sm:grid-cols-2">
          {(question.options ?? []).map((opt, idx) => {
            const label = String.fromCharCode(65 + idx);
            const isSelected = selectedAnswer === opt;
            const isCorrect =
              opt === question.correctAnswer ||
              (Array.isArray(question.correctAnswer) &&
                question.correctAnswer.includes(opt));

            let borderColor = `rgba(${theme.glowRgb},0.15)`;
            let bgColor = "rgba(255,255,255,0.03)";
            let textColor = "rgba(255,255,255,0.70)";
            let labelColor = `rgba(${theme.glowRgb},0.6)`;

            if (isRevealed) {
              if (isCorrect) {
                borderColor = "rgba(34,197,94,0.50)";
                bgColor = "rgba(34,197,94,0.08)";
                textColor = "rgba(255,255,255,0.90)";
                labelColor = "#22c55e";
              } else if (isSelected && !isCorrect) {
                borderColor = "rgba(239,68,68,0.50)";
                bgColor = "rgba(239,68,68,0.08)";
                textColor = "rgba(255,255,255,0.90)";
                labelColor = "#ef4444";
              }
            } else if (isSelected) {
              borderColor = `rgba(${theme.glowRgb},0.60)`;
              bgColor = `rgba(${theme.glowRgb},0.08)`;
              textColor = "rgba(255,255,255,0.95)";
              labelColor = theme.primary;
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isRevealed}
                onClick={() => onSelect(opt)}
                className="flex items-start gap-3 rounded-xl p-3 text-left transition-all duration-200 disabled:cursor-default"
                style={{
                  background: bgColor,
                  border: `1px solid ${borderColor}`,
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-extrabold"
                  style={{
                    background:
                      isRevealed && isCorrect
                        ? "rgba(34,197,94,0.15)"
                        : isRevealed && isSelected
                        ? "rgba(239,68,68,0.15)"
                        : `rgba(${theme.glowRgb},0.08)`,
                    color: labelColor,
                  }}
                >
                  {label}
                </span>
                <span
                  className="flex-1 text-sm leading-snug"
                  style={{ color: textColor }}
                >
                  {isMath ? <RenderMath text={opt} /> : opt}
                </span>
                {isRevealed && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />
                )}
                {isRevealed && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Explanation ─────────────────────────────────────────────── */}
      {isRevealed && (
        <ExplanationPanel
          question={question}
          selectedAnswer={selectedAnswer}
          theme={theme}
          isMath={isMath}
        />
      )}

      {/* ── Confidence picker ────────────────────────────────────────── */}
      {isRevealed && (
        <ConfidencePicker
          selected={selectedConfidence}
          onSelect={setSelectedConfidence}
        />
      )}

      {/* ── Next button ─────────────────────────────────────────────── */}
      {isRevealed && (
        <button
          type="button"
          onClick={() => onNext(selectedConfidence ?? "unsure")}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, rgba(${theme.glowRgb},0.20), rgba(${theme.glowRgb},0.10))`,
            border: `1px solid rgba(${theme.glowRgb},0.40)`,
            color: theme.primary,
          }}
        >
          {isLastQuestion ? "演習を終了する" : "次の問題へ"}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

// ── Confidence picker ─────────────────────────────────────────────────────
const CONFIDENCE_OPTIONS: {
  value: CommonTestConfidence;
  label: string;
  sub: string;
  color: string;
  bg: string;
  border: string;
}[] = [
  {
    value: "confident",
    label: "自信あり",
    sub: "CONFIDENT",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.30)",
  },
  {
    value: "unsure",
    label: "少し不安",
    sub: "UNSURE",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.30)",
  },
  {
    value: "guessed",
    label: "勘で選んだ",
    sub: "GUESSED",
    color: "#f97316",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.30)",
  },
  {
    value: "blank",
    label: "わからない",
    sub: "BLANK",
    color: "rgba(255,255,255,0.35)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.12)",
  },
];

function ConfidencePicker({
  selected,
  onSelect,
}: {
  selected: CommonTestConfidence | null;
  onSelect: (v: CommonTestConfidence) => void;
}) {
  return (
    <div
      className="rounded-xl p-3 space-y-2"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
        ◈ CONFIDENCE — この問題への自信度は？（任意）
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {CONFIDENCE_OPTIONS.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              className="flex flex-col items-center gap-0.5 rounded-lg py-2 px-1 font-mono text-[10px] font-bold transition-all duration-150"
              style={{
                background: isActive ? opt.bg : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? opt.border : "rgba(255,255,255,0.07)"}`,
                color: isActive ? opt.color : "rgba(255,255,255,0.35)",
                outline: isActive ? `1px solid ${opt.border}` : "none",
                outlineOffset: "1px",
              }}
            >
              <span className="text-[9px] uppercase tracking-wider">{opt.sub}</span>
              <span className="text-[11px]">{opt.label}</span>
            </button>
          );
        })}
      </div>
      {selected === null && (
        <p className="font-mono text-[9px] text-white/20 text-center">
          未選択の場合は「少し不安」として記録されます
        </p>
      )}
    </div>
  );
}

// ── Blank number input ────────────────────────────────────────────────────
function BlankNumberInput({
  question,
  isRevealed,
  onSelect,
  theme,
}: {
  question: CommonTestDrillQuestion;
  isRevealed: boolean;
  onSelect: (answer: string) => void;
  theme: CommonTestTheme;
}) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const value = (
      form.elements.namedItem("answer") as HTMLInputElement
    ).value.trim();
    if (value) onSelect(value);
  }

  if (isRevealed) return null;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="answer"
        type="text"
        placeholder="解答を入力..."
        autoComplete="off"
        className="flex-1 rounded-xl px-4 py-3 font-mono text-sm text-white placeholder:text-white/25 outline-none"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid rgba(${theme.glowRgb},0.25)`,
        }}
      />
      <button
        type="submit"
        className="rounded-xl px-5 py-3 font-mono text-sm font-bold uppercase tracking-wider transition-all"
        style={{
          background: `rgba(${theme.glowRgb},0.15)`,
          border: `1px solid rgba(${theme.glowRgb},0.40)`,
          color: theme.primary,
        }}
      >
        CHECK
      </button>
    </form>
  );
}

// ── Explanation (3-part) ──────────────────────────────────────────────────
function ExplanationPanel({
  question,
  selectedAnswer,
  theme,
  isMath,
}: {
  question: CommonTestDrillQuestion;
  selectedAnswer: string | null;
  theme: CommonTestTheme;
  isMath: boolean;
}) {
  const isCorrect =
    selectedAnswer !== null &&
    (Array.isArray(question.correctAnswer)
      ? question.correctAnswer.includes(selectedAnswer)
      : question.correctAnswer === selectedAnswer);

  return (
    <div className="space-y-3">
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          background: isCorrect
            ? "rgba(34,197,94,0.08)"
            : "rgba(239,68,68,0.08)",
          border: `1px solid ${
            isCorrect ? "rgba(34,197,94,0.30)" : "rgba(239,68,68,0.30)"
          }`,
        }}
      >
        {isCorrect ? (
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
        ) : (
          <XCircle className="h-5 w-5 shrink-0 text-red-400" />
        )}
        <div>
          <div
            className="font-mono text-xs font-bold uppercase tracking-wider"
            style={{ color: isCorrect ? "#22c55e" : "#ef4444" }}
          >
            {isCorrect ? "正解" : "不正解"}
          </div>
          {!isCorrect && (
            <div className="mt-0.5 font-mono text-[10px] text-white/50">
              正解:{" "}
              <span className="text-white/80">
                {question.correctAnswer as string}
              </span>
            </div>
          )}
        </div>
      </div>

      <ExplainBlock
        icon={<Target className="h-4 w-4" />}
        label="解説"
        labelColor={theme.primary}
        glowRgb={theme.glowRgb}
      >
        {isMath ? (
          <RenderMath text={question.explanation} block />
        ) : (
          <p className="text-sm leading-relaxed text-white/75">
            {question.explanation}
          </p>
        )}
      </ExplainBlock>

      <ExplainBlock
        icon={<Zap className="h-4 w-4" />}
        label="本番での考え方"
        labelColor="#fbbf24"
        glowRgb="251,191,36"
      >
        <p className="text-sm leading-relaxed text-white/75">
          {question.strategy}
        </p>
      </ExplainBlock>

      {question.trapExplanation && (
        <ExplainBlock
          icon={<AlertTriangle className="h-4 w-4" />}
          label="注意点"
          labelColor="#f97316"
          glowRgb="249,115,22"
        >
          <p className="text-sm leading-relaxed text-white/70">
            {question.trapExplanation}
          </p>
        </ExplainBlock>
      )}
    </div>
  );
}

function ExplainBlock({
  icon,
  label,
  labelColor,
  glowRgb,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  labelColor: string;
  glowRgb: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-4 space-y-2"
      style={{
        background: `rgba(${glowRgb},0.04)`,
        border: `1px solid rgba(${glowRgb},0.18)`,
      }}
    >
      <div
        className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        style={{ color: labelColor }}
      >
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

// ── Inline KaTeX renderer ─────────────────────────────────────────────────
export function RenderMath({ text, block }: { text: string; block?: boolean }) {
  if (!block) {
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (
            part.startsWith("$") &&
            part.endsWith("$") &&
            part.length > 2
          ) {
            try {
              const html = katex.renderToString(part.slice(1, -1), {
                throwOnError: false,
                displayMode: false,
              });
              return (
                <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
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

  const segments = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g);
  return (
    <div className="space-y-2 text-sm leading-relaxed text-white/75">
      {segments.map((seg, i) => {
        if (seg.startsWith("$$") && seg.endsWith("$$")) {
          try {
            const html = katex.renderToString(seg.slice(2, -2).trim(), {
              throwOnError: false,
              displayMode: true,
            });
            return (
              <div
                key={i}
                className="overflow-x-auto py-1"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return <span key={i}>{seg}</span>;
          }
        }
        if (seg.startsWith("$") && seg.endsWith("$") && seg.length > 2) {
          try {
            const html = katex.renderToString(seg.slice(1, -1), {
              throwOnError: false,
              displayMode: false,
            });
            return (
              <span key={i} dangerouslySetInnerHTML={{ __html: html }} />
            );
          } catch {
            return <span key={i}>{seg}</span>;
          }
        }
        const trimmed = seg.trim();
        if (!trimmed) return null;
        return <span key={i}>{seg}</span>;
      })}
    </div>
  );
}
