import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import {
  getUnitSlugs,
  getProblemsByUnitSlug,
  getLessonsByUnitName,
} from "@/lib/content";
import { ProblemCard } from "@/components/shell/ProblemCard";

export function generateStaticParams() {
  return getUnitSlugs().map((unitSlug) => ({ unitSlug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/units/[unitSlug]">): Promise<Metadata> {
  const { unitSlug } = await params;
  const unit = getProblemsByUnitSlug(unitSlug);
  if (!unit) return { title: "単元が見つかりません" };
  return { title: unit.name, description: unit.description || `${unit.name} の問題` };
}

export default async function UnitDetailPage({
  params,
}: PageProps<"/units/[unitSlug]">) {
  const { unitSlug } = await params;
  const unit = getProblemsByUnitSlug(unitSlug);
  if (!unit) notFound();

  const lessons = getLessonsByUnitName(unit.name);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/units"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        単元一覧へ戻る
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          {unit.name}
        </h1>
        {unit.description && (
          <p className="mt-2 text-muted-foreground">{unit.description}</p>
        )}
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          {unit.problems.length} 問
        </p>
      </header>

      {/* Related lessons for this unit */}
      {lessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-magenta/90">
            <BookOpen className="h-4 w-4" />
            この単元の授業
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {lessons.map((l) => (
              <Link
                key={l.slug}
                href={`/lessons/${l.slug}`}
                className="glass glass-hover rounded-xl p-4"
              >
                <div className="font-display font-semibold text-foreground">
                  {l.title}
                </div>
                {l.summary && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {l.summary}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Problems */}
      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unit.problems.map((p) => (
            <ProblemCard key={p.slug} problem={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
