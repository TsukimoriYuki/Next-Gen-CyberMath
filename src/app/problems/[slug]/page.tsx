import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getAllSlugs, getProblem, getLesson } from "@/lib/content";
import { DIFFICULTY_META } from "@/lib/types";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { TagList } from "@/components/shell/TagChip";
import { MathText } from "@/components/math/Math";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { LabRenderer } from "@/components/graph/LabRenderer";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/problems/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) return { title: "問題が見つかりません" };
  return {
    title: problem.title,
    description: problem.tagline ?? `${problem.unit} の問題`,
  };
}

export default async function ProblemPage({
  params,
}: PageProps<"/problems/[slug]">) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  const meta = DIFFICULTY_META[problem.difficulty];
  const lesson = getLesson(problem.relatedLessonSlug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/units"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        単元一覧へ戻る
      </Link>

      {/* Problem header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <DifficultyBadge difficulty={problem.difficulty} withName />
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {problem.unit}
          </span>
        </div>

        <h1
          className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight"
          style={{ textShadow: `0 0 24px color-mix(in oklch, ${meta.accent} 30%, transparent)` }}
        >
          {problem.title}
        </h1>
        {problem.tagline && (
          <p className="mt-2 text-sm italic text-muted-foreground">
            「{problem.tagline}」
          </p>
        )}
        <TagList tags={problem.tags} className="mt-4 flex flex-wrap gap-1.5" />
      </header>

      {/* Statement */}
      <section className="glass mt-8 rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan/80">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan" />
          問題
        </div>
        <MathText className="text-[15px] text-foreground/90">
          {problem.statement}
        </MathText>
      </section>

      {/* Logic scaffolding (+ embedded lab in the EXPERIMENT step) */}
      <section className="mt-10">
        <LogicSteps
          slug={problem.slug}
          steps={problem.steps}
          labSlot={
            problem.hasGraph && problem.graphKey ? (
              <LabRenderer graphKey={problem.graphKey} />
            ) : undefined
          }
          relatedLesson={
            lesson ? { slug: lesson.slug, title: lesson.title } : undefined
          }
        />
      </section>
    </div>
  );
}
