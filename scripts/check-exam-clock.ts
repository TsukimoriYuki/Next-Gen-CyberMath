import assert from "node:assert/strict";
import {
  MAX_EXAM_DURATION_SEC,
  getExamClockSnapshot,
  startExamClockController,
} from "../src/lib/exam-clock";

function testSnapshots() {
  assert.deepEqual(
    getExamClockSnapshot({ startedAtMs: 1_000, nowMs: 1_000, durationSec: 70 * 60 }),
    { elapsedSec: 0, remainingSec: 4_200, durationSec: 4_200 },
    "a 70 minute exam must start at 70:00",
  );
  assert.equal(
    getExamClockSnapshot({ startedAtMs: 1_000, nowMs: 6_900, durationSec: 60 }).elapsedSec,
    5,
    "elapsed time must come from Date.now(), not callback count",
  );
  assert.deepEqual(
    getExamClockSnapshot({ startedAtMs: 0, nowMs: 60_000, durationSec: 61 }),
    { elapsedSec: 60, remainingSec: 1, durationSec: 61 },
    "one second must remain before the deadline",
  );
  assert.deepEqual(
    getExamClockSnapshot({ startedAtMs: 0, nowMs: 61_000, durationSec: 61 }),
    { elapsedSec: 61, remainingSec: 0, durationSec: 61 },
    "remaining time must reach zero without becoming negative",
  );
  assert.equal(
    getExamClockSnapshot({ startedAtMs: 0, nowMs: 10_000_000, durationSec: 60 }).elapsedSec,
    60,
    "a sleep-sized time jump must expire the exam",
  );
  assert.equal(
    getExamClockSnapshot({ startedAtMs: Number.NaN, nowMs: 10_000, durationSec: 60 }).elapsedSec,
    0,
    "a corrupt start timestamp must not create fabricated elapsed time",
  );
  assert.equal(
    getExamClockSnapshot({ startedAtMs: 20_000, nowMs: 10_000, durationSec: 60 }).elapsedSec,
    0,
    "a future start timestamp must be rejected",
  );
  assert.equal(
    getExamClockSnapshot({ startedAtMs: 0, nowMs: 1, durationSec: Number.MAX_SAFE_INTEGER })
      .durationSec,
    MAX_EXAM_DURATION_SEC,
    "exam duration must have a defensive upper bound",
  );
}

function testController() {
  let nowMs = 0;
  let scheduled: (() => void) | undefined;
  let visibilitySync: (() => void) | undefined;
  let focusSync: (() => void) | undefined;
  let clearCount = 0;
  let visibilityCleanupCount = 0;
  let focusCleanupCount = 0;
  let expireCount = 0;
  const elapsed: number[] = [];

  const dispose = startExamClockController({
    startedAtMs: 0,
    durationSec: 10,
    now: () => nowMs,
    schedule: (callback, intervalMs) => {
      assert.equal(intervalMs, 1_000);
      scheduled = callback;
      return "timer";
    },
    cancel: (timer) => {
      assert.equal(timer, "timer");
      clearCount += 1;
    },
    onTick: (snapshot) => elapsed.push(snapshot.elapsedSec),
    onExpire: () => {
      expireCount += 1;
    },
    subscribeVisibility: (sync) => {
      visibilitySync = sync;
      return () => {
        visibilityCleanupCount += 1;
      };
    },
    subscribeFocus: (sync) => {
      focusSync = sync;
      return () => {
        focusCleanupCount += 1;
      };
    },
  });

  assert.deepEqual(elapsed, [0], "controller must publish its initial snapshot");

  nowMs = 4_500;
  scheduled?.();
  assert.equal(elapsed.at(-1), 4, "a delayed interval must catch up by wall-clock time");

  nowMs = 7_000;
  visibilitySync?.();
  assert.equal(elapsed.at(-1), 7, "visibility restoration must synchronize immediately");

  nowMs = 10_000;
  focusSync?.();
  scheduled?.();
  visibilitySync?.();
  assert.equal(expireCount, 1, "automatic submission must run exactly once");

  const tickCountBeforeDispose = elapsed.length;
  dispose();
  dispose();
  nowMs = 20_000;
  scheduled?.();
  visibilitySync?.();
  focusSync?.();
  assert.equal(elapsed.length, tickCountBeforeDispose, "disposed clocks must ignore later callbacks");
  assert.equal(clearCount, 1, "cleanup must clear one interval exactly once");
  assert.equal(visibilityCleanupCount, 1, "cleanup must remove the visibility listener");
  assert.equal(focusCleanupCount, 1, "cleanup must remove the focus listener");
}

testSnapshots();
testController();
console.log("exam clock QA passed: wall-clock timing, catch-up, single expiry, and cleanup verified.");
