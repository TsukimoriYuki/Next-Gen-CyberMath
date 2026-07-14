import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicExamSet, getPublicExamSetCategory } from "@/data/exam-sets";
import { ExamSetRunner } from "@/components/exam-sets/ExamSetRunner";

type Props = {
  params: Promise<{ categoryId: string; subjectId: string; examId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const examSet = getPublicExamSet(examId);
  return {
    title: examSet ? `${examSet.title} | 本番レベル模試集` : "本番レベル模試集",
  };
}

export default async function ExamSetDetailPage({ params }: Props) {
  const { categoryId, subjectId, examId } = await params;
  const category = getPublicExamSetCategory(categoryId);
  const examSet = getPublicExamSet(examId);

  if (!category || !examSet) notFound();
  if (examSet.categoryId !== categoryId || examSet.subjectId !== subjectId) notFound();

  return <ExamSetRunner examSet={examSet} />;
}
