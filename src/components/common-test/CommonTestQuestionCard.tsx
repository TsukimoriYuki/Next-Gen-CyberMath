import { BookOpen, Timer } from "lucide-react";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
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
  const progress = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
            style={{ background: `rgba(${theme.glowRgb},0.10)`, color: theme.primary }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            問{questionNumber}
          </span>
          <span className="text-sm font-bold text-slate-900">{question.title}</span>
          <DifficultyBadge difficulty={question.difficulty} />
          <span
            className={`ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${
              overTime
                ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                : "bg-slate-50 text-slate-600 ring-1 ring-slate-200"
            }`}
          >
            <Timer className="h-3.5 w-3.5" />
            {formatTime(elapsed)} / 目安 {question.estimatedMinutes}分
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {questionNumber}/{totalQuestions}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {question.skillTags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isEnglish ? (
        <EnglishReadingSplitView question={question} theme={theme}>
          {children}
        </EnglishReadingSplitView>
      ) : (
        <MathQuestionBody question={question}>{children}</MathQuestionBody>
      )}
    </div>
  );
}

function MathQuestionBody({
  question,
  children,
}: {
  question: CommonTestDrillQuestion;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        {question.context && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            <MathText className="text-sm leading-7">{question.context}</MathText>
          </div>
        )}
        <div className="text-[15px] leading-8 text-slate-950">
          <MathText className="text-[15px] leading-8">{question.statement}</MathText>
        </div>
      </article>
      {children}
    </div>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: "BASIC" | "STANDARD" | "HARD" }) {
  const cfg = {
    BASIC: { label: "基本", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
    STANDARD: { label: "標準", cls: "bg-amber-50 text-amber-700 ring-amber-200" },
    HARD: { label: "発展", cls: "bg-rose-50 text-rose-700 ring-rose-200" },
  }[difficulty];

  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
