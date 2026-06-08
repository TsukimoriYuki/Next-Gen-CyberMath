"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Lock, Unlock, Check } from "lucide-react";
import type { ExplanationStep } from "@/lib/types";
import { STEP_META } from "@/lib/types";
import { MathText } from "@/components/math/Math";
import { LessonLink } from "@/components/scaffolding/LessonLink";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export function LogicSteps({
  slug,
  steps,
  labSlot,
  relatedLesson,
}: {
  slug: string;
  steps: ExplanationStep[];
  /** Injected into the EXPERIMENT step (the interactive lab). */
  labSlot?: ReactNode;
  /** 関連授業への誘導 (解説末尾の CTA)。 */
  relatedLesson?: { slug: string; title: string };
}) {
  const ordered = useMemo(
    () => [...steps].sort((a, b) => a.order - b.order),
    [steps],
  );

  // Number of steps the learner has actively revealed.
  const [revealed, setRevealed] = useState(0);
  const { complete } = useProgress();

  // Mark the problem complete once the rigorous solution is revealed.
  const solutionIndex = ordered.findIndex((s) => s.type === "SOLUTION");
  useEffect(() => {
    if (solutionIndex >= 0 && revealed > solutionIndex) complete(slug);
  }, [revealed, solutionIndex, complete, slug]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold tracking-wide">
          段階的論理開示
        </h2>
        <span className="font-mono text-xs text-muted-foreground">
          {Math.min(revealed, ordered.length)} / {ordered.length} 開示
        </span>
      </div>

      <ol className="space-y-3">
        {ordered.map((step, i) => {
          const meta = STEP_META[step.type];
          const isRevealed = i < revealed;
          const isActive = i === revealed;
          const isLocked = i > revealed;

          return (
            <li key={step.order}>
              <div
                className={cn(
                  "glass rounded-2xl transition-shadow",
                  isRevealed && "glow-cyan/0",
                )}
                style={
                  isRevealed
                    ? {
                        borderColor: `color-mix(in oklch, ${meta.accent} 40%, transparent)`,
                      }
                    : undefined
                }
              >
                {/* Header */}
                <div className="flex items-center gap-3 p-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold"
                    style={{
                      color: meta.accent,
                      background: `color-mix(in oklch, ${meta.accent} 14%, transparent)`,
                      boxShadow: isRevealed
                        ? `0 0 18px color-mix(in oklch, ${meta.accent} 30%, transparent)`
                        : undefined,
                    }}
                  >
                    {isRevealed ? <Check className="h-4 w-4" /> : i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div
                      className="font-display text-sm font-semibold tracking-wide"
                      style={{ color: meta.accent }}
                    >
                      {meta.label}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {isLocked ? "前のステップを開くと解放されます" : meta.hint}
                    </div>
                  </div>

                  {isActive && (
                    <button
                      type="button"
                      onClick={() => setRevealed((r) => Math.max(r, i + 1))}
                      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors"
                      style={{
                        color: meta.accent,
                        borderColor: `color-mix(in oklch, ${meta.accent} 50%, transparent)`,
                        background: `color-mix(in oklch, ${meta.accent} 10%, transparent)`,
                      }}
                    >
                      <Unlock className="h-3.5 w-3.5" />
                      開く
                    </button>
                  )}
                  {isLocked && (
                    <Lock className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  )}
                </div>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {isRevealed && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 px-4 pb-5">
                        <MathText className="text-sm font-medium text-foreground/90">
                          {step.title}
                        </MathText>
                        <MathText className="text-sm text-foreground/85">
                          {step.body}
                        </MathText>
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
          className="glass glow-magenta rounded-2xl p-4 text-center text-sm text-foreground/90"
        >
          すべてのステップを開きました。論理は閉じています。{" "}
          <span className="text-neon-magenta">この問題を完了に記録しました。</span>
        </motion.div>
      )}

      {/* 関連授業への誘導（躓いたユーザー向け。常時表示） */}
      {relatedLesson && (
        <div className="pt-2">
          <LessonLink slug={relatedLesson.slug} title={relatedLesson.title} />
        </div>
      )}
    </div>
  );
}
