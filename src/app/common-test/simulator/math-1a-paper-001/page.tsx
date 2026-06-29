import type { Metadata } from "next";
import { MATH_1A_PAPER_001 } from "@/data/exam-papers";
import { ExamPaperRunner } from "@/components/common-test/exam-paper/ExamPaperRunner";

export const metadata: Metadata = {
  title: "共通テスト型 数学IA 70分模試 第1回 — Cyber Math",
  description:
    "4大問、22小問、56マーク、100点満点の冊子型数学IA模試。問題冊子画像とWebマークシートで本番形式に近く演習できます。",
  alternates: {
    canonical: "/common-test/simulator/math-1a-paper-001",
  },
  openGraph: {
    title: "共通テスト型 数学IA 70分模試 第1回 | Cyber Math",
    description:
      "4大問、22小問、56マーク、100点満点の冊子型数学IA模試。提出後に大問別得点と復習導線を確認できます。",
    url: "/common-test/simulator/math-1a-paper-001",
  },
};

export default function Math1APaper001Page() {
  return <ExamPaperRunner paper={MATH_1A_PAPER_001} />;
}
