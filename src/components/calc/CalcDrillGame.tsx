"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, XCircle, RotateCcw, Zap, Trophy, Target } from "lucide-react";
import type { CalcDrillProblem, DrillCategory, DrillDifficulty } from "@/data/calc-drill";
import { CALC_DRILL_PROBLEMS, DRILL_CATEGORIES } from "@/data/calc-drill";

import katex from "katex";

// Mixed text + $...$ inline math renderer
// e.g. "$(x+3)^2$ を展開せよ" → renders math part + plain text correctly
function InlineMath({ tex }: { tex: string }) {
  const parts = useMemo(() => {
    const nodes: React.ReactNode[] = [];
    // Split keeping $...$ delimiters
    const segments = tex.split(/(\$[^$]+\$)/g);
    segments.forEach((seg, i) => {
      if (seg.startsWith("$") && seg.endsWith("$") && seg.length > 2) {
        try {
          const html = katex.renderToString(seg.slice(1, -1), {
            throwOnError: false,
            displayMode: false,
          });
          nodes.push(<span key={i} dangerouslySetInnerHTML={{ __html: html }} />);
        } catch {
          nodes.push(<span key={i}>{seg}</span>);
        }
      } else if (seg) {
        nodes.push(<span key={i}>{seg}</span>);
      }
    });
    return nodes;
  }, [tex]);
  return <>{parts}</>;
}

const QUESTION_TIME = 30; // seconds per question

interface DrillResult {
  problem: CalcDrillProblem;
  selected: number;
  correct: boolean;
  timeUsed: number;
}

type GamePhase = "config" | "playing" | "result";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Config Screen ──────────────────────────────────────────────────────────
function ConfigScreen({
  onStart,
}: {
  onStart: (problems: CalcDrillProblem[]) => void;
}) {
  const [selectedCategories, setSelectedCategories] = useState<Set<DrillCategory>>(
    new Set(Object.keys(DRILL_CATEGORIES) as DrillCategory[]),
  );
  const [difficulty, setDifficulty] = useState<DrillDifficulty | "all">("all");
  const [count, setCount] = useState(10);

  const toggleCat = (cat: DrillCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size > 1) next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const pool = CALC_DRILL_PROBLEMS.filter(
    (p) =>
      selectedCategories.has(p.category) &&
      (difficulty === "all" || p.difficulty === difficulty),
  );

  const handleStart = () => {
    if (pool.length === 0) return;
    const picked = shuffle(pool).slice(0, Math.min(count, pool.length));
    onStart(picked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Category selector */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/40">カテゴリ選択</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(DRILL_CATEGORIES) as [DrillCategory, { label: string; accent: string }][]).map(
            ([key, meta]) => {
              const active = selectedCategories.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleCat(key)}
                  className="rounded-xl px-3 py-1.5 font-mono text-xs font-semibold transition-all"
                  style={{
                    background: active
                      ? `color-mix(in srgb, ${meta.accent} 18%, transparent)`
                      : "rgba(255,255,255,0.04)",
                    border: active
                      ? `1px solid color-mix(in srgb, ${meta.accent} 45%, transparent)`
                      : "1px solid rgba(255,255,255,0.08)",
                    color: active ? meta.accent : "rgba(255,255,255,0.35)",
                  }}
                >
                  {meta.label}
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Difficulty + count */}
      <div className="grid grid-cols-2 gap-4">
        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/40">難易度</p>
          <div className="flex flex-col gap-1.5">
            {(
              [
                { val: "all", label: "すべて" },
                { val: "basic", label: "基礎" },
                { val: "standard", label: "標準" },
                { val: "advanced", label: "発展" },
              ] as { val: DrillDifficulty | "all"; label: string }[]
            ).map(({ val, label }) => (
              <button
                key={val}
                type="button"
                onClick={() => setDifficulty(val)}
                className="rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all"
                style={{
                  background: difficulty === val ? "rgba(0,210,255,0.14)" : "transparent",
                  border: difficulty === val ? "1px solid rgba(0,210,255,0.35)" : "1px solid transparent",
                  color: difficulty === val ? "#00d2ff" : "rgba(255,255,255,0.4)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="rounded-2xl p-4"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-white/40">問題数</p>
          <div className="flex flex-col gap-1.5">
            {[5, 10, 15, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setCount(n)}
                className="rounded-lg px-3 py-1.5 text-left font-mono text-xs transition-all"
                style={{
                  background: count === n ? "rgba(0,210,255,0.14)" : "transparent",
                  border: count === n ? "1px solid rgba(0,210,255,0.35)" : "1px solid transparent",
                  color: count === n ? "#00d2ff" : "rgba(255,255,255,0.4)",
                }}
              >
                {n} 問
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pool info + start */}
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/30">
          対象問題: <span className="text-white/60">{pool.length}</span> 問（最大 {Math.min(count, pool.length)} 問出題）
        </p>
        <button
          type="button"
          onClick={handleStart}
          disabled={pool.length === 0}
          className="flex items-center gap-2 rounded-xl px-6 py-3 font-display font-bold transition-all disabled:opacity-40"
          style={{
            background: "rgba(0,210,255,0.14)",
            border: "1px solid rgba(0,210,255,0.4)",
            color: "#00d2ff",
          }}
        >
          <Zap className="h-4 w-4" />
          スタート
        </button>
      </div>
    </motion.div>
  );
}

// ── Question Screen ────────────────────────────────────────────────────────
function QuestionScreen({
  problem,
  index,
  total,
  onAnswer,
}: {
  problem: CalcDrillProblem;
  index: number;
  total: number;
  onAnswer: (selected: number, timeUsed: number) => void;
}) {
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const startTime = useRef<number>(0);

  useEffect(() => {
    startTime.current = Date.now();
  }, [problem.id]);

  useEffect(() => {
    if (selected !== null) return;
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          // time over → treat as wrong (index -1)
          onAnswer(-1, QUESTION_TIME);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [selected, onAnswer, problem.id]);

  const handleSelect = useCallback((idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const used = Math.round((Date.now() - startTime.current) / 1000);
    setTimeout(() => onAnswer(idx, Math.min(used, QUESTION_TIME)), 600);
  }, [selected, onAnswer]);

  const progress = (timeLeft / QUESTION_TIME) * 100;
  const isUrgent = timeLeft <= 10;
  const catMeta = DRILL_CATEGORIES[problem.category];

  return (
    <motion.div
      key={problem.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-5"
    >
      {/* Header: progress + timer */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span
            className="rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold"
            style={{
              background: `color-mix(in srgb, ${catMeta.accent} 15%, transparent)`,
              border: `1px solid color-mix(in srgb, ${catMeta.accent} 40%, transparent)`,
              color: catMeta.accent,
            }}
          >
            {catMeta.label}
          </span>
          <span className="font-mono text-xs text-white/35">
            {index + 1} / {total}
          </span>
        </div>
        <span
          className="font-display text-2xl font-bold tabular-nums transition-colors"
          style={{ color: isUrgent ? "#f43f5e" : "#00d2ff" }}
        >
          {timeLeft}
        </span>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${progress}%`,
            background: isUrgent
              ? "linear-gradient(90deg, #f43f5e, #fb7185)"
              : "linear-gradient(90deg, #00d2ff, #38bdf8)",
          }}
        />
      </div>

      {/* Question */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-lg font-bold text-white leading-relaxed">
          <InlineMath tex={problem.question} />
        </p>
        {showHint && (
          <p className="mt-3 rounded-xl border border-yellow-500/25 bg-yellow-500/8 p-3 font-mono text-xs text-yellow-300/80">
            💡 <InlineMath tex={problem.hint} />
          </p>
        )}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {problem.options.map((opt, i) => {
          const isCorrect = i === problem.correctIndex;
          const isSelected = selected === i;
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.1)";
          let color = "rgba(255,255,255,0.75)";
          if (selected !== null) {
            if (isCorrect) { bg = "rgba(16,185,129,0.18)"; border = "rgba(16,185,129,0.5)"; color = "#10b981"; }
            else if (isSelected) { bg = "rgba(244,63,94,0.15)"; border = "rgba(244,63,94,0.4)"; color = "#f43f5e"; }
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className="rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all disabled:cursor-default"
              style={{ background: bg, border: `1px solid ${border}`, color }}
            >
              <span className="font-mono text-[10px] text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
              <InlineMath tex={opt} />
            </button>
          );
        })}
      </div>

      {/* Hint toggle */}
      {selected === null && (
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="self-start font-mono text-xs text-white/25 transition-colors hover:text-yellow-400/60"
        >
          {showHint ? "ヒントを隠す" : "💡 ヒントを見る"}
        </button>
      )}
    </motion.div>
  );
}

// ── Result Screen ──────────────────────────────────────────────────────────
function ResultScreen({
  results,
  onRetry,
}: {
  results: DrillResult[];
  onRetry: () => void;
}) {
  const correct = results.filter((r) => r.correct).length;
  const pct = Math.round((correct / results.length) * 100);
  const avgTime = Math.round(results.reduce((s, r) => s + r.timeUsed, 0) / results.length);

  const gradeColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#f43f5e";
  const gradeLabel = pct >= 90 ? "PERFECT" : pct >= 70 ? "GOOD" : pct >= 50 ? "OK" : "RETRY";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6"
    >
      {/* Score header */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ background: "rgba(255,255,255,0.03)", border: `1px solid color-mix(in srgb, ${gradeColor} 30%, transparent)` }}
      >
        <Trophy className="mx-auto mb-3 h-8 w-8" style={{ color: gradeColor }} />
        <div className="font-display text-5xl font-extrabold tabular-nums" style={{ color: gradeColor }}>
          {pct}<span className="text-2xl font-bold text-white/40">%</span>
        </div>
        <div className="mt-1 font-mono text-sm tracking-[0.2em]" style={{ color: gradeColor }}>
          {gradeLabel}
        </div>
        <div className="mt-3 flex justify-center gap-6 font-mono text-xs text-white/40">
          <span>{correct} / {results.length} 正解</span>
          <span>平均 {avgTime}s / 問</span>
        </div>
      </div>

      {/* Per-question review */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div
          className="px-4 py-2.5"
          style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">問題別結果</span>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
          {results.map((r, i) => {
            const catMeta = DRILL_CATEGORIES[r.problem.category];
            return (
              <div key={i} className="flex items-start gap-3 px-4 py-3">
                <div className="mt-0.5 shrink-0">
                  {r.correct
                    ? <CheckCircle className="h-4 w-4 text-emerald-400" />
                    : <XCircle className="h-4 w-4 text-red-400" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="rounded px-1.5 py-0.5 font-mono text-[10px]"
                      style={{
                        background: `color-mix(in srgb, ${catMeta.accent} 12%, transparent)`,
                        color: catMeta.accent,
                      }}
                    >
                      {catMeta.label}
                    </span>
                    <span className="font-mono text-[10px] text-white/25">{r.timeUsed}s</span>
                  </div>
                  <p className="text-sm text-white/70">
                    <InlineMath tex={r.problem.question} />
                  </p>
                  {!r.correct && (
                    <>
                      <p className="mt-1 text-xs text-emerald-400/80">
                        正解: <InlineMath tex={r.problem.options[r.problem.correctIndex]} />
                      </p>
                      <p className="mt-0.5 text-xs text-white/30">
                        <InlineMath tex={r.problem.solution} />
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-display font-bold transition-all"
        style={{
          background: "rgba(0,210,255,0.1)",
          border: "1px solid rgba(0,210,255,0.3)",
          color: "#00d2ff",
        }}
      >
        <RotateCcw className="h-4 w-4" />
        もう一度挑戦
      </button>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function CalcDrillGame() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("config");
  const [problems, setProblems] = useState<CalcDrillProblem[]>([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [results, setResults] = useState<DrillResult[]>([]);

  const handleStart = useCallback((picked: CalcDrillProblem[]) => {
    setProblems(picked);
    setResults([]);
    setQuestionIdx(0);
    setGamePhase("playing");
  }, []);

  const handleAnswer = useCallback(
    (selected: number, timeUsed: number) => {
      const problem = problems[questionIdx];
      const correct = selected === problem.correctIndex;
      const newResults = [...results, { problem, selected, correct, timeUsed }];
      setResults(newResults);
      if (questionIdx + 1 < problems.length) {
        setQuestionIdx((i) => i + 1);
      } else {
        setGamePhase("result");
      }
    },
    [problems, questionIdx, results],
  );

  const handleRetry = useCallback(() => {
    setGamePhase("config");
  }, []);

  return (
    <div className="mx-auto max-w-xl">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: "rgba(0,210,255,0.12)", border: "1px solid rgba(0,210,255,0.3)" }}
        >
          <Target className="h-5 w-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-white">計算ドリル</h2>
          <p className="font-mono text-xs text-white/35">30秒制限 · 4択クイック演習</p>
        </div>
        {gamePhase === "playing" && (
          <div className="ml-auto">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400/60 transition-all"
                style={{ width: `${((questionIdx) / problems.length) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-right font-mono text-[10px] text-white/30">
              {questionIdx} / {problems.length}
            </p>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gamePhase === "config" && (
          <ConfigScreen key="config" onStart={handleStart} />
        )}
        {gamePhase === "playing" && problems[questionIdx] && (
          <QuestionScreen
            key={`q-${questionIdx}-${problems[questionIdx].id}`}
            problem={problems[questionIdx]}
            index={questionIdx}
            total={problems.length}
            onAnswer={handleAnswer}
          />
        )}
        {gamePhase === "result" && (
          <ResultScreen key="result" results={results} onRetry={handleRetry} />
        )}
      </AnimatePresence>
    </div>
  );
}
