"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Swords,
  Shuffle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Sparkles,
} from "lucide-react";
import type { Problem, Deviation } from "@/lib/types";
import {
  DEVIATION_META,
  DEVIATION_VALUES,
  DIFFICULTY_META,
} from "@/lib/types";
import { MathText } from "@/components/math/Math";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { ApproachTabs } from "@/components/scaffolding/ApproachTabs";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { TagChip } from "@/components/shell/TagChip";

// 道場で扱う単元一覧（dojo.ts に登場する unit の和名）。
const DOJO_UNITS = [
  "2次関数",
  "図形と計量",
  "場合の数と確率",
  "整数の性質",
  "三角関数",
  "複素数平面",
  "図形と方程式",
  "微分法",
  "積分法",
  "数列",
  "ベクトル",
] as const;

interface Props {
  allProblems: Problem[];
}

export function DojoExplorer({ allProblems }: Props) {
  // ---- フィルタ状態 ----
  const [devRange, setDevRange] = useState<[Deviation, Deviation]>([55, 70]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  // ---- 出題状態 ----
  const [problem, setProblem] = useState<Problem | null>(null);
  const [revealed, setRevealed] = useState(false);

  // ---- 絞り込み後の問題プール ----
  const pool = useMemo(() => {
    return allProblems.filter((p) => {
      const dev = p.deviation ?? 60;
      if (dev < devRange[0] || dev > devRange[1]) return false;
      if (selectedUnits.length > 0 && !selectedUnits.includes(p.unit)) return false;
      return true;
    });
  }, [allProblems, devRange, selectedUnits]);

  // ---- ランダム出題 ----
  const draw = useCallback(() => {
    if (pool.length === 0) return;
    const idx = Math.floor(Math.random() * pool.length);
    setProblem(pool[idx]);
    setRevealed(false);
  }, [pool]);

  const toggleUnit = (u: string) => {
    setSelectedUnits((cur) =>
      cur.includes(u) ? cur.filter((x) => x !== u) : [...cur, u],
    );
  };

  // ---- 偏差値スライダーの最小 ----
  const devMin = devRange[0];
  const devMax = devRange[1];

  return (
    <div className="space-y-8">
      {/* ==================== フィルタ UI ==================== */}
      <div className="washi rounded-2xl p-5 sm:p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-sm font-bold tracking-widest text-neon-amber">
          <Swords className="h-4 w-4" />
          出題条件を設定する
        </h2>

        {/* 偏差値スライダー */}
        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">偏差値帯</span>
            <span className="font-display text-sm font-bold text-neon-amber">
              {devMin} — {devMax}
            </span>
          </div>
          <DeviationRangeSlider
            value={devRange}
            onChange={setDevRange}
          />
          {/* ラベル列 */}
          <div className="mt-2 grid grid-cols-5 gap-1 text-center">
            {DEVIATION_VALUES.map((v) => {
              const m = DEVIATION_META[v];
              const inRange = v >= devMin && v <= devMax;
              return (
                <div key={v} className="space-y-0.5">
                  <div
                    className="font-mono text-xs font-bold"
                    style={{ color: inRange ? m.accent : "var(--muted-foreground)" }}
                  >
                    {v}
                  </div>
                  <div
                    className="text-[9px] leading-none"
                    style={{ color: inRange ? m.accent : "var(--muted-foreground/50)" }}
                  >
                    {m.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 単元マルチセレクト */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">単元（未選択で全単元）</span>
            {selectedUnits.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedUnits([])}
                className="font-mono text-[10px] text-muted-foreground underline hover:text-neon-amber"
              >
                クリア
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DOJO_UNITS.map((u) => {
              const on = selectedUnits.includes(u);
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => toggleUnit(u)}
                  className="rounded-md border px-2.5 py-1 text-xs transition-colors"
                  style={{
                    color: on ? "var(--neon-amber)" : "var(--muted-foreground)",
                    borderColor: on
                      ? "color-mix(in oklch, var(--neon-amber) 55%, transparent)"
                      : "var(--border)",
                    background: on
                      ? "color-mix(in oklch, var(--neon-amber) 10%, transparent)"
                      : "transparent",
                  }}
                >
                  {u}
                </button>
              );
            })}
          </div>
        </div>

        {/* 在庫数 & 出題ボタン */}
        <div className="mt-5 flex items-center gap-4">
          <span className="font-mono text-xs text-muted-foreground">
            該当{" "}
            <span className="font-bold text-neon-amber">{pool.length}</span> 問
          </span>
          <button
            type="button"
            onClick={draw}
            disabled={pool.length === 0}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-amber/15 py-3 font-display text-base font-bold text-neon-amber transition-colors hover:bg-neon-amber/25 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ boxShadow: "0 0 0 1px oklch(0.6 0.13 70 / 0.3)" }}
          >
            <Shuffle className="h-4 w-4" />
            ランダム出題
          </button>
        </div>
      </div>

      {/* ==================== 問題表示エリア ==================== */}
      <AnimatePresence mode="wait">
        {problem && (
          <motion.div
            key={problem.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProblemDisplay
              problem={problem}
              revealed={revealed}
              onReveal={() => setRevealed(true)}
              onNext={draw}
              poolSize={pool.length}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 未出題時のプレースホルダー */}
      {!problem && (
        <div className="washi flex min-h-52 flex-col items-center justify-center gap-3 rounded-2xl text-center">
          <Sparkles className="h-8 w-8 text-neon-amber/40" />
          <p className="font-display text-sm font-semibold text-muted-foreground">
            条件を設定して「ランダム出題」を押すと、良問が出題されます。
          </p>
        </div>
      )}
    </div>
  );
}

// =====================================================================
// 偏差値レンジスライダー（2 つの thumb を持つ双方向スライダー）
// =====================================================================

function DeviationRangeSlider({
  value,
  onChange,
}: {
  value: [Deviation, Deviation];
  onChange: (v: [Deviation, Deviation]) => void;
}) {
  const vals = DEVIATION_VALUES;
  const minIdx = vals.indexOf(value[0]);
  const maxIdx = vals.indexOf(value[1]);
  const steps = vals.length - 1; // 4

  const toPercent = (i: number) => (i / steps) * 100;

  return (
    <div className="relative mx-1 h-5">
      {/* トラック */}
      <div className="absolute top-1/2 w-full -translate-y-1/2 rounded-full bg-muted" style={{ height: 4 }} />
      {/* アクティブレンジ */}
      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full"
        style={{
          height: 4,
          left: `${toPercent(minIdx)}%`,
          width: `${toPercent(maxIdx - minIdx)}%`,
          background: "var(--neon-amber)",
        }}
      />
      {/* 左 thumb */}
      <input
        type="range"
        min={0}
        max={steps}
        value={minIdx}
        aria-label={`偏差値レンジの下限（現在 ${value[0]}）`}
        onChange={(e) => {
          const ni = Number(e.target.value);
          if (ni <= maxIdx) onChange([vals[ni], value[1]]);
        }}
        className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-amber [&::-webkit-slider-thumb]:bg-white"
      />
      {/* 右 thumb */}
      <input
        type="range"
        min={0}
        max={steps}
        value={maxIdx}
        aria-label={`偏差値レンジの上限（現在 ${value[1]}）`}
        onChange={(e) => {
          const ni = Number(e.target.value);
          if (ni >= minIdx) onChange([value[0], vals[ni]]);
        }}
        className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-neon-amber [&::-webkit-slider-thumb]:bg-white"
      />
    </div>
  );
}

// =====================================================================
// 問題表示コンポーネント
// =====================================================================

function ProblemDisplay({
  problem,
  revealed,
  onReveal,
  onNext,
  poolSize,
}: {
  problem: Problem;
  revealed: boolean;
  onReveal: () => void;
  onNext: () => void;
  poolSize: number;
}) {
  const meta = DIFFICULTY_META[problem.difficulty];
  const devM = problem.deviation ? DEVIATION_META[problem.deviation] : null;

  return (
    <div className="space-y-4">
      {/* ---- 問題ヘッダー ---- */}
      <div className="washi rounded-2xl p-5 sm:p-6">
        {/* メタ行 */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={problem.difficulty} withName />
          {devM && (
            <span
              className="rounded-md border px-2 py-0.5 font-mono text-[11px] font-bold"
              style={{
                color: devM.accent,
                borderColor: `color-mix(in oklch, ${devM.accent} 45%, transparent)`,
                background: `color-mix(in oklch, ${devM.accent} 8%, transparent)`,
              }}
            >
              偏差値 {problem.deviation}
            </span>
          )}
          <span className="font-mono text-xs text-muted-foreground">{problem.unit}</span>
          {problem.university && (
            <span className="font-mono text-xs text-muted-foreground">
              {problem.university}
              {problem.year ? ` (${problem.year})` : ""}
            </span>
          )}
        </div>

        {/* タイトル */}
        <h2
          className="mb-1 font-display text-xl font-extrabold leading-tight tracking-tight"
          style={{ textShadow: `0 0 20px color-mix(in oklch, ${meta.accent} 25%, transparent)` }}
        >
          {problem.title}
        </h2>
        {problem.tagline && (
          <p className="mb-2 text-xs italic text-muted-foreground">「{problem.tagline}」</p>
        )}

        {/* backgroundTag */}
        {problem.backgroundTag && (
          <div className="mb-3 inline-flex items-center gap-1 rounded-md border border-neon-amber/25 bg-neon-amber/5 px-2 py-0.5">
            <BookOpen className="h-3 w-3 text-neon-amber" />
            <span className="font-mono text-[10px] text-neon-amber">
              {problem.backgroundTag}
            </span>
          </div>
        )}

        {/* タグ */}
        {problem.tags && problem.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {problem.tags.map((t) => <TagChip key={t} tag={t} />)}
          </div>
        )}

        {/* 問題文 */}
        <div className="rounded-xl border border-neon-amber/20 bg-white/50 p-4">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neon-amber/70">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-amber" />
            問題
          </div>
          <MathText className="text-[15px] text-foreground/90">{problem.statement}</MathText>
        </div>
      </div>

      {/* ---- 解法多様性タブ（存在する場合） ---- */}
      {problem.approaches && problem.approaches.length > 0 && (
        <div className="washi rounded-2xl p-5">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neon-violet/80">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-violet" />
            解法の多様性
          </div>
          <ApproachTabs approaches={problem.approaches} />
        </div>
      )}

      {/* ---- 解説トグル ---- */}
      {!revealed ? (
        <button
          type="button"
          onClick={onReveal}
          className="w-full rounded-xl border border-neon-amber/40 bg-neon-amber/8 py-4 font-display text-sm font-bold text-neon-amber transition-colors hover:bg-neon-amber/18"
        >
          <ChevronDown className="inline-block h-4 w-4 mr-1" />
          段階的解説を開く
        </button>
      ) : (
        <div className="washi rounded-2xl p-5 sm:p-6">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neon-amber/80">
            <ChevronUp className="inline-block h-3.5 w-3.5" />
            解説
          </div>
          <LogicSteps slug={problem.slug} steps={problem.steps} />
        </div>
      )}

      {/* ---- 次の問題 ---- */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onNext}
          disabled={poolSize === 0}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-neon-amber/40 py-3 font-semibold text-neon-amber transition-colors hover:bg-neon-amber/10 disabled:opacity-40"
        >
          <Shuffle className="h-4 w-4" />
          次の問題
        </button>
        <Link
          href={`/problems/${problem.slug}`}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-neon-amber"
        >
          詳細ページへ
        </Link>
      </div>
    </div>
  );
}
