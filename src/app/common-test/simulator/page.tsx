import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, FileText, ShieldCheck } from "lucide-react";
import {
  getCommonTestMockExamStats,
  getPublicCommonTestMockExams,
} from "@/data/common-test-mock-exams";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "共通テスト型本番模試",
  description:
    "共通テスト型の本番模試一覧です。数学I・数学Aは手動作成PDFを正本とした第1回・第2回を公開しています。",
  path: "/common-test/simulator",
});

export default function SimulatorIndexPage() {
  const publicMocks = getPublicCommonTestMockExams();

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          共通テスト対策へ戻る
        </Link>

        <header className="mt-8">
          <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
            <ShieldCheck className="h-4 w-4" />
            共通テスト型本番模試
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-normal sm:text-4xl">
            数学I・数学Aの本番形式を70分で解く
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            公開中の本番模試は、手動作成PDFを正本として転記した版です。問題本文は新規生成せず、
            大問構成・空欄・選択肢・図をPDFに合わせて実装しています。
          </p>
        </header>

        <section className="mt-8 grid gap-4">
          {publicMocks.map((mock) => {
            const stats = getCommonTestMockExamStats(mock);
            return (
              <article
                key={mock.id}
                className="border border-blue-300 bg-white p-5 shadow-sm ring-1 ring-blue-100"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-extrabold text-blue-700">
                      <FileText className="h-3.5 w-3.5" />
                      {mock.id.endsWith("002") ? "追加演習 / 手動作成版 第2回" : "手動作成版 第1回"}
                    </div>
                    <h2 className="mt-3 text-xl font-black tracking-normal">{mock.title}</h2>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                      <span className="inline-flex items-center gap-1 border border-stone-200 bg-stone-50 px-2 py-1">
                        <Clock className="h-3.5 w-3.5" />
                        {mock.durationMinutes}分
                      </span>
                      <span className="inline-flex items-center gap-1 border border-stone-200 bg-stone-50 px-2 py-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {stats.sectionCount}大問
                      </span>
                      <span className="border border-stone-200 bg-stone-50 px-2 py-1">
                        {mock.totalPoints}点満点
                      </span>
                      <span className="border border-stone-200 bg-stone-50 px-2 py-1">
                        配点 30,30,20,20
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {mock.id.endsWith("002")
                        ? "全問必答。第1問: 集合と命題・図形と計量、第2問: 二次関数・データの分析、第3問: 図形の性質、第4問: 場合の数と確率。"
                        : "全問必答。第1問: 数と式・図形と計量、第2問: 二次関数・データの分析、第3問: 図形の性質、第4問: 場合の数と確率。"}
                    </p>
                  </div>
                  <Link
                    href={`/common-test/simulator/${mock.id}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-blue-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
                  >
                    <FileText className="h-4 w-4" />
                    {mock.id.endsWith("002") ? "第2回に進む" : "模試を開始"}
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
