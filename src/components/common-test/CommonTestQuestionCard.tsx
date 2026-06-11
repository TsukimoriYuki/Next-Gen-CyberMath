import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import type { CommonTestTheme } from "@/data/common-test";
import { Timer, BookOpen } from "lucide-react";
import { MathText } from "@/components/math/Math";
import { EnglishReadingSplitView } from "./EnglishReadingSplitView";

interface Props {
  question: CommonTestDrillQuestion;
  theme: CommonTestTheme;
  questionNumber: number;
  totalQuestions: number;
  elapsed: number;
  children: React.ReactNode;
}

export function CommonTestQuestionCard({
  question,
  theme,
  questionNumber,
  totalQuestions,
  elapsed,
  children,
}: Props) {
  const isEnglish = question.subjectId === "english-reading";
  const overTime = elapsed > question.estimatedMinutes * 60;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-1 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
              background: `linear-gradient(90deg, rgba(${theme.glowRgb},0.7), rgba(${theme.glowRgb},1))`,
            }}
          />
        </div>
        <span className="font-mono text-[10px] text-white/40 shrink-0">
          {questionNumber}/{totalQuestions}
        </span>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
          style={{
            background: `rgba(${theme.glowRgb},0.08)`,
            border: `1px solid rgba(${theme.glowRgb},0.22)`,
            color: theme.primary,
          }}
        >
          <BookOpen className="h-3 w-3" />
          {question.title}
        </span>

        <DifficultyBadge difficulty={question.difficulty} />

        <span
          className="ml-auto inline-flex items-center gap-1 font-mono text-[10px]"
          style={{ color: overTime ? "#ef4444" : "rgba(255,255,255,0.35)" }}
        >
          <Timer className="h-3 w-3" />
          {formatTime(elapsed)}
          <span className="text-white/20">／</span>
          {question.estimatedMinutes}min
        </span>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-1.5">
        {question.skillTags.map((tag) => (
          <span
            key={tag}
            className="rounded px-1.5 py-0.5 font-mono text-[8px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Question body */}
      {isEnglish ? (
        <EnglishReadingSplitView question={question} theme={theme}>
          {children}
        </EnglishReadingSplitView>
      ) : (
        <MathQuestionBody question={question} theme={theme}>
          {children}
        </MathQuestionBody>
      )}
    </div>
  );
}

// ── Math layout ───────────────────────────────────────────────────────────
function MathQuestionBody({
  question,
  children,
}: {
  question: CommonTestDrillQuestion;
  theme: CommonTestTheme;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {/* 問題本文 — 紙面風（白背景・黒文字） */}
      <div
        className="rounded-lg p-5 sm:p-6"
        style={{
          background: "#ffffff",
          border: "1px solid #d1d5db",
          color: "#1f2937",
        }}
      >
        {question.context && (
          <div
            className="mb-4 rounded p-3.5 text-sm leading-[1.9] whitespace-pre-wrap"
            style={{
              background: "#fafafa",
              border: "1px solid #e5e7eb",
              color: "#374151",
            }}
          >
            <MathText className="text-sm leading-[1.9]">{question.context}</MathText>
          </div>
        )}
        <MathText className="text-[15px] leading-loose" >
          {question.statement}
        </MathText>
      </div>
      {children}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: "BASIC" | "STANDARD" | "HARD" }) {
  const cfg = {
    BASIC:    { bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.30)",  color: "#22c55e" },
    STANDARD: { bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.30)", color: "#fbbf24" },
    HARD:     { bg: "rgba(239,68,68,0.10)",  border: "rgba(239,68,68,0.30)",  color: "#ef4444" },
  }[difficulty];
  return (
    <span
      className="rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
    >
      {difficulty}
    </span>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
