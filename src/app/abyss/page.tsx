"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Skull, Zap, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Problem } from "@/lib/types";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import { DIFFICULTY_META } from "@/lib/types";

// ── Hacking animation symbols ─────────────────────────────────────────────
const MATH_SYMBOLS = [
  "∫", "∑", "∏", "∂", "∇", "Δ", "√", "∞", "∈", "⊆", "∀", "∃",
  "λ", "φ", "ψ", "ω", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ",
  "π", "σ", "τ", "μ", "ν", "ξ", "ρ", "≤", "≥", "≠", "≈", "∮",
  "⊂", "⊃", "∩", "∪", "⊕", "⊗", "ℝ", "ℂ", "ℤ", "ℕ", "ℚ", "∧",
  "∨", "¬", "⊥", "∥", "∠", "∝", "⌊", "⌋", "⌈", "⌉", "‖", "·",
  "×", "÷", "±", "∓", "⊞", "⊟", "⋅", "∗", "†", "‡", "∘", "∼",
];

const GRID_SIZE = 12 * 8; // 12 cols × 8 rows

function randomSymbol() {
  return MATH_SYMBOLS[Math.floor(Math.random() * MATH_SYMBOLS.length)];
}

function HackingGrid() {
  const [cells, setCells] = useState<string[]>(() =>
    Array.from({ length: GRID_SIZE }, randomSymbol),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setCells((prev) => {
        const next = [...prev];
        // Randomize ~30% of cells each tick for "decoding" feel
        const count = Math.floor(GRID_SIZE * 0.3);
        for (let i = 0; i < count; i++) {
          next[Math.floor(Math.random() * GRID_SIZE)] = randomSymbol();
        }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="grid select-none font-mono text-sm leading-6"
      style={{
        gridTemplateColumns: "repeat(12, 1fr)",
        color: "rgba(168, 85, 247, 0.35)",
      }}
    >
      {cells.map((sym, i) => (
        <span key={i} className="text-center transition-colors duration-75">
          {sym}
        </span>
      ))}
    </div>
  );
}

// ── Countdown bar ─────────────────────────────────────────────────────────
function CountdownBar({ durationMs }: { durationMs: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / durationMs, 1));
      if (elapsed >= durationMs) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [durationMs]);

  return (
    <div className="h-0.5 w-full overflow-hidden rounded-full bg-purple-900/60">
      <div
        className="h-full rounded-full bg-purple-400 transition-all"
        style={{ width: `${ progress * 100}%` }}
      />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
type Phase = "idle" | "loading" | "revealed";

export default function AbyssPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [problem, setProblem] = useState<Problem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pullGacha = useCallback(async () => {
    setPhase("loading");
    setError(null);
    setProblem(null);

    const DELAY_MS = 1800;

    try {
      const [res] = await Promise.all([
        fetch("/api/abyss/gacha", { credentials: "include" }),
        new Promise((resolve) => {
          timerRef.current = setTimeout(resolve, DELAY_MS);
        }),
      ]);

      if (!res.ok) throw new Error("fetch failed");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error ?? "unknown error");

      setProblem(json.problem);
      setPhase("revealed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
      setPhase("idle");
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const diffMeta = problem ? DIFFICULTY_META[problem.difficulty] : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Back link */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-purple-500 hover:text-purple-300 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          戻る
        </Link>
      </div>

      {/* Header */}
      <header className="px-6 pt-8 pb-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
          <Skull className="h-3.5 w-3.5" />
          Phase 4
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #a855f7 0%, #eab308 50%, #a855f7 100%)",
            }}
          >
            特異点
          </span>
        </h1>
        <p className="mt-1 font-mono text-sm text-purple-400/70 tracking-[0.2em]">
          S I N G U L A R I T Y
        </p>
        <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          数学の深淵から、ランダムに超難問が召喚される。
          解けるか、解けないか — それだけが問われる。
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-20">
        {/* ── IDLE ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mt-10 flex flex-col items-center gap-6"
            >
              {error && (
                <div className="rounded-xl border border-red-700/40 bg-red-900/20 px-5 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={pullGacha}
                className="group relative overflow-hidden rounded-2xl px-10 py-5 font-display text-xl font-bold tracking-wide transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(234,179,8,0.1) 100%)",
                  border: "1px solid rgba(168,85,247,0.4)",
                  boxShadow:
                    "0 0 40px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                {/* Animated shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.2) 50%, transparent 100%)",
                  }}
                />
                <span className="relative flex items-center gap-3">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #a855f7, #eab308)",
                    }}
                  >
                    ガチャを引く
                  </span>
                  <Zap className="h-6 w-6 text-purple-400" />
                </span>
              </button>

              <p className="font-mono text-xs text-gray-600 tracking-[0.15em]">
                ABYSS POOL · {/* count shown at runtime */}
                深淵の問いに、立ち向かえ
              </p>
            </motion.div>
          )}

          {/* ── LOADING ──────────────────────────────────────── */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <div
                className="w-full max-w-lg rounded-2xl p-6 overflow-hidden"
                style={{
                  border: "1px solid rgba(168,85,247,0.25)",
                  background: "rgba(168,85,247,0.04)",
                }}
              >
                <HackingGrid />
              </div>

              <CountdownBar durationMs={1800} />

              <div className="flex items-center gap-2 font-mono text-xs text-purple-500 tracking-[0.2em] animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                SCANNING ABYSS DATABASE
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              </div>
            </motion.div>
          )}

          {/* ── REVEALED ─────────────────────────────────────── */}
          {phase === "revealed" && problem && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 space-y-6"
            >
              {/* Problem card */}
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(168,85,247,0.07) 0%, rgba(0,0,0,0) 60%, rgba(234,179,8,0.05) 100%)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  boxShadow: "0 0 60px rgba(168,85,247,0.08)",
                }}
              >
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold"
                    style={{
                      color: diffMeta?.accent ?? "#a855f7",
                      borderColor: `color-mix(in oklch, ${diffMeta?.accent ?? "#a855f7"} 45%, transparent)`,
                      background: `color-mix(in oklch, ${diffMeta?.accent ?? "#a855f7"} 10%, transparent)`,
                    }}
                  >
                    {diffMeta?.label ?? problem.difficulty}
                  </span>
                  <span className="rounded-full border border-purple-700/40 bg-purple-900/20 px-2.5 py-0.5 font-mono text-xs text-purple-400">
                    ABYSS
                  </span>
                  <span className="rounded-full border border-gray-700/40 bg-gray-900/30 px-2.5 py-0.5 font-mono text-xs text-gray-500">
                    {problem.unit}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-display text-2xl font-extrabold sm:text-3xl bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #e2e8f0 30%, #eab308 100%)",
                  }}
                >
                  {problem.title}
                </h2>

                {problem.tagline && (
                  <p className="mt-2 font-mono text-sm text-purple-400/70 italic">
                    {problem.tagline}
                  </p>
                )}

                {/* Separator */}
                <div
                  className="my-5 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(234,179,8,0.3), transparent)",
                  }}
                />

                {/* Statement — override CSS vars here only so LessonRenderer
                    renders light text against the dark Abyss card background.
                    LogicSteps below is NOT affected and keeps dark text on glass. */}
                <div
                  style={{
                    "--foreground": "oklch(0.92 0.01 240)",
                    "--muted-foreground": "oklch(0.68 0.02 260)",
                  } as React.CSSProperties}
                >
                  <LessonRenderer content={problem.statement} />
                </div>
              </div>

              {/* Logic steps */}
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background: "rgba(168,85,247,0.03)",
                  border: "1px solid rgba(168,85,247,0.18)",
                }}
              >
                <LogicSteps slug={problem.slug} steps={problem.steps} />
              </div>

              {/* Re-roll button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={pullGacha}
                  className="inline-flex items-center gap-2 rounded-xl border border-purple-700/40 bg-purple-900/15 px-6 py-2.5 font-mono text-sm text-purple-400 hover:bg-purple-900/30 transition-colors"
                >
                  <Zap className="h-4 w-4" />
                  もう一問召喚する
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
