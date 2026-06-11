import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, History, Layers, Zap } from "lucide-react";
import { CommonTestDailyPlaylistPanel } from "@/components/common-test/CommonTestDailyPlaylistPanel";

export const metadata: Metadata = {
  title: "今日の学習メニュー — COMMON TEST COMMAND CENTER",
  description:
    "共通テスト対策の今日の学習プレイリスト。履歴・目標点・復習キューをもとにルールベースで今日やるべきタスクを表示します。",
};

export default function CommonTestDailyPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-400/50 transition-colors hover:text-amber-400/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.22)",
              color: "#fbbf24",
            }}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            DAILY STUDY PLAYLIST
          </div>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background:
                "linear-gradient(135deg, #fbbf24 0%, #ffffff 50%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            今日の学習メニュー
          </h1>

          <p className="mt-3 font-mono text-sm text-white/40">
            TODAY&apos;S STUDY PLAYLIST — 履歴・目標点・復習キューをもとに今日やるべきタスクを表示
          </p>
        </header>

        {/* Main playlist panel */}
        <CommonTestDailyPlaylistPanel showFullLink={false} />

        {/* Quick nav */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              関連ページ
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              href="/common-test/simulator"
              icon={<Zap className="h-4 w-4 text-amber-400" />}
              label="EXAM SIMULATOR"
              sub="本番形式演習"
              color="rgba(251,191,36,0.18)"
              border="rgba(251,191,36,0.25)"
            />
            <QuickLink
              href="/common-test/history"
              icon={<History className="h-4 w-4 text-cyan-400" />}
              label="演習履歴 / AI分析"
              sub="AI作戦会議"
              color="rgba(34,211,238,0.12)"
              border="rgba(34,211,238,0.22)"
            />
            <QuickLink
              href="/common-test/review"
              icon={<Layers className="h-4 w-4 text-orange-400" />}
              label="復習キュー"
              sub="間隔反復演習"
              color="rgba(249,115,22,0.12)"
              border="rgba(249,115,22,0.22)"
            />
          </div>
        </section>

        {/* Footer */}
        <p className="mt-16 text-center font-mono text-[10px] tracking-[0.2em] text-white/12 uppercase">
          CYBER OS · Common Test Command Center · Daily Playlist
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
  color,
  border,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  color: string;
  border: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-xl p-4 transition-all hover:opacity-80"
      style={{ background: color, border: `1px solid ${border}` }}
    >
      <div>{icon}</div>
      <div className="min-w-0">
        <div className="font-mono text-[10px] font-bold text-white/80 truncate">
          {label}
        </div>
        <div className="font-mono text-[9px] text-white/35">{sub}</div>
      </div>
      <div className="ml-auto font-mono text-[10px] text-white/25 transition-all group-hover:text-white/50">
        →
      </div>
    </Link>
  );
}
