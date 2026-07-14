import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MATH_1A_SECTION_2_PAPER_SAMPLE } from "@/data/exam-papers";
import { ExamPaperRunner } from "@/components/common-test/exam-paper/ExamPaperRunner";

export const metadata: Metadata = {
  title: "PDF冊子型サンプル演習 — 共通テスト数学",
  description:
    "Cyber Math 共通テスト型模試の問題冊子画像とWebマークシート入力を分けたサンプル演習。",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/common-test/simulator/paper-sample",
  },
  openGraph: {
    title: "PDF冊子型サンプル演習 | Cyber Math Next-Gen",
    description:
      "問題冊子画像とWebマークシート入力を分けた共通テスト型模試の最小実装サンプル。",
    url: "/common-test/simulator/paper-sample",
  },
};

export default function PaperSampleExamPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ExamPaperRunner paper={MATH_1A_SECTION_2_PAPER_SAMPLE} />;
}
