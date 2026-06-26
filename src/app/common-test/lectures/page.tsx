import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, GraduationCap } from "lucide-react";
import { SPECIAL_LECTURES } from "@/data/specialLectures";

export const metadata: Metadata = {
  title: "特別講義 — 共通テスト数学",
  description: "共通テスト数学の考え方、公式選択、本番判断を学ぶ特別講義。",
};

export default function CommonTestLecturesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          共通テスト数学へ戻る
        </Link>

        <header className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">特別講義</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            公式を覚えるだけで終わらせない講義
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            共通テスト数学で差がつくのは、条件を見る順番、公式を選ぶ判断、時間をかけるか撤退するかの見極めです。
            特別講義では「できる人の頭の中」まで分解します。
          </p>
        </header>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {SPECIAL_LECTURES.map((lecture) => (
            <Link
              key={lecture.id}
              href={`/common-test/lectures/${lecture.slug}`}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                  {lecture.subject}
                </span>
                <span className="rounded-full bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">
                  {lecture.unit}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  {lecture.difficulty}
                </span>
              </div>
              <h2 className="mt-4 text-xl font-extrabold leading-snug text-slate-950">
                {lecture.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{lecture.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lecture.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-500">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {lecture.recommendedMinutes}分
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 transition group-hover:gap-2">
                  講義を開く
                  <BookOpen className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
