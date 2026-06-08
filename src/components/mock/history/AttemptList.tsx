"use client";

import { useState } from "react";
import Link from "next/link";
import { History, ChevronDown, Sparkles, X, ArrowUpRight } from "lucide-react";
import { DIFFICULTY_ORDER, DIFFICULTY_META, type Difficulty } from "@/lib/types";
import { getProblem } from "@/lib/content";
import {
  formatDate,
  formatDuration,
  mockOnlyProblemsOf,
  wrongProblemsOf,
} from "@/lib/history";
import type { StoredAttempt } from "@/lib/exam";

interface Props {
  attempts: StoredAttempt[];
}

/** 出題問題を難易度別に数える。 */
function difficultyMix(slugs: string[]): Partial<Record<Difficulty, number>> {
  const m: Partial<Record<Difficulty, number>> = {};
  for (const slug of slugs) {
    const d = getProblem(slug)?.difficulty;
    if (!d) continue;
    m[d] = (m[d] ?? 0) + 1;
  }
  return m;
}

export function AttemptList({ attempts }: Props) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="glass rounded-2xl p-5">
      <h2 className="mb-1 flex items-center gap-2 font-display text-sm font-bold tracking-wide">
        <History className="h-4 w-4 text-neon-cyan" />
        模試の履歴
      </h2>
      <p className="mb-3 text-xs text-muted-foreground">
        行をクリックすると、その回の「初見問題」や誤答を復習できます。
      </p>

      {attempts.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">履歴がありません。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                <th className="py-2 pr-3 font-medium">日付</th>
                <th className="py-2 pr-3 font-medium">スコア</th>
                <th className="py-2 pr-3 font-medium">難易度構成</th>
                <th className="py-2 pr-3 text-right font-medium">所要時間</th>
                <th className="w-6 py-2" />
              </tr>
            </thead>
            <tbody>
              {attempts.map((a) => {
                const pct = a.totalCount > 0 ? Math.round((a.score / a.totalCount) * 100) : 0;
                const mix = difficultyMix(a.problemSlugs);
                const mockOnly = mockOnlyProblemsOf(a);
                const wrong = wrongProblemsOf(a);
                const isOpen = open === a.id;
                return (
                  <Row
                    key={a.id}
                    open={isOpen}
                    onToggle={() => setOpen(isOpen ? null : a.id)}
                    date={formatDate(a.createdAt)}
                    score={a.score}
                    total={a.totalCount}
                    pct={pct}
                    mix={mix}
                    duration={formatDuration(a.durationSec)}
                    mockCount={mockOnly.length}
                  >
                    <ReviewPanel mockOnly={mockOnly} wrong={wrong} />
                  </Row>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function Row({
  open,
  onToggle,
  date,
  score,
  total,
  pct,
  mix,
  duration,
  mockCount,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  date: string;
  score: number;
  total: number;
  pct: number;
  mix: Partial<Record<Difficulty, number>>;
  duration: string;
  mockCount: number;
  children: React.ReactNode;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-b border-border/40 transition-colors hover:bg-secondary/40"
      >
        <td className="py-2.5 pr-3 font-mono text-xs text-muted-foreground">{date}</td>
        <td className="py-2.5 pr-3">
          <span className="font-display font-bold text-neon-lime">{score}</span>
          <span className="text-muted-foreground">/{total}</span>
          <span className="ml-1.5 font-mono text-xs text-neon-cyan">({pct}%)</span>
        </td>
        <td className="py-2.5 pr-3">
          <span className="flex flex-wrap items-center gap-1">
            {DIFFICULTY_ORDER.filter((d) => mix[d]).map((d) => {
              const meta = DIFFICULTY_META[d];
              return (
                <span
                  key={d}
                  className="inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 font-mono text-[10px]"
                  style={{
                    color: meta.accent,
                    borderColor: `color-mix(in oklch, ${meta.accent} 40%, transparent)`,
                  }}
                >
                  {meta.label}
                  <span className="opacity-70">×{mix[d]}</span>
                </span>
              );
            })}
            {mockCount > 0 && (
              <span className="inline-flex items-center gap-0.5 rounded border border-neon-magenta/40 bg-neon-magenta/5 px-1.5 py-0.5 font-mono text-[10px] text-neon-magenta">
                <Sparkles className="h-2.5 w-2.5" />
                初見×{mockCount}
              </span>
            )}
          </span>
        </td>
        <td className="py-2.5 pr-3 text-right font-mono text-xs text-muted-foreground">
          {duration}
        </td>
        <td className="py-2.5 text-right">
          <ChevronDown
            className="ml-auto h-4 w-4 text-muted-foreground transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          />
        </td>
      </tr>
      {open && (
        <tr className="border-b border-border/40">
          <td colSpan={5} className="px-1 pb-4 pt-1">
            {children}
          </td>
        </tr>
      )}
    </>
  );
}

function ReviewPanel({
  mockOnly,
  wrong,
}: {
  mockOnly: { slug: string; title: string; difficulty: Difficulty }[];
  wrong: { slug: string; title: string; difficulty: Difficulty }[];
}) {
  return (
    <div className="space-y-3 rounded-xl border border-border/50 bg-secondary/30 p-3">
      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-neon-magenta">
          <Sparkles className="h-3.5 w-3.5" />
          初見問題（この履歴からのみ復習できます）
        </div>
        {mockOnly.length === 0 ? (
          <p className="text-xs text-muted-foreground">この回に初見問題はありませんでした。</p>
        ) : (
          <div className="grid gap-1.5 sm:grid-cols-2">
            {mockOnly.map((p) => (
              <ReviewLink key={p.slug} slug={p.slug} title={p.title} difficulty={p.difficulty} />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
          <X className="h-3.5 w-3.5" />
          間違えた問題
        </div>
        {wrong.length === 0 ? (
          <p className="text-xs text-muted-foreground">誤答はありません（全問正解）。</p>
        ) : (
          <div className="grid gap-1.5 sm:grid-cols-2">
            {wrong.map((p) => (
              <ReviewLink key={p.slug} slug={p.slug} title={p.title} difficulty={p.difficulty} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewLink({
  slug,
  title,
  difficulty,
}: {
  slug: string;
  title: string;
  difficulty: Difficulty;
}) {
  const meta = DIFFICULTY_META[difficulty];
  return (
    <Link
      href={`/problems/${slug}`}
      className="glass glass-hover group flex items-center justify-between gap-2 rounded-lg p-2.5"
    >
      <span className="flex items-center gap-2 truncate">
        <span
          className="shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-bold"
          style={{
            color: meta.accent,
            background: `color-mix(in oklch, ${meta.accent} 12%, transparent)`,
          }}
        >
          {meta.label}
        </span>
        <span className="truncate text-xs text-foreground">{title}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
