import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";
import { INFORMATICS_MOCK_EXAM_001 } from "@/data/informatics/mock-exam";
import { createPublicMetadata } from "@/lib/public-metadata";

type Props = { params: Promise<{ examId: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ examId: INFORMATICS_MOCK_EXAM_001.slug ?? INFORMATICS_MOCK_EXAM_001.id }];
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  if (examId !== (INFORMATICS_MOCK_EXAM_001.slug ?? INFORMATICS_MOCK_EXAM_001.id)) return { title: "Not Found" };
  return createPublicMetadata({
    title: INFORMATICS_MOCK_EXAM_001.title,
    description: "60分・100点の完全オリジナル情報Ⅰ共通テスト型模試です。",
    path: `/informatics/mock-exam/${examId}`,
  });
}
export default async function InformaticsMockExamDetailPage({ params }: Props) {
  const { examId } = await params;
  if (examId !== (INFORMATICS_MOCK_EXAM_001.slug ?? INFORMATICS_MOCK_EXAM_001.id)) notFound();
  return <CommonTestMockExamRunner exam={INFORMATICS_MOCK_EXAM_001} />;
}
