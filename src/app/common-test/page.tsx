import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, History, Zap, Brain, RefreshCw, CalendarDays, ShieldAlert, BookOpen, GraduationCap } from "lucide-react";
import { COMMON_TEST_SUBJECTS, DAILY_MISSIONS } from "@/data/common-test";
import { CommonTestTargetScorePanel } from "@/components/common-test/CommonTestTargetScorePanel";
import { CommonTestMissionCard } from "@/components/common-test/CommonTestMissionCard";
import { CommonTestSubjectCard } from "@/components/common-test/CommonTestSubjectCard";
import { CommonTestAnalyticsSummary } from "@/components/common-test/CommonTestAnalyticsSummary";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";
import { CommonTestDailyPlaylistPanel } from "@/components/common-test/CommonTestDailyPlaylistPanel";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";

export const metadata: Metadata = {
  title: "共通テスト対策室",
  description:
    "数学IA・数学II/B/C・英語リーディングを一元管理する共通テスト対策ダッシュボード。大問別演習・弱点分析・本番演習・AI作戦会議を一画面から。",
};

export default function CommonTestPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* Subtle academic grid — cyber accent, very faint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 480px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 480px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          ポータルへ戻る
        </Link>

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <header className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">共通テスト対策室</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-blue-400">
              Command Center
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            学習ダッシュボード
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            数学IA・数学II/B/C・英語リーディングを一元管理。
            大問別演習で弱点を特定し、本番演習で実戦力を測り、目標点まで一直線に伸ばします。
          </p>
        </header>

        {/* ══ SCORE TRACKER ═══════════════════════════════════════════════════ */}
        <section className="mt-8">
          <SectionLabel ja="目標点トラッカー" en="Score Tracker" />
          <CommonTestTargetScorePanel />
        </section>

        {/* ══ DAILY PLAYLIST ══════════════════════════════════════════════════ */}
        <section className="mt-8">
          <SectionLabel ja="今日の学習メニュー" en="Today's Study Plan" icon={<CalendarDays className="h-4 w-4 text-blue-600" />} />
          <CommonTestDailyPlaylistPanel showFullLink={true} />
        </section>

        {/* ══ WEAKNESS ════════════════════════════════════════════════════════ */}
        <section className="mt-8">
          <SectionLabel ja="弱点攻略" en="Weakness Focus" icon={<ShieldAlert className="h-4 w-4 text-rose-600" />} />
          <CommonTestWeaknessBossPanel compact={true} showFullLink={false} />
        </section>

        {/* ══ TODAY'S MISSIONS ════════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel ja="今日のおすすめ演習" en="Daily Pick" icon={<Zap className="h-4 w-4 text-blue-600" />} />
          <p className="-mt-2 mb-4 text-xs text-slate-500">
            各科目から1問ずつ。短時間で集中して取り組みましょう。
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {DAILY_MISSIONS.map((m, i) => (
              <CommonTestMissionCard key={m.id} mission={m} index={i} />
            ))}
          </div>
        </section>

        {/* ══ ANALYTICS SUMMARY ══════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel
            ja="演習データ分析"
            en="Analytics"
            right={
              <Link
                href="/common-test/history"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <History className="h-3.5 w-3.5" />
                演習履歴
              </Link>
            }
          />
          <CommonTestAnalyticsSummary />
        </section>

        {/* ══ REVIEW QUEUE SUMMARY ════════════════════════════════════════════ */}
        <section className="mt-5">
          <CommonTestReviewSummary />
        </section>

        {/* ══ SUBJECT ACCESS BOARD ════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel ja="科目を選ぶ" en="Subjects" icon={<BookOpen className="h-4 w-4 text-blue-600" />} />
          <p className="-mt-2 mb-4 text-xs text-slate-500">
            科目を選んで、大問別演習・得点ルート・本番演習へ進みます。
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {COMMON_TEST_SUBJECTS.map((s) => (
              <CommonTestSubjectCard key={s.id} subject={s} />
            ))}
          </div>
        </section>

        {/* ══ EXAM SIMULATOR ══════════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel ja="本番演習" en="Exam Simulator" icon={<Zap className="h-4 w-4 text-blue-600" />} />
          <Link
            href="/common-test/simulator"
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-2">
                <span className="text-base font-bold text-slate-900">本番形式の模擬試験</span>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-blue-600">
                  New
                </span>
              </div>
              <p className="text-xs text-slate-500">
                数IA 70分・数IIBC 70分・英語R 80分。各科目に第1〜第3回を用意しています。
              </p>
            </div>
            <span className="shrink-0 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-blue-700">
              開く →
            </span>
          </Link>
        </section>

        {/* ══ AI TOOLS ════════════════════════════════════════════════════════ */}
        <section className="mt-10">
          <SectionLabel ja="分析・復習支援" en="AI Tools" icon={<Brain className="h-4 w-4 text-violet-600" />} />
          <div className="grid gap-4 sm:grid-cols-2">

            {/* AI作戦会議 */}
            <Link
              href="/common-test/history"
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100">
                  <Brain className="h-5 w-5 text-violet-600" />
                </div>
                <span className="rounded-full bg-violet-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-violet-600">
                  Active
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">AI作戦会議</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  本番演習の結果から、時間配分・弱点・次にやるべき演習を分析します。
                </p>
              </div>
              <div className="mt-auto rounded-lg bg-violet-50 py-2 text-center text-xs font-bold text-violet-700 transition-colors group-hover:bg-violet-100">
                履歴から分析を開く →
              </div>
            </Link>

            {/* 復習キュー */}
            <Link
              href="/common-test/review"
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                  <RefreshCw className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                  Active
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">復習キュー</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  間違えた問題や再確認したい問題を、復習タイミングに合わせて確認します。
                </p>
              </div>
              <div className="mt-auto rounded-lg bg-emerald-50 py-2 text-center text-xs font-bold text-emerald-700 transition-colors group-hover:bg-emerald-100">
                今日の復習を見る →
              </div>
            </Link>

          </div>
        </section>

        {/* Footer label */}
        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
          CYBER OS · 共通テスト対策室
        </p>
      </div>
    </div>
  );
}

function SectionLabel({
  ja,
  en,
  icon,
  right,
}: {
  ja: string;
  en?: string;
  icon?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-bold text-slate-900">{ja}</h2>
        {en && (
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">
            {en}
          </span>
        )}
      </div>
      <div className="h-px flex-1 bg-slate-200" />
      {right}
    </div>
  );
}
