import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, History, Zap, Brain, RefreshCw, CalendarDays, ShieldAlert, BookOpen, GraduationCap, Target } from "lucide-react";
import { COMMON_TEST_SUBJECTS, DAILY_MISSIONS } from "@/data/common-test";
import { CommonTestTargetScorePanel } from "@/components/common-test/CommonTestTargetScorePanel";
import { CommonTestMissionCard } from "@/components/common-test/CommonTestMissionCard";
import { CommonTestSubjectCard } from "@/components/common-test/CommonTestSubjectCard";
import { CommonTestAnalyticsSummary } from "@/components/common-test/CommonTestAnalyticsSummary";
import { CommonTestReviewSummary } from "@/components/common-test/CommonTestReviewSummary";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";
import { CommonTestLearningPrescription } from "@/components/common-test/CommonTestLearningPrescription";
import { CommonTestLectureSpotlight } from "@/components/lectures/CommonTestLectureSpotlight";

export const metadata: Metadata = {
  title: "共通テスト数学 攻略OS",
  description:
    "共通テスト数学IA・数学II/B/Cの目標点差、復習キュー、大問別演習、本番演習をつなぐ戦術学習OS。",
};

export default function CommonTestPage() {
  const mathSubjects = COMMON_TEST_SUBJECTS.filter((s) => s.id !== "english-reading");
  const subSubjects = COMMON_TEST_SUBJECTS.filter((s) => s.id === "english-reading");

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* Subtle academic grid — cyber accent, very faint */}
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

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          ポータルへ戻る
        </Link>

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <header className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">共通テスト数学 攻略OS</span>
          </div>

          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            数学IA・数学II/B/Cを、目標点から逆算して攻略する
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            今日やる大問、復習すべき問題、本番で落としている点をひとつの導線に整理しました。
            英語Rはβ版のサブ科目として残し、まず数学の得点を伸ばします。
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-8">
          {/* ══ TODAY ACTION ═══════════════════════════════════════════════════ */}
          <section className="order-1">
            <CommonTestLearningPrescription />
          </section>

          {/* ══ SCORE TRACKER ═════════════════════════════════════════════════ */}
          <section className="order-5 sm:order-2">
            <SectionLabel ja="目標点との差" icon={<Target className="h-4 w-4 text-blue-600" />} />
            <CommonTestTargetScorePanel />
          </section>

          {/* ══ REVIEW QUEUE SUMMARY ══════════════════════════════════════════ */}
          <section className="order-2 sm:order-3">
            <SectionLabel ja="今日の復習" icon={<RefreshCw className="h-4 w-4 text-emerald-600" />} />
            <CommonTestReviewSummary />
          </section>

          <section className="order-6 sm:order-4">
            <SectionLabel ja="特別講義" icon={<GraduationCap className="h-4 w-4 text-violet-600" />} />
            <CommonTestLectureSpotlight />
          </section>

          {/* ══ WEAKNESS ══════════════════════════════════════════════════════ */}
          <section className="order-7 sm:order-5">
            <SectionLabel ja="弱点分析と次の一手" icon={<ShieldAlert className="h-4 w-4 text-rose-600" />} />
            <CommonTestWeaknessBossPanel compact={true} showFullLink={false} />
          </section>

          {/* ══ SUBJECT ACCESS BOARD ══════════════════════════════════════════ */}
          <section className="order-3 sm:order-6">
            <SectionLabel ja="科目別演習" icon={<BookOpen className="h-4 w-4 text-blue-600" />} />
            <div className="grid gap-4 sm:grid-cols-2">
              {mathSubjects.map((s) => (
                <CommonTestSubjectCard key={s.id} subject={s} />
              ))}
            </div>
            {subSubjects.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {subSubjects.map((s) => (
                  <CommonTestSubjectCard key={s.id} subject={s} />
                ))}
              </div>
            )}
          </section>

          {/* ══ EXAM SIMULATOR ════════════════════════════════════════════════ */}
          <section className="order-4 sm:order-7">
            <SectionLabel ja="本番演習" icon={<Zap className="h-4 w-4 text-blue-600" />} />
            <Link
              href="/common-test/simulator"
              className="group flex flex-col gap-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm transition-all hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-0.5 text-base font-bold text-slate-900">70分で数学の本番演習をする</div>
                <p className="text-xs leading-relaxed text-slate-500">
                  時間内スコアで本番力、時間外スコアで知識の上限を確認します。数IA・数IIBCを優先表示します。
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-blue-700">
                本番演習へ
              </span>
            </Link>
          </section>

          {/* ══ TODAY'S MISSIONS ══════════════════════════════════════════════ */}
          <section className="order-8">
            <SectionLabel ja="短時間ドリル" icon={<CalendarDays className="h-4 w-4 text-blue-600" />} />
            <p className="-mt-2 mb-4 text-xs text-slate-500">
              図形・微積・確率を中心に、今日の演習候補を3つだけ表示します。
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {DAILY_MISSIONS.map((m, i) => (
                <CommonTestMissionCard key={m.id} mission={m} index={i} />
              ))}
            </div>
          </section>

          {/* ══ ANALYTICS SUMMARY ════════════════════════════════════════════ */}
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

          {/* ══ ANALYSIS / REVIEW SUPPORT ════════════════════════════════════ */}
          <section className="order-10">
            <SectionLabel ja="学習診断・復習支援" icon={<Brain className="h-4 w-4 text-violet-600" />} />
            <div className="grid gap-4 sm:grid-cols-2">

            {/* 学習診断 */}
            <Link
              href="/common-test/history"
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-violet-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 ring-1 ring-violet-100">
                  <Brain className="h-5 w-5 text-violet-600" />
                </div>
                <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-600">
                  利用可
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">本番分析・次の一手</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  本番演習の結果から、時間配分・弱点・次にやるべき演習を分析します。
                </p>
              </div>
              <div className="mt-auto rounded-lg bg-violet-50 py-2 text-center text-xs font-bold text-violet-700 transition-colors group-hover:bg-violet-100">
                履歴から弱点レポートを見る
              </div>
            </Link>

            {/* 復習キュー */}
            <Link
              href="/common-test/review"
              className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                  <RefreshCw className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                  利用可
                </span>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">復習キュー</div>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">
                  間違えた問題や再確認したい問題を、復習タイミングに合わせて確認します。
                </p>
              </div>
              <div className="mt-auto rounded-lg bg-emerald-50 py-2 text-center text-xs font-bold text-emerald-700 transition-colors group-hover:bg-emerald-100">
                今日の復習を解く
              </div>
            </Link>

            </div>
          </section>
        </div>

        {/* Footer label */}
        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
          CYBER OS · 共通テスト対策室
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
  icon?: React.ReactNode;
  right?: React.ReactNode;
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
