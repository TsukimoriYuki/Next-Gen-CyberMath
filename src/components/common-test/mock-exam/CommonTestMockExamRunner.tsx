"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  Send,
  TriangleAlert,
} from "lucide-react";
import type {
  CommonTestMockExam,
  CommonTestQuestion,
  CommonTestSection,
  ExamAsset,
  ExamBlank,
} from "@/data/common-test-mock-exams";
import { MathText } from "@/components/math/Math";
import {
  getBlankAnswer,
  isCommonTestMockQuestionAnswered,
  scoreCommonTestMockExam,
  type CommonTestMockAnswers,
  type CommonTestMockAnswerValue,
  type CommonTestMockFlags,
} from "@/lib/common-test-mock-scoring";
import { cn } from "@/lib/utils";

type ExamMode = "taking" | "submitted" | "review";

type Props = {
  exam: CommonTestMockExam;
};

export function CommonTestMockExamRunner({ exam }: Props) {
  const [mode, setMode] = useState<ExamMode>("taking");
  const [currentSectionId, setCurrentSectionId] = useState(exam.sections[0]?.id ?? "");
  const [answers, setAnswers] = useState<CommonTestMockAnswers>({});
  const [flags, setFlags] = useState<CommonTestMockFlags>({});
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const score = useMemo(() => scoreCommonTestMockExam(exam, answers), [exam, answers]);
  const currentSection =
    exam.sections.find((section) => section.id === currentSectionId) ?? exam.sections[0];
  const currentIndex = exam.sections.findIndex((section) => section.id === currentSection.id);
  const remainingSec = Math.max(0, exam.durationMinutes * 60 - elapsedSec);
  const isOvertime = remainingSec === 0 && mode === "taking";

  useEffect(() => {
    if (mode !== "taking") return;
    const timer = window.setInterval(() => {
      setElapsedSec((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  function setQuestionAnswer(questionId: string, value: CommonTestMockAnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function setBlankAnswer(questionId: string, blank: ExamBlank, value: string) {
    setAnswers((prev) => {
      const current = prev[questionId];
      const next =
        current && typeof current === "object" && !Array.isArray(current)
          ? { ...current }
          : {};
      next[blank.id] = value;
      return { ...prev, [questionId]: next };
    });
  }

  function toggleFlag(questionId: string) {
    setFlags((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  }

  function go(delta: number) {
    const next = Math.min(exam.sections.length - 1, Math.max(0, currentIndex + delta));
    setCurrentSectionId(exam.sections[next].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    setShowSubmitConfirm(false);
    setMode("submitted");
  }

  return (
    <main className="min-h-screen bg-[#f3f4f6] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-300 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/common-test/simulator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              本番演習一覧へ戻る
            </Link>
            <h1 className="mt-1 text-base font-extrabold text-slate-950 sm:text-lg">
              {exam.title}
            </h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
              <span>{exam.durationMinutes}分</span>
              <span>/</span>
              <span>{exam.totalPoints}点</span>
              <span>/</span>
              <span>目標平均 {exam.targetAverage.min}〜{exam.targetAverage.max}点</span>
              <span>/</span>
              <span>未解答 {score.unansweredCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBox
              label={isOvertime ? "時間外演習" : mode === "taking" ? "残り時間" : "経過時間"}
              value={formatTime(mode === "taking" ? remainingSec : elapsedSec)}
              danger={isOvertime}
            />
            {mode === "taking" ? (
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="inline-flex items-center gap-2 rounded border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-extrabold text-white hover:bg-slate-800"
              >
                <Send className="h-4 w-4" />
                提出する
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode("review")}
                className="inline-flex items-center gap-2 rounded border border-blue-700 bg-blue-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                <CheckCircle2 className="h-4 w-4" />
                解説を見る
              </button>
            )}
          </div>
        </div>
      </header>

      {mode !== "taking" && (
        <ResultBand
          exam={exam}
          score={score}
          flags={flags}
          onReview={() => setMode("review")}
        />
      )}

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
        <aside className="order-2 lg:order-1">
          <SectionNavigator
            exam={exam}
            currentSectionId={currentSection.id}
            answers={answers}
            flags={flags}
            onSelect={setCurrentSectionId}
          />
        </aside>

        <section className="order-1 min-w-0 lg:order-2">
          <ExamPaperSection
            section={currentSection}
            mode={mode}
            answers={answers}
            flags={flags}
            onAnswer={setQuestionAnswer}
            onBlankAnswer={setBlankAnswer}
            onToggleFlag={toggleFlag}
          />

          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              前の大問
            </button>
            <div className="text-xs font-bold text-slate-500">
              {currentIndex + 1} / {exam.sections.length}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={currentIndex + 1 === exam.sections.length}
              className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              次の大問
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <aside className="order-3">
          <AnswerStatusPanel
            exam={exam}
            flags={flags}
            score={score}
            mode={mode}
          />
        </aside>
      </div>

      {showSubmitConfirm && (
        <SubmitDialog
          unansweredCount={score.unansweredCount}
          flaggedCount={Object.values(flags).filter(Boolean).length}
          onCancel={() => setShowSubmitConfirm(false)}
          onSubmit={submit}
        />
      )}
    </main>
  );
}

function ExamPaperSection({
  section,
  mode,
  answers,
  flags,
  onAnswer,
  onBlankAnswer,
  onToggleFlag,
}: {
  section: CommonTestSection;
  mode: ExamMode;
  answers: CommonTestMockAnswers;
  flags: CommonTestMockFlags;
  onAnswer: (questionId: string, value: CommonTestMockAnswerValue) => void;
  onBlankAnswer: (questionId: string, blank: ExamBlank, value: string) => void;
  onToggleFlag: (questionId: string) => void;
}) {
  return (
    <article className="border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-slate-500">{section.unit}</div>
            <h2 className="mt-1 text-xl font-extrabold text-slate-950">{section.title}</h2>
          </div>
          <div className="rounded border border-slate-300 px-3 py-2 text-right">
            <div className="text-[11px] font-bold text-slate-500">配点 / 目安</div>
            <div className="font-mono text-sm font-extrabold text-slate-950">
              {section.points}点 / {section.estimatedMinutes}分
            </div>
          </div>
        </div>
        <div className="mt-4 border-l-4 border-slate-800 bg-slate-50 px-4 py-3">
          <MathText className="text-sm leading-7 text-slate-800">{section.leadText}</MathText>
        </div>
      </div>

      {section.assets && section.assets.length > 0 && (
        <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-5 py-4 md:grid-cols-2">
          {section.assets.map((asset) => (
            <AssetBlock key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      <div className="divide-y divide-slate-200">
        {section.questions.map((question, index) => (
          <QuestionBlock
            key={question.id}
            question={question}
            index={index + 1}
            mode={mode}
            answer={answers[question.id]}
            flagged={!!flags[question.id]}
            onAnswer={(value) => onAnswer(question.id, value)}
            onBlankAnswer={(blank, value) => onBlankAnswer(question.id, blank, value)}
            onToggleFlag={() => onToggleFlag(question.id)}
          />
        ))}
      </div>
    </article>
  );
}

function QuestionBlock({
  question,
  index,
  mode,
  answer,
  flagged,
  onAnswer,
  onBlankAnswer,
  onToggleFlag,
}: {
  question: CommonTestQuestion;
  index: number;
  mode: ExamMode;
  answer: CommonTestMockAnswerValue | undefined;
  flagged: boolean;
  onAnswer: (value: CommonTestMockAnswerValue) => void;
  onBlankAnswer: (blank: ExamBlank, value: string) => void;
  onToggleFlag: () => void;
}) {
  const submitted = mode !== "taking";
  const isCorrect = submitted
    ? question.blanks?.length
      ? question.blanks.every((blank) => getBlankAnswer(answer, blank) === blank.correctAnswer)
      : answer === question.answer
    : false;

  return (
    <section className="px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 min-w-8 items-center justify-center border border-slate-400 bg-white px-2 font-mono text-sm font-bold">
            {index}
          </span>
          <span className="text-xs font-bold text-slate-500">{question.points}点</span>
          <span className="text-xs font-bold text-slate-500">{difficultyLabel(question.difficulty)}</span>
        </div>
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={flagged}
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded border text-slate-500",
            flagged ? "border-amber-400 bg-amber-100 text-amber-700" : "border-slate-300 bg-white",
          )}
          aria-label="見直しフラグ"
        >
          <Flag className={cn("h-4 w-4", flagged && "fill-current")} />
        </button>
      </div>

      <MathText className="mt-4 text-[15px] leading-8 text-slate-950">{question.prompt}</MathText>

      <div className="mt-4">
        {question.blanks && question.blanks.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {question.blanks.map((blank) => (
              <label key={blank.id} className="flex items-center gap-2">
                <span className="inline-flex h-9 min-w-10 items-center justify-center border border-slate-500 bg-white px-2 font-bold">
                  {blank.label}
                </span>
                <input
                  value={getBlankAnswer(answer, blank)}
                  onChange={(event) => onBlankAnswer(blank, event.target.value)}
                  disabled={submitted}
                  inputMode={blank.type.includes("integer") ? "numeric" : "text"}
                  className="h-10 rounded-none border border-slate-400 bg-white px-3 font-mono text-sm font-bold text-slate-950 outline-none focus:border-blue-600 disabled:bg-slate-100"
                  style={{ width: `${blank.width ?? 5}rem` }}
                  aria-label={`${blank.label}の解答`}
                />
                {submitted && (
                  <span className="text-xs font-bold text-slate-500">
                    正答 {blank.correctAnswer}
                  </span>
                )}
              </label>
            ))}
          </div>
        ) : question.choices ? (
          <div className="grid gap-2">
            {question.choices.map((choice) => {
              const active = answer === choice.id;
              const showCorrect = submitted && choice.isCorrect;
              const showWrong = submitted && active && !choice.isCorrect;
              return (
                <button
                  key={choice.id}
                  type="button"
                  disabled={submitted}
                  onClick={() => onAnswer(active ? "" : choice.id)}
                  className={cn(
                    "flex items-start gap-3 border px-3 py-3 text-left text-sm leading-6",
                    active ? "border-blue-700 bg-blue-50" : "border-slate-300 bg-white",
                    showCorrect && "border-emerald-600 bg-emerald-50",
                    showWrong && "border-rose-500 bg-rose-50",
                    submitted ? "cursor-default" : "hover:border-blue-500",
                  )}
                >
                  <span className="inline-flex h-7 min-w-7 items-center justify-center border border-slate-400 bg-white font-mono text-xs font-bold">
                    {choice.label}
                  </span>
                  <MathText className="text-sm leading-6 text-slate-900">{choice.text}</MathText>
                </button>
              );
            })}
          </div>
        ) : (
          <input
            value={typeof answer === "string" ? answer : ""}
            onChange={(event) => onAnswer(event.target.value)}
            disabled={submitted}
            className="h-10 w-full max-w-sm rounded-none border border-slate-400 bg-white px-3 font-mono text-sm font-bold outline-none focus:border-blue-600 disabled:bg-slate-100"
            aria-label="解答"
          />
        )}
      </div>

      {submitted && (
        <div className={cn("mt-4 border px-4 py-3", isCorrect ? "border-emerald-300 bg-emerald-50" : "border-slate-300 bg-slate-50")}>
          <div className="text-xs font-extrabold text-slate-700">
            {isCorrect ? "正解" : "復習ポイント"}
          </div>
          <MathText className="mt-2 text-sm leading-7 text-slate-800">
            {mode === "review" ? question.explanation : question.shortSolution ?? question.explanation}
          </MathText>
          {mode === "review" && (
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <MiniReview label="測っている力" value={question.measuredAbility} />
              <MiniReview label="よくある誤答" value={question.commonMistakes.join(" / ")} />
              <MiniReview label="時短ポイント" value={question.timeSavingTip} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function AssetBlock({ asset }: { asset: ExamAsset }) {
  if (asset.type === "table") {
    return (
      <figure className="border border-slate-300 bg-white p-3">
        <figcaption className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</figcaption>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {asset.headers.map((header) => (
                  <th key={header} className="border border-slate-300 bg-slate-100 px-2 py-2 text-left">
                    <MathText className="text-xs font-bold">{header}</MathText>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asset.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="border border-slate-300 px-2 py-2">
                      <MathText className="text-xs">{cell}</MathText>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {asset.note && <p className="mt-2 text-xs text-slate-500">{asset.note}</p>}
      </figure>
    );
  }

  if (asset.type === "graph") {
    return (
      <figure className="border border-slate-300 bg-white p-3">
        <figcaption className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</figcaption>
        <QuadraticGraph />
        {asset.note && <p className="mt-2 text-xs text-slate-500">{asset.note}</p>}
      </figure>
    );
  }

  if (asset.type === "diagram") {
    return (
      <figure className="border border-slate-300 bg-white p-3">
        <figcaption className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</figcaption>
        <TriangleDiagram />
        {asset.note && <p className="mt-2 text-xs text-slate-500">{asset.note}</p>}
      </figure>
    );
  }

  return (
    <div className="border border-slate-300 bg-white p-3">
      <div className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</div>
      <div className="space-y-2">
        {asset.lines.map((line) => (
          <div key={`${line.speaker}-${line.text}`} className="grid grid-cols-[4rem_minmax(0,1fr)] gap-2 text-sm">
            <span className="font-bold text-slate-700">{line.speaker}</span>
            <MathText className="leading-6 text-slate-800">{line.text}</MathText>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuadraticGraph() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="下に開く二次関数と定義域の図" className="h-auto w-full">
      <rect x="0" y="0" width="360" height="220" fill="#f8fafc" />
      <line x1="40" y1="180" x2="330" y2="180" stroke="#475569" strokeWidth="1.5" />
      <line x1="60" y1="25" x2="60" y2="190" stroke="#475569" strokeWidth="1.5" />
      {[0, 1, 2, 3, 4, 5, 6].map((x) => (
        <g key={x}>
          <line x1={60 + x * 36} y1="176" x2={60 + x * 36} y2="184" stroke="#64748b" />
          <text x={60 + x * 36} y="202" textAnchor="middle" fontSize="11" fill="#334155">{x}</text>
        </g>
      ))}
      <path
        d="M60 144 C96 70 124 36 132 36 C160 36 204 120 276 180"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="3"
      />
      <line x1="60" y1="28" x2="276" y2="28" stroke="#94a3b8" strokeDasharray="5 5" />
      <line x1="276" y1="28" x2="276" y2="184" stroke="#94a3b8" strokeDasharray="5 5" />
      <circle cx="132" cy="36" r="4" fill="#dc2626" />
      <text x="139" y="34" fontSize="12" fill="#991b1b">頂点</text>
      <text x="294" y="178" fontSize="12" fill="#334155">x</text>
      <text x="66" y="35" fontSize="12" fill="#334155">y</text>
      <text x="167" y="18" fontSize="12" fill="#334155">{"0 <= x <= 6"}</text>
    </svg>
  );
}

function TriangleDiagram() {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="三角形ABCと内接円外接円の図" className="h-auto w-full">
      <rect width="360" height="240" fill="#f8fafc" />
      <circle cx="180" cy="125" r="95" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="6 5" />
      <polygon points="95,185 278,185 184,48" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
      <circle cx="183" cy="145" r="36" fill="none" stroke="#2563eb" strokeWidth="2" />
      <line x1="183" y1="145" x2="183" y2="181" stroke="#2563eb" strokeWidth="1.5" />
      <text x="184" y="38" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">A</text>
      <text x="83" y="202" fontSize="14" fontWeight="700" fill="#0f172a">B</text>
      <text x="286" y="202" fontSize="14" fontWeight="700" fill="#0f172a">C</text>
      <text x="128" y="115" fontSize="12" fill="#334155">13</text>
      <text x="238" y="115" fontSize="12" fill="#334155">14</text>
      <text x="181" y="204" fontSize="12" fill="#334155">15</text>
      <text x="190" y="166" fontSize="12" fill="#1d4ed8">r</text>
    </svg>
  );
}

function SectionNavigator({
  exam,
  currentSectionId,
  answers,
  flags,
  onSelect,
}: {
  exam: CommonTestMockExam;
  currentSectionId: string;
  answers: CommonTestMockAnswers;
  flags: CommonTestMockFlags;
  onSelect: (sectionId: string) => void;
}) {
  return (
    <nav className="sticky top-24 border border-slate-300 bg-white p-3">
      <div className="mb-3 text-xs font-extrabold text-slate-600">大問一覧</div>
      <div className="grid gap-2">
        {exam.sections.map((section) => {
          const answered = section.questions.filter((question) =>
            isCommonTestMockQuestionAnswered(question, answers[question.id]),
          ).length;
          const flagged = section.questions.some((question) => flags[question.id]);
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              className={cn(
                "border px-3 py-3 text-left",
                currentSectionId === section.id
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-300 bg-white text-slate-800 hover:border-slate-600",
              )}
            >
              <div className="text-xs font-extrabold">{section.title.replace("第", "第")}</div>
              <div className="mt-1 flex items-center justify-between text-[11px] opacity-80">
                <span>{answered}/{section.questions.length}問</span>
                <span>{section.points}点</span>
              </div>
              {flagged && <div className="mt-1 text-[11px] font-bold text-amber-600">見直しあり</div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function AnswerStatusPanel({
  exam,
  flags,
  score,
  mode,
}: {
  exam: CommonTestMockExam;
  flags: CommonTestMockFlags;
  score: ReturnType<typeof scoreCommonTestMockExam>;
  mode: ExamMode;
}) {
  return (
    <aside className="sticky top-24 border border-slate-300 bg-white p-4">
      <div className="text-xs font-extrabold text-slate-600">解答状況</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <SmallMetric label="入力済み" value={`${score.answeredCount}`} />
        <SmallMetric label="未解答" value={`${score.unansweredCount}`} danger={score.unansweredCount > 0} />
        <SmallMetric label="見直し" value={`${Object.values(flags).filter(Boolean).length}`} />
        <SmallMetric label={mode === "taking" ? "配点" : "得点"} value={mode === "taking" ? `${exam.totalPoints}` : `${score.totalScore}`} />
      </div>
      {mode !== "taking" && (
        <div className="mt-4 space-y-2">
          {score.sectionScores.map((section) => (
            <div key={section.sectionId} className="border border-slate-200 p-2">
              <div className="text-[11px] font-bold text-slate-700">{section.title}</div>
              <div className="mt-1 font-mono text-sm font-extrabold">
                {section.score} / {section.maxScore}
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

function ResultBand({
  exam,
  score,
  flags,
  onReview,
}: {
  exam: CommonTestMockExam;
  score: ReturnType<typeof scoreCommonTestMockExam>;
  flags: CommonTestMockFlags;
  onReview: () => void;
}) {
  return (
    <section className="border-b border-slate-300 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <div className="flex flex-wrap gap-3">
            <Metric label="得点" value={`${score.totalScore} / ${exam.totalPoints}点`} />
            <Metric label="正答数" value={`${score.correctCount} / ${score.totalQuestions}`} />
            <Metric label="未解答" value={`${score.unansweredCount}`} />
            <Metric label="見直し" value={`${Object.values(flags).filter(Boolean).length}`} />
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-5">
            {score.sectionScores.map((section) => (
              <div key={section.sectionId} className="border border-slate-200 bg-slate-50 p-3">
                <div className="text-[11px] font-bold text-slate-600">{section.title}</div>
                <div className="mt-1 font-mono text-sm font-extrabold">
                  {section.score} / {section.maxScore}
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  弱点 {section.weakTags.slice(0, 2).join(" / ") || "なし"}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onReview}
          className="inline-flex items-center justify-center gap-2 rounded border border-blue-700 bg-blue-700 px-4 py-3 text-sm font-extrabold text-white"
        >
          <BookOpen className="h-4 w-4" />
          復習モード
        </button>
      </div>
    </section>
  );
}

function SubmitDialog({
  unansweredCount,
  flaggedCount,
  onCancel,
  onSubmit,
}: {
  unansweredCount: number;
  flaggedCount: number;
  onCancel: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md border border-slate-300 bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-1 h-5 w-5 text-amber-600" />
          <div>
            <h2 className="text-lg font-extrabold text-slate-950">解答を提出しますか</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              提出後は採点結果を表示します。未解答と見直しフラグを確認してください。
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <SmallMetric label="未解答" value={`${unansweredCount}`} danger={unansweredCount > 0} />
          <SmallMetric label="見直し" value={`${flaggedCount}`} danger={flaggedCount > 0} />
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded border border-slate-300 bg-white px-4 py-3 text-sm font-bold"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="flex-1 rounded border border-slate-950 bg-slate-950 px-4 py-3 text-sm font-bold text-white"
          >
            提出する
          </button>
        </div>
      </div>
    </div>
  );
}

function MiniReview({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-200 bg-white p-3">
      <div className="text-[11px] font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-xs leading-5 text-slate-700">{value}</div>
    </div>
  );
}

function StatusBox({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-2 border px-3 py-2", danger ? "border-rose-300 bg-rose-50" : "border-slate-300 bg-white")}>
      <Clock className={cn("h-4 w-4", danger ? "text-rose-700" : "text-slate-600")} />
      <div>
        <div className="text-[10px] font-bold text-slate-500">{label}</div>
        <div className="font-mono text-sm font-extrabold text-slate-950">{value}</div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-200 bg-slate-50 px-4 py-3">
      <div className="text-[11px] font-bold text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-lg font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function SmallMetric({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className={cn("border p-3 text-center", danger ? "border-amber-300 bg-amber-50" : "border-slate-200 bg-slate-50")}>
      <div className="text-[11px] font-bold text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-lg font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function difficultyLabel(difficulty: CommonTestQuestion["difficulty"]) {
  const labels: Record<CommonTestQuestion["difficulty"], string> = {
    basic: "基礎",
    standard: "標準",
    hard: "読解",
    trap: "罠",
    "time-consuming": "時間",
  };
  return labels[difficulty];
}

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
