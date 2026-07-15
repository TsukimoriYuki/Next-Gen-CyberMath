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
  getInformaticsProblem,
} from "@/data/informatics/problems";

// hidden 教科配下のため index させない（production では layout guard により404）。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ problemId: string }>;
}): Promise<Metadata> {
  const { problemId } = await params;
  const problem = getInformaticsProblem(problemId);
  return {
    title: problem ? `${problem.title} | 情報Ⅰ` : "情報Ⅰ",
    robots: { index: false, follow: false },
  };
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
            { label: "形式", value: INFORMATICS_KIND_META[problem.kind].label },
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
      </article>
    </LearningPageShell>
  );
}
