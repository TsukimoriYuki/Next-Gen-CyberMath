// Server Component — 科目アクセスボードカード
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";

export function CommonTestSubjectCard({ subject }: { subject: CommonTestSubject }) {
  const { theme, route, title, shortTitle, examMinutes, description, sections, estimatedScoreMock, targetScoreDefault } = subject;
  const pct = Math.min(100, Math.round((estimatedScoreMock / targetScoreDefault) * 100));

  return (
    <Link
      href={route}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: `linear-gradient(145deg, rgba(${theme.glowRgb},0.07) 0%, rgba(0,0,0,0.55) 100%)`,
        border: `1px solid rgba(${theme.glowRgb},0.20)`,
      }}
    >
      {/* Shimmer */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
        style={{ background: `linear-gradient(90deg, transparent, rgba(${theme.glowRgb},0.09), transparent)` }}
      />

      <div className="relative flex flex-col gap-3 p-5 flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/35">
              {sections.length}大問構成
            </div>
            <h2
              className="mt-0.5 font-display text-2xl font-extrabold"
              style={{ color: theme.primary, textShadow: `0 0 18px rgba(${theme.glowRgb},0.5)` }}
            >
              {shortTitle}
            </h2>
          </div>
          <div
            className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-[10px] shrink-0"
            style={{
              background: `rgba(${theme.glowRgb},0.10)`,
              border: `1px solid rgba(${theme.glowRgb},0.25)`,
              color: theme.primary,
            }}
          >
            <Clock className="h-3 w-3" />
            {examMinutes}min
          </div>
        </div>

        {/* Description */}
        <p className="font-mono text-[10px] leading-relaxed text-white/45 flex-1">
          {description.length > 80 ? description.slice(0, 80) + "…" : description}
        </p>

        {/* Score progress */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-[9px] text-white/35">推定 {estimatedScoreMock} → 目標 {targetScoreDefault}点</span>
            <span className="font-mono text-[9px]" style={{ color: theme.primary }}>{pct}%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${pct}%`,
                background: `rgba(${theme.glowRgb},0.85)`,
                boxShadow: `0 0 6px rgba(${theme.glowRgb},0.6)`,
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <div
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold transition-all duration-200 group-hover:gap-2.5"
          style={{ color: theme.primary }}
        >
          SIMULATION READY
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}
