import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectionPracticeExam } from "@/data/common-test/section-practice";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";
import { SITE_NAME } from "@/lib/site";

interface Props {
  params: Promise<{ practiceId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { practiceId } = await params;
  const exam = getSectionPracticeExam(practiceId);
  if (!exam) return { title: "Not Found" };
  const section = exam.sections[0];
  return {
    title: exam.title,
    description: `${section?.theme ?? ""}を、誘導つきの大問1問分の演習で練習します。`,
    alternates: {
      canonical: `/common-test/practice/${exam.id}`,
    },
    openGraph: {
      title: `${exam.title} | ${SITE_NAME}`,
      description: `${section?.theme ?? ""}を、誘導つきの大問1問分の演習で練習します。`,
      url: `/common-test/practice/${exam.id}`,
    },
  };
}

export default async function SectionPracticePage({ params }: Props) {
  const { practiceId } = await params;
  const exam = getSectionPracticeExam(practiceId);
  if (!exam) notFound();

  return <CommonTestMockExamRunner exam={exam} />;
}
