"use client";

import { Flag, Send, Clock, AlertTriangle } from "lucide-react";
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

  const timerColor = isOvertime
    ? "#ef4444"
    : remainingSec < 300
    ? "#f97316"
    : `rgba(${preset.theme.glowRgb},1)`;

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "rgba(0,0,0,0.90)",
        borderBottom: `1px solid rgba(${preset.theme.glowRgb},0.15)`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Progress bar */}
      <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full transition-all duration-1000"
          style={{
            width: `${progressPct}%`,
            background: isOvertime
              ? "rgba(239,68,68,0.7)"
              : `linear-gradient(90deg, rgba(${preset.theme.glowRgb},0.5), rgba(${preset.theme.glowRgb},1))`,
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 sm:gap-5">
        {/* Subject badge */}
        <div
          className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em]"
          style={{
            background: `rgba(${preset.theme.glowRgb},0.10)`,
            border: `1px solid rgba(${preset.theme.glowRgb},0.28)`,
            color: preset.theme.primary,
          }}
        >
          {preset.icon}
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
              className="font-mono text-lg font-extrabold tabular-nums"
              style={{ color: timerColor }}
            >
              {isOvertime ? "+" : ""}
              {isOvertime ? formatTime(elapsedSec - preset.examLimitSec) : formatTime(remainingSec)}
            </span>
            <span className="font-mono text-[8px] text-white/25 uppercase tracking-wider">
              {isOvertime ? "overtime" : "remaining"}
            </span>
          </div>
        </div>

        {/* OVERTIME badge */}
        {isOvertime && (
          <div
            className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-[0.15em] animate-pulse"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.40)", color: "#ef4444" }}
          >
            OVERTIME
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Question position */}
        <div className="flex items-center gap-1 font-mono text-[10px] text-white/35">
          <span className="font-bold text-white/60">{currentIdx + 1}</span>
          <span>/</span>
          <span>{totalQuestions}</span>
        </div>

        {/* Unanswered warning */}
        {unansweredCount > 0 && (
          <div
            className="hidden sm:flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-[9px]"
            style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.22)", color: "#fbbf24" }}
          >
            <Flag className="h-3 w-3" />
            未回答 {unansweredCount}
          </div>
        )}

        {/* Finish button */}
        <button
          type="button"
          onClick={onFinish}
          className="flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-[0.97]"
          style={{
            background: isOvertime
              ? "rgba(239,68,68,0.18)"
              : `rgba(${preset.theme.glowRgb},0.15)`,
            border: isOvertime
              ? "1px solid rgba(239,68,68,0.40)"
              : `1px solid rgba(${preset.theme.glowRgb},0.38)`,
            color: isOvertime ? "#ef4444" : preset.theme.primary,
          }}
        >
          <Send className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">提出する</span>
          <span className="sm:hidden">提出</span>
        </button>
      </div>
    </header>
  );
}
