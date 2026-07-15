"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Printer,
  Send,
} from "lucide-react";
import type { CommonTestMockExam, ExamBlank } from "@/data/common-test-mock-exams";
import { MathText } from "@/components/math/Math";
import {
  scoreCommonTestMockExam,
  type CommonTestMockAnswerValue,
  type CommonTestMockAnswers,
} from "@/lib/common-test-mock-scoring";
import { AnswerInput } from "./CommonTestMockExamRunner";
import { cn } from "@/lib/utils";
import { getSessionId, nowMs } from "@/lib/exam";
import {
  getExamClockSnapshot,
  startExamClockController,
  type ExamClockSnapshot,
} from "@/lib/exam-clock";

type Mode = "taking" | "submitted" | "review";
type MobilePane = "pdf" | "answers";

// PDF冊子を正本として表示するビューア。問題本文はPDFをそのまま表示し、
// Reactで再構成しない。採点・解説だけを構造化データ (exam.sections) から出す。
export function CommonTestPdfMockViewer({ exam }: { exam: CommonTestMockExam }) {
  const pdfUrl = exam.pdfUrl;
  const [mode, setMode] = useState<Mode>("taking");
  const [mobilePane, setMobilePane] = useState<MobilePane>("pdf");
  const [answers, setAnswers] = useState<CommonTestMockAnswers>({});
  const [elapsedSec, setElapsedSec] = useState(0);
  const startedAtRef = useRef<number | null>(null);
  const answersRef = useRef<CommonTestMockAnswers>({});
  const hasSubmittedRef = useRef(false);
  const pdfTabRef = useRef<HTMLButtonElement>(null);
  const answersTabRef = useRef<HTMLButtonElement>(null);
  const mobileTabsId = useId();

  const score = useMemo(() => scoreCommonTestMockExam(exam, answers), [exam, answers]);
  const durationSec = exam.durationMinutes * 60;
  const remainingSec = Math.max(0, durationSec - elapsedSec);
  const isOvertime = remainingSec === 0 && mode === "taking";

  function setQuestionAnswer(questionId: string, value: CommonTestMockAnswerValue) {
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      answersRef.current = next;
      return next;
    });
  }
  function setBlankAnswer(questionId: string, blank: ExamBlank, value: string) {
    setAnswers((prev) => {
      const current = prev[questionId];
      const next = current && typeof current === "object" && !Array.isArray(current) ? { ...current } : {};
      next[blank.id] = value;
      const nextAnswers = { ...prev, [questionId]: next };
      answersRef.current = nextAnswers;
      return nextAnswers;
    });
  }

  function selectMobilePane(pane: MobilePane, moveFocus = false) {
    setMobilePane(pane);
    if (moveFocus) {
      const tab = pane === "pdf" ? pdfTabRef.current : answersTabRef.current;
      tab?.focus();
    }
  }

  function handleMobileTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextPane =
      event.key === "Home"
        ? "pdf"
        : event.key === "End"
          ? "answers"
          : mobilePane === "pdf"
            ? "answers"
            : "pdf";
    selectMobilePane(nextPane, true);
  }

  const submitExam = useCallback((clockSnapshot?: ExamClockSnapshot) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    const submittedAtMs = nowMs();
    const startedAtMs = startedAtRef.current ?? submittedAtMs;
    const finalClock =
      clockSnapshot ?? getExamClockSnapshot({ startedAtMs, nowMs: submittedAtMs, durationSec });
    setElapsedSec(finalClock.elapsedSec);
    setMode("submitted");
    const submittedAnswers = Object.entries(answersRef.current)
      .filter((entry): entry is [string, CommonTestMockAnswerValue] => entry[1] !== undefined)
      .map(([questionId, value]) =>
        typeof value === "object" && !Array.isArray(value)
          ? {
              questionId,
              blanks: Object.entries(value).map(([blankId, blankValue]) => ({
                blankId,
                value: blankValue,
              })),
            }
          : { questionId, value },
      );
    fetch("/api/exam/attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        examId: exam.id,
        sessionId: getSessionId(),
        durationSec: finalClock.elapsedSec,
        answers: submittedAnswers,
      }),
    }).catch(() => {});
  }, [durationSec, exam.id]);

  useEffect(() => {
    if (mode !== "taking") return;
    // Reloading intentionally starts a fresh attempt, matching the existing behavior.
    const startedAtMs = startedAtRef.current ?? nowMs();
    startedAtRef.current = startedAtMs;

    return startExamClockController({
      startedAtMs,
      durationSec,
      now: nowMs,
      schedule: (callback, intervalMs) => window.setInterval(callback, intervalMs),
      cancel: (timer) => window.clearInterval(timer as number),
      onTick: (snapshot) => {
        setElapsedSec((current) =>
          current === snapshot.elapsedSec ? current : snapshot.elapsedSec,
        );
      },
      onExpire: submitExam,
      subscribeVisibility: (sync) => {
        const onVisibilityChange = () => {
          if (document.visibilityState === "visible") sync();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => document.removeEventListener("visibilitychange", onVisibilityChange);
      },
      subscribeFocus: (sync) => {
        window.addEventListener("focus", sync);
        return () => window.removeEventListener("focus", sync);
      },
    });
  }, [durationSec, mode, submitExam]);

  if (!pdfUrl) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-sm text-slate-600">
          このPDF冊子はまだ準備中です。「{exam.title}」の詳細は品質チェックリストを参照してください。
        </p>
        <Link
          href="/common-test/simulator"
          className="mt-4 inline-flex min-h-11 items-center gap-2 px-3 text-sm font-bold text-blue-700"
        >
          <ArrowLeft className="h-4 w-4" />
          模試一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div data-exam-shell className="min-h-screen bg-[#f4f1ea] text-slate-950">
      <header
        data-testid="exam-header"
        className="sticky top-[env(safe-area-inset-top)] z-40 border-b border-stone-300 bg-white"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/common-test/simulator"
              className="inline-flex min-h-11 items-center gap-1.5 px-2 text-xs font-bold text-slate-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              模試一覧へ戻る
            </Link>
            <h1 className="mt-1 text-base font-extrabold text-slate-950 sm:text-lg">{exam.title}</h1>
            <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-600">
              <span>数学I，数学A</span>
              <span>/</span>
              <span>{exam.durationMinutes}分</span>
              <span>/</span>
              <span>{exam.totalPoints}点満点</span>
              <span>/</span>
              <span>未解答 {score.unansweredCount}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className={cn(
              "inline-flex items-center gap-2 border px-3 py-2",
              isOvertime ? "border-rose-300 bg-rose-50" : "border-stone-300 bg-white",
            )}>
              <Clock className={cn("h-4 w-4", isOvertime ? "text-rose-700" : "text-slate-600")} />
              <div>
                <div className="text-xs font-bold text-slate-500">
                  {isOvertime ? "時間超過" : mode === "taking" ? "残り時間" : "経過時間"}
                </div>
                <div className="text-sm font-extrabold tabular-nums text-slate-950">
                  {formatTime(mode === "taking" ? remainingSec : elapsedSec)}
                </div>
              </div>
            </div>
            {mode === "taking" ? (
              <button
                type="button"
                onClick={() => submitExam()}
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
        <section className="border-b border-stone-300 bg-white">
          <div className="mx-auto grid max-w-6xl gap-3 px-4 py-4 sm:px-6 sm:grid-cols-4">
            <Metric label="得点" value={`${score.totalScore} / ${exam.totalPoints}点`} />
            <Metric label="正答数" value={`${score.correctCount} / ${score.totalQuestions}`} />
            <Metric label="未解答" value={`${score.unansweredCount}`} />
            {score.sectionScores.map((s) => (
              <Metric key={s.sectionId} label={s.title} value={`${s.score} / ${s.maxScore}点`} />
            ))}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:hidden">
        <div
          role="tablist"
          aria-label="模試の表示切り替え"
          className="grid grid-cols-2 rounded-xl border border-stone-300 bg-white p-1"
        >
          <button
            ref={pdfTabRef}
            type="button"
            role="tab"
            id={`${mobileTabsId}-pdf-tab`}
            aria-selected={mobilePane === "pdf"}
            aria-controls={`${mobileTabsId}-pdf-panel`}
            tabIndex={mobilePane === "pdf" ? 0 : -1}
            onClick={() => selectMobilePane("pdf")}
            onKeyDown={handleMobileTabKeyDown}
            className={cn(
              "min-h-11 rounded-lg px-3 py-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              mobilePane === "pdf"
                ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            PDF問題冊子
          </button>
          <button
            ref={answersTabRef}
            type="button"
            role="tab"
            id={`${mobileTabsId}-answers-tab`}
            aria-selected={mobilePane === "answers"}
            aria-controls={`${mobileTabsId}-answers-panel`}
            tabIndex={mobilePane === "answers" ? 0 : -1}
            onClick={() => selectMobilePane("answers")}
            onKeyDown={handleMobileTabKeyDown}
            className={cn(
              "min-h-11 rounded-lg px-3 py-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              mobilePane === "answers"
                ? "bg-blue-50 text-blue-800 ring-1 ring-blue-200"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            解答用紙
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* PDF booklet — the source of truth. Not reconstructed as React/HTML. */}
        <section
          id={`${mobileTabsId}-pdf-panel`}
          role="tabpanel"
          aria-labelledby={`${mobileTabsId}-pdf-tab`}
          tabIndex={0}
          className={cn("min-w-0", mobilePane !== "pdf" && "hidden lg:block")}
        >
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              別タブでPDFを開く
            </a>
            <a
              href={pdfUrl}
              download
              className="inline-flex min-h-11 items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              ダウンロード
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              印刷（別タブで開いて印刷）
            </a>
          </div>
          <div className="overflow-hidden rounded border border-stone-300 bg-white">
            <iframe
              src={`${pdfUrl}?embed=1#view=FitH`}
              title={exam.title}
              className="h-[80vh] w-full"
            />
          </div>
        </section>

        {/* Answer sheet — collects answers only; problem text lives in the PDF. */}
        <section
          id={`${mobileTabsId}-answers-panel`}
          role="tabpanel"
          aria-labelledby={`${mobileTabsId}-answers-tab`}
          tabIndex={0}
          className={cn("min-w-0", mobilePane !== "answers" && "hidden lg:block")}
        >
          <div className="rounded border border-stone-300 bg-white p-4">
            <h2 className="text-sm font-extrabold text-slate-900">解答用紙</h2>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              PDFの各大問の設問番号に対応して解答してください。提出すると採点・解説が表示されます。
            </p>

            <div className="mt-4 space-y-6">
              {exam.sections.map((section) => (
                <div key={section.id}>
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <h3 className="text-sm font-extrabold text-slate-900">{section.title}</h3>
                    <span className="text-xs font-bold text-slate-500">配点 {section.points}</span>
                  </div>
                  <div className="mt-3 space-y-4">
                    {section.questions.map((question, index) => {
                      const submitted = mode !== "taking";
                      const isCorrect = submitted
                        ? score.questionResults.find((r) => r.question.id === question.id)?.isCorrect ?? false
                        : false;
                      return (
                        <div key={question.id} className="border border-stone-200 p-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <span className="inline-flex h-6 min-w-6 items-center justify-center border border-slate-400 bg-white px-1.5 font-bold tabular-nums">
                              {index + 1}
                            </span>
                            {question.points}点
                          </div>
                          <AnswerInput
                            question={question}
                            answer={answers[question.id]}
                            submitted={submitted}
                            onAnswer={(value) => setQuestionAnswer(question.id, value)}
                            onBlankAnswer={(blank, value) => setBlankAnswer(question.id, blank, value)}
                          />
                          {submitted && (
                            <div
                              className={cn(
                                "mt-3 border px-3 py-2 text-xs",
                                isCorrect ? "border-emerald-300 bg-emerald-50" : "border-stone-300 bg-stone-50",
                              )}
                            >
                              <div className="flex items-center gap-1.5 font-extrabold text-slate-700">
                                {isCorrect ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> : null}
                                {isCorrect ? "正解" : "復習ポイント"}
                              </div>
                              <MathText className="mt-1 leading-6 text-slate-700">
                                {mode === "review" ? question.explanation : question.shortSolution ?? question.explanation}
                              </MathText>
                              {mode === "review" && question.reviewLinks && question.reviewLinks.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {question.reviewLinks.map((href) => (
                                    <Link
                                      key={href}
                                      href={href}
                                      className="inline-flex min-h-11 items-center gap-1 border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-blue-700"
                                    >
                                      <BookOpen className="h-3 w-3" />
                                      復習リンク
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
