import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, Timer, BookOpen, Layers, PenLine, CreditCard, GraduationCap } from "lucide-react";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "CYBER English",
  description: "速読・精読・複数資料・文法・語彙を横断して学ぶ英語学習ページです。",
  path: "/english",
});

export default function EnglishHomePage() {
  return (
    <div className="english-academic relative min-h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 text-slate-900">

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

          <p className="mt-4 text-sm font-semibold text-slate-500">
            読む・整理する・根拠を選ぶ
          </p>
          <p className="mt-3 max-w-lg mx-auto text-sm leading-relaxed text-slate-600">
            速読から精読まで、大学入試と共通テストに必要な読解力を段階的に伸ばします。
            英文の根拠を丁寧に確認し、解答までの判断を安定させましょう。
          </p>
        </header>

        {/* Content panels */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">

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
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  制限時間内に長文を読み、要点を保持したまま設問に答えます。
                  処理速度と内容把握のバランスを整える練習です。
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
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  英文を段落・構文・根拠に分けて読みます。
                  文法知識と読解判断を結びつける精読演習です。
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

          {/* ── マルチソース照合 ──────────────────────────── */}
          <Link
            href="/english/multi-source"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(139,92,246,0.07) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            {/* Shimmer */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(139,92,246,0.09), transparent)",
              }}
            />

            <div className="relative p-8">
              {/* Icon */}
              <div
                className="flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <Layers className="h-7 w-7" style={{ color: "#8b5cf6" }} />
              </div>

              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  Mode 03
                </div>
                <h2
                  className="mt-1.5 font-display text-2xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  マルチソース照合
                </h2>
                <p
                  className="font-mono text-xs tracking-[0.15em]"
                  style={{ color: "rgba(139,92,246,0.6)" }}
                >
                  Multi-Source Reading
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  複数の資料を横断して条件を照合します。
                  共通テストで問われる情報整理と根拠確認の練習です。
                </p>
              </div>

              <div
                className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  color: "#8b5cf6",
                }}
              >
                挑戦する
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </div>

        {/* ── 私立文系 過去問道場（フルワイド） ─────────────────────────────── */}
        <Link
          href="/english/dojo"
          className="group relative mt-6 block overflow-hidden rounded-2xl transition-all duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,121,249,0.10) 0%, rgba(245,158,11,0.06) 50%, rgba(0,0,0,0.5) 100%)",
            border: "1px solid rgba(232,121,249,0.28)",
          }}
        >
          {/* Shimmer */}
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(232,121,249,0.10), transparent)",
            }}
          />
          {/* Glow dot */}
          <span
            className="pointer-events-none absolute top-4 right-5 h-2 w-2 rounded-full animate-pulse"
            style={{ background: "#e879f9", boxShadow: "0 0 8px #e879f9" }}
          />

          <div className="relative flex items-center gap-6 p-6 sm:p-7">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                background: "rgba(232,121,249,0.12)",
                border: "1px solid rgba(232,121,249,0.35)",
              }}
            >
              <GraduationCap className="h-7 w-7" style={{ color: "#e879f9" }} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Private University
              </div>
              <h2
                className="mt-1 font-display text-2xl font-extrabold"
                style={{
                  background: "linear-gradient(135deg, #e879f9, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                私立文系 過去問道場
              </h2>
              <p className="font-mono text-xs tracking-[0.12em]" style={{ color: "rgba(232,121,249,0.6)" }}>
                MARCH · 関関同立 · 日東駒専 · 産近甲龍
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/50">
                志望校群別の英語過去問を速読・精読・文法の3科目で一括攻略。
                大学群ごとの傾向を把握し、合格ラインに必要な読解・文法力を整理します。
              </p>
            </div>

            <div
              className="shrink-0 hidden sm:flex items-center gap-1.5 rounded-lg px-4 py-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
              style={{
                background: "rgba(232,121,249,0.10)",
                border: "1px solid rgba(232,121,249,0.32)",
                color: "#e879f9",
              }}
            >
              英語過去問演習を始める
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        </Link>

        {/* Secondary row — vocab & grammar */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* ── 英単語フラッシュカード ─────────────────────── */}
          <Link
            href="/english/vocab"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(16,185,129,0.06) 0%, rgba(0,0,0,0.45) 100%)",
              border: "1px solid rgba(16,185,129,0.18)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(16,185,129,0.08), transparent)",
              }}
            />
            <div className="relative p-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.28)",
                }}
              >
                <CreditCard className="h-6 w-6" style={{ color: "#10b981" }} />
              </div>
              <div className="mt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  Mode 04
                </div>
                <h2
                  className="mt-1 font-display text-xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #6ee7b7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  英単語フラッシュカード
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  頻出語彙 B1〜C1 をフリップカード形式で反復。知ってた / もう一度で定着を加速。
                </p>
              </div>
              <div
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(16,185,129,0.08)",
                  border: "1px solid rgba(16,185,129,0.28)",
                  color: "#10b981",
                }}
              >
                暗記開始
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

          {/* ── 文法ドリル ─────────────────────────────────── */}
          <Link
            href="/english/grammar"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(145deg, rgba(167,139,250,0.07) 0%, rgba(0,0,0,0.45) 100%)",
              border: "1px solid rgba(167,139,250,0.18)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(167,139,250,0.08), transparent)",
              }}
            />
            <div className="relative p-6">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(167,139,250,0.1)",
                  border: "1px solid rgba(167,139,250,0.28)",
                }}
              >
                <PenLine className="h-6 w-6" style={{ color: "#a78bfa" }} />
              </div>
              <div className="mt-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                  Mode 05
                </div>
                <h2
                  className="mt-1 font-display text-xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  文法ドリル
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  仮定法・分詞構文・関係詞・倒置・強調構文。入試頻出5項目を4択で集中訓練。
                </p>
              </div>
              <div
                className="mt-4 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                style={{
                  background: "rgba(167,139,250,0.08)",
                  border: "1px solid rgba(167,139,250,0.28)",
                  color: "#a78bfa",
                }}
              >
                ドリル開始
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
}
