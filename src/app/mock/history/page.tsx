"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { LineChart, ArrowLeft, Sparkles, RotateCcw, Trash2 } from "lucide-react";
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

const noopSubscribe = () => () => {};

export default function MockHistoryPage() {
  // localStorage を外部ストアとして購読（SSR は空、保存/削除で自動再描画）。
  const attempts = useSyncExternalStore(
    subscribeAttempts,
    getAttemptsSnapshot,
    getAttemptsServerSnapshot,
  );
  // マウント済みか（SSR/初回は false → スケルトン、ハイドレーション後 true）。
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const summary = useMemo(() => summarize(attempts), [attempts]);
  const trend = useMemo(() => scoreTrend(attempts), [attempts]);
  const units = useMemo(() => unitStats(attempts), [attempts]);
  const weak = useMemo(() => weakTagRanking(attempts, 8), [attempts]);
  const lessons = useMemo(() => recommendedLessons(weak, 4), [weak]);

  const clearHistory = () => {
    if (typeof window === "undefined") return;
    if (!window.confirm("模試の履歴をすべて削除します。よろしいですか？")) return;
    clearAttemptsLocal();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/mock"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        模試に戻る
      </Link>

      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">
          <LineChart className="h-3.5 w-3.5" />
          Analytics Dashboard
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          成長の軌跡・弱点分析
        </h1>
        <p className="mt-2 text-muted-foreground">
          過去の模試の記録から、スコア推移・単元別の正答率・弱点タグを集計します。
        </p>
      </header>

      {/* マウント前はスケルトン（簡易） */}
      {!mounted ? (
        <div className="mt-8 h-40 animate-pulse rounded-2xl border border-border/60 bg-muted/30" />
      ) : attempts.length === 0 ? (
        <div className="glass mt-8 rounded-2xl p-10 text-center">
          <Sparkles className="mx-auto mb-3 h-8 w-8 text-neon-magenta" />
          <p className="mb-1 font-display text-lg font-bold">まだ記録がありません</p>
          <p className="mb-5 text-sm text-muted-foreground">
            サイバー模試を受験して採点を確定すると、ここに成長の軌跡が刻まれます。
          </p>
          <Link
            href="/mock"
            className="glow-magenta inline-flex items-center gap-2 rounded-xl bg-neon-magenta/15 px-5 py-3 font-display font-bold text-neon-magenta transition-colors hover:bg-neon-magenta/25"
          >
            <Sparkles className="h-4 w-4" />
            模試を受ける
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
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
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <RotateCcw className="h-4 w-4" />
              新しい模試を受ける
            </Link>
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" />
              履歴を削除
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
