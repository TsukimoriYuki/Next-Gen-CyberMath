"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { AlertTriangle, Flame, Layers, LogIn, Trophy } from "lucide-react";

interface ListMeta {
  todayCount: number;
  masteredCount: number;
  overdueCount: number;
  total: number;
}

interface SummaryState {
  isLoggedIn: boolean;
  meta: ListMeta | null;
  topWeakTag: string | null;
}

export function CommonTestReviewSummary() {
  const [state, setState] = useState<SummaryState | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me")
        .then((response) => response.json())
        .then((data) => Boolean(data.ok)),
      fetch("/api/review/list?limit=100").then((response) =>
        response.ok ? response.json() : { ok: false },
      ),
    ])
      .then(([loggedIn, listData]) => {
        if (!loggedIn) {
          setState({ isLoggedIn: false, meta: null, topWeakTag: null });
          return;
        }
        if (!listData.ok) {
          setState({ isLoggedIn: true, meta: null, topWeakTag: null });
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

        setState({ isLoggedIn: true, meta, topWeakTag });
      })
      .catch(() => {
        setState({ isLoggedIn: false, meta: null, topWeakTag: null });
      });
  }, []);

  if (state === null) {
    return <div className="min-h-[72px] animate-pulse rounded-2xl border border-slate-200 bg-white p-4" />;
  }

  if (!state.isLoggedIn) {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <LogIn className="h-5 w-5 shrink-0 text-slate-300" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            復習キュー
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
              ログインで保存
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            ログインすると、間違えた問題と次の復習日を保存できます。
          </p>
        </div>
        <Link
          href="/auth/login"
          className="shrink-0 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700"
        >
          ログインする
        </Link>
      </div>
    );
  }

  const { meta, topWeakTag } = state;
  const dueCount = (meta?.todayCount ?? 0) + (meta?.overdueCount ?? 0);
  const urgent = dueCount > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div
        className="flex items-center justify-between border-b px-5 py-3"
        style={{
          background: urgent ? "#fff7ed" : "#f8fafc",
          borderColor: urgent ? "#fed7aa" : "#e2e8f0",
        }}
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" style={{ color: urgent ? "#ea580c" : "#2563eb" }} />
          <span className="text-sm font-bold" style={{ color: urgent ? "#ea580c" : "#0f172a" }}>
            復習キュー
          </span>
          {urgent && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-600 px-1.5 font-mono text-[9px] font-bold text-white">
              {dueCount}
            </span>
          )}
        </div>
        <Link
          href="/common-test/review"
          className="text-xs font-bold text-blue-600 transition-colors hover:text-blue-700"
        >
          {urgent ? `今日の復習 ${dueCount}問を解く` : "復習キューを開く"}
        </Link>
      </div>

      <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0">
        <SummaryCell
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="今日の復習"
          value={meta?.todayCount ?? 0}
          color={meta && meta.todayCount > 0 ? "#ea580c" : "#94a3b8"}
        />
        <SummaryCell
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="期限切れ"
          value={meta?.overdueCount ?? 0}
          color={meta && meta.overdueCount > 0 ? "#e11d48" : "#94a3b8"}
        />
        <SummaryCell
          icon={<Trophy className="h-3.5 w-3.5" />}
          label="克服済み"
          value={meta?.masteredCount ?? 0}
          color="#059669"
        />
        <SummaryCell
          icon={<Flame className="h-3.5 w-3.5" />}
          label="最多弱点"
          value={topWeakTag ?? "-"}
          color="#d97706"
          small
        />
      </div>
    </div>
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
    <div className="flex flex-col gap-1 bg-white px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-extrabold leading-tight ${small ? "text-xs" : "font-mono text-xl"}`}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
