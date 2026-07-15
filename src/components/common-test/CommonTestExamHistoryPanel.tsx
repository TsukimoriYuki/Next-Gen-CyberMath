"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, AlertTriangle, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  getCommonTestExamHistory,
  clearCommonTestExamHistory,
  type CommonTestExamHistoryItem,
} from "@/lib/common-test-exam-history";
import { CommonTestAiStrategyPanel } from "@/components/common-test/ai/CommonTestAiStrategyPanel";
import { CommonTestGuidedReviewPanel } from "@/components/common-test/CommonTestGuidedReviewPanel";
import { buildCommonTestGuidedReviewItemsFromAnswers } from "@/lib/common-test-guided-review";
import type { CommonTestTheme } from "@/data/common-test";
import { LearningState } from "@/components/learning/LearningPageFrame";

const EXAM_LABELS: Record<string, { label: string; color: string; glowRgb: string }> = {
  "math-1a-70": { label: "数IA 70分", color: "#2563eb", glowRgb: "37,99,235" },
  "math-1a-70-v2": { label: "数IA 第2回", color: "#2563eb", glowRgb: "37,99,235" },
  "math-1a-70-v3": { label: "数IA 第3回", color: "#2563eb", glowRgb: "37,99,235" },
  "math-2bc-70": { label: "数IIB 70分", color: "#7c3aed", glowRgb: "124,58,237" },
  "math-2bc-70-v2": { label: "数IIBC 第2回", color: "#7c3aed", glowRgb: "124,58,237" },
  "math-2bc-70-v3": { label: "数IIBC 第3回", color: "#7c3aed", glowRgb: "124,58,237" },
  "english-reading-80": { label: "英語R 80分", color: "#059669", glowRgb: "5,150,105" },
  "english-reading-80-v2": { label: "英語R 第2回", color: "#059669", glowRgb: "5,150,105" },
  "english-reading-80-v3": { label: "英語R 第3回", color: "#059669", glowRgb: "5,150,105" },
};

function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function CommonTestExamHistoryPanel() {
  const [history, setHistory] = useState<CommonTestExamHistoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(getCommonTestExamHistory());
    setHydrated(true);
  }, []);

  function handleClear() {
    if (confirmClear) {
      clearCommonTestExamHistory();
      setHistory([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  if (!hydrated) {
    return (
      <LearningState
        kind="loading"
        title="本番演習の履歴を読み込んでいます"
        description="この端末に保存された演習結果を確認しています。"
        compact
      />
    );
  }

  if (history.length === 0) {
    return (
      <LearningState
        kind="empty"
        title="本番演習の履歴はありません"
        description="70分の本番形式を1回受けると、本番分析、弱点分析、今日の学習メニューがより正確になります。まとまった時間がない場合は、大問別ドリルで先に現在地を測れます。"
        actions={
          <>
          <Link
            href="/common-test/simulator"
            className="button-primary"
          >
            70分の本番演習を始める
          </Link>
          <Link
            href="/common-test/math-1a"
            className="button-secondary"
          >
            ミニ診断から始める
          </Link>
          </>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-500">
          本番演習の履歴 — {history.length}件
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="flex min-h-11 items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          style={{
            background: confirmClear ? "#fff1f2" : "#ffffff",
            borderColor: confirmClear ? "#fecdd3" : "#e2e8f0",
            color: confirmClear ? "#e11d48" : "#64748b",
          }}
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {confirmClear ? "本当に削除する" : "履歴を削除"}
        </button>
      </div>

      {/* History items */}
      {history.map((item) => {
        const examInfo = EXAM_LABELS[item.examId] ?? { label: item.examId, color: "#475569", glowRgb: "71,85,105" };
        const isExpanded = expandedId === item.id;
        const overTime = item.actualDurationSec > item.examLimitSec;
        const guidedReviewItems = isExpanded
          ? buildCommonTestGuidedReviewItemsFromAnswers(item.answers, item.examId)
          : [];

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* Summary row */}
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              aria-expanded={isExpanded}
              className="flex min-h-11 w-full flex-wrap items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 sm:flex-nowrap sm:px-5"
            >
              {/* Label */}
              <div
                className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold"
                style={{ background: `${examInfo.color}14`, color: examInfo.color }}
              >
                {examInfo.label}
              </div>

              {/* Date */}
              <div className="min-w-0 flex-1">
                <div className="text-xs text-slate-600">{formatDate(item.finishedAt)}</div>
              </div>

              {/* Scores */}
              <div className="hidden items-center gap-4 sm:flex">
                <div className="text-center">
                  <div className="text-xs text-slate-600">時間内</div>
                  <div className="text-sm font-extrabold text-blue-700">{item.timeLimitScorePct}%</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-slate-600">全問</div>
                  <div className="text-sm font-extrabold text-cyan-700">{item.unlimitedScorePct}%</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 text-xs" style={{ color: overTime ? "#c2410c" : "#64748b" }}>
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDuration(item.actualDurationSec)}
                {overTime && <span className="text-orange-600">(延長)</span>}
              </div>

              {/* Expand icon */}
              <div className="text-slate-500" aria-hidden="true">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className="space-y-4 border-t border-slate-100 bg-slate-50 px-5 pb-5 pt-4">
                {/* Score bars */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "時間内スコア",
                      pct: item.timeLimitScorePct,
                      value: item.timeLimitScore ?? item.timeLimitCorrect,
                      total: item.maxScore ?? item.totalQuestions,
                      unit: item.maxScore != null ? "点" : "問",
                      color: "#2563eb",
                    },
                    {
                      label: "時間外スコア",
                      pct: item.unlimitedScorePct,
                      value: item.unlimitedScore ?? item.unlimitedCorrect,
                      total: item.maxScore ?? item.totalQuestions,
                      unit: item.maxScore != null ? "点" : "問",
                      color: "#0891b2",
                    },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-200 bg-white p-3">
                      <div className="mb-2 text-xs font-bold text-slate-600">
                        {s.label}
                      </div>
                      <div className="text-2xl font-extrabold" style={{ color: s.color }}>
                        {s.value} <span className="text-sm text-slate-300">/ {s.total}{s.unit}</span>
                      </div>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section results */}
                <div className="space-y-1.5">
                  <div className="mb-2 text-xs font-bold text-slate-600">
                    大問別の結果
                  </div>
                  {item.sectionResults.map((sr) => {
                    const acc = sr.answeredCount > 0 ? Math.round((sr.correctCount / sr.answeredCount) * 100) : 0;
                    const accColor = acc >= 80 ? "#059669" : acc >= 60 ? "#d97706" : "#e11d48";
                    return (
                      <div key={sr.sectionId} className="flex items-center gap-3">
                        <span className="w-12 shrink-0 text-xs text-slate-600">第{sr.sectionNumber}問</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full" style={{ width: `${acc}%`, background: accColor }} />
                        </div>
                        <span className="w-12 text-right text-xs font-bold" style={{ color: accColor }}>
                          {sr.answeredCount > 0 ? `${acc}%` : "—"}
                        </span>
                        <span className="w-16 text-right text-xs text-slate-600">
                          {sr.correctCount}/{sr.answeredCount}/{sr.totalQuestions}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Unanswered + weak tags */}
                <div className="flex flex-wrap gap-3 items-center">
                  {item.unansweredCount > 0 && (
                    <div className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700">
                      <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                      未回答 {item.unansweredCount}問
                    </div>
                  )}
                  {item.weakSkillTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {guidedReviewItems.length > 0 && (
                  <CommonTestGuidedReviewPanel
                    items={guidedReviewItems}
                    title="この本番演習を段階復習する"
                    description="保存された答案を使い、不正解・未解答・前問利用の問題から順に復習できます。"
                    theme={{
                      primary: examInfo.color,
                      glowRgb: examInfo.glowRgb,
                    }}
                    compact
                  />
                )}

                {/* 本番分析（展開時のみマウント。APIはボタン押下後にのみ呼ばれる） */}
                <CommonTestAiStrategyPanel
                  examHistoryItem={item}
                  theme={
                    {
                      primary: examInfo.color,
                      secondary: examInfo.color,
                      glowRgb: examInfo.glowRgb,
                    } satisfies CommonTestTheme
                  }
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
