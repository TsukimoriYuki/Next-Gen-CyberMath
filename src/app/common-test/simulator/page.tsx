import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Zap } from "lucide-react";
import { getAllCommonTestExamPresets } from "@/data/common-test-exams";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";

export const metadata: Metadata = {
  title: "EXAM SIMULATOR — COMMON TEST COMMAND CENTER",
  description: "共通テスト本番形式70/80分模擬試験。時間内スコア・時間外スコアの二重評価で本番対応力を測定する。",
};

const SUBJECT_ORDER: Record<string, number> = {
  "math-1a": 0,
  "math-2bc": 1,
  "english-reading": 2,
};

export default function SimulatorIndexPage() {
  const presets = [...getAllCommonTestExamPresets()].sort((a, b) => {
    const sa = SUBJECT_ORDER[a.subjectId] ?? 9;
    const sb = SUBJECT_ORDER[b.subjectId] ?? 9;
    if (sa !== sb) return sa - sb;
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400/50 transition-colors hover:text-amber-400/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.22)", color: "#fbbf24" }}
          >
            <Zap className="h-3.5 w-3.5" />
            EXAM SIMULATOR
          </div>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #ffffff 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            本番再現
            <br />
            模擬試験
          </h1>

          <p className="mt-4 max-w-xl font-mono text-sm leading-relaxed text-white/40">
            本番と同じ時間制限で全大問を通しで解く。
            時間内スコアと時間外スコアを二重評価し、本番対応力の現在地を測定する。
          </p>

          {/* Dual score explanation */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-lg">
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.18)" }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400/70 mb-1">
                TIME-LIMIT SCORE
              </div>
              <div className="font-mono text-xs text-white/55 leading-relaxed">
                時間内に回答した問題の正答数。これが本番の実力。
              </div>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.18)" }}
            >
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400/70 mb-1">
                UNLIMITED SCORE
              </div>
              <div className="font-mono text-xs text-white/55 leading-relaxed">
                時間を気にせず全問回答した場合の正答数。知識の上限を示す。
              </div>
            </div>
          </div>
        </header>

        {/* Exam preset cards */}
        <section>
          <div className="grid gap-5 sm:grid-cols-3">
            {presets.map((preset) => (
              <ExamPresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        </section>

        <footer className="mt-16 text-center font-mono text-[10px] tracking-[0.2em] text-white/15 uppercase">
          CYBER OS · Exam Simulator · Phase 5
        </footer>
      </div>
    </div>
  );
}

function ExamPresetCard({ preset }: { preset: CommonTestExamPreset }) {
  const minutes = preset.examLimitSec / 60;
  const questions = getCommonTestExamQuestions(preset.id);
  const sectionCount = new Set(questions.map((q) => q.sectionId)).size;

  return (
    <div
      className="relative flex flex-col gap-4 rounded-2xl p-5 transition-all duration-300"
      style={{
        background: `linear-gradient(145deg, rgba(${preset.theme.glowRgb},0.06) 0%, rgba(0,0,0,0.5) 100%)`,
        border: `1px solid rgba(${preset.theme.glowRgb},0.22)`,
      }}
    >
      {/* Icon + round badge */}
      <div className="flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl font-mono text-sm font-extrabold"
          style={{
            background: `rgba(${preset.theme.glowRgb},0.12)`,
            border: `1px solid rgba(${preset.theme.glowRgb},0.30)`,
            color: preset.theme.primary,
          }}
        >
          {preset.icon}
        </div>
        {preset.roundLabel && (
          <span
            className="rounded-full px-2.5 py-1 font-mono text-[10px] font-bold"
            style={{
              background: `rgba(${preset.theme.glowRgb},0.10)`,
              border: `1px solid rgba(${preset.theme.glowRgb},0.28)`,
              color: preset.theme.primary,
            }}
          >
            {preset.roundLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <div className="font-display text-base font-extrabold text-white leading-tight">
          {preset.subjectId === "math-1a"
            ? "数学IA"
            : preset.subjectId === "math-2bc"
            ? "数学II・B・C"
            : "英語リーディング"}
        </div>
        <div className="mt-0.5 font-mono text-[10px]" style={{ color: preset.theme.primary }}>
          {preset.shortTitle}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 flex-wrap">
        <StatPill icon={<Clock className="h-3 w-3" />} label={`${minutes}分`} color={preset.theme.primary} />
        <StatPill icon={<BookOpen className="h-3 w-3" />} label={`${sectionCount}大問`} color={preset.theme.primary} />
        <StatPill icon={<Zap className="h-3 w-3" />} label={`${questions.length}問`} color={preset.theme.primary} />
      </div>

      {/* Description */}
      <p className="font-mono text-[10px] leading-relaxed text-white/40 flex-1">
        {preset.description}
      </p>

      {/* Start button */}
      <Link
        href={`/common-test/simulator/${preset.id}`}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, rgba(${preset.theme.glowRgb},0.25), rgba(${preset.theme.glowRgb},0.12))`,
          border: `1px solid rgba(${preset.theme.glowRgb},0.40)`,
          color: preset.theme.primary,
          boxShadow: `0 0 20px rgba(${preset.theme.glowRgb},0.12)`,
        }}
      >
        <Zap className="h-3.5 w-3.5" />
        試験を開始
      </Link>
    </div>
  );
}

function StatPill({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[9px]"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.45)" }}
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </div>
  );
}
