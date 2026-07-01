import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { LectureRoadmapCatalog } from "@/components/lectures/LectureRoadmapCatalog";

export const metadata: Metadata = {
  title: "特別講義 — 共通テスト数学",
  description:
    "共通テスト数学の考え方、公式選択、本番判断、満点講義、時間短縮講義を学ぶ特別講義一覧です。",
  alternates: {
    canonical: "/common-test/lectures",
  },
  openGraph: {
    title: "特別講義 | Cyber Math Next-Gen",
    description:
      "共通テスト数学の満点講義、判別ドリル、本番判断、時間短縮講義への入口。",
    url: "/common-test/lectures",
  },
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

        <LectureRoadmapCatalog />
      </div>
    </main>
  );
}
