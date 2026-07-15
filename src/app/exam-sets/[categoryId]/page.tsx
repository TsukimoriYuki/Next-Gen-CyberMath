import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Trophy } from "lucide-react";
import {
  PUBLIC_EXAM_SET_CATEGORIES,
  getPublicExamSetCategory,
  getPublicExamSetSubjects,
} from "@/data/exam-sets";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getPublicExamSetCategory(categoryId);
  return {
    title: category ? `${category.title} | 本番レベル模試集` : "本番レベル模試集",
  };
}

export default async function ExamSetCategoryPage({ params }: Props) {
  const { categoryId } = await params;
  const category = getPublicExamSetCategory(categoryId);
  if (!category) notFound();

  const subjects = getPublicExamSetSubjects(category.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/exam-sets"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          本番レベル模試集へ
        </Link>

        <header className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${category.iconColorClass}`}>
            <Trophy className="h-3.5 w-3.5" />
            {category.subtitle}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {category.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {category.description}
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {subjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
              <p>このカテゴリの模試は準備中です。</p>
              {(() => {
                const otherAvailable = PUBLIC_EXAM_SET_CATEGORIES.filter(
                  (c) => c.id !== category.id && getPublicExamSetSubjects(c.id).length > 0,
                );
                if (otherAvailable.length === 0) return null;
                return (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {otherAvailable.map((c) => (
                      <Link
                        key={c.id}
                        href={`/exam-sets/${c.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                      >
                        {c.title}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            subjects.map((subject) => (
              <Link
                key={subject.subjectId}
                href={`/exam-sets/${category.id}/${subject.subjectId}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-extrabold">{subject.subjectTitle}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  公開中の模試: {subject.count}件
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600">
                  回を選ぶ
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
