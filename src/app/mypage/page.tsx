"use client";

import React, { useMemo, useSyncExternalStore, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Sigma,
  BookOpen,
  LineChart,
  Sparkles,
  RotateCcw,
  Trash2,
  TrendingUp,
  BookMarked,
  Network,
  Activity,
  Zap,
} from "lucide-react";
import {
  subscribeAttempts,
  getAttemptsSnapshot,
  getAttemptsServerSnapshot,
  clearAttemptsLocal,
} from "@/lib/exam";
import {
  summarize,
  scoreTrend,
  unitStats,
  weakTagRanking,
  recommendedLessons,
} from "@/lib/history";
import { SummaryCards } from "@/components/mock/history/SummaryCards";
import { ScoreTrendChart } from "@/components/mock/history/ScoreTrendChart";
import { UnitRadarChart } from "@/components/mock/history/UnitRadarChart";
import { WeakTagPanel } from "@/components/mock/history/WeakTagPanel";
import { AttemptList } from "@/components/mock/history/AttemptList";
import {
  subscribeEnglishAttempts,
  getEnglishAttemptsSnapshot,
  getEnglishAttemptsServerSnapshot,
  clearEnglishAttemptsLocal,
  computeEnglishStats,
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

  const attempts = useSyncExternalStore(
    subscribeAttempts,
    getAttemptsSnapshot,
    getAttemptsServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const summary = useMemo(() => summarize(attempts), [attempts]);
  const trend   = useMemo(() => scoreTrend(attempts), [attempts]);
  const units   = useMemo(() => unitStats(attempts), [attempts]);
  const weak    = useMemo(() => weakTagRanking(attempts, 8), [attempts]);
  const lessons = useMemo(() => recommendedLessons(weak, 4), [weak]);

  const englishAttempts = useSyncExternalStore(
    subscribeEnglishAttempts,
    getEnglishAttemptsSnapshot,
    getEnglishAttemptsServerSnapshot,
  );
  const englishStats = useMemo(
    () => computeEnglishStats(englishAttempts),
    [englishAttempts],
  );

  const clearHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("模試の履歴をすべて削除します。よろしいですか？")) return;
    clearAttemptsLocal();
  };

  const clearEnglishHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("英語学習履歴をすべて削除します。よろしいですか？")) return;
    clearEnglishAttemptsLocal();
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Ambient grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,210,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Cyber Math
        </Link>

        {/* Header */}
        <header className="mt-6 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(0,210,255,0.07)",
              border: "1px solid rgba(0,210,255,0.22)",
              color: "#00d2ff",
            }}
          >
            <LineChart className="h-3.5 w-3.5" />
            Student Dashboard · マイページ
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
            MATH と ENGLISH の学習データを統合表示します
          </p>
        </header>

        {/* Math Review Queue */}
        <ReviewQueuePanel />

        {/* Common Test Review Queue */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              COMMON TEST REVIEW QUEUE
            </span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>
          <CommonTestReviewSummary />
        </div>

        {/* AI Oracle */}
        <div className="mb-8">
          <AIOracle />
        </div>

        {/* Learning Calendar */}
        {mounted && (
          <div className="mb-8">
            <LearningCalendar
              mathAttempts={attempts}
              englishAttempts={englishAttempts}
            />
          </div>
        )}

        {/* Subject tabs */}
        <div
          className="mb-8 inline-flex gap-1 rounded-xl p-1"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {(["MATH", "ENGLISH"] as Subject[]).map((s) => {
            const active = subject === s;
            const accent = s === "MATH" ? "#00d2ff" : "#10b981";
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className="flex items-center gap-2 rounded-lg px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-200"
                style={{
                  background: active
                    ? `color-mix(in srgb, ${accent} 14%, transparent)`
                    : "transparent",
                  border: active
                    ? `1px solid color-mix(in srgb, ${accent} 40%, transparent)`
                    : "1px solid transparent",
                  color: active ? accent : "rgba(255,255,255,0.35)",
                }}
              >
                {s === "MATH" ? (
                  <Sigma className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
                {s}
              </button>
            );
          })}
        </div>

        {/* ─── MATH tab ─── */}
        {subject === "MATH" && (
          <div>
            {!mounted ? (
              <div
                className="h-40 animate-pulse rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            ) : attempts.length === 0 ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Sparkles className="mx-auto mb-3 h-8 w-8" style={{ color: "#e879f9" }} />
                <p className="mb-1 font-display text-lg font-bold text-white">
                  まだ学習データがありません
                </p>
                <p className="mb-6 text-sm leading-6 text-white/50">
                  共通テストの大問別ドリルを1問解くか、サイバー模試を受けて採点を確定すると、
                  ここに正答率・弱点単元・得点推移・復習予定が表示されます。
                  <br />
                  初回の目安は10〜20分です。
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/common-test"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display font-bold transition-colors"
                    style={{
                      background: "rgba(96,165,250,0.15)",
                      border: "1px solid rgba(96,165,250,0.4)",
                      color: "#93c5fd",
                    }}
                  >
                    <BookOpen className="h-4 w-4" />
                    大問別ドリルを解く
                  </Link>
                  <Link
                    href="/mock"
                    className="inline-flex items-center gap-2 rounded-xl px-5 py-3 font-display font-bold transition-colors"
                    style={{
                      background: "rgba(232,121,249,0.15)",
                      border: "1px solid rgba(232,121,249,0.4)",
                      color: "#e879f9",
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    サイバー模試を始める
                  </Link>
                </div>
              </div>
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

        {/* ─── ENGLISH tab ─── */}
        {subject === "ENGLISH" && (
          <div className="space-y-6">
            {/* ── Stat cards ─────────────────────────────────────────────── */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  {
                    label: "速読 挑戦数",
                    value: mounted ? englishStats.speedReading.count : null,
                    unit: "回",
                    icon: Zap,
                    accent: "#10b981",
                  },
                  {
                    label: "速読 正答率",
                    value: mounted && englishStats.speedReading.count > 0
                      ? englishStats.speedReading.avgAccuracy
                      : null,
                    unit: "%",
                    icon: TrendingUp,
                    accent: "#10b981",
                  },
                  {
                    label: "精読 正答率",
                    value: mounted && englishStats.comprehension.count > 0
                      ? englishStats.comprehension.avgAccuracy
                      : null,
                    unit: "%",
                    icon: BookMarked,
                    accent: "#22d3ee",
                  },
                  {
                    label: "マルチソース 完了",
                    value: mounted ? englishStats.multiSource.count : null,
                    unit: "問",
                    icon: Network,
                    accent: "#a78bfa",
                  },
                ] as {
                  label: string;
                  value: number | null;
                  unit: string;
                  icon: React.ElementType;
                  accent: string;
                }[]
              ).map((c) => {
                const Icon = c.icon;
                const hasValue = c.value !== null && c.value > 0;
                return (
                  <div
                    key={c.label}
                    className="rounded-2xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: `1px solid color-mix(in srgb, ${c.accent} 25%, transparent)`,
                    }}
                  >
                    <div className="mb-2 flex items-center gap-1.5">
                      <Icon className="h-3.5 w-3.5" style={{ color: c.accent }} />
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
                        {c.label}
                      </span>
                    </div>
                    <div
                      className="font-display text-2xl font-extrabold"
                      style={{ color: hasValue ? c.accent : "rgba(255,255,255,0.18)" }}
                    >
                      {c.value !== null ? c.value : "--"}
                      {hasValue && (
                        <span className="ml-0.5 text-sm font-bold text-white/30">
                          {c.unit}
                        </span>
                      )}
                    </div>
                    {!hasValue && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/18">
                        no data yet
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Recent attempts list ───────────────────────────────────── */}
            {mounted && englishAttempts.length > 0 ? (
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between px-5 py-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                    最近の挑戦 · {englishAttempts.length} 件
                  </span>
                  <button
                    type="button"
                    onClick={clearEnglishHistory}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/30 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                    履歴を削除
                  </button>
                </div>

                {/* Rows */}
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  {englishAttempts.slice(0, 10).map((a: EnglishAttempt) => {
                    const pct = Math.round((a.score / a.total) * 100);
                    const scoreColor =
                      pct === 100 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#f43f5e";
                    const modeMeta = {
                      "speed-reading": { label: "速読",  accent: "#10b981" },
                      "comprehension": { label: "精読",  accent: "#22d3ee" },
                      "multi-source":  { label: "照合",  accent: "#a78bfa" },
                    }[a.mode];
                    const levelMeta = ENGLISH_LEVEL_META[a.level];
                    return (
                      <div
                        key={a.id}
                        className="flex items-center justify-between px-5 py-3 text-sm"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                      >
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
                          <span
                            className="font-mono text-[11px]"
                            style={{ color: levelMeta.accent }}
                          >
                            {levelMeta.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className="font-display text-sm font-bold tabular-nums"
                            style={{ color: scoreColor }}
                          >
                            {a.score}/{a.total}
                            <span className="ml-1 text-xs font-normal text-white/35">
                              ({pct}%)
                            </span>
                          </span>
                          <span className="font-mono text-[11px] text-white/25 tabular-nums">
                            {new Date(a.completedAt).toLocaleDateString("ja-JP", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              mounted && (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(16,185,129,0.15)",
                  }}
                >
                  <Activity
                    className="mx-auto mb-3 h-8 w-8"
                    style={{ color: "rgba(16,185,129,0.5)" }}
                  />
                  <p className="mb-1 font-display text-base font-bold text-white/70">
                    まだ記録がありません
                  </p>
                  <p className="text-xs leading-5 text-white/35">
                    下のモードに挑戦して答え合わせをすると、正答率と学習時間がここに記録されます。
                    <br />
                    まずは3〜5分で終わる速読長文から始められます。
                  </p>
                  <Link
                    href="/english/speed-reading"
                    className="mt-4 inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-bold transition-colors"
                    style={{
                      background: "rgba(16,185,129,0.12)",
                      border: "1px solid rgba(16,185,129,0.35)",
                      color: "#10b981",
                    }}
                  >
                    速読長文を始める
                  </Link>
                </div>
              )
            )}

            {/* ── Mode entry cards ───────────────────────────────────────── */}
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  {
                    href: "/english/speed-reading",
                    label: "速読長文",
                    desc: "制限時間内に英文を読み切り、記憶だけで設問に答える速読トレーニング",
                    icon: Zap,
                    accent: "#10b981",
                  },
                  {
                    href: "/english/comprehension",
                    label: "精読長文",
                    desc: "構文解析（SVOMC）と詳細解説で英文を深く読み解く精読トレーニング",
                    icon: BookMarked,
                    accent: "#22d3ee",
                  },
                  {
                    href: "/english/multi-source",
                    label: "マルチソース",
                    desc: "表・本文・箇条書きを横断照合して条件に合う選択肢を絞り込む",
                    icon: Network,
                    accent: "#a78bfa",
                  },
                ] as {
                  href: string;
                  label: string;
                  desc: string;
                  icon: React.ElementType;
                  accent: string;
                }[]
              ).map((m) => {
                const Icon = m.icon;
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    className="group block rounded-2xl p-5 transition-all duration-300 hover:[border-color:color-mix(in_srgb,var(--card-accent)_40%,transparent)] hover:[background:color-mix(in_srgb,var(--card-accent)_5%,transparent)]"
                    style={
                      {
                        "--card-accent": m.accent,
                        background: "rgba(255,255,255,0.025)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      } as React.CSSProperties
                    }
                  >
                    <Icon className="mb-3 h-6 w-6" style={{ color: m.accent }} />
                    <p className="font-display font-bold text-white">{m.label}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/40">{m.desc}</p>
                    <p
                      className="mt-3 font-mono text-xs font-semibold"
                      style={{ color: m.accent }}
                    >
                      挑戦する →
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
