"use client";

import { useMemo, useState } from "react";
import katex from "katex";
import { CheckCircle2, RefreshCw, RotateCcw, XCircle } from "lucide-react";
import { MarkSheetAnswerInput } from "@/components/common-test/MarkSheetAnswerInput";
import type { CommonTestGuidedReviewItem } from "@/lib/common-test-guided-review";
import {
  generateCommonTestVariantPracticeQuestion,
  validateCommonTestVariantPracticeQuestion,
} from "@/lib/common-test-variant-generator";
import { isCommonTestAnswerCorrect, normalizeCommonTestAnswer } from "@/lib/common-test-answer-normalize";

interface Props {
  sourceItem: CommonTestGuidedReviewItem;
  theme?: { primary: string; glowRgb: string };
  onClose?: () => void;
}

const DEFAULT_THEME = { primary: "#fbbf24", glowRgb: "251,191,36" };

export function CommonTestVariantPracticePanel({
  sourceItem,
  theme = DEFAULT_THEME,
  onClose,
}: Props) {
  const [variantIndex, setVariantIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const question = useMemo(
    () => generateCommonTestVariantPracticeQuestion(sourceItem, variantIndex),
    [sourceItem, variantIndex],
  );

  const validation = useMemo(
    () => (question ? validateCommonTestVariantPracticeQuestion(question) : null),
    [question],
  );

  if (!question || !validation?.ok) {
    return (
      <div
        className="rounded-xl p-4 font-mono text-[10px] leading-relaxed text-white/45"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        この問題では、まだ安全に生成できる類題テンプレートがありません。
      </div>
    );
  }

  const isChoice = question.answerFormat === "choice";
  const isCorrect = submitted
    ? isCommonTestAnswerCorrect(answer, question.correctAnswer, question.answerFormat)
    : false;

  function handleSubmit() {
    if (!normalizeCommonTestAnswer(answer)) return;
    setSubmitted(true);
  }

  function handleNextVariant() {
    setVariantIndex((current) => current + 1);
    setAnswer("");
    setSubmitted(false);
  }

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 space-y-4"
      style={{
        background: `rgba(${theme.glowRgb},0.055)`,
        border: `1px solid rgba(${theme.glowRgb},0.22)`,
      }}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className="inline-flex rounded-full px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: `rgba(${theme.glowRgb},0.12)`,
              border: `1px solid rgba(${theme.glowRgb},0.30)`,
              color: theme.primary,
            }}
          >
            テンプレート類題
          </div>
          <h4 className="mt-2 font-mono text-[12px] font-extrabold text-white/82">
            {question.title}
          </h4>
          <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/38">
            元の問題と同じ解法パターンで、数値だけを変えた検証済み類題です。
          </p>
        </div>
        <div className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 font-mono text-[9px] text-white/38">
          #{variantIndex + 1}
        </div>
      </div>

      <div
        className="rounded-xl p-4 space-y-4"
        style={{ background: "rgba(0,0,0,0.20)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="font-mono text-[12px] leading-relaxed text-white/76">
          <RenderMath text={question.statement} />
        </div>

        {isChoice ? (
          <div className="space-y-2">
            {(question.options ?? []).map((option, index) => {
              const selected = answer === option;
              return (
                <button
                  key={option}
                  type="button"
                  disabled={submitted}
                  onClick={() => setAnswer(option)}
                  className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all hover:opacity-85 disabled:cursor-default"
                  style={{
                    background: selected ? `rgba(${theme.glowRgb},0.13)` : "rgba(255,255,255,0.035)",
                    border: selected ? `1px solid rgba(${theme.glowRgb},0.44)` : "1px solid rgba(255,255,255,0.09)",
                    color: selected ? theme.primary : "rgba(255,255,255,0.70)",
                  }}
                >
                  <span className="font-mono text-[11px] font-bold">{index + 1}</span>
                  <span className="font-mono text-[11px] leading-relaxed">
                    <RenderMath text={option} />
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <MarkSheetAnswerInput
            question={question}
            value={answer}
            onChange={(next) => {
              setAnswer(next);
              setSubmitted(false);
            }}
            helperText="類題演習の結果は本番演習履歴には保存されません。"
          />
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={!normalizeCommonTestAnswer(answer)}
            onClick={handleSubmit}
            className="rounded-lg px-4 py-2.5 font-mono text-[10px] font-bold transition-all hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              background: `rgba(${theme.glowRgb},0.16)`,
              border: `1px solid rgba(${theme.glowRgb},0.38)`,
              color: theme.primary,
            }}
          >
            判定する
          </button>
          <button
            type="button"
            onClick={handleNextVariant}
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-mono text-[10px] font-bold text-white/55 transition-all hover:bg-white/[0.05]"
            style={{ border: "1px solid rgba(255,255,255,0.10)" }}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            もう1問生成
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 font-mono text-[10px] font-bold text-white/38 transition-all hover:bg-white/[0.05]"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              元の復習に戻る
            </button>
          )}
        </div>
      </div>

      {submitted && (
        <div
          className="rounded-xl p-4 space-y-3"
          style={{
            background: isCorrect ? "rgba(34,197,94,0.07)" : "rgba(239,68,68,0.07)",
            border: isCorrect ? "1px solid rgba(34,197,94,0.22)" : "1px solid rgba(239,68,68,0.22)",
          }}
        >
          <div
            className="flex items-center gap-2 font-mono text-[11px] font-extrabold"
            style={{ color: isCorrect ? "#86efac" : "#fca5a5" }}
          >
            {isCorrect ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {isCorrect ? "正解です" : "もう一度確認しましょう"}
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <AnswerBox label="あなたの解答" value={answer} />
            <AnswerBox label="正答" value={question.correctAnswer} good />
          </div>
          <ReviewBlock label="解説" text={question.explanation} />
          <ReviewBlock label="解き方" text={question.strategy} />
          <ReviewBlock label="よくあるミス" text={question.trapExplanation} />
        </div>
      )}
    </div>
  );
}

function AnswerBox({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="rounded-lg bg-white/[0.035] p-3">
      <div className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-white/28">
        {label}
      </div>
      <div className={`mt-1 font-mono text-[12px] font-bold ${good ? "text-emerald-200/85" : "text-white/68"}`}>
        <RenderMath text={value} />
      </div>
    </div>
  );
}

function ReviewBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg bg-white/[0.035] p-3">
      <div className="mb-1 font-mono text-[9px] font-bold text-white/36">{label}</div>
      <div className="font-mono text-[10px] leading-relaxed text-white/62">
        <RenderMath text={text} />
      </div>
    </div>
  );
}

function RenderMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          try {
            return (
              <span
                key={i}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(part.slice(1, -1), { throwOnError: false }),
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
