import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, History, Layers, CalendarDays } from "lucide-react";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";

export const metadata: Metadata = {
  title: "弱点攻略 — 共通テスト対策室",
  description:
    "共通テスト対策の弱点一覧。演習履歴・目標点差・時間超過をもとにルールベースで弱点を自動検出し、克服条件と次のアクションを提示します。",
};

export default function CommonTestWeaknessPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(225,29,72,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 420px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent 420px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
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
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1.5">
            <ShieldAlert className="h-4 w-4 text-rose-600" />
            <span className="text-xs font-semibold text-rose-700">弱点攻略</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-rose-400">
              Weakness
            </span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            弱点攻略
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            演習履歴・目標点差・時間超過から弱点を自動で見つけ、克服プランと次のアクションを提示します。
          </p>
        </header>

        {/* Main weakness panel (full view) */}
        <CommonTestWeaknessBossPanel compact={false} showFullLink={false} />

        {/* Quick nav */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900">関連ページ</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              href="/common-test/daily"
              icon={<CalendarDays className="h-4 w-4 text-blue-600" />}
              label="今日の学習メニュー"
              sub="Daily Plan"
            />
            <QuickLink
              href="/common-test/history"
              icon={<History className="h-4 w-4 text-cyan-600" />}
              label="演習履歴 / AI分析"
              sub="AI作戦会議"
            />
            <QuickLink
              href="/common-test/review"
              icon={<Layers className="h-4 w-4 text-orange-600" />}
              label="復習キュー"
              sub="間隔反復演習"
            />
          </div>
        </section>

        {/* Footer */}
        <p className="mt-16 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
          CYBER OS · 共通テスト対策室
        </p>
      </div>
    </div>
  );
}

function QuickLink({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
    >
      <div>{icon}</div>
      <div className="min-w-0">
        <div className="truncate text-xs font-bold text-slate-900">
          {label}
        </div>
        <div className="text-[11px] text-slate-400">{sub}</div>
      </div>
      <div className="ml-auto text-slate-300 transition-colors group-hover:text-slate-500">
        →
      </div>
    </Link>
  );
}
