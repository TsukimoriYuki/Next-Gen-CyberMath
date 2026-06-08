"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { Zap, Heart, Play, RotateCcw, Home, Pencil } from "lucide-react";
import { InlineMath } from "@/components/math/Math";
import {
  nextChallenge,
  timeForStage,
  CORRECT_PER_STAGE,
  type Challenge,
} from "@/lib/drill";

type Phase = "idle" | "countdown" | "playing" | "over";

interface State {
  phase: Phase;
  stage: number;
  lives: number;
  score: number;
  streak: number;
  current: Challenge | null;
  total: number; // 現在の問題の制限時間（秒）
  flash: boolean; // STAGE UP 演出
}

const INIT: State = {
  phase: "idle",
  stage: 1,
  lives: 3,
  score: 0,
  streak: 0,
  current: null,
  total: 0,
  flash: false,
};

type Action =
  | { type: "START" }
  | { type: "BEGIN"; current: Challenge; total: number }
  | {
      type: "PLAY_NEXT";
      stage: number;
      lives: number;
      score: number;
      streak: number;
      current: Challenge;
      total: number;
      flash: boolean;
    }
  | { type: "GAME_OVER"; score: number }
  | { type: "CLEAR_FLASH" }
  | { type: "RESET" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "START":
      return { ...INIT, phase: "countdown" };
    case "BEGIN":
      return { ...s, phase: "playing", stage: 1, current: a.current, total: a.total };
    case "PLAY_NEXT":
      return {
        ...s,
        stage: a.stage,
        lives: a.lives,
        score: a.score,
        streak: a.streak,
        current: a.current,
        total: a.total,
        flash: a.flash,
      };
    case "GAME_OVER":
      return { ...s, phase: "over", score: a.score, current: null };
    case "CLEAR_FLASH":
      return { ...s, flash: false };
    case "RESET":
      return INIT;
    default:
      return s;
  }
}

export default function DrillPage() {
  const [s, dispatch] = useReducer(reducer, INIT);
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(0); // ms

  // 最新 state を ref に保持（タイマー callback での stale 回避）。
  // render 中ではなくエフェクトで書き込む（他のエフェクトより先に同期される）。
  const stateRef = useRef(s);
  useEffect(() => {
    stateRef.current = s;
  });

  const startGame = useCallback(() => {
    setCountdown(3);
    dispatch({ type: "START" });
  }, []);

  // 共通：誤答／時間切れの処理。
  const loseLife = useCallback(() => {
    const cur = stateRef.current;
    const lives = cur.lives - 1;
    if (lives <= 0) {
      dispatch({ type: "GAME_OVER", score: cur.score });
      return;
    }
    dispatch({
      type: "PLAY_NEXT",
      stage: cur.stage,
      lives,
      score: cur.score,
      streak: cur.streak,
      current: nextChallenge(cur.stage),
      total: timeForStage(cur.stage),
      flash: false,
    });
  }, []);

  const answer = useCallback((index: number) => {
    const cur = stateRef.current;
    if (cur.phase !== "playing" || !cur.current) return;
    const correct = index === cur.current.answerIndex;
    if (!correct) {
      loseLife();
      return;
    }
    let stage = cur.stage;
    let streak = cur.streak + 1;
    let flash = false;
    if (streak >= CORRECT_PER_STAGE) {
      stage += 1;
      streak = 0;
      flash = true;
    }
    dispatch({
      type: "PLAY_NEXT",
      stage,
      lives: cur.lives,
      score: cur.score + 1,
      streak,
      current: nextChallenge(stage),
      total: timeForStage(stage),
      flash,
    });
  }, [loseLife]);

  // カウントダウン（3→2→1→開始）。setState は setTimeout 内のみ。
  useEffect(() => {
    if (s.phase !== "countdown") return;
    const t1 = setTimeout(() => setCountdown(2), 800);
    const t2 = setTimeout(() => setCountdown(1), 1600);
    const t3 = setTimeout(() => {
      dispatch({ type: "BEGIN", current: nextChallenge(1), total: timeForStage(1) });
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [s.phase]);

  // 問題ごとのタイマー（rAF）。問題が変わるたびに再充填。
  useEffect(() => {
    if (s.phase !== "playing" || !s.current) return;
    const total = stateRef.current.total;
    const deadline = performance.now() + total * 1000;
    let raf = 0;
    const tick = () => {
      const left = deadline - performance.now();
      if (left <= 0) {
        setTimeLeft(0);
        loseLife();
        return;
      }
      setTimeLeft(left);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s.phase, s.current]);

  // STAGE UP フラッシュの自動消去。
  useEffect(() => {
    if (!s.flash) return;
    const t = setTimeout(() => dispatch({ type: "CLEAR_FLASH" }), 1100);
    return () => clearTimeout(t);
  }, [s.flash]);

  const ratio = s.total > 0 ? Math.max(0, timeLeft / (s.total * 1000)) : 0;
  const barColor =
    ratio > 0.4 ? "var(--neon-cyan)" : ratio > 0.2 ? "var(--neon-amber)" : "var(--neon-magenta)";

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="inline-flex items-center gap-2 rounded-full border border-neon-amber/30 bg-neon-amber/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-amber">
        <Zap className="h-3.5 w-3.5" />
        Cyber Drill · Shuttle Run
      </div>
      <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
        サイバー計算特訓
      </h1>

      {/* ============ IDLE ============ */}
      {s.phase === "idle" && (
        <div className="glass glow-cyan mt-8 rounded-3xl p-8 text-center sm:p-12">
          <Pencil className="mx-auto mb-4 h-10 w-10 text-neon-cyan" />
          <p className="font-display text-xl font-bold">
            最初に、紙とペンを用意してください。
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            平方完成・因数分解・微分係数などを 4 択で連続出題します。5 問正解ごとに
            ステージが上がり、制限時間が短くなります。ライフは 3 つ。3 回ミス、または
            時間切れでゲームオーバーです。
          </p>
          <button
            type="button"
            onClick={startGame}
            className="glow-cyan mt-8 inline-flex items-center gap-2 rounded-xl bg-neon-cyan/15 px-6 py-3 font-display text-lg font-bold text-neon-cyan transition-colors hover:bg-neon-cyan/25"
          >
            <Play className="h-5 w-5" />
            SYSTEM START
          </button>
        </div>
      )}

      {/* ============ COUNTDOWN ============ */}
      {s.phase === "countdown" && (
        <div className="glass mt-8 flex h-64 items-center justify-center rounded-3xl">
          <span
            key={countdown}
            className="font-display text-8xl font-extrabold text-neon-cyan"
            style={{ animation: "pulse 0.8s ease-in-out" }}
          >
            {countdown}
          </span>
        </div>
      )}

      {/* ============ PLAYING ============ */}
      {s.phase === "playing" && s.current && (
        <div className="mt-6">
          {/* progress bar */}
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/60">
            <div
              className={ratio <= 0.2 ? "h-full animate-pulse" : "h-full"}
              style={{
                width: `${ratio * 100}%`,
                background: barColor,
                transition: "width 80ms linear",
              }}
            />
          </div>

          {/* HUD */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="font-mono text-muted-foreground">
              STAGE <span className="font-bold text-neon-cyan">{s.stage}</span>
              <span className="ml-3">
                {s.streak}/{CORRECT_PER_STAGE}
              </span>
            </span>
            <span className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <Heart
                  key={i}
                  className="h-5 w-5"
                  style={{
                    color: i < s.lives ? "var(--neon-magenta)" : "var(--border)",
                    fill: i < s.lives ? "var(--neon-magenta)" : "transparent",
                  }}
                />
              ))}
            </span>
            <span className="font-mono text-muted-foreground">
              SCORE <span className="font-bold text-neon-lime">{s.score}</span>
            </span>
          </div>

          {/* question */}
          <div className="glass relative mt-6 rounded-2xl p-8 text-center">
            {s.flash && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-neon-lime/10 backdrop-blur-sm">
                <span className="font-display text-3xl font-extrabold text-neon-lime">
                  STAGE {s.stage} ↑
                </span>
              </div>
            )}
            <div className="mb-1 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {s.current.kind}
            </div>
            <div className="text-2xl text-slate-800">
              <InlineMath math={s.current.prompt} />
            </div>
          </div>

          {/* choices */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {s.current.choices.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => answer(i)}
                className="glass glass-hover rounded-xl px-5 py-4 text-lg text-slate-800 transition-transform active:scale-[0.98]"
              >
                <InlineMath math={c} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ============ GAME OVER ============ */}
      {s.phase === "over" && (
        <div className="glass glow-magenta mt-8 rounded-3xl p-8 text-center sm:p-12">
          <p className="font-display text-3xl font-extrabold tracking-wide text-neon-magenta">
            GAME OVER
          </p>
          <div className="mt-6 flex items-center justify-center gap-8">
            <div>
              <div className="font-display text-4xl font-extrabold text-neon-lime">
                {s.score}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                正解数
              </div>
            </div>
            <div>
              <div className="font-display text-4xl font-extrabold text-neon-cyan">
                {s.stage}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                到達ステージ
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={startGame}
              className="glow-cyan inline-flex items-center gap-2 rounded-xl bg-neon-cyan/15 px-6 py-3 font-display font-bold text-neon-cyan transition-colors hover:bg-neon-cyan/25"
            >
              <RotateCcw className="h-5 w-5" />
              もう一度
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <Home className="h-5 w-5" />
              トップへ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
