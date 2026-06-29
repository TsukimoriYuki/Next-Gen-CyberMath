"use client";

import React, { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Activity,
  BookMarked,
  BookOpen,
  ChevronLeft,
  LineChart,
  Network,
  RotateCcw,
  Sigma,
  Sparkles,
  Trash2,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  clearAttemptsLocal,
  getAttemptsServerSnapshot,
  getAttemptsSnapshot,
  subscribeAttempts,
} from "@/lib/exam";
import {
  recommendedLessons,
  scoreTrend,
  summarize,
  unitStats,
  weakTagRanking,
} from "@/lib/history";
import { AttemptList } from "@/components/mock/history/AttemptList";
import { ScoreTrendChart } from "@/components/mock/history/ScoreTrendChart";
import { SummaryCards } from "@/components/mock/history/SummaryCards";
import { UnitRadarChart } from "@/components/mock/history/UnitRadarChart";
import { WeakTagPanel } from "@/components/mock/history/WeakTagPanel";
import {
  clearEnglishAttemptsLocal,
  computeEnglishStats,
  getEnglishAttemptsServerSnapshot,
  getEnglishAttemptsSnapshot,
  subscribeEnglishAttempts,
  type EnglishAttempt,
} from "@/lib/english-history";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { AIOracle } from "@/components/dashboard/AIOracle";
import { LearningCalendar } from "@/components/dashboard/LearningCalendar";
import { ReviewQueuePanel } from "@/components/review/ReviewQueuePanel";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";

type Subject = "MATH" | "ENGLISH";

const noopSubscribe = () => () => {};

export default function MyPage() {
  const [subject, setSubject] = useState<Subject>("MATH");

  const attempts = useSyncExternalStore(subscribeAttempts, getAttemptsSnapshot, getAttemptsServerSnapshot);
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const summary = useMemo(() => summarize(attempts), [attempts]);
  const trend = useMemo(() => scoreTrend(attempts), [attempts]);
  const units = useMemo(() => unitStats(attempts), [attempts]);
  const weak = useMemo(() => weakTagRanking(attempts, 8), [attempts]);
  const lessons = useMemo(() => recommendedLessons(weak, 4), [weak]);

  const englishAttempts = useSyncExternalStore(
    subscribeEnglishAttempts,
    getEnglishAttemptsSnapshot,
    getEnglishAttemptsServerSnapshot,
  );
  const englishStats = useMemo(() => computeEnglishStats(englishAttempts), [englishAttempts]);

  const clearHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("数学の演習履歴をすべて削除します。よろしいですか？")) return;
    clearAttemptsLocal();
  };

  const clearEnglishHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("英語の学習履歴をすべて削除します。よろしいですか？")) return;
    clearEnglishAttemptsLocal();
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,210,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Cyber Math
        </Link>

        <header className="mb-8 mt-6">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(0,210,255,0.07)",
              border: "1px solid rgba(0,210,255,0.22)",
              color: "#00d2ff",
            }}
          >
            <LineChart className="h-3.5 w-3.5" />
            Student Dashboard / マイページ
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #ffffff 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            学習分析
          </h1>
          <p className="mt-2 font-mono text-sm text-white/40">
            数学と英語の学習データ、復習キュー、次に解くべき内容をまとめて確認できます。
          </p>
        </header>

        <ReviewQueuePanel />

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              COMMON TEST REVIEW QUEUE
            </span>
            <div className="h-px flex-1 bg-white/[0.05]" />
          </div>
          <CommonTestReviewSummary />
        </div>

        <div className="mb-8">
          <AIOracle />
        </div>

        {mounted && (
          <div className="mb-8">
            <LearningCalendar mathAttempts={attempts} englishAttempts={englishAttempts} />
          </div>
        )}

        <div
          className="mb-8 inline-flex gap-1 rounded-xl p-1"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {(["MATH", "ENGLISH"] as Subject[]).map((tab) => {
            const active = subject === tab;
            const accent = tab === "MATH" ? "#00d2ff" : "#10b981";
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setSubject(tab)}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200"
                style={{
                  background: active ? `color-mix(in srgb, ${accent} 14%, transparent)` : "transparent",
                  border: active ? `1px solid color-mix(in srgb, ${accent} 40%, transparent)` : "1px solid transparent",
                  color: active ? accent : "rgba(255,255,255,0.35)",
                }}
              >
                {tab === "MATH" ? <Sigma className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                {tab}
              </button>
            );
          })}
        </div>

        {subject === "MATH" && (
          <div>
            {!mounted ? (
              <div
                className="h-40 animate-pulse rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              />
            ) : attempts.length === 0 ? (
              <NoMathData />
            ) : (
              <div className="space-y-6">
                <SummaryCards summary={summary} />
                <div className="grid gap-6 lg:grid-cols-2">
                  <ScoreTrendChart points={trend} />
                  <UnitRadarChart stats={units} />
                </div>
                <WeakTagPanel weakTags={weak} lessons={lessons} />
                <AttemptList attempts={attempts} />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Link
                    href="/mock"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white/40 transition-colors hover:text-white/70"
                  >
                    <RotateCcw className="h-4 w-4" />
                    新しい模試を受ける
                  </Link>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-white/30 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    履歴を削除
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {subject === "ENGLISH" && (
          <EnglishPanel
            mounted={mounted}
            attempts={englishAttempts}
            stats={englishStats}
            onClear={clearEnglishHistory}
          />
        )}
      </div>
    </div>
  );
}

function NoMathData() {
  return (
    <div
      className="rounded-2xl p-10 text-center"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <Sparkles className="mx-auto mb-3 h-8 w-8" style={{ color: "#e879f9" }} />
      <p className="mb-1 font-display text-lg font-bold text-white">まだ学習データがありません</p>
      <p className="mb-6 text-sm leading-6 text-white/50">
        まずは共通テスト診断または大問別ドリルを1つ解くと、ここに正答率・弱点単元・復習予定が表示されます。
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/common-test"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display font-bold transition-colors"
          style={{ background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.4)", color: "#93c5fd" }}
        >
          <BookOpen className="h-4 w-4" />
          共通テスト対策を始める
        </Link>
        <Link
          href="/common-test/math-1a/section-1"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display font-bold transition-colors"
          style={{ background: "rgba(0,210,255,0.12)", border: "1px solid rgba(0,210,255,0.35)", color: "#67e8f9" }}
        >
          <Sigma className="h-4 w-4" />
          大問別ドリルを解く
        </Link>
        <Link
          href="/common-test/simulator/math-1a-paper-001"
          className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display font-bold transition-colors"
          style={{ background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.4)", color: "#e879f9" }}
        >
          <Sparkles className="h-4 w-4" />
          冊子型模試を受ける
        </Link>
      </div>
    </div>
  );
}

function EnglishPanel({
  mounted,
  attempts,
  stats,
  onClear,
}: {
  mounted: boolean;
  attempts: EnglishAttempt[];
  stats: ReturnType<typeof computeEnglishStats>;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <EnglishStat label="速読 回数" value={mounted ? stats.speedReading.count : null} unit="回" icon={Zap} accent="#10b981" />
        <EnglishStat
          label="速読 正答率"
          value={mounted && stats.speedReading.count > 0 ? stats.speedReading.avgAccuracy : null}
          unit="%"
          icon={TrendingUp}
          accent="#10b981"
        />
        <EnglishStat
          label="精読 正答率"
          value={mounted && stats.comprehension.count > 0 ? stats.comprehension.avgAccuracy : null}
          unit="%"
          icon={BookMarked}
          accent="#22d3ee"
        />
        <EnglishStat label="資料読解" value={mounted ? stats.multiSource.count : null} unit="問" icon={Network} accent="#a78bfa" />
      </div>

      {mounted && attempts.length > 0 ? (
        <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="flex items-center justify-between px-5 py-3"
            style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
              最近の演習 / {attempts.length}件
            </span>
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/30 transition-colors hover:text-red-400"
            >
              <Trash2 className="h-3 w-3" />
              履歴を削除
            </button>
          </div>
          <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            {attempts.slice(0, 10).map((attempt) => {
              const pct = Math.round((attempt.score / attempt.total) * 100);
              const scoreColor = pct === 100 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f43f5e";
              const modeMeta = {
                "speed-reading": { label: "速読", accent: "#10b981" },
                comprehension: { label: "精読", accent: "#22d3ee" },
                "multi-source": { label: "資料", accent: "#a78bfa" },
              }[attempt.mode];
              const levelMeta = ENGLISH_LEVEL_META[attempt.level];
              return (
                <div key={attempt.id} className="flex items-center justify-between px-5 py-3 text-sm" style={{ background: "rgba(0,0,0,0.2)" }}>
                  <div className="flex items-center gap-3">
                    <span
                      className="shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${modeMeta.accent} 14%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${modeMeta.accent} 35%, transparent)`,
                        color: modeMeta.accent,
                      }}
                    >
                      {modeMeta.label}
                    </span>
                    <span className="font-mono text-[11px]" style={{ color: levelMeta.accent }}>
                      {levelMeta.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm font-bold tabular-nums" style={{ color: scoreColor }}>
                      {attempt.score}/{attempt.total}
                      <span className="ml-1 text-xs font-normal text-white/35">({pct}%)</span>
                    </span>
                    <span className="font-mono text-[11px] tabular-nums text-white/25">
                      {new Date(attempt.completedAt).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        mounted && (
          <div className="rounded-2xl p-8 text-center" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <Activity className="mx-auto mb-3 h-8 w-8" style={{ color: "rgba(16,185,129,0.5)" }} />
            <p className="mb-1 font-display text-base font-bold text-white/70">まだ英語の記録がありません</p>
            <p className="text-xs leading-5 text-white/35">
              速読、精読、資料読解を解くと、正答率と学習時間がここに記録されます。
            </p>
            <Link
              href="/english/speed-reading"
              className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold transition-colors"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.35)", color: "#10b981" }}
            >
              速読を始める
            </Link>
          </div>
        )
      )}
    </div>
  );
}

function EnglishStat({
  label,
  value,
  unit,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | null;
  unit: string;
  icon: React.ElementType;
  accent: string;
}) {
  const hasValue = value !== null && value > 0;
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
      }}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5" style={{ color: accent }} />
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">{label}</span>
      </div>
      <div className="font-display text-2xl font-extrabold" style={{ color: hasValue ? accent : "rgba(255,255,255,0.18)" }}>
        {value !== null ? value : "--"}
        {hasValue && <span className="ml-0.5 text-sm font-bold text-white/30">{unit}</span>}
      </div>
      {!hasValue && <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/18">no data yet</p>}
    </div>
  );
}
