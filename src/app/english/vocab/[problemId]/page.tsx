import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnglishUsagePractice } from "@/components/english/EnglishUsagePractice";
import {
  ENGLISH_USAGE_AREA_META,
  ENGLISH_USAGE_DIFFICULTY_LABEL,
  ENGLISH_USAGE_PROBLEMS,
  ENGLISH_USAGE_QUESTION_TYPE_LABEL,
  getEnglishUsageProblem,
  getNextEnglishUsageProblem,
} from "@/data/english-usage";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { createPublicMetadata } from "@/lib/public-metadata";

export function generateStaticParams() {
  return ENGLISH_USAGE_PROBLEMS.map((problem) => ({ problemId: problem.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ problemId: string }> }): Promise<Metadata> {
  const { problemId } = await params;
  const problem = getEnglishUsageProblem(problemId);
  if (!problem) return { title: "英語 語彙・語法演習", robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: `${problem.title} | 英語 語彙・語法演習`,
    description: problem.statement,
    path: `/english/vocab/${problem.slug}`,
    openGraphType: "article",
  });
}

export default async function EnglishUsageProblemPage({ params }: { params: Promise<{ problemId: string }> }) {
  const { problemId } = await params;
  const problem = getEnglishUsageProblem(problemId);
  if (!problem) notFound();
  const nextProblem = getNextEnglishUsageProblem(problem.id);
  const relatedHref = problem.unitId === "grammar" ? "/english/grammar" : "/english/vocab";
  const relatedLabel = problem.unitId === "grammar" ? "英文法ドリル" : "英単語フラッシュカード";

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs items={[{ label: "英語", href: "/english" }, { label: "語彙・語法演習", href: "/english/vocab#usage-practice" }, { label: problem.title }]} />
      <article>
        <LearningPageHeader
          eyebrow={ENGLISH_USAGE_AREA_META[problem.area].label}
          title={problem.title}
          meta={[
            { label: "形式", value: ENGLISH_USAGE_QUESTION_TYPE_LABEL[problem.questionType] },
            { label: "難易度", value: ENGLISH_USAGE_DIFFICULTY_LABEL[problem.difficulty] },
            { label: "想定時間", value: `約${problem.estimatedTime}秒` },
          ]}
        />
        <section aria-label="問題" className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
          <p className="break-words whitespace-pre-wrap text-base leading-8 text-slate-950">{problem.statement}</p>
          <div className="mt-6"><EnglishUsagePractice problem={problem} /></div>
        </section>
        <section aria-label="関連講座" className="mt-8 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-bold text-slate-950">関連講座</h2>
          <Link href={relatedHref} className="mt-3 inline-flex min-h-11 items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 font-bold text-blue-800 hover:bg-blue-100">{relatedLabel}で復習する</Link>
        </section>
        {nextProblem && nextProblem.id !== problem.id && <nav aria-label="次の問題" className="mt-8"><Link href={`/english/vocab/${nextProblem.slug}`} className="flex min-h-12 items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-bold text-emerald-950 hover:bg-emerald-100"><span>次の問題</span><span className="ml-4 text-right text-sm">{nextProblem.title} →</span></Link></nav>}
      </article>
    </LearningPageShell>
  );
}
