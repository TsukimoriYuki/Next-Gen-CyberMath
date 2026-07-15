"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, Flame, Layers, Trophy } from "lucide-react";
import { LearningState } from "@/components/learning/LearningPageFrame";

interface ListMeta {
  todayCount: number;
  masteredCount: number;
  overdueCount: number;
  total: number;
}

type SummaryStatus = "ready" | "login-required" | "error";

interface SummaryState {
  status: SummaryStatus;
  meta: ListMeta | null;
  topWeakTag: string | null;
}

export function CommonTestReviewSummary() {
  const [state, setState] = useState<SummaryState | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me")
        .then((response) => {
          if (!response.ok) throw new Error("auth request failed");
          return response.json();
        })
        .then((data) => Boolean(data.ok)),
      fetch("/api/review/list?limit=100").then((response) => {
        if (!response.ok) throw new Error("review list request failed");
        return response.json();
      }),
    ])
      .then(([loggedIn, listData]) => {
        if (!loggedIn) {
          setState({ status: "login-required", meta: null, topWeakTag: null });
          return;
        }
        if (!listData.ok) {
          setState({ status: "error", meta: null, topWeakTag: null });
          return;
        }

        const items = (listData.items ?? []) as {
          itemType: string;
          status: string;
          skillTags: string[];
          nextReviewAt: string;
        }[];
        const commonTestItems = items.filter(
          (item) => item.itemType === "common-test-drill" || item.itemType === "common-test-lecture",
        );
        const now = new Date();
        const meta = {
          total: commonTestItems.length,
          todayCount: commonTestItems.filter(
            (item) => item.status === "ACTIVE" && new Date(item.nextReviewAt) <= now,
          ).length,
          overdueCount: commonTestItems.filter(
            (item) =>
              item.status === "ACTIVE" &&
              new Date(item.nextReviewAt) < now &&
              new Date(item.nextReviewAt).toDateString() !== now.toDateString(),
          ).length,
          masteredCount: commonTestItems.filter((item) => item.status === "MASTERED").length,
        };
        const tagFreq = new Map<string, number>();
        for (const item of commonTestItems) {
          if (item.status !== "ACTIVE") continue;
          for (const tag of item.skillTags.slice(0, 3)) {
            tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
          }
        }
        const topWeakTag =
          tagFreq.size > 0
            ? [...tagFreq.entries()].sort((a, b) => b[1] - a[1])[0][0]
            : null;

        setState({ status: "ready", meta, topWeakTag });
      })
      .catch(() => {
        setState({ status: "error", meta: null, topWeakTag: null });
      });
  }, []);

  if (state === null) {
    return (
      <LearningState
        kind="loading"
        headingLevel={4}
        title="復習キューを読み込んでいます"
        description="保存済みの復習状況を確認しています。"
        compact
      />
    );
  }

  if (state.status === "error") {
    return (
      <LearningState
        kind="error"
        headingLevel={4}
        title="復習キューを読み込めませんでした"
        description="通信状態を確認して、時間をおいてもう一度お試しください。"
        compact
      />
    );
  }

  if (state.status === "login-required") {
    return (
      <LearningState
        kind="login-required"
        headingLevel={4}
        title="復習キューの保存にはログインが必要です"
        description="ログインすると、間違えた問題と次の復習日を保存できます。"
        compact
        actions={
          <Link href="/auth/login" className="button-primary">
            ログインする
          </Link>
        }
      />
    );
  }

  const { meta, topWeakTag } = state;
  if (!meta || meta.total === 0) {
    return (
      <LearningState
        kind="empty"
        headingLevel={4}
        title="復習キューはまだ空です"
        description="共通テスト演習に取り組むと、復習が必要な問題がここに表示されます。"
        compact
        actions={
          <Link href="/common-test/review" className="button-secondary">
            復習キューを開く
          </Link>
        }
      />
    );
  }

  // todayCount already contains every ACTIVE item due at or before now,
  // including the separately displayed overdue subset.
  const dueCount = meta.todayCount;
  const urgent = dueCount > 0;

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className={`flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3 ${
          urgent ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-2">
          <Layers
            className={`h-4 w-4 ${urgent ? "text-orange-700" : "text-blue-700"}`}
            aria-hidden="true"
          />
          <h4 className="text-sm font-bold text-slate-950">復習キュー</h4>
          {urgent && (
            <span className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-orange-700 px-2 text-xs font-bold text-white">
              {dueCount}
            </span>
          )}
        </div>
        <Link
          href="/common-test/review"
          className="inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {urgent ? `今日の復習 ${dueCount}問を解く` : "復習キューを開く"}
        </Link>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 sm:grid-cols-4 sm:divide-y-0">
        <SummaryCell
          icon={<AlertTriangle className="h-4 w-4" />}
          label="今日の復習"
          value={meta.todayCount}
          color={meta.todayCount > 0 ? "#c2410c" : "#64748b"}
        />
        <SummaryCell
          icon={<AlertTriangle className="h-4 w-4" />}
          label="期限切れ"
          value={meta.overdueCount}
          color={meta.overdueCount > 0 ? "#be123c" : "#64748b"}
        />
        <SummaryCell
          icon={<Trophy className="h-4 w-4" />}
          label="克服済み"
          value={meta.masteredCount}
          color="#047857"
        />
        <SummaryCell
          icon={<Flame className="h-4 w-4" />}
          label="最多弱点"
          value={topWeakTag ?? "-"}
          color="#b45309"
          small
        />
      </div>
    </section>
  );
}

function SummaryCell({
  icon,
  label,
  value,
  color,
  small,
}: {
  icon: ReactNode;
  label: string;
  value: number | string;
  color: string;
  small?: boolean;
}) {
  return (
    <div className="flex min-h-24 flex-col gap-2 bg-white px-4 py-4">
      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
        <span style={{ color }} aria-hidden="true">
          {icon}
        </span>
        {label}
      </div>
      <div
        className={`font-extrabold leading-tight ${small ? "text-sm" : "text-xl"}`}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
