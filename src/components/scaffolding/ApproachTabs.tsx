"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Approach } from "@/lib/types";
import { MathText } from "@/components/math/Math";

/**
 * 1 問に複数の解法がある場合にタブ切替で表示するコンポーネント。
 * 道場ページの解説エリアで使用。approaches が空の場合は何も描画しない。
 */
export function ApproachTabs({ approaches }: { approaches: Approach[] }) {
  const [active, setActive] = useState(approaches[0]?.id ?? "");
  if (approaches.length === 0) return null;

  const current = approaches.find((a) => a.id === active) ?? approaches[0];

  return (
    <div className="mt-4 space-y-3">
      {/* タブバー */}
      <div className="flex flex-wrap gap-2">
        {approaches.map((a) => {
          const isActive = a.id === active;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setActive(a.id)}
              className="rounded-lg border px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
              style={{
                color: isActive ? "var(--neon-violet)" : "var(--muted-foreground)",
                borderColor: isActive
                  ? "color-mix(in oklch, var(--neon-violet) 55%, transparent)"
                  : "var(--border)",
                background: isActive
                  ? "color-mix(in oklch, var(--neon-violet) 10%, transparent)"
                  : "transparent",
              }}
            >
              {a.label}
            </button>
          );
        })}
      </div>

      {/* 解法内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-neon-violet/20 bg-white/60 p-4 backdrop-blur-sm"
        >
          {current.tagline && (
            <p className="mb-2 text-[11px] italic text-muted-foreground">
              — {current.tagline}
            </p>
          )}
          <MathText className="text-sm text-foreground/85">{current.body}</MathText>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
