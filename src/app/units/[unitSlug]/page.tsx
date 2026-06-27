import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap, Target } from "lucide-react";
import {
  getUnitSlugs,
  getProblemsByUnitSlug,
  getLessonsByUnitName,
} from "@/lib/content";
import { ProblemCard } from "@/components/shell/ProblemCard";
import { getMasteryLectureGuideForUnit } from "@/lib/special-lecture-guidance";

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
  const masteryLecture = getMasteryLectureGuideForUnit({
    unitName: unit.name,
    unitSlug,
  });

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

      {masteryLecture && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-neon-cyan/25 bg-card/70 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
          <div className="border-b border-neon-cyan/10 bg-neon-cyan/5 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-bold text-neon-cyan">
              <GraduationCap className="h-4 w-4" />
              この単元で満点を狙うなら
            </div>
          </div>
          <div className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                {masteryLecture.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {masteryLecture.description}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {masteryLecture.weapons.slice(0, 3).map((weapon) => (
                  <div
                    key={weapon}
                    className="rounded-xl border border-white/10 bg-background/40 px-3 py-2 text-xs leading-5 text-foreground/85"
                  >
                    <Target className="mb-1 h-3.5 w-3.5 text-neon-lime" />
                    {weapon}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={`/common-test/lectures/${masteryLecture.lectureSlug}`}
              className="inline-flex items-center justify-center rounded-xl bg-neon-cyan px-4 py-3 text-sm font-extrabold text-background transition hover:brightness-110"
            >
              {masteryLecture.ctaLabel}
            </Link>
          </div>
        </section>
      )}

      {/* Related lessons for this unit */}
      {lessons.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-magenta/90">
            <BookOpen className="h-4 w-4" />
            この単元の講座
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
