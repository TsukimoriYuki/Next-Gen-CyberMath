"use client";

import Link from "next/link";
import { CalendarDays, CheckCircle2, Circle, ListChecks } from "lucide-react";
import type { Problem } from "@/lib/types";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export function DailyTriple({
  problems,
  dateLabel,
}: {
  problems: Problem[];
  dateLabel: string;
}) {
  const { hydrated, streak, bestStreak, completedCount, isCompleted } = useProgress();
  const doneToday = problems.filter((problem) => isCompleted(problem.slug)).length;
  const allCompleted = hydrated && problems.length > 0 && doneToday === problems.length;

  return (
    <section id="daily" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            今日のおすすめ
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">今日の3問</h2>
          <p className="mt-1 text-sm text-slate-500">{dateLabel}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Stat value={hydrated ? `${doneToday}/${problems.length}` : "—"} label="本日の完了" />
          <Stat value={hydrated ? `${streak}日` : "—"} label="連続記録" />
          <Stat value={hydrated ? `${completedCount}問` : "—"} label="累計" />
        </div>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-500"
          style={{ width: hydrated ? `${(doneToday / Math.max(1, problems.length)) * 100}%` : "0%" }}
        />
      </div>

      {allCompleted && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
          <ListChecks className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-bold">本日の3問を完了しました</p>
            <p className="mt-1 text-sm leading-6 text-emerald-800">解き直したい問題は、復習キューからもう一度確認できます。</p>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {problems.map((problem, index) => {
          const completed = hydrated && isCompleted(problem.slug);
          return (
            <Link
              key={problem.slug}
              href={`/problems/${problem.slug}`}
              className={cn(
                "group flex min-w-0 flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                completed && "border-emerald-300 bg-emerald-50/40",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">問題 {index + 1}</span>
                {completed ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" aria-label="完了" />
                ) : (
                  <Circle className="h-5 w-5 text-slate-300" aria-hidden="true" />
                )}
              </div>
              <DifficultyBadge difficulty={problem.difficulty} />
              <h3 className="text-base font-bold leading-snug text-slate-950">{problem.title}</h3>
              {problem.tagline && <p className="text-sm leading-6 text-slate-600">{problem.tagline}</p>}
            </Link>
          );
        })}
      </div>

      {hydrated && bestStreak > 0 && (
        <p className="mt-4 text-right text-xs text-slate-500">自己最高の連続記録: {bestStreak}日</p>
      )}
    </section>
  );
}
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
      <div className="text-base font-bold tabular-nums text-slate-950">{value}</div>
      <div className="mt-0.5 text-xs text-slate-500">{label}</div>
    </div>
  );
}
