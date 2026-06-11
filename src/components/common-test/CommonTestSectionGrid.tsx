// Server Component — 大問別ドリルパネルグリッド
import Link from "next/link";
import type { CommonTestSection, CommonTestTheme, CommonTestSubjectId } from "@/data/common-test";
import { Timer, ChevronRight } from "lucide-react";

interface Props {
  sections: CommonTestSection[];
  theme: CommonTestTheme;
  subjectId: CommonTestSubjectId;
}

export function CommonTestSectionGrid({ sections, theme, subjectId }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {sections.map((sec) => (
        <SectionCard key={sec.number} section={sec} theme={theme} subjectId={subjectId} />
      ))}
    </div>
  );
}

function SectionCard({
  section,
  theme,
  subjectId,
}: {
  section: CommonTestSection;
  theme: CommonTestTheme;
  subjectId: CommonTestSubjectId;
}) {
  const drillHref = `/common-test/${subjectId}/section-${section.number}`;

  return (
    <div
      className="relative flex flex-col gap-3 rounded-xl p-4 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, rgba(${theme.glowRgb},0.05) 0%, rgba(0,0,0,0.4) 100%)`,
        border: `1px solid rgba(${theme.glowRgb},0.16)`,
      }}
    >
      {/* Number + elective badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs font-bold"
            style={{ color: theme.primary }}
          >
            第{section.number}問
          </span>
          {section.isElective && (
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase"
              style={{
                background: "rgba(251,191,36,0.10)",
                border: "1px solid rgba(251,191,36,0.25)",
                color: "#fbbf24",
              }}
            >
              選択
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 font-mono text-[9px] text-white/30">
          <Timer className="h-3 w-3" />
          {section.recommendedMinutes}min
          <span className="ml-1 text-white/20">／</span>
          <span style={{ color: `rgba(${theme.glowRgb},0.7)` }}>{section.maxScore}点</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display text-sm font-bold text-white leading-snug">
        {section.title}
      </h3>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 flex-1">
        {section.topics.map((t) => (
          <span
            key={t}
            className="rounded px-1.5 py-0.5 font-mono text-[9px]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* DRILL START — now a real link */}
      <Link
        href={drillHref}
        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 hover:opacity-80"
        style={{
          background: `rgba(${theme.glowRgb},0.12)`,
          border: `1px solid rgba(${theme.glowRgb},0.35)`,
          color: theme.primary,
        }}
      >
        DRILL START
        <ChevronRight className="h-3.5 w-3.5 ml-auto" />
      </Link>
    </div>
  );
}
