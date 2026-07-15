import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, GraduationCap, Target } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
  LearningSectionHeader,
} from "@/components/learning/LearningPageFrame";
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
  const description = unit.description || `${unit.name} の問題`;
  return {
    title: unit.name,
    description,
    alternates: { canonical: `/units/${unitSlug}` },
    openGraph: {
      title: `${unit.name} | Cyber Math`,
      description,
      url: `/units/${unitSlug}`,
    },
  };
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
    <LearningPageShell width="content">
      <LearningBreadcrumbs
        items={[
          { label: "数学", href: "/math" },
          { label: "単元別問題", href: "/units" },
          { label: unit.name },
        ]}
      />
      <LearningPageHeader
        eyebrow="数学・単元別問題"
        title={unit.name}
        description={unit.description}
        meta={[{ label: "問題数", value: `${unit.problems.length}問` }]}
      />

      {masteryLecture && (
        <section className="mt-8 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="border-b border-blue-100 bg-blue-50 px-5 py-3">
            <div className="flex items-center gap-2 text-sm font-bold text-blue-800">
              <GraduationCap className="h-4 w-4" />
              この単元の理解を深める講座
            </div>
          </div>
          <div className="grid gap-5 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                {masteryLecture.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {masteryLecture.description}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {masteryLecture.weapons.slice(0, 3).map((point) => (
                  <div
                    key={point}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
                  >
                    <Target className="mb-1 h-4 w-4 text-emerald-700" aria-hidden="true" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={`/common-test/lectures/${masteryLecture.lectureSlug}`}
              className="button-primary"
            >
              {masteryLecture.ctaLabel}
            </Link>
          </div>
        </section>
      )}

      {/* Related lessons for this unit */}
      {lessons.length > 0 && (
        <section className="mt-8">
          <LearningSectionHeader title="この単元の講座" />
          <div className="grid gap-3 sm:grid-cols-2">
            {lessons.map((l) => (
              <Link
                key={l.slug}
                href={`/lessons/${l.slug}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-offset-4"
              >
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <BookOpen className="h-4 w-4 text-blue-700" aria-hidden="true" />
                  {l.title}
                </div>
                {l.summary && (
                  <p className="mt-1 text-sm leading-6 text-slate-600">
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
        <LearningSectionHeader title="問題" description="難度とテーマを確認して、取り組む問題を選んでください。" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {unit.problems.map((p) => (
            <ProblemCard key={p.slug} problem={p} />
          ))}
        </div>
      </section>
    </LearningPageShell>
  );
}
