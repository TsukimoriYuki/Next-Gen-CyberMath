import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { CommonTestReviewQueue } from "@/components/common-test/CommonTestReviewQueue";

export const metadata: Metadata = {
  title: "共通テスト復習キュー",
  description: "共通テスト対策の間隔反復復習キュー。弱点問題を自動スケジューリングして反復演習する。",
};

export default function CommonTestReviewPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1.5">
            <Layers className="h-4 w-4 text-orange-600" />
            <span className="text-xs font-semibold text-orange-700">復習キュー</span>
          </div>

          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            復習キュー
          </h1>

          <p className="mt-3 max-w-xl text-sm text-slate-600">
            間隔反復で弱点を定着させます。正解なら次の間隔へ、間違えたら翌日にリセットして復習します。
          </p>

          <div className="mt-5 grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-3">
            {[
              { label: "初回 → 翌日", color: "#ea580c" },
              { label: "1回目 → 3日後", color: "#d97706" },
              { label: "2回目 → 7日後", color: "#059669" },
              { label: "3回目 → 14日後", color: "#2563eb" },
              { label: "4回目 → 克服済み", color: "#7c3aed" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2"
              >
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] text-slate-600">{s.label}</span>
              </div>
            ))}
          </div>
        </header>

        <CommonTestReviewQueue />

      </div>
    </div>
  );
}
