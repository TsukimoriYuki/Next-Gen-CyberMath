import Link from "next/link";
import { ArrowRight, ChevronLeft, Timer, BookOpen } from "lucide-react";

export default function EnglishHomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-black text-white overflow-hidden">

      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(250,204,21,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          ポータルへ戻る
        </Link>

        {/* Header */}
        <header className="mt-8 text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            Subject 02
          </div>

          <h1
            className="mt-4 font-display text-5xl font-extrabold tracking-tight sm:text-6xl"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #ffffff 55%, #facc15 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CYBER English
          </h1>

          <p className="mt-4 font-mono text-sm text-white/40 tracking-[0.15em]">
            R E A D · A N A L Y Z E · M A S T E R
          </p>
          <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed text-white/50">
            速読から精読まで、英語力を根本から解体して再構築する。
            タイムプレッシャーと構文解析で、本物の読解力を鍛える。
          </p>
        </header>

        {/* Content panels */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">

          {/* ── 速読長文 ──────────────────────────────────── */}
          <Link
            href="/english/speed-reading"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(16,185,129,0.08) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(16,185,129,0.22)",
            }}
          >
            {/* Shimmer */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(16,185,129,0.1), transparent)",
              }}
            />

            <div className="relative p-8">
              {/* Icon */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  border: "1px solid rgba(16,185,129,0.3)",
                }}
              >
                <Timer className="h-7 w-7" style={{ color: "#10b981" }} />
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  Mode 01
                </div>
                <h2
                  className="mt-1.5 font-display text-2xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #6ee7b7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  速読長文
                </h2>
                <p
                  className="font-mono text-xs tracking-[0.15em]"
                  style={{ color: "rgba(16,185,129,0.6)" }}
                >
                  Speed Reading
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  制限時間内に長文を読み切り、記憶だけで設問に答える。
                  スピードと集中力を極限まで高める特訓モード。
                </p>
              </div>

              <div
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  color: "#10b981",
                }}
              >
                挑戦する
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* ── 長文読解＆文法 ────────────────────────────── */}
          <Link
            href="/english/comprehension"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(250,204,21,0.06) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(250,204,21,0.2)",
            }}
          >
            {/* Shimmer */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(250,204,21,0.08), transparent)",
              }}
            />

            <div className="relative p-8">
              {/* Icon */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(250,204,21,0.1)",
                  border: "1px solid rgba(250,204,21,0.28)",
                }}
              >
                <BookOpen className="h-7 w-7" style={{ color: "#facc15" }} />
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  Mode 02
                </div>
                <h2
                  className="mt-1.5 font-display text-2xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #facc15, #fef08a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  長文読解＆文法
                </h2>
                <p
                  className="font-mono text-xs tracking-[0.15em]"
                  style={{ color: "rgba(250,204,21,0.55)" }}
                >
                  Comprehension
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/50">
                  じっくりと構文を解析し、文法知識と読解力を同時に鍛える。
                  論理的思考で英文の構造を完全に解体する精読モード。
                </p>
              </div>

              <div
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(250,204,21,0.08)",
                  border: "1px solid rgba(250,204,21,0.3)",
                  color: "#facc15",
                }}
              >
                学習する
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Footer tagline */}
        <p className="mt-12 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          Cyber English · Coming Soon · Build in progress
        </p>
      </div>
    </div>
  );
}
