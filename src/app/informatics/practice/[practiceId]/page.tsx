import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";
import {
  getInformaticsSectionPractice,
  INFORMATICS_SECTION_PRACTICES,
} from "@/data/informatics/exam-practice";
import { createPublicMetadata } from "@/lib/public-metadata";

type Props = { params: Promise<{ practiceId: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INFORMATICS_SECTION_PRACTICES.map((exam) => ({
    practiceId: exam.slug ?? exam.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { practiceId } = await params;
  const exam = getInformaticsSectionPractice(practiceId);
  if (!exam) return { title: "Not Found" };
  return createPublicMetadata({
    title: `${exam.title}｜情報Ⅰ 大問別演習`,
    description: exam.sections[0]?.theme ?? "情報Ⅰの共通テスト型大問別演習です。",
    path: `/informatics/practice/${practiceId}`,
  });
}

export default async function InformaticsPracticeDetailPage({ params }: Props) {
  const { practiceId } = await params;
  const exam = getInformaticsSectionPractice(practiceId);
  if (!exam) notFound();
  return <CommonTestMockExamRunner exam={exam} />;
}
