import type { Metadata } from "next";
import { CommonTestHistoryPanel } from "@/components/common-test/CommonTestHistoryPanel";
import { CommonTestExamHistoryPanel } from "@/components/common-test/CommonTestExamHistoryPanel";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";

export const metadata: Metadata = {
  title: "共通テスト演習履歴",
  description: "共通テスト対策ドリルの演習履歴と自信度分析",
  robots: { index: false, follow: true },
};

export default function CommonTestHistoryPage() {
  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "復習", href: "/review" },
          { label: "共通テスト", href: "/common-test" },
          { label: "演習履歴" },
        ]}
      />
      <LearningPageHeader
        eyebrow="共通テスト"
        title="演習履歴"
        description="大問別演習と本番形式演習の結果を確認し、正誤と自信度から次の復習を決めます。"
      />
      <div className="mt-8">
        <CommonTestHistoryPanel />
      </div>

      <section className="mt-12" aria-labelledby="exam-history">
        <h2 id="exam-history" className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold text-slate-950">
          本番形式演習の履歴
        </h2>
        <CommonTestExamHistoryPanel />
      </section>
    </LearningPageShell>
  );
}
