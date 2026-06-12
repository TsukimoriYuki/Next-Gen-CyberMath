"use client";

import { useState, useEffect } from "react";
import { Trophy, Clock, AlertTriangle, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import {
  getCommonTestExamHistory,
  clearCommonTestExamHistory,
  type CommonTestExamHistoryItem,
} from "@/lib/common-test-exam-history";
import { CommonTestAiStrategyPanel } from "@/components/common-test/ai/CommonTestAiStrategyPanel";
import { CommonTestGuidedReviewPanel } from "@/components/common-test/CommonTestGuidedReviewPanel";
import { buildCommonTestGuidedReviewItemsFromAnswers } from "@/lib/common-test-guided-review";
import type { CommonTestTheme } from "@/data/common-test";

const EXAM_LABELS: Record<string, { label: string; color: string; glowRgb: string }> = {
  "math-1a-70": { label: "数IA 70min", color: "#00d2ff", glowRgb: "0,210,255" },
  "math-1a-70-v2": { label: "数IA 第2回", color: "#00d2ff", glowRgb: "0,210,255" },
  "math-1a-70-v3": { label: "数IA 第3回", color: "#00d2ff", glowRgb: "0,210,255" },
  "math-2bc-70": { label: "数IIB 70min", color: "#a855f7", glowRgb: "168,85,247" },
  "math-2bc-70-v2": { label: "数IIBC 第2回", color: "#a855f7", glowRgb: "168,85,247" },
  "math-2bc-70-v3": { label: "数IIBC 第3回", color: "#a855f7", glowRgb: "168,85,247" },
  "english-reading-80": { label: "英語R 80min", color: "#10b981", glowRgb: "16,185,129" },
  "english-reading-80-v2": { label: "英語R 第2回", color: "#10b981", glowRgb: "16,185,129" },
  "english-reading-80-v3": { label: "英語R 第3回", color: "#10b981", glowRgb: "16,185,129" },
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
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setHistory(getCommonTestExamHistory());
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

  if (history.length === 0) {
    return (
      <div
        className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm"
      >
        <p className="mb-2 text-sm font-bold text-slate-700">
          本番演習の履歴はありません
        </p>
        <p className="text-xs leading-relaxed text-slate-500">
          本番演習を1回受けると、AI作戦会議・弱点分析・今日の学習メニューがより正確になります。
        </p>
        <a
          href="/common-test/simulator"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
        >
          本番演習を受ける →
        </a>
      </div>
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
          className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors"
          style={{
            background: confirmClear ? "#fff1f2" : "#ffffff",
            borderColor: confirmClear ? "#fecdd3" : "#e2e8f0",
            color: confirmClear ? "#e11d48" : "#64748b",
          }}
        >
          <Trash2 className="h-3 w-3" />
          {confirmClear ? "本当に削除する" : "履歴を削除"}
        </button>
      </div>

      {/* History items */}
      {history.map((item) => {
        const examInfo = EXAM_LABELS[item.examId] ?? { label: item.examId, color: "#ffffff", glowRgb: "255,255,255" };
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
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            >
              {/* Label */}
              <div
                className="shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold"
                style={{ background: `${examInfo.color}14`, color: examInfo.color }}
              >
                {examInfo.label}
              </div>

              {/* Date */}
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[11px] text-slate-500">{formatDate(item.finishedAt)}</div>
              </div>

              {/* Scores */}
              <div className="hidden items-center gap-4 sm:flex">
                <div className="text-center">
                  <div className="text-[9px] text-slate-400">時間内</div>
                  <div className="font-mono text-sm font-extrabold text-blue-600">{item.timeLimitScorePct}%</div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] text-slate-400">全問</div>
                  <div className="font-mono text-sm font-extrabold text-cyan-600">{item.unlimitedScorePct}%</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 font-mono text-[11px]" style={{ color: overTime ? "#ea580c" : "#94a3b8" }}>
                <Clock className="h-3 w-3" />
                {formatDuration(item.actualDurationSec)}
                {overTime && <span className="text-orange-600">(延長)</span>}
              </div>

              {/* Expand icon */}
              <div className="text-slate-300">
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
                      <div className="mb-2 text-[10px] font-bold text-slate-500">
                        {s.label}
                      </div>
                      <div className="font-mono text-2xl font-extrabold" style={{ color: s.color }}>
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
                  <div className="mb-2 text-[11px] font-bold text-slate-400">
                    大問別の結果
                  </div>
                  {item.sectionResults.map((sr) => {
                    const acc = sr.answeredCount > 0 ? Math.round((sr.correctCount / sr.answeredCount) * 100) : 0;
                    const accColor = acc >= 80 ? "#059669" : acc >= 60 ? "#d97706" : "#e11d48";
                    return (
                      <div key={sr.sectionId} className="flex items-center gap-3">
                        <span className="w-10 shrink-0 text-[11px] text-slate-500">第{sr.sectionNumber}問</span>
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full" style={{ width: `${acc}%`, background: accColor }} />
                        </div>
                        <span className="w-12 text-right font-mono text-[11px] font-bold" style={{ color: accColor }}>
                          {sr.answeredCount > 0 ? `${acc}%` : "—"}
                        </span>
                        <span className="w-14 text-right font-mono text-[10px] text-slate-400">
                          {sr.correctCount}/{sr.answeredCount}/{sr.totalQuestions}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Unanswered + weak tags */}
                <div className="flex flex-wrap gap-3 items-center">
                  {item.unansweredCount > 0 && (
                    <div className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-[11px] font-medium text-rose-600">
                      <AlertTriangle className="h-3 w-3" />
                      未回答 {item.unansweredCount}問
                    </div>
                  )}
                  {item.weakSkillTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-slate-100 px-2 py-1 text-[10px] text-slate-500"
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

                {/* AI作戦会議（展開時のみマウント。APIはボタン押下後にのみ呼ばれる） */}
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
