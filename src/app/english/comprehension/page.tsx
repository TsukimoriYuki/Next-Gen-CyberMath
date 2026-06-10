import React from "react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, AlignLeft, FileText } from "lucide-react";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";

export default function ComprehensionListPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Back */}
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER English
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            <AlignLeft className="h-3.5 w-3.5" />
            Comprehension
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background:
                "linear-gradient(135deg, #10b981 0%, #ffffff 55%, #facc15 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            精読長文
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            本文を手元に置きながら設問に取り組む精読モード。
            解答後は構文解析ビジュアライザで複文の SVOCM 構造を確認できる。
          </p>
        </header>

        {/* Problem list */}
        <div className="grid gap-5 sm:grid-cols-2">
          {COMPREHENSION_PROBLEMS.map((p) => {
            const meta = ENGLISH_LEVEL_META[p.level];
            return (
              <Link
                key={p.id}
                href={`/english/comprehension/${p.id}`}
                className="group relative block overflow-hidden rounded-2xl transition-all duration-300
                  hover:[border-color:color-mix(in_srgb,var(--card-accent)_40%,transparent)]
                  hover:[background:color-mix(in_srgb,var(--card-accent)_5%,transparent)]"
                style={{
                  "--card-accent": meta.accent,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                } as React.CSSProperties}
              >
                {/* Shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${meta.accent} 8%, transparent), transparent)`,
                  }}
                />

                <div className="relative p-6">
                  {/* Level badge + question count */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${meta.accent} 14%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${meta.accent} 40%, transparent)`,
                        color: meta.accent,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-white/30">
                      {p.questions.length}問 · Split Pane
                    </span>
                  </div>

                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `color-mix(in srgb, ${meta.accent} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${meta.accent} 28%, transparent)`,
                      }}
                    >
                      <FileText
                        className="h-6 w-6"
                        style={{ color: meta.accent }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-base font-bold leading-snug text-white">
                        {p.title}
                      </h2>
                      <p className="mt-1 font-mono text-xs text-white/35">
                        {p.tags.join(" · ")}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: meta.accent }}
                  >
                    精読する
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-12 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          More passages coming soon
        </p>
      </div>
    </div>
  );
}
