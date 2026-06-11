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
