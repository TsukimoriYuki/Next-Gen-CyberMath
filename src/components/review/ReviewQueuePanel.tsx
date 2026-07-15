"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
} from "lucide-react";
import {
  CompletionSummary,
  LearningState,
} from "@/components/learning/LearningPageFrame";

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

type QueueLoadState = "loading" | "ready" | "error" | "login-required";

const DIFFICULTY_COLOR: Record<string, string> = {
  A: "#059669",
  B: "#2563eb",
  C: "#d97706",
  D: "#e11d48",
  D_PLUS: "#7c3aed",
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
  "math-1a": "#2563eb",
  "math-2bc": "#7c3aed",
  "english-reading": "#059669",
  math: "#2563eb",
  english: "#059669",
};

function getProblemHref(item: ReviewItemData): string {
  if (item.itemType === "math-problem") return `/problems/${item.itemId}`;
  if (item.itemType === "common-test-drill" && item.subjectId && item.sectionId) {
    return `/common-test/${item.subjectId}/${item.sectionId}`;
  }
  return "#";
}

export function ReviewQueuePanel() {
  const [items, setItems] = useState<ReviewItemData[]>([]);
  const [loadState, setLoadState] = useState<QueueLoadState>("loading");
  const [completing, setCompleting] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);

  const fetchItems = useCallback(() => {
    setLoadState("loading");
    fetch("/api/review/today")
      .then((response) => {
        if (!response.ok) throw new Error("review request failed");
        return response.json();
      })
      .then((data) => {
        if (data.ok) {
          setItems(data.items as ReviewItemData[]);
          setLoadState("ready");
          return;
        }
        if (data.authenticated === false) {
          setItems([]);
          setLoadState("login-required");
          return;
        }
        setLoadState("error");
      })
      .catch(() => setLoadState("error"));
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
      setItems((prev) => prev.filter((item) => item.id !== reviewItemId));
    } finally {
      setCompleting(null);
    }
  };

  if (loadState === "loading") {
    return (
      <div className="mb-8">
        <LearningState
          kind="loading"
          headingLevel={3}
          title="今日の復習を読み込んでいます"
          description="保存済みの復習予定を確認しています。"
          compact
        />
      </div>
    );
  }

  if (loadState === "error") {
    return (
      <div className="mb-8">
        <LearningState
          kind="error"
          headingLevel={3}
          title="今日の復習を読み込めませんでした"
          description="通信状態を確認して、もう一度お試しください。"
          compact
          actions={
            <button type="button" onClick={fetchItems} className="button-primary">
              再読み込み
            </button>
          }
        />
      </div>
    );
  }

  if (loadState === "login-required") {
    return (
      <div className="mb-8">
        <LearningState
          kind="login-required"
          headingLevel={3}
          title="復習履歴の確認にはログインが必要です"
          description="ログインすると、今日取り組む問題と次回の復習日を確認できます。"
          compact
        />
      </div>
    );
  }

  if (items.length === 0 && done.length === 0) {
    return (
      <div className="mb-8">
        <LearningState
          kind="empty"
          headingLevel={3}
          title="今日が期限の復習はありません"
          description="新しい復習項目があると、ここに表示されます。"
          compact
        />
      </div>
    );
  }

  const allCleared = items.length === 0 && done.length > 0;

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <h3 className="text-sm font-bold text-slate-950">今日の復習キュー</h3>
          {items.length > 0 && (
            <span className="ml-1 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-blue-700 px-2 text-xs font-bold text-white">
              {items.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={fetchItems}
          aria-label="今日の復習キューを更新"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {allCleared ? (
        <div className="p-5">
          <CompletionSummary>
            <p className="font-bold">今日の復習は完了しました。</p>
            <p className="mt-1 text-sm">{done.length}問を解答済みです。次の復習日まで待ちましょう。</p>
          </CompletionSummary>
        </div>
      ) : (
        <ul className="divide-y divide-slate-200">
          {items.map((item) => {
            const isLoading = completing === item.id;
            const levelLabel = LEVEL_LABEL[item.level] ?? `Lv.${item.level}`;
            const href = getProblemHref(item);
            const subjectColor =
              (item.subjectId ? SUBJECT_COLOR[item.subjectId] : null) ?? "#475569";
            const subjectLabel =
              (item.subjectId ? SUBJECT_LABEL[item.subjectId] : null) ?? item.subjectId ?? "";

            return (
              <li
                key={item.id}
                className="flex flex-col gap-4 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="shrink-0 rounded border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-bold text-blue-800">
                      {levelLabel}
                    </span>

                    {item.itemType === "common-test-drill" && subjectLabel && (
                      <span
                        className="shrink-0 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold"
                        style={{ color: subjectColor }}
                      >
                        {subjectLabel}
                      </span>
                    )}

                    {item.itemType === "math-problem" && item.difficulty && (
                      <span
                        className="shrink-0 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold"
                        style={{ color: DIFFICULTY_COLOR[item.difficulty] ?? "#475569" }}
                      >
                        難度 {item.difficulty.replace("_", "+")}
                      </span>
                    )}

                    {item.unit && (
                      <span className="truncate text-xs text-slate-600">{item.unit}</span>
                    )}
                  </div>

                  <p className="truncate text-sm font-semibold leading-6 text-slate-950">
                    {item.title}
                  </p>

                  {item.tagline && (
                    <p className="truncate text-sm leading-6 text-slate-600">{item.tagline}</p>
                  )}

                  {item.skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillTags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {item.wrongCount > 1 && (
                    <p className="text-xs font-medium text-rose-700">
                      {item.wrongCount}回間違えた問題です
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {href !== "#" && (
                    <Link
                      href={href}
                      target={item.itemType === "math-problem" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      問題を見る
                    </Link>
                  )}

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.itemId, item.id, false)}
                    className="flex min-h-11 items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2 disabled:opacity-40"
                  >
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                    不正解
                  </button>

                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleComplete(item.itemId, item.id, true)}
                    className="flex min-h-11 items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:opacity-40"
                  >
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    正解
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
