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

interface ReviewItemData {
  id: string;
  itemType: string;
  itemId: string;
  subjectId: string | null;
  sectionId: string | null;
  title: string;
  source: string;
  level: number;
  wrongCount: number;
  correctStreak: number;
  reasonFlags: string[];
  skillTags: string[];
  nextReviewAt: string;
  // math-problem 専用
  unit: string | null;
  difficulty: string | null;
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

const SUBJECT_LABEL: Record<string, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学IIB(C)",
  "english-reading": "英語R",
  math: "数学",
  english: "英語",
};

const SUBJECT_COLOR: Record<string, string> = {
  "math-1a": "#60a5fa",
  "math-2bc": "#a78bfa",
  "english-reading": "#34d399",
  math: "#60a5fa",
  english: "#34d399",
};

function getProblemHref(item: ReviewItemData): string {
  if (item.itemType === "math-problem") return `/problems/${item.itemId}`;
  if (item.itemType === "common-test-drill" && item.subjectId && item.sectionId) {
    return `/common-test/${item.subjectId}/${item.sectionId}`;
  }
  return "#";
}

export function ReviewQueuePanel() {
  const [items, setItems] = useState<ReviewItemData[] | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const fetchItems = useCallback(() => {
    setItems(null);
    fetch("/api/review/today")
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setItems(data.items as ReviewItemData[]);
        else setItems([]);
      })
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    // API フェッチはマウント時の正規の副作用
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, [fetchItems]);

  const handleComplete = async (itemId: string, reviewItemId: string, isCorrect: boolean) => {
    setCompleting(reviewItemId);
    try {
      await fetch("/api/review/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewItemId, isCorrect }),
      });
      setDone((prev) => [...prev, reviewItemId]);
      setItems((prev) => prev?.filter((i) => i.id !== reviewItemId) ?? null);
    } finally {
      setCompleting(null);
    }
  };

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
                background: `rgba(245,158,11,0.20)`,
                border: `1px solid rgba(245,158,11,0.40)`,
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

      {allCleared ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <Trophy className="h-8 w-8" style={{ color: ACCENT }} />
          <p className="font-display font-bold text-white">今日の復習、完了！</p>
          <p className="font-mono text-xs text-white/40">
            {done.length}問 解答済み · 次回の復習まで待機中
          </p>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "rgba(245,158,11,0.08)" }}>
          {items.map((item) => {
            const isLoading = completing === item.id;
            const levelLabel = LEVEL_LABEL[item.level] ?? `Lv.${item.level}`;
            const href = getProblemHref(item);
            const subjColor = (item.subjectId ? SUBJECT_COLOR[item.subjectId] : null) ?? "#94a3b8";
            const subjLabel = (item.subjectId ? SUBJECT_LABEL[item.subjectId] : null) ?? item.subjectId ?? "";

            return (
              <li
                key={item.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                style={{ background: "rgba(0,0,0,0.15)" }}
              >
                {/* Info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
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

                    {item.itemType === "common-test-drill" && subjLabel && (
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                        style={{
                          background: `rgba(${hexToRgb(subjColor)},0.10)`,
                          border: `1px solid rgba(${hexToRgb(subjColor)},0.30)`,
                          color: subjColor,
                        }}
                      >
                        {subjLabel}
                      </span>
                    )}

                    {item.itemType === "math-problem" && item.difficulty && (
                      <span
                        className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold"
                        style={{
                          background: `rgba(${hexToRgb(DIFFICULTY_COLOR[item.difficulty] ?? "#94a3b8")},0.10)`,
                          border: `1px solid rgba(${hexToRgb(DIFFICULTY_COLOR[item.difficulty] ?? "#94a3b8")},0.30)`,
                          color: DIFFICULTY_COLOR[item.difficulty] ?? "#94a3b8",
                        }}
                      >
                        {item.difficulty.replace("_", "+")}
                      </span>
                    )}

                    {item.unit && (
                      <span className="font-mono text-[10px] text-white/35 truncate">
                        {item.unit}
                      </span>
                    )}
                  </div>

                  <p className="font-display text-sm font-semibold text-white leading-snug truncate">
                    {item.title}
                  </p>

                  {item.tagline && (
                    <p className="font-mono text-[11px] text-white/35 truncate">{item.tagline}</p>
                  )}

                  {item.skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {item.skillTags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded px-1 py-px font-mono text-[8px]"
                          style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.wrongCount > 1 && (
                    <p className="font-mono text-[10px]" style={{ color: "rgba(244,63,94,0.7)" }}>
                      ✕ {item.wrongCount}回 間違えた
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {href !== "#" && (
                    <Link
                      href={href}
                      target={item.itemType === "math-problem" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      <ExternalLink className="h-3 w-3" />
                      問題を見る
                    </Link>
                  )}

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.itemId, item.id, false)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all disabled:opacity-40"
                    style={{
                      background: "rgba(244,63,94,0.08)",
                      border: "1px solid rgba(244,63,94,0.25)",
                      color: "#f43f5e",
                    }}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    不正解
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.itemId, item.id, true)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-semibold transition-all disabled:opacity-40"
                    style={{
                      background: "rgba(52,211,153,0.10)",
                      border: "1px solid rgba(52,211,153,0.30)",
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

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}
