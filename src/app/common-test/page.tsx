import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Cpu, History, Zap, Brain, RefreshCw, CalendarDays, ShieldAlert } from "lucide-react";
import { COMMON_TEST_SUBJECTS, DAILY_MISSIONS } from "@/data/common-test";
import { CommonTestTargetScorePanel } from "@/components/common-test/CommonTestTargetScorePanel";
import { CommonTestMissionCard } from "@/components/common-test/CommonTestMissionCard";
import { CommonTestSubjectCard } from "@/components/common-test/CommonTestSubjectCard";
import { CommonTestAnalyticsSummary } from "@/components/common-test/CommonTestAnalyticsSummary";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";
import { CommonTestDailyPlaylistPanel } from "@/components/common-test/CommonTestDailyPlaylistPanel";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";

export const metadata: Metadata = {
  title: "COMMON TEST COMMAND CENTER",
  description:
    "共通テスト戦術司令室。数学IA・数学II/B/C・英語Rを統合管理し、弱点特定から本番再現まで一貫して攻略する。",
};

export default function CommonTestPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glows */}
      <div
        className="pointer-events-none absolute -top-80 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-60 -right-60 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-white/35 transition-colors hover:text-white/65"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          ポータルへ戻る
        </Link>

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <header className="mt-10 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em]"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.28)",
              color: "#fbbf24",
            }}
          >
            <Cpu className="h-3.5 w-3.5" />
            COMMON TEST COMMAND CENTER
          </div>

          <h1
            className="mt-5 font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            style={{
              background: "linear-gradient(135deg, #fbbf24 0%, #ffffff 45%, #22d3ee 85%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.1,
            }}
          >
            共通テスト
            <br />
            戦術司令室
          </h1>

          <p className="mt-5 mx-auto max-w-xl font-mono text-sm leading-relaxed text-white/45">
            数学IA・数学II/B/C・英語リーディングを一元管理する。
            <br />
            大問別演習 → 弱点検出 → 本番再現 → 目標突破。
          </p>

          {/* Scan line decoration */}
          <div
            className="mx-auto mt-8 h-px max-w-sm"
            style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.4), rgba(34,211,238,0.4), transparent)" }}
          />
        </header>

        {/* ══ STATUS PANEL ════════════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel>◈ SYSTEM STATUS — Score Tracker</SectionLabel>
          <CommonTestTargetScorePanel />
        </section>

        {/* ══ DAILY PLAYLIST ══════════════════════════════════════════════════ */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
              <CalendarDays className="inline h-3.5 w-3.5 mr-1.5 align-middle" />
              TODAY&apos;S STUDY PLAYLIST — 今日の学習メニュー
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <CommonTestDailyPlaylistPanel showFullLink={true} />
        </section>

        {/* ══ WEAKNESS BOSS ═══════════════════════════════════════════════════ */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
              <ShieldAlert className="inline h-3.5 w-3.5 mr-1.5 align-middle" />
              WEAKNESS BOSS — 弱点攻略システム
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <CommonTestWeaknessBossPanel compact={true} showFullLink={false} />
        </section>

        {/* ══ TODAY'S MISSIONS ════════════════════════════════════════════════ */}
        <section className="mt-12">
          <SectionLabel>⚡ TODAY'S SPECIAL MISSION</SectionLabel>
          <p className="mb-4 font-mono text-[10px] text-white/35">
            今日の特命ミッション — 各科目から1問、集中して撃破せよ。
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {DAILY_MISSIONS.map((m, i) => (
              <CommonTestMissionCard key={m.id} mission={m} index={i} />
            ))}
          </div>
        </section>

        {/* ══ ANALYTICS SUMMARY ══════════════════════════════════════════════ */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
              ◉ ANALYTICS — 演習データ分析
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <Link
              href="/common-test/history"
              className="shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[10px] transition-all hover:opacity-80"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <History className="h-3 w-3" />
              演習履歴
            </Link>
          </div>
          <CommonTestAnalyticsSummary />
        </section>

        {/* ══ REVIEW QUEUE SUMMARY ════════════════════════════════════════════ */}
        <section className="mt-6">
          <CommonTestReviewSummary />
        </section>

        {/* ══ SUBJECT ACCESS BOARD ════════════════════════════════════════════ */}
        <section className="mt-12">
          <SectionLabel>▸ SUBJECT ACCESS BOARD</SectionLabel>
          <p className="mb-4 font-mono text-[10px] text-white/35">
            科目を選択して大問別演習・得点ルート・シミュレーションへ進む。
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {COMMON_TEST_SUBJECTS.map((s) => (
              <CommonTestSubjectCard key={s.id} subject={s} />
            ))}
          </div>
        </section>

        {/* ══ EXAM SIMULATOR ══════════════════════════════════════════════════ */}
        <section className="mt-12">
          <SectionLabel>⚡ EXAM SIMULATOR — 本番再現模擬試験</SectionLabel>
          <p className="mb-4 font-mono text-[10px] text-white/35">
            70分/80分の本番形式で全大問を通し実施。時間内スコアと時間外スコアを二重評価する。
          </p>
          <Link
            href="/common-test/simulator"
            className="group flex items-center gap-4 rounded-2xl p-5 transition-all hover:opacity-90"
            style={{
              background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(34,211,238,0.05) 100%)",
              border: "1px solid rgba(251,191,36,0.25)",
              boxShadow: "0 0 30px rgba(251,191,36,0.06)",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.30)" }}
            >
              <Zap className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display text-base font-extrabold text-white">
                  EXAM SIMULATOR
                </span>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(251,191,36,0.12)", border: "1px solid rgba(251,191,36,0.28)", color: "#fbbf24" }}
                >
                  NEW
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/40">
                数IA 70分 · 数IIB 70分 · 英語R 80分 — 3科目の本番形式模擬試験
              </p>
            </div>
            <div
              className="shrink-0 rounded-xl px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all group-hover:opacity-80"
              style={{ background: "rgba(251,191,36,0.14)", border: "1px solid rgba(251,191,36,0.35)", color: "#fbbf24" }}
            >
              開く →
            </div>
          </Link>
        </section>

        {/* ══ AI TOOLS ════════════════════════════════════════════════════════ */}
        <section className="mt-12">
          <SectionLabel>🧠 AI TOOLS — 分析・復習支援</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">

            {/* AI作戦会議 */}
            <Link
              href="/common-test/history"
              className="group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, rgba(34,211,238,0.07) 0%, rgba(168,85,247,0.05) 100%)",
                border: "1px solid rgba(34,211,238,0.22)",
                boxShadow: "0 0 24px rgba(34,211,238,0.05)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.28)" }}
                >
                  <Brain className="h-5 w-5 text-cyan-400" />
                </div>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.25)", color: "#22d3ee" }}
                >
                  ACTIVE
                </span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">AI作戦会議</div>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/45">
                  本番演習の結果から、時間配分・弱点・次にやるべき演習を分析します。
                </p>
              </div>
              <div
                className="mt-auto rounded-lg py-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-wider transition-all group-hover:opacity-80"
                style={{ background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.22)", color: "#22d3ee" }}
              >
                履歴から分析を開く →
              </div>
            </Link>

            {/* 復習キュー */}
            <Link
              href="/common-test/review"
              className="group flex flex-col gap-3 rounded-2xl p-5 transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, rgba(16,185,129,0.07) 0%, rgba(34,211,238,0.04) 100%)",
                border: "1px solid rgba(16,185,129,0.22)",
                boxShadow: "0 0 24px rgba(16,185,129,0.05)",
              }}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.28)" }}
                >
                  <RefreshCw className="h-5 w-5 text-emerald-400" />
                </div>
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)", color: "#10b981" }}
                >
                  ACTIVE
                </span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">復習キュー</div>
                <p className="mt-1 font-mono text-[10px] leading-relaxed text-white/45">
                  間違えた問題や再確認したい問題を、復習タイミングに合わせて確認します。
                </p>
              </div>
              <div
                className="mt-auto rounded-lg py-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-wider transition-all group-hover:opacity-80"
                style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.22)", color: "#10b981" }}
              >
                今日の復習を見る →
              </div>
            </Link>

          </div>
        </section>

        {/* Footer label */}
        <p className="mt-16 text-center font-mono text-[10px] tracking-[0.2em] text-white/15 uppercase">
          CYBER OS · Common Test Command Center · Phase 9 Ready
        </p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
        {children}
      </span>
      <div className="flex-1 h-px bg-white/6" />
    </div>
  );
}
