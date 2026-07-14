import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpenCheck, Calculator, Files, Layers3, Shuffle, Timer } from "lucide-react";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";
import {
  filterVisibleSubjectsByCapability,
  SUBJECTS,
  type SubjectId,
} from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "問題を解く",
  description: "公開中の教科から、単元別・目的別トレーニングを選ぶページです。",
  path: "/practice",
});

const ACTIONS_BY_SUBJECT = {
  math: [
    { title: "単元別演習", description: "単元と難度を選び、解説つきの数学問題を解きます。", href: "/units", label: "数学の単元を選ぶ", icon: Layers3 },
    { title: "計算トレーニング", description: "分野別の正確性と、連続問題の処理速度を練習します。", href: "/math/calculation", label: "計算モードを選ぶ", icon: Calculator },
    { title: "カスタム演習", description: "範囲、難度、制限時間を選び、自分用の問題セットを作ります。", href: "/mock", label: "演習条件を設定する", icon: Shuffle },
  ],
  english: [
    { title: "速読", description: "制限時間内に英文の要点を読み取る練習です。", href: "/english/speed-reading", label: "速読問題を選ぶ", icon: Timer },
    { title: "精読・構文理解", description: "文法、段落構成、根拠箇所を確認しながら読みます。", href: "/english/comprehension", label: "精読問題を選ぶ", icon: BookOpenCheck },
    { title: "複数資料読解", description: "複数の文章や資料を横断し、条件と根拠を照合します。", href: "/english/multi-source", label: "複数資料問題を選ぶ", icon: Files },
  ],
} satisfies Record<SubjectId, readonly LearningAction[]>;

export default function PracticePage() {
  const subjects = filterVisibleSubjectsByCapability(SUBJECTS, "problems");
  if (subjects.length === 0) notFound();

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero eyebrow="問題を解く" title="目的に合う練習方法を選ぶ。" description="単元、読む速さ、制限時間など、伸ばしたい力に合わせて公開中の問題を選べます。" actions={[{ label: "教科から選ぶ", href: "/subjects" }]} />
        {subjects.map((subject) => (
          <LearningSection key={subject.id} title={subject.name}>
            <LearningActionGrid actions={ACTIONS_BY_SUBJECT[subject.id]} />
          </LearningSection>
        ))}
      </LearningPageContainer>
    </LearningPage>
  );
}
