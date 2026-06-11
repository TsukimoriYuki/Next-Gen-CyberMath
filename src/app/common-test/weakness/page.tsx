import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, History, Layers, CalendarDays } from "lucide-react";
import { CommonTestWeaknessBossPanel } from "@/components/common-test/CommonTestWeaknessBossPanel";

export const metadata: Metadata = {
  title: "弱点攻略システム — COMMON TEST COMMAND CENTER",
  description:
    "共通テスト対策の弱点ボス一覧。演習履歴・目標点差・時間超過をもとにルールベースで弱点を自動検出し、克服条件と次のアクションを提示します。",
};

export default function CommonTestWeaknessPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.012) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial glow — red tint for weakness theme */}
      <div
        className="pointer-events-none absolute -top-60 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-red-400/50 transition-colors hover:text-red-400/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.22)",
              color: "#ef4444",
            }}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            WEAKNESS BOSS SYSTEM
          </div>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background:
                "linear-gradient(135deg, #ef4444 0%, #ffffff 45%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            弱点攻略
            <br />
            システム
          </h1>

          <p className="mt-3 font-mono text-sm text-white/40">
            WEAKNESS BOSS — 演習履歴・目標点差・時間超過から弱点を自動検出し、克服プランを提示
          </p>
        </header>

        {/* Main weakness panel (full view) */}
        <CommonTestWeaknessBossPanel compact={false} showFullLink={false} />

        {/* Quick nav */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              関連ページ
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <QuickLink
              href="/common-test/daily"
              icon={<CalendarDays className="h-4 w-4 text-amber-400" />}
              label="今日の学習メニュー"
              sub="Daily Playlist"
              color="rgba(251,191,36,0.10)"
              border="rgba(251,191,36,0.22)"
            />
            <QuickLink
              href="/common-test/history"
              icon={<History className="h-4 w-4 text-cyan-400" />}
              label="演習履歴 / AI分析"
              sub="AI作戦会議"
              color="rgba(34,211,238,0.10)"
              border="rgba(34,211,238,0.22)"
            />
            <QuickLink
              href="/common-test/review"
              icon={<Layers className="h-4 w-4 text-orange-400" />}
              label="復習キュー"
              sub="間隔反復演習"
              color="rgba(249,115,22,0.10)"
              border="rgba(249,115,22,0.22)"
            />
          </div>
        </section>

        {/* Footer */}
        <p className="mt-16 text-center font-mono text-[10px] tracking-[0.2em] text-white/12 uppercase">
          CYBER OS · Common Test Command Center · Phase 10
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
