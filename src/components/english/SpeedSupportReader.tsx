"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Timer, Zap } from "lucide-react";
import { countWords } from "@/lib/english-types";

type SentenceChunk = {
  text: string;
  sentenceIndex: number;
  wordCount: number;
  cumulativeWords: number;
};

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const rest = safeSeconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function splitParagraphIntoSentences(paragraph: string): string[] {
  const matches = paragraph.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g);
  return matches?.map((sentence) => sentence.trim()).filter(Boolean) ?? [];
}

function splitPassage(passage: string): SentenceChunk[][] {
  let sentenceIndex = 0;
  let cumulativeWords = 0;

  return passage.split("\n\n").map((paragraph) =>
    splitParagraphIntoSentences(paragraph).map((sentence) => {
      const wordCount = countWords(sentence);
      cumulativeWords += wordCount;

      return {
        text: sentence,
        sentenceIndex: sentenceIndex++,
        wordCount,
        cumulativeWords,
      };
    }),
  );
}

function findCurrentSentenceIndex(
  sentences: SentenceChunk[],
  targetWordsRead: number,
): number {
  if (sentences.length === 0) return -1;
  if (targetWordsRead <= 0) return 0;

  const found = sentences.find(
    (sentence) => sentence.cumulativeWords >= targetWordsRead,
  );

  return found?.sentenceIndex ?? sentences[sentences.length - 1].sentenceIndex;
}

export function SpeedSupportReader({
  passage,
  targetWpm,
  timeLimitSeconds,
  autoStart = true,
}: {
  passage: string;
  targetWpm: number;
  timeLimitSeconds: number;
  autoStart?: boolean;
}) {
  const [running, setRunning] = useState(autoStart);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const paragraphs = useMemo(() => splitPassage(passage), [passage]);
  const sentences = useMemo(() => paragraphs.flat(), [paragraphs]);
  const totalWords = sentences.at(-1)?.cumulativeWords ?? 0;
  const safeTargetWpm = Math.max(1, targetWpm);
  const estimatedSeconds = Math.max(1, Math.ceil((totalWords / safeTargetWpm) * 60));
  const cappedElapsed = Math.min(elapsedSeconds, estimatedSeconds);
  const targetWordsRead = Math.min(
    totalWords,
    Math.floor((cappedElapsed / 60) * safeTargetWpm),
  );
  const currentSentenceIndex =
    cappedElapsed >= estimatedSeconds
      ? sentences.length - 1
      : findCurrentSentenceIndex(sentences, targetWordsRead);
  const commonTestWpmDiff = safeTargetWpm - 150;
  const progressPercent =
    totalWords === 0 ? 0 : Math.min(100, Math.round((targetWordsRead / totalWords) * 100));
  const remainingSeconds = Math.max(0, estimatedSeconds - cappedElapsed);
  const isFinished = cappedElapsed >= estimatedSeconds;

  useEffect(() => {
    if (!running) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => {
        if (current + 1 >= estimatedSeconds) {
          window.clearInterval(intervalId);
          setRunning(false);
          return estimatedSeconds;
        }

        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [estimatedSeconds, running]);

  const handleStart = () => {
    if (isFinished) return;
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setElapsedSeconds(0);
  };

  return (
    <div className="space-y-5">
      <section
        className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4 text-slate-900 shadow-sm sm:p-5"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300 bg-cyan-100 text-cyan-800">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <div className="font-display text-base font-bold text-slate-950">
                スピードサポート ON
              </div>
              <div className="font-mono text-xs text-slate-700">
                WPM基準で読了目安を表示
              </div>
            </div>
          </div>

          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-xs font-semibold ${
              isFinished
                ? "border-blue-300 bg-blue-100 text-blue-900"
                : "border-cyan-200 bg-white text-slate-800"
            }`}
          >
            {isFinished ? "時間終了" : "標準ペース"}
          </span>
        </div>

        <div className="mt-4 grid gap-2 text-xs text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            目標WPM: <span className="font-mono font-semibold text-slate-950">{safeTargetWpm}</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            目標ペース: <span className="font-mono font-semibold text-slate-950">{safeTargetWpm} WPM</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            本文語数: <span className="font-mono font-semibold text-slate-950">{totalWords}語</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            目標読了時間:{" "}
            <span className="font-mono font-semibold text-slate-950">{formatTime(estimatedSeconds)}</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            経過: <span className="font-mono font-semibold text-slate-950">{formatTime(cappedElapsed)}</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            残り: <span className="font-mono font-semibold text-slate-950">{formatTime(remainingSeconds)}</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2 sm:col-span-2 lg:col-span-1">
            読了目安:{" "}
            <span className="font-mono font-semibold text-slate-950">
              {targetWordsRead}語 / {totalWords}語
            </span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            制限時間:{" "}
            <span className="font-mono font-semibold text-slate-950">{formatTime(timeLimitSeconds)}</span>
          </div>
          <div className="rounded-xl border border-cyan-100 bg-white px-3 py-2">
            共通テスト基準との差:{" "}
            <span className="font-mono font-semibold text-slate-950">
              {commonTestWpmDiff === 0
                ? "目標比 ±0 WPM"
                : `目標比 ${commonTestWpmDiff > 0 ? "+" : ""}${commonTestWpmDiff} WPM`}
            </span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs leading-relaxed text-blue-950">
          この英文は{safeTargetWpm}WPMなら約{formatTime(estimatedSeconds)}で読了できます。
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-1 text-right font-mono text-xs font-semibold text-slate-700">
          {progressPercent}%
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleStart}
            disabled={running || isFinished}
            className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-300 bg-cyan-100 px-3 py-2 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
          >
            <Play className="h-4 w-4" />
            再開
          </button>
          <button
            type="button"
            onClick={handlePause}
            disabled={!running}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
          >
            <Pause className="h-4 w-4" />
            一時停止
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={elapsedSeconds === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-500"
          >
            <RotateCcw className="h-4 w-4" />
            リセット
          </button>
        </div>
      </section>

      <div className="prose prose-invert max-w-none">
        {paragraphs.map((paragraph, paragraphIndex) => (
          <p
            key={paragraphIndex}
            className="mb-4 text-base leading-8 text-white/85 last:mb-0"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {paragraph.map((sentence) => {
              const alreadyRead =
                isFinished ||
                (targetWordsRead > 0 && sentence.cumulativeWords < targetWordsRead);
              const isCurrent =
                !isFinished && sentence.sentenceIndex === currentSentenceIndex;
              const shouldHighlight = isFinished || alreadyRead || isCurrent;

              return (
                <span
                  key={sentence.sentenceIndex}
                  className={`rounded-md transition-colors duration-300 ${
                    shouldHighlight ? "text-cyan-100" : "text-white/85"
                  } ${
                    isCurrent
                      ? "border-l-4 border-sky-300 bg-sky-300/18 px-2 py-1 font-bold text-sky-50 shadow-[0_0_0_1px_rgba(125,211,252,0.18)]"
                      : ""
                  }`}
                >
                  {sentence.text}
                  {isCurrent ? (
                    <span
                      className="speed-support-current-marker ml-1 rounded-full border border-cyan-500 bg-cyan-700 px-2 py-0.5 align-middle font-mono text-xs text-white"
                    >
                      現在の目安
                    </span>
                  ) : null}{" "}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-2 text-xs leading-relaxed text-slate-800">
        <Timer className="h-4 w-4 shrink-0 text-cyan-700" />
        青色の位置が、目標WPMに対する現在の読了目安です。
      </div>
    </div>
  );
}
