import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Gauge,
  Timer,
  PenLine,
  GraduationCap,
} from "lucide-react";
import { COMPREHENSION_PRIVATE_PACK_1 } from "@/data/english-comprehension-private-pack-1";
import { SPEED_READING_PRIVATE_PACK_1 } from "@/data/english-speed-reading-private-pack-1";
import { UNIVERSITY_GROUP_META } from "@/lib/types";
import type { UniversityGroup } from "@/lib/types";
import {
  ENGLISH_LEVEL_META,
  getSpeedReadingTargetWpm,
  getSpeedReadingTimeLimitSeconds,
} from "@/lib/english-types";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "英語 入試良問演習",
  description:
    "私立文系（日東駒専・産近甲龍・MARCH・関関同立）の傾向を参考にしたオリジナル英語演習。速読・精読・文法を横断して学びます。",
  path: "/english/dojo",
});

const ACCENT = "#e879f9";

export default function EnglishDojoPage() {
  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">

      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,121,249,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(232,121,249,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,121,249,0.10) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">

        {/* Back */}
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
          style={{ color: "rgba(232,121,249,0.7)" }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          英語トップへ戻る
        </Link>

        {/* Header */}
        <header className="mt-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{ background: "rgba(232,121,249,0.08)", border: `1px solid rgba(232,121,249,0.25)`, color: ACCENT }}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            私立文系英語対策
          </div>

          <h1
            className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background: "linear-gradient(135deg, #e879f9 0%, #ffffff 60%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            英語 入試良問演習
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            私立文系の英語入試傾向を参考にしたオリジナル問題で、速読・精読・文法を横断して確認します。
          </p>
        </header>

          {/* ── 私立文系 傾向整理パネル ─────────────────────────────────── */}
        <section
          className="mt-10 rounded-2xl overflow-hidden"
          style={{ background: "rgba(232,121,249,0.04)", border: `1px solid rgba(232,121,249,0.22)` }}
        >
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ background: "rgba(232,121,249,0.08)", borderBottom: `1px solid rgba(232,121,249,0.15)` }}
          >
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
              私立文系 傾向整理
            </span>
            <span className="font-mono text-[10px] ml-1" style={{ color: "rgba(255,255,255,0.50)" }}>
              志望校群別・英語出題傾向
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
            {(Object.keys(UNIVERSITY_GROUP_META) as UniversityGroup[]).map((key) => {
              const m = UNIVERSITY_GROUP_META[key];
              return (
                <div
                  key={key}
                  className="rounded-xl p-3"
                  style={{
                    background: `color-mix(in srgb, ${m.accent} 10%, #000)`,
                    border: `1px solid color-mix(in srgb, ${m.accent} 32%, transparent)`,
                  }}
                >
                  <div className="font-display text-base font-extrabold" style={{ color: m.accent }}>
                    {m.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {m.deviationRange}
                  </div>
                  <div className="mt-1 font-mono text-[10px] leading-snug" style={{ color: "rgba(255,255,255,0.50)" }}>
                    {m.description}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 傾向メモ */}
          <div className="grid grid-cols-1 gap-2 px-5 pb-5 sm:grid-cols-2">
            {[
              {
                group: "MARCH / 関関同立",
                accent: "#f59e0b",
                points: ["350〜600語の論説文", "段落整序・誤り指摘", "混合仮定法・独立分詞構文"],
              },
              {
                group: "日東駒専 / 産近甲龍",
                accent: "#22d3ee",
                points: ["220〜350語の速読系", "句動詞・イディオム・会話表現", "基本的な仮定法・前置詞"],
              },
            ].map(({ group, accent, points }) => (
              <div
                key={group}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="font-mono text-[10px] font-bold mb-2" style={{ color: accent }}>
                  {group}
                </div>
                <ul className="space-y-0.5">
                  {points.map((pt) => (
                    <li key={pt} className="font-mono text-[10px] flex items-start gap-1.5" style={{ color: "rgba(255,255,255,0.60)" }}>
                      <span style={{ color: accent }}>▸</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── 速読長文（私立文系） ─────────────────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
              style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)" }}
            >
              <Timer className="h-4.5 w-4.5" style={{ color: "#10b981" }} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-950">速読長文</h2>
              <p className="font-mono text-[10px]" style={{ color: "rgba(16,185,129,0.7)" }}>
                Speed Reading — 日東駒専 / 産近甲龍 対策
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {SPEED_READING_PRIVATE_PACK_1.map((p) => {
              const lvMeta = ENGLISH_LEVEL_META[p.level];
              const uKey = p.universityGroup;
              const uMeta = uKey ? UNIVERSITY_GROUP_META[uKey] : null;
              return (
                <article
                  key={p.id}
                  className="group rounded-xl p-4 transition-all duration-200"
                  style={{
                    background: "rgba(16,185,129,0.04)",
                    border: "1px solid rgba(16,185,129,0.16)",
                  }}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide shrink-0"
                        style={{
                          background: "rgba(16,185,129,0.12)",
                          border: "1px solid rgba(16,185,129,0.3)",
                          color: "#10b981",
                        }}
                      >
                        {lvMeta.label}
                      </span>
                      {uMeta && (
                        <span
                          className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold shrink-0"
                          style={{
                            background: `color-mix(in srgb, ${uMeta.accent} 12%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${uMeta.accent} 30%, transparent)`,
                            color: uMeta.accent,
                          }}
                        >
                          {uMeta.label}
                        </span>
                      )}
                      {p.tags?.slice(0, 2).map((t) => (
                        <span key={t} className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    <p className="font-display text-sm font-semibold text-white truncate">{p.title}</p>
                    <p className="font-mono text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                      制限時間 {getSpeedReadingTimeLimitSeconds(p)}秒 · 目標 {getSpeedReadingTargetWpm(p)} WPM · {p.questions.length}問
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={`/english/speed-reading/${p.id}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-mono text-[10px] font-semibold text-white/65 transition hover:bg-white/10"
                    >
                      <Timer className="h-3.5 w-3.5" />
                      通常で読む
                    </Link>
                    <Link
                      href={`/english/speed-reading/${p.id}?speedSupport=1`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-sky-400/30 bg-sky-400/10 px-3 py-2 font-mono text-[10px] font-semibold text-sky-200 transition hover:bg-sky-400/15"
                    >
                      <Gauge className="h-3.5 w-3.5" />
                      スピードサポートで読む
                    </Link>
                    <span className="ml-auto hidden items-center font-mono text-[10px] font-semibold text-emerald-400/70 sm:inline-flex">
                      モード選択
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-all group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── 精読長文（私立文系） ─────────────────────────────────────────── */}
        <section className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0"
              style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.28)" }}
            >
              <BookOpen className="h-4.5 w-4.5" style={{ color: "#f59e0b" }} />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-950">精読・長文読解</h2>
              <p className="font-mono text-[10px]" style={{ color: "rgba(245,158,11,0.7)" }}>
                Comprehension — MARCH / 関関同立 対策
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {COMPREHENSION_PRIVATE_PACK_1.map((p) => {
              const lvMeta = ENGLISH_LEVEL_META[p.level];
              const uKey = p.universityGroup;
              const uMeta = uKey ? UNIVERSITY_GROUP_META[uKey] : null;
              return (
                <Link
                  key={p.id}
                  href={`/english/comprehension/${p.id}`}
                  className="group flex items-center justify-between rounded-xl p-4 transition-all duration-200"
                  style={{
                    background: "rgba(245,158,11,0.04)",
                    border: "1px solid rgba(245,158,11,0.16)",
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide shrink-0"
                        style={{
                          background: "rgba(245,158,11,0.12)",
                          border: "1px solid rgba(245,158,11,0.3)",
                          color: "#f59e0b",
                        }}
                      >
                        {lvMeta.label}
                      </span>
                      {uMeta && (
                        <span
                          className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold shrink-0"
                          style={{
                            background: `color-mix(in srgb, ${uMeta.accent} 12%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${uMeta.accent} 30%, transparent)`,
                            color: uMeta.accent,
                          }}
                        >
                          {uMeta.label}
                        </span>
                      )}
                      {p.tags?.slice(0, 2).map((t) => (
                        <span key={t} className="font-mono text-[9px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                          #{t}
                        </span>
                      ))}
                    </div>
                    <p className="font-display text-sm font-semibold text-white truncate">{p.title}</p>
                    <p className="font-mono text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                      {p.questions.length}問 · 構文解析付き
                    </p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 ml-3 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                    style={{ color: "#f59e0b" }}
                  />
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── 文法ドリル（私立文系追加問題） ─────────────────────────────── */}
        <section className="mt-10">
          <Link
            href="/english/grammar"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background: "linear-gradient(145deg, rgba(167,139,250,0.08) 0%, rgba(0,0,0,0.4) 100%)",
              border: "1px solid rgba(167,139,250,0.22)",
            }}
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.09), transparent)" }}
            />
            <div className="relative flex items-center gap-5 p-5">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.32)" }}
              >
                <PenLine className="h-6 w-6" style={{ color: "#a78bfa" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(167,139,250,0.6)" }}>
                  Mode — Grammar Drill
                </div>
                <h2 className="font-display text-lg font-extrabold text-white mt-0.5">
                  文法ドリル
                </h2>
                <p className="font-mono text-xs mt-1" style={{ color: "rgba(255,255,255,0.50)" }}>
                  段落整序・誤り指摘・句動詞・イディオム・会話表現（g036〜g045）を含む全45問。
                </p>
              </div>
              <ArrowRight
                className="h-5 w-5 shrink-0 opacity-40 transition-all group-hover:opacity-100 group-hover:translate-x-1"
                style={{ color: "#a78bfa" }}
              />
            </div>
          </Link>
        </section>

      </div>
    </div>
  );
}
