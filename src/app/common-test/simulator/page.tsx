import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, FileText, Zap } from "lucide-react";
import { getAllCommonTestExamPresets } from "@/data/common-test-exams";
import type { CommonTestExamPreset } from "@/data/common-test-exams";
import {
  MATH_1A_PAPER_001,
  MATH_1A_SECTION_2_PAPER_SAMPLE,
  getExamPaperStats,
} from "@/data/exam-papers";
import { getExamQuestionSummary } from "@/lib/common-test-exams";

export const metadata: Metadata = {
  title: "本番演習 — 共通テスト対策室",
  description:
    "共通テスト本番形式70/80分模擬試験。時間内スコア・時間外スコアの二重評価で本番対応力を測定する。",
};

const SUBJECT_ORDER: Record<string, number> = {
  "math-1a": 0,
  "math-2bc": 1,
  "english-reading": 2,
};

const SUBJECT_NAMES: Record<string, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学II・B・C",
  "english-reading": "英語リーディング",
};

export default function SimulatorIndexPage() {
  const fullPaperStats = getExamPaperStats(MATH_1A_PAPER_001);
  const samplePaperStats = getExamPaperStats(MATH_1A_SECTION_2_PAPER_SAMPLE);
  const presets = [...getAllCommonTestExamPresets()].sort((a, b) => {
    const sa = SUBJECT_ORDER[a.subjectId] ?? 9;
    const sb = SUBJECT_ORDER[b.subjectId] ?? 9;
    if (sa !== sb) return sa - sb;
    return a.id.localeCompare(b.id);
  });

  // 科目ごとにグループ化
  const grouped = presets.reduce<Record<string, CommonTestExamPreset[]>>((acc, p) => {
    (acc[p.subjectId] ??= []).push(p);
    return acc;
  }, {});
  const subjectIds = Object.keys(grouped).sort(
    (a, b) => (SUBJECT_ORDER[a] ?? 9) - (SUBJECT_ORDER[b] ?? 9),
  );

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 420px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 420px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          <ArrowLeft className="h-4 w-4" />
          対策室へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">本番演習</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            数学の本番力を測る
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
            数学IA・数学II/B/Cを70分で解き、時間内スコアと時間外スコアの差から次に伸ばす大問を決めます。
          </p>

          {/* Dual score explanation */}
          <div className="mt-6 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">時間内スコア</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Time-limit</span>
              </div>
              <div className="text-xs leading-relaxed text-slate-500">
                時間内に回答した問題の正答数。これが本番の実力です。
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-1 flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">時間外スコア</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400">Unlimited</span>
              </div>
              <div className="text-xs leading-relaxed text-slate-500">
                時間を気にせず全問回答した場合の正答数。知識の上限を示します。
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8 grid gap-4">
          <div className="rounded-2xl border border-blue-200 bg-white p-5 shadow-sm ring-1 ring-blue-50">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  <FileText className="h-3.5 w-3.5" />
                  新形式：冊子型 共通テスト数学IA 第1回
                </div>
                <h2 className="mt-3 text-xl font-extrabold text-slate-950">
                  問題冊子画像 + Webマークシートで70分演習
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {fullPaperStats.sectionCount}大問 / {fullPaperStats.questionCount}小問 /{" "}
                  {fullPaperStats.answerSlotCount}マーク / {MATH_1A_PAPER_001.durationMin}分。
                  提出後に大問別得点、マーク単位の正誤、復習導線を確認できます。
                </p>
              </div>
              <Link
                href="/common-test/simulator/math-1a-paper-001"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
              >
                <FileText className="h-4 w-4" />
                第1回を開始する
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-600">
                  <FileText className="h-3.5 w-3.5 text-blue-600" />
                  新形式：冊子型サンプル
                </div>
                <h2 className="mt-3 text-lg font-extrabold text-slate-950">
                  数学IA 第2問だけで操作を試す
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {samplePaperStats.sectionCount}大問 / {samplePaperStats.questionCount}小問 /{" "}
                  {samplePaperStats.answerSlotCount}マーク / {MATH_1A_SECTION_2_PAPER_SAMPLE.durationMin}分。
                  冊子画像とマーク欄を分けたUIの軽い確認用です。
                </p>
              </div>
              <Link
                href="/common-test/simulator/paper-sample"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-slate-800"
              >
                <FileText className="h-4 w-4" />
                サンプルを開く
              </Link>
            </div>
          </div>
        </section>

        {/* Exam preset cards — 科目ごと */}
        {subjectIds.map((subjectId) => {
          const isSubSubject = subjectId === "english-reading";
          return (
          <section key={subjectId} className={`mb-8 ${isSubSubject ? "opacity-80" : ""}`}>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ background: grouped[subjectId][0]?.theme.primary }}
                />
                {SUBJECT_NAMES[subjectId] ?? subjectId}
                {isSubSubject && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-100">
                    先行公開 / サブ科目
                  </span>
                )}
              </h2>
              <div className="h-px flex-1 bg-slate-200" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {grouped[subjectId].map((preset) => (
                <ExamPresetCard key={preset.id} preset={preset} />
              ))}
            </div>
          </section>
        );})}

        <footer className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
          CYBER OS · 本番演習
        </footer>
      </div>
    </div>
  );
}

function ExamPresetCard({ preset }: { preset: CommonTestExamPreset }) {
  const minutes = preset.examLimitSec / 60;
  const summary = getExamQuestionSummary(preset);

  return (
    <div className={`relative flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md ${
      preset.subjectId === "english-reading" ? "opacity-90" : ""
    }`}>
      {/* Icon + round badge */}
      <div className="flex items-center justify-between">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-xs font-extrabold"
          style={{
            background: `${preset.theme.primary}12`,
            color: preset.theme.primary,
            borderColor: `${preset.theme.primary}33`,
          }}
        >
          {preset.icon}
        </div>
        {preset.roundLabel && (
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-bold"
            style={{ background: `${preset.theme.primary}12`, color: preset.theme.primary }}
          >
            {preset.roundLabel}
          </span>
        )}
      </div>

      {/* Title */}
      <div>
        <div className="mb-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
          旧形式：Web大問演習
        </div>
        <div className="text-base font-extrabold leading-tight text-slate-900">
          {preset.subjectId === "math-1a"
            ? "数学IA"
            : preset.subjectId === "math-2bc"
            ? "数学II・B・C"
            : "英語リーディング"}
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-slate-500">
          {preset.shortTitle}
        </div>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-2">
        <StatPill icon={<Clock className="h-3 w-3" />} label={`${minutes}分`} />
        <StatPill icon={<BookOpen className="h-3 w-3" />} label={summary.sectionCountLabel} />
        <StatPill icon={<Zap className="h-3 w-3" />} label={summary.questionCountLabel} />
      </div>

      {/* Description */}
      <p className="flex-1 text-[11px] leading-relaxed text-slate-500">
        {preset.subjectId === "english-reading"
          ? "先行公開中のサブ科目です。数学演習後の補強として利用します。"
          : preset.description}
      </p>

      {/* Start button */}
      <Link
        href={`/common-test/simulator/${preset.id}`}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white transition-colors hover:bg-blue-700 active:scale-[0.98]"
      >
        <Zap className="h-3.5 w-3.5" />
        {minutes}分で本番演習する
      </Link>
    </div>
  );
}

function StatPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] text-slate-600 ring-1 ring-slate-200">
      <span className="text-slate-400">{icon}</span>
      {label}
    </div>
  );
}
