"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import { MathText } from "@/components/math/Math";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { LabRenderer } from "@/components/graph/LabRenderer";
import type { Problem } from "@/lib/types";

interface MissionData {
  id: string;
  problemSlug: string;
  comment: string;
  isCompleted: boolean;
}

interface Props {
  problem: Problem;
  mission: MissionData;
}

export function MissionViewer({ problem, mission }: Props) {
  const [commentVisible, setCommentVisible] = useState(mission.isCompleted);
  const [completed, setCompleted] = useState(mission.isCompleted);
  const [saveError, setSaveError] = useState(false);
  const completedRef = useRef(mission.isCompleted);

  const handleAllRevealed = useCallback(async () => {
    setCommentVisible(true);
    if (!completedRef.current) {
      try {
        const res = await fetch(`/api/mission/${mission.id}`, {
          method: "PATCH",
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        completedRef.current = true;
        setCompleted(true);
        setSaveError(false);
      } catch {
        setSaveError(true);
      }
    }
  }, [mission.id]);

  return (
    <div className="space-y-8">
      {/* Problem statement */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "oklch(0.15 0.04 265 / 0.85)",
          border: "1px solid oklch(0.55 0.1 215 / 0.25)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]"
          style={{ color: "oklch(0.65 0.15 215)" }}>
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: "oklch(0.65 0.15 215)" }} />
          問題
        </div>
        <div style={{ color: "oklch(0.88 0.02 240)" }}>
          <MathText className="text-[15px] leading-relaxed">
            {problem.statement}
          </MathText>
        </div>
      </div>

      {/* Logic steps */}
      <div
        className="rounded-2xl p-6"
        style={{
          background: "oklch(0.13 0.03 265 / 0.7)",
          border: "1px solid oklch(0.45 0.08 265 / 0.2)",
        }}
      >
        <LogicSteps
          slug={`ms-${mission.id.slice(0, 8)}`}
          steps={problem.steps}
          onAllRevealed={handleAllRevealed}
          labSlot={
            problem.hasGraph && problem.graphKey ? (
              <LabRenderer graphKey={problem.graphKey} />
            ) : undefined
          }
        />
      </div>

      {/* Mentor comment — fades in when all steps revealed */}
      <AnimatePresence>
        {commentVisible && (
          <motion.div
            key="mentor-comment"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl p-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.2 0.07 290 / 0.9), oklch(0.18 0.08 350 / 0.85))",
              border: "1px solid oklch(0.55 0.22 350 / 0.4)",
              boxShadow:
                "0 0 0 1px oklch(0.55 0.22 350 / 0.15), 0 12px 40px oklch(0.55 0.22 350 / 0.15)",
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "oklch(0.55 0.22 350 / 0.25)" }}
              >
                <ShieldCheck className="h-5 w-5" style={{ color: "oklch(0.75 0.18 350)" }} />
              </div>
              <div>
                <div className="font-display text-sm font-bold" style={{ color: "oklch(0.8 0.15 350)" }}>
                  師範からのコメント
                </div>
                <div className="font-mono text-xs" style={{ color: "oklch(0.65 0.08 290)" }}>
                  Mentor&apos;s Message
                </div>
              </div>
            </div>
            <blockquote
              className="border-l-2 pl-4 text-base leading-relaxed italic"
              style={{
                borderColor: "oklch(0.55 0.22 350 / 0.5)",
                color: "oklch(0.88 0.04 300)",
              }}
            >
              {mission.comment}
            </blockquote>
            {completed && (
              <div className="mt-5 flex items-center gap-2 font-mono text-xs"
                style={{ color: "oklch(0.7 0.15 150)" }}>
                <CheckCircle2 className="h-4 w-4" />
                ミッション完了 — 記録済み
              </div>
            )}
            {saveError && (
              <div className="mt-5 flex items-center gap-2 font-mono text-xs"
                style={{ color: "oklch(0.65 0.18 25)" }}>
                <AlertCircle className="h-4 w-4" />
                記録に失敗しました — 再度ステップを開いてください
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flame footer decoration */}
      <div className="flex items-center justify-center gap-2 pb-4 opacity-30">
        <Flame className="h-4 w-4" style={{ color: "oklch(0.65 0.2 350)" }} />
        <span className="font-mono text-xs uppercase tracking-[0.3em]"
          style={{ color: "oklch(0.65 0.2 350)" }}>
          Mission Complete
        </span>
        <Flame className="h-4 w-4" style={{ color: "oklch(0.65 0.2 350)" }} />
      </div>
    </div>
  );
}
