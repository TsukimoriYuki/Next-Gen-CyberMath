import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  CalendarDays,
  GraduationCap,
  History,
  RefreshCw,
  ShieldAlert,
  Target,
  Zap,
} from "lucide-react";
import { COMMON_TEST_SUBJECTS, DAILY_MISSIONS } from "@/data/common-test";
import { CommonTestAnalyticsSummary } from "@/components/common-test/CommonTestAnalyticsSummary";
import { CommonTestLearningPrescription } from "@/components/common-test/CommonTestLearningPrescription";
import { CommonTestMissionCard } from "@/components/common-test/CommonTestMissionCard";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";
import { CommonTestSubjectCard } from "@/components/common-test/CommonTestSubjectCard";
import { CommonTestTargetScorePanel } from "@/components/common-test/CommonTestTargetScorePanel";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";
import { CommonTestLectureSpotlight } from "@/components/lectures/CommonTestLectureSpotlight";

export const metadata: Metadata = {
  title: "共通テスト数学 対策室",
  description:
    "共通テスト数学IA・数学II,B,Cの大問別ドリル、復習キュー、冊子型模試をつなぐ対策ページです。",
  alternates: {
    canonical: "/common-test",
  },
  openGraph: {
    title: "共通テスト数学 対策室 | Cyber Math",
    description:
      "大問別ドリル、復習キュー、講義、冊子型模試で共通テスト数学の現在地と次の一手を確認します。",
    url: "/common-test",
  },
};

export default function CommonTestPage() {
  const mathSubjects = COMMON_TEST_SUBJECTS.filter((subject) => subject.id !== "english-reading");
  const subSubjects = COMMON_TEST_SUBJECTS.filter((subject) => subject.id === "english-reading");

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 480px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 480px)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          ポータルへ戻る
        </Link>

        <header className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">共通テスト数学 対策室</span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            数学IA・数学IIBCを、現在地から逆算して攻略する
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            大問別ドリル、復習キュー、講義、冊子型模試をひとつの学習導線にまとめました。
            診断前は仮スコアを出さず、実際の演習結果から現在地を作ります。
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-8">
          <section className="order-1">
            <CommonTestLearningPrescription />
          </section>

          <section className="order-5 sm:order-2">
            <SectionLabel ja="目標点との差" icon={<Target className="h-4 w-4 text-blue-600" />} />
            <CommonTestTargetScorePanel />
          </section>

          <section className="order-2 sm:order-3">
            <SectionLabel ja="今日の復習" icon={<RefreshCw className="h-4 w-4 text-emerald-600" />} />
            <CommonTestReviewSummary />
          </section>

          <section className="order-6 sm:order-4">
            <SectionLabel ja="特別講義" icon={<GraduationCap className="h-4 w-4 text-violet-600" />} />
            <CommonTestLectureSpotlight />
          </section>

          <section className="order-7 sm:order-5">
            <SectionLabel ja="弱点分析と次の一手" icon={<ShieldAlert className="h-4 w-4 text-rose-600" />} />
            <CommonTestWeaknessBossPanel compact showFullLink={false} />
          </section>

          <section className="order-3 sm:order-6">
            <SectionLabel ja="科目別練習" icon={<BookOpen className="h-4 w-4 text-blue-600" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              {mathSubjects.map((subject) => (
                <CommonTestSubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
            {subSubjects.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {subSubjects.map((subject) => (
                  <CommonTestSubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            )}
          </section>

          <section className="order-4 sm:order-7">
            <SectionLabel ja="本番演習" icon={<Zap className="h-4 w-4 text-blue-600" />} />
            <Link
              href="/common-test/simulator/common-test-math-1a-manual-001"
              className="group flex flex-col gap-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-base font-bold text-slate-900">
                  手動作成版 共通テスト数学IA 第1回を受ける
                </div>
                <p className="text-xs leading-relaxed text-slate-500">
                  PDF本文を正本として転記した4大問 / 100点 / 70分の本番型模試です。
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-blue-700">
                手動版模試を開始
              </span>
            </Link>
          </section>

          <section className="order-8">
            <SectionLabel ja="短時間ドリル" icon={<CalendarDays className="h-4 w-4 text-blue-600" />} />
            <p className="-mt-2 mb-4 text-xs text-slate-500">
              図形、微積分、確率を中心に、今日の練習候補を3つ表示します。
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {DAILY_MISSIONS.map((mission, index) => (
                <CommonTestMissionCard key={mission.id} mission={mission} index={index} />
              ))}
            </div>
          </section>

          <section className="order-9">
            <SectionLabel
              ja="詳細分析・履歴"
              right={
                <Link
                  href="/common-test/history"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900"
                >
                  <History className="h-3.5 w-3.5" />
                  演習履歴
                </Link>
              }
            />
            <CommonTestAnalyticsSummary />
          </section>

          <section className="order-10">
            <SectionLabel ja="学習診断・復習支援" icon={<Brain className="h-4 w-4 text-violet-600" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              <SupportLink
                href="/common-test/history"
                icon={<Brain className="h-5 w-5 text-violet-600" />}
                label="利用可"
                title="本番分析・次の一手"
                body="演習結果から、時間配分・弱点・次に解くべき練習を確認します。"
                cta="弱点レポートを見る"
                tone="violet"
              />
              <SupportLink
                href="/common-test/review"
                icon={<RefreshCw className="h-5 w-5 text-emerald-600" />}
                label="利用可"
                title="復習キュー"
                body="間違えた問題や、もう一度確認したい問題を復習タイミングに合わせて確認します。"
                cta="今日の復習を解く"
                tone="emerald"
              />
            </div>
          </section>
        </div>

        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
          Cyber Math / Common Test Practice
        </p>
      </div>
    </div>
  );
}

function SectionLabel({
  ja,
  icon,
  right,
}: {
  ja: string;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-bold text-slate-900">{ja}</h2>
      </div>
      <div className="h-px flex-1 bg-slate-200" />
      {right}
    </div>
  );
}

function SupportLink({
  href,
  icon,
  label,
  title,
  body,
  cta,
  tone,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  title: string;
  body: string;
  cta: string;
  tone: "violet" | "emerald";
}) {
  const toneClasses =
    tone === "violet"
      ? {
          border: "hover:border-violet-300",
          bg: "bg-violet-50",
          text: "text-violet-700",
          hover: "group-hover:bg-violet-100",
        }
      : {
          border: "hover:border-emerald-300",
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          hover: "group-hover:bg-emerald-100",
        };

  return (
    <Link
      href={href}
      className={`group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all ${toneClasses.border} hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClasses.bg} ring-1 ring-slate-100`}>
          {icon}
        </div>
        <span className={`rounded-full ${toneClasses.bg} px-2 py-0.5 text-[10px] font-bold ${toneClasses.text}`}>
          {label}
        </span>
      </div>
      <div>
        <div className="text-sm font-bold text-slate-900">{title}</div>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{body}</p>
      </div>
      <div className={`mt-auto rounded-lg ${toneClasses.bg} py-2 text-center text-xs font-bold ${toneClasses.text} transition-colors ${toneClasses.hover}`}>
        {cta}
      </div>
    </Link>
  );
}
