"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ArrowRight, Link2, Network, Tag } from "lucide-react";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";

// Extract all unique topic tags (exclude level tags and word-count tags)
const LEVEL_TAGS = new Set(["教科書", "共通テスト", "私大難関", "国公立二次"]);
const WORD_COUNT_RE = /約\d+語/;

function extractTopicTags(): string[] {
  const tagSet = new Set<string>();
  for (const p of MULTI_SOURCE_PROBLEMS) {
    for (const t of p.tags) {
      if (!LEVEL_TAGS.has(t) && !WORD_COUNT_RE.test(t)) tagSet.add(t);
    }
  }
  return Array.from(tagSet).sort();
}

const ALL_TOPIC_TAGS = extractTopicTags();

export default function MultiSourceListPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return MULTI_SOURCE_PROBLEMS;
    return MULTI_SOURCE_PROBLEMS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
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
        <header className="mt-8 mb-8">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em] mb-4"
            style={{
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#10b981",
            }}
          >
            <Link2 className="h-3.5 w-3.5" />
            Cross-Data Link
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
            マルチソース
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50">
            表・リスト・本文の複数資料を横断照合し、条件を絞り込んで最適解を導く。
            共通テスト第4・5問の典型的な情報処理パズルを再現。
          </p>
        </header>

        {/* Tag filter */}
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2">
            <Tag className="h-3.5 w-3.5 text-white/30" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              タグで絞り込む
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-all duration-200"
              style={{
                background: !activeTag ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${!activeTag ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
                color: !activeTag ? "#fff" : "rgba(255,255,255,0.35)",
              }}
            >
              すべて ({MULTI_SOURCE_PROBLEMS.length})
            </button>
            {ALL_TOPIC_TAGS.map((tag) => {
              const cnt = MULTI_SOURCE_PROBLEMS.filter((p) => p.tags.includes(tag)).length;
              const active = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(active ? null : tag)}
                  className="rounded-full px-3 py-1 font-mono text-[11px] font-semibold transition-all duration-200"
                  style={{
                    background: active ? "rgba(139,92,246,0.18)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)"}`,
                    color: active ? "#c4b5fd" : "rgba(255,255,255,0.35)",
                  }}
                >
                  {tag}
                  <span className="ml-1 opacity-60">({cnt})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Problem list */}
        <div className="grid gap-5 sm:grid-cols-2">
          {filtered.map((p) => {
            const meta = ENGLISH_LEVEL_META[p.level];
            const sourceTypeLabel = p.sources.map((s) => s.type).join(" · ");

            return (
              <Link
                key={p.id}
                href={`/english/multi-source/${p.id}`}
                className="group relative block overflow-hidden rounded-2xl transition-all duration-300
                  hover:[border-color:color-mix(in_srgb,var(--card-accent)_40%,transparent)]
                  hover:[background:color-mix(in_srgb,var(--card-accent)_5%,transparent)]"
                style={{
                  "--card-accent": meta.accent,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                } as React.CSSProperties}
              >
                {/* Shimmer */}
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${meta.accent} 8%, transparent), transparent)`,
                  }}
                />

                <div className="relative p-6">
                  {/* Level badge + meta */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold"
                      style={{
                        background: `color-mix(in srgb, ${meta.accent} 14%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${meta.accent} 40%, transparent)`,
                        color: meta.accent,
                      }}
                    >
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-white/30">
                      {p.sources.length}資料 · {p.questions.length}問
                    </span>
                  </div>

                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `color-mix(in srgb, ${meta.accent} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${meta.accent} 28%, transparent)`,
                      }}
                    >
                      <Network className="h-6 w-6" style={{ color: meta.accent }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-base font-bold leading-snug text-white">
                        {p.title}
                      </h2>
                      <p className="mt-1 font-mono text-xs text-white/35">
                        {sourceTypeLabel} · {p.tags.filter((t) => !LEVEL_TAGS.has(t) && !WORD_COUNT_RE.test(t)).slice(0, 3).join(" · ")}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-all duration-300 group-hover:gap-2.5"
                    style={{ color: meta.accent }}
                  >
                    照合する
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-center font-mono text-sm text-white/30">
            該当する問題が見つかりません — タグ絞り込みを変更してください
          </p>
        )}

        {/* Footer */}
        <p className="mt-12 text-center font-mono text-xs tracking-[0.2em] text-white/20 uppercase">
          More problem sets coming soon
        </p>
      </div>
    </div>
  );
}
