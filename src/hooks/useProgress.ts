"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  EMPTY_PROGRESS,
  markCompleted,
  PROGRESS_EVENT,
  PROGRESS_KEY,
  readProgress,
  writeProgress,
  type ProgressState,
} from "@/lib/progress";

// External-store subscription: same-tab (custom event) + cross-tab (storage).
function subscribe(onChange: () => void) {
  window.addEventListener(PROGRESS_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(PROGRESS_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Snapshot is the raw JSON string so React can compare cheaply with Object.is.
function getSnapshot() {
  return window.localStorage.getItem(PROGRESS_KEY) ?? "";
}
function getServerSnapshot() {
  return "";
}

const noop = () => () => {};

export function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // false on the server / first hydration render, true once on the client —
  // lets the UI hold placeholders until localStorage is readable.
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const state: ProgressState = useMemo(() => {
    if (!raw) return EMPTY_PROGRESS;
    try {
      return { ...EMPTY_PROGRESS, ...(JSON.parse(raw) as Partial<ProgressState>) };
    } catch {
      return EMPTY_PROGRESS;
    }
  }, [raw]);

  const complete = useCallback((slug: string) => {
    writeProgress(markCompleted(readProgress(), slug));
  }, []);

  const isCompleted = useCallback(
    (slug: string) => state.completed.includes(slug),
    [state.completed],
  );

  return {
    hydrated,
    completedCount: state.completed.length,
    streak: state.streak,
    bestStreak: state.bestStreak,
    completed: state.completed,
    isCompleted,
    complete,
  };
}
