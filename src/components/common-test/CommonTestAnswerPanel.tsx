"use client";

import { useEffect, useState } from "react";
import katex from "katex";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Target,
  XCircle,
} from "lucide-react";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestConfidence } from "@/lib/common-test-history";
import {
  getCommonTestAnswerFormat,
  isCommonTestAnswerCorrect,
  isCommonTestMarkSheetQuestion,
} from "@/lib/common-test-answer-normalize";
import { MarkSheetAnswerInput } from "./MarkSheetAnswerInput";

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
  const answerFormat = getCommonTestAnswerFormat(question);
  const usesMarkSheet = isCommonTestMarkSheetQuestion(question);
  const [draftAnswer, setDraftAnswer] = useState(selectedAnswer ?? "");
  const [selectedConfidence, setSelectedConfidence] =
    useState<CommonTestConfidence | null>(null);

  useEffect(() => {
    if (!isRevealed) setSelectedConfidence(null);
  }, [isRevealed]);

  useEffect(() => {
    setDraftAnswer(selectedAnswer ?? "");
  }, [question.id, selectedAnswer]);

  return (
    <div className="space-y-4">
      {usesMarkSheet ? (
        <MarkSheetAnswerInput
          question={question}
          value={draftAnswer}
          disabled={isRevealed}
          onChange={setDraftAnswer}
          onSubmit={onSelect}
          submitLabel="解答を確認する"
          helperText={
            answerFormat === "digits"
              ? "空欄のラベルに合わせて、左から順に数字を入力してください。"
              : "数値や短い語句をそのまま入力してください。"
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {(question.options ?? []).map((option, index) => {
            const label = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === option;
            const isCorrect = isCommonTestAnswerCorrect(option, question.correctAnswer, "choice");

            const stateClass = getChoiceStateClass({ isRevealed, isSelected, isCorrect });

            return (
              <button
                key={option}
                type="button"
                disabled={isRevealed}
                onClick={() => onSelect(option)}
                className={`flex items-start gap-3 rounded-2xl border p-4 text-left shadow-sm transition disabled:cursor-default ${stateClass}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-extrabold ring-1 ring-inset ring-slate-200">
                  {label}
                </span>
                <span className="min-w-0 flex-1 text-sm leading-6">
                  {isMath ? <RenderMath text={option} /> : option}
                </span>
                {isRevealed && isCorrect && (
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                )}
                {isRevealed && isSelected && !isCorrect && (
                  <XCircle className="mt-1 h-4 w-4 shrink-0 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {isRevealed && (
        <>
          <ExplanationPanel
            question={question}
            selectedAnswer={selectedAnswer}
            isMath={isMath}
          />
          <ConfidencePicker
            selected={selectedConfidence}
            onSelect={setSelectedConfidence}
          />
          <button
            type="button"
            onClick={() => onNext(selectedConfidence ?? "unsure")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 active:scale-[0.99] sm:w-auto"
          >
            {isLastQuestion ? "結果を見る" : "次の問題へ"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

function getChoiceStateClass({
  isRevealed,
  isSelected,
  isCorrect,
}: {
  isRevealed: boolean;
  isSelected: boolean;
  isCorrect: boolean;
}) {
  if (isRevealed && isCorrect) {
    return "border-emerald-200 bg-emerald-50 text-emerald-950";
  }
  if (isRevealed && isSelected && !isCorrect) {
    return "border-rose-200 bg-rose-50 text-rose-950";
  }
  if (isSelected) {
    return "border-blue-300 bg-blue-50 text-blue-950";
  }
  return "border-slate-200 bg-white text-slate-800 hover:border-blue-200 hover:bg-blue-50/60";
}

const CONFIDENCE_OPTIONS: {
  value: CommonTestConfidence;
  label: string;
  sub: string;
  className: string;
}[] = [
  {
    value: "confident",
    label: "自信あり",
    sub: "根拠を持って選べた",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  {
    value: "unsure",
    label: "少し不安",
    sub: "見直しで固めたい",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  {
    value: "guessed",
    label: "勘で解答",
    sub: "根拠が弱い",
    className: "border-orange-200 bg-orange-50 text-orange-700",
  },
  {
    value: "blank",
    label: "わからない",
    sub: "復習優先",
    className: "border-slate-200 bg-slate-50 text-slate-600",
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
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-extrabold text-slate-950">手応えを記録</div>
      <p className="mt-1 text-xs leading-5 text-slate-500">
        復習キューと弱点分析で、優先度を決めるために使います。
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-4">
        {CONFIDENCE_OPTIONS.map((option) => {
          const active = selected === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`rounded-xl border p-3 text-left transition ${
                active ? option.className : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white"
              }`}
            >
              <div className="text-sm font-bold">{option.label}</div>
              <div className="mt-1 text-xs opacity-80">{option.sub}</div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ExplanationPanel({
  question,
  selectedAnswer,
  isMath,
}: {
  question: CommonTestDrillQuestion;
  selectedAnswer: string | null;
  isMath: boolean;
}) {
  const answerFormat = getCommonTestAnswerFormat(question);
  const isCorrect =
    selectedAnswer !== null &&
    isCommonTestAnswerCorrect(selectedAnswer, question.correctAnswer, answerFormat);

  return (
    <section className="space-y-3">
      <div
        className={`flex items-start gap-3 rounded-2xl border p-4 shadow-sm ${
          isCorrect
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : "border-rose-200 bg-rose-50 text-rose-900"
        }`}
      >
        {isCorrect ? (
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        ) : (
          <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600" />
        )}
        <div>
          <div className="font-extrabold">{isCorrect ? "正解です" : "見直しましょう"}</div>
          {!isCorrect && (
            <div className="mt-1 text-sm">
              正答: <span className="font-bold">{question.correctAnswer}</span>
            </div>
          )}
        </div>
      </div>

      <ExplainBlock
        icon={<Target className="h-4 w-4" />}
        label="解説"
        colorClass="text-blue-700"
      >
        {isMath ? (
          <RenderMath text={question.explanation} block />
        ) : (
          <p className="text-sm leading-7 text-slate-700">{question.explanation}</p>
        )}
      </ExplainBlock>

      <ExplainBlock
        icon={<Lightbulb className="h-4 w-4" />}
        label="解き方"
        colorClass="text-violet-700"
      >
        <p className="text-sm leading-7 text-slate-700">{question.strategy}</p>
      </ExplainBlock>

      {question.trapExplanation && (
        <ExplainBlock
          icon={<AlertTriangle className="h-4 w-4" />}
          label="よくあるミス"
          colorClass="text-amber-700"
        >
          <p className="text-sm leading-7 text-slate-700">{question.trapExplanation}</p>
        </ExplainBlock>
      )}
    </section>
  );
}

function ExplainBlock({
  icon,
  label,
  colorClass,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  colorClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 flex items-center gap-2 text-sm font-extrabold ${colorClass}`}>
        {icon}
        {label}
      </div>
      {children}
    </div>
  );
}

export function RenderMath({ text, block }: { text: string; block?: boolean }) {
  if (!block) {
    const parts = text.split(/(\$[^$]+\$)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
            try {
              const html = katex.renderToString(part.slice(1, -1), {
                throwOnError: false,
                displayMode: false,
              });
              return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
            } catch {
              return <span key={i}>{part}</span>;
            }
          }
          return <span key={i}>{part}</span>;
        })}
      </>
    );
  }

  const segments = text.split(/(\$[^$]+\$)/g);
  return (
    <div className="space-y-2 text-sm leading-7 text-slate-700">
      {segments.map((segment, i) => {
        if (segment.startsWith("$") && segment.endsWith("$") && segment.length > 2) {
          try {
            const html = katex.renderToString(segment.slice(1, -1), {
              throwOnError: false,
              displayMode: false,
            });
            return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch {
            return <span key={i}>{segment}</span>;
          }
        }
        if (!segment.trim()) return null;
        return <span key={i}>{segment}</span>;
      })}
    </div>
  );
}
