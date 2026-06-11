"use client";

// 試験中ヘッダー — 本番の試験画面に近い紙面風デザイン
import { Send, Clock, AlertTriangle } from "lucide-react";
import type { CommonTestExamPreset } from "@/data/common-test-exams";

interface Props {
  preset: CommonTestExamPreset;
  elapsedSec: number;
  phase: "running" | "overtime";
  currentIdx: number;
  totalQuestions: number;
  unansweredCount: number;
  onFinish: () => void;
}

function formatTime(sec: number): string {
  const m = Math.floor(Math.abs(sec) / 60);
  const s = Math.abs(sec) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CommonTestExamHeader({
  preset,
  elapsedSec,
  phase,
  currentIdx,
  totalQuestions,
  unansweredCount,
  onFinish,
}: Props) {
  const remainingSec = preset.examLimitSec - elapsedSec;
  const isOvertime = phase === "overtime";
  const progressPct = Math.min(100, Math.round((elapsedSec / preset.examLimitSec) * 100));

  const timerColor = isOvertime ? "#dc2626" : remainingSec < 300 ? "#ea580c" : "#111827";

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ background: "#ffffff", borderBottom: "1px solid #d1d5db" }}
    >
      {/* Progress bar */}
      <div className="h-1 w-full" style={{ background: "#e5e7eb" }}>
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${progressPct}%`,
            background: isOvertime ? "#dc2626" : "#6b7280",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-2.5 flex items-center gap-3 sm:gap-5">
        {/* Subject badge */}
        <div
          className="hidden sm:flex shrink-0 items-center rounded px-3 py-1.5 text-xs font-bold"
          style={{ border: "1px solid #9ca3af", color: "#374151", background: "#f9fafb" }}
        >
          {preset.shortTitle}
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2">
          {isOvertime ? (
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: timerColor }} />
          ) : (
            <Clock className="h-4 w-4 shrink-0" style={{ color: timerColor }} />
          )}
          <div className="flex flex-col leading-none">
            <span
              className="font-mono text-lg font-bold tabular-nums"
              style={{ color: timerColor }}
            >
              {isOvertime ? "+" : ""}
              {isOvertime ? formatTime(elapsedSec - preset.examLimitSec) : formatTime(remainingSec)}
            </span>
            <span className="text-[10px]" style={{ color: "#6b7280" }}>
              {isOvertime ? "時間超過" : "残り時間"}
            </span>
          </div>
        </div>

        {/* Overtime badge */}
        {isOvertime && (
          <div
            className="shrink-0 rounded px-2 py-0.5 text-[10px] font-bold"
            style={{ background: "#fef2f2", border: "1px solid #fca5a5", color: "#dc2626" }}
          >
            時間超過中
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Question position */}
        <div className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
          <span className="font-bold" style={{ color: "#111827" }}>{currentIdx + 1}</span>
          <span>/</span>
          <span>{totalQuestions}</span>
        </div>

        {/* Unanswered count */}
        {unansweredCount > 0 && (
          <div
            className="hidden sm:flex items-center rounded px-2 py-1 text-[11px]"
            style={{ background: "#fffbeb", border: "1px solid #fcd34d", color: "#92400e" }}
          >
            未解答 {unansweredCount}
          </div>
        )}

        {/* Finish button */}
        <button
          type="button"
          onClick={onFinish}
          className="flex shrink-0 items-center gap-1.5 rounded px-4 py-2 text-xs font-bold transition-all hover:opacity-85 active:scale-[0.97]"
          style={{
            background: isOvertime ? "#dc2626" : "#111827",
            color: "#ffffff",
          }}
        >
          <Send className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">解答を提出する</span>
          <span className="sm:hidden">提出</span>
        </button>
      </div>
    </header>
  );
}
