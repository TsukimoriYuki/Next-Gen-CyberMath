import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCommonTestProblemLecture } from "@/data/common-test/problem-lectures";
import { CommonTestProblemLecturePage } from "@/components/common-test/problem-lecture/CommonTestProblemLecturePage";
import { SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lecture = getCommonTestProblemLecture(id);
  if (!lecture) return { title: "Not Found" };
  return {
    title: lecture.title,
    description: `${lecture.targetSection}の問題PDFを使い、見るべきポイント・本番での思考順・よくあるミスを整理する問題解体型講座。`,
    alternates: { canonical: `/common-test/problem-lectures/${lecture.id}` },
    openGraph: {
      title: `${lecture.title} | ${SITE_NAME}`,
      description: `${lecture.targetSection}の問題PDFを使った問題解体型講座。`,
      url: `/common-test/problem-lectures/${lecture.id}`,
    },
  };
}

export default async function ProblemLecturePage({ params }: Props) {
  const { id } = await params;
  const lecture = getCommonTestProblemLecture(id);
  if (!lecture) notFound();

  return <CommonTestProblemLecturePage lecture={lecture} />;
}
