"use client";

import { useState, useCallback, useRef } from "react";
import { ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
import type {
  SpeedReadingProblem,
  ComprehensionProblem,
  MultiSourceProblem,
} from "@/lib/english-types";
import { SpeedReadingGame } from "@/components/english/SpeedReadingGame";
import { ComprehensionViewer } from "@/components/english/ComprehensionViewer";
import { MultiSourceViewer } from "@/components/english/MultiSourceViewer";

type EnglishMode = "speed-reading" | "comprehension" | "multi-source";

interface Props {
  mode: EnglishMode;
  problem: SpeedReadingProblem | ComprehensionProblem | MultiSourceProblem;
  mission: {
    id: string;
    comment: string;
    isCompleted: boolean;
  };
}

export function EnglishMissionViewer({ mode, problem, mission }: Props) {
  const [completed, setCompleted] = useState(mission.isCompleted);
  const [saveError, setSaveError] = useState(false);
  const completedRef = useRef(mission.isCompleted);

  const handleComplete = useCallback(async () => {
    if (completedRef.current) return;
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
  }, [mission.id]);

  return (
    <div className="space-y-8">
      {/* English problem viewer */}
      <div>
        {mode === "speed-reading" && (
          <SpeedReadingGame problem={problem as SpeedReadingProblem} />
        )}
        {mode === "comprehension" && (
          <ComprehensionViewer problem={problem as ComprehensionProblem} />
        )}
        {mode === "multi-source" && (
          <MultiSourceViewer problem={problem as MultiSourceProblem} />
        )}
      </div>

      {/* Mentor comment */}
      <div
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
            <ShieldCheck
              className="h-5 w-5"
              style={{ color: "oklch(0.75 0.18 350)" }}
            />
          </div>
          <div>
            <div
              className="font-display text-sm font-bold"
              style={{ color: "oklch(0.8 0.15 350)" }}
            >
              師範からのコメント
            </div>
            <div
              className="font-mono text-xs"
              style={{ color: "oklch(0.65 0.08 290)" }}
            >
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

        <div className="mt-5">
          {completed ? (
            <div
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: "oklch(0.7 0.15 150)" }}
            >
              <CheckCircle2 className="h-4 w-4" />
              ミッション完了 — 記録済み
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-xs font-semibold transition-all hover:brightness-110"
              style={{
                background: "oklch(0.55 0.22 350 / 0.2)",
                border: "1px solid oklch(0.55 0.22 350 / 0.45)",
                color: "oklch(0.8 0.15 350)",
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              ミッション完了とする
            </button>
          )}
          {saveError && (
            <div
              className="mt-2 flex items-center gap-2 font-mono text-xs"
              style={{ color: "oklch(0.65 0.18 25)" }}
            >
              <AlertCircle className="h-4 w-4" />
              記録に失敗しました — もう一度お試しください
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
