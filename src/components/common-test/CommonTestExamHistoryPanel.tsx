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
        className="rounded-2xl px-6 py-10 text-center"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/25 mb-2">
          本番演習の履歴はありません
        </p>
        <p className="font-mono text-[11px] leading-relaxed text-white/20">
          本番演習を1回受けると、AI作戦会議・弱点分析・今日の学習メニューがより正確になります。
        </p>
        <a
          href="/common-test/simulator"
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-90"
          style={{ background: "rgba(251,191,36,0.10)", border: "1px solid rgba(251,191,36,0.28)", color: "#fbbf24" }}
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
        <div className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
          EXAM SIMULATOR HISTORY — {history.length}件
        </div>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] transition-all hover:opacity-80"
          style={{
            background: confirmClear ? "rgba(239,68,68,0.10)" : "rgba(255,255,255,0.04)",
            border: confirmClear ? "1px solid rgba(239,68,68,0.30)" : "1px solid rgba(255,255,255,0.10)",
            color: confirmClear ? "#ef4444" : "rgba(255,255,255,0.30)",
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
            className="rounded-2xl overflow-hidden"
            style={{ border: `1px solid rgba(${examInfo.glowRgb},0.18)` }}
          >
            {/* Summary row */}
            <button
              type="button"
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-all hover:opacity-90"
              style={{ background: `rgba(${examInfo.glowRgb},0.05)` }}
            >
              {/* Label */}
              <div
                className="shrink-0 rounded-lg px-2.5 py-1 font-mono text-[9px] font-bold"
                style={{
                  background: `rgba(${examInfo.glowRgb},0.12)`,
                  border: `1px solid rgba(${examInfo.glowRgb},0.30)`,
                  color: examInfo.color,
                }}
              >
                {examInfo.label}
              </div>

              {/* Date */}
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] text-white/50">{formatDate(item.finishedAt)}</div>
              </div>

              {/* Scores */}
              <div className="hidden sm:flex items-center gap-4">
                <div className="text-center">
                  <div className="font-mono text-[8px] text-amber-400/60 uppercase tracking-wider">時間内</div>
                  <div className="font-mono text-sm font-extrabold text-amber-400">{item.timeLimitScorePct}%</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-[8px] text-cyan-400/60 uppercase tracking-wider">全問</div>
                  <div className="font-mono text-sm font-extrabold text-cyan-400">{item.unlimitedScorePct}%</div>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-1 font-mono text-[9px]" style={{ color: overTime ? "#f97316" : "rgba(255,255,255,0.35)" }}>
                <Clock className="h-3 w-3" />
                {formatDuration(item.actualDurationSec)}
                {overTime && <span className="text-orange-400">(延長)</span>}
              </div>

              {/* Expand icon */}
              <div className="text-white/25">
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div
                className="px-5 pb-5 pt-3 space-y-4"
                style={{ background: "rgba(0,0,0,0.25)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Score bars */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "時間内スコア",
                      pct: item.timeLimitScorePct,
                      value: item.timeLimitScore ?? item.timeLimitCorrect,
                      total: item.maxScore ?? item.totalQuestions,
                      unit: item.maxScore != null ? "点" : "問",
                      color: "#fbbf24",
                      glow: "251,191,36",
                    },
                    {
                      label: "無制限スコア",
                      pct: item.unlimitedScorePct,
                      value: item.unlimitedScore ?? item.unlimitedCorrect,
                      total: item.maxScore ?? item.totalQuestions,
                      unit: item.maxScore != null ? "点" : "問",
                      color: "#22d3ee",
                      glow: "34,211,238",
                    },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl p-3" style={{ background: `rgba(${s.glow},0.06)`, border: `1px solid rgba(${s.glow},0.18)` }}>
                      <div className="font-mono text-[8px] uppercase tracking-[0.15em] mb-2" style={{ color: `rgba(${s.glow},0.7)` }}>
                        {s.label}
                      </div>
                      <div className="font-mono text-2xl font-extrabold" style={{ color: s.color }}>
                        {s.value} <span className="text-sm text-white/30">/ {s.total}{s.unit}</span>
                      </div>
                      <div className="mt-2 h-1 rounded-full overflow-hidden bg-white/[0.08]">
                        <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: `rgba(${s.glow},0.8)` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section results */}
                <div className="space-y-1.5">
                  <div className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/25 mb-2">
                    SECTION BREAKDOWN
                  </div>
                  {item.sectionResults.map((sr) => {
                    const acc = sr.answeredCount > 0 ? Math.round((sr.correctCount / sr.answeredCount) * 100) : 0;
                    const accColor = acc >= 80 ? "#22c55e" : acc >= 60 ? "#fbbf24" : "#ef4444";
                    return (
                      <div key={sr.sectionId} className="flex items-center gap-3">
                        <span className="font-mono text-[9px] text-white/35 w-10 shrink-0">第{sr.sectionNumber}問</span>
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
                          <div className="h-full rounded-full" style={{ width: `${acc}%`, background: accColor }} />
                        </div>
                        <span className="font-mono text-[9px] font-bold w-12 text-right" style={{ color: accColor }}>
                          {sr.answeredCount > 0 ? `${acc}%` : "—"}
                        </span>
                        <span className="font-mono text-[8px] text-white/25 w-14 text-right">
                          {sr.correctCount}/{sr.answeredCount}/{sr.totalQuestions}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Unanswered + weak tags */}
                <div className="flex flex-wrap gap-3 items-center">
                  {item.unansweredCount > 0 && (
                    <div
                      className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[9px]"
                      style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)", color: "#ef4444" }}
                    >
                      <AlertTriangle className="h-3 w-3" />
                      未回答 {item.unansweredCount}問
                    </div>
                  )}
                  {item.weakSkillTags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg px-2 py-1 font-mono text-[8px]"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.40)" }}
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
