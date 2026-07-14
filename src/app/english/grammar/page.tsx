import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, PenLine } from "lucide-react";
import { GrammarDrillGame } from "@/components/english/GrammarDrillGame";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "文法ドリル | CYBER English",
  description: "共通テストや大学入試で問われる英文法を反復するドリルです。",
  path: "/english/grammar",
});

export default function GrammarPage() {
  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER English
        </Link>

        <header className="mt-6 mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(167,139,250,0.07)",
              border: "1px solid rgba(167,139,250,0.22)",
              color: "#a78bfa",
            }}
          >
            <PenLine className="h-3.5 w-3.5" />
            Grammar Drill · 文法ドリル
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl"
          >
            文法ドリル
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            仮定法・分詞構文・関係詞・倒置・強調構文 — 入試頻出5項目を4択で徹底演習
          </p>
        </header>

        <GrammarDrillGame />
      </div>
    </div>
  );
}
