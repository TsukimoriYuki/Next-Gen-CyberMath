import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { CommonTestReviewQueue } from "@/components/common-test/CommonTestReviewQueue";

export const metadata: Metadata = {
  title: "REVIEW QUEUE — COMMON TEST COMMAND CENTER",
  description: "共通テスト対策の間隔反復復習キュー。弱点問題を自動スケジューリングして反復演習する。",
};

export default function CommonTestReviewPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-60 right-0 h-[500px] w-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">

        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-orange-400/50 transition-colors hover:text-orange-400/80"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.22)", color: "#f97316" }}
          >
            <Layers className="h-3.5 w-3.5" />
            復習キューシステム
          </div>

          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, #ffffff 50%, #fbbf24 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            復習キュー
          </h1>

          <p className="mt-3 max-w-xl font-mono text-sm text-white/40">
            REVIEW QUEUE — 間隔反復で弱点を完全習得する。正解なら次の間隔へ、不正解なら翌日にリセット。
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 max-w-lg">
            {[
              { label: "初回 → 翌日", color: "#f97316" },
              { label: "1回目 → 3日後", color: "#fbbf24" },
              { label: "2回目 → 7日後", color: "#22c55e" },
              { label: "3回目 → 14日後", color: "#38bdf8" },
              { label: "4回目 → MASTERED", color: "#a78bfa" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="font-mono text-[9px] text-white/40">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <CommonTestReviewQueue />

      </div>
    </div>
  );
}
