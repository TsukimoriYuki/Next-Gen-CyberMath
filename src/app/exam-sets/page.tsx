import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  Clock,
  FileText,
  ArrowRight,
  Info,
} from "lucide-react";
import { EXAM_SET_CATEGORIES, type ExamSetCategory } from "@/data/exam-sets";

export const metadata: Metadata = {
  title: "本番レベル模試集",
  description:
    "私立大・国公立大の個別試験を想定した実戦形式の模試集。中堅私立・上級私立・中堅国公立・難関国公立の4カテゴリ。",
};

export default function ExamSetsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Back */}
      <Link
        href="/math"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        数学ホームへ
      </Link>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-rose-400">
          <Trophy className="h-3.5 w-3.5" />
          Real Exam Practice
        </div>

        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          本番レベル<span className="text-rose-400">模試集</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          共通テストとは別に、私立大学・国公立大学の個別試験を想定した実戦形式の模試を提供予定です。
          まずはレベル別に、中堅私立・上級私立・中堅国公立・難関国公立の4カテゴリを準備しています。
        </p>

        {/* サイバー模試との違い */}
        <div className="mt-6 rounded-2xl border border-border/60 bg-secondary/30 p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-muted-foreground">
            <Info className="h-4 w-4" />
            サイバー模試との違い
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neon-magenta/20 bg-neon-magenta/5 p-4">
              <div className="mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4 text-neon-magenta" />
                <span className="text-sm font-bold text-neon-magenta">サイバー模試</span>
                <Link
                  href="/mock"
                  className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-neon-magenta"
                >
                  開く <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                タグ・難易度・時間を自在にカスタムして生成するオリジナル模試。問題は既存の問題バンクからランダム選択。自分の弱点に合わせた演習に最適。
              </p>
            </div>
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-rose-400" />
                <span className="text-sm font-bold text-rose-400">本番レベル模試集</span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                大学レベル別に設計された固定問題セット。出題形式・問題数・時間が実際の試験に準拠。本番を意識した通し演習と実力測定に最適。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4 Category Cards ───────────────────────────────────────────── */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold tracking-wide">カテゴリを選ぶ</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          志望校のレベルに合ったカテゴリで実戦演習を積みましょう。
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {EXAM_SET_CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* ── 今後の予定 ──────────────────────────────────────────────────── */}
      <section className="mt-12">
        <div className="rounded-2xl border border-border/40 bg-secondary/20 p-6 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10">
            <Trophy className="h-6 w-6 text-rose-400" />
          </div>
          <h3 className="mt-4 font-display text-lg font-bold">問題を追加予定</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            各カテゴリの模試セットは現在作成中です。問題の出題範囲・問題構成・時間配分を調整しています。
            <br className="hidden sm:block" />
            順次追加していきますので、しばらくお待ちください。
          </p>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ category }: { category: ExamSetCategory }) {
  return (
    <div
      className={`glass rounded-2xl border p-6 ${category.borderColorClass}`}
      aria-label={category.title}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.iconColorClass}`}
          >
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <div className="font-display text-lg font-bold leading-tight">
              {category.title}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {category.subtitle}
            </div>
          </div>
        </div>

        {/* 準備中バッジ */}
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <Clock className="h-3 w-3" />
          準備中
        </span>
      </div>

      {/* Meta */}
      <div className="mt-4 space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="w-16 shrink-0 text-xs text-muted-foreground">対象</span>
          <span className="text-xs text-foreground/80">{category.targetSchools}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="w-16 shrink-0 text-xs text-muted-foreground">形式</span>
          <span className="text-xs text-foreground/80">{category.format}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {category.description}
      </p>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-border/40 pt-4">
        <span className="text-xs text-muted-foreground">
          問題内容は今後追加予定です
        </span>
        <span
          className={`inline-flex items-center gap-1 font-mono text-xs font-semibold ${category.accentTextClass} opacity-40`}
        >
          近日公開 <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </div>
  );
}
