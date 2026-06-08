"use client";

import { Zap } from "lucide-react";
import { PRESETS, type Preset } from "@/lib/exam-taxonomy";

interface Props {
  onApply: (preset: Preset) => void;
}

/** 要件A: ワンクリックで対象タグ/難易度を一括設定するプリセット群。 */
export function PresetBar({ onApply }: Props) {
  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold tracking-wide">
        <Zap className="h-4 w-4 text-neon-cyan" />
        クイックプリセット
      </h2>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => {
          const clear = preset.clear;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApply(preset)}
              className="rounded-full border px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
              style={{
                color: clear ? "var(--muted-foreground)" : "var(--neon-cyan)",
                borderColor: clear
                  ? "var(--border)"
                  : "color-mix(in oklch, var(--neon-cyan) 45%, transparent)",
                background: clear
                  ? "transparent"
                  : "color-mix(in oklch, var(--neon-cyan) 8%, transparent)",
              }}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
