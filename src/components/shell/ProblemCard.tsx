import Link from "next/link";
import { ArrowUpRight, FlaskConical } from "lucide-react";
import type { Problem } from "@/lib/types";
import { DifficultyBadge } from "./DifficultyBadge";

export function ProblemCard({ problem }: { problem: Problem }) {
  return (
    <Link
      href={`/problems/${problem.slug}`}
      className="glass glass-hover group relative flex flex-col gap-3 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <DifficultyBadge difficulty={problem.difficulty} withName />
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-neon-cyan" />
      </div>

      <h3 className="font-display text-base font-semibold leading-snug text-foreground">
        {problem.title}
      </h3>

      {problem.tagline && (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {problem.tagline}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 pt-1 text-[11px] text-muted-foreground">
        <span className="font-mono uppercase tracking-wider">
          {problem.unit}
        </span>
        {problem.hasGraph && (
          <span className="inline-flex items-center gap-1 text-neon-cyan/80">
            <FlaskConical className="h-3 w-3" />
            Lab
          </span>
        )}
      </div>

      <span className="pointer-events-none absolute inset-x-5 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent via-neon-cyan to-transparent transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
