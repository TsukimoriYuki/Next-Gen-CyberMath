import { DIFFICULTY_META, type Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

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
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-xs font-semibold",
        meta.className,
        className,
      )}
    >
      <span className="font-display tracking-wider">{meta.label}</span>
      {withName && (
        <span className="text-[10px] font-normal opacity-80">{meta.name}</span>
      )}
    </span>
  );
}
