// ── 共通テスト AI作戦会議 — localStorageキャッシュ ─────────────────────────
// examHistoryId ごとに分析結果を保存し、再表示時にAPIを再実行せず使い回す。

import type {
  CommonTestAiAnalysisResult,
  CommonTestAiAnalysisSource,
} from "@/lib/common-test-ai-analysis";

const COMMON_TEST_AI_ANALYSIS_KEY = "cyber-os:common-test-ai-analysis";
const MAX_AI_ANALYSIS = 50;

export interface CommonTestAiAnalysisCacheEntry {
  examHistoryId: string;
  analysis: CommonTestAiAnalysisResult;
  savedAt?: string; // ISO
  source?: CommonTestAiAnalysisSource;
}

function isAvailable(): boolean {
  return typeof window !== "undefined";
}

function isSource(v: unknown): v is CommonTestAiAnalysisSource {
  return v === "gemini" || v === "rule";
}

function readRaw(): CommonTestAiAnalysisCacheEntry[] {
  if (!isAvailable()) return [];
  try {
    const raw = localStorage.getItem(COMMON_TEST_AI_ANALYSIS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry): entry is Record<string, unknown> => {
        return typeof entry === "object" && entry !== null;
      })
      .filter((entry) => {
        return (
          typeof entry.examHistoryId === "string" &&
          typeof entry.analysis === "object" &&
          entry.analysis !== null
        );
      })
      .map((entry) => ({
        examHistoryId: entry.examHistoryId as string,
        analysis: entry.analysis as CommonTestAiAnalysisResult,
        savedAt: typeof entry.savedAt === "string" ? entry.savedAt : undefined,
        source: isSource(entry.source) ? entry.source : undefined,
      }));
  } catch {
    return [];
  }
}

export function saveCommonTestAiAnalysis(
  examHistoryId: string,
  analysis: CommonTestAiAnalysisResult,
  source?: CommonTestAiAnalysisSource
): void {
  if (!isAvailable()) return;
  try {
    const existing = readRaw().filter((e) => e.examHistoryId !== examHistoryId);
    const updated: CommonTestAiAnalysisCacheEntry[] = [
      { examHistoryId, analysis, source, savedAt: new Date().toISOString() },
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
  return getCommonTestAiAnalysisEntry(examHistoryId)?.analysis ?? null;
}

export function getCommonTestAiAnalysisEntry(
  examHistoryId: string
): CommonTestAiAnalysisCacheEntry | null {
  return readRaw().find((e) => e.examHistoryId === examHistoryId) ?? null;
}

export function clearCommonTestAiAnalysis(): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(COMMON_TEST_AI_ANALYSIS_KEY);
  } catch {}
}
