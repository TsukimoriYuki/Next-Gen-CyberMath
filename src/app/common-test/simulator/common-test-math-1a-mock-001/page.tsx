import type { Metadata } from "next";
import { COMMON_TEST_MATH_1A_MOCK_001 } from "@/data/common-test-mock-exams";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";

export const metadata: Metadata = {
  title: "Cyber Math 共通テスト数学IA 本番模試 第1回",
  description:
    "70分・100点満点・5大問構成の共通テスト数学IA本番模試。図表、グラフ、会話文、空欄補充、選択肢、復習用解説を含む完全オリジナル問題です。",
  alternates: {
    canonical: "/common-test/simulator/common-test-math-1a-mock-001",
  },
  openGraph: {
    title: "Cyber Math 共通テスト数学IA 本番模試 第1回",
    description:
      "目標平均38〜45点の本番型数学IA模試。提出後に大問別得点と弱点タグを確認できます。",
    url: "/common-test/simulator/common-test-math-1a-mock-001",
  },
};

export default function CommonTestMath1AMock001Page() {
  return <CommonTestMockExamRunner exam={COMMON_TEST_MATH_1A_MOCK_001} />;
}
