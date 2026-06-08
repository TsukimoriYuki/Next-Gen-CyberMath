import Link from "next/link";
import { ArrowUpRight, BookOpen, FlaskConical } from "lucide-react";
import { DIFFICULTY_META } from "@/lib/types";
import type { UnitSummary } from "@/lib/content";

export function UnitCard({ unit }: { unit: UnitSummary }) {
  return (
    <Link
      href={`/units/${unit.slug}`}
      className="glass glass-hover group relative flex flex-col gap-3 rounded-2xl p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold leading-snug tracking-wide text-foreground">
          {unit.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-neon-cyan" />
      </div>

      {unit.description && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {unit.description}
        </p>
      )}

      {/* difficulty chips */}
      <div className="flex flex-wrap gap-1.5">
        {unit.difficulties.map((d) => {
          const meta = DIFFICULTY_META[d];
          return (
            <span
              key={d}
              className="rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold"
              style={{
                color: meta.accent,
                borderColor: `color-mix(in oklch, ${meta.accent} 40%, transparent)`,
              }}
            >
              {meta.label}
            </span>
          );
        })}
      </div>

      <div className="mt-auto flex items-center gap-4 pt-1 text-[11px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <FlaskConical className="h-3 w-3 text-neon-cyan/80" />
          {unit.problemCount} 問
        </span>
        {unit.lessonCount > 0 && (
          <span className="inline-flex items-center gap-1 text-neon-magenta/80">
            <BookOpen className="h-3 w-3" />
            授業 {unit.lessonCount}
          </span>
        )}
      </div>

      <span className="pointer-events-none absolute inset-x-6 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-neon-cyan to-transparent transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
