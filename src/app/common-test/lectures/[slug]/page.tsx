import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, GraduationCap, Tag } from "lucide-react";
import { getSpecialLectureBySlug, SPECIAL_LECTURES } from "@/data/specialLectures";
import { LectureExperience } from "@/components/lectures/LectureExperience";
import { LectureNextRecommendation } from "@/components/lectures/LectureNextRecommendation";
import { MASTERY_LECTURE_GUIDES } from "@/lib/special-lecture-guidance";

export function generateStaticParams() {
  return [
    ...SPECIAL_LECTURES.map((lecture) => ({ slug: lecture.slug })),
    ...MASTERY_LECTURE_GUIDES.flatMap((guide) =>
      guide.legacySlugs.map((slug) => ({ slug })),
    ),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lecture = getSpecialLectureBySlug(slug);
  if (!lecture) return { title: "講義が見つかりません" };
  const title = `${lecture.title} — 特別講義`;
  const canonical = `/common-test/lectures/${lecture.slug}`;
  return {
    title,
    description: lecture.description,
    robots: lecture.noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: lecture.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function LectureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lecture = getSpecialLectureBySlug(slug);
  if (!lecture) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/common-test/lectures"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          特別講義一覧へ戻る
        </Link>

        <header className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3 sm:px-7">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-600">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              特別講義
              <span className="text-slate-300">/</span>
              重点講座
            </div>
          </div>
          <div className="p-5 sm:p-7">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {lecture.subject}
            </span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
              {lecture.unit}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
              {lecture.difficulty}
            </span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            {lecture.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{lecture.description}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-[160px_1fr]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                推奨時間
              </div>
              <div className="mt-1 font-mono text-2xl font-extrabold text-slate-950">
                {lecture.recommendedMinutes}
                <span className="ml-1 text-xs font-bold text-slate-500">分</span>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <Tag className="h-3.5 w-3.5" />
                この講義で扱うもの
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {lecture.tags.map((tag) => (
                  <span key={tag} className="rounded-lg bg-white px-2 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-xs leading-5 text-blue-900">
            <BookOpen className="h-4 w-4 shrink-0 text-blue-600" />
            まず本文で判断順を作り、問題ブロックで同じ流れを再現します。
          </div>
          </div>
        </header>

        <LectureExperience lecture={lecture} />
        <LectureNextRecommendation currentSlug={lecture.slug} />
      </div>
    </main>
  );
}
