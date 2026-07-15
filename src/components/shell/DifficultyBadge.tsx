import { DIFFICULTY_META, type Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

const BADGE_STYLES: Record<Difficulty, string> = {
  A: "border-emerald-200 bg-emerald-50 text-emerald-800",
  B: "border-blue-200 bg-blue-50 text-blue-800",
  C: "border-violet-200 bg-violet-50 text-violet-800",
  D: "border-amber-200 bg-amber-50 text-amber-800",
  D_PLUS: "border-orange-200 bg-orange-50 text-orange-800",
  EX: "border-rose-200 bg-rose-50 text-rose-800",
  OLYMPIAD: "border-slate-300 bg-slate-100 text-slate-800",
};

export function DifficultyBadge({
  difficulty,
  withName = false,
  className,
}: {
  difficulty: Difficulty;
  withName?: boolean;
  className?: string;
}) {
  const meta = DIFFICULTY_META[difficulty];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        BADGE_STYLES[difficulty],
        className,
      )}
    >
      <span>{meta.label}</span>
      {withName && (
        <span className="text-xs font-medium">{meta.name}</span>
      )}
    </span>
  );
}
