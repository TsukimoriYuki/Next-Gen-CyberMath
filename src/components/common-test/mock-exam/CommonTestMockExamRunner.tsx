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
  isCommonTestMockQuestionCorrect,
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
    const timer = window.setInterval(() => setElapsedSec((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  function setQuestionAnswer(questionId: string, value: CommonTestMockAnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function setBlankAnswer(questionId: string, blank: ExamBlank, value: string) {
    setAnswers((prev) => {
      const current = prev[questionId];
      const next =
        current && typeof current === "object" && !Array.isArray(current) ? { ...current } : {};
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
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="no-print sticky top-0 z-40 border-b border-stone-300 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/common-test/simulator"
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-xs font-bold text-slate-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              模試一覧へ戻る
            </Link>
            <h1 className="mt-1 text-base font-extrabold text-slate-950 sm:text-lg">
              {exam.title}
            </h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
              <span>数学I，数学A</span>
              <span>/</span>
              <span>全問必答</span>
              <span>/</span>
              <span>{exam.durationMinutes}分</span>
              <span>/</span>
              <span>{exam.totalPoints}点満点</span>
              <span>/</span>
              <span>未解答 {score.unansweredCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBox
              label={isOvertime ? "時間超過" : mode === "taking" ? "残り時間" : "経過時間"}
              value={formatTime(mode === "taking" ? remainingSec : elapsedSec)}
              danger={isOvertime}
            />
            {mode === "taking" ? (
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                <Send className="h-4 w-4" />
                提出する
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setMode("review")}
                className="inline-flex min-h-11 items-center gap-2 rounded border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-extrabold text-white hover:bg-blue-800"
              >
                <BookOpen className="h-4 w-4" />
                解説を見る
              </button>
            )}
          </div>
        </div>
      </header>

      {mode !== "taking" && (
        <ResultBand exam={exam} score={score} flags={flags} onReview={() => setMode("review")} />
      )}

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)_300px]">
        <aside className="no-print order-2 lg:order-1">
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
            exam={exam}
            section={currentSection}
            sectionIndex={currentIndex}
            mode={mode}
            answers={answers}
            flags={flags}
            onAnswer={setQuestionAnswer}
            onBlankAnswer={setBlankAnswer}
            onToggleFlag={toggleFlag}
          />

          <div className="no-print mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
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
              className="inline-flex min-h-11 items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              次の大問
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        <aside className="no-print order-3">
          <AnswerStatusPanel exam={exam} flags={flags} score={score} mode={mode} />
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
    </div>
  );
}

function ExamPaperSection({
  exam,
  section,
  sectionIndex,
  mode,
  answers,
  flags,
  onAnswer,
  onBlankAnswer,
  onToggleFlag,
}: {
  exam: CommonTestMockExam;
  section: CommonTestSection;
  sectionIndex: number;
  mode: ExamMode;
  answers: CommonTestMockAnswers;
  flags: CommonTestMockFlags;
  onAnswer: (questionId: string, value: CommonTestMockAnswerValue) => void;
  onBlankAnswer: (questionId: string, blank: ExamBlank, value: string) => void;
  onToggleFlag: (questionId: string) => void;
}) {
  return (
    <article className="print-sheet border border-stone-300 bg-[#fffdf8] shadow-sm">
      <div className="border-b border-stone-300 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            {sectionIndex === 0 && (
              <div className="mb-6 text-center">
                <div className="text-xs font-bold text-slate-500">数学I，数学A</div>
                <div className="mt-2 text-3xl font-black tracking-normal">数学I，数学A</div>
                <div className="mt-2 text-lg font-bold">（全問必答）</div>
              </div>
            )}
            <h2 className="text-2xl font-black tracking-normal">
              {section.title}
              <span className="ml-4 text-base font-normal">（配点 {section.points}）</span>
            </h2>
            <div className="mt-2 text-sm text-slate-600">{section.unit}</div>
          </div>
          <div className="no-print rounded border border-stone-300 px-3 py-2 text-right">
            <div className="text-xs font-bold text-slate-500">現在の大問</div>
            <div className="text-sm font-extrabold tabular-nums text-slate-950">
              {sectionIndex + 1} / {exam.sections.length}
            </div>
          </div>
        </div>
        <MathText className="mt-4 text-sm leading-7 text-slate-800">{section.leadText}</MathText>
      </div>

      {section.assets && section.assets.length > 0 && (
        <div className="grid gap-4 border-b border-stone-200 px-5 py-4 md:grid-cols-2">
          {section.assets.map((asset) => (
            <AssetBlock key={asset.id} asset={asset} />
          ))}
        </div>
      )}

      <div className="divide-y divide-stone-200">
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
  const isCorrect = submitted ? isCommonTestMockQuestionCorrect(question, answer) : false;

  return (
    <section className="break-inside-avoid px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 min-w-8 items-center justify-center border border-slate-500 bg-white px-2 text-sm font-bold tabular-nums">
            {index}
          </span>
          <span className="text-xs font-bold text-slate-500">{question.points}点</span>
          <span className="no-print text-xs font-bold text-slate-500">
            {difficultyLabel(question.difficulty)}
          </span>
        </div>
        <button
          type="button"
          onClick={onToggleFlag}
          aria-pressed={flagged}
          className={cn(
            "no-print inline-flex h-11 w-11 items-center justify-center rounded border text-slate-500",
            flagged ? "border-amber-400 bg-amber-100 text-amber-700" : "border-slate-300 bg-white",
          )}
          aria-label="見直しフラグ"
        >
          <Flag className={cn("h-4 w-4", flagged && "fill-current")} />
        </button>
      </div>

      <MathText className="mt-4 text-[15px] leading-8 text-slate-950">{question.prompt}</MathText>

      <AnswerInput
        question={question}
        answer={answer}
        submitted={submitted}
        onAnswer={onAnswer}
        onBlankAnswer={onBlankAnswer}
      />

      {submitted && (
        <div
          className={cn(
            "mt-4 border px-4 py-3",
            isCorrect ? "border-emerald-300 bg-emerald-50" : "border-stone-300 bg-stone-50",
          )}
        >
          <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700">
            {isCorrect ? <CheckCircle2 className="h-4 w-4 text-emerald-700" /> : null}
            {isCorrect ? "正解" : "復習ポイント"}
          </div>
          <MathText className="mt-2 text-sm leading-7 text-slate-800">
            {mode === "review" ? question.explanation : question.shortSolution ?? question.explanation}
          </MathText>
          {mode === "review" && (
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              <MiniReview label="方針" value={question.measuredAbility} />
              <MiniReview label="よくあるミス" value={question.commonMistakes.join(" / ")} />
              <MiniReview label="時短ポイント" value={question.timeSavingTip} />
            </div>
          )}
          {mode === "review" && question.reviewLinks && (
            <div className="mt-3 flex flex-wrap gap-2">
              {question.reviewLinks.map((href) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 items-center gap-1 border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  復習リンク
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// PDF冊子ビューア (CommonTestPdfMockViewer) からも解答入力欄を再利用するため export する。
// 問題本文の再構成（prompt / 図解）はこのファイル固有のままにし、入力欄だけ共有する。
export function AnswerInput({
  question,
  answer,
  submitted,
  onAnswer,
  onBlankAnswer,
}: {
  question: CommonTestQuestion;
  answer: CommonTestMockAnswerValue | undefined;
  submitted: boolean;
  onAnswer: (value: CommonTestMockAnswerValue) => void;
  onBlankAnswer: (blank: ExamBlank, value: string) => void;
}) {
  if (question.blanks && question.blanks.length > 0) {
    return (
      <div className="mt-4 flex flex-wrap gap-3">
        {question.blanks.map((blank) => (
          <label key={blank.id} className="flex items-center gap-2">
            <span className="inline-flex h-9 min-w-10 items-center justify-center border-2 border-double border-slate-700 bg-white px-2 font-bold">
              {blank.label}
            </span>
            <input
              value={getBlankAnswer(answer, blank)}
              onChange={(event) => onBlankAnswer(blank, event.target.value)}
              disabled={submitted}
              inputMode={blank.type.includes("integer") ? "numeric" : "text"}
              className="h-11 rounded-none border border-slate-500 bg-white px-3 text-sm font-bold tabular-nums text-slate-950 outline-none focus:border-blue-600 disabled:bg-stone-100"
              style={{ width: `${blank.width ?? 5}rem` }}
              aria-label={`${blank.label}の解答`}
            />
            {submitted && (
              <span className="text-xs font-bold text-slate-500">正答 {blank.correctAnswer}</span>
            )}
          </label>
        ))}
      </div>
    );
  }

  if (question.choices) {
    const selected = Array.isArray(answer) ? answer : typeof answer === "string" ? [answer] : [];
    return (
      <div className="mt-4 grid gap-2">
        {question.choices.map((choice) => {
          const active = selected.includes(choice.id);
          const showCorrect = submitted && choice.isCorrect;
          const showWrong = submitted && active && !choice.isCorrect;
          return (
            <button
              key={choice.id}
              type="button"
              disabled={submitted}
              onClick={() => {
                if (question.answerFormat === "multi-choice") {
                  onAnswer(
                    active
                      ? selected.filter((id) => id !== choice.id)
                      : [...selected, choice.id],
                  );
                } else {
                  onAnswer(active ? "" : choice.id);
                }
              }}
              className={cn(
                "flex min-h-11 items-start gap-3 border px-3 py-3 text-left text-sm leading-6",
                active ? "border-blue-700 bg-blue-50" : "border-stone-300 bg-white",
                showCorrect && "border-emerald-600 bg-emerald-50",
                showWrong && "border-rose-500 bg-rose-50",
                submitted ? "cursor-default" : "hover:border-blue-500",
              )}
            >
              <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-slate-500 bg-white text-xs font-bold">
                {choice.label}
              </span>
              <MathText className="text-sm leading-6 text-slate-900">{choice.text}</MathText>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <input
      value={typeof answer === "string" ? answer : ""}
      onChange={(event) => onAnswer(event.target.value)}
      disabled={submitted}
      className="mt-4 h-11 w-full max-w-sm rounded-none border border-slate-500 bg-white px-3 text-sm font-bold tabular-nums outline-none focus:border-blue-600 disabled:bg-stone-100"
      aria-label="解答"
    />
  );
}

function AssetBlock({ asset }: { asset: ExamAsset }) {
  if (asset.type === "conversation") {
    return (
      <div className="border border-stone-400 bg-white p-3">
        <div className="mb-2 text-sm font-extrabold text-slate-800">{asset.title}</div>
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

  if (asset.type === "diagram") {
    return (
      <figure className="break-inside-avoid border border-stone-300 bg-white p-3">
        <figcaption className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</figcaption>
        {asset.variant === "tower-elevation" ? (
          <TowerElevationDiagram alt={asset.alt} />
        ) : asset.variant === "sphere-plane" ? (
          <SpherePlaneDiagram alt={asset.alt} />
        ) : (
          <CircleTangentDiagram alt={asset.alt} />
        )}
        {asset.note && <p className="mt-2 text-xs text-slate-500">{asset.note}</p>}
      </figure>
    );
  }

  if (asset.type === "table") {
    return (
      <figure className="border border-stone-300 bg-white p-3">
        <figcaption className="mb-2 text-xs font-extrabold text-slate-700">{asset.title}</figcaption>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {asset.headers.map((header) => (
                  <th key={header} className="border border-stone-300 bg-stone-100 px-2 py-2 text-left">
                    <MathText className="text-xs font-bold">{header}</MathText>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {asset.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`} className="border border-stone-300 px-2 py-2">
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

  return null;
}

function TowerElevationDiagram({ alt }: { alt: string }) {
  return (
    <svg viewBox="0 0 520 250" role="img" aria-label={alt} className="h-auto w-full">
      <rect width="520" height="250" fill="#fffdf8" />
      <line x1="55" y1="170" x2="475" y2="170" stroke="#111827" strokeWidth="2" />
      <line x1="390" y1="58" x2="390" y2="170" stroke="#111827" strokeWidth="3" />
      <line x1="80" y1="170" x2="390" y2="58" stroke="#111827" strokeWidth="2" />
      <line x1="230" y1="170" x2="390" y2="58" stroke="#111827" strokeWidth="2" />
      <path d="M100 170 A42 42 0 0 1 119 134" fill="none" stroke="#111827" strokeWidth="1.5" />
      <path d="M255 170 A42 42 0 0 1 280 136" fill="none" stroke="#111827" strokeWidth="1.5" />
      <line x1="80" y1="188" x2="230" y2="188" stroke="#111827" />
      <line x1="80" y1="181" x2="80" y2="195" stroke="#111827" />
      <line x1="230" y1="181" x2="230" y2="195" stroke="#111827" />
      <text x="76" y="190" fontSize="18" fontStyle="italic">A</text>
      <text x="224" y="190" fontSize="18" fontStyle="italic">B</text>
      <text x="385" y="190" fontSize="18" fontStyle="italic">T</text>
      <text x="385" y="48" fontSize="18" fontStyle="italic">P</text>
      <text x="125" y="154" fontSize="16">30°</text>
      <text x="285" y="154" fontSize="16">45°</text>
      <text x="139" y="213" fontSize="18">60 m</text>
      <text x="250" y="230" textAnchor="middle" fontSize="16">図1</text>
    </svg>
  );
}

function SpherePlaneDiagram({ alt }: { alt: string }) {
  return (
    <svg viewBox="0 0 420 260" role="img" aria-label={alt} className="h-auto w-full">
      <rect width="420" height="260" fill="#fffdf8" />
      <circle cx="210" cy="118" r="78" fill="none" stroke="#111827" strokeWidth="2" />
      <ellipse cx="210" cy="148" rx="88" ry="18" fill="none" stroke="#111827" strokeWidth="2" />
      <path d="M122 148 C150 118 270 118 298 148" fill="none" stroke="#111827" strokeDasharray="6 5" />
      <line x1="105" y1="148" x2="315" y2="148" stroke="#6b7280" strokeDasharray="6 6" />
      <line x1="210" y1="92" x2="210" y2="148" stroke="#111827" strokeWidth="2" />
      <circle cx="210" cy="92" r="3" fill="#111827" />
      <circle cx="210" cy="148" r="3" fill="#111827" />
      <text x="222" y="96" fontSize="18" fontStyle="italic">O</text>
      <text x="218" y="164" fontSize="18" fontStyle="italic">C</text>
      <text x="285" y="143" fontSize="18" fontStyle="italic">α</text>
      <text x="191" y="126" fontSize="16">5</text>
      <text x="246" y="162" fontSize="16" fontStyle="italic">r</text>
      <text x="210" y="230" textAnchor="middle" fontSize="16">参考図</text>
    </svg>
  );
}

function CircleTangentDiagram({ alt }: { alt: string }) {
  return (
    <svg viewBox="0 0 420 250" role="img" aria-label={alt} className="h-auto w-full">
      <rect width="420" height="250" fill="#fffdf8" />
      <circle cx="160" cy="130" r="68" fill="none" stroke="#111827" strokeWidth="2" />
      <circle cx="160" cy="130" r="3" fill="#111827" />
      <circle cx="187" cy="67" r="3" fill="#111827" />
      <line x1="160" y1="130" x2="187" y2="67" stroke="#111827" strokeWidth="2" />
      <line x1="187" y1="67" x2="340" y2="100" stroke="#111827" strokeWidth="2" />
      <line x1="160" y1="130" x2="340" y2="100" stroke="#111827" strokeWidth="2" />
      <path d="M183 78 L195 82 L191 94" fill="none" stroke="#111827" strokeWidth="1.5" />
      <text x="137" y="152" fontSize="18" fontStyle="italic">C</text>
      <text x="190" y="60" fontSize="18" fontStyle="italic">T</text>
      <text x="350" y="105" fontSize="18" fontStyle="italic">P</text>
      <text x="210" y="225" textAnchor="middle" fontSize="16">図1</text>
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
    <nav className="sticky top-24 border border-stone-300 bg-white p-3">
      <div className="mb-3 text-xs font-extrabold text-slate-600">大問ジャンプ</div>
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
                "min-h-11 border px-3 py-3 text-left",
                currentSectionId === section.id
                  ? "border-blue-300 bg-blue-50 text-blue-900"
                  : "border-stone-300 bg-white text-slate-800 hover:border-slate-600",
              )}
            >
              <div className="text-xs font-extrabold">{section.title}</div>
              <div className="mt-1 flex items-center justify-between text-xs opacity-80">
                <span>{answered}/{section.questions.length}問</span>
                <span>{section.points}点</span>
              </div>
              {flagged && <div className="mt-1 text-xs font-bold text-amber-700">見直しあり</div>}
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
    <aside className="sticky top-24 border border-stone-300 bg-white p-4">
      <div className="text-xs font-extrabold text-slate-600">解答状況</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <SmallMetric label="入力済み" value={`${score.answeredCount}`} />
        <SmallMetric label="未解答" value={`${score.unansweredCount}`} danger={score.unansweredCount > 0} />
        <SmallMetric label="見直し" value={`${Object.values(flags).filter(Boolean).length}`} />
        <SmallMetric label={mode === "taking" ? "満点" : "得点"} value={mode === "taking" ? `${exam.totalPoints}` : `${score.totalScore}`} />
      </div>
      {mode !== "taking" && (
        <div className="mt-4 space-y-2">
          {score.sectionScores.map((section) => (
            <div key={section.sectionId} className="border border-stone-200 p-2">
              <div className="text-xs font-bold text-slate-700">{section.title}</div>
              <div className="mt-1 text-sm font-extrabold tabular-nums">
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
    <section className="no-print border-b border-stone-300 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <div className="flex flex-wrap gap-3">
            <Metric label="得点" value={`${score.totalScore} / ${exam.totalPoints}点`} />
            <Metric label="正答数" value={`${score.correctCount} / ${score.totalQuestions}`} />
            <Metric label="未解答" value={`${score.unansweredCount}`} />
            <Metric label="見直し" value={`${Object.values(flags).filter(Boolean).length}`} />
          </div>
          <div className="mt-3 grid gap-2 md:grid-cols-4">
            {score.sectionScores.map((section) => (
              <div key={section.sectionId} className="border border-stone-200 bg-stone-50 p-3">
                <div className="text-xs font-bold text-slate-600">{section.title}</div>
                <div className="mt-1 text-sm font-extrabold tabular-nums">
                  {section.score} / {section.maxScore}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onReview}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-extrabold text-white"
        >
          <BookOpen className="h-4 w-4" />
          解説表示
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
      <div className="w-full max-w-md border border-stone-300 bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-1 h-5 w-5 text-amber-600" />
          <div>
            <h2 className="text-lg font-extrabold text-slate-950">解答を提出しますか</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              提出後に採点結果と大問別得点を表示します。未解答と見直しフラグを確認してください。
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
            className="min-h-11 flex-1 rounded border border-stone-300 bg-white px-4 py-2 text-sm font-bold"
          >
            戻る
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="min-h-11 flex-1 rounded border border-blue-700 bg-blue-700 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
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
    <div className="border border-stone-200 bg-white p-3">
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-xs leading-5 text-slate-700">{value}</div>
    </div>
  );
}

function StatusBox({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className={cn("inline-flex items-center gap-2 border px-3 py-2", danger ? "border-rose-300 bg-rose-50" : "border-stone-300 bg-white")}>
      <Clock className={cn("h-4 w-4", danger ? "text-rose-700" : "text-slate-600")} />
      <div>
        <div className="text-xs font-bold text-slate-500">{label}</div>
        <div className="text-sm font-extrabold tabular-nums text-slate-950">{value}</div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-stone-200 bg-stone-50 px-4 py-3">
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-extrabold tabular-nums text-slate-950">{value}</div>
    </div>
  );
}

function SmallMetric({ label, value, danger = false }: { label: string; value: string; danger?: boolean }) {
  return (
    <div className={cn("border p-3 text-center", danger ? "border-amber-300 bg-amber-50" : "border-stone-200 bg-stone-50")}>
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-lg font-extrabold tabular-nums text-slate-950">{value}</div>
    </div>
  );
}

function difficultyLabel(difficulty: CommonTestQuestion["difficulty"]) {
  const labels: Record<CommonTestQuestion["difficulty"], string> = {
    basic: "基本",
    standard: "標準",
    hard: "応用",
    trap: "注意",
    "time-consuming": "時間",
  };
  return labels[difficulty];
}

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
