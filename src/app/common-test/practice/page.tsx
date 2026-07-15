import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { SECTION_PRACTICE_EXAMS } from "@/data/common-test/section-practice";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "大問型演習",
  description:
    "第1問前半（数と式・集合と命題）を中心に、誘導のある大問1問分の演習を、対応する中核講義とセットで練習できます。",
  alternates: { canonical: "/common-test/practice" },
  openGraph: {
    title: `大問型演習 | ${SITE_NAME}`,
    description: "誘導のある大問1問分の演習を、中核講義とセットで練習する。",
    url: "/common-test/practice",
  },
};

export default function SectionPracticeIndexPage() {
  const grouped = new Map<string, typeof SECTION_PRACTICE_EXAMS>();
  for (const exam of SECTION_PRACTICE_EXAMS) {
    const unit = exam.sections[0]?.unit ?? "その他";
    const list = grouped.get(unit) ?? [];
    list.push(exam);
    grouped.set(unit, list);
  }

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "試験対策", href: "/exams" },
          { label: "共通テスト", href: "/common-test" },
          { label: "大問型演習" },
        ]}
      />
      <LearningPageHeader
        eyebrow="共通テスト"
        title="大問型演習"
        description={
          <p>
          冊子型模試（PDF正本）とは別に、第1問前半（数と式・集合と命題）を中心とした、誘導のある大問1問分の
          演習です。小問集合ではなく、実際の大問と同じように前の空欄の結果を次の空欄で使う構成にしています。
          解いたあとは、対応する中核講義へ戻って復習できます。
          </p>
        }
      />

      {Array.from(grouped.entries()).map(([unit, exams]) => (
        <section key={unit} className="mt-8">
          <h2 className="border-b border-slate-200 pb-3 text-xl font-bold text-slate-950">{unit}</h2>
          <div className="mt-3 space-y-3">
            {exams.map((exam) => {
              const section = exam.sections[0];
              return (
                <Link
                  key={exam.id}
                  href={`/common-test/practice/${exam.id}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-offset-4"
                >
                  <dl className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
                    <div><dt className="sr-only">目安時間</dt><dd>{exam.durationMinutes}分目安</dd></div>
                    <div><dt className="sr-only">配点</dt><dd>{exam.totalPoints}点</dd></div>
                    <div><dt className="sr-only">問題数</dt><dd>{section?.questions.length ?? 0}問</dd></div>
                  </dl>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">{exam.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{section?.theme}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-blue-700">
                    演習を始める
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">対応する数学講座</h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          判断フローや代表例題を先に確認したい場合は、
          <Link href="/courses/math-1a/numbers-and-expressions" className="mx-1 font-semibold text-blue-700 hover:underline">
            数と式 講座
          </Link>
          、
          <Link href="/courses/math-1a/sets-and-logic" className="mx-1 font-semibold text-blue-700 hover:underline">
            集合と命題 講座
          </Link>
          を先に読んでから演習に進むこともできます。
        </p>
      </section>
    </LearningPageShell>
  );
}
