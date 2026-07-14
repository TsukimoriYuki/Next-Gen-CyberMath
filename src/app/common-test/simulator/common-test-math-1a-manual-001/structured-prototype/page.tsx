import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "@/data/common-test/manual-mocks/math1a-001";
import { CommonTestMockExamRunner } from "@/components/common-test/mock-exam/CommonTestMockExamRunner";

// 開発・QA用の参照実装。問題本文をReactで再構成した旧バージョンで、
// PDF冊子が正本になったため本番導線からは外している（devOnly）。
export const metadata: Metadata = {
  title: "構造化データ版（開発用プロトタイプ・非公開）",
  description: "問題本文をReactで再構成した開発用プロトタイプです。本番の正本はPDF冊子版です。",
  robots: { index: false, follow: false },
};

export default function StructuredPrototypePage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <CommonTestMockExamRunner exam={COMMON_TEST_MATH_1A_MANUAL_001} />;
}
