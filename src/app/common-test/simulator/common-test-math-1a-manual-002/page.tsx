import type { Metadata } from "next";
import { COMMON_TEST_MATH_1A_MANUAL_002 } from "@/data/common-test/manual-mocks/math1a-002";
import { CommonTestPdfMockViewer } from "@/components/common-test/mock-exam/CommonTestPdfMockViewer";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: `${COMMON_TEST_MATH_1A_MANUAL_002.title} | Cyber Math`,
  description:
    "PDF冊子を正本として表示する、共通テスト型本番模試 数学I・数学A 手動作成版 第2回です。70分、100点満点、4大問構成。",
  path: "/common-test/simulator/common-test-math-1a-manual-002",
});

export default function CommonTestMath1AManual002Page() {
  return <CommonTestPdfMockViewer exam={COMMON_TEST_MATH_1A_MANUAL_002} />;
}
