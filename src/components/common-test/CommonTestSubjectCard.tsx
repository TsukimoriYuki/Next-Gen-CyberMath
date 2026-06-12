// Server Component — 科目アクセスボードカード
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";

export function CommonTestSubjectCard({ subject }: { subject: CommonTestSubject }) {
  const { theme, route, title, shortTitle, examMinutes, description, sections, estimatedScoreMock, targetScoreDefault } = subject;
  const pct = Math.min(100, Math.round((estimatedScoreMock / targetScoreDefault) * 100));

  return (
    <Link
      href={route}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
    >
      {/* Subject accent bar */}
      <span className="h-1 w-full" style={{ background: theme.primary }} />

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
              {sections.length}大問構成
            </div>
            <h2 className="mt-1 flex items-center gap-2 font-display text-2xl font-extrabold text-slate-900">
              <span className="inline-block h-3 w-3 rounded-full" style={{ background: theme.primary }} />
              {shortTitle}
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 ring-1 ring-slate-200">
            <Clock className="h-3 w-3" />
            {examMinutes}分
          </div>
        </div>

        {/* Description */}
        <p className="flex-1 text-xs leading-relaxed text-slate-500">
          {description.length > 80 ? description.slice(0, 80) + "…" : description}
        </p>

        {/* Score progress */}
        <div>
          <div className="mb-1 flex justify-between text-[10px]">
            <span className="text-slate-500">推定 {estimatedScoreMock} → 目標 {targetScoreDefault}点</span>
            <span className="font-bold" style={{ color: theme.primary }}>{pct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: theme.primary }} />
          </div>
        </div>

        {/* CTA */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-all duration-200 group-hover:gap-2.5">
          演習を始める
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}
