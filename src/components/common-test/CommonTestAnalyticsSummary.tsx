"use client";

import { useState, useEffect } from "react";
import {
  getCommonTestDrillHistory,
  TAG_RECOMMENDATIONS,
  type CommonTestDrillHistoryItem,
} from "@/lib/common-test-history";
import { BarChart2, Clock, Flame, Target, TrendingUp } from "lucide-react";

const SUBJECT_LABELS: Record<string, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学IIB(C)",
  "english-reading": "英語R",
};

function fmtSec(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}分${s}秒` : `${s}秒`;
}

interface Analytics {
  drillCount: number;
  avgAccuracy: number;
  topWeakTag: string | null;
  mostOvertimeSubject: string | null;
  recommendedReview: string | null;
  recentGrades: string[];
}

function computeAnalytics(history: CommonTestDrillHistoryItem[]): Analytics {
  if (history.length === 0) {
    return {
      drillCount: 0,
      avgAccuracy: 0,
      topWeakTag: null,
      mostOvertimeSubject: null,
      recommendedReview: null,
      recentGrades: [],
    };
  }

  const recent = history.slice(0, 10);
  const avgAccuracy =
    recent.reduce(
      (s, h) => s + (h.totalQuestions > 0 ? h.correctCount / h.totalQuestions : 0),
      0
    ) / recent.length;

  // Top weak tag across all history
  const tagFreq = new Map<string, number>();
  for (const h of history) {
    for (const tag of h.weakSkillTags.slice(0, 3)) {
      tagFreq.set(tag, (tagFreq.get(tag) ?? 0) + 1);
    }
  }
  const topWeakTag =
    tagFreq.size > 0
      ? [...tagFreq.entries()].sort((a, b) => b[1] - a[1])[0][0]
      : null;

  // Subject with most overtime questions
  const subjectOvertime = new Map<string, number>();
  for (const h of history) {
    const cur = subjectOvertime.get(h.subjectId) ?? 0;
    subjectOvertime.set(h.subjectId, cur + h.overTimeQuestionIds.length);
  }
  const mostOvertimeSubject =
    subjectOvertime.size > 0
      ? [...subjectOvertime.entries()].sort((a, b) => b[1] - a[1])[0][0]
      : null;

  // Recommended review from top weak tag
  const recommendedReview =
    topWeakTag && TAG_RECOMMENDATIONS[topWeakTag]
      ? TAG_RECOMMENDATIONS[topWeakTag]
      : topWeakTag ?? null;

  // Recent grades (last 5)
  const recentGrades = recent.slice(0, 5).map((h) => {
    const pct =
      h.totalQuestions > 0 ? Math.round((h.correctCount / h.totalQuestions) * 100) : 0;
    if (pct >= 90) return "S";
    if (pct >= 75) return "A";
    if (pct >= 60) return "B";
    return "C";
  });

  return {
    drillCount: history.length,
    avgAccuracy: Math.round(avgAccuracy * 100),
    topWeakTag,
    mostOvertimeSubject,
    recommendedReview,
    recentGrades,
  };
}

const GRADE_COLORS: Record<string, string> = {
  S: "#facc15",
  A: "#22c55e",
  B: "#38bdf8",
  C: "#fb923c",
};

export function CommonTestAnalyticsSummary() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const history = getCommonTestDrillHistory();
    setAnalytics(computeAnalytics(history));
  }, []);

  if (!analytics) return null;

  if (analytics.drillCount === 0) {
    return (
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="font-mono text-[10px] text-white/25 uppercase tracking-wider">
          ANALYTICS — 演習すると分析が表示されます
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5 space-y-4"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          <BarChart2 className="h-4 w-4" />
          ANALYTICS SUMMARY
        </div>
        {/* Mini grade strip */}
        <div className="flex gap-1">
          {analytics.recentGrades.map((g, i) => (
            <span
              key={i}
              className="font-mono text-[10px] font-extrabold"
              style={{ color: GRADE_COLORS[g] ?? "#ffffff" }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <AnalyticCard
          icon={<Target className="h-4 w-4" />}
          label="演習回数"
          value={`${analytics.drillCount}回`}
          color="#38bdf8"
        />
        <AnalyticCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="直近の平均正答率"
          value={`${analytics.avgAccuracy}%`}
          color={
            analytics.avgAccuracy >= 75
              ? "#22c55e"
              : analytics.avgAccuracy >= 60
              ? "#fbbf24"
              : "#fb923c"
          }
        />
        <AnalyticCard
          icon={<Flame className="h-4 w-4" />}
          label="最頻弱点タグ"
          value={analytics.topWeakTag ?? "—"}
          color="#f97316"
          small
        />
        <AnalyticCard
          icon={<Clock className="h-4 w-4" />}
          label="時間超過が多い科目"
          value={
            analytics.mostOvertimeSubject
              ? (SUBJECT_LABELS[analytics.mostOvertimeSubject] ?? analytics.mostOvertimeSubject)
              : "—"
          }
          color="#fbbf24"
          small
        />
      </div>

      {analytics.recommendedReview && (
        <div
          className="flex items-start gap-3 rounded-xl p-3"
          style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.18)" }}
        >
          <Flame className="h-4 w-4 shrink-0 text-orange-400 mt-0.5" />
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-orange-400 mb-0.5">
              TODAY&apos;S RECOMMENDED REVIEW
            </div>
            <p className="font-mono text-[10px] text-white/60">{analytics.recommendedReview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function AnalyticCard({
  icon,
  label,
  value,
  color,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-3 space-y-1"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/30">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-mono font-bold leading-tight ${small ? "text-[11px]" : "text-lg"}`}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
