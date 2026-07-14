import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, History, Layers, Zap } from "lucide-react";
import { CommonTestDailyPlaylistPanel } from "@/components/common-test/CommonTestDailyPlaylistPanel";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "今日の学習メニュー — 共通テスト対策",
  description:
    "共通テスト対策の今日の学習プレイリスト。履歴・目標点・復習キューをもとにルールベースで今日やるべきタスクを表示します。",
};

export default function CommonTestDailyPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5">
            <CalendarDays className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">今日の学習メニュー</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            今日やること
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            演習履歴・目標点・復習キューをもとに、今日取り組むべきタスクを自動で組み立てます。
          </p>
        </header>

        {/* Main playlist panel */}
        <CommonTestDailyPlaylistPanel showFullLink={false} />

        {/* Learning loop */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900">学習ループ</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs text-slate-500">
              このサイクルを繰り返すと、共通テストの得点が着実に上がります。
            </p>
            <ol className="space-y-2">
              {[
                { step: 1, label: "本番演習を受ける", href: "/common-test/simulator", color: "#2563eb" },
                { step: 2, label: "本番分析で結果を確認する", href: "/common-test/history", color: "#0891b2" },
                { step: 3, label: "弱点分析で優先課題を確認する", href: "/common-test/weakness", color: "#e11d48" },
                { step: 4, label: "今日の学習メニューを進める", href: "/common-test/daily", color: "#2563eb" },
                { step: 5, label: "復習キューで定着させる", href: "/common-test/review", color: "#ea580c" },
              ].map(({ step, label, href, color }) => (
                <li key={step}>
                  <a
                    href={href}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 transition-colors hover:border-slate-300 hover:bg-white"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold"
                      style={{ background: `${color}1a`, border: `1px solid ${color}50`, color }}
                    >
                      {step}
                    </span>
                    <span className="text-[13px] text-slate-700">{label}</span>
                    <span className="ml-auto text-slate-300">→</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Quick nav */}
        <section className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900">関連ページ</h2>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              href="/common-test/simulator"
              icon={<Zap className="h-4 w-4 text-blue-600" />}
              label="本番演習"
              sub="模擬試験"
            />
            <QuickLink
              href="/common-test/history"
              icon={<History className="h-4 w-4 text-cyan-600" />}
              label="本番分析"
              sub="演習履歴・弱点レポート"
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
          {SITE_NAME} · 共通テスト対策
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
