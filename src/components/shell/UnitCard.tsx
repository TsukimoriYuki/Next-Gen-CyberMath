import Link from "next/link";
import { ArrowUpRight, BookOpen, FlaskConical } from "lucide-react";
import { DIFFICULTY_META } from "@/lib/types";
import type { UnitSummary } from "@/lib/content";

export function UnitCard({ unit }: { unit: UnitSummary }) {
  return (
    <Link
      href={`/units/${unit.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-offset-4"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold leading-snug text-slate-950">
          {unit.name}
        </h3>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-blue-700" aria-hidden="true" />
      </div>

      {unit.description && (
        <p className="text-sm leading-6 text-slate-600">
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
              className="rounded-full border px-2 py-0.5 text-xs font-semibold"
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

      <div className="mt-auto flex items-center gap-4 pt-1 text-sm text-slate-600">
        <span className="inline-flex items-center gap-1">
          <FlaskConical className="h-4 w-4 text-blue-700" aria-hidden="true" />
          {unit.problemCount} 問
        </span>
        {unit.lessonCount > 0 && (
          <span className="inline-flex items-center gap-1 text-violet-700">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            講座 {unit.lessonCount}
          </span>
        )}
      </div>

    </Link>
  );
}
