// ── 共通テスト EXAM SIMULATOR — 履歴型定義 + localStorage CRUD ──────────

import type { CommonTestConfidence } from "@/lib/common-test-history";
export type { CommonTestConfidence };

export interface CommonTestExamAnswerRecord {
  questionId: string;
  sectionId: string;
  selectedAnswer: string | null;
  correctAnswer: string | string[];
  isCorrect: boolean;
  estimatedSec: number;          // from question data (estimatedMinutes * 60)
  answeredAtSec: number | null;  // seconds from exam start when first answered (null = unanswered)
  markedForReview: boolean;
  confidence: CommonTestConfidence | null;
  skillTags: string[];
}

export interface CommonTestExamSectionResult {
  sectionId: string;
  sectionNumber: number;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  /** 大問タイトル（Phase 5.6以降の記録のみ） */
  sectionTitle?: string;
  /** 大問配点（配点ベース採点時のみ） */
  maxScore?: number;
  /** 全問換算の獲得点（配点ベース採点時のみ） */
  earnedScore?: number;
  /** 時間内回答での獲得点（配点ベース採点時のみ） */
  timeLimitEarnedScore?: number;
  /** 時間内に正解した問題数（配点ベース採点時のみ） */
  timeLimitCorrectCount?: number;
}

export interface CommonTestExamHistoryItem {
  id: string;
  examId: string;
  subjectId: string;
  startedAt: string;          // ISO
  finishedAt: string;         // ISO
  examLimitSec: number;
  actualDurationSec: number;
  totalQuestions: number;
  timeLimitCorrect: number;   // correct answers where answeredAtSec <= examLimitSec
  unlimitedCorrect: number;   // all correct answers
  timeLimitScorePct: number;  // 0-100
  unlimitedScorePct: number;  // 0-100
  unansweredCount: number;
  sectionResults: CommonTestExamSectionResult[];
  answers: CommonTestExamAnswerRecord[];
  weakSkillTags: string[];
  /** ── 配点ベース採点（Phase 5.6以降の記録のみ。旧履歴には存在しない） ── */
  /** 受験した大問の配点合計 */
  maxScore?: number;
  /** 時間内回答での得点 */
  timeLimitScore?: number;
  /** 全問換算の得点 */
  unlimitedScore?: number;
  /** 選択制試験で実際に解答した大問ID（必答含む） */
  selectedSectionIds?: string[];
}

// ─────────────────────────────────────────────────────────────────────────
const EXAM_HISTORY_KEY = "cyber-os:common-test-exam-history";
const MAX_EXAM_HISTORY = 50;

function isAvailable(): boolean {
  return typeof window !== "undefined";
}

function readRaw(): CommonTestExamHistoryItem[] {
  if (!isAvailable()) return [];
  try {
    const raw = localStorage.getItem(EXAM_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCommonTestExamHistory(item: CommonTestExamHistoryItem): void {
  if (!isAvailable()) return;
  try {
    const existing = readRaw();
    const updated = [item, ...existing].slice(0, MAX_EXAM_HISTORY);
    localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded — silently ignore
  }
}

export function getCommonTestExamHistory(): CommonTestExamHistoryItem[] {
  return readRaw();
}

export function clearCommonTestExamHistory(): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(EXAM_HISTORY_KEY);
  } catch {}
}

/**
 * 教科ごとの「最新の本番演習スコア（0〜100）」を返す。
 * 履歴は新しい順に保存されているため、各 subjectId で最初に見つかったものが最新。
 * スコアは原則 inTimeScore（時間内得点）。配点が無い旧履歴は時間内/全問の正答率(%)にフォールバック。
 */
export function getLatestCommonTestExamScores(): Record<string, number> {
  const history = [...readRaw()].sort((a, b) => {
    const bt = Date.parse(b.finishedAt || b.startedAt);
    const at = Date.parse(a.finishedAt || a.startedAt);
    return (Number.isFinite(bt) ? bt : 0) - (Number.isFinite(at) ? at : 0);
  });
  const result: Record<string, number> = {};
  for (const item of history) {
    if (item.subjectId in result) continue; // 既に最新を取得済み
    const score =
      item.timeLimitScore ??
      item.unlimitedScore ??
      item.timeLimitScorePct ??
      item.unlimitedScorePct;
    if (typeof score === "number" && Number.isFinite(score)) {
      result[item.subjectId] = Math.round(score);
    }
  }
  return result;
}
