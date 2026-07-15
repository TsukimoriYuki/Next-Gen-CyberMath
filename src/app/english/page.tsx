import type { Metadata } from "next";
import {
  BarChart3,
  BookOpen,
  BookOpenCheck,
  Clock3,
  Files,
  GraduationCap,
  Languages,
  PenLine,
} from "lucide-react";
import { createPublicMetadata } from "@/lib/public-metadata";
import { isVisibleSubject, requireSubject } from "@/data/subjects";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";

const ENGLISH_SUBJECT = requireSubject("english");

export const metadata: Metadata = isVisibleSubject(ENGLISH_SUBJECT)
  ? createPublicMetadata({
      title: ENGLISH_SUBJECT.name,
      description: ENGLISH_SUBJECT.description,
      path: ENGLISH_SUBJECT.href,
    })
  : { title: ENGLISH_SUBJECT.name, robots: { index: false, follow: false } };

const LEARN_ACTIONS: readonly LearningAction[] = [
  {
    title: "英単語",
    description: "入試頻出語彙をフラッシュカードで反復し、知っている語と復習する語を分けます。",
    href: "/english/vocab",
    label: "単語学習を始める",
    icon: Languages,
  },
  {
    title: "英文法",
    description: "仮定法、分詞構文、関係詞、倒置、強調構文を4択問題で確認します。",
    href: "/english/grammar",
    label: "文法問題を解く",
    icon: PenLine,
  },
];

const PRACTICE_ACTIONS: readonly LearningAction[] = [
  {
    title: "速読トレーニング",
    description: "制限時間内に英文を読み、要点を保ったまま設問へ答える練習です。",
    href: "/english/speed-reading",
    label: "速読問題を選ぶ",
    icon: Clock3,
  },
  {
    title: "精読・構文理解",
    description: "段落構成、文法、根拠箇所を確認しながら、解答までの判断を整えます。",
    href: "/english/comprehension",
    label: "精読問題を選ぶ",
    icon: BookOpenCheck,
  },
  {
    title: "複数資料読解",
    description: "複数の文章や資料を横断し、条件と根拠を照合する力を鍛えます。",
    href: "/english/multi-source",
    label: "複数資料問題を選ぶ",
    icon: Files,
  },
];

const EXAM_ACTIONS: readonly LearningAction[] = [
  {
    title: "共通テスト英語リーディング",
    description: "大問別に情報検索、資料照合、要約、推論を練習し、時間配分を確認します。",
    href: "/common-test/english-reading",
    label: "共通テスト対策を開く",
    icon: BookOpen,
  },
  {
    title: "私大レベル別・入試良問演習",
    description: "大学群の出題傾向を参考にしたオリジナル問題で、速読・精読・文法を確認します。",
    href: "/english/dojo",
    label: "入試形式演習を始める",
    icon: GraduationCap,
  },
];

const REVIEW_ACTIONS: readonly LearningAction[] = [
  {
    title: "学習レポート",
    description: "英語の学習回数と正答率、数学を含む復習状況をマイページで確認します。",
    href: "/mypage",
    label: "学習履歴を見る",
    icon: BarChart3,
  },
];

export default function EnglishHomePage() {
  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="英語"
          title="語彙と文法を、読解の判断力につなげる。"
          description="英単語と文法を確認し、速読・精読・複数資料の演習へ進みます。大学入試と共通テストに必要な読み方を、目的別に練習できます。"
          actions={[
            ...(ENGLISH_SUBJECT.capabilities.problems
              ? [{ label: "練習方法を選ぶ", href: "#practice" as const, primary: true }]
              : []),
            ...(ENGLISH_SUBJECT.capabilities.courses
              ? [{ label: "学ぶ内容を選ぶ", href: "#learn" as const }]
              : []),
          ]}
          supporting={
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold text-blue-700">おすすめの進め方</p>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>1. 語彙と文法の不足を補う</li>
                <li>2. 精読で根拠を確認する</li>
                <li>3. 速読と試験形式で時間を測る</li>
              </ol>
            </div>
          }
        />

        {ENGLISH_SUBJECT.capabilities.courses && (
          <LearningSection id="learn" title="学ぶ" description="英文を読むための語彙と文法を整えます。">
            <LearningActionGrid actions={LEARN_ACTIONS} />
          </LearningSection>
        )}

        {ENGLISH_SUBJECT.capabilities.problems && (
          <LearningSection id="practice" title="問題を解く" description="読む速さ、根拠の確認、複数資料の照合を分けて練習します。">
            <LearningActionGrid actions={PRACTICE_ACTIONS} />
          </LearningSection>
        )}

        {ENGLISH_SUBJECT.capabilities.exams && (
          <LearningSection id="exam" title="試験対策" description="共通テストと私大入試を想定した公開済み演習へ進めます。">
            <LearningActionGrid actions={EXAM_ACTIONS} />
          </LearningSection>
        )}

        {ENGLISH_SUBJECT.capabilities.review && (
          <LearningSection id="review" title="復習・学習レポート">
            <LearningActionGrid actions={REVIEW_ACTIONS} />
          </LearningSection>
        )}
      </LearningPageContainer>
    </LearningPage>
  );
}
