import type { Metadata } from "next";
import { Gauge, ListChecks } from "lucide-react";
import { createPublicMetadata } from "@/lib/public-metadata";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";

export const metadata: Metadata = createPublicMetadata({
  title: "計算トレーニング",
  description: "計算の正確性と処理速度を、目的別の2つのモードで練習します。",
  path: "/math/calculation",
});

const CALCULATION_MODES: readonly LearningAction[] = [
  {
    title: "分野別モード",
    description: "展開、因数分解、対数、三角関数などから分野を選び、30秒の4択問題で確認します。",
    href: "/calc-drill",
    label: "分野別モードを始める",
    icon: ListChecks,
  },
  {
    title: "連続スピードモード",
    description: "連続する計算問題を時間内に処理し、正答率と反応速度を確認します。",
    href: "/drill",
    label: "スピードモードを始める",
    icon: Gauge,
  },
];

export default function CalculationTrainingPage() {
  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="数学・計算演習"
          title="計算トレーニング"
          description="同じ計算練習でも、丁寧に正答へ到達する力と、時間内に処理する力は分けて鍛えます。今の目的に合うモードを選んでください。"
          actions={[{ label: "数学トップへ戻る", href: "/math" }]}
        />
        <LearningSection title="モードを選ぶ">
          <LearningActionGrid actions={CALCULATION_MODES} />
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
