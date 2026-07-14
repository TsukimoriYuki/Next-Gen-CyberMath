"use client";

import { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { Sparkles, Printer, Flag, Lightbulb, RotateCcw, Check, X, Timer, SlidersHorizontal, LineChart } from "lucide-react";
import {
  DIFFICULTY_META,
  DIFFICULTY_ORDER,
  type Difficulty,
  type Problem,
} from "@/lib/types";
import { getAllProblems } from "@/lib/content";
import {
  generateExam,
  generateExamByPlan,
  buildExamPlan,
  DIFFICULTY_COST_MIN,
  computeWeakTags,
  lessonsForWeakTags,
  saveAttemptLocal,
  nowMs,
  type ExamConfig,
} from "@/lib/exam";
import {
  getUnitTagGroups,
  resolvePresetTags,
  type Preset,
} from "@/lib/exam-taxonomy";
import { MathText } from "@/components/math/Math";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { TagChip } from "@/components/shell/TagChip";
import { MockTimer } from "@/components/mock/MockTimer";
import { PresetBar } from "@/components/mock/PresetBar";
import { TagSelector } from "@/components/mock/TagSelector";

type Phase = "config" | "running" | "result";

const DEFAULT_DIFFICULTIES: Difficulty[] = ["A", "B", "C"];
const TIME_OPTIONS = [10, 20, 30, 50, 90, 150];

export default function MockExamPage() {
  const allProblems = useMemo(() => getAllProblems(), []);
  const groups = useMemo(() => getUnitTagGroups(), []);

  const [phase, setPhase] = useState<Phase>("config");
  const [difficulties, setDifficulties] =
    useState<Difficulty[]>(DEFAULT_DIFFICULTIES);
  const [tags, setTags] = useState<string[]>([]);
  const [auto, setAuto] = useState(true);
  const [count, setCount] = useState(10);
  const [minutes, setMinutes] = useState(30);

  const [problems, setProblems] = useState<Problem[]>([]);
  const [marks, setMarks] = useState<Record<string, boolean>>({});
  const [finalized, setFinalized] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [durationSec, setDurationSec] = useState(0);

  // 現在の難易度×タグに合致する在庫数（サマリ表示用）。
  const matchCount = useMemo(
    () =>
      allProblems.filter(
        (p) =>
          difficulties.includes(p.difficulty) &&
          (tags.length === 0 || (p.tags ?? []).some((t) => tags.includes(t))),
      ).length,
    [allProblems, difficulties, tags],
  );

  // 要件C: 時間逆算プラン（auto モード時）。乱数を含まない純関数。
  const plan = useMemo(
    () => buildExamPlan(minutes * 60, difficulties, tags),
    [minutes, difficulties, tags],
  );

  const applyPreset = (preset: Preset) => {
    if (preset.clear) {
      setTags([]);
      setDifficulties(DEFAULT_DIFFICULTIES);
      return;
    }
    if (preset.difficulties) setDifficulties(preset.difficulties);
    setTags(resolvePresetTags(preset, groups));
  };

  const config: ExamConfig = useMemo(
    () => ({
      difficulties,
      tags,
      count: auto ? plan.totalCount : count,
      timeLimitSec: minutes * 60,
    }),
    [difficulties, tags, auto, plan.totalCount, count, minutes],
  );

  const start = () => {
    const generated = auto
      ? generateExamByPlan(plan, tags)
      : generateExam(config);
    if (generated.length === 0) return;
    setProblems(generated);
    setMarks({});
    setFinalized(false);
    setStartedAt(nowMs());
    setPhase("running");
  };

  const submit = useCallback(() => {
    setDurationSec(Math.round((nowMs() - startedAt) / 1000));
    setPhase("result");
  }, [startedAt]);

  const reset = () => {
    setPhase("config");
    setProblems([]);
    setMarks({});
    setFinalized(false);
  };

  // ---- result computations ----
  const wrong = problems.filter((p) => marks[p.slug] === false);
  const correctCount = problems.filter((p) => marks[p.slug] === true).length;
  const weakTags = computeWeakTags(wrong);
  const suggestedLessons = lessonsForWeakTags(weakTags);

  const finalize = () => {
    const result = {
      problemSlugs: problems.map((p) => p.slug),
      wrongSlugs: wrong.map((p) => p.slug),
      score: correctCount,
      totalCount: problems.length,
      durationSec,
      weakTags: weakTags.slice(0, 8),
    };
    // localStorage（必ず保存）
    saveAttemptLocal({ config, ...result });
    // 自己採点式の生成模試はサーバーが正誤を再計算できないため、履歴はローカルだけに保存する。
    setFinalized(true);
  };

  // ============================ CONFIG ============================
  if (phase === "config") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <header>
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-magenta/30 bg-neon-magenta/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-magenta">
            <Sparkles className="h-3.5 w-3.5" />
            Mock Exam Generator
          </div>
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
            サイバー模試・特訓モード
          </h1>
          <p className="mt-2 text-muted-foreground">
            条件を選んでオリジナル模試を生成。提出後に厳密解で自己採点し、弱点を講座で補強します。
          </p>
          <Link
            href="/mock/history"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neon-cyan/40 bg-neon-cyan/5 px-3 py-2 text-sm font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/15"
          >
            <LineChart className="h-4 w-4" />
            成長の軌跡・弱点分析を見る
          </Link>
        </header>

        <div className="mt-8 space-y-7">
          {/* 要件A: クイックプリセット */}
          <PresetBar onApply={applyPreset} />

          {/* difficulty */}
          <section className="glass rounded-2xl p-5">
            <h2 className="mb-3 font-display text-sm font-bold tracking-wide">難易度</h2>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_ORDER.map((d) => {
                const m = DIFFICULTY_META[d];
                const on = difficulties.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() =>
                      setDifficulties((cur) =>
                        cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d],
                      )
                    }
                    className="rounded-lg border px-3 py-1.5 font-mono text-sm font-bold transition-colors"
                    style={{
                      color: on ? m.accent : "var(--muted-foreground)",
                      borderColor: on
                        ? `color-mix(in oklch, ${m.accent} 55%, transparent)`
                        : "var(--border)",
                      background: on
                        ? `color-mix(in oklch, ${m.accent} 12%, transparent)`
                        : "transparent",
                    }}
                  >
                    {m.label} <span className="text-[10px] font-normal">{m.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 要件B: 階層型タグセレクタ */}
          <TagSelector selected={tags} onChange={setTags} matchCount={matchCount} />

          {/* 制限時間 */}
          <section className="glass rounded-2xl p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold tracking-wide">
              <Timer className="h-4 w-4 text-neon-cyan" />
              制限時間（分）
            </h2>
            <div className="flex flex-wrap gap-2">
              {TIME_OPTIONS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setMinutes(t)}
                  className="rounded-lg border px-3 py-1.5 font-mono text-sm transition-colors"
                  style={{
                    color: minutes === t ? "var(--neon-cyan)" : "var(--muted-foreground)",
                    borderColor:
                      minutes === t
                        ? "color-mix(in oklch, var(--neon-cyan) 55%, transparent)"
                        : "var(--border)",
                    background:
                      minutes === t
                        ? "color-mix(in oklch, var(--neon-cyan) 10%, transparent)"
                        : "transparent",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* 要件C: 問題数の決定方式（自動編成 / 手動） */}
          <section className="glass rounded-2xl p-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 font-display text-sm font-bold tracking-wide">
                <SlidersHorizontal className="h-4 w-4 text-neon-cyan" />
                出題編成
              </h2>
              <div className="flex rounded-lg border border-border p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setAuto(true)}
                  className="rounded-md px-3 py-1 transition-colors"
                  style={{
                    color: auto ? "var(--neon-cyan)" : "var(--muted-foreground)",
                    background: auto
                      ? "color-mix(in oklch, var(--neon-cyan) 12%, transparent)"
                      : "transparent",
                  }}
                >
                  自動（時間逆算）
                </button>
                <button
                  type="button"
                  onClick={() => setAuto(false)}
                  className="rounded-md px-3 py-1 transition-colors"
                  style={{
                    color: !auto ? "var(--neon-cyan)" : "var(--muted-foreground)",
                    background: !auto
                      ? "color-mix(in oklch, var(--neon-cyan) 12%, transparent)"
                      : "transparent",
                  }}
                >
                  手動
                </button>
              </div>
            </div>

            {auto ? (
              <div>
                {plan.feasible ? (
                  <>
                    <div className="mb-3 flex flex-wrap items-baseline gap-2">
                      <span className="font-display text-2xl font-extrabold text-neon-cyan">
                        計 {Number.isFinite(plan.totalCount) ? plan.totalCount : 0} 問
                      </span>
                      <span className="font-mono text-sm text-muted-foreground">
                        推定所要 約 {Number.isFinite(plan.estimatedMin) ? plan.estimatedMin : 0} 分 / 制限{" "}
                        {Number.isFinite(minutes) ? minutes : "未設定"} 分
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {DIFFICULTY_ORDER.filter((d) => plan.perDifficulty[d] > 0).map(
                        (d) => {
                          const m = DIFFICULTY_META[d];
                          return (
                            <span
                              key={d}
                              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 font-mono text-sm"
                              style={{
                                color: m.accent,
                                borderColor: `color-mix(in oklch, ${m.accent} 45%, transparent)`,
                                background: `color-mix(in oklch, ${m.accent} 8%, transparent)`,
                              }}
                            >
                              <span className="font-bold">{m.label}</span>
                              <span className="text-foreground/80">
                                × {plan.perDifficulty[d]}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                ({DIFFICULTY_COST_MIN[d]}分/問)
                              </span>
                            </span>
                          );
                        },
                      )}
                    </div>
                    <p className="mt-3 text-xs text-muted-foreground">
                      制限時間から難易度配分を自動最適化しています。時間や範囲を変えると即座に再編成されます。
                    </p>
                  </>
                ) : (
                  <p className="rounded-lg border border-neon-amber/40 bg-neon-amber/5 p-3 text-sm text-neon-amber">
                    {plan.note}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted-foreground">問題数</span>
                <input
                  type="range"
                  min={3}
                  max={20}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="flex-1 accent-[var(--neon-cyan)]"
                />
                <span className="w-12 text-right font-mono text-lg font-bold text-neon-cyan">
                  {count}
                </span>
              </div>
            )}
          </section>

          <button
            type="button"
            onClick={start}
            disabled={
              difficulties.length === 0 ||
              matchCount === 0 ||
              (auto && !plan.feasible)
            }
            className="glow-magenta w-full rounded-xl bg-neon-magenta/15 py-4 font-display text-lg font-bold text-neon-magenta transition-colors hover:bg-neon-magenta/25 disabled:opacity-40"
          >
            模試を生成して開始
          </button>
        </div>
      </div>
    );
  }

  // ============================ RUNNING ============================
  if (phase === "running") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* sticky bar */}
        <div className="no-print sticky top-16 z-40 -mx-4 mb-6 flex items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
          <MockTimer seconds={config.timeLimitSec} onExpire={submit} running />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <Printer className="h-4 w-4" /> 印刷
            </button>
            <button
              type="button"
              onClick={submit}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neon-magenta/50 bg-neon-magenta/10 px-3 py-2 text-sm font-semibold text-neon-magenta"
            >
              <Flag className="h-4 w-4" /> 提出
            </button>
          </div>
        </div>

        {/* printable test sheet */}
        <div className="print-sheet">
          <div className="mb-6 hidden print:block">
            <h1 className="text-center text-xl font-bold">Cyber Math Next-Gen — 確認テスト</h1>
            <div className="mt-2 flex justify-between text-sm">
              <span>氏名 ____________________</span>
              <span>制限時間 {minutes} 分 / {problems.length} 問</span>
            </div>
            <hr className="mt-2" />
          </div>

          <ol className="space-y-7">
            {problems.map((p, i) => (
              <li key={p.slug} className="break-inside-avoid">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-bold text-neon-cyan print:text-black">
                    第 {i + 1} 問
                  </span>
                  <span className="no-print">
                    <DifficultyBadge difficulty={p.difficulty} />
                  </span>
                </div>
                <div className="mt-2">
                  <MathText className="text-[15px] text-foreground/90 print:text-black">
                    {p.statement}
                  </MathText>
                </div>
                {/* answer space (handwriting / print) */}
                <div className="mt-3 h-24 rounded-lg border border-dashed border-border/70 print:h-28 print:border-black/40" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  // ============================ RESULT ============================
  const markedCount = problems.filter((p) => marks[p.slug] !== undefined).length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="glass glow-cyan rounded-2xl p-6">
        <h1 className="font-display text-2xl font-bold tracking-wide">採点・弱点分析</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          各問の厳密解を開き、自分の答案を ○ / × で採点してください。
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="font-display text-3xl font-extrabold">
            <span className="text-neon-lime">{correctCount}</span>
            <span className="text-muted-foreground"> / {problems.length}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            所要 {Math.floor(durationSec / 60)} 分 {durationSec % 60} 秒 ・ 採点済 {markedCount}/{problems.length}
          </div>
        </div>

        {finalized && weakTags.length > 0 && (
          <div className="mt-5 rounded-xl border border-neon-magenta/30 bg-neon-magenta/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neon-magenta">
              <Lightbulb className="h-4 w-4" /> 弱点タグと補強講座
            </div>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {weakTags.slice(0, 8).map((t) => (
                <TagChip key={t} tag={t} />
              ))}
            </div>
            {suggestedLessons.length > 0 ? (
              <div className="grid gap-2 sm:grid-cols-2">
                {suggestedLessons.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/lessons/${l.slug}`}
                    className="glass glass-hover rounded-lg p-3 text-sm font-semibold text-foreground"
                  >
                    💡 {l.title}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                対応する講座が見つかりませんでした。タグから問題を復習しましょう。
              </p>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {!finalized && (
            <button
              type="button"
              onClick={finalize}
              disabled={markedCount < problems.length}
              className="glow-magenta inline-flex items-center gap-2 rounded-lg bg-neon-magenta/15 px-4 py-2 text-sm font-semibold text-neon-magenta transition-colors hover:bg-neon-magenta/25 disabled:opacity-40"
            >
              <Flag className="h-4 w-4" /> 採点を確定して弱点を見る
            </button>
          )}
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
          >
            <RotateCcw className="h-4 w-4" /> 新しい模試
          </button>
        </div>
      </header>

      {/* review */}
      <ol className="mt-8 space-y-6">
        {problems.map((p, i) => {
          const sol = [...p.steps].sort((a, b) => a.order - b.order).find((s) => s.type === "SOLUTION");
          const mark = marks[p.slug];
          return (
            <li key={p.slug} className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold">第 {i + 1} 問</span>
                  <DifficultyBadge difficulty={p.difficulty} />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setMarks((m) => ({ ...m, [p.slug]: true }))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                    style={{
                      color: mark === true ? "var(--neon-lime)" : "var(--muted-foreground)",
                      borderColor: mark === true ? "color-mix(in oklch, var(--neon-lime) 55%, transparent)" : "var(--border)",
                      background: mark === true ? "color-mix(in oklch, var(--neon-lime) 12%, transparent)" : "transparent",
                    }}
                    aria-label="正解"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMarks((m) => ({ ...m, [p.slug]: false }))}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors"
                    style={{
                      color: mark === false ? "var(--neon-magenta)" : "var(--muted-foreground)",
                      borderColor: mark === false ? "color-mix(in oklch, var(--neon-magenta) 55%, transparent)" : "var(--border)",
                      background: mark === false ? "color-mix(in oklch, var(--neon-magenta) 12%, transparent)" : "transparent",
                    }}
                    aria-label="不正解"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <MathText className="text-sm text-foreground/90">{p.statement}</MathText>
              </div>

              {sol && (
                <details className="mt-4 rounded-xl border border-border/60 bg-background/30 p-4">
                  <summary className="cursor-pointer text-sm font-semibold text-neon-magenta">
                    厳密解を開く
                  </summary>
                  <div className="mt-3">
                    <LessonRenderer content={sol.body} />
                  </div>
                </details>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={`/problems/${p.slug}`}
                  className="text-xs text-muted-foreground underline decoration-border hover:text-neon-cyan"
                >
                  この問題の全ステップへ
                </Link>
                <span className="flex flex-wrap gap-1">
                  {(p.tags ?? []).map((t) => (
                    <TagChip key={t} tag={t} />
                  ))}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
