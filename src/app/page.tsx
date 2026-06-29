import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Cpu } from "lucide-react";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

export default function PortalPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-black px-4 py-16 overflow-hidden">

      {/* Ambient grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(20,20,40,0.8) 0%, transparent 70%)",
        }}
      />

      {/* Header label */}
      <div className="relative mb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-white/30">
          Next-Gen · Education Platform
        </p>
        <h1 className="mt-3 font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
          C Y B E R
        </h1>
        <p className="mt-1 font-mono text-sm tracking-[0.5em] text-white/40 uppercase">
          Choose your subject
        </p>
      </div>

      {/* Subject panels */}
      <div className="relative w-full max-w-4xl">
        <div className="grid gap-5 sm:grid-cols-2">

          {/* ── CYBER MATH ───────────────────────────────── */}
          <Link
            href="/math"
            aria-label="数学トップを開く"
            className="group relative block overflow-hidden rounded-3xl transition-all duration-500 hover:[box-shadow:var(--math-hover-shadow)] hover:[border-color:rgba(0,210,255,0.5)]"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,210,255,0.06) 0%, rgba(0,0,0,0.5) 50%, rgba(255,0,170,0.05) 100%)",
              border: "1px solid rgba(0,210,255,0.2)",
              boxShadow: "0 0 0 0 rgba(0,210,255,0)",
              "--math-hover-shadow": "0 0 60px rgba(0,210,255,0.18), 0 0 120px rgba(255,0,170,0.08)",
            } as React.CSSProperties}
          >
            {/* Shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,210,255,0.08), transparent)",
              }}
            />

            <div className="relative flex flex-col items-center gap-6 px-8 py-14 text-center">
              {/* Icon */}
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-4xl font-bold transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,210,255,0.15), rgba(255,0,170,0.1))",
                  border: "1px solid rgba(0,210,255,0.3)",
                  color: "#00d2ff",
                  fontFamily: "var(--font-display, 'Orbitron', sans-serif)",
                  textShadow: "0 0 20px rgba(0,210,255,0.6)",
                }}
              >
                Σ
              </div>

              {/* Label */}
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                  Subject 01
                </div>
                <h2
                  className="mt-2 font-display text-4xl font-extrabold tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #00d2ff 0%, #ffffff 50%, #ff00aa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  MATH
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  数学の美しさと真の理解を追求する。
                  <br />
                  基礎 A から深淵 OLYMPIAD まで。
                </p>
              </div>

              {/* CTA */}
              <div
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(0,210,255,0.1)",
                  border: "1px solid rgba(0,210,255,0.35)",
                  color: "#00d2ff",
                }}
              >
                数学トップを開く
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* ── CYBER ENGLISH ────────────────────────────── */}
          <Link
            href="/english"
            aria-label="英語トレーニングを開く"
            className="group relative block overflow-hidden rounded-3xl transition-all duration-500 hover:[box-shadow:var(--en-hover-shadow)] hover:[border-color:rgba(16,185,129,0.5)]"
            style={{
              background:
                "linear-gradient(145deg, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0.5) 50%, rgba(250,204,21,0.05) 100%)",
              border: "1px solid rgba(16,185,129,0.2)",
              boxShadow: "0 0 0 0 rgba(16,185,129,0)",
              "--en-hover-shadow": "0 0 60px rgba(16,185,129,0.18), 0 0 120px rgba(250,204,21,0.08)",
            } as React.CSSProperties}
          >
            {/* Shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(16,185,129,0.08), transparent)",
              }}
            />

            <div className="relative flex flex-col items-center gap-6 px-8 py-14 text-center">
              {/* Icon */}
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl text-4xl font-bold transition-transform duration-300 group-hover:scale-110"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(250,204,21,0.1))",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10b981",
                  fontFamily: "var(--font-display, 'Orbitron', sans-serif)",
                  textShadow: "0 0 20px rgba(16,185,129,0.6)",
                  fontSize: "1.8rem",
                  letterSpacing: "0.05em",
                }}
              >
                En
              </div>

              {/* Label */}
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
                  Subject 02
                </div>
                <h2
                  className="mt-2 font-display text-4xl font-extrabold tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #10b981 0%, #ffffff 50%, #facc15 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ENGLISH
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  速読から精読まで、英語力を解体して再構築。
                  <br />
                  Reading · Grammar · Comprehension
                </p>
              </div>

              {/* CTA */}
              <div
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.35)",
                  color: "#10b981",
                }}
              >
                英語トレーニングを開く
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* ── COMMON TEST COMMAND CENTER (full-width mega card) ─────────── */}
        <Link
          href="/common-test"
          aria-label="共通テスト対策室を開く"
          className="group relative mt-5 block overflow-hidden rounded-3xl transition-all duration-500"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(0,0,0,0.6) 40%, rgba(34,211,238,0.06) 70%, rgba(168,85,247,0.06) 100%)",
            border: "1px solid rgba(251,191,36,0.22)",
            boxShadow: "0 0 0 0 rgba(251,191,36,0)",
          }}
        >
          {/* Shimmer */}
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            style={{ background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.08), rgba(34,211,238,0.05), transparent)" }}
          />

          {/* Holographic scan lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(251,191,36,0.06) 3px, rgba(251,191,36,0.06) 4px)",
            }}
          />

          {/* Glowing corner dots */}
          <span
            className="pointer-events-none absolute top-4 right-5 h-2 w-2 rounded-full animate-pulse"
            style={{ background: "#fbbf24", boxShadow: "0 0 10px #fbbf24, 0 0 20px rgba(251,191,36,0.5)" }}
          />
          <span
            className="pointer-events-none absolute bottom-4 left-5 h-1.5 w-1.5 rounded-full"
            style={{ background: "#22d3ee", boxShadow: "0 0 8px #22d3ee" }}
          />

          <div className="relative flex flex-col items-center gap-5 px-8 py-10 text-center sm:flex-row sm:text-left sm:items-center">

            {/* Icon */}
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(34,211,238,0.10), rgba(168,85,247,0.10))",
                border: "1px solid rgba(251,191,36,0.3)",
                boxShadow: "0 0 20px rgba(251,191,36,0.15), inset 0 0 20px rgba(251,191,36,0.05)",
              }}
            >
              <Cpu className="h-9 w-9" style={{ color: "#fbbf24", filter: "drop-shadow(0 0 8px rgba(251,191,36,0.8))" }} />
            </div>

            {/* Text block */}
            <div className="flex-1">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-white/35">
                Exam Strategy · Phase 1
              </div>
              <h2
                className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
                style={{
                  background: "linear-gradient(135deg, #fbbf24 0%, #ffffff 45%, #22d3ee 80%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                COMMON TEST
              </h2>
              <p
                className="mt-0.5 font-mono text-xs tracking-[0.18em]"
                style={{ color: "rgba(251,191,36,0.55)" }}
              >
                COMMAND CENTER
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/45 max-w-lg">
                数学IA · 数学II/B/C · 英語Rを統合管理。大問別演習から本番再現まで、
                共通テストを完全攻略する戦術プラットフォーム。
              </p>

              {/* Subject chips */}
              <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                {[
                  { label: "数学IA", color: "#00d2ff" },
                  { label: "数学II・B・C", color: "#a855f7" },
                  { label: "英語R", color: "#10b981" },
                ].map(({ label, color }) => (
                  <span
                    key={label}
                    className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold"
                    style={{
                      background: `rgba(${hexToRgb(color)},0.10)`,
                      border: `1px solid rgba(${hexToRgb(color)},0.28)`,
                      color,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="shrink-0 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-sm font-semibold transition-all duration-300 group-hover:gap-3"
              style={{
                background: "rgba(251,191,36,0.10)",
                border: "1px solid rgba(251,191,36,0.35)",
                color: "#fbbf24",
              }}
            >
              共通テスト対策室を開く
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </Link>

        {/* Bottom tagline */}
        <p className="mt-10 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          Select a subject · start the session · exceed your limits
        </p>
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "255,255,255";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}
