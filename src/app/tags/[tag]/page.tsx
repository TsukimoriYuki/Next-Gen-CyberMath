import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ArrowUpRight, Hash } from "lucide-react";
import {
  getAllTags,
  getAllTagNames,
  getProblemsByTag,
  getLessonsByTag,
} from "@/lib/content";
import { ProblemCard } from "@/components/shell/ProblemCard";
import { tagColor, tagFromSlug } from "@/data/tags";
import { createPublicMetadata } from "@/lib/public-metadata";
import { getTagIndexingDecision } from "@/lib/tag-indexing";

export function generateStaticParams() {
  // 非ASCII タグはデコード済み文字列を返す（Next が経路生成時にエンコード）。
  return getAllTagNames().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tags/[tag]">): Promise<Metadata> {
  const { tag: raw } = await params;
  const tag = tagFromSlug(raw);
  const tagSummary = getAllTags().find((entry) => entry.tag === tag);
  if (!tagSummary) {
    return { title: `#${tag}`, robots: { index: false, follow: false } };
  }
  const decision = getTagIndexingDecision(tag, tagSummary.total);
  return createPublicMetadata({
    title: `#${tag}`,
    description: `タグ「${tag}」の問題と授業`,
    path: `/tags/${encodeURIComponent(tag)}`,
    index: decision.index,
  });
}

export default async function TagPage({ params }: PageProps<"/tags/[tag]">) {
  const { tag: raw } = await params;
  // 実行時の params は URL エンコードされている場合があるためデコードする。
  const tag = tagFromSlug(raw);
  const problems = getProblemsByTag(tag);
  const lessons = getLessonsByTag(tag);
  if (problems.length === 0 && lessons.length === 0) notFound();

  const color = tagColor(tag);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/tags"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        タグ一覧へ戻る
      </Link>

      <header className="mt-6 flex items-center gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{
            color,
            background: `color-mix(in oklch, ${color} 14%, transparent)`,
            boxShadow: `0 0 22px color-mix(in oklch, ${color} 30%, transparent)`,
          }}
        >
          <Hash className="h-5 w-5" />
        </span>
        <div>
          <h1
            className="font-display text-3xl font-extrabold tracking-tight"
            style={{ color }}
          >
            {tag}
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            {problems.length} 問 · 授業 {lessons.length} 本
          </p>
        </div>
      </header>

      {lessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-magenta/90">
            <BookOpen className="h-4 w-4" />
            授業
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {lessons.map((l) => (
              <Link
                key={l.slug}
                href={`/lessons/${l.slug}`}
                className="glass glass-hover group flex items-center gap-3 rounded-xl p-4"
              >
                <span className="flex-1 font-display font-semibold text-foreground">
                  {l.title}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-neon-magenta" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {problems.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-cyan/90">
            問題
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p) => (
              <ProblemCard key={p.slug} problem={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
