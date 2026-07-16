import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InformaticsProblemPractice } from "@/components/informatics/InformaticsProblemPractice";
import {
  ContentMeta,
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { getCourseSubject } from "@/data/courses";
import {
  INFORMATICS_DIFFICULTY_META,
  INFORMATICS_KIND_META,
  INFORMATICS_PRACTICE_QUESTION_TYPE_LABEL,
  INFORMATICS_PROBLEMS,
  getInformaticsProblem,
  getNextInformaticsProblem,
} from "@/data/informatics/problems";
import { getSubject } from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ problemId: string }>;
}): Promise<Metadata> {
  const { problemId } = await params;
  const problem = getInformaticsProblem(problemId);
  if (!problem || getSubject("informatics")?.status === "hidden") {
    return {
      title: problem ? `${problem.title} | 情報Ⅰ` : "情報Ⅰ",
      robots: { index: false, follow: false },
    };
  }
  return createPublicMetadata({
    title: `${problem.title} | 情報Ⅰ`,
    description: problem.prompt,
    path: `/informatics/problems/${problem.slug ?? problem.id}`,
    openGraphType: "article",
  });
}

export function generateStaticParams() {
  return INFORMATICS_PROBLEMS.map((problem) => ({
    problemId: problem.slug ?? problem.id,
  }));
}

export default async function InformaticsProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = await params;
  const problem = getInformaticsProblem(problemId);
  if (!problem) notFound();

  const subject = getCourseSubject("informatics-1");
  const unit = subject?.units.find((entry) =>
    entry.lessons.some((lesson) => lesson.lessonId === problem.lessonId),
  );
  const lesson = unit?.lessons.find(
    (entry) => entry.lessonId === problem.lessonId,
  );
  const nextProblem = getNextInformaticsProblem(problem.id);
  const formatLabel = problem.questionType
    ? INFORMATICS_PRACTICE_QUESTION_TYPE_LABEL[problem.questionType]
    : INFORMATICS_KIND_META[problem.kind].label;

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "情報Ⅰ", href: "/informatics" },
          { label: "演習問題" },
          { label: problem.title },
        ]}
      />

      <article>
        <LearningPageHeader
          eyebrow="演習問題"
          title={problem.title}
          meta={[
            { label: "形式", value: formatLabel },
            {
              label: "難度",
              value: INFORMATICS_DIFFICULTY_META[problem.difficulty].label,
            },
            { label: "想定時間", value: `約${problem.estimatedMinutes}分` },
          ]}
        />

        <section aria-label="問題" className="mt-8">
          <p className="text-base leading-8 text-slate-800">{problem.prompt}</p>
          <div className="mt-6">
            <InformaticsProblemPractice problem={problem} />
          </div>
        </section>

        <section aria-label="関連講座" className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-lg font-bold text-slate-950">対応する講座</h2>
          {lesson && unit ? (
            <Link
              href={`/courses/informatics-1/${unit.unitId}/${lesson.lessonId}`}
              className="mt-3 flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50/40"
            >
              <span className="font-bold text-slate-900">{lesson.lessonTitle}</span>
              <span className="mt-1 text-sm leading-6 text-slate-600">
                {lesson.lessonDescription}
              </span>
            </Link>
          ) : (
            <p className="mt-3 text-sm text-slate-600">
              対応する講座は準備中です。
            </p>
          )}
          <ContentMeta
            className="mt-4"
            items={[{ label: "復習タグ", value: problem.reviewTags.join(" / ") }]}
          />
        </section>

        {nextProblem && nextProblem.id !== problem.id && (
          <nav aria-label="次の問題" className="mt-8">
            <Link
              href={`/informatics/problems/${nextProblem.slug ?? nextProblem.id}`}
              className="flex min-h-12 items-center justify-between rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 font-bold text-teal-950 transition-colors hover:bg-teal-100"
            >
              <span>次の問題</span>
              <span className="ml-4 text-right text-sm">{nextProblem.title} →</span>
            </Link>
          </nav>
        )}
      </article>
    </LearningPageShell>
  );
}
