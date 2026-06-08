"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import katex from "katex";
import { getWhyNote } from "@/data/why";

/**
 * 解説本文中の @@why:<key>|<label>@@ トークンをレンダリングするコンポーネント。
 * label にアンダーラインを付け、ホバー or タップでポップオーバーを表示する。
 * ポップオーバー本文は軽量 KaTeX レンダラーで $...$ をインライン描画。
 */
export function WhyPopover({ noteKey, label }: { noteKey: string; label: string }) {
  const note = getWhyNote(noteKey);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!note) return <span className="text-neon-cyan">{label}</span>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-neon-cyan/70 text-neon-cyan transition-colors hover:border-neon-cyan"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`「${label}」の定義を見る`}
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="why-popup"
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-1/2 z-50 mb-2 w-72 max-w-[92vw] -translate-x-1/2"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div
              className="rounded-xl border border-neon-cyan/30 bg-white/95 p-3 text-xs shadow-lg backdrop-blur-md"
              style={{
                boxShadow:
                  "0 4px 20px oklch(0.58 0.13 215 / 0.12), 0 0 0 1px oklch(0.58 0.13 215 / 0.15)",
              }}
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-cyan" />
                <span className="font-display text-[11px] font-bold uppercase tracking-wider text-neon-cyan">
                  {note.title}
                </span>
              </div>
              <WhyBody text={note.body} />
            </div>
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/** ポップオーバー専用の軽量 KaTeX テキストレンダラー（$...$ のみ対応）。 */
function WhyBody({ text }: { text: string }) {
  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <div className="space-y-1.5 leading-relaxed text-foreground/80">
      {parts.map((part, i) => {
        if (part.startsWith("$") && part.endsWith("$") && part.length > 2) {
          return (
            <span
              key={i}
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(part.slice(1, -1), {
                  displayMode: false,
                  throwOnError: false,
                  strict: false,
                  output: "html",
                }),
              }}
            />
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}
