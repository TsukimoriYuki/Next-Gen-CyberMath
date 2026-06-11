"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layers, AlertTriangle, Trophy, Flame, LogIn } from "lucide-react";

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
      fetch("/api/auth/me").then((r) => r.ok),
      fetch("/api/review/list?itemType=common-test-drill&limit=100").then((r) =>
        r.ok ? r.json() : { ok: false }
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
        // Top weak tag from active items
        const items = (listData.items ?? []) as {
          status: string;
          skillTags: string[];
        }[];
        const tagFreq = new Map<string, number>();
        for (const item of items) {
          if (item.status !== "ACTIVE") continue;
          for (const tag of item.skillTags.slice(0, 3)) {
            tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
          }
        }
        const topWeakTag =
          tagFreq.size > 0
            ? [...tagFreq.entries()].sort((a, b) => b[1] - a[1])[0][0]
            : null;

        setState({ isLoggedIn: true, meta: listData.meta, topWeakTag });
      })
      .catch(() => {
        setState({ isLoggedIn: false, meta: null, topWeakTag: null });
      });
  }, []);

  // Loading
  if (state === null) {
    return (
      <div
        className="rounded-2xl p-4 animate-pulse"
        style={{ background: "rgba(249,115,22,0.04)", border: "1px solid rgba(249,115,22,0.12)", minHeight: 72 }}
      />
    );
  }

  // Not logged in
  if (!state.isLoggedIn) {
    return (
      <div
        className="flex items-center gap-4 rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <LogIn className="h-5 w-5 text-white/25 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
            REVIEW QUEUE — LOCKED
          </div>
          <p className="mt-0.5 font-mono text-[10px] text-white/25">
            ログインすると復習キューが使えます
          </p>
        </div>
        <Link
          href="/login"
          className="shrink-0 rounded-lg px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
        >
          ログイン
        </Link>
      </div>
    );
  }

  const { meta, topWeakTag } = state;
  const dueCount = (meta?.todayCount ?? 0) + (meta?.overdueCount ?? 0);
  const urgent = dueCount > 0;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: urgent ? "rgba(249,115,22,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${urgent ? "rgba(249,115,22,0.22)" : "rgba(255,255,255,0.08)"}`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: urgent ? "rgba(249,115,22,0.07)" : "rgba(255,255,255,0.02)",
          borderBottom: `1px solid ${urgent ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)"}`,
        }}
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" style={{ color: urgent ? "#f97316" : "rgba(255,255,255,0.30)" }} />
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ color: urgent ? "#f97316" : "rgba(255,255,255,0.40)" }}
          >
            REVIEW QUEUE
          </span>
          {urgent && (
            <span
              className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-bold"
              style={{ background: "rgba(249,115,22,0.20)", border: "1px solid rgba(249,115,22,0.40)", color: "#f97316" }}
            >
              {dueCount}
            </span>
          )}
        </div>
        <Link
          href="/common-test/review"
          className="font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
          style={{ color: "rgba(255,255,255,0.40)" }}
        >
          開く →
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: "rgba(255,255,255,0.05)" }}>
        <SummaryCell
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="今日の復習"
          value={meta?.todayCount ?? 0}
          color={meta && meta.todayCount > 0 ? "#f97316" : "rgba(255,255,255,0.30)"}
        />
        <SummaryCell
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="期限切れ"
          value={meta?.overdueCount ?? 0}
          color={meta && meta.overdueCount > 0 ? "#ef4444" : "rgba(255,255,255,0.30)"}
        />
        <SummaryCell
          icon={<Trophy className="h-3.5 w-3.5" />}
          label="MASTERED"
          value={meta?.masteredCount ?? 0}
          color="#22c55e"
        />
        <SummaryCell
          icon={<Flame className="h-3.5 w-3.5" />}
          label="最多弱点"
          value={topWeakTag ?? "—"}
          color="#fbbf24"
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
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className="flex flex-col gap-1 px-4 py-3"
      style={{ background: "rgba(0,0,0,0.25)" }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/25" style={{ color: "rgba(255,255,255,0.25)" }}>
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-mono font-extrabold leading-tight ${small ? "text-[11px]" : "text-xl"}`}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
