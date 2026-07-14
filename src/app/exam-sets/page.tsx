import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileText, Trophy } from "lucide-react";
import { PUBLIC_EXAM_SET_CATEGORIES, type ExamSetCategory } from "@/data/exam-sets";

export const metadata: Metadata = {
  title: "本番レベル模試集",
  description:
    "私立大・国公立大の個別試験を想定した本番レベル模試集です。",
};

export default function ExamSetsPage() {
  if (PUBLIC_EXAM_SET_CATEGORIES.length === 0) redirect("/mock");
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/math"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          数学ホームへ
        </Link>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">
            <Trophy className="h-3.5 w-3.5" />
            Real Exam Practice
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            本番レベル模試集
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            大学入試の個別試験を想定した固定セットの模試です。サイバー模試とは別に、出題範囲・配点・制限時間を固定して実戦形式で確認できます。
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-700" />
                <span className="text-sm font-bold text-violet-800">サイバー模試</span>
                <Link
                  href="/mock"
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-violet-700 hover:text-violet-900"
                >
                  開く <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <p className="text-xs leading-6 text-violet-900/80">
                タグ・難易度・時間を自由に指定して生成する演習モードです。
              </p>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
              <div className="mb-1 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-rose-700" />
                <span className="text-sm font-bold text-rose-800">本番レベル模試集</span>
              </div>
              <p className="text-xs leading-6 text-rose-900/80">
                大学レベル別に作った固定模試です。今回追加した中堅私立数学I・Aもここから受験できます。
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-extrabold tracking-tight">カテゴリを選ぶ</h2>
          <p className="mt-1 text-sm text-slate-600">
            志望校のレベルに合うカテゴリから、科目と回を選んでください。
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {PUBLIC_EXAM_SET_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CategoryCard({ category }: { category: ExamSetCategory }) {
  const availableCount = category.examSets.filter((exam) => exam.status === "available").length;
  const isAvailable = availableCount > 0;

  return (
    <article className={`rounded-2xl border bg-white p-6 shadow-sm ${category.borderColorClass}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${category.iconColorClass}`}
          >
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold leading-tight">{category.title}</h3>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {category.subtitle}
            </div>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
          <Clock className="h-3 w-3" />
          {isAvailable ? `${availableCount}件` : "準備中"}
        </span>
      </div>

      <div className="mt-4 space-y-2 text-xs">
        <div className="flex gap-2">
          <span className="w-16 shrink-0 text-slate-500">対象</span>
          <span className="font-medium text-slate-800">{category.targetSchools}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 text-slate-500">形式</span>
          <span className="font-medium text-slate-800">{category.format}</span>
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600">{category.description}</p>

      <Link
        href={`/exam-sets/${category.id}`}
        className={`mt-5 inline-flex items-center gap-2 text-sm font-extrabold ${
          isAvailable ? category.accentTextClass : "text-slate-500"
        }`}
      >
        {isAvailable ? "科目を選ぶ" : "準備中 — 公開状況を見る"}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
