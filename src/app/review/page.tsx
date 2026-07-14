import type { Metadata } from "next";
import { BarChart3, History, RefreshCw } from "lucide-react";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";
import { PUBLIC_COMMON_TEST_SUBJECTS } from "@/data/common-test";
import {
  filterVisibleSubjectsByCapability,
  SUBJECTS,
} from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";
import { notFound } from "next/navigation";

export const metadata: Metadata = createPublicMetadata({
  title: "復習",
  description: "数学と英語の学習履歴、間違えた問題、共通テストの復習項目を確認する入口です。",
  path: "/review",
});

const CORE_ACTIONS: readonly LearningAction[] = [
  {
    title: "学習レポート",
    description: "数学と英語の演習履歴、得点推移、弱点、復習状況をまとめて確認します。",
    href: "/mypage",
    label: "マイページを見る",
    icon: BarChart3,
  },
];

const COMMON_TEST_ACTIONS: readonly LearningAction[] = [
  {
    title: "今日の復習",
    description: "共通テスト演習で間違えた問題や、自信がなかった問題を見直します。",
    href: "/common-test/review",
    label: "復習キューを開く",
    icon: RefreshCw,
  },
  {
    title: "共通テスト演習履歴",
    description: "大問別の結果と時間配分を確認し、次に取り組む練習を選びます。",
    href: "/common-test/history",
    label: "演習履歴を見る",
    icon: History,
  },
];

export default function ReviewPage() {
  const reviewSubjects = filterVisibleSubjectsByCapability(SUBJECTS, "review");
  if (reviewSubjects.length === 0) notFound();

  const reviewSubjectIds = new Set(reviewSubjects.map((subject) => subject.id));
  const hasCommonTestReview = PUBLIC_COMMON_TEST_SUBJECTS.some((subject) =>
    reviewSubjectIds.has(subject.parentSubjectId),
  );
  const actions =
    hasCommonTestReview
      ? [...CORE_ACTIONS, ...COMMON_TEST_ACTIONS]
      : CORE_ACTIONS;

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="復習"
          title="結果を見直し、次の学習を決める。"
          description="学習履歴と間違えた問題を確認し、必要な講座や演習へ戻ります。記録がない場合は架空の診断結果を表示しません。"
          actions={[{ label: "教科から学び直す", href: "/subjects" }]}
        />
        <LearningSection title="復習方法を選ぶ">
          <LearningActionGrid actions={actions} />
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
