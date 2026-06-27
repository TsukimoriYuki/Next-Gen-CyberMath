// 特別講義の受講進捗を localStorage に保存する純粋ロジック層。
// DB は使わず、講義ごとに「完了ブロック・最後に見たブロック・最終アクセス・完了日時」を持つ。
// localStorage に触れる read/write 以外は副作用のない純関数なので、SSR でも安全に import できる。

import type { Lecture, LectureBlock } from "@/data/specialLectures";

export const LECTURE_PROGRESS_KEY = "cyber-math:lecture-progress:v1";
/** 同一タブ内の変更通知（storage イベントはクロスタブのみ発火するため）。 */
export const LECTURE_PROGRESS_EVENT = "cyber-math:lecture-progress-changed";

/** 1講義ぶんの保存内容。 */
export interface LectureProgressEntry {
  /** 完了扱いになったブロックID（trackable なものだけが入る）。 */
  completedBlockIds: string[];
  /** 最後に見ていたブロックID（続きから再開に使う）。 */
  lastBlockId: string | null;
  /** 最終アクセス時刻（epoch ms）。 */
  lastAccessedAt: number | null;
  /** 全ブロック完了に到達した時刻（epoch ms）。未完了なら null。 */
  completedAt: number | null;
}

export interface LectureProgressState {
  /** lectureSlug -> entry */
  lectures: Record<string, LectureProgressEntry>;
}

export type LectureStatus = "not-started" | "in-progress" | "completed";

export interface LectureProgressSummary {
  completedCount: number;
  totalCount: number;
  /** 0–100 の整数。 */
  percent: number;
  status: LectureStatus;
  lastBlockId: string | null;
  lastAccessedAt: number | null;
  completedAt: number | null;
}

export const EMPTY_LECTURE_ENTRY: LectureProgressEntry = {
  completedBlockIds: [],
  lastBlockId: null,
  lastAccessedAt: null,
  completedAt: null,
};

export const EMPTY_LECTURE_PROGRESS: LectureProgressState = { lectures: {} };

// 進捗の母数に含める（＝完了チェックできる）ブロック種別。
// heading / paragraph / math / image / callout は読了チェック、
// problem は解答済み、explanationTabs はタブを開いたら確認済み。
// checklist / expertThinking / relatedProblems は補助ブロックなので母数に含めない。
const TRACKABLE_BLOCK_TYPES: ReadonlySet<LectureBlock["type"]> = new Set([
  "heading",
  "paragraph",
  "math",
  "image",
  "geometryLayers",
  "callout",
  "problem",
  "explanationTabs",
  // 満点講義の中核：解法判別フローは読了、判別ドリルは全問解答で完了扱い。
  "solutionFlow",
  "discriminationDrill",
]);

export function isTrackableBlock(block: LectureBlock): boolean {
  return TRACKABLE_BLOCK_TYPES.has(block.type);
}

/** 進捗の母数になるブロックIDを文書順で返す。 */
export function getTrackableBlockIds(lecture: Lecture): string[] {
  return lecture.blocks.filter(isTrackableBlock).map((block) => block.id);
}

// ── localStorage I/O ───────────────────────────────────────────────

export function readLectureProgress(): LectureProgressState {
  if (typeof window === "undefined") return EMPTY_LECTURE_PROGRESS;
  try {
    const raw = window.localStorage.getItem(LECTURE_PROGRESS_KEY);
    if (!raw) return EMPTY_LECTURE_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<LectureProgressState>;
    return { lectures: parsed.lectures ?? {} };
  } catch {
    return EMPTY_LECTURE_PROGRESS;
  }
}

export function writeLectureProgress(state: LectureProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LECTURE_PROGRESS_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(LECTURE_PROGRESS_EVENT));
}

export function getLectureEntry(
  state: LectureProgressState,
  slug: string,
): LectureProgressEntry {
  return state.lectures[slug] ?? EMPTY_LECTURE_ENTRY;
}

// ── 純粋アップデータ（新しい state を返す）────────────────────────────

function putEntry(
  state: LectureProgressState,
  slug: string,
  entry: LectureProgressEntry,
): LectureProgressState {
  return { lectures: { ...state.lectures, [slug]: entry } };
}

/**
 * ブロックの完了状態を設定する。trackable なブロックのみ対象。
 * 全 trackable ブロックが揃ったら completedAt を確定し、崩れたら null に戻す。
 */
export function setBlockCompletion(
  state: LectureProgressState,
  lecture: Lecture,
  blockId: string,
  completed: boolean,
  now: number = Date.now(),
): LectureProgressState {
  const trackable = getTrackableBlockIds(lecture);
  if (!trackable.includes(blockId)) return state; // 母数外は無視

  const entry = getLectureEntry(state, lecture.slug);
  const current = new Set(entry.completedBlockIds);
  if (completed) current.add(blockId);
  else current.delete(blockId);

  // 文書順を保ちつつ、現存する trackable だけに正規化する。
  const completedBlockIds = trackable.filter((id) => current.has(id));
  const allDone = completedBlockIds.length === trackable.length && trackable.length > 0;

  return putEntry(state, lecture.slug, {
    ...entry,
    completedBlockIds,
    lastAccessedAt: now,
    completedAt: allDone ? entry.completedAt ?? now : null,
  });
}

/** 最後に見たブロックと最終アクセス時刻を更新する。 */
export function setLastBlock(
  state: LectureProgressState,
  slug: string,
  blockId: string,
  now: number = Date.now(),
): LectureProgressState {
  const entry = getLectureEntry(state, slug);
  return putEntry(state, slug, {
    ...entry,
    lastBlockId: blockId,
    lastAccessedAt: now,
  });
}

/** 1講義ぶんの進捗を初期化する。 */
export function resetLecture(
  state: LectureProgressState,
  slug: string,
): LectureProgressState {
  if (!state.lectures[slug]) return state;
  const next = { ...state.lectures };
  delete next[slug];
  return { lectures: next };
}

// ── 集計 ───────────────────────────────────────────────────────────

export function summarizeLecture(
  entry: LectureProgressEntry,
  lecture: Lecture,
): LectureProgressSummary {
  const trackable = getTrackableBlockIds(lecture);
  const totalCount = trackable.length;
  const trackableSet = new Set(trackable);
  const completedCount = entry.completedBlockIds.filter((id) =>
    trackableSet.has(id),
  ).length;
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  let status: LectureStatus;
  if (totalCount > 0 && completedCount >= totalCount) status = "completed";
  else if (completedCount > 0 || entry.lastBlockId) status = "in-progress";
  else status = "not-started";

  return {
    completedCount,
    totalCount,
    percent,
    status,
    lastBlockId: entry.lastBlockId,
    lastAccessedAt: entry.lastAccessedAt,
    completedAt: entry.completedAt,
  };
}
