import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JapaneseProblemRunner } from "@/components/japanese/JapaneseProblemRunner";
import { JAPANESE_AREA_META, getJapaneseProblem } from "@/data/japanese";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ problemId: string }>;
}): Promise<Metadata> {
  const { problemId } = await params;
  const problem = getJapaneseProblem(problemId);
  return {
    title: problem?.title ?? "国語問題",
    robots: { index: false, follow: false },
  };
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
  return <JapaneseProblemRunner problem={problem} areaLabel={JAPANESE_AREA_META[problem.area].label} />;
}
