"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, CheckCircle, XCircle, RotateCcw, ChevronRight, Eye, EyeOff } from "lucide-react";
import type { SpeedReadingProblem } from "@/lib/english-types";
import {
  ENGLISH_LEVEL_META,
  getSpeedReadingTargetWpm,
  getSpeedReadingTimeLimitSeconds,
} from "@/lib/english-types";
import { saveEnglishAttempt } from "@/lib/english-history";
import { SpeedSupportReader } from "./SpeedSupportReader";

type Phase = "setup" | "reading" | "answering" | "result";

const SPEED_PRESETS = [
  { label: "ゆっくり +40%", mult: 1.4 },
  { label: "標準",          mult: 1.0 },
  { label: "高速 −20%",     mult: 0.8 },
  { label: "超速 −40%",     mult: 0.6 },
] as const;

// ── Phase 1: Reading ──────────────────────────────────────────────────────
function ReadingPhase({
  problem,
  timeLimit,
  speedSupportMode,
  onFinish,
}: {
  problem: SpeedReadingProblem;
  timeLimit: number;
  speedSupportMode: boolean;
  onFinish: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current!);
          onFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, [onFinish]);

  const progress = (timeLeft / timeLimit) * 100;
  const isUrgent = timeLeft <= 15;
  const levelMeta = ENGLISH_LEVEL_META[problem.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Timer bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <Timer className="h-4 w-4 text-blue-700" aria-hidden="true" />
            <span>Reading Time</span>
          </div>
          <span
            className={`text-2xl font-bold tabular-nums transition-colors ${isUrgent ? "text-rose-700" : "text-blue-800"}`}
          >
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              isUrgent ? "bg-rose-600" : "bg-blue-700"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Passage */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
            {levelMeta.label}
          </span>
          <span className="text-xs text-slate-600">
            {problem.tags?.join(" · ")}
          </span>
        </div>
        <p className="mb-5 text-xl font-bold text-slate-900 sm:text-2xl">
          {problem.title}
        </p>
        {speedSupportMode ? (
          <SpeedSupportReader
            passage={problem.passage}
            targetWpm={getSpeedReadingTargetWpm(problem)}
            timeLimitSeconds={timeLimit}
            autoStart
          />
        ) : (
          <div className="prose max-w-none">
            {problem.passage.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mb-4 text-base leading-8 text-slate-800 last:mb-0"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Finish reading button */}
      <button
        type="button"
        onClick={onFinish}
        className="group flex min-h-11 w-full items-center justify-center gap-3 rounded-2xl border border-blue-700 bg-blue-700 px-4 py-4 text-base font-semibold text-white transition-colors duration-300 hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        読み終わった — 問題へ進む
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ── Phase 2: Answering ────────────────────────────────────────────────────
function AnsweringPhase({
  problem,
  onFinish,
}: {
  problem: SpeedReadingProblem;
  onFinish: (answers: number[]) => void;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(problem.questions.length).fill(null),
  );

  const allAnswered = answers.every((a) => a !== null);

  const handleSelect = (qIdx: number, optIdx: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optIdx;
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <div className="flex items-center gap-3">
          <EyeOff className="h-5 w-5 text-amber-700" aria-hidden="true" />
          <div>
            <div className="text-sm font-bold text-amber-900">
              英文は非表示です — 記憶を頼りに答えよ
            </div>
            <div className="mt-0.5 text-xs text-amber-800">
              The passage is hidden. Answer from memory.
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      {problem.questions.map((q, qIdx) => (
        <div
          key={qIdx}
          className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${
            answers[qIdx] !== null ? "border-blue-300" : "border-slate-200"
          }`}
        >
          <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-900">
            <span className="mr-2 text-blue-800">Q{qIdx + 1}.</span>
            {q.questionText}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, optIdx) => {
              const selected = answers[qIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelect(qIdx, optIdx)}
                  aria-pressed={selected}
                  className={`english-option min-h-11 w-full rounded-xl border px-4 py-3 text-left text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                    selected
                      ? "border-blue-500 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <span className="mr-2 text-xs font-semibold text-slate-600">
                    {["A", "B", "C", "D"][optIdx]}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit */}
      <button
        type="button"
        disabled={!allAnswered}
        onClick={() => onFinish(answers as number[])}
        className={`flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-base font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${
          allAnswered
            ? "border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
            : "border-slate-200 bg-slate-100 text-slate-400"
        }`}
      >
        採点する
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </motion.div>
  );
}

// ── Phase 3: Result ───────────────────────────────────────────────────────
function ResultPhase({
  problem,
  answers,
  onRetry,
}: {
  problem: SpeedReadingProblem;
  answers: number[];
  onRetry: () => void;
}) {
  const [showPassage, setShowPassage] = useState(false);
  const score = answers.filter((a, i) => a === problem.questions[i].correctAnswerIndex).length;
  const total = problem.questions.length;
  const pct = Math.round((score / total) * 100);

  const scoreTone =
    pct === 100
      ? { panel: "border-emerald-200 bg-emerald-50", text: "text-emerald-800" }
      : pct >= 67
        ? { panel: "border-blue-200 bg-blue-50", text: "text-blue-800" }
        : pct >= 33
          ? { panel: "border-amber-200 bg-amber-50", text: "text-amber-800" }
          : { panel: "border-rose-200 bg-rose-50", text: "text-rose-800" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      {/* Score card */}
      <div className={`rounded-2xl border p-6 text-center ${scoreTone.panel}`}>
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Score
        </div>
        <div className={`mt-2 text-6xl font-extrabold ${scoreTone.text}`}>
          {score} / {total}
        </div>
        <div className="mt-1 text-sm font-medium text-slate-700">
          正答率 {pct}%
        </div>
        <div className={`mt-2 text-xs font-semibold ${scoreTone.text}`}>
          {pct === 100 ? "Perfect — 完璧な記憶力です！" : pct >= 67 ? "Good — しっかり読めています" : pct >= 33 ? "Keep going — 復習で定着させましょう" : "Try again — 英文をじっくり復習しよう"}
        </div>
      </div>

      {/* Per-question review */}
      {problem.questions.map((q, i) => {
        const isCorrect = answers[i] === q.correctAnswerIndex;
        return (
          <div
            key={i}
            className={`rounded-2xl border p-5 sm:p-6 ${
              isCorrect
                ? "border-emerald-200 bg-emerald-50"
                : "border-rose-200 bg-rose-50"
            }`}
          >
            {/* Question header */}
            <div className="mb-3 flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" aria-hidden="true" />
              )}
              <p className="text-sm font-semibold leading-relaxed text-slate-900">
                <span className="mr-1 text-slate-600">Q{i + 1}.</span>
                {q.questionText}
              </p>
            </div>

            {/* Options */}
            <div className="mb-4 space-y-1.5 sm:ml-8">
              {q.options.map((opt, oi) => {
                const isChosen = answers[i] === oi;
                const isCorrectOpt = q.correctAnswerIndex === oi;
                let optionTone = "border-slate-200 bg-white text-slate-700";
                if (isCorrectOpt) {
                  optionTone = "border-emerald-400 bg-emerald-100 text-emerald-900";
                } else if (isChosen) {
                  optionTone = "border-rose-400 bg-rose-100 text-rose-900";
                }

                return (
                  <div
                    key={oi}
                    className={`english-option rounded-lg border px-3 py-2 text-sm ${optionTone}`}
                  >
                    <span className="mr-1.5 text-xs font-semibold text-slate-600">
                      {["A", "B", "C", "D"][oi]}.
                    </span>
                    {opt}
                    {isCorrectOpt && (
                      <span className="ml-2 text-xs font-semibold text-emerald-800">✓ 正解</span>
                    )}
                    {isChosen && !isCorrectOpt && (
                      <span className="ml-2 text-xs font-semibold text-rose-800">← あなたの回答</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <details className="sm:ml-8">
              <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-lg px-2 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2">
                ▶ 解説を読む
              </summary>
              <div className="mt-3 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm leading-7 text-slate-700">
                {q.explanation}
              </div>
            </details>
          </div>
        );
      })}

      {/* Passage review toggle */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setShowPassage((v) => !v)}
          aria-expanded={showPassage}
          aria-controls="speed-reading-review-passage"
          className="flex min-h-11 w-full items-center justify-between bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
        >
          <span className="flex items-center gap-2">
            {showPassage ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
            英文を{showPassage ? "隠す" : "復習する"}
          </span>
          <span className="text-xs text-slate-500">Review Passage</span>
        </button>
        <AnimatePresence initial={false}>
          {showPassage && (
            <motion.div
              key="passage"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              id="speed-reading-review-passage"
              className="overflow-hidden"
            >
              <div className="px-6 py-5">
                {problem.passage.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="mb-4 text-base leading-8 text-slate-800 last:mb-0"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Retry */}
      <button
        type="button"
        onClick={onRetry}
        className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        もう一度挑戦する
      </button>
    </motion.div>
  );
}

// ── Main exported component ───────────────────────────────────────────────
export function SpeedReadingGame({
  problem,
  speedSupportMode = false,
}: {
  problem: SpeedReadingProblem;
  speedSupportMode?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(() =>
    speedSupportMode ? "reading" : "setup",
  );
  const [presetIdx, setPresetIdx] = useState(1); // 1 = 標準
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [dbSyncError, setDbSyncError] = useState(false);

  const baseTimeLimit = getSpeedReadingTimeLimitSeconds(problem);
  const timeLimit = Math.round(baseTimeLimit * SPEED_PRESETS[presetIdx].mult);
  const targetWpm = getSpeedReadingTargetWpm(problem);

  const handleStart = useCallback(() => setPhase("reading"), []);
  const handleReadingFinish = useCallback(() => setPhase("answering"), []);
  const handleAnsweringFinish = useCallback((answers: number[]) => {
    setUserAnswers(answers);
    setPhase("result");
    const score = answers.filter(
      (a, i) => a === problem.questions[i].correctAnswerIndex,
    ).length;
    saveEnglishAttempt({
      problemId: problem.id,
      mode: "speed-reading",
      level: problem.level,
      score,
      total: problem.questions.length,
    }).catch(() => setDbSyncError(true));
  }, [problem]);
  const handleRetry = useCallback(() => {
    setUserAnswers([]);
    setDbSyncError(false);
    setPhase(speedSupportMode ? "reading" : "setup");
  }, [speedSupportMode]);

  const phaseLabel: Record<Phase, string> = {
    setup: "Setup · 準備",
    reading: "Phase 1 · Reading",
    answering: "Phase 2 · Answering",
    result: "Phase 3 · Result",
  };
  const phaseOrder: Phase[] = ["setup", "reading", "answering", "result"];
  const phaseIdx = phaseOrder.indexOf(phase);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Phase stepper */}
      <div className="mb-6 flex items-center gap-2" role="list" aria-label="演習の進行状況">
        {phaseOrder.map((p, i) => (
          <div key={p} className="flex items-center gap-2" role="listitem">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                phaseIdx >= i
                  ? "border-blue-300 bg-blue-100 text-blue-800"
                  : "border-slate-300 bg-white text-slate-500"
              }`}
              aria-current={phaseIdx === i ? "step" : undefined}
            >
              {i}
            </div>
            {i < phaseOrder.length - 1 && (
              <div
                className={`h-px w-6 transition-colors ${
                  phaseIdx > i ? "bg-blue-600" : "bg-slate-300"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
        <span className="ml-2 text-xs font-medium text-slate-600">{phaseLabel[phase]}</span>
      </div>

      {/* DB sync error indicator */}
      {dbSyncError && (
        <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-xs font-medium text-amber-900" role="status">
          ⚠ サーバーへの同期に失敗しました（ローカルには保存済み）
        </div>
      )}

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === "setup" && (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Timer preset selector */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-700" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                  {speedSupportMode ? "スピードサポートで読む" : "通常モードで読む"}
                </span>
              </div>
              {speedSupportMode ? (
                <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs leading-relaxed text-blue-900">
                  目標WPM {targetWpm} を基準に、本文中の読了目安位置を青色で表示します。本文画面に入ると自動で開始します。
                </div>
              ) : (
                <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs leading-relaxed text-slate-700">
                  青色ハイライトなしで、従来通り制限時間内に本文を読みます。
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SPEED_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPresetIdx(i)}
                    aria-pressed={presetIdx === i}
                    className={`min-h-11 rounded-xl border px-3 py-2.5 text-center text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                      presetIdx === i
                        ? "border-blue-500 bg-blue-50 text-blue-900"
                        : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-2xl font-bold text-slate-700">
                制限時間：<span className="text-blue-800">{Math.floor(timeLimit / 60)}:{String(timeLimit % 60).padStart(2, "0")}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleStart}
              className="flex min-h-11 w-full items-center justify-center gap-3 rounded-2xl border border-blue-700 bg-blue-700 px-4 py-4 text-base font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              スタート
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </motion.div>
        )}
        {phase === "reading" && (
          <ReadingPhase
            key="reading"
            problem={problem}
            timeLimit={timeLimit}
            speedSupportMode={speedSupportMode}
            onFinish={handleReadingFinish}
          />
        )}
        {phase === "answering" && (
          <AnsweringPhase key="answering" problem={problem} onFinish={handleAnsweringFinish} />
        )}
        {phase === "result" && (
          <ResultPhase key="result" problem={problem} answers={userAnswers} onRetry={handleRetry} />
        )}
      </AnimatePresence>
    </div>
  );
}
