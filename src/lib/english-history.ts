import type { EnglishLevel } from "@/lib/english-types";

export type EnglishMode = "speed-reading" | "comprehension" | "multi-source";

export interface EnglishAttempt {
  id: string;
  problemId: string;
  mode: EnglishMode;
  level: EnglishLevel;
  score: number;
  total: number;
  completedAt: string; // ISO 8601
}

const HISTORY_KEY = "cyber-os:english-history:v1";
const HISTORY_EVENT = "cyber-os:english-history-changed";

// ── Write / Read / Clear ──────────────────────────────────────────────────

// Returns a Promise that resolves when the DB write completes (or rejects on failure).
// localStorage is always saved regardless of the DB result.
export function saveEnglishAttempt(
  att: Omit<EnglishAttempt, "id" | "completedAt">,
): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const full: EnglishAttempt = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    completedAt: new Date().toISOString(),
    ...att,
  };
  // ログイン中の場合は DB にもデュアルライト
  const dbWrite = fetch("/api/english-attempts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      problemId: att.problemId,
      mode: att.mode,
      level: att.level,
      score: att.score,
      total: att.total,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  });
  const list = readEnglishAttemptsLocal();
  list.unshift(full);
  const trimmed = list.slice(0, 50);
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  } catch {
    // QuotaExceededError — さらに削減してリトライ
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed.slice(0, 15)));
    } catch {
      // ストレージが完全に利用不可のため保存をスキップ
    }
  }
  window.dispatchEvent(new Event(HISTORY_EVENT));
  return dbWrite;
}

export function readEnglishAttemptsLocal(): EnglishAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function clearEnglishAttemptsLocal(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(HISTORY_KEY);
  window.dispatchEvent(new Event(HISTORY_EVENT));
}

// ── useSyncExternalStore helpers ──────────────────────────────────────────
// getSnapshot は raw 文字列が変わらない限り同じ参照を返す（無限再描画を防ぐ）。

const EMPTY: EnglishAttempt[] = [];
let cache: EnglishAttempt[] = EMPTY;
let cacheRaw: string | null = null;

export function getEnglishAttemptsSnapshot(): EnglishAttempt[] {
  if (typeof window === "undefined") return EMPTY;
  const raw = window.localStorage.getItem(HISTORY_KEY) ?? "[]";
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = JSON.parse(raw);
    } catch {
      cache = EMPTY;
    }
  }
  return cache;
}

export function getEnglishAttemptsServerSnapshot(): EnglishAttempt[] {
  return EMPTY;
}

export function subscribeEnglishAttempts(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  window.addEventListener(HISTORY_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(HISTORY_EVENT, callback);
  };
}

// ── Analytics ─────────────────────────────────────────────────────────────

function modeStats(attempts: EnglishAttempt[], mode: EnglishMode) {
  const list = attempts.filter((a) => a.mode === mode);
  const count = list.length;
  const avgAccuracy =
    count === 0
      ? 0
      : Math.round(
          list.reduce((s, a) => s + (a.score / a.total) * 100, 0) / count,
        );
  return { count, avgAccuracy };
}

export function computeEnglishStats(attempts: EnglishAttempt[]) {
  return {
    total: attempts.length,
    overallAccuracy:
      attempts.length === 0
        ? 0
        : Math.round(
            attempts.reduce((s, a) => s + (a.score / a.total) * 100, 0) /
              attempts.length,
          ),
    speedReading: modeStats(attempts, "speed-reading"),
    comprehension: modeStats(attempts, "comprehension"),
    multiSource: modeStats(attempts, "multi-source"),
  };
}
