"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type { Lecture } from "@/data/specialLectures";
import {
  EMPTY_LECTURE_PROGRESS,
  getLectureEntry,
  LECTURE_PROGRESS_EVENT,
  LECTURE_PROGRESS_KEY,
  readLectureProgress,
  resetLecture,
  setBlockCompletion,
  setLastBlock,
  summarizeLecture,
  writeLectureProgress,
  type LectureProgressState,
} from "@/lib/lecture-progress";

// 外部ストア購読: 同一タブ（カスタムイベント）+ クロスタブ（storage）。
function subscribe(onChange: () => void) {
  window.addEventListener(LECTURE_PROGRESS_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LECTURE_PROGRESS_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// スナップショットは生 JSON 文字列。React が Object.is で安価に比較できる。
function getSnapshot() {
  return window.localStorage.getItem(LECTURE_PROGRESS_KEY) ?? "";
}
function getServerSnapshot() {
  return "";
}

const noop = () => () => {};

function parseState(raw: string): LectureProgressState {
  if (!raw) return EMPTY_LECTURE_PROGRESS;
  try {
    const parsed = JSON.parse(raw) as Partial<LectureProgressState>;
    return { lectures: parsed.lectures ?? {} };
  } catch {
    return EMPTY_LECTURE_PROGRESS;
  }
}

function useLectureProgressState() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // server / 初回ハイドレーション時は false、クライアントで読めるようになると true。
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const state = useMemo(() => parseState(raw), [raw]);
  return { hydrated, state };
}

/** 全講義の進捗をまとめて読む（一覧ページ・/common-test 用）。 */
export function useAllLectureProgress() {
  const { hydrated, state } = useLectureProgressState();
  return { hydrated, state };
}

/** 1講義ぶんの進捗と操作を提供する（講義詳細ページ用）。 */
export function useLectureProgress(lecture: Lecture) {
  const { hydrated, state } = useLectureProgressState();

  const entry = useMemo(
    () => getLectureEntry(state, lecture.slug),
    [state, lecture.slug],
  );
  const summary = useMemo(() => summarizeLecture(entry, lecture), [entry, lecture]);
  const completedSet = useMemo(
    () => new Set(entry.completedBlockIds),
    [entry.completedBlockIds],
  );

  const isBlockCompleted = useCallback(
    (blockId: string) => completedSet.has(blockId),
    [completedSet],
  );

  const setCompletion = useCallback(
    (blockId: string, completed: boolean) => {
      writeLectureProgress(
        setBlockCompletion(readLectureProgress(), lecture, blockId, completed),
      );
    },
    [lecture],
  );

  const completeBlock = useCallback(
    (blockId: string) => setCompletion(blockId, true),
    [setCompletion],
  );

  const toggleBlock = useCallback(
    (blockId: string) => {
      const current = readLectureProgress();
      const done = getLectureEntry(current, lecture.slug).completedBlockIds.includes(
        blockId,
      );
      writeLectureProgress(setBlockCompletion(current, lecture, blockId, !done));
    },
    [lecture],
  );

  const updateLastBlock = useCallback(
    (blockId: string) => {
      writeLectureProgress(setLastBlock(readLectureProgress(), lecture.slug, blockId));
    },
    [lecture.slug],
  );

  const reset = useCallback(() => {
    writeLectureProgress(resetLecture(readLectureProgress(), lecture.slug));
  }, [lecture.slug]);

  return {
    hydrated,
    entry,
    summary,
    completedSet,
    isBlockCompleted,
    completeBlock,
    toggleBlock,
    setLastBlock: updateLastBlock,
    resetLecture: reset,
  };
}
