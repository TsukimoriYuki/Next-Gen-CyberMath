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

  if (!note) return <span className="font-semibold text-slate-800">{label}</span>;

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        className="cursor-help rounded-sm border-b border-dotted border-blue-500 font-semibold text-blue-700 transition-colors hover:border-blue-800 hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
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
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-lg">
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-600" />
                <span className="text-xs font-bold text-blue-800">
                  {note.title}
                </span>
              </div>
              <WhyBody text={note.body} />
            </div>
            <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white" />
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
    <div className="space-y-1.5 leading-6 text-slate-700">
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
