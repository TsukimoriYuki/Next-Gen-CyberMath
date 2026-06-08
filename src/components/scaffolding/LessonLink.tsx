import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";

/**
 * Neon CTA shown at the end of a problem's explanation, guiding a stuck
 * learner to the related Concept Lesson.
 */
export function LessonLink({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  return (
    <Link
      href={`/lessons/${slug}`}
      className="glass glow-magenta group flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5"
    >
      <span className="glow-magenta flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neon-magenta/15 text-neon-magenta">
        <Lightbulb className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neon-magenta/80">
          さらに深く理解する
        </div>
        <div className="mt-0.5 truncate font-display font-semibold text-foreground">
          {title}
        </div>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-neon-magenta transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
