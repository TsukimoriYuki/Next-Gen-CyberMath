// Client-side progress: completed problems + daily streak, in localStorage.
// No auth in the MVP — this lives entirely in the browser.

import { getJstCalendarDate } from "@/lib/jst-calendar-date";

export const PROGRESS_KEY = "cyber-math:progress:v1";
/** Same-tab change notification (the `storage` event only fires cross-tab). */
export const PROGRESS_EVENT = "cyber-math:progress-changed";

export interface ProgressState {
  completed: string[]; // problem slugs whose 解答 was revealed
  lastActiveDate: string | null; // YYYY-MM-DD
  streak: number;
  bestStreak: number;
}

export const EMPTY_PROGRESS: ProgressState = {
  completed: [],
  lastActiveDate: null,
  streak: 0,
  bestStreak: 0,
};

export function todayKey(date: Date = new Date()): string {
  return getJstCalendarDate(date);
}

function diffInDays(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const ams = Date.UTC(ay, am - 1, ad);
  const bms = Date.UTC(by, bm - 1, bd);
  return Math.round((bms - ams) / 86_400_000);
}

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...EMPTY_PROGRESS, ...parsed };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function writeProgress(state: ProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(PROGRESS_EVENT));
}

/** Roll the streak forward given activity today. Pure. */
export function applyActivity(
  state: ProgressState,
  today: string = todayKey(),
): ProgressState {
  if (state.lastActiveDate === today) return state; // already counted today
  let streak = 1;
  if (state.lastActiveDate) {
    const gap = diffInDays(state.lastActiveDate, today);
    streak = gap === 1 ? state.streak + 1 : 1;
  }
  return {
    ...state,
    lastActiveDate: today,
    streak,
    bestStreak: Math.max(state.bestStreak, streak),
  };
}

export function markCompleted(
  state: ProgressState,
  slug: string,
): ProgressState {
  const withActivity = applyActivity(state);
  if (withActivity.completed.includes(slug)) return withActivity;
  return { ...withActivity, completed: [...withActivity.completed, slug] };
}
