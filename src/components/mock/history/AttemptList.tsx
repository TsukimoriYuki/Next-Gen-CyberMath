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
  headingLevel?: 2 | 3 | 4;
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

export function AttemptList({ attempts, headingLevel = 2 }: Props) {
  const [open, setOpen] = useState<string | null>(null);
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Heading className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-950">
        <History className="h-5 w-5 text-blue-700" />
        模試の履歴
      </Heading>
      <p className="mb-3 text-sm text-slate-600">
        各行の詳細ボタンから、その回の初見問題や誤答を復習できます。
      </p>

      {attempts.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">履歴がありません。</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-sm text-slate-600">
                <th className="py-2 pr-3 font-medium">日付</th>
                <th className="py-2 pr-3 font-medium">スコア</th>
                <th className="py-2 pr-3 font-medium">難易度構成</th>
                <th className="py-2 pr-3 text-right font-medium">所要時間</th>
                <th className="w-12 py-2"><span className="sr-only">詳細</span></th>
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
                    id={a.id}
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
  id,
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
  id: string;
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
      <tr className="border-b border-slate-200 transition-colors hover:bg-slate-50">
        <td className="py-2.5 pr-3 text-sm text-slate-600">{date}</td>
        <td className="py-2.5 pr-3">
          <span className="font-bold text-emerald-700">{score}</span>
          <span className="text-slate-600">/{total}</span>
          <span className="ml-1.5 text-sm font-semibold text-blue-700">({pct}%)</span>
        </td>
        <td className="py-2.5 pr-3">
          <span className="flex flex-wrap items-center gap-1">
            {DIFFICULTY_ORDER.filter((d) => mix[d]).map((d) => {
              const meta = DIFFICULTY_META[d];
              return (
                <span
                  key={d}
                  className="inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-xs font-medium"
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
              <span className="inline-flex items-center gap-0.5 rounded border border-violet-200 bg-violet-50 px-1.5 py-0.5 text-xs font-medium text-violet-700">
                <Sparkles className="h-2.5 w-2.5" />
                初見×{mockCount}
              </span>
            )}
          </span>
        </td>
        <td className="py-2.5 pr-3 text-right text-sm text-slate-600">
          {duration}
        </td>
        <td className="py-2.5 text-right">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={`attempt-details-${id}`}
            aria-label={`${date}の演習詳細を${open ? "閉じる" : "開く"}`}
            className="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 focus-visible:outline-offset-2"
          >
            <ChevronDown
              className="h-4 w-4 transition-transform"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
              aria-hidden="true"
            />
          </button>
        </td>
      </tr>
      {open && (
        <tr id={`attempt-details-${id}`} className="border-b border-slate-200">
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
    <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-violet-700">
          <Sparkles className="h-3.5 w-3.5" />
          初見問題（この履歴からのみ復習できます）
        </div>
        {mockOnly.length === 0 ? (
          <p className="text-sm text-slate-600">この回に初見問題はありませんでした。</p>
        ) : (
          <div className="grid gap-1.5 sm:grid-cols-2">
            {mockOnly.map((p) => (
              <ReviewLink key={p.slug} slug={p.slug} title={p.title} difficulty={p.difficulty} />
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="mb-1.5 flex items-center gap-1.5 text-sm font-bold text-slate-700">
          <X className="h-3.5 w-3.5" />
          間違えた問題
        </div>
        {wrong.length === 0 ? (
          <p className="text-sm text-slate-600">誤答はありません（全問正解）。</p>
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
      className="group flex min-h-11 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-2.5 transition-colors hover:border-blue-300 hover:bg-blue-50"
    >
      <span className="flex items-center gap-2 truncate">
        <span
          className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold"
          style={{
            color: meta.accent,
            background: `color-mix(in oklch, ${meta.accent} 12%, transparent)`,
          }}
        >
          {meta.label}
        </span>
        <span className="truncate text-sm text-slate-800">{title}</span>
      </span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
