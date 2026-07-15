import Link from "next/link";
import { ArrowRight, BookOpen, Wrench } from "lucide-react";
import type { CommonTestMistakeStrategy } from "@/lib/common-test-diagnosis";

interface Props {
  strategies: CommonTestMistakeStrategy[];
  title?: string;
  compact?: boolean;
}

export function CommonTestMistakeStrategyCards({
  strategies,
  title = "ミス原因別の対策",
  compact = false,
}: Props) {
  if (strategies.length === 0) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4 text-blue-600" />
        <h3 className="text-sm font-extrabold text-slate-950">{title}</h3>
      </div>
      <div className={`mt-3 grid gap-2 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2"}`}>
        {strategies.map((strategy) => (
          <article
            key={strategy.tagId}
            className="rounded-xl border border-slate-200 bg-slate-50 p-3"
          >
            <div className="text-xs font-extrabold text-slate-900">{strategy.title}</div>
            <p className="mt-1 text-xs leading-5 text-slate-600">{strategy.action}</p>
            <div className="mt-3">
              {strategy.lectureHref ? (
                <Link
                  href={strategy.lectureHref}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {strategy.lectureLabel ?? "関連講義を見る"}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ) : (
                <span className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-500">
                  関連講義は無料教材を優先整備中
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
