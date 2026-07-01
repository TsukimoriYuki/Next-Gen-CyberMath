import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, Target } from "lucide-react";
import { CalcDrillGame } from "@/components/calc/CalcDrillGame";

export const metadata: Metadata = { title: "計算ドリル" };

export default function CalcDrillPage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,210,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,210,255,0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/math"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-white/40 transition-colors hover:text-white/70"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER MATH
        </Link>

        <header className="mt-6 mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(0,210,255,0.07)",
              border: "1px solid rgba(0,210,255,0.22)",
              color: "#00d2ff",
            }}
          >
            <Target className="h-3.5 w-3.5" />
            Calculation Drill · 計算ドリル
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #00d2ff 0%, #ffffff 60%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            計算筋力を鍛えよ
          </h1>
          <p className="mt-2 font-mono text-sm text-white/40">
            展開・因数分解・有理化・対数・三角関数 — 30秒4択で計算速度を磨く
          </p>
        </header>

        <CalcDrillGame />
      </div>
    </div>
  );
}
