import type { Metadata } from "next";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "@/data/common-test/manual-mocks/math1a-001";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";

export const metadata: Metadata = {
  title: "共通テスト型本番模試 数学I・数学A 手動作成版 第1回",
  description:
    "手動作成PDFを正本として転記した、数学I・数学Aの共通テスト型本番模試です。70分、100点満点、4大問構成。",
  alternates: {
    canonical: "/common-test/simulator/common-test-math-1a-manual-001",
  },
};

export default function CommonTestMath1AManual001Page() {
  return <CommonTestMockExamRunner exam={COMMON_TEST_MATH_1A_MANUAL_001} />;
}
