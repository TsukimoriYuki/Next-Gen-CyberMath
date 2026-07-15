import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
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
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "試験対策", href: "/exams" },
          { label: "共通テスト", href: "/common-test" },
          { label: "問題解体型講座" },
        ]}
      />
      <LearningPageHeader
        eyebrow="共通テスト"
        title="問題解体型講座"
        description={
          <p>
          共通テスト対策オリジナル問題PDFを正本として、大問ごとに「見るべきポイント」「本番での思考順」
          「詳しい解説」「よくあるミス」を整理した講座です。問題PDFはPCでは左に固定表示され、
          スマホでは上部から必要なときに参照できます。基礎が不安なときは数学講座へ、
          同じテーマを解き直したいときは関連する冊子型模試へ戻れます。
          </p>
        }
      />

      <div className="mt-8 space-y-3">
        {COMMON_TEST_PROBLEM_LECTURES.map((lecture) => (
          <Link
            key={lecture.id}
            href={`/common-test/problem-lectures/${lecture.id}`}
            className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-offset-4"
          >
            <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              <div><dt className="sr-only">対象</dt><dd>{lecture.targetSection}</dd></div>
              <div><dt className="sr-only">所要時間</dt><dd>{lecture.estimatedTime}</dd></div>
              <div><dt className="sr-only">難易度</dt><dd>{lecture.difficulty}</dd></div>
            </dl>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{lecture.title}</h2>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {lecture.concepts.map((concept) => (
                <span
                  key={concept}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700"
                >
                  {concept}
                </span>
              ))}
            </div>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-700">
              講座を開く
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </LearningPageShell>
  );
}
