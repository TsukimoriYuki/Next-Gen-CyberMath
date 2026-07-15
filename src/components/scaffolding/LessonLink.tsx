import Link from "next/link";
import { Lightbulb, ArrowRight } from "lucide-react";

/** Guides a learner from a problem explanation back to its related lesson. */
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
      className="group flex min-h-11 items-center gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm transition-colors hover:border-blue-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
        <Lightbulb className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-blue-700">
          関連講座
        </div>
        <div className="mt-0.5 truncate font-semibold text-slate-950">
          {title}
        </div>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-blue-700 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
