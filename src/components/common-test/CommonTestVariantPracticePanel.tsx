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
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-500">
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
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: `${theme.primary}14`, color: theme.primary }}
          >
            テンプレート類題
          </div>
          <h4 className="mt-2 text-sm font-extrabold text-slate-900">
            {question.title}
          </h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            元の問題と同じ解法パターンで、数値だけを変えた検証済み類題です。
          </p>
        </div>
        <div className="rounded-lg bg-slate-100 px-2.5 py-1.5 font-mono text-[11px] text-slate-500">
          #{variantIndex + 1}
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-[13px] leading-relaxed text-slate-800">
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
                  className="flex w-full items-start gap-3 rounded-lg border bg-white p-3 text-left transition-colors hover:border-slate-300 disabled:cursor-default"
                  style={{
                    background: selected ? `${theme.primary}10` : "#ffffff",
                    borderColor: selected ? `${theme.primary}66` : "#e2e8f0",
                    color: selected ? theme.primary : "#334155",
                  }}
                >
                  <span className="font-mono text-xs font-bold">{index + 1}</span>
                  <span className="text-xs leading-relaxed">
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
            className="rounded-lg px-4 py-2.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: theme.primary }}
          >
            判定する
          </button>
          <button
            type="button"
            onClick={handleNextVariant}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            もう1問生成
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-500 transition-colors hover:border-slate-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              元の復習に戻る
            </button>
          )}
        </div>
      </div>

      {submitted && (
        <div
          className="space-y-3 rounded-xl border p-4"
          style={{
            background: isCorrect ? "#f0fdf4" : "#fff1f2",
            borderColor: isCorrect ? "#bbf7d0" : "#fecdd3",
          }}
        >
          <div
            className="flex items-center gap-2 text-xs font-extrabold"
            style={{ color: isCorrect ? "#059669" : "#e11d48" }}
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
    <div className={`rounded-lg border p-3 ${good ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}>
      <div className={`text-[10px] font-bold ${good ? "text-emerald-600" : "text-slate-400"}`}>
        {label}
      </div>
      <div className={`mt-1 text-[13px] font-bold ${good ? "text-emerald-700" : "text-slate-700"}`}>
        <RenderMath text={value} />
      </div>
    </div>
  );
}

function ReviewBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-1 text-[11px] font-bold text-slate-500">{label}</div>
      <div className="text-xs leading-relaxed text-slate-600">
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
