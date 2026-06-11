import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCommonTestExamPreset } from "@/data/common-test-exams";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";
import { CommonTestExamRunner } from "@/components/common-test/exam/CommonTestExamRunner";

interface Props {
  params: Promise<{ examId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const preset = getCommonTestExamPreset(examId);
  if (!preset) return { title: "Not Found" };
  return {
    title: `${preset.title} — EXAM SIMULATOR`,
    description: preset.description,
  };
}

export default async function ExamPage({ params }: Props) {
  const { examId } = await params;
  const preset = getCommonTestExamPreset(examId);
  if (!preset) notFound();

  const questions = getCommonTestExamQuestions(examId);
  if (questions.length === 0) notFound();

  return <CommonTestExamRunner preset={preset} questions={questions} />;
}
