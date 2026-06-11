import type { Metadata } from "next";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import { CommonTestSubjectPage } from "@/components/common-test/CommonTestSubjectPage";

export const metadata: Metadata = {
  title: "英語リーディング — 共通テスト対策",
  description: "共通テスト 英語リーディングの大問別演習・得点別攻略ルート・本番再現シミュレーター。",
};

export default function EnglishReadingPage() {
  const subject = COMMON_TEST_SUBJECTS_MAP["english-reading"];
  return <CommonTestSubjectPage subject={subject} />;
}
