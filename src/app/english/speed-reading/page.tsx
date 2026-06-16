"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Gauge, Lock, Timer, Zap } from "lucide-react";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import {
  ENGLISH_LEVEL_META,
  getSpeedReadingTargetWpm,
  type EnglishLevel,
} from "@/lib/english-types";
import React from "react";

const LEVELS: { level: EnglishLevel; order: string; tagline: string }[] = [
  {
    level: "TEXTBOOK",
    order: "01",
    tagline: "基礎語彙・短文。英語学習の出発点から始める。",
  },
  {
    level: "COMMON_TEST",
    order: "02",
    tagline: "共通テスト形式。150WPMを基準に実用英文を処理する。",
  },
  {
    level: "PRIVATE_UNI",
    order: "03",
    tagline: "有名私大レベル。抽象論説を高速で読み切れ。",
  },
  {
    level: "NATIONAL_UNI",
    order: "04",
    tagline: "国公立二次・難関大。高密度の複文と向き合う。",
  },
];

function pickProblem(level: EnglishLevel) {
  const pool = SPEED_READING_PROBLEMS.filter((p) => p.level === level);
  if (pool.length === 0) return null;

  const randomValues = new Uint32Array(1);
  globalThis.crypto?.getRandomValues(randomValues);
  const index = randomValues[0] % pool.length;

  return pool[index];
}

export default function SpeedReadingPage() {
  const router = useRouter();

  const handleSelect = (level: EnglishLevel, speedSupport: boolean) => {
    const pick = pickProblem(level);
    if (!pick) {
      alert("該当レベルのデータが未実装です。別のレベルを選択してください。");
      return;
    }

    const suffix = speedSupport ? "?speedSupport=1" : "";
    router.push(`/english/speed-reading/${pick.id}${suffix}`);
  };

  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 transition-colors hover:text-emerald-400"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER English
        </Link>

        <header className="mt-8 mb-12">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            <Timer className="h-3.5 w-3.5" />
            速読長文 · レベル選択
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
            style={{
              background:
                "linear-gradient(135deg, #10b981 0%, #ffffff 55%, #facc15 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            速読長文
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            レベルを選び、通常モードまたはスピードサポートモードで読解を開始します。
            スピードサポートではWPM基準で本文中の読了目安を表示します。
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map(({ level, order, tagline }) => {
            const meta = ENGLISH_LEVEL_META[level];
            const levelProblems = SPEED_READING_PROBLEMS.filter(
              (p) => p.level === level,
            );
            const count = levelProblems.length;
            const locked = count === 0;
            const sampleProblem = levelProblems[0];
            const targetWpm = sampleProblem
              ? getSpeedReadingTargetWpm(sampleProblem)
              : null;

            return (
              <article
                key={level}
                className={`group relative w-full overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                  !locked
                    ? "hover:[border-color:color-mix(in_srgb,var(--level-accent)_50%,transparent)] hover:[background:color-mix(in_srgb,var(--level-accent)_8%,transparent)]"
                    : ""
                }`}
                style={{
                  "--level-accent": meta.accent,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: locked ? 0.52 : 1,
                } as React.CSSProperties}
              >
                {!locked && (
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${meta.accent} 8%, transparent), transparent)`,
                    }}
                  />
                )}

                <div className="relative p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                      LV.{order}
                    </span>
                    {locked ? (
                      <span className="flex items-center gap-1 font-mono text-[10px] text-white/22">
                        <Lock className="h-3 w-3" />
                        準備中
                      </span>
                    ) : (
                      <span
                        className="rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold"
                        style={{
                          background: `color-mix(in srgb, ${meta.accent} 14%, transparent)`,
                          border: `1px solid color-mix(in srgb, ${meta.accent} 35%, transparent)`,
                          color: meta.accent,
                        }}
                      >
                        {count}問収録
                      </span>
                    )}
                  </div>

                  <h2
                    className="font-display text-2xl font-extrabold sm:text-3xl"
                    style={{
                      color: locked ? "rgba(255,255,255,0.2)" : meta.accent,
                    }}
                  >
                    {meta.label}
                  </h2>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-white/28">
                    {meta.name} · {meta.wordRange}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-white/50">
                    {tagline}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-white/42">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                      通常モード
                    </span>
                    {targetWpm ? (
                      <span className="rounded-full border border-sky-400/20 bg-sky-400/8 px-2 py-1 text-sky-200/80">
                        目標 {targetWpm} WPM
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleSelect(level, false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/5 px-3 py-2.5 font-mono text-xs font-semibold text-white/65 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Timer className="h-3.5 w-3.5" />
                      通常で読む
                    </button>
                    <button
                      type="button"
                      disabled={locked}
                      onClick={() => handleSelect(level, true)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/35 bg-sky-400/12 px-3 py-2.5 font-mono text-xs font-semibold text-sky-200 transition hover:bg-sky-400/18 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Gauge className="h-3.5 w-3.5" />
                      スピードサポートで読む
                    </button>
                  </div>

                  {locked ? (
                    <div className="mt-5 flex items-center gap-2 font-mono text-xs font-semibold text-white/20">
                      COMING SOON
                    </div>
                  ) : (
                    <div className="mt-5 flex items-center gap-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3">
                      <Zap className="h-3.5 w-3.5" style={{ color: meta.accent }} />
                      <span style={{ color: meta.accent }}>モードを選んで開始</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-12 text-center font-mono text-xs uppercase tracking-[0.2em] text-white/20">
          レベルと読解モードを選んで、今日の演習を始めましょう
        </p>
      </div>
    </div>
  );
}
