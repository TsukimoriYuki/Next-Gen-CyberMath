import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import {
  getAllLessonSlugs,
  getLesson,
  getProblem,
  slugForUnit,
} from "@/lib/content";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import {
  ContentMeta,
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
  LearningSectionHeader,
} from "@/components/learning/LearningPageFrame";
import { DIFFICULTY_META } from "@/lib/types";
import { tagSlug } from "@/data/tags";
import { createPublicMetadata } from "@/lib/public-metadata";

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) {
    return { title: "講座が見つかりません", robots: { index: false, follow: false } };
  }
  return createPublicMetadata({
    title: lesson.title,
    description: lesson.summary ?? `${lesson.unit} の講座`,
    path: `/lessons/${slug}`,
    openGraphType: "article",
  });
}

export default async function LessonPage({
  params,
}: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const relatedProblems = (lesson.relatedProblemSlugs ?? [])
    .map((problemSlug) => getProblem(problemSlug))
    .filter((problem) => problem !== undefined);

  const practiceProblem = lesson.practiceProblemSlug
    ? getProblem(lesson.practiceProblemSlug)
    : undefined;

  const hasStructuredSections = Boolean(
    lesson.proof || lesson.application || lesson.practiceProblemSlug,
  );
  const unitHref = `/units/${slugForUnit(lesson.unit)}` as const;

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "講座", href: "/courses" },
          { label: lesson.unit, href: unitHref },
          { label: lesson.title },
        ]}
      />

      <article>
        <LearningPageHeader
          eyebrow="数学講座"
          title={lesson.title}
          description={lesson.summary}
          meta={[
            {
              label: "単元",
              value: (
                <Link
                  href={unitHref}
                  className="rounded-sm text-blue-700 hover:text-blue-800 focus-visible:outline-offset-4"
                >
                  {lesson.unit}
                </Link>
              ),
            },
            { label: "教材種別", value: "解説講座" },
          ]}
        />

        <TagLinks tags={lesson.tags} />

        {lesson.content && (
          <section className="mt-10">
            <LearningSectionHeader title="講座内容" />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <LessonRenderer content={lesson.content} />
            </div>
          </section>
        )}

        {hasStructuredSections && (
          <div className="mt-12 space-y-12">
            {lesson.proof && (
              <section>
                <LearningSectionHeader
                  title="証明"
                  description="結論に至る根拠を順に確認します。"
                />
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <LessonRenderer content={lesson.proof} />
                </div>
              </section>
            )}

            {lesson.application && (
              <section>
                <LearningSectionHeader
                  title="活用方法"
                  description="考え方を問題演習で使う手順を確認します。"
                />
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <LessonRenderer content={lesson.application} />
                </div>
              </section>
            )}

            {lesson.practiceProblemSlug && (
              <section>
                <LearningSectionHeader
                  title="練習問題"
                  description="講座で確認した考え方を使って問題に取り組みます。"
                />
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                  {practiceProblem && (
                    <div className="mb-6">
                      <ContentMeta
                        items={[
                          {
                            label: "難度",
                            value: `${DIFFICULTY_META[practiceProblem.difficulty].label} ${DIFFICULTY_META[practiceProblem.difficulty].name}`,
                          },
                          { label: "単元", value: practiceProblem.unit },
                        ]}
                      />
                      <h3 className="mt-4 text-lg font-bold text-slate-950">
                        {practiceProblem.title}
                      </h3>
                      {practiceProblem.tagline && (
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {practiceProblem.tagline}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href={`/dojo?slug=${lesson.practiceProblemSlug}`}
                    className="button-primary"
                  >
                    練習問題に取り組む
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    解説を一段ずつ確認しながら、自分の考え方と比較できます。
                  </p>
                </div>
              </section>
            )}
          </div>
        )}

        {!hasStructuredSections && relatedProblems.length > 0 && (
          <section className="mt-12">
            <LearningSectionHeader title="この講座に関連する問題" />
            <div className="grid gap-3">
              {relatedProblems.map((problem) => (
                <Link
                  key={problem.slug}
                  href={`/problems/${problem.slug}`}
                  className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    難度 {DIFFICULTY_META[problem.difficulty].label}
                  </span>
                  <span className="min-w-0 flex-1 font-semibold text-slate-900 group-hover:text-blue-800">
                    {problem.title}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-700"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </LearningPageShell>
  );
}

function TagLinks({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="関連タグ">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tagSlug(tag)}`}
            className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
