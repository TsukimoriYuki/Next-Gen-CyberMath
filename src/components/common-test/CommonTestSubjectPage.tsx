// Server Component — 科目別ページの共通レイアウト
import Link from "next/link";
import { ArrowLeft, Clock, Target, AlertTriangle, ChevronRight, Zap } from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";
import { CommonTestSectionGrid } from "./CommonTestSectionGrid";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";

interface Props {
  subject: CommonTestSubject;
}

export function CommonTestSubjectPage({ subject }: Props) {
  const { theme, title, examMinutes, targetScoreDefault, estimatedScoreMock, description, sections, scoreRoutes } = subject;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.glowRgb},0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.glowRgb},0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${theme.glowRgb},0.08) 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
          style={{ color: `rgba(${theme.glowRgb},0.7)` }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* ── Subject Header ─────────────────────────────────────────────── */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
              style={{ background: `rgba(${theme.glowRgb},0.08)`, border: `1px solid rgba(${theme.glowRgb},0.25)`, color: theme.primary }}
            >
              COMMON TEST
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px]"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
            >
              <Clock className="h-3 w-3" />
              {examMinutes} min
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px]"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }}
            >
              <Target className="h-3 w-3" />
              目標 {targetScoreDefault}点
            </div>
          </div>

          <h1
            className="mt-5 font-display text-5xl font-extrabold tracking-tight sm:text-6xl"
            style={{
              background: `linear-gradient(135deg, ${theme.primary} 0%, #ffffff 55%, ${theme.secondary} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {title}
          </h1>

          <p className="mt-4 max-w-2xl font-mono text-sm leading-relaxed text-white/50">
            {description}
          </p>

          {/* Score status bar */}
          <div
            className="mt-6 flex items-center gap-4 rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div>
              <div className="font-mono text-[9px] text-white/35 uppercase tracking-wider">現在の推定スコア</div>
              <div className="font-mono text-2xl font-bold text-white">{estimatedScoreMock}</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1 font-mono text-[9px] text-white/30">
                <span>0</span>
                <span>{targetScoreDefault}点（目標）</span>
                <span>100</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((estimatedScoreMock / 100) * 100))}%`,
                    background: `linear-gradient(90deg, rgba(${theme.glowRgb},0.7), rgba(${theme.glowRgb},1))`,
                    boxShadow: `0 0 8px rgba(${theme.glowRgb},0.6)`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] text-white/35 uppercase tracking-wider">目標まで</div>
              <div className="font-mono text-2xl font-bold" style={{ color: theme.primary }}>
                +{targetScoreDefault - estimatedScoreMock}
              </div>
            </div>
          </div>
        </header>

        {/* ── 大問別ドリルパネル ────────────────────────────────────────────── */}
        <section className="mt-12">
          <SectionHeader color={theme.primary}>大問別ドリルパネル</SectionHeader>
          <p className="mb-4 font-mono text-[10px] text-white/35">
            各大問のテーマを確認し、弱点単元を重点的に演習する。
          </p>
          <CommonTestSectionGrid sections={sections} theme={theme} subjectId={subject.id} />
        </section>

        {/* ── 得点別攻略ルート ──────────────────────────────────────────────── */}
        <section className="mt-12">
          <SectionHeader color={theme.primary}>得点別攻略ルート</SectionHeader>
          <div className="grid gap-3 sm:grid-cols-3">
            {scoreRoutes.map((route) => (
              <div
                key={route.targetScore}
                className="rounded-xl p-4"
                style={{
                  background: `linear-gradient(145deg, rgba(${hexToRgb(route.accent)},0.06) 0%, rgba(0,0,0,0.4) 100%)`,
                  border: `1px solid rgba(${hexToRgb(route.accent)},0.22)`,
                }}
              >
                <div
                  className="font-display text-lg font-extrabold"
                  style={{ color: route.accent }}
                >
                  {route.label}
                </div>
                <div
                  className="mt-0.5 font-mono text-[10px] font-bold"
                  style={{ color: `rgba(${hexToRgb(route.accent)},0.6)` }}
                >
                  TARGET: {route.targetScore}点
                </div>
                <p className="mt-2 font-mono text-[10px] leading-relaxed text-white/50">
                  {route.strategy}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 本番再現 EXAM SIMULATOR（UNLOCKED）──────────────────────────── */}
        <section className="mt-12">
          <SectionHeader color={theme.primary}>本番再現 EXAM SIMULATOR</SectionHeader>
          <ExamSimulatorCard subject={subject} /></section>

        {/* ── WEAKNESS BOSS SYSTEM（COMING SOON）──────────────────────────── */}
        <section className="mt-8">
          <div
            className="flex items-center gap-4 rounded-2xl p-5"
            style={{
              background: "linear-gradient(135deg, rgba(244,63,94,0.05) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(244,63,94,0.15)",
            }}
          >
            <AlertTriangle className="h-8 w-8 shrink-0 text-rose-500/40" />
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-rose-400/60">
                WEAKNESS BOSS SYSTEM — COMING SOON
              </div>
              <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/35">
                大問別の正答率データから「弱点特異点」を自動検出し、
                そのボス問題を集中出題する個別強化システム。本番対策の最終兵器として実装予定。
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

// ── 共通セクションヘッダー ───────────────────────────────────────────────
function SectionHeader({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color }}>
        ▸ {children}
      </span>
      <div className="flex-1 h-px" style={{ background: `rgba(${hexToRgbFromCss(color)},0.2)` }} />
    </div>
  );
}

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}

function hexToRgbFromCss(color: string): string {
  return hexToRgb(color);
}

// ── Exam Simulator Card (unlocked) ──────────────────────────────────────
function ExamSimulatorCard({ subject }: { subject: CommonTestSubject }) {
  const examId = `${subject.id === "math-1a" ? "math-1a-70" : subject.id === "math-2bc" ? "math-2bc-70" : "english-reading-80"}`;
  const questions = getCommonTestExamQuestions(examId);
  const sectionCount = new Set(questions.map((q) => q.sectionId)).size;
  const { theme, examMinutes } = subject;

  return (
    <Link
      href={`/common-test/simulator/${examId}`}
      className="group flex items-center gap-5 rounded-2xl p-5 transition-all hover:opacity-90"
      style={{
        background: `linear-gradient(135deg, rgba(${theme.glowRgb},0.08) 0%, rgba(0,0,0,0.4) 100%)`,
        border: `1px solid rgba(${theme.glowRgb},0.28)`,
        boxShadow: `0 0 30px rgba(${theme.glowRgb},0.06)`,
      }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-extrabold"
        style={{
          background: `rgba(${theme.glowRgb},0.14)`,
          border: `1px solid rgba(${theme.glowRgb},0.35)`,
          color: theme.primary,
        }}
      >
        {examMinutes}m
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="font-display text-base font-extrabold text-white">
            [{examMinutes}分] EXAM SIMULATOR
          </div>
          <div
            className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
            style={{ background: `rgba(${theme.glowRgb},0.14)`, border: `1px solid rgba(${theme.glowRgb},0.30)`, color: theme.primary }}
          >
            NEW
          </div>
        </div>
        <p className="font-mono text-[10px] text-white/45 leading-relaxed">
          {sectionCount}大問 · {questions.length}問 · 本番形式通し試験。時間内スコアと時間外スコアで実力を二重評価。
        </p>
      </div>

      <div
        className="shrink-0 flex items-center gap-1.5 rounded-xl px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all group-hover:opacity-80"
        style={{
          background: `rgba(${theme.glowRgb},0.16)`,
          border: `1px solid rgba(${theme.glowRgb},0.38)`,
          color: theme.primary,
        }}
      >
        <Zap className="h-3.5 w-3.5" />
        開始
      </div>
    </Link>
  );
}
