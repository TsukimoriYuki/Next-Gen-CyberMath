import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  FileCheck2,
  LibraryBig,
  RefreshCw,
  Route,
  ShieldCheck,
  Target,
} from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";
import { HOME_PRIMARY_ACTIONS, PRIMARY_NAVIGATION } from "@/data/navigation";
import { PUBLIC_SUBJECTS } from "@/data/subjects";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  SubjectCard,
  type LearningAction,
} from "@/components/learning/LearningPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

const LEARNING_PATHS: readonly LearningAction[] = [
  {
    title: "学ぶ",
    description: "単元ごとの講座で、定義・考え方・解法の選び方を理解します。",
    href: "/learn",
    label: "公開中の講座を見る",
    icon: BookOpen,
  },
  {
    title: "問題を解く",
    description: "単元別・目的別の演習で、理解した内容を使える知識に変えます。",
    href: "/practice",
    label: "問題演習を選ぶ",
    icon: Target,
  },
  {
    title: "模試・入試対策",
    description: "本番形式の模試や入試レベルの良問で、時間配分と判断力を確認します。",
    href: "/exams",
    label: "公開中の模試を見る",
    icon: ClipboardCheck,
  },
  {
    title: "復習する",
    description: "間違えた問題と学習履歴を見直し、次に取り組む内容を決めます。",
    href: "/review",
    label: "復習キューを開く",
    icon: RefreshCw,
  },
];

const PUBLIC_LEARNING_PATHS = LEARNING_PATHS.filter((path) =>
  PRIMARY_NAVIGATION.some((item) => item.href === path.href),
);

type LearningRecommendation = Readonly<{
  label: string;
  href: "/math" | "/english" | "/review";
}>;

async function getLearningRecommendation(): Promise<LearningRecommendation | null> {
  const session = await getSession();
  if (!session) return null;
  try {
    const now = new Date();
    const [mathAttempt, englishAttempt, dueReview, latestReview] = await Promise.all([
      prisma.examAttempt.findFirst({
        where: { userId: session.sub },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
      prisma.englishAttempt.findFirst({
        where: { userId: session.sub },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      }),
      prisma.reviewItem.findFirst({
        where: {
          userId: session.sub,
          status: "ACTIVE",
          nextReviewAt: { lte: now },
        },
        orderBy: { nextReviewAt: "asc" },
        select: { id: true },
      }),
      prisma.reviewItem.findFirst({
        where: { userId: session.sub },
        orderBy: { updatedAt: "desc" },
        select: { updatedAt: true },
      }),
    ]);

    if (dueReview) return { label: "今日のおすすめ：復習", href: "/review" };

    const candidates: Array<LearningRecommendation & { updatedAt: Date }> = [];
    if (mathAttempt) {
      candidates.push({ label: "今日のおすすめ：数学", href: "/math", updatedAt: mathAttempt.createdAt });
    }
    if (englishAttempt) {
      candidates.push({ label: "今日のおすすめ：英語", href: "/english", updatedAt: englishAttempt.createdAt });
    }
    if (latestReview) {
      candidates.push({ label: "今日のおすすめ：復習", href: "/review", updatedAt: latestReview.updatedAt });
    }
    return candidates.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())[0] ?? null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const recommendation = await getLearningRecommendation();
  const actions = recommendation
    ? [
        { label: "前回の続き", href: "/mypage" as const, primary: true },
        recommendation,
      ]
    : HOME_PRIMARY_ACTIONS.map((action, index) => ({
        ...action,
        primary: index === 0,
      }));

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="高校生・大学受験生のための学習サービス"
          title="講義、問題演習、模試、復習を一つにつなぐ。"
          description="Cyber Mathは、教科ごとの講座で学び、問題で確かめ、結果を次の復習につなげる受験学習サービスです。"
          actions={actions}
          supporting={
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <Route className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <h2 className="mt-3 text-base font-bold text-slate-950">迷わない学習の流れ</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                教科を選び、講座で理解し、問題で確認し、間違いを復習する順に進めます。
              </p>
            </div>
          }
        />

        <LearningSection
          id="subjects"
          title="教科を選ぶ"
          description="教材と学習機能が公開されている教科だけを表示しています。"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {PUBLIC_SUBJECTS.map((subject) => (
              <SubjectCard key={subject.id} subject={subject} />
            ))}
          </div>
        </LearningSection>

        <LearningSection
          id="paths"
          title="目的から始める"
          description="教科をまたいで、今したい学習から入口を選べます。"
        >
          <LearningActionGrid actions={PUBLIC_LEARNING_PATHS} />
        </LearningSection>

        <LearningSection title="教材を安心して使うために">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <TrustItem
                icon={FileCheck2}
                title="解答と採点を検証"
                description="数式、解答、模試の配点と採点処理を自動QAと重点確認で継続的に検査します。"
              />
              <TrustItem
                icon={LibraryBig}
                title="公開済み教材だけを案内"
                description="中身のない教科や準備段階の教材は、主要な学習導線へ表示しません。"
              />
              <TrustItem
                icon={ShieldCheck}
                title="品質方針を公開"
                description="教材制作、数式表示、誤り報告、公開前QAの考え方を確認できます。"
              />
            </div>
            <Link href="/quality" className="mt-6 inline-flex text-sm font-bold text-blue-700 hover:underline">
              教材・品質方針を見る
            </Link>
          </div>
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileCheck2;
  title: string;
  description: string;
}) {
  return (
    <div>
      <Icon className="h-5 w-5 text-blue-700" aria-hidden="true" />
      <h3 className="mt-3 font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
