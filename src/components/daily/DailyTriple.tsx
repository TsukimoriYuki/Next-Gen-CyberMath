"use client";

import Link from "next/link";
import { Flame, CheckCircle2, Circle, CalendarDays } from "lucide-react";
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
  const { hydrated, streak, bestStreak, completedCount, isCompleted } =
    useProgress();

  const doneToday = problems.filter((p) => isCompleted(p.slug)).length;
  const allCleared = hydrated && problems.length > 0 && doneToday === problems.length;

  return (
    <section id="daily" className="scroll-mt-20">
      <div className="glass glow-magenta rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neon-magenta/90">
              <CalendarDays className="h-3.5 w-3.5" />
              My Challenge
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-wide">
              私からの挑戦
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{dateLabel}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <Stat
              icon={<Flame className="h-4 w-4 text-neon-amber" />}
              value={hydrated ? `${streak}` : "—"}
              label="連続日数"
            />
            <Stat
              icon={<CheckCircle2 className="h-4 w-4 text-neon-lime" />}
              value={hydrated ? `${doneToday}/${problems.length}` : "—"}
              label="本日の完了"
            />
            <Stat
              icon={<CheckCircle2 className="h-4 w-4 text-neon-cyan" />}
              value={hydrated ? `${completedCount}` : "—"}
              label="累計"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta transition-[width] duration-500"
            style={{
              width: hydrated
                ? `${(doneToday / Math.max(1, problems.length)) * 100}%`
                : "0%",
            }}
          />
        </div>

        {/* MISSION CLEARED — 3問すべて完了したときのガラスエフェクト */}
        {allCleared && (
          <div
            className="mt-6 flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-2xl border p-5"
            style={{
              borderColor: "color-mix(in oklch, var(--neon-lime) 50%, transparent)",
              background:
                "linear-gradient(135deg, color-mix(in oklch, var(--neon-lime) 14%, white), color-mix(in oklch, var(--neon-cyan) 10%, transparent))",
              boxShadow:
                "0 0 0 1px color-mix(in oklch, var(--neon-lime) 35%, transparent), 0 8px 28px color-mix(in oklch, var(--neon-lime) 16%, transparent)",
            }}
          >
            <div>
              <div className="font-display text-xl font-extrabold tracking-wide text-neon-lime">
                MISSION CLEARED
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">
                本日の挑戦を制覇しました。明日もこの調子で。
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-neon-amber/40 bg-neon-amber/5 px-4 py-2">
              <span className="animate-pulse text-2xl leading-none">🔥</span>
              <div className="leading-tight">
                <div className="font-display text-2xl font-extrabold tabular-nums text-neon-amber">
                  {streak}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  日連続
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {problems.map((p, i) => {
            const done = hydrated && isCompleted(p.slug);
            return (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className={cn(
                  "glass glass-hover group relative flex flex-col gap-3 rounded-2xl p-5",
                  done && "border-neon-lime/40",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    No.{i + 1}
                  </span>
                  {done ? (
                    <CheckCircle2 className="h-5 w-5 text-neon-lime" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/50" />
                  )}
                </div>
                <DifficultyBadge difficulty={p.difficulty} />
                <h3 className="font-display text-base font-semibold leading-snug">
                  {p.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {p.tagline}
                </p>
              </Link>
            );
          })}
        </div>

        {hydrated && bestStreak > 0 && (
          <p className="mt-4 text-right text-xs text-muted-foreground">
            自己最高の連続記録:{" "}
            <span className="font-mono text-neon-amber">{bestStreak}</span> 日
          </p>
        )}
      </div>
    </section>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border/60 bg-background/40 px-3 py-2">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="font-display text-lg font-bold tabular-nums">
          {value}
        </span>
      </div>
      <span className="mt-0.5 text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}
