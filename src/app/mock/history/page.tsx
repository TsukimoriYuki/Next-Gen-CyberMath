"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { RotateCcw, Trash2 } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
  LearningState,
} from "@/components/learning/LearningPageFrame";
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
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "復習", href: "/review" },
          { label: "カスタム演習", href: "/mock" },
          { label: "演習履歴・弱点分析" },
        ]}
      />
      <LearningPageHeader
        eyebrow="数学演習"
        title="演習履歴・弱点分析"
        description="過去のカスタム演習から、スコア推移・単元別の正答率・弱点タグを確認します。"
      />

      {!mounted ? (
        <div className="mt-8">
          <LearningState
            kind="loading"
            title="演習履歴を読み込んでいます"
            description="この端末に保存された結果を集計しています。"
          />
        </div>
      ) : attempts.length === 0 ? (
        <div className="mt-8">
          <LearningState
            kind="empty"
            title="まだ演習記録がありません"
            description="カスタム演習を採点すると、ここに得点推移と弱点が表示されます。"
            actions={<Link href="/mock" className="button-primary">カスタム演習を始める</Link>}
          />
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
              className="button-secondary"
            >
              <RotateCcw className="h-4 w-4" />
              新しい問題セットを作る
            </Link>
            <button
              type="button"
              onClick={clearHistory}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-offset-4"
            >
              <Trash2 className="h-3.5 w-3.5" />
              履歴を削除
            </button>
          </div>
        </div>
      )}
    </LearningPageShell>
  );
}
