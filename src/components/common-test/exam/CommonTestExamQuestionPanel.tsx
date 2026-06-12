"use client";

// 試験中の問題表示 — 本物の共通テスト紙面に近いレイアウト
import katex from "katex";
import { Flag } from "lucide-react";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestConfidence } from "@/lib/common-test-history";
import { isCommonTestMarkSheetQuestion } from "@/lib/common-test-answer-normalize";
import { MarkSheetAnswerInput } from "@/components/common-test/MarkSheetAnswerInput";

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

const CONFIDENCE_OPTIONS: { value: CommonTestConfidence; label: string }[] = [
  { value: "confident", label: "自信あり" },
  { value: "unsure", label: "少し不安" },
  { value: "guessed", label: "勘で解答" },
  { value: "blank", label: "わからない" },
];

/** ①②③… のマーク番号（共通テストのマークシート風） */
function circledNumber(idx: number): string {
  if (idx < 20) return String.fromCharCode(0x2460 + idx);
  return String(idx + 1);
}

export function CommonTestExamQuestionPanel({
  question,
  questionNumber,
  selectedAnswer,
  markedForReview,
  confidence,
  onAnswer,
  onToggleFlag,
  onSetConfidence,
}: Props) {
  const isMath = question.subjectId !== "english-reading";
  const isEnglishReading = question.subjectId === "english-reading";
  const usesMarkSheet = isCommonTestMarkSheetQuestion(question);
  const sectionNum = parseInt(question.sectionId.replace("section-", ""), 10);

  return (
    <div
      className="rounded-lg p-5 sm:p-7 space-y-5"
      style={{ background: "#ffffff", border: "1px solid #d1d5db", color: "#1f2937" }}
    >
      {/* Question header */}
      <div className="flex items-start justify-between gap-3 pb-3" style={{ borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-base font-bold" style={{ color: "#111827" }}>
            第{sectionNum}問
          </span>
          <span className="text-sm" style={{ color: "#4b5563" }}>
            問{questionNumber}
          </span>
          <ExamStageBadge question={question} />
        </div>

        {/* Flag button */}
        <button
          type="button"
          onClick={onToggleFlag}
          className="shrink-0 flex items-center gap-1.5 rounded px-3 py-1.5 text-xs font-bold transition-all hover:opacity-75 active:scale-95"
          style={{
            background: markedForReview ? "#fef3c7" : "#ffffff",
            border: markedForReview ? "1px solid #f59e0b" : "1px solid #d1d5db",
            color: markedForReview ? "#92400e" : "#6b7280",
          }}
        >
          <Flag className={`h-3.5 w-3.5 ${markedForReview ? "fill-current" : ""}`} />
          あとで見直す
        </button>
      </div>

      <ExamSharedMaterial question={question} isMath={isMath} />

      {/* Passage (English) */}
      {question.passage && (
        <div className="rounded p-4 sm:p-5" style={{ background: "#fafafa", border: "1px solid #e5e7eb" }}>
          <pre
            className="font-sans text-[15px] leading-[1.9] whitespace-pre-wrap"
            style={{ color: "#1f2937" }}
          >
            {question.passage}
          </pre>
        </div>
      )}

      {/* Context (table / info / dialogue) */}
      {question.context && (
        <div className="rounded p-4 sm:p-5" style={{ background: "#fafafa", border: "1px solid #e5e7eb" }}>
          <pre
            className={`${isMath ? "font-sans" : "font-mono"} text-sm leading-[1.9] whitespace-pre-wrap`}
            style={{ color: "#1f2937" }}
          >
            {isMath ? <RenderMath text={question.context} /> : question.context}
          </pre>
        </div>
      )}

      {/* Statement */}
      <div className="text-[15px] leading-[1.9]" style={{ color: "#111827" }}>
        {isMath ? <RenderMath text={question.statement} /> : question.statement}
      </div>

      {/* Answer options */}
      {usesMarkSheet ? (
        <MarkSheetAnswerInput
          question={question}
          value={selectedAnswer ?? ""}
          onChange={onAnswer}
          helperText="本番演習中は、入力した内容がそのまま答案として保存されます。"
        />
      ) : (
        <div className={isEnglishReading ? "space-y-3" : "space-y-2"}>
          {(question.options ?? []).map((opt, idx) => {
            const isSelected = selectedAnswer === opt;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => onAnswer(opt)}
                className="flex w-full min-w-0 items-start gap-3 rounded p-3 text-left transition-all duration-100 hover:opacity-85 active:scale-[0.995]"
                style={{
                  background: isSelected ? "#eff6ff" : "#ffffff",
                  border: isSelected ? "2px solid #2563eb" : "1px solid #d1d5db",
                }}
              >
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-base font-bold"
                  style={{ color: isSelected ? "#2563eb" : "#4b5563" }}
                >
                  {circledNumber(idx)}
                </span>
                <span
                  className={`min-w-0 flex-1 whitespace-normal break-words text-[15px] leading-relaxed ${
                    isEnglishReading ? "sm:text-base sm:leading-7" : ""
                  }`}
                  style={{ color: "#1f2937", fontWeight: isSelected ? 600 : 400 }}
                >
                  {isMath ? <RenderMath text={opt} /> : opt}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Confidence picker */}
      <div className="pt-2" style={{ borderTop: "1px solid #f3f4f6" }}>
        <div className="text-[11px] mb-2" style={{ color: "#9ca3af" }}>
          手応えを記録（任意・採点後の分析に使われます）
        </div>
        <div className="flex flex-wrap gap-1.5">
          {CONFIDENCE_OPTIONS.map((opt) => {
            const isSelected = confidence === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSetConfidence(opt.value)}
                className="rounded px-3 py-1.5 text-xs transition-all hover:opacity-75 active:scale-95"
                style={{
                  background: isSelected ? "#374151" : "#ffffff",
                  border: isSelected ? "1px solid #374151" : "1px solid #d1d5db",
                  color: isSelected ? "#ffffff" : "#6b7280",
                  fontWeight: isSelected ? 700 : 400,
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
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-bold" style={{ color: "#374151" }}>
        解答欄
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="数値を入力"
        className="w-full max-w-xs rounded px-4 py-3 font-mono text-base outline-none transition-all"
        style={{
          background: "#ffffff",
          border: value ? "2px solid #2563eb" : "1px solid #9ca3af",
          color: "#111827",
        }}
      />
    </div>
  );
}

function ExamStageBadge({ question }: { question: CommonTestDrillQuestion }) {
  if (!question.subQuestionIndex && !question.difficultyStage) return null;

  const stageLabel = {
    basic: "基本確認",
    standard: "標準",
    guided: "誘導",
    advanced: "応用",
  }[question.difficultyStage ?? "standard"];

  return (
    <span
      className="rounded-full px-2.5 py-1 text-[11px] font-bold"
      style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#374151" }}
    >
      {question.subQuestionIndex ? `小問${question.subQuestionIndex}` : "小問"}・{stageLabel}
      {question.dependsOnPrevious ? "・前問利用" : ""}
    </span>
  );
}

function ExamSharedMaterial({
  question,
  isMath,
}: {
  question: CommonTestDrillQuestion;
  isMath: boolean;
}) {
  const hasMaterial =
    question.examContext ||
    question.examPassage ||
    question.sharedStem ||
    question.sharedData;

  if (!hasMaterial) return null;

  const renderText = (text: string) => (isMath ? <RenderMath text={text} /> : text);

  return (
    <div
      className="rounded-lg p-4 sm:p-5 space-y-4"
      style={{ background: "#f8fafc", border: "1px solid #cbd5e1", color: "#1f2937" }}
    >
      <div className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: "#475569" }}>
        共通設定・資料
      </div>

      {question.examContext && (
        <div className="text-[14px] leading-[1.9] whitespace-pre-wrap">
          {renderText(question.examContext)}
        </div>
      )}

      {question.examPassage && (
        <div className="text-[14px] leading-[1.9] whitespace-pre-wrap">
          {question.examPassage}
        </div>
      )}

      {question.sharedData && (
        <div className="overflow-x-auto rounded border border-slate-200 bg-white">
          {question.sharedData.title && (
            <div className="border-b border-slate-200 px-3 py-2 text-xs font-bold text-slate-600">
              {renderText(question.sharedData.title)}
            </div>
          )}
          {question.sharedData.headers?.length ? (
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  {question.sharedData.headers.map((header) => (
                    <th
                      key={header}
                      className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-bold text-slate-600"
                    >
                      {renderText(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(question.sharedData.rows ?? []).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={`${rowIndex}-${cellIndex}`}
                        className="border-b border-slate-100 px-3 py-2 text-slate-800"
                      >
                        {renderText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {question.sharedData.notes?.length ? (
            <div className="space-y-1 px-3 py-2 text-xs leading-relaxed text-slate-500">
              {question.sharedData.notes.map((note) => (
                <p key={note}>{renderText(note)}</p>
              ))}
            </div>
          ) : null}
        </div>
      )}

      {question.sharedStem && (
        <div
          className="rounded border border-blue-100 px-3 py-2 text-[13px] leading-relaxed"
          style={{ background: "#eff6ff", color: "#1e3a8a" }}
        >
          {renderText(question.sharedStem)}
        </div>
      )}
    </div>
  );
}

// ── KaTeX renderer ────────────────────────────────────────────────────────
function RenderMath({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
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
