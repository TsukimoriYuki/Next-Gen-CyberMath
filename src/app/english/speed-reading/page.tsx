import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronLeft, Gauge, Lock, Timer } from "lucide-react";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { SpeedReadingRandomButton } from "@/components/english/SpeedReadingRandomButton";
import {
  ENGLISH_LEVEL_META,
  ENGLISH_LEVEL_SLUG,
  getSpeedReadingTargetWpm,
  type EnglishLevel,
} from "@/lib/english-types";
import React from "react";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "英語速読",
  description: "レベル別の英文で読解速度と正確さを鍛える速読トレーニングです。",
  path: "/english/speed-reading",
});

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

export default function SpeedReadingPage() {
  const allIds = SPEED_READING_PROBLEMS.map((p) => p.id);
  const firstAvailableLevel = LEVELS.find((l) =>
    SPEED_READING_PROBLEMS.some((p) => p.level === l.level),
  );

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
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 transition-colors hover:text-emerald-500"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          英語
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
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">
            レベルを選ぶと、そのレベルの長文一覧が開きます。
            各長文を「通常」または「スピードサポート」で読み始められます。
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
            const targetWpm = levelProblems[0]
              ? getSpeedReadingTargetWpm(levelProblems[0])
              : null;

            const cardInner = (
              <div className="relative p-6">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    LV.{order}
                  </span>
                  {locked ? (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
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
                    color: locked ? "#94a3b8" : meta.accent,
                  }}
                >
                  {meta.label}
                </h2>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  {meta.name} · {meta.wordRange}
                </p>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-500">
                  {targetWpm ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-1 font-mono font-semibold text-sky-700">
                      <Gauge className="h-3 w-3" />
                      目標 {targetWpm} WPM
                    </span>
                  ) : null}
                </div>

                {locked ? (
                  <div className="mt-5 text-xs font-semibold text-slate-500">
                    準備中です。
                    {firstAvailableLevel && (
                      <>
                        {" "}
                        先に
                        <Link
                          href={`/english/speed-reading/level/${ENGLISH_LEVEL_SLUG[firstAvailableLevel.level]}`}
                          className="relative z-10 mx-1 font-bold text-emerald-600 underline underline-offset-2 hover:text-emerald-500"
                        >
                          {ENGLISH_LEVEL_META[firstAvailableLevel.level].label}
                        </Link>
                        で練習を進められます。
                      </>
                    )}
                  </div>
                ) : (
                  <div className="mt-5 flex items-center gap-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3">
                    <span style={{ color: meta.accent }}>長文一覧を見る</span>
                    <ArrowRight
                      className="h-3.5 w-3.5"
                      style={{ color: meta.accent }}
                    />
                  </div>
                )}
              </div>
            );

            if (locked) {
              return (
                <article
                  key={level}
                  className="group relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left opacity-60 shadow-sm"
                >
                  {cardInner}
                </article>
              );
            }

            return (
              <Link
                key={level}
                href={`/english/speed-reading/level/${ENGLISH_LEVEL_SLUG[level]}`}
                className="group relative block w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:shadow-md hover:[border-color:color-mix(in_srgb,var(--level-accent)_55%,transparent)]"
                style={
                  { "--level-accent": meta.accent } as React.CSSProperties
                }
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 group-hover:translate-x-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${meta.accent} 10%, transparent), transparent)`,
                  }}
                />
                {cardInner}
              </Link>
            );
          })}
        </div>

        {/* Supplementary random quick-start */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-slate-200 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            すぐ始めたいときは
          </p>
          <SpeedReadingRandomButton
            ids={allIds}
            label="全レベルからランダムに1題読む"
          />
        </div>
      </div>
    </div>
  );
}
