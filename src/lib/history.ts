import { getProblem, getLessonsByTag } from "@/lib/content";
import { UNIT_META_BY_NAME } from "@/data/units-meta";
import type { StoredAttempt } from "@/lib/exam";
import type { Lesson, Problem } from "@/lib/types";

/** その回に出題された「初見殺し（isMockOnly）」問題を返す（履歴からの復習用）。 */
export function mockOnlyProblemsOf(attempt: StoredAttempt): Problem[] {
  return attempt.problemSlugs
    .map((s) => getProblem(s))
    .filter((p): p is Problem => p != null && p.isMockOnly === true);
}

/** その回に誤答した問題を返す。 */
export function wrongProblemsOf(attempt: StoredAttempt): Problem[] {
  return attempt.wrongSlugs
    .map((s) => getProblem(s))
    .filter((p): p is Problem => p != null);
}

// 模試履歴（StoredAttempt[]）を分析ダッシュボード用に集計する純関数群。
// localStorage の読み出しは exam.ts(readAttemptsLocal) 側に隔離し、ここは純粋に保つ。

export interface HistorySummary {
  attempts: number;
  totalAnswered: number;
  /** 0–100。各回の正答率の平均。 */
  avgScorePct: number;
  totalTimeSec: number;
}

export function summarize(list: StoredAttempt[]): HistorySummary {
  if (list.length === 0) {
    return { attempts: 0, totalAnswered: 0, avgScorePct: 0, totalTimeSec: 0 };
  }
  let answered = 0;
  let time = 0;
  let pctSum = 0;
  for (const a of list) {
    answered += a.totalCount;
    time += a.durationSec;
    pctSum += a.totalCount > 0 ? a.score / a.totalCount : 0;
  }
  return {
    attempts: list.length,
    totalAnswered: answered,
    avgScorePct: Math.round((pctSum / list.length) * 100),
    totalTimeSec: time,
  };
}

export interface TrendPoint {
  index: number;
  date: string;
  score: number;
  total: number;
  scorePct: number;
}

/** 古い順（受験順）のスコア推移。readAttemptsLocal は新しい順なので並べ替える。 */
export function scoreTrend(list: StoredAttempt[]): TrendPoint[] {
  const sorted = [...list].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
  return sorted.map((a, i) => ({
    index: i + 1,
    date: a.createdAt,
    score: a.score,
    total: a.totalCount,
    scorePct: a.totalCount > 0 ? Math.round((a.score / a.totalCount) * 100) : 0,
  }));
}

export interface UnitStat {
  unit: string;
  order: number;
  attempted: number;
  wrong: number;
  /** 0–100。 */
  correctPct: number;
}

/** problemSlugs / wrongSlugs を unit に振り分け、単元別の正答率を出す。 */
export function unitStats(list: StoredAttempt[]): UnitStat[] {
  const att = new Map<string, number>();
  const wr = new Map<string, number>();
  for (const a of list) {
    for (const slug of a.problemSlugs) {
      const u = getProblem(slug)?.unit;
      if (!u) continue;
      att.set(u, (att.get(u) ?? 0) + 1);
    }
    for (const slug of a.wrongSlugs) {
      const u = getProblem(slug)?.unit;
      if (!u) continue;
      wr.set(u, (wr.get(u) ?? 0) + 1);
    }
  }
  const out: UnitStat[] = [];
  for (const [unit, attempted] of att) {
    const wrong = wr.get(unit) ?? 0;
    out.push({
      unit,
      order: UNIT_META_BY_NAME[unit]?.order ?? 999,
      attempted,
      wrong,
      correctPct: attempted > 0 ? Math.round((1 - wrong / attempted) * 100) : 0,
    });
  }
  return out.sort((a, b) => a.order - b.order || a.unit.localeCompare(b.unit, "ja"));
}

export interface WeakTag {
  tag: string;
  count: number;
}

/** 全 attempt の誤答問題のタグを集計し、頻度の高い順に返す（生データから再集計）。 */
export function weakTagRanking(list: StoredAttempt[], topN = 8): WeakTag[] {
  const freq = new Map<string, number>();
  for (const a of list) {
    for (const slug of a.wrongSlugs) {
      for (const t of getProblem(slug)?.tags ?? []) {
        freq.set(t, (freq.get(t) ?? 0) + 1);
      }
    }
  }
  return Array.from(freq.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ja"))
    .slice(0, topN);
}

export interface RecommendedLesson {
  lesson: Lesson;
  matchedTags: string[];
  /** カバーする弱点タグの頻度合計。 */
  weight: number;
}

/** 弱点タグをカバーする授業を、カバー重み（頻度合計）の高い順に返す。 */
export function recommendedLessons(weak: WeakTag[], topN = 4): RecommendedLesson[] {
  const acc = new Map<string, { lesson: Lesson; tags: Set<string>; weight: number }>();
  for (const w of weak) {
    for (const l of getLessonsByTag(w.tag)) {
      const e = acc.get(l.slug) ?? { lesson: l, tags: new Set<string>(), weight: 0 };
      e.tags.add(w.tag);
      e.weight += w.count;
      acc.set(l.slug, e);
    }
  }
  return Array.from(acc.values())
    .map((e) => ({ lesson: e.lesson, matchedTags: Array.from(e.tags), weight: e.weight }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, topN);
}

/** 秒数を「◯時間◯分 / ◯分◯秒 / ◯秒」に整形。 */
export function formatDuration(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m >= 60) {
    const h = Math.floor(m / 60);
    return `${h}時間${m % 60}分`;
  }
  if (m > 0) return `${m}分${s}秒`;
  return `${s}秒`;
}

/** ISO 文字列を「M/D HH:MM」に整形。 */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
