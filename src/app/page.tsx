import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      {/* Two subject panels */}
      <div className="relative w-full max-w-4xl">
        <div className="grid gap-5 sm:grid-cols-2">

          {/* ── CYBER MATH ───────────────────────────────── */}
          <Link
            href="/math"
            className="group relative block overflow-hidden rounded-3xl transition-all duration-500"
            style={{
              background:
                "linear-gradient(145deg, rgba(0,210,255,0.06) 0%, rgba(0,0,0,0.5) 50%, rgba(255,0,170,0.05) 100%)",
              border: "1px solid rgba(0,210,255,0.2)",
              boxShadow: "0 0 0 0 rgba(0,210,255,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 60px rgba(0,210,255,0.18), 0 0 120px rgba(255,0,170,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(0,210,255,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 0 rgba(0,210,255,0)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(0,210,255,0.2)";
            }}
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
                入室する
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>

          {/* ── CYBER ENGLISH ────────────────────────────── */}
          <Link
            href="/english"
            className="group relative block overflow-hidden rounded-3xl transition-all duration-500"
            style={{
              background:
                "linear-gradient(145deg, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0.5) 50%, rgba(250,204,21,0.05) 100%)",
              border: "1px solid rgba(16,185,129,0.2)",
              boxShadow: "0 0 0 0 rgba(16,185,129,0)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 60px rgba(16,185,129,0.18), 0 0 120px rgba(250,204,21,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(16,185,129,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 0 rgba(16,185,129,0)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(16,185,129,0.2)";
            }}
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
                入室する
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom tagline */}
        <p className="mt-10 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          Select a subject · start the session · exceed your limits
        </p>
      </div>
    </div>
  );
}
