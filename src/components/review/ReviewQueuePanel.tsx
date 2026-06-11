"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
  Trophy,
} from "lucide-react";

interface ReviewItem {
  id: string;
  problemSlug: string;
  subject: string;
  level: number;
  wrongCount: number;
  title: string;
  unit: string;
  difficulty: string;
  tagline: string | null;
}

const DIFFICULTY_COLOR: Record<string, string> = {
  A: "#34d399",
  B: "#60a5fa",
  C: "#f59e0b",
  D: "#f43f5e",
  D_PLUS: "#e879f9",
};

const LEVEL_LABEL = ["新規", "1回目", "2回目", "3回目"] as const;

export function ReviewQueuePanel() {
  const [items, setItems] = useState<ReviewItem[] | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const fetchItems = useCallback(() => {
    setItems(null);
    fetch("/api/review/today")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setItems(data.items as ReviewItem[]);
        else setItems([]);
      })
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleComplete = async (problemSlug: string, isCorrect: boolean) => {
    setCompleting(problemSlug);
    try {
      await fetch("/api/review/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemSlug, isCorrect }),
      });
      setDone((prev) => [...prev, problemSlug]);
      setItems((prev) => prev?.filter((i) => i.problemSlug !== problemSlug) ?? null);
    } finally {
      setCompleting(null);
    }
  };

  // 未ログイン / DB エラー時は何も表示しない
  if (items === null) {
    return (
      <div
        className="mb-8 rounded-2xl p-5 animate-pulse"
        style={{
          background: "rgba(245,158,11,0.04)",
          border: "1px solid rgba(245,158,11,0.12)",
          minHeight: 80,
        }}
      />
    );
  }

  // 復習なし（全完了 or 今日は該当なし）
  if (items.length === 0 && done.length === 0) return null;

  const allCleared = items.length === 0 && done.length > 0;
  const ACCENT = "#f59e0b";

  return (
    <div
      className="mb-8 rounded-2xl overflow-hidden"
      style={{
        background: "rgba(245,158,11,0.04)",
        border: `1px solid rgba(245,158,11,0.22)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: "rgba(245,158,11,0.06)",
          borderBottom: "1px solid rgba(245,158,11,0.15)",
        }}
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4" style={{ color: ACCENT }} />
          <span
            className="font-mono text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: ACCENT }}
          >
            今日の復習キュー
          </span>
          {items.length > 0 && (
            <span
              className="ml-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold"
              style={{
                background: `color-mix(in srgb, ${ACCENT} 20%, transparent)`,
                border: `1px solid color-mix(in srgb, ${ACCENT} 40%, transparent)`,
                color: ACCENT,
              }}
            >
              {items.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={fetchItems}
          className="rounded-lg p-1.5 transition-colors hover:bg-white/5"
          title="更新"
        >
          <RefreshCw className="h-3.5 w-3.5 text-white/30 hover:text-white/60" />
        </button>
      </div>

      {/* All cleared state */}
      {allCleared ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <Trophy className="h-8 w-8" style={{ color: ACCENT }} />
          <p className="font-display font-bold text-white">
            今日の復習、完了！
          </p>
          <p className="font-mono text-xs text-white/40">
            {done.length}問 解答済み · 次回の復習まで待機中
          </p>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "rgba(245,158,11,0.08)" }}>
          {items.map((item) => {
            const diffColor = DIFFICULTY_COLOR[item.difficulty] ?? "#94a3b8";
            const isLoading = completing === item.problemSlug;
            const levelLabel = LEVEL_LABEL[item.level] ?? `Lv.${item.level}`;

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ background: "rgba(0,0,0,0.15)" }}
              >
                {/* Problem info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Level badge */}
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                      style={{
                        background: "rgba(245,158,11,0.12)",
                        border: "1px solid rgba(245,158,11,0.3)",
                        color: ACCENT,
                      }}
                    >
                      {levelLabel}
                    </span>
                    {/* Difficulty badge */}
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                      style={{
                        background: `color-mix(in srgb, ${diffColor} 10%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${diffColor} 30%, transparent)`,
                        color: diffColor,
                      }}
                    >
                      {item.difficulty.replace("_", "+")}
                    </span>
                    {/* Unit */}
                    <span className="font-mono text-[10px] text-white/35 truncate">
                      {item.unit}
                    </span>
                  </div>

                  {/* Title */}
                  <p className="font-display text-sm font-semibold text-white leading-snug truncate">
                    {item.title}
                  </p>
                  {item.tagline && (
                    <p className="font-mono text-[11px] text-white/35 truncate">
                      {item.tagline}
                    </p>
                  )}
                  {/* Wrong count hint */}
                  {item.wrongCount > 1 && (
                    <p className="font-mono text-[10px]" style={{ color: "rgba(244,63,94,0.7)" }}>
                      ✕ {item.wrongCount}回 間違えた問題
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  {/* Problem link */}
                  <Link
                    href={`/problems/${item.problemSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all duration-200"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.55)",
                    }}
                  >
                    <ExternalLink className="h-3 w-3" />
                    問題を見る
                  </Link>

                  {/* Incorrect */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.problemSlug, false)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: "rgba(244,63,94,0.08)",
                      border: "1px solid rgba(244,63,94,0.25)",
                      color: "#f43f5e",
                    }}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    不正解
                  </button>

                  {/* Correct */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.problemSlug, true)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: "rgba(52,211,153,0.1)",
                      border: "1px solid rgba(52,211,153,0.3)",
                      color: "#34d399",
                    }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    正解
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
