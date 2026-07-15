"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Lightbulb, Lock, Unlock } from "lucide-react";
import type { ExplanationStep } from "@/lib/types";
import { MathText } from "@/components/math/Math";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import { useProgress } from "@/hooks/useProgress";

const STEP_PRESENTATION: Record<
  ExplanationStep["type"],
  { label: string; hint: string }
> = {
  INSIGHT: {
    label: "着眼点",
    hint: "問題文の条件と方針を確認します",
  },
  EXPERIMENT: {
    label: "試行・観察",
    hint: "手を動かして性質を確かめます",
  },
  HINT: {
    label: "ヒント",
    hint: "解答につながる手がかりを確認します",
  },
  SOLUTION: {
    label: "解答",
    hint: "考え方から結論までを確認します",
  },
  GUIDANCE_ANALYSIS: {
    label: "誘導の意図",
    hint: "設問の構成と狙いを確認します",
  },
};

export function LogicSteps({
  slug,
  steps,
  labSlot,
  relatedLesson,
  onAllRevealed,
}: {
  slug: string;
  steps: ExplanationStep[];
  /** Injected into the EXPERIMENT step (the interactive lab). */
  labSlot?: ReactNode;
  /** 関連授業への誘導 (解説末尾の CTA)。 */
  relatedLesson?: { slug: string; title: string };
  /** 全ステップ開示完了時に一度だけ呼ばれる。 */
  onAllRevealed?: () => void;
}) {
  const ordered = useMemo(
    () => [...steps].sort((a, b) => a.order - b.order),
    [steps],
  );

  // Number of steps the learner has actively revealed.
  const [revealed, setRevealed] = useState(0);
  const { complete } = useProgress();

  // Mark the problem complete once the rigorous solution is revealed.
  const solutionIndex = ordered.findIndex((step) => step.type === "SOLUTION");
  useEffect(() => {
    if (solutionIndex >= 0 && revealed > solutionIndex) complete(slug);
  }, [revealed, solutionIndex, complete, slug]);

  // Fire onAllRevealed once when every step is open.
  useEffect(() => {
    if (ordered.length > 0 && revealed >= ordered.length) onAllRevealed?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, ordered.length]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            解説ステップ
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            必要なところから一段ずつ確認できます。
          </p>
        </div>
        <span className="text-sm font-medium text-slate-600" aria-live="polite">
          {Math.min(revealed, ordered.length)} / {ordered.length} ステップ
        </span>
      </div>

      <ol className="space-y-3">
        {ordered.map((step, index) => {
          const presentation = STEP_PRESENTATION[step.type];
          const isRevealed = index < revealed;
          const isActive = index === revealed;
          const isLocked = index > revealed;
          const isGuidance = step.type === "GUIDANCE_ANALYSIS";
          const stepId = `logic-step-${slug}-${step.order}`;

          const cardClassName = isGuidance
            ? "border-blue-200 bg-blue-50/70"
            : isRevealed
              ? "border-emerald-200 bg-white"
              : isActive
                ? "border-blue-300 bg-white"
                : "border-slate-200 bg-slate-50";

          const markerClassName = isGuidance
            ? "bg-blue-100 text-blue-700"
            : isRevealed
              ? "bg-emerald-100 text-emerald-700"
              : isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-200 text-slate-600";

          return (
            <li key={step.order}>
              <div className={`rounded-2xl border shadow-sm ${cardClassName}`}>
                <div className="flex items-start gap-3 p-4 sm:p-5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${markerClassName}`}
                    aria-hidden="true"
                  >
                    {isGuidance ? (
                      <Lightbulb className="h-5 w-5" />
                    ) : isRevealed ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-950">
                        {presentation.label}
                      </p>
                      {isGuidance && (
                        <span className="rounded-full border border-blue-200 bg-white px-2 py-0.5 text-xs font-semibold text-blue-800">
                          設問分析
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-sm">
                      {isLocked
                        ? "前のステップを確認すると、この解説を開けます"
                        : presentation.hint}
                    </p>
                  </div>

                  {isActive && (
                    <button
                      type="button"
                      onClick={() => setRevealed((current) => Math.max(current, index + 1))}
                      aria-controls={stepId}
                      aria-expanded="false"
                      className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-lg border border-blue-700 bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 sm:px-4"
                    >
                      <Unlock className="h-4 w-4" aria-hidden="true" />
                      解説を見る
                    </button>
                  )}
                  {isLocked && (
                    <Lock
                      className="mt-2 h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <AnimatePresence initial={false}>
                  {isRevealed && (
                    <motion.div
                      id={stepId}
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 border-t border-slate-200 px-4 pb-5 pt-4 sm:px-5">
                        {isGuidance && (
                          <div className="rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm font-semibold leading-6 text-blue-900">
                            出題意図の確認 — この誘導が設けられている理由
                          </div>
                        )}
                        <MathText className="text-sm font-medium leading-7 text-slate-900 sm:text-base">
                          {step.title}
                        </MathText>
                        <LessonRenderer content={step.body} />
                        {step.type === "EXPERIMENT" && labSlot}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      {revealed >= ordered.length && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          role="status"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-medium leading-6 text-emerald-950"
        >
          すべての解説ステップを確認しました。この問題を完了として記録しました。
        </motion.div>
      )}

      {relatedLesson && (
        <aside className="pt-2" aria-label="関連講座">
          <Link
            href={`/lessons/${relatedLesson.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
              aria-hidden="true"
            >
              <Lightbulb className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-blue-800">関連講座</span>
              <span className="mt-1 block font-semibold text-slate-950">
                {relatedLesson.title}
              </span>
            </span>
            <ArrowRight
              className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700"
              aria-hidden="true"
            />
          </Link>
        </aside>
      )}
    </div>
  );
}
