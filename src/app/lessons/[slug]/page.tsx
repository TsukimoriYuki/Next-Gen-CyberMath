import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, ArrowUpRight } from "lucide-react";
import {
  getAllLessonSlugs,
  getLesson,
  getProblem,
  slugForUnit,
} from "@/lib/content";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { TagList } from "@/components/shell/TagChip";

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "授業が見つかりません" };
  return { title: lesson.title, description: lesson.summary ?? `${lesson.unit} の授業` };
}

export default async function LessonPage({
  params,
}: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const relatedProblems = (lesson.relatedProblemSlugs ?? [])
    .map((s) => getProblem(s))
    .filter((p) => p !== undefined);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/lessons"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-magenta"
      >
        <ArrowLeft className="h-4 w-4" />
        授業一覧へ戻る
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neon-magenta/90">
          <BookOpen className="h-3.5 w-3.5" />
          Concept Lesson
          <Link
            href={`/units/${slugForUnit(lesson.unit)}`}
            className="text-muted-foreground hover:text-neon-cyan"
          >
            {lesson.unit}
          </Link>
        </div>
        <h1
          className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
          style={{
            textShadow:
              "0 0 28px color-mix(in oklch, var(--neon-magenta) 30%, transparent)",
          }}
        >
          {lesson.title}
        </h1>
        {lesson.summary && (
          <p className="mt-3 text-muted-foreground">{lesson.summary}</p>
        )}
        <TagList tags={lesson.tags} className="mt-4 flex flex-wrap gap-1.5" />
      </header>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent" />

      {/* Body */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        <LessonRenderer content={lesson.content} />
      </div>

      {/* Related problems */}
      {relatedProblems.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-cyan/90">
            この授業で解ける問題
          </h2>
          <div className="grid gap-3">
            {relatedProblems.map((p) => (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="glass glass-hover group flex items-center gap-3 rounded-xl p-4"
              >
                <DifficultyBadge difficulty={p.difficulty} />
                <span className="flex-1 font-display font-semibold text-foreground">
                  {p.title}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-neon-cyan" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
