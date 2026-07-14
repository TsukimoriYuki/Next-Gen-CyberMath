import type { Metadata } from "next";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "@/data/common-test/manual-mocks/math1a-001";
import { CommonTestPdfMockViewer } from "@/components/common-test/mock-exam/CommonTestPdfMockViewer";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "共通テスト数学I・数学A オリジナル模試 第1回",
  description:
    "オリジナルPDFを正本として表示する、数学I・数学Aの共通テスト型本番模試です。70分、100点満点、4大問構成。",
  path: "/common-test/simulator/common-test-math-1a-manual-001",
});

export default function CommonTestMath1AManual001Page() {
  return <CommonTestPdfMockViewer exam={COMMON_TEST_MATH_1A_MANUAL_001} />;
}
