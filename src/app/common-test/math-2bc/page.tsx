import type { Metadata } from "next";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import { CommonTestSubjectPage } from "@/components/common-test/CommonTestSubjectPage";

export const metadata: Metadata = {
  title: "数学II・B・C — 共通テスト対策",
  description: "共通テスト 数学II・B・Cの大問別演習・得点別攻略ルート・本番再現シミュレーター。",
};

export default function Math2BCPage() {
  const subject = COMMON_TEST_SUBJECTS_MAP["math-2bc"];
  return <CommonTestSubjectPage subject={subject} />;
}
