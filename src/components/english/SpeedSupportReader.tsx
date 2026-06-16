"use client";

import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Timer } from "lucide-react";

type SentenceChunk = {
  text: string;
  sentenceIndex: number;
};

function formatTime(seconds: number): string {
  const safeSeconds = Math.max(0, seconds);
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

  return passage.split("\n\n").map((paragraph) =>
    splitParagraphIntoSentences(paragraph).map((sentence) => ({
      text: sentence,
      sentenceIndex: sentenceIndex++,
    })),
  );
}

export function SpeedSupportReader({
  passage,
  totalTimeSeconds,
}: {
  passage: string;
  totalTimeSeconds: number;
}) {
  const [enabled, setEnabled] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const paragraphs = useMemo(() => splitPassage(passage), [passage]);
  const sentenceCount = paragraphs.reduce(
    (sum, paragraph) => sum + paragraph.length,
    0,
  );
  const safeTotalTime = Math.max(1, totalTimeSeconds);
  const cappedElapsed = Math.min(elapsedSeconds, safeTotalTime);
  const progressRatio = cappedElapsed / safeTotalTime;
  const currentIndex =
    sentenceCount === 0
      ? -1
      : cappedElapsed >= safeTotalTime
        ? sentenceCount - 1
        : Math.min(sentenceCount - 1, Math.floor(progressRatio * sentenceCount));
  const currentSentenceNumber =
    sentenceCount === 0 ? 0 : Math.min(sentenceCount, currentIndex + 1);
  const remainingSeconds = Math.max(0, safeTotalTime - cappedElapsed);
  const isFinished = cappedElapsed >= safeTotalTime;
  const progressPercent = Math.round(progressRatio * 100);

  useEffect(() => {
    if (!running) return;

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((current) => {
        if (current + 1 >= safeTotalTime) {
          window.clearInterval(intervalId);
          setRunning(false);
          return safeTotalTime;
        }

        return current + 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [running, safeTotalTime]);

  const handleToggle = () => {
    setEnabled((current) => {
      if (current) setRunning(false);
      return !current;
    });
  };

  const handleStart = () => {
    if (!enabled || isFinished) return;
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
        className="rounded-2xl p-4 sm:p-5"
        style={{
          background: "rgba(14,165,233,0.08)",
          border: "1px solid rgba(14,165,233,0.25)",
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-3">
            <span
              className={`relative h-6 w-11 rounded-full transition-colors ${
                enabled ? "bg-sky-500" : "bg-white/15"
              }`}
            >
              <input
                type="checkbox"
                checked={enabled}
                onChange={handleToggle}
                className="sr-only"
                aria-label="スピードサポートを切り替える"
              />
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </span>
            <span>
              <span className="block font-display text-base font-bold text-white">
                スピードサポート
              </span>
              <span className="font-mono text-xs text-white/45">
                制限時間: {formatTime(safeTotalTime)}
              </span>
            </span>
          </label>

          <span
            className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold ${
              isFinished ? "bg-sky-400/15 text-sky-200" : "bg-white/8 text-white/55"
            }`}
          >
            {isFinished ? "時間終了" : "標準ペース"}
          </span>
        </div>

        <div className="mt-4 grid gap-2 text-xs text-white/60 sm:grid-cols-3">
          <div className="rounded-xl bg-white/5 px-3 py-2">
            経過: <span className="font-mono text-white">{formatTime(cappedElapsed)}</span>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2">
            残り: <span className="font-mono text-white">{formatTime(remainingSeconds)}</span>
          </div>
          <div className="rounded-xl bg-white/5 px-3 py-2">
            現在の読了目安:{" "}
            <span className="font-mono text-white">
              {currentSentenceNumber} / {sentenceCount} 文
            </span>
          </div>
        </div>

        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-300 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mt-1 text-right font-mono text-xs text-white/45">
          {progressPercent}%
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleStart}
            disabled={!enabled || running || isFinished}
            className="inline-flex items-center gap-1.5 rounded-xl border border-sky-400/40 bg-sky-400/12 px-3 py-2 text-sm font-semibold text-sky-200 transition hover:bg-sky-400/18 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Play className="h-4 w-4" />
            開始
          </button>
          <button
            type="button"
            onClick={handlePause}
            disabled={!enabled || !running}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/6 px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pause className="h-4 w-4" />
            一時停止
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={!enabled && elapsedSeconds === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/6 px-3 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
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
              const alreadyRead = enabled && sentence.sentenceIndex < currentIndex;
              const isCurrent = enabled && sentence.sentenceIndex === currentIndex;
              const shouldHighlight = alreadyRead || isCurrent;

              return (
                <span
                  key={sentence.sentenceIndex}
                  className={`rounded-md transition-colors duration-300 ${
                    shouldHighlight ? "text-sky-300" : "text-white/85"
                  } ${
                    isCurrent
                      ? "bg-sky-400/12 px-1 font-semibold text-sky-200 ring-1 ring-sky-300/20"
                      : ""
                  }`}
                >
                  {sentence.text}{" "}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      {enabled ? (
        <div className="flex items-center gap-2 rounded-xl border border-sky-400/20 bg-sky-400/8 px-3 py-2 text-xs leading-relaxed text-sky-100/75">
          <Timer className="h-4 w-4 shrink-0 text-sky-300" />
          青色の位置が、制限時間に対する現在の読了目安です。
        </div>
      ) : null}
    </div>
  );
}
