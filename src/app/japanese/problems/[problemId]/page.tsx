import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { JapaneseProblemRunner } from "@/components/japanese/JapaneseProblemRunner";
import { JAPANESE_AREA_META, getJapaneseProblem } from "@/data/japanese";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";
import { createPublicMetadata } from "@/lib/public-metadata";
import { getJapaneseRelatedCourseLinks } from "@/data/courses/japanese";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ problemId: string }>;
}): Promise<Metadata> {
  const { problemId } = await params;
  const problem = getJapaneseProblem(problemId);
  if (problem?.area === "modern-reading") {
    return { title: problem.title, robots: { index: false, follow: true } };
  }
  if (!problem) return { title: "国語問題", robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: problem.title,
    description: `${JAPANESE_AREA_META[problem.area].label}の選択式問題です。本文根拠と全選択肢の理由を確認できます。`,
    path: `/japanese/problems/${problem.slug}`,
    openGraphType: "article",
  });
}

export default async function JapaneseProblemPage({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  requireSubjectPageAccess("japanese", "problems");
  const { problemId } = await params;
  const problem = getJapaneseProblem(problemId);
  if (!problem) notFound();
  if (problem.area === "modern-reading" && problem.passageId) {
    redirect(`/japanese/reading/${problem.passageId}`);
  }
  return <JapaneseProblemRunner problem={problem} areaLabel={JAPANESE_AREA_META[problem.area].label} relatedCourses={getJapaneseRelatedCourseLinks(problem.relatedCourseIds)} />;
}
