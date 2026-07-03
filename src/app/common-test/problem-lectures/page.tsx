import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, FileText } from "lucide-react";
import { COMMON_TEST_PROBLEM_LECTURES } from "@/data/common-test/problem-lectures";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "問題解体型講座",
  description:
    "共通テスト対策オリジナル問題PDFを正本に、見るべきポイント・本番での思考順・よくあるミスを大問ごとに整理する講座です。",
  alternates: { canonical: "/common-test/problem-lectures" },
  openGraph: {
    title: `問題解体型講座 | ${SITE_NAME}`,
    description: "問題PDFを使って、見るべきポイント・本番での思考順・よくあるミスを整理する。",
    url: "/common-test/problem-lectures",
  },
};

export default function ProblemLecturesIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/common-test"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        共通テスト対策室へ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          <FileText className="h-3.5 w-3.5" />
          Problem Lectures
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          問題解体型講座
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          共通テスト対策オリジナル問題PDFを正本として、大問ごとに「見るべきポイント」「本番での思考順」
          「詳しい解説」「よくあるミス」を整理した講座です。問題PDFはPCでは左に固定表示され、
          スマホでは上部から必要なときに参照できます。基礎が不安なときはMATH講座へ、
          同じテーマを解き直したいときは関連する冊子型模試へ戻れます。
        </p>
      </header>

      <div className="mt-8 space-y-3">
        {COMMON_TEST_PROBLEM_LECTURES.map((lecture) => (
          <Link
            key={lecture.id}
            href={`/common-test/problem-lectures/${lecture.id}`}
            className="block rounded-2xl border border-border/70 bg-card/70 p-5 transition hover:border-neon-cyan/40"
          >
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-muted-foreground">
              <span className="rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                {lecture.targetSection}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                <Clock className="h-3 w-3" />
                {lecture.estimatedTime}
              </span>
              <span className="rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                {lecture.difficulty}
              </span>
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-foreground">{lecture.title}</h2>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {lecture.concepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700"
                >
                  {concept}
                </span>
              ))}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-neon-cyan">
              講座を開く
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
