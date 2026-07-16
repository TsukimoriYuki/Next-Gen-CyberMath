import type { Metadata } from "next";
import { InformaticsExamHistory } from "@/components/informatics/InformaticsExamHistory";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
} from "@/components/learning/LearningPage";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "情報Ⅰ 受験履歴",
  description: "情報Ⅰの大問別演習とオリジナル模試の受験結果を確認します。",
  path: "/informatics/history",
});
export default function InformaticsHistoryPage() {
  return (
    <LearningPage><LearningPageContainer>
      <LearningPageHero eyebrow="情報Ⅰ β" title="受験履歴" description="この端末に保存された結果を大問別に確認し、再挑戦できます。" actions={[{ label: "模試へ", href: "/informatics/mock-exam", primary: true }, { label: "情報Ⅰトップ", href: "/informatics" }]} />
      <LearningSection title="保存済みの結果"><InformaticsExamHistory /></LearningSection>
    </LearningPageContainer></LearningPage>
  );
}
