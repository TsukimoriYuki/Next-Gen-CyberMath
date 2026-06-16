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
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    Icon: RefreshCw,
  },
  drill: {
    label: "演習",
    color: "#2563eb",
    bg: "#eff6ff",
    border: "#bfdbfe",
    Icon: BookOpen,
  },
  exam: {
    label: "模試",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    Icon: Zap,
  },
  analysis: {
    label: "分析",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    Icon: Brain,
  },
  "mark-sheet": {
    label: "記述",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    Icon: FileText,
  },
  target: {
    label: "目標",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    Icon: Target,
  },
};

const PRIORITY_BADGE: Record<
  "high" | "medium" | "low",
  { label: string; color: string; bg: string; border: string } | null
> = {
  high: {
    label: "優先",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
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
    <div className="border-b border-slate-100 px-4 py-3 last:border-b-0 sm:px-5 sm:py-4">
      <div className="flex items-start gap-3">
        {/* 番号 */}
        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-[9px] font-bold text-slate-500">
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
            <span className="text-sm font-bold text-slate-900">
              {task.title}
            </span>
            {priorityBadge && (
              <span
                className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
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
              className="rounded px-1.5 py-0.5 text-[10px] font-bold"
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
          <p className="text-xs leading-relaxed text-slate-600">
            {task.description}
          </p>

          {/* 理由（淡い） */}
          <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
            ⓘ {task.reason}
          </p>
        </div>

        {/* 時間 + 開始ボタン（縦並び） */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3" />
            {task.estimatedMinutes}分
          </div>
          <Link
            href={task.href}
            className="rounded-lg px-3 py-1.5 text-[11px] font-bold transition-opacity hover:opacity-80"
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
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white" style={{ minHeight: 200 }}>
      <div className="h-10 w-full bg-slate-100" />
      <div className="space-y-3 p-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-slate-100" />
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

  // モードを localStorage から読む（マウント時のみ）。hydration mismatch を避けて
  // マウント後に読む。
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* ── ヘッダー ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarDays className="h-4 w-4 shrink-0 text-blue-600" />
          <span className="text-sm font-bold text-slate-900">
            今日の学習メニュー
          </span>
          <span className="hidden font-mono text-[10px] text-slate-400 sm:inline">
            {playlist.date}
          </span>
        </div>

        {/* モード切替 */}
        <div className="ml-auto flex items-center gap-1">
          {(["short", "standard", "intensive"] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
                mode === m
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* ── サマリー ── */}
      <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <p className="text-xs leading-relaxed text-slate-600">
          {playlist.summary}
        </p>
      </div>

      {/* ── タスク一覧 ── */}
      {playlist.tasks.length === 0 ? (
        <div className="px-5 py-8 text-center text-xs text-slate-400">
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
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            推定{" "}
            <span className="font-bold text-slate-700">
              {playlist.totalMinutes}分
            </span>
          </span>

          {/* 未ログイン通知 */}
          {isLoggedIn === false && (
            <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1">
              <LogIn className="h-3 w-3 text-slate-400" />
              <span className="text-[11px] text-slate-500">
                ログインで復習キュー連携
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* 再計算 */}
          <button
            onClick={() => setCalcKey((k) => k + 1)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          >
            <RotateCcw className="h-3 w-3" />
            再計算
          </button>

          {/* 詳細ページへ */}
          {showFullLink && (
            <Link
              href="/common-test/daily"
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-blue-700"
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
