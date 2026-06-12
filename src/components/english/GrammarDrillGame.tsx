"use client";

import { useState, useCallback } from "react";
import { ChevronRight, RotateCcw, PenLine } from "lucide-react";
import {
  GRAMMAR_QUESTIONS,
  GRAMMAR_TOPICS,
  type GrammarQuestion,
} from "@/data/grammar-drill";

type Phase = "config" | "playing" | "result";
type TopicKey = GrammarQuestion["topic"];

const COUNT_OPTIONS = [5, 10, 15, 25] as const;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Config Screen ──────────────────────────────────────────────────────────

function ConfigScreen({ onStart }: { onStart: (qs: GrammarQuestion[]) => void }) {
  const [selectedTopics, setSelectedTopics] = useState<Set<TopicKey>>(
    new Set(Object.keys(GRAMMAR_TOPICS) as TopicKey[]),
  );
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(10);

  const toggleTopic = (t: TopicKey) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) {
        if (next.size === 1) return prev;
        next.delete(t);
      } else {
        next.add(t);
      }
      return next;
    });
  };

  const available = GRAMMAR_QUESTIONS.filter((q) => selectedTopics.has(q.topic));
  const actualCount = Math.min(count, available.length);

  return (
    <div className="space-y-8">
      {/* Topic select */}
      <div>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          文法項目
        </p>
        <div className="flex flex-wrap gap-3">
          {(Object.entries(GRAMMAR_TOPICS) as [TopicKey, { label: string; labelJa: string; accent: string }][]).map(
            ([key, meta]) => {
              const active = selectedTopics.has(key);
              const cnt = GRAMMAR_QUESTIONS.filter((q) => q.topic === key).length;
              return (
                <button
                  key={key}
                  onClick={() => toggleTopic(key)}
                  className="rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all duration-200"
                  style={{
                    background: active
                      ? `color-mix(in srgb, ${meta.accent} 16%, transparent)`
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${active ? meta.accent : "rgba(255,255,255,0.1)"}`,
                    color: active ? meta.accent : "rgba(255,255,255,0.35)",
                  }}
                >
                  {meta.labelJa}
                  <span className="ml-1.5 opacity-60">{cnt}問</span>
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
                  count === n ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${count === n ? "rgba(167,139,250,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: count === n ? "#c4b5fd" : "rgba(255,255,255,0.4)",
              }}
            >
              {n}問
            </button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[11px] text-white/30">
          選択項目から {actualCount} 問をランダム出題
        </p>
      </div>

      <button
        onClick={() => {
          const pool = shuffle(available).slice(0, count);
          onStart(pool);
        }}
        disabled={available.length === 0}
        className="w-full rounded-xl py-4 font-mono text-sm font-bold transition-all duration-200 hover:brightness-110 disabled:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(139,92,246,0.4))",
          border: "1px solid rgba(167,139,250,0.45)",
          color: "#ddd6fe",
        }}
      >
        文法ドリル開始 →
      </button>
    </div>
  );
}

// ── Question Screen ────────────────────────────────────────────────────────

function QuestionScreen({
  questions,
  onFinish,
}: {
  questions: GrammarQuestion[];
  onFinish: (results: boolean[]) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);

  const q = questions[idx];
  const answered = selected !== null;
  const topicMeta = GRAMMAR_TOPICS[q.topic];

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    setShowExplanation(true);
  };

  const handleNext = useCallback(() => {
    const newResults = [...results, selected === q.correctIndex];
    if (idx + 1 >= questions.length) {
      onFinish(newResults);
    } else {
      setResults(newResults);
      setIdx(idx + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }, [idx, questions.length, results, selected, q.correctIndex, onFinish]);

  const progress = (idx / questions.length) * 100;

  // Highlight blank in sentence
  const parts = q.sentence.split("___");

  return (
    <div className="space-y-5">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #a78bfa, #c4b5fd)",
            }}
          />
        </div>
        <span className="font-mono text-xs text-white/40">
          {idx + 1} / {questions.length}
        </span>
      </div>

      {/* Topic badge */}
      <div>
        <span
          className="rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
          style={{
            background: `color-mix(in srgb, ${topicMeta.accent} 14%, transparent)`,
            border: `1px solid color-mix(in srgb, ${topicMeta.accent} 40%, transparent)`,
            color: topicMeta.accent,
          }}
        >
          {topicMeta.labelJa} — {topicMeta.label}
        </span>
      </div>

      {/* Sentence */}
      <div
        className="rounded-xl px-5 py-4"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <p className="text-base leading-relaxed text-white/90">
          {parts[0]}
          <span
            className="mx-1 inline-block min-w-[5rem] rounded border-b-2 px-2 text-center font-bold"
            style={{ borderColor: topicMeta.accent, color: topicMeta.accent }}
          >
            {answered ? q.options[q.correctIndex] : "　　　　"}
          </span>
          {parts[1]}
        </p>
        <p className="mt-2 font-mono text-[11px] text-white/30">{q.blank}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let border = "rgba(255,255,255,0.1)";
          let color = "rgba(255,255,255,0.7)";

          if (answered) {
            if (i === q.correctIndex) {
              bg = "rgba(16,185,129,0.12)";
              border = "#10b981";
              color = "#6ee7b7";
            } else if (i === selected) {
              bg = "rgba(244,63,94,0.1)";
              border = "#f43f5e";
              color = "#fca5a5";
            } else {
              color = "rgba(255,255,255,0.25)";
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className="english-option rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200"
              style={{ background: bg, border: `1px solid ${border}`, color }}
            >
              <span className="mr-2 opacity-50">
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div
          className="rounded-xl p-4 text-sm leading-relaxed text-white/75"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            whiteSpace: "pre-line",
          }}
        >
          {q.explanation}
        </div>
      )}

      {/* Next */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full rounded-xl py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
          style={{
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.4)",
            color: "#c4b5fd",
          }}
        >
          {idx + 1 < questions.length ? "次の問題 →" : "結果を見る →"}
        </button>
      )}
    </div>
  );
}

// ── Result Screen ──────────────────────────────────────────────────────────

function ResultScreen({
  questions,
  results,
  onRetry,
  onRetryWrong,
}: {
  questions: GrammarQuestion[];
  results: boolean[];
  onRetry: () => void;
  onRetryWrong: () => void;
}) {
  const score = results.filter(Boolean).length;
  const pct = Math.round((score / results.length) * 100);

  const grade =
    pct >= 90
      ? { label: "PERFECT", color: "#f59e0b" }
      : pct >= 70
        ? { label: "GOOD", color: "#a78bfa" }
        : pct >= 50
          ? { label: "OK", color: "#00d2ff" }
          : { label: "RETRY", color: "#f43f5e" };

  const wrongQs = questions.filter((_, i) => !results[i]);

  // Topic breakdown
  const topicStats = (Object.keys(GRAMMAR_TOPICS) as TopicKey[]).map((t) => {
    const qs = questions.filter((q) => q.topic === t);
    const correct = qs.filter((q, qi) => results[questions.indexOf(q)] === true).length;
    return { topic: t, correct, total: qs.length };
  }).filter((s) => s.total > 0);

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
          {score} / {results.length} 問正解
        </p>
      </div>

      {/* Topic breakdown */}
      {topicStats.length > 1 && (
        <div className="space-y-2">
          {topicStats.map(({ topic, correct, total }) => {
            const meta = GRAMMAR_TOPICS[topic];
            const p = total > 0 ? Math.round((correct / total) * 100) : 0;
            return (
              <div key={topic} className="flex items-center gap-3">
                <span
                  className="w-16 shrink-0 font-mono text-[10px]"
                  style={{ color: meta.accent }}
                >
                  {meta.labelJa}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${p}%`,
                      background: meta.accent,
                    }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-xs text-white/40">
                  {correct}/{total}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Wrong list */}
      {wrongQs.length > 0 && (
        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            復習すべき問題 ({wrongQs.length}問)
          </p>
          <div className="max-h-40 space-y-1.5 overflow-y-auto pr-1">
            {wrongQs.map((q) => (
              <div
                key={q.id}
                className="rounded-lg px-3 py-2 font-mono text-xs text-white/50"
                style={{
                  background: "rgba(244,63,94,0.05)",
                  border: "1px solid rgba(244,63,94,0.15)",
                }}
              >
                <span
                  className="mr-2"
                  style={{ color: GRAMMAR_TOPICS[q.topic].accent }}
                >
                  [{GRAMMAR_TOPICS[q.topic].labelJa}]
                </span>
                {q.sentence.replace("___", `[${q.options[q.correctIndex]}]`)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        {wrongQs.length > 0 && (
          <button
            onClick={onRetryWrong}
            className="flex-1 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
            style={{
              background: "rgba(244,63,94,0.1)",
              border: "1px solid rgba(244,63,94,0.35)",
              color: "#f87171",
            }}
          >
            <RotateCcw className="inline h-3.5 w-3.5 mr-1.5" />
            間違えた問題のみ
          </button>
        )}
        <button
          onClick={onRetry}
          className="flex-1 rounded-xl py-3.5 font-mono text-sm font-semibold transition-all hover:brightness-110"
          style={{
            background: "rgba(167,139,250,0.1)",
            border: "1px solid rgba(167,139,250,0.35)",
            color: "#c4b5fd",
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

export function GrammarDrillGame() {
  const [phase, setPhase] = useState<Phase>("config");
  const [deck, setDeck] = useState<GrammarQuestion[]>([]);
  const [results, setResults] = useState<boolean[]>([]);

  const handleStart = (qs: GrammarQuestion[]) => {
    setDeck(qs);
    setResults([]);
    setPhase("playing");
  };

  const handleFinish = (r: boolean[]) => {
    setResults(r);
    setPhase("result");
  };

  const handleRetry = () => {
    setDeck((prev) => shuffle(prev));
    setResults([]);
    setPhase("playing");
  };

  const handleRetryWrong = () => {
    const wrong = deck.filter((_, i) => !results[i]);
    setDeck(shuffle(wrong));
    setResults([]);
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
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: "rgba(167,139,250,0.12)",
            border: "1px solid rgba(167,139,250,0.3)",
          }}
        >
          <PenLine className="h-4 w-4" style={{ color: "#a78bfa" }} />
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            {phase === "config" ? "Configure Drill" : phase === "playing" ? "Grammar Mode" : "Drill Result"}
          </p>
          <p className="font-mono text-xs font-semibold text-white/60">
            {phase === "config"
              ? "文法項目と出題数を選択"
              : phase === "playing"
                ? `${deck.length} 問に挑戦中`
                : "ドリル完了"}
          </p>
        </div>
      </div>

      {phase === "config" && <ConfigScreen onStart={handleStart} />}
      {phase === "playing" && (
        <QuestionScreen key={`${deck[0]?.id}-${phase}`} questions={deck} onFinish={handleFinish} />
      )}
      {phase === "result" && (
        <ResultScreen
          questions={deck}
          results={results}
          onRetry={handleRetry}
          onRetryWrong={handleRetryWrong}
        />
      )}
    </div>
  );
}
