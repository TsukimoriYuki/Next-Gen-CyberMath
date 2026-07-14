export const MAX_EXAM_DURATION_SEC = 24 * 60 * 60;

export type ExamClockSnapshot = {
  elapsedSec: number;
  remainingSec: number;
  durationSec: number;
};

type SnapshotInput = {
  startedAtMs: number;
  nowMs: number;
  durationSec: number;
};

function normalizeDurationSec(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Math.min(Math.floor(value), MAX_EXAM_DURATION_SEC);
}

/**
 * Computes exam time from wall-clock timestamps. Interval ticks never contribute
 * to elapsed time, so delayed callbacks and background tabs cannot extend an exam.
 */
export function getExamClockSnapshot({
  startedAtMs,
  nowMs,
  durationSec,
}: SnapshotInput): ExamClockSnapshot {
  const safeDurationSec = normalizeDurationSec(durationSec);
  const safeNowMs = Number.isFinite(nowMs) && nowMs >= 0 ? nowMs : 0;
  const safeStartedAtMs =
    Number.isFinite(startedAtMs) && startedAtMs >= 0 && startedAtMs <= safeNowMs
      ? startedAtMs
      : safeNowMs;
  const elapsedSec = Math.min(
    safeDurationSec,
    Math.floor((safeNowMs - safeStartedAtMs) / 1000),
  );

  return {
    elapsedSec,
    remainingSec: Math.max(0, safeDurationSec - elapsedSec),
    durationSec: safeDurationSec,
  };
}

type ExamClockControllerOptions = {
  startedAtMs: number;
  durationSec: number;
  now: () => number;
  schedule: (callback: () => void, intervalMs: number) => unknown;
  cancel: (timer: unknown) => void;
  onTick: (snapshot: ExamClockSnapshot) => void;
  onExpire: (snapshot: ExamClockSnapshot) => void;
  subscribeVisibility?: (sync: () => void) => () => void;
  subscribeFocus?: (sync: () => void) => () => void;
};

/** Starts a display clock and returns an idempotent cleanup function. */
export function startExamClockController({
  startedAtMs,
  durationSec,
  now,
  schedule,
  cancel,
  onTick,
  onExpire,
  subscribeVisibility,
  subscribeFocus,
}: ExamClockControllerOptions): () => void {
  let disposed = false;
  let expired = false;
  let timer: unknown;

  const sync = () => {
    if (disposed) return;
    const snapshot = getExamClockSnapshot({
      startedAtMs,
      nowMs: now(),
      durationSec,
    });
    onTick(snapshot);
    if (snapshot.remainingSec === 0 && !expired) {
      expired = true;
      onExpire(snapshot);
    }
  };

  sync();
  if (!expired) timer = schedule(sync, 1000);
  const unsubscribeVisibility = subscribeVisibility?.(sync);
  const unsubscribeFocus = subscribeFocus?.(sync);

  return () => {
    if (disposed) return;
    disposed = true;
    if (timer !== undefined) cancel(timer);
    unsubscribeVisibility?.();
    unsubscribeFocus?.();
  };
}
