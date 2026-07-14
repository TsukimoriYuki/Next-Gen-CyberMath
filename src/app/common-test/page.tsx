import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  History,
  RefreshCw,
  Timer,
} from "lucide-react";
import {
  DAILY_MISSIONS,
  PUBLIC_COMMON_TEST_SUBJECTS,
} from "@/data/common-test";
import {
  filterVisibleSubjectsByCapability,
  SUBJECTS,
} from "@/data/subjects";
import { CommonTestSubjectCard } from "@/components/common-test/CommonTestSubjectCard";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "共通テスト対策",
  description:
    "数学と英語の大問別演習、問題解体型講座、冊子型模試、復習を教科ごとに選べる共通テスト対策ページです。",
  path: "/common-test",
});

const MATH_EXAM_ACTIONS: readonly LearningAction[] = [
  {
    title: "オリジナル模試",
    description: "PDF冊子とWeb解答欄を使い、部分点を含む採点と復習まで行えます。",
    href: "/common-test/simulator",
    label: "公開中の模試を見る",
    icon: ClipboardCheck,
  },
  {
    title: "問題解体型講座",
    description: "問題PDFを見ながら、最初に見る条件、解法選択、誤答、検算を確認します。",
    href: "/common-test/problem-lectures",
    label: "講座を選ぶ",
    icon: FileText,
  },
];

const REVIEW_ACTIONS: readonly LearningAction[] = [
  {
    title: "今日の復習",
    description: "間違えた問題と自信がなかった問題を、復習タイミングに合わせて確認します。",
    href: "/common-test/review",
    label: "復習キューを開く",
    icon: RefreshCw,
  },
  {
    title: "演習履歴・弱点分析",
    description: "大問別の結果と時間配分を確認し、次に取り組む練習を選びます。",
    href: "/common-test/history",
    label: "演習履歴を見る",
    icon: History,
  },
];

const RELATED_MATH_ACTIONS: readonly LearningAction[] = [
  { title: "二次関数", description: "軸、定義域、端点比較、場合分けを確認します。", href: "/units/quadratic-functions", label: "二次関数を練習する", icon: BookOpen },
  { title: "図形と計量", description: "三角比、正弦定理、余弦定理、面積を確認します。", href: "/units/measurement-trigonometry", label: "図形と計量を練習する", icon: BookOpen },
  { title: "場合の数と確率", description: "順列・組合せ、余事象、条件付き確率を確認します。", href: "/units/counting-probability", label: "確率を練習する", icon: BookOpen },
  { title: "データの分析", description: "分散、標準偏差、相関、箱ひげ図を確認します。", href: "/units/data-analysis", label: "データ分析を練習する", icon: BookOpen },
];

export default function CommonTestPage() {
  if (PUBLIC_COMMON_TEST_SUBJECTS.length === 0) notFound();

  const hasPublishedMath = PUBLIC_COMMON_TEST_SUBJECTS.some(
    (subject) => subject.parentSubjectId === "math",
  );
  const publicCommonTestSubjectIds = new Set(
    PUBLIC_COMMON_TEST_SUBJECTS.map((subject) => subject.id),
  );
  const reviewSubjectIds = new Set(
    filterVisibleSubjectsByCapability(SUBJECTS, "review").map(
      (subject) => subject.id,
    ),
  );
  const hasPublishedReview = PUBLIC_COMMON_TEST_SUBJECTS.some((subject) =>
    reviewSubjectIds.has(subject.parentSubjectId),
  );
  const dailyActions: readonly LearningAction[] = DAILY_MISSIONS.filter((mission) =>
    publicCommonTestSubjectIds.has(mission.subjectId),
  ).map((mission) => ({
    title: `${mission.subjectLabel} ${mission.sectionTitle}`,
    description: mission.purpose,
    href: mission.href as `/${string}`,
    label: `${mission.recommendedMinutes}分の練習を始める`,
    icon: Timer,
    meta: mission.difficulty === "SPRINT" ? "短時間" : "大問別",
  }));

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="共通テスト対策"
          title="教科ごとの練習を、本番の得点につなげる。"
          description="公開中の教科について、大問別演習、講座、模試をまとめています。診断前は仮スコアを出さず、実際の演習結果を学習履歴に反映します。"
          actions={[
            { label: "科目別対策を選ぶ", href: "#subjects", primary: true },
            ...(hasPublishedMath
              ? [{ label: "模試・講座を見る", href: "#exam" as const }]
              : []),
          ]}
        />

        <LearningSection
          id="subjects"
          title="科目別対策"
          description="取り組む教科と科目を選び、大問別の練習へ進みます。"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PUBLIC_COMMON_TEST_SUBJECTS.map((subject) => (
              <CommonTestSubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </LearningSection>

        {hasPublishedMath && (
          <LearningSection
            id="exam"
            title="本番形式・問題の読み方"
            description="時間を測る模試と、判断の順序を学ぶ講座を分けて選べます。"
          >
            <LearningActionGrid actions={MATH_EXAM_ACTIONS} />
          </LearningSection>
        )}

        {dailyActions.length > 0 && (
          <LearningSection title="短時間の大問別練習">
            <LearningActionGrid actions={dailyActions} />
          </LearningSection>
        )}

        {hasPublishedReview && (
          <LearningSection title="復習・学習レポート">
            <LearningActionGrid actions={REVIEW_ACTIONS} />
          </LearningSection>
        )}

        {hasPublishedMath && (
          <LearningSection
            title="関連する数学演習"
            description="共通テスト演習で止まった単元を、単元別問題で確認し直せます。"
          >
            <LearningActionGrid actions={RELATED_MATH_ACTIONS} />
          </LearningSection>
        )}
      </LearningPageContainer>
    </LearningPage>
  );
}
