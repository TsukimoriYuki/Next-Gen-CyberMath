import Link from "next/link";
import { ArrowRight, Clock, Target } from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";

export function CommonTestSubjectCard({ subject }: { subject: CommonTestSubject }) {
  const { theme, route, title, examMinutes, sections, targetScoreDefault, description } = subject;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200">
      <span className="h-1 w-full" style={{ background: theme.primary }} aria-hidden="true" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-500">{sections.length}大問構成</p>
            <h3 className="mt-1 text-xl font-bold text-slate-950">{title}</h3>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {examMinutes}分
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 p-3">
          <Target className="h-4 w-4 text-blue-700" aria-hidden="true" />
          <span className="text-sm font-semibold text-slate-700">標準目標 {targetScoreDefault}点</span>
        </div>

        <Link
          href={route}
          className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {title}の対策を開く
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
