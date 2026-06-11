import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommonTestHistoryPanel } from "@/components/common-test/CommonTestHistoryPanel";
import { CommonTestExamHistoryPanel } from "@/components/common-test/CommonTestExamHistoryPanel";

export const metadata: Metadata = {
  title: "演習履歴 — COMMON TEST COMMAND CENTER",
  description: "共通テスト対策ドリルの演習履歴と自信度分析",
};

export default function CommonTestHistoryPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back */}
        <Link
          href="/common-test"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-cyan-400/60 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          COMMAND CENTER へ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] bg-cyan-400/08 border border-cyan-400/20 text-cyan-400 mb-4"
            style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.20)", color: "#38bdf8" }}>
            COMMON TEST
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #38bdf8 0%, #ffffff 55%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            演習履歴
          </h1>
          <p className="mt-3 font-mono text-sm text-white/40">
            DRILL HISTORY — 自信度×正誤マトリクスによる弱点分析
          </p>
        </header>

        <CommonTestHistoryPanel />

        {/* ── Exam Simulator 履歴 ─────────────────────────────────────────── */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
              ◉ EXAM SIMULATOR 履歴
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <CommonTestExamHistoryPanel />
        </section>
      </div>
    </div>
  );
}
