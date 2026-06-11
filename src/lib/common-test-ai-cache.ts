// ── 共通テスト AI作戦会議 — localStorageキャッシュ ─────────────────────────
// examHistoryId ごとに分析結果を保存し、再表示時にAPIを再実行せず使い回す。

import type { CommonTestAiAnalysisResult } from "@/lib/common-test-ai-analysis";

const COMMON_TEST_AI_ANALYSIS_KEY = "cyber-os:common-test-ai-analysis";
const MAX_AI_ANALYSIS = 50;

interface CachedEntry {
  examHistoryId: string;
  analysis: CommonTestAiAnalysisResult;
  savedAt: string; // ISO
}

function isAvailable(): boolean {
  return typeof window !== "undefined";
}

function readRaw(): CachedEntry[] {
  if (!isAvailable()) return [];
  try {
    const raw = localStorage.getItem(COMMON_TEST_AI_ANALYSIS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as CachedEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveCommonTestAiAnalysis(
  examHistoryId: string,
  analysis: CommonTestAiAnalysisResult
): void {
  if (!isAvailable()) return;
  try {
    const existing = readRaw().filter((e) => e.examHistoryId !== examHistoryId);
    const updated: CachedEntry[] = [
      { examHistoryId, analysis, savedAt: new Date().toISOString() },
      ...existing,
    ].slice(0, MAX_AI_ANALYSIS);
    localStorage.setItem(COMMON_TEST_AI_ANALYSIS_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded — silently ignore
  }
}

export function getCommonTestAiAnalysis(
  examHistoryId: string
): CommonTestAiAnalysisResult | null {
  const entry = readRaw().find((e) => e.examHistoryId === examHistoryId);
  return entry?.analysis ?? null;
}

export function clearCommonTestAiAnalysis(): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(COMMON_TEST_AI_ANALYSIS_KEY);
  } catch {}
}
