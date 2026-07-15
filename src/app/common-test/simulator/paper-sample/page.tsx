import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MATH_1A_SECTION_2_PAPER_SAMPLE } from "@/data/exam-papers";
import { ExamPaperRunner } from "@/components/common-test/exam-paper/ExamPaperRunner";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { resolveTopLevelSubjectId } from "@/lib/subject-publication";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = {
  title: "PDF冊子型サンプル演習 — 共通テスト数学",
  description:
    "Cyber Math 共通テスト型模試の問題冊子画像とWebマークシート入力を分けたサンプル演習。",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/common-test/simulator/paper-sample",
  },
  openGraph: {
    title: "PDF冊子型サンプル演習",
    description:
      "問題冊子画像とWebマークシート入力を分けた共通テスト型模試の最小実装サンプル。",
    url: "/common-test/simulator/paper-sample",
  },
};

export default function PaperSampleExamPage() {
  const subjectId = resolveTopLevelSubjectId(
    MATH_1A_SECTION_2_PAPER_SAMPLE.subject,
  );
  if (!subjectId) notFound();

  const resourcePublished = false;
  const access = requireSubjectPageAccess(subjectId, "exams", {
    resourcePublished,
  });

  return (
    <>
      <SubjectPublicationNotice access={access} />
      <ExamPaperRunner paper={MATH_1A_SECTION_2_PAPER_SAMPLE} />
    </>
  );
}
