import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CommonTestHistoryPanel } from "@/components/common-test/CommonTestHistoryPanel";
import { CommonTestExamHistoryPanel } from "@/components/common-test/CommonTestExamHistoryPanel";

export const metadata: Metadata = {
  title: "演習履歴 — 共通テスト数学 攻略OS",
  description: "共通テスト対策ドリルの演習履歴と自信度分析",
};

export default function CommonTestHistoryPage() {
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
            <span className="text-xs font-semibold text-blue-700">演習履歴</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-blue-400">History</span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            演習履歴
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            自信度×正誤マトリクスで、つまずきの傾向を可視化します。
          </p>
        </header>

        <CommonTestHistoryPanel />

        {/* ── 本番演習の履歴 ─────────────────────────────────────────────── */}
        <section className="mt-12">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-sm font-bold text-slate-900">本番演習の履歴</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-slate-400">Exam History</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <CommonTestExamHistoryPanel />
        </section>
      </div>
    </div>
  );
}
