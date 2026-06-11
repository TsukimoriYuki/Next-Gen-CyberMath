"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  BookOpen,
  RotateCcw,
  Zap,
  Brain,
  RefreshCw,
  Target,
  FileText,
  LogIn,
  ChevronRight,
  Clock,
} from "lucide-react";
import {
  buildCommonTestDailyPlaylist,
  loadDailyPlaylistMode,
  saveDailyPlaylistMode,
  type CommonTestDailyPlaylist,
  type CommonTestDailyPlanMode,
  type CommonTestDailyTask,
  type CommonTestDailyTaskType,
} from "@/lib/common-test-daily-playlist";
import { getCommonTestDrillHistory } from "@/lib/common-test-history";
import { getCommonTestExamHistory } from "@/lib/common-test-exam-history";
import { getCommonTestTargetScores } from "@/lib/common-test-targets";

// ── タスクタイプごとのスタイル設定 ────────────────────────────────────────

interface TypeConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  Icon: React.ElementType;
}

const TYPE_CONFIG: Record<CommonTestDailyTaskType, TypeConfig> = {
  review: {
    label: "復習",
    color: "#f97316",
    bg: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.28)",
    Icon: RefreshCw,
  },
  drill: {
    label: "演習",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.10)",
    border: "rgba(56,189,248,0.28)",
    Icon: BookOpen,
  },
  exam: {
    label: "模試",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.28)",
    Icon: Zap,
  },
  analysis: {
    label: "分析",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.10)",
    border: "rgba(34,211,238,0.28)",
    Icon: Brain,
  },
  "mark-sheet": {
    label: "記述",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.10)",
    border: "rgba(167,139,250,0.28)",
    Icon: FileText,
  },
  target: {
    label: "目標",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.10)",
    border: "rgba(34,197,94,0.28)",
    Icon: Target,
  },
};

const PRIORITY_BADGE: Record<
  "high" | "medium" | "low",
  { label: string; color: string; bg: string; border: string } | null
> = {
  high: {
    label: "優先",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.30)",
  },
  medium: null,
  low: null,
};

const MODE_LABELS: Record<CommonTestDailyPlanMode, string> = {
  short: "30分",
  standard: "60分",
  intensive: "90分",
};

// ── タスク行 ──────────────────────────────────────────────────────────────

function TaskRow({
  task,
  index,
}: {
  task: CommonTestDailyTask;
  index: number;
}) {
  const cfg = TYPE_CONFIG[task.type];
  const { Icon } = cfg;
  const priorityBadge = PRIORITY_BADGE[task.priority];

  return (
    <div
      className="px-4 py-3 sm:px-5 sm:py-4"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="flex items-start gap-3">
        {/* 番号 */}
        <div
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {index + 1}
        </div>

        {/* タイプアイコン */}
        <div
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
          style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
        </div>

        {/* コンテンツ */}
        <div className="min-w-0 flex-1">
          {/* タイトル行 */}
          <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
            <span className="font-display text-sm font-bold text-white">
              {task.title}
            </span>
            {priorityBadge && (
              <span
                className="rounded-full px-1.5 py-0.5 font-mono text-[8px] font-bold"
                style={{
                  background: priorityBadge.bg,
                  border: `1px solid ${priorityBadge.border}`,
                  color: priorityBadge.color,
                }}
              >
                {priorityBadge.label}
              </span>
            )}
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                color: cfg.color,
              }}
            >
              {cfg.label}
            </span>
          </div>

          {/* 説明 */}
          <p className="font-mono text-[10px] leading-relaxed text-white/45">
            {task.description}
          </p>

          {/* 理由（淡い） */}
          <p className="mt-1 font-mono text-[9px] leading-relaxed text-white/25">
            ⓘ {task.reason}
          </p>
        </div>

        {/* 時間 + 開始ボタン（縦並び） */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-1 font-mono text-[10px] text-white/30">
            <Clock className="h-3 w-3" />
            {task.estimatedMinutes}分
          </div>
          <Link
            href={task.href}
            className="rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
            style={{
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              color: cfg.color,
            }}
          >
            開始 →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── スケルトン ────────────────────────────────────────────────────────────

function PlaylistSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(251,191,36,0.12)",
        minHeight: 200,
      }}
    >
      <div
        className="h-10 w-full"
        style={{ background: "rgba(255,255,255,0.03)" }}
      />
      <div className="space-y-3 p-5">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── メインコンポーネント ──────────────────────────────────────────────────

interface Props {
  /** true のとき「詳細を見る →」リンクを /common-test/daily に表示する */
  showFullLink?: boolean;
}

export function CommonTestDailyPlaylistPanel({ showFullLink = true }: Props) {
  const [playlist, setPlaylist] = useState<CommonTestDailyPlaylist | null>(
    null
  );
  const [mode, setMode] = useState<CommonTestDailyPlanMode>("standard");
  const [calcKey, setCalcKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // モードを localStorage から読む（マウント時のみ）
  useEffect(() => {
    setMode(loadDailyPlaylistMode());
  }, []);

  // モードまたは再計算トリガーが変わるたびにプレイリストを再構築
  useEffect(() => {
    let cancelled = false;

    async function build() {
      const drillHistory = getCommonTestDrillHistory();
      const examHistory = getCommonTestExamHistory();
      const targetScores = getCommonTestTargetScores();

      // 復習キューの件数を取得（401 = 未ログイン、エラーは null 扱い）
      let reviewTodayCount: number | null = null;
      try {
        const res = await fetch("/api/review/today");
        if (res.status === 401) {
          reviewTodayCount = null;
          if (!cancelled) setIsLoggedIn(false);
        } else if (res.ok) {
          const data = (await res.json()) as { ok: boolean; items?: unknown[] };
          reviewTodayCount = Array.isArray(data.items) ? data.items.length : 0;
          if (!cancelled) setIsLoggedIn(true);
        }
      } catch {
        // ネットワークエラー等 → 未ログイン扱い
        if (!cancelled) setIsLoggedIn(false);
      }

      if (cancelled) return;

      const pl = buildCommonTestDailyPlaylist({
        mode,
        drillHistory,
        examHistory,
        targetScores,
        reviewTodayCount,
      });
      setPlaylist(pl);
    }

    build();
    return () => {
      cancelled = true;
    };
  }, [mode, calcKey]);

  function handleModeChange(next: CommonTestDailyPlanMode) {
    setMode(next);
    saveDailyPlaylistMode(next);
  }

  if (!playlist) return <PlaylistSkeleton />;

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(251,191,36,0.18)",
      }}
    >
      {/* ── ヘッダー ── */}
      <div
        className="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-5"
        style={{
          background: "rgba(251,191,36,0.04)",
          borderBottom: "1px solid rgba(251,191,36,0.12)",
        }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-amber-400" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400">
            今日の学習メニュー
          </span>
          <span className="hidden font-mono text-[10px] text-white/25 sm:inline">
            {playlist.date}
          </span>
        </div>

        {/* モード切替 */}
        <div className="ml-auto flex items-center gap-1">
          {(["short", "standard", "intensive"] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className="rounded-md px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all"
              style={
                mode === m
                  ? {
                      background: "rgba(251,191,36,0.18)",
                      border: "1px solid rgba(251,191,36,0.40)",
                      color: "#fbbf24",
                    }
                  : {
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.35)",
                    }
              }
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* ── サマリー ── */}
      <div
        className="px-4 py-3 sm:px-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="font-mono text-[11px] leading-relaxed text-white/55">
          {playlist.summary}
        </p>
      </div>

      {/* ── タスク一覧 ── */}
      {playlist.tasks.length === 0 ? (
        <div className="px-5 py-8 text-center font-mono text-[10px] text-white/25">
          演習データがありません — まず大問別演習か本番演習を受けてください。
        </div>
      ) : (
        <div>
          {playlist.tasks.map((task, i) => (
            <TaskRow key={task.id} task={task} index={i} />
          ))}
        </div>
      )}

      {/* ── フッター ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/30">
            推定{" "}
            <span className="font-bold text-white/50">
              {playlist.totalMinutes}分
            </span>
          </span>

          {/* 未ログイン通知 */}
          {isLoggedIn === false && (
            <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <LogIn className="h-3 w-3 text-white/25" />
              <span className="font-mono text-[9px] text-white/30">
                ログインで復習キュー連携
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* 再計算 */}
          <button
            onClick={() => setCalcKey((k) => k + 1)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            <RotateCcw className="h-3 w-3" />
            再計算
          </button>

          {/* 詳細ページへ */}
          {showFullLink && (
            <Link
              href="/common-test/daily"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                background: "rgba(251,191,36,0.10)",
                border: "1px solid rgba(251,191,36,0.28)",
                color: "#fbbf24",
              }}
            >
              詳細
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
