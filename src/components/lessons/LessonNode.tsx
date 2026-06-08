import Link from "next/link";
import { ArrowUpRight, Crown } from "lucide-react";
import type { Lesson } from "@/lib/types";
import { TagList } from "@/components/shell/TagChip";

/**
 * A skill-tree node (lesson card) for the white Light Cyber theme. `accent` is a
 * CSS color; `elite` switches on the "難問対策" styling — expressed by a gold
 * border, subtle shadow and an ELITE badge. The title is always high-contrast
 * slate so it stays readable on the white background.
 */
const ELITE_GOLD = "#b45309"; // amber-700: 白背景でも読める金

export function LessonNode({
  lesson,
  accent = "var(--neon-cyan)",
  elite = false,
}: {
  lesson: Lesson;
  accent?: string;
  elite?: boolean;
}) {
  const ac = elite ? ELITE_GOLD : accent;
  return (
    <Link
      href={`/lessons/${lesson.slug}`}
      className="glass glass-hover group relative flex flex-col gap-2 rounded-2xl p-5"
      style={{
        borderColor: `color-mix(in oklch, ${ac} ${elite ? 55 : 40}%, transparent)`,
        background: elite
          ? "linear-gradient(135deg, color-mix(in oklch, #f59e0b 12%, white), oklch(1 0 0 / 0.7))"
          : undefined,
        boxShadow: elite
          ? "0 0 0 1px color-mix(in oklch, #d97706 40%, transparent), 0 6px 22px color-mix(in oklch, #b45309 18%, transparent)"
          : undefined,
      }}
    >
      {/* node dot */}
      <span
        className="absolute -left-[7px] top-7 h-3 w-3 rounded-full"
        style={{ background: ac, boxShadow: `0 0 10px ${ac}` }}
      />
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-base font-bold leading-snug text-slate-800">
          {lesson.title}
        </h3>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5"
          style={{ color: ac }}
        />
      </div>

      {elite && (
        <span
          className="inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{
            color: ELITE_GOLD,
            borderColor: `color-mix(in oklch, ${ELITE_GOLD} 45%, transparent)`,
            background: `color-mix(in oklch, ${ELITE_GOLD} 10%, transparent)`,
          }}
        >
          <Crown className="h-3 w-3" />
          ELITE · 難問対策
        </span>
      )}

      {lesson.summary && (
        <p className="text-xs leading-relaxed text-muted-foreground">{lesson.summary}</p>
      )}
      <TagList tags={lesson.tags} className="mt-auto flex flex-wrap gap-1" />
    </Link>
  );
}
