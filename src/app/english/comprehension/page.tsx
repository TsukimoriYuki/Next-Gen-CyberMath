"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, AlignLeft, Zap, Lock } from "lucide-react";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { ENGLISH_LEVEL_META, type EnglishLevel } from "@/lib/english-types";
import React from "react";

const LEVELS: { level: EnglishLevel; order: string; tagline: string }[] = [
  {
    level: "TEXTBOOK",
    order: "01",
    tagline: "教科書レベルの基礎文。精読と構文解析の訓練として。",
  },
  {
    level: "COMMON_TEST",
    order: "02",
    tagline: "共通テスト形式。情報を正確かつ丁寧に読み取る。",
  },
  {
    level: "PRIVATE_UNI",
    order: "03",
    tagline: "有名私大レベル。論説の構造と語彙を深く解析する。",
  },
  {
    level: "NATIONAL_UNI",
    order: "04",
    tagline: "国公立二次・難関大。哲学・抽象論述を精読・解釈する。",
  },
];

export default function ComprehensionPage() {
  const router = useRouter();

  const handleSelect = (level: EnglishLevel) => {
    const pool = COMPREHENSION_PROBLEMS.filter((p) => p.level === level);
    if (pool.length === 0) {
      alert("該当レベルのデータが未実装です。別のレベルを選択してください。");
      return;
    }
    const pick = pool[Math.floor(Math.random() * pool.length)];
    router.push(`/english/comprehension/${pick.id}`);
  };

  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Back */}
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          CYBER English
        </Link>

        {/* Header */}
        <header className="mt-8 mb-12">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            <AlignLeft className="h-3.5 w-3.5" />
            精読長文 · レベル選択
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
            精読長文
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            レベルを選ぶと、該当レベルの英文がランダムに出題されます。
            本文を確認しながら設問に取り組み、構文と根拠を丁寧に整理します。
          </p>
        </header>

        {/* Level panels */}
        <div className="grid gap-4 sm:grid-cols-2">
          {LEVELS.map(({ level, order, tagline }) => {
            const meta = ENGLISH_LEVEL_META[level];
            const count = COMPREHENSION_PROBLEMS.filter(
              (p) => p.level === level
            ).length;
            const locked = count === 0;

            return (
              <button
                key={level}
                type="button"
                onClick={() => handleSelect(level)}
                className={`group relative w-full overflow-hidden rounded-2xl text-left transition-all duration-300 focus:outline-none ${
                  !locked
                    ? "hover:[border-color:color-mix(in_srgb,var(--level-accent)_50%,transparent)] hover:[background:color-mix(in_srgb,var(--level-accent)_8%,transparent)]"
                    : ""
                }`}
                style={{
                  "--level-accent": meta.accent,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  opacity: locked ? 0.52 : 1,
                  cursor: locked ? "not-allowed" : "pointer",
                } as React.CSSProperties}
              >
                {/* Shimmer sweep (unlocked only) */}
                {!locked && (
                  <span
                    className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{
                      background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${meta.accent} 8%, transparent), transparent)`,
                    }}
                  />
                )}

                <div className="relative p-6">
                  {/* Level number + availability */}
                  <div className="mb-4 flex items-center justify-between">
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

                  {/* Level title */}
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

                  {/* Tagline */}
                  <p className="mt-3 text-xs leading-relaxed text-white/50">
                    {tagline}
                  </p>

                  {/* CTA */}
                  <div
                    className="mt-5 flex items-center gap-2 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-3"
                    style={{
                      color: locked ? "rgba(255,255,255,0.2)" : meta.accent,
                    }}
                  >
                    {locked ? (
                      "COMING SOON"
                    ) : (
                      <>
                        <Zap className="h-3.5 w-3.5" />
                        このレベルで始める
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-12 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          レベルを選んで、今日の精読演習を始めましょう
        </p>
      </div>
    </div>
  );
}
