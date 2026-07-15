import type { Metadata } from "next";
import {
  BarChart3,
  BookOpen,
  Calculator,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers3,
  RefreshCw,
  Route,
  Shuffle,
  Target,
  Trophy,
} from "lucide-react";
import { getChallengeProblems, getProblem, formatDateJP } from "@/lib/content";
import type { Problem } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import { createPublicMetadata } from "@/lib/public-metadata";
import { PUBLIC_COURSE_SUBJECTS } from "@/data/course-curriculum";
import { isVisibleSubject, requireSubject } from "@/data/subjects";
import { DailyTriple } from "@/components/daily/DailyTriple";
import { EmergencyMissionPanel } from "@/components/mission/EmergencyMissionPanel";
import { MessageBar } from "@/components/messages/MessageBar";
import {
  LearningActionGrid,
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
  type LearningAction,
} from "@/components/learning/LearningPage";

export const dynamic = "force-dynamic";

const MATH_SUBJECT = requireSubject("math");

export const metadata: Metadata = isVisibleSubject(MATH_SUBJECT)
  ? createPublicMetadata({
      title: MATH_SUBJECT.name,
      description: MATH_SUBJECT.description,
      path: MATH_SUBJECT.href,
    })
  : { title: MATH_SUBJECT.name, robots: { index: false, follow: false } };

function getPublishedUnitCount(subjectId: string): number {
  return PUBLIC_COURSE_SUBJECTS.find((subject) => subject.subjectId === subjectId)?.units.length ?? 0;
}

const LEARN_ACTIONS: readonly LearningAction[] = [
  {
    title: "数学IAの講座",
    description: "数と式、二次関数、図形、データ、確率を単元順に学びます。",
    href: "/courses/math-1a",
    label: "数学IAを学ぶ",
    icon: BookOpen,
    meta: `${getPublishedUnitCount("math-1a")}単元を公開中`,
  },
  {
    title: "数学II・B・Cの講座",
    description: "式、三角関数、指数・対数、微積分、数列、統計、ベクトルを学びます。",
    href: "/courses/math-2bc",
    label: "数学II・B・Cを学ぶ",
    icon: GraduationCap,
    meta: `${getPublishedUnitCount("math-2bc")}単元を公開中`,
  },
];

const PRACTICE_ACTIONS: readonly LearningAction[] = [
  {
    title: "単元別演習",
    description: "学習したい単元と難度を選び、解説つきの問題に取り組みます。",
    href: "/units",
    label: "単元を選ぶ",
    icon: Layers3,
  },
  {
    title: "カスタム演習",
    description: "学習範囲、難度、制限時間を選び、自分用の問題セットを作ります。",
    href: "/mock",
    label: "演習条件を設定する",
    icon: Shuffle,
  },
  {
    title: "計算トレーニング",
    description: "正確性を重視するモードと、時間内の処理速度を鍛えるモードを選べます。",
    href: "/math/calculation",
    label: "計算モードを選ぶ",
    icon: Calculator,
  },
  {
    title: "挑戦問題",
    description: "発展・最難関レベルの問題から、ランダムに1問を選んで取り組みます。",
    href: "/challenge-problems",
    label: "挑戦問題を選ぶ",
    icon: Target,
  },
];

const EXAM_ACTIONS: readonly LearningAction[] = [
  {
    title: "入試良問演習",
    description: "大学入試の典型テーマをもとにしたオリジナル類題を、複数解法で学びます。",
    href: "/dojo",
    label: "良問演習を始める",
    icon: Trophy,
  },
  {
    title: "共通テスト数学IA",
    description: "大問別練習、問題解体型講座、70分のオリジナル模試を利用できます。",
    href: "/common-test/math-1a",
    label: "数学IA対策を開く",
    icon: ClipboardCheck,
  },
  {
    title: "共通テスト数学II・B・C",
    description: "必答・選択大問を分け、単元別に時間配分と判断順を練習します。",
    href: "/common-test/math-2bc",
    label: "数学II・B・C対策を開く",
    icon: Route,
  },
  {
    title: "問題解体型講座",
    description: "問題PDFを見ながら、最初に見る条件、解法選択、誤答、検算を確認します。",
    href: "/common-test/problem-lectures",
    label: "講座を選ぶ",
    icon: FileText,
  },
  {
    title: "オリジナル模試",
    description: "PDF冊子とWeb解答欄を使い、部分点を含む採点と復習まで行えます。",
    href: "/common-test/simulator",
    label: "公開中の模試を見る",
    icon: ClipboardCheck,
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
    title: "学習レポート",
    description: "数学と英語の演習履歴、得点推移、弱点、復習状況をまとめて確認します。",
    href: "/mypage",
    label: "マイページを見る",
    icon: BarChart3,
  },
];

async function getDailyProblems(now: Date): Promise<Problem[]> {
  const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  try {
    const challenges = await prisma.dailyChallenge.findMany({
      where: { date: todayUTC },
      include: { problem: { select: { slug: true } } },
      orderBy: { slot: "asc" },
    });
    if (challenges.length === 3) {
      const problems = challenges
        .map((challenge) => getProblem(challenge.problem.slug))
        .filter((problem): problem is Problem => problem !== undefined);
      if (problems.length === 3) return problems;
    }
  } catch {
    // Static fallback keeps the public page available without a database.
  }
  return getChallengeProblems(now);
}

export default async function MathHomePage() {
  const now = new Date();
  const daily = MATH_SUBJECT.capabilities.problems
    ? await getDailyProblems(now)
    : [];

  return (
    <LearningPage>
      <LearningPageContainer>
        <MessageBar />
        <LearningPageHero
          eyebrow="数学"
          title="理解したことを、解ける力につなげる。"
          description="講座で考え方を学び、単元別演習と模試で確かめ、間違いを復習します。基礎から入試最難関まで、目的に合う入口を選べます。"
          actions={[
            ...(MATH_SUBJECT.capabilities.problems
              ? [{ label: "今日の3問を解く", href: "#daily" as const, primary: true }]
              : []),
            ...(MATH_SUBJECT.capabilities.courses
              ? [{ label: "講座を選ぶ", href: "#learn" as const }]
              : []),
          ]}
          supporting={
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-bold text-blue-700">おすすめの進め方</p>
              <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                <li>1. 講座で考え方を確認する</li>
                <li>2. 単元別演習で使ってみる</li>
                <li>3. 模試と復習で定着を確かめる</li>
              </ol>
            </div>
          }
        />

        {MATH_SUBJECT.capabilities.problems && (
          <>
            <div className="mt-14 sm:mt-16">
              <DailyTriple problems={daily} dateLabel={formatDateJP(now)} />
            </div>
            <EmergencyMissionPanel />
          </>
        )}

        {MATH_SUBJECT.capabilities.courses && (
          <LearningSection id="learn" title="学ぶ" description="新課程の単元順に、公開済みの体系講座から選べます。">
            <LearningActionGrid actions={LEARN_ACTIONS} />
          </LearningSection>
        )}

        {MATH_SUBJECT.capabilities.problems && (
          <LearningSection id="practice" title="問題を解く" description="単元、目的、時間に合わせて演習方法を選びます。">
            <LearningActionGrid actions={PRACTICE_ACTIONS} />
          </LearningSection>
        )}

        {MATH_SUBJECT.capabilities.exams && (
          <LearningSection id="exam" title="模試・入試対策" description="本番形式の演習と、問題の読み方を学ぶ講座をまとめています。">
            <LearningActionGrid actions={EXAM_ACTIONS} />
          </LearningSection>
        )}

        {MATH_SUBJECT.capabilities.review && (
          <LearningSection id="review" title="復習・学習レポート" description="結果を見直し、次に取り組む内容へつなげます。">
            <LearningActionGrid actions={REVIEW_ACTIONS} />
          </LearningSection>
        )}
      </LearningPageContainer>
    </LearningPage>
  );
}
