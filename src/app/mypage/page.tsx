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
  Timer,
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

  const clearHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("模試の履歴をすべて削除します。よろしいですか？")) return;
    clearAttemptsLocal();
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
          CYBER OS
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
                  まだ記録がありません
                </p>
                <p className="mb-5 text-sm text-white/40">
                  サイバー模試を受験して採点を確定すると、ここに成長の軌跡が刻まれます。
                </p>
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
                  模試を受ける
                </Link>
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
            {/* Status banner */}
            <div
              className="flex items-center gap-3 rounded-2xl px-6 py-4"
              style={{
                background: "rgba(16,185,129,0.07)",
                border: "1px solid rgba(16,185,129,0.22)",
              }}
            >
              <Activity className="h-5 w-5 shrink-0" style={{ color: "#10b981" }} />
              <div>
                <p
                  className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "#10b981" }}
                >
                  DATA COLLECTION IN PROGRESS
                </p>
                <p className="mt-0.5 text-xs text-white/40">
                  英語学習履歴の自動記録機能は実装予定です。現在は各モードに挑戦して感覚をつかんでください。
                </p>
              </div>
            </div>

            {/* Placeholder stat cards */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "速読 平均クリアタイム", value: "--", unit: "s",   icon: Timer,      accent: "#10b981" },
                { label: "速読 WPM",              value: "--", unit: "wpm", icon: TrendingUp, accent: "#facc15" },
                { label: "長文読解 正答率",        value: "--", unit: "%",   icon: BookMarked, accent: "#22d3ee" },
                { label: "マルチソース 完了数",     value: "--", unit: "問",  icon: Network,    accent: "#a78bfa" },
              ].map((c) => {
                const Icon = c.icon;
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
                    <div className="font-display text-2xl font-extrabold" style={{ color: c.accent }}>
                      {c.value}
                      {c.unit && (
                        <span className="ml-0.5 text-sm font-bold text-white/30">{c.unit}</span>
                      )}
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/20">
                      coming soon
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Mode entry cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {[
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
              ].map((m) => {
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
                      className="mt-3 font-mono text-xs font-semibold transition-all duration-200 group-hover:gap-2"
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
