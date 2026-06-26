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
  S: "#ca8a04",
  A: "#059669",
  B: "#2563eb",
  C: "#ea580c",
};

export function CommonTestAnalyticsSummary() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    const history = getCommonTestDrillHistory();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnalytics(computeAnalytics(history));
  }, []);

  if (!analytics) return null;

  if (analytics.drillCount === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
        <div className="text-xs text-slate-400">
          まずは10分診断で現在地を測ると、弱点レポートが表示されます
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <BarChart2 className="h-4 w-4 text-blue-600" />
          弱点レポート
        </div>
        {/* Mini grade strip */}
        <div className="flex gap-1">
          {analytics.recentGrades.map((g, i) => (
            <span
              key={i}
              className="font-mono text-[11px] font-extrabold"
              style={{ color: GRADE_COLORS[g] ?? "#475569" }}
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
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <Flame className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div>
            <div className="mb-0.5 text-[11px] font-bold text-amber-700">
              今日のおすすめ復習
            </div>
            <p className="text-xs text-slate-600">{analytics.recommendedReview}</p>
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
    <div className="space-y-1 rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
        <span style={{ color }}>{icon}</span>
        {label}
      </div>
      <div
        className={`font-bold leading-tight ${small ? "text-xs" : "font-mono text-lg"}`}
        style={{ color }}
      >
        {value}
      </div>
    </div>
  );
}
