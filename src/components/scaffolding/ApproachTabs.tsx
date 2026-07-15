"use client";

import { useId, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Approach } from "@/lib/types";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";

/**
 * 1 問に複数の解法がある場合にタブ切替で表示するコンポーネント。
 * 道場ページの解説エリアで使用。approaches が空の場合は何も描画しない。
 */
export function ApproachTabs({ approaches }: { approaches: Approach[] }) {
  const [active, setActive] = useState(approaches[0]?.id ?? "");
  const idPrefix = useId();
  if (approaches.length === 0) return null;

  const current = approaches.find((a) => a.id === active) ?? approaches[0];

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const keyOffset = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    const targetIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? approaches.length - 1
          : keyOffset
            ? (index + keyOffset + approaches.length) % approaches.length
            : null;
    if (targetIndex === null) return;
    event.preventDefault();
    const target = approaches[targetIndex];
    setActive(target.id);
    document.getElementById(`${idPrefix}-tab-${target.id}`)?.focus();
  }

  return (
    <div className="mt-4 space-y-3">
      {/* タブバー */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="解法を選ぶ">
        {approaches.map((a, index) => {
          const isActive = a.id === active;
          return (
            <button
              key={a.id}
              id={`${idPrefix}-tab-${a.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${idPrefix}-panel-${a.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(a.id)}
              onKeyDown={(event) => selectFromKeyboard(event, index)}
              className={`min-h-11 rounded-lg border px-4 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"
              }`}
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
          id={`${idPrefix}-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${current.id}`}
          tabIndex={0}
          className="rounded-xl border border-slate-200 bg-white p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {current.tagline && (
            <p className="mb-2 text-xs italic leading-5 text-slate-600">
              — {current.tagline}
            </p>
          )}
          <LessonRenderer content={current.body} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
