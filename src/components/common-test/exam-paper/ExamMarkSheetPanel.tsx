"use client";

import { Flag, XCircle } from "lucide-react";
import type { ExamAnswerSlot, ExamPaper } from "@/data/exam-papers";
import type { ExamPaperAnswers, ExamPaperFlags } from "@/lib/exam-paper-scoring";
import { scoreExamPaper } from "@/lib/exam-paper-scoring";

type MarkSheetMode = "taking" | "submitted" | "review";

interface Props {
  paper: ExamPaper;
  answers: ExamPaperAnswers;
  flags: ExamPaperFlags;
  mode: MarkSheetMode;
  onAnswerChange: (slotId: string, value: string) => void;
  onToggleFlag: (slotId: string) => void;
}

export function ExamMarkSheetPanel({
  paper,
  answers,
  flags,
  mode,
  onAnswerChange,
  onToggleFlag,
}: Props) {
  const score = scoreExamPaper(paper, answers);
  const disabled = mode !== "taking";

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-sm font-extrabold text-slate-950">マークシート</h2>
        <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500">
          <span>{paper.questionCount}小問</span>
          <span>/</span>
          <span>{paper.answerSlots.length}マーク</span>
          <span>/</span>
          <span>未入力 {score.unansweredCount}</span>
        </div>
      </div>

      {score.unansweredCount > 0 && mode === "taking" && (
        <div className="mx-4 mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
          未入力のマーク欄があります。提出前に一覧で確認できます。
        </div>
      )}

      <div className="max-h-[70vh] space-y-5 overflow-y-auto p-4">
        {paper.sections.map((section) => {
          const sectionSlots = paper.answerSlots.filter((slot) =>
            section.answerSlotIds.includes(slot.id),
          );
          const sectionScore = score.sectionScores.find((s) => s.sectionId === section.id);
          return (
            <section key={section.id} className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{section.title}</div>
                  <div className="mt-0.5 text-[11px] text-slate-500">
                    {section.questionCount}小問 / {sectionSlots.length}マーク
                  </div>
                </div>
                {mode !== "taking" && sectionScore && (
                  <div className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-xs font-bold text-slate-700">
                    {formatScore(sectionScore.score)} / {formatScore(sectionScore.maxScore)}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {sectionSlots.map((slot) => (
                  <MarkSlot
                    key={slot.id}
                    slot={slot}
                    value={answers[slot.id] ?? ""}
                    flagged={!!flags[slot.id]}
                    disabled={disabled}
                    mode={mode}
                    isCorrect={
                      mode === "taking"
                        ? undefined
                        : (answers[slot.id] ?? "") !== "" &&
                          answers[slot.id] === slot.correctAnswer
                    }
                    onAnswerChange={onAnswerChange}
                    onToggleFlag={onToggleFlag}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </aside>
  );
}

function MarkSlot({
  slot,
  value,
  flagged,
  disabled,
  mode,
  isCorrect,
  onAnswerChange,
  onToggleFlag,
}: {
  slot: ExamAnswerSlot;
  value: string;
  flagged: boolean;
  disabled: boolean;
  mode: MarkSheetMode;
  isCorrect?: boolean;
  onAnswerChange: (slotId: string, value: string) => void;
  onToggleFlag: (slotId: string) => void;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        mode === "taking"
          ? "border-slate-200 bg-slate-50"
          : isCorrect
            ? "border-emerald-200 bg-emerald-50"
            : "border-rose-200 bg-rose-50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-slate-300 bg-white px-2 font-bold text-slate-950">
            {slot.label}
          </span>
          <div>
            <div className="text-xs font-bold text-slate-700">
              {slot.groupLabel ?? "解答欄"} / {slot.type}
            </div>
            {mode !== "taking" && (
              <div className="mt-0.5 text-[11px] text-slate-500">
                正答 {slot.correctAnswer || "未設定"}
              </div>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => onToggleFlag(slot.id)}
          disabled={disabled && mode !== "submitted"}
          aria-pressed={flagged}
          data-flag-slot-id={slot.id}
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            flagged
              ? "border-amber-300 bg-amber-100 text-amber-700"
              : "border-slate-200 bg-white text-slate-500 hover:border-amber-200 hover:text-amber-700"
          } disabled:cursor-not-allowed disabled:opacity-50`}
          aria-label={`${slot.label}を見直しフラグにする`}
        >
          <Flag className={`h-4 w-4 ${flagged ? "fill-current" : ""}`} />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {slot.choices.map((choice) => {
          const active = value === choice;
          return (
            <button
              key={choice}
              type="button"
              disabled={disabled}
              onClick={() => onAnswerChange(slot.id, active ? "" : choice)}
              aria-pressed={active}
              data-slot-id={slot.id}
              data-choice={choice}
              className={`min-h-9 rounded-lg border px-2 py-1 font-mono text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                active
                  ? "border-blue-500 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50"
              } disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function formatScore(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}
