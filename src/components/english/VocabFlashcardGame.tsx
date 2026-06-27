"use client";

import { useState } from "react";
import { RotateCcw, ChevronRight, Check, X, BookOpen } from "lucide-react";
import {
  VOCAB_CARDS,
  VOCAB_CATEGORIES,
  type VocabCard,
} from "@/data/vocab-flashcards";

type Phase = "config" | "playing" | "result";
type CategoryKey = VocabCard["category"];

const COUNT_OPTIONS = [10, 20, 30, 0] as const; // 0 = all

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Config Screen ──────────────────────────────────────────────────────────

function ConfigScreen({
  onStart,
}: {
  onStart: (cards: VocabCard[]) => void;
}) {
  const [selectedCats, setSelectedCats] = useState<Set<CategoryKey>>(
    new Set(Object.keys(VOCAB_CATEGORIES) as CategoryKey[]),
  );
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(20);

  const toggleCat = (cat: CategoryKey) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const available = VOCAB_CARDS.filter((c) => selectedCats.has(c.category));
  const actualCount = count === 0 ? available.length : Math.min(count, available.length);

  const handleStart = () => {
    const pool = shuffle(available).slice(0, count === 0 ? undefined : count);
    onStart(pool);
  };

  return (
    <div className="space-y-8">
      {/* Category select */}
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          カテゴリー
        </p>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(VOCAB_CATEGORIES) as [CategoryKey, { label: string; accent: string }][]).map(
            ([key, meta]) => {
              const active = selectedCats.has(key);
              const cnt = VOCAB_CARDS.filter((c) => c.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => toggleCat(key)}
                  className="rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active
                      ? `color-mix(in srgb, ${meta.accent} 18%, transparent)`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? meta.accent : "rgba(255,255,255,0.1)"}`,
                    color: active ? meta.accent : "rgba(255,255,255,0.35)",
                  }}
                >
                  {meta.label}
                  <span className="ml-1.5 opacity-60">{cnt}</span>
                </button>
              );
            },
          )}
        </div>
      </div>

      {/* Count select */}
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          出題数
        </p>
        <div className="flex flex-wrap gap-3">
          {COUNT_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className="rounded-xl px-5 py-2 font-mono text-sm font-semibold transition-all duration-200"
              style={{
                background:
                  count === n ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${count === n ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: count === n ? "#10b981" : "rgba(255,255,255,0.4)",
              }}
            >
              {n === 0 ? "全部" : `${n}枚`}
            </button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[11px] text-white/30">
          選択カテゴリーから {actualCount} 枚をランダム出題
        </p>
      </div>

      {/* Start */}
      <button
        onClick={handleStart}
        disabled={available.length === 0}
        className="w-full rounded-xl py-4 font-mono text-sm font-bold transition-all duration-200 hover:brightness-110 disabled:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(16,185,129,0.35), rgba(5,150,105,0.45))",
          border: "1px solid rgba(16,185,129,0.5)",
          color: "#6ee7b7",
        }}
      >
        フラッシュカード開始 →
      </button>
    </div>
  );
}

// ── Flip Card ──────────────────────────────────────────────────────────────

function FlipCard({ card, isFlipped }: { card: VocabCard; isFlipped: boolean }) {
  const meta = VOCAB_CATEGORIES[card.category];
  return (
    <div style={{ perspective: "1200px" }} className="w-full">
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.45s ease",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          height: "280px",
        }}
      >
        {/* Front */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.4) 100%)",
            border: `1px solid color-mix(in srgb, ${meta.accent} 30%, transparent)`,
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            gap: "0.75rem",
          }}
        >
          <span
            className="rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest"
            style={{
              background: `color-mix(in srgb, ${meta.accent} 14%, transparent)`,
              border: `1px solid color-mix(in srgb, ${meta.accent} 35%, transparent)`,
              color: meta.accent,
            }}
          >
            {meta.label} · {card.pos} · {card.level}
          </span>
          <p
            className="font-sans text-4xl font-bold"
            style={{ color: "#fff", letterSpacing: "0.04em" }}
          >
            {card.word}
          </p>
          <p className="font-sans text-sm text-white/45">{card.pronunciation}</p>
          <p className="mt-4 font-mono text-xs text-white/25 animate-pulse">
            タップして意味を確認
          </p>
        </div>

        {/* Back */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            transform: "rotateY(180deg)",
            background:
              `linear-gradient(145deg, color-mix(in srgb, ${meta.accent} 8%, transparent) 0%, rgba(0,0,0,0.5) 100%)`,
            border: `1px solid color-mix(in srgb, ${meta.accent} 40%, transparent)`,
            borderRadius: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "1.5rem",
            gap: "0.75rem",
            overflowY: "auto",
          }}
        >
          <p
            className="font-sans text-xl font-bold leading-snug"
            style={{ color: meta.accent }}
          >
            {card.meaning}
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-white/80 italic">
            &ldquo;{card.example}&rdquo;
          </p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-white/45">{card.exampleJa}</p>
        </div>
      </div>
    </div>
  );
}

// ── Play Screen ────────────────────────────────────────────────────────────

function PlayScreen({
  cards,
  onFinish,
}: {
  cards: VocabCard[];
  onFinish: (knownIds: Set<string>) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  const card = cards[idx];
  const progress = ((idx) / cards.length) * 100;

  const advance = (known: boolean) => {
    if (known) setKnownIds((p) => new Set([...p, card.id]));
    if (idx + 1 >= cards.length) {
      onFinish(known ? new Set([...knownIds, card.id]) : knownIds);
    } else {
      setIsFlipped(false);
      setTimeout(() => setIdx(idx + 1), 60);
    }
  };

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center justify-between gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #10b981, #6ee7b7)",
            }}
          />
        </div>
        <span className="font-mono text-xs text-white/40">
          {idx + 1} / {cards.length}
        </span>
      </div>

      {/* Card */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full cursor-pointer"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <FlipCard card={card} isFlipped={isFlipped} />
      </button>

      {/* Actions */}
      <div
        className="grid grid-cols-2 gap-3 transition-opacity duration-300"
        style={{ opacity: isFlipped ? 1 : 0.3, pointerEvents: isFlipped ? "auto" : "none" }}
      >
        <button
          onClick={() => advance(false)}
          className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all duration-200 hover:brightness-110"
          style={{
            background: "rgba(244,63,94,0.1)",
            border: "1px solid rgba(244,63,94,0.35)",
            color: "#f87171",
          }}
        >
          <X className="h-4 w-4" />
          もう一度
        </button>
        <button
          onClick={() => advance(true)}
          className="flex items-center justify-center gap-2 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all duration-200 hover:brightness-110"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.35)",
            color: "#6ee7b7",
          }}
        >
          <Check className="h-4 w-4" />
          知ってた
        </button>
      </div>

      <p className="text-center font-mono text-[10px] text-white/20">
        カードをタップして意味を確認してから判定してください
      </p>
    </div>
  );
}

// ── Result Screen ──────────────────────────────────────────────────────────

function ResultScreen({
  cards,
  knownIds,
  onRetry,
  onRetryUnknown,
}: {
  cards: VocabCard[];
  knownIds: Set<string>;
  onRetry: () => void;
  onRetryUnknown: () => void;
}) {
  const known = cards.filter((c) => knownIds.has(c.id));
  const unknown = cards.filter((c) => !knownIds.has(c.id));
  const pct = Math.round((known.length / cards.length) * 100);

  const grade =
    pct >= 90
      ? { label: "PERFECT", color: "#f59e0b" }
      : pct >= 70
        ? { label: "GOOD", color: "#10b981" }
        : pct >= 50
          ? { label: "OK", color: "#00d2ff" }
          : { label: "RETRY", color: "#f43f5e" };

  return (
    <div className="space-y-6">
      {/* Score */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <p
          className="font-display text-5xl font-extrabold tabular-nums"
          style={{ color: grade.color }}
        >
          {pct}%
        </p>
        <p
          className="mt-1 font-mono text-lg font-bold tracking-[0.2em]"
          style={{ color: grade.color }}
        >
          {grade.label}
        </p>
        <p className="mt-3 font-mono text-xs text-white/40">
          {known.length} / {cards.length} 語 正解
        </p>
      </div>

      {/* Unknown list */}
      {unknown.length > 0 && (
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            要復習 ({unknown.length} 語)
          </p>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {unknown.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 rounded-lg px-4 py-2.5"
                  style={{
                    background: "rgba(244,63,94,0.05)",
                    border: "1px solid rgba(244,63,94,0.15)",
                  }}
                >
                  <div className="min-w-0">
                    <span className="font-sans text-sm font-bold text-white">
                      {c.word}
                    </span>
                    <span className="ml-2 font-mono text-[10px] text-white/40">
                      {c.pos}
                    </span>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-white/55">
                    {c.meaning}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {unknown.length > 0 && (
          <button
            onClick={onRetryUnknown}
            className="flex-1 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
            style={{
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.35)",
              color: "#f87171",
            }}
          >
            <RotateCcw className="inline h-3.5 w-3.5 mr-1.5" />
            要復習のみ再挑戦
          </button>
        )}
        <button
          onClick={onRetry}
          className="flex-1 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.35)",
            color: "#6ee7b7",
          }}
        >
          <ChevronRight className="inline h-3.5 w-3.5 mr-1.5" />
          もう一度
        </button>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function VocabFlashcardGame() {
  const [phase, setPhase] = useState<Phase>("config");
  const [deck, setDeck] = useState<VocabCard[]>([]);
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  const handleStart = (cards: VocabCard[]) => {
    setDeck(cards);
    setKnownIds(new Set());
    setPhase("playing");
  };

  const handleFinish = (ids: Set<string>) => {
    setKnownIds(ids);
    setPhase("result");
  };

  const handleRetry = () => {
    setDeck((prev) => shuffle(prev));
    setKnownIds(new Set());
    setPhase("playing");
  };

  const handleRetryUnknown = () => {
    const unknown = deck.filter((c) => !knownIds.has(c.id));
    setDeck(shuffle(unknown));
    setKnownIds(new Set());
    setPhase("playing");
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Phase header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
          }}
        >
          <BookOpen className="h-4.5 w-4.5" style={{ color: "#10b981" }} />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {phase === "config" ? "Configure Session" : phase === "playing" ? "Flashcard Mode" : "Session Result"}
          </p>
          <p className="font-mono text-xs font-semibold text-white/60">
            {phase === "config"
              ? "カテゴリーと枚数を選択"
              : phase === "playing"
                ? `${deck.length} 枚のカードに挑戦中`
                : "セッション完了"}
          </p>
        </div>
      </div>

      {phase === "config" && <ConfigScreen onStart={handleStart} />}
      {phase === "playing" && (
        <PlayScreen key={deck[0]?.id} cards={deck} onFinish={handleFinish} />
      )}
      {phase === "result" && (
        <ResultScreen
          cards={deck}
          knownIds={knownIds}
          onRetry={handleRetry}
          onRetryUnknown={handleRetryUnknown}
        />
      )}
    </div>
  );
}
