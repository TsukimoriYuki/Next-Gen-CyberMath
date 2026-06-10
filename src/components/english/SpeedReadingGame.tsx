"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Timer, CheckCircle, XCircle, RotateCcw, ChevronRight, Eye, EyeOff, Minus, Plus } from "lucide-react";
import type { SpeedReadingProblem } from "@/lib/english-types";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { saveEnglishAttempt } from "@/lib/english-history";

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
  onFinish,
}: {
  problem: SpeedReadingProblem;
  timeLimit: number;
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
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-sm text-white/60">
            <Timer className="h-4 w-4" />
            <span>Reading Time</span>
          </div>
          <span
            className={`font-display text-2xl font-bold tabular-nums transition-colors ${isUrgent ? "text-red-400" : "text-emerald-400"}`}
          >
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
            {String(timeLeft % 60).padStart(2, "0")}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${progress}%`,
              background: isUrgent
                ? "linear-gradient(90deg, #f87171, #ef4444)"
                : "linear-gradient(90deg, #10b981, #34d399)",
              boxShadow: isUrgent
                ? "0 0 12px rgba(239,68,68,0.5)"
                : "0 0 12px rgba(16,185,129,0.4)",
            }}
          />
        </div>
      </div>

      {/* Passage */}
      <div
        className="rounded-2xl p-6 sm:p-8"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold"
            style={{
              background: `color-mix(in srgb, ${levelMeta.accent} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${levelMeta.accent} 40%, transparent)`,
              color: levelMeta.accent,
            }}
          >
            {levelMeta.label}
          </span>
          <span className="font-mono text-xs text-white/35">
            {problem.tags?.join(" · ")}
          </span>
        </div>
        <p className="mb-5 font-display text-xl font-bold text-white sm:text-2xl">
          {problem.title}
        </p>
        <div className="prose prose-invert max-w-none">
          {problem.passage.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="mb-4 text-base leading-8 text-white/85 last:mb-0"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>

      {/* Finish reading button */}
      <button
        type="button"
        onClick={onFinish}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-display text-base font-semibold transition-all duration-300"
        style={{
          background: "rgba(16,185,129,0.12)",
          border: "1px solid rgba(16,185,129,0.35)",
          color: "#10b981",
        }}
      >
        読み終わった — 問題へ進む
        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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
      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 px-5 py-4">
        <div className="flex items-center gap-3">
          <EyeOff className="h-5 w-5 text-yellow-400" />
          <div>
            <div className="font-display text-sm font-bold text-yellow-300">
              英文は非表示です — 記憶を頼りに答えよ
            </div>
            <div className="mt-0.5 font-mono text-xs text-yellow-400/60">
              The passage is hidden. Answer from memory.
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}
      {problem.questions.map((q, qIdx) => (
        <div
          key={qIdx}
          className="rounded-2xl p-5 sm:p-6"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${answers[qIdx] !== null ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)"}`,
          }}
        >
          <p className="mb-4 text-sm font-semibold leading-relaxed text-white/90">
            <span className="mr-2 font-mono text-emerald-400">Q{qIdx + 1}.</span>
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
                  className="w-full rounded-xl px-4 py-3 text-left text-sm transition-all duration-200"
                  style={{
                    background: selected
                      ? "rgba(16,185,129,0.15)"
                      : "rgba(255,255,255,0.03)",
                    border: selected
                      ? "1px solid rgba(16,185,129,0.5)"
                      : "1px solid rgba(255,255,255,0.07)",
                    color: selected ? "#6ee7b7" : "rgba(255,255,255,0.7)",
                  }}
                >
                  <span className="mr-2 font-mono text-xs text-white/40">
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display text-base font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background: allAnswered ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
          border: allAnswered ? "1px solid rgba(16,185,129,0.45)" : "1px solid rgba(255,255,255,0.1)",
          color: allAnswered ? "#10b981" : "rgba(255,255,255,0.4)",
        }}
      >
        採点する
        <ChevronRight className="h-5 w-5" />
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

  const scoreColor =
    pct === 100 ? "#10b981" : pct >= 67 ? "#22d3ee" : pct >= 33 ? "#f59e0b" : "#f43f5e";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      {/* Score card */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: `color-mix(in srgb, ${scoreColor} 6%, transparent)`,
          border: `1px solid color-mix(in srgb, ${scoreColor} 30%, transparent)`,
        }}
      >
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Score
        </div>
        <div
          className="mt-2 font-display text-6xl font-extrabold"
          style={{ color: scoreColor, textShadow: `0 0 30px ${scoreColor}60` }}
        >
          {score} / {total}
        </div>
        <div className="mt-1 font-mono text-sm text-white/50">
          正答率 {pct}%
        </div>
        <div className="mt-2 font-mono text-xs" style={{ color: scoreColor }}>
          {pct === 100 ? "Perfect — 完璧な記憶力です！" : pct >= 67 ? "Good — しっかり読めています" : pct >= 33 ? "Keep going — 復習で定着させましょう" : "Try again — 英文をじっくり復習しよう"}
        </div>
      </div>

      {/* Per-question review */}
      {problem.questions.map((q, i) => {
        const isCorrect = answers[i] === q.correctAnswerIndex;
        return (
          <div
            key={i}
            className="rounded-2xl p-5 sm:p-6"
            style={{
              background: isCorrect ? "rgba(16,185,129,0.05)" : "rgba(244,63,94,0.05)",
              border: isCorrect ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(244,63,94,0.25)",
            }}
          >
            {/* Question header */}
            <div className="mb-3 flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              ) : (
                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              )}
              <p className="text-sm font-semibold leading-relaxed text-white/90">
                <span className="mr-1 font-mono text-white/40">Q{i + 1}.</span>
                {q.questionText}
              </p>
            </div>

            {/* Options */}
            <div className="mb-4 ml-8 space-y-1.5">
              {q.options.map((opt, oi) => {
                const isChosen = answers[i] === oi;
                const isCorrectOpt = q.correctAnswerIndex === oi;
                let bg = "rgba(255,255,255,0.03)";
                let border = "rgba(255,255,255,0.07)";
                let color = "rgba(255,255,255,0.5)";
                if (isCorrectOpt) { bg = "rgba(16,185,129,0.12)"; border = "rgba(16,185,129,0.4)"; color = "#6ee7b7"; }
                else if (isChosen && !isCorrectOpt) { bg = "rgba(244,63,94,0.1)"; border = "rgba(244,63,94,0.35)"; color = "#fca5a5"; }

                return (
                  <div
                    key={oi}
                    className="rounded-lg px-3 py-2 text-sm"
                    style={{ background: bg, border: `1px solid ${border}`, color }}
                  >
                    <span className="mr-1.5 font-mono text-xs opacity-60">
                      {["A", "B", "C", "D"][oi]}.
                    </span>
                    {opt}
                    {isCorrectOpt && (
                      <span className="ml-2 font-mono text-[10px] text-emerald-400">✓ 正解</span>
                    )}
                    {isChosen && !isCorrectOpt && (
                      <span className="ml-2 font-mono text-[10px] text-red-400">← あなたの回答</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <details className="ml-8">
              <summary className="cursor-pointer list-none font-mono text-xs text-emerald-500 hover:text-emerald-300 transition-colors">
                ▶ 解説を読む
              </summary>
              <div
                className="mt-3 rounded-xl p-4 text-sm leading-7 text-white/80 whitespace-pre-wrap"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {q.explanation}
              </div>
            </details>
          </div>
        );
      })}

      {/* Passage review toggle */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <button
          type="button"
          onClick={() => setShowPassage((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <span className="flex items-center gap-2">
            {showPassage ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            英文を{showPassage ? "隠す" : "復習する"}
          </span>
          <span className="font-mono text-xs text-white/30">Review Passage</span>
        </button>
        <AnimatePresence initial={false}>
          {showPassage && (
            <motion.div
              key="passage"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 py-5">
                {problem.passage.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="mb-4 text-base leading-8 text-white/80 last:mb-0"
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-mono text-sm font-semibold text-white/60 transition-colors hover:text-white"
        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
      >
        <RotateCcw className="h-4 w-4" />
        もう一度挑戦する
      </button>
    </motion.div>
  );
}

// ── Main exported component ───────────────────────────────────────────────
export function SpeedReadingGame({ problem }: { problem: SpeedReadingProblem }) {
  const [phase, setPhase] = useState<Phase>("setup");
  const [presetIdx, setPresetIdx] = useState(1); // 1 = 標準
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [dbSyncError, setDbSyncError] = useState(false);

  const timeLimit = Math.round(problem.timeLimit * SPEED_PRESETS[presetIdx].mult);

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
    setPhase("setup");
  }, []);

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
      <div className="mb-6 flex items-center gap-2">
        {phaseOrder.map((p, i) => (
          <div key={p} className="flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold transition-colors"
              style={{
                background: phaseIdx >= i ? "rgba(16,185,129,0.25)" : "rgba(255,255,255,0.06)",
                border: phaseIdx >= i ? "1px solid rgba(16,185,129,0.5)" : "1px solid rgba(255,255,255,0.1)",
                color: phaseIdx >= i ? "#10b981" : "rgba(255,255,255,0.3)",
              }}
            >
              {i}
            </div>
            {i < phaseOrder.length - 1 && (
              <div
                className="h-px w-6 transition-colors"
                style={{ background: phaseIdx > i ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)" }}
              />
            )}
          </div>
        ))}
        <span className="ml-2 font-mono text-xs text-white/40">{phaseLabel[phase]}</span>
      </div>

      {/* DB sync error indicator */}
      {dbSyncError && (
        <div className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-500/8 px-4 py-2 font-mono text-xs text-yellow-400/80">
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
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Timer className="h-4 w-4 text-emerald-400" />
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider">読解タイマー設定</span>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SPEED_PRESETS.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPresetIdx(i)}
                    className="rounded-xl px-3 py-2.5 text-center font-mono text-xs font-semibold transition-all"
                    style={{
                      background: presetIdx === i ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.04)",
                      border: presetIdx === i ? "1px solid rgba(16,185,129,0.45)" : "1px solid rgba(255,255,255,0.08)",
                      color: presetIdx === i ? "#10b981" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center font-display text-2xl font-bold text-white/70">
                制限時間：<span className="text-emerald-400">{Math.floor(timeLimit / 60)}:{String(timeLimit % 60).padStart(2, "0")}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={handleStart}
              className="flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-display text-base font-semibold transition-all"
              style={{
                background: "rgba(16,185,129,0.14)",
                border: "1px solid rgba(16,185,129,0.4)",
                color: "#10b981",
              }}
            >
              スタート
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
        {phase === "reading" && (
          <ReadingPhase key="reading" problem={problem} timeLimit={timeLimit} onFinish={handleReadingFinish} />
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
