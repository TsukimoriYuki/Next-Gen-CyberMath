import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { getSpecialLectureBySlug, SPECIAL_LECTURES } from "@/data/specialLectures";
import { LectureRenderer } from "@/components/lectures/LectureRenderer";

export function generateStaticParams() {
  return SPECIAL_LECTURES.map((lecture) => ({ slug: lecture.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lecture = getSpecialLectureBySlug(slug);
  if (!lecture) return { title: "講義が見つかりません" };
  return {
    title: `${lecture.title} — 特別講義`,
    description: lecture.description,
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
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/common-test/lectures"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          特別講義一覧へ戻る
        </Link>

        <header className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
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
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              推奨 {lecture.recommendedMinutes}分
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              {lecture.tags.join(" / ")}
            </span>
          </div>
        </header>

        <section className="mt-6">
          <LectureRenderer lecture={lecture} />
        </section>
      </div>
    </main>
  );
}
