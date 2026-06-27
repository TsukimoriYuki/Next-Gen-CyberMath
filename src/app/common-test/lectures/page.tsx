import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Tag } from "lucide-react";
import { SPECIAL_LECTURES } from "@/data/specialLectures";
import { LectureCardFooter } from "@/components/lectures/LectureCardFooter";

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
            <span className="text-xs font-semibold text-blue-700">特別講義 / 重点講座</span>
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
            公式を覚えるだけで終わらせない講義
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            共通テスト数学で差がつくのは、条件を見る順番、公式を選ぶ判断、時間をかけるか撤退するかの見極めです。
            特別講義では「できる人の頭の中」まで分解します。
          </p>
        </header>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {SPECIAL_LECTURES.map((lecture) => (
            <article
              key={lecture.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-extrabold text-violet-700 ring-1 ring-violet-100">
                    イベント講義
                  </span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold text-blue-700 ring-1 ring-blue-100">
                    重点講座
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-5 p-5">
                <div>
                  <h2 className="text-2xl font-extrabold leading-snug tracking-tight text-slate-950">
                    {lecture.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{lecture.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MetaPill label="科目" value={lecture.subject} />
                  <MetaPill label="単元" value={lecture.unit} />
                  <MetaPill label="難易度" value={lecture.difficulty} />
                  <MetaPill label="推奨" value={`${lecture.recommendedMinutes}分`} />
                </div>

                <div className="flex flex-wrap gap-2">
                  {lecture.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-600"
                    >
                      <Tag className="h-3 w-3 text-slate-400" />
                      {tag}
                    </span>
                  ))}
                </div>

                <LectureCardFooter lecture={lecture} />
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[10px] font-bold text-slate-500">{label}</div>
      <div className="mt-0.5 truncate text-sm font-extrabold text-slate-900">{value}</div>
    </div>
  );
}
