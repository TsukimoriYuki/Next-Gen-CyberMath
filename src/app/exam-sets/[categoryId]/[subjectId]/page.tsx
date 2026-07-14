import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Trophy } from "lucide-react";
import {
  getPublicExamSetCategory,
  getPublicExamSetsBySubject,
} from "@/data/exam-sets";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ categoryId: string; subjectId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryId, subjectId } = await params;
  const exams = getPublicExamSetsBySubject(categoryId, subjectId);
  return {
    title: exams[0] ? `${exams[0].subjectTitle} | 本番レベル模試集` : "本番レベル模試集",
  };
}

export default async function ExamSetSubjectPage({ params }: Props) {
  const { categoryId, subjectId } = await params;
  const category = getPublicExamSetCategory(categoryId);
  const exams = getPublicExamSetsBySubject(categoryId, subjectId);
  if (!category || exams.length === 0) notFound();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href={`/exam-sets/${category.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {category.title}へ
        </Link>

        <header className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Trophy className="h-3.5 w-3.5" />
            {category.title}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {exams[0].subjectTitle}
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            受験する回を選んでください。
          </p>
        </header>

        <section className="mt-8 grid gap-4">
          {exams.map((exam) => (
            <Link
              key={exam.id}
              href={`/exam-sets/${category.id}/${exam.subjectId}/${exam.id}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-blue-700">{exam.roundTitle}</div>
                  <h2 className="mt-1 text-xl font-extrabold">{exam.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {exam.description}
                  </p>
                </div>
                <span
                  className={
                    exam.manualReviewed
                      ? "rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
                      : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                  }
                >
                  {exam.manualReviewed ? "監修済み・公開中" : "手動作成・監修中"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  <Clock className="h-3 w-3" />
                  {exam.durationMin}分
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  {exam.totalScore}点満点
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                  想定平均 {exam.expectedAverage}
                </span>
              </div>
              {exam.qualityNote && (
                <p className="mt-3 text-xs leading-6 text-amber-700">{exam.qualityNote}</p>
              )}
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-600">
                模試を開く
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
