"use client";

import { useEffect, useMemo, useState } from "react";
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

type Mode = "taking" | "submitted" | "review";

// PDF冊子を正本として表示するビューア。問題本文はPDFをそのまま表示し、
// Reactで再構成しない。採点・解説だけを構造化データ (exam.sections) から出す。
export function CommonTestPdfMockViewer({ exam }: { exam: CommonTestMockExam }) {
  const pdfUrl = exam.pdfUrl;
  const [mode, setMode] = useState<Mode>("taking");
  const [answers, setAnswers] = useState<CommonTestMockAnswers>({});
  const [elapsedSec, setElapsedSec] = useState(0);

  const score = useMemo(() => scoreCommonTestMockExam(exam, answers), [exam, answers]);
  const remainingSec = Math.max(0, exam.durationMinutes * 60 - elapsedSec);
  const isOvertime = remainingSec === 0 && mode === "taking";

  useEffect(() => {
    if (mode !== "taking") return;
    const timer = window.setInterval(() => setElapsedSec((v) => v + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode]);

  function setQuestionAnswer(questionId: string, value: CommonTestMockAnswerValue) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }
  function setBlankAnswer(questionId: string, blank: ExamBlank, value: string) {
    setAnswers((prev) => {
      const current = prev[questionId];
      const next = current && typeof current === "object" && !Array.isArray(current) ? { ...current } : {};
      next[blank.id] = value;
      return { ...prev, [questionId]: next };
    });
  }

  if (!pdfUrl) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-sm text-slate-600">
          このPDF冊子はまだ準備中です。「{exam.title}」の詳細は品質チェックリストを参照してください。
        </p>
        <Link href="/common-test/simulator" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          模試一覧へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-stone-300 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <Link
              href="/common-test/simulator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
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
                <div className="text-[10px] font-bold text-slate-500">
                  {isOvertime ? "時間超過" : mode === "taking" ? "残り時間" : "経過時間"}
                </div>
                <div className="font-mono text-sm font-extrabold text-slate-950">
                  {formatTime(mode === "taking" ? remainingSec : elapsedSec)}
                </div>
              </div>
            </div>
            {mode === "taking" ? (
              <button
                type="button"
                onClick={() => setMode("submitted")}
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

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {/* PDF booklet — the source of truth. Not reconstructed as React/HTML. */}
        <section className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-blue-300"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              別タブで開く
            </a>
            <a
              href={pdfUrl}
              download
              className="inline-flex items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-blue-300"
            >
              <Download className="h-3.5 w-3.5" />
              ダウンロード
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded border border-stone-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:border-blue-300"
            >
              <Printer className="h-3.5 w-3.5" />
              印刷（別タブで開いて印刷）
            </a>
          </div>
          <div className="overflow-hidden rounded border border-stone-300 bg-white">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              title={exam.title}
              className="h-[80vh] w-full"
            />
          </div>
        </section>

        {/* Answer sheet — collects answers only; problem text lives in the PDF. */}
        <section className="min-w-0">
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
                            <span className="inline-flex h-6 min-w-6 items-center justify-center border border-slate-400 bg-white px-1.5 font-mono">
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
                                      className="inline-flex items-center gap-1 border border-blue-200 bg-white px-2 py-1 font-bold text-blue-700"
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
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-stone-200 bg-stone-50 px-4 py-3">
      <div className="text-[11px] font-bold text-slate-500">{label}</div>
      <div className="mt-1 font-mono text-lg font-extrabold text-slate-950">{value}</div>
    </div>
  );
}

function formatTime(sec: number) {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
