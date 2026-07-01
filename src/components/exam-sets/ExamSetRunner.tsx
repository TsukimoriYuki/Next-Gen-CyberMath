"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Clock, RotateCcw, Send, XCircle } from "lucide-react";
import { InlineMath, MathText } from "@/components/math/Math";
import type { ExamSet, ExamSetBlank } from "@/data/exam-sets";

type AnswerMap = Record<string, string>;

function blankKey(problemId: string, label: string): string {
  return `${problemId}:${label}`;
}

function normalizeExamSetAnswer(value: string): string {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[－−―ー]/g, "-")
    .replace(/\s/g, "")
    .trim();
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(Math.max(seconds, 0) / 60);
  const rest = Math.max(seconds, 0) % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function getAllBlanks(examSet: ExamSet) {
  return examSet.sections.flatMap((section) =>
    section.problems.flatMap((problem) =>
      problem.blanks.map((blank) => ({ section, problem, blank })),
    ),
  );
}

function scoreBlank(answer: string | undefined, blank: ExamSetBlank): number {
  return normalizeExamSetAnswer(answer ?? "") === normalizeExamSetAnswer(blank.answer)
    ? blank.points
    : 0;
}

// 見出し用の軽量インライン数式レンダラー。$...$ を KaTeX に、それ以外は素のテキストにする。
// 見出し内に KaTeX を埋め込めるよう、ブロック要素を生成する MathText とは別に用意する。
function renderInlineMathTitle(text: string): React.ReactNode[] {
  return text.split(/(\$[^$]+\$)/g).map((part, i) =>
    part.startsWith("$") && part.endsWith("$") && part.length > 2 ? (
      <InlineMath key={i} math={part.slice(1, -1)} />
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function ExamText({
  children,
  tone = "body",
}: {
  children: string;
  tone?: "body" | "explanation";
}) {
  return (
    <div className="max-w-full overflow-x-auto break-words">
      <MathText
        className={
          tone === "body"
            ? "text-sm leading-7 text-slate-800 [&_.katex-display]:overflow-x-auto"
            : "text-sm leading-7 text-slate-700 [&_.katex-display]:overflow-x-auto"
        }
      >
        {children}
      </MathText>
    </div>
  );
}

export function ExamSetRunner({ examSet }: { examSet: ExamSet }) {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(examSet.durationMin * 60);

  const allBlanks = useMemo(() => getAllBlanks(examSet), [examSet]);
  const totalScore = useMemo(
    () =>
      allBlanks.reduce(
        (sum, { problem, blank }) =>
          sum + scoreBlank(answers[blankKey(problem.id, blank.label)], blank),
        0,
      ),
    [allBlanks, answers],
  );

  const sectionScores = useMemo(
    () =>
      examSet.sections.map((section) => {
        const score = section.problems.reduce(
          (sum, problem) =>
            sum +
            problem.blanks.reduce(
              (inner, blank) =>
                inner + scoreBlank(answers[blankKey(problem.id, blank.label)], blank),
              0,
            ),
          0,
        );
        return { sectionId: section.id, score };
      }),
    [answers, examSet.sections],
  );

  useEffect(() => {
    if (submitted) return;

    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.setTimeout(() => setSubmitted(true), 0);
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [submitted]);

  function updateAnswer(problemId: string, label: string, value: string) {
    const normalized = normalizeExamSetAnswer(value).replace(/[^0-9-]/g, "");
    setAnswers((current) => ({
      ...current,
      [blankKey(problemId, label)]: normalized,
    }));
  }

  function resetExam() {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(examSet.durationMin * 60);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <div className="text-xs font-bold text-slate-500">{examSet.roundTitle}</div>
            <div className="text-sm font-extrabold text-slate-950 sm:text-base">
              {examSet.title}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm font-bold text-slate-900">
              <Clock className="h-4 w-4 text-blue-600" />
              {formatTime(timeLeft)}
            </div>
            {submitted && (
              <button
                type="button"
                onClick={resetExam}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                もう一度
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
              {examSet.subjectTitle}
            </span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-violet-700">
              {examSet.targetLevel}
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              想定平均 {examSet.expectedAverage}
            </span>
          </div>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-3xl">
            {examSet.title}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            {examSet.description}
          </p>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
            <Meta label="制限時間" value={`${examSet.durationMin}分`} />
            <Meta label="満点" value={`${examSet.totalScore}点`} />
            <Meta label="形式" value={examSet.format} />
            <Meta
              label="小問数"
              value={`${examSet.sections.reduce((sum, s) => sum + s.problems.length, 0)}問`}
            />
          </div>
        </header>

        {submitted && (
          <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
            <div className="text-sm font-bold text-blue-700">採点結果</div>
            <div className="mt-2 text-4xl font-black text-blue-950">
              {totalScore}
              <span className="ml-1 text-lg font-bold text-blue-700">
                / {examSet.totalScore}点
              </span>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-4">
              {examSet.sections.map((section) => {
                const score =
                  sectionScores.find((item) => item.sectionId === section.id)?.score ?? 0;
                return (
                  <div key={section.id} className="rounded-xl bg-white p-3 text-sm">
                    <div className="font-bold text-slate-900">{section.title}</div>
                    <div className="mt-1 text-slate-600">
                      {score} / {section.points}点
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <form
          className="mt-6 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {examSet.sections.map((section) => (
            <section
              key={section.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-extrabold">{section.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {section.description}
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                  {section.points}点
                </span>
              </div>

              <div className="space-y-6">
                {section.problems.map((problem) => (
                  <article
                    key={problem.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <h3 className="font-extrabold text-slate-950">
                      {renderInlineMathTitle(problem.title)}
                    </h3>
                    <div className="mt-3 space-y-2">
                      {problem.body.map((line) => (
                        <ExamText key={line}>{line}</ExamText>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {problem.blanks.map((blank) => {
                        const key = blankKey(problem.id, blank.label);
                        const value = answers[key] ?? "";
                        const isCorrect =
                          submitted &&
                          normalizeExamSetAnswer(value) === normalizeExamSetAnswer(blank.answer);
                        const isWrong =
                          submitted &&
                          normalizeExamSetAnswer(value) !== normalizeExamSetAnswer(blank.answer);

                        return (
                          <label
                            key={blank.label}
                            className="rounded-xl border border-slate-200 bg-white p-3"
                          >
                            <span className="mb-1.5 flex items-center justify-between gap-2 text-xs font-bold text-slate-700">
                              <span>[{blank.label}]</span>
                              <span>{blank.points}点</span>
                            </span>
                            <input
                              type="text"
                              inputMode="numeric"
                              value={value}
                              disabled={submitted}
                              placeholder={blank.placeholder ?? "半角数字"}
                              onChange={(event) =>
                                updateAnswer(problem.id, blank.label, event.target.value)
                              }
                              className="h-11 w-full rounded-lg border-2 border-slate-300 bg-white px-3 font-mono text-lg font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                            />
                            {submitted && (
                              <div
                                className={`mt-2 flex items-center gap-1.5 text-xs font-bold ${
                                  isCorrect ? "text-emerald-700" : "text-rose-700"
                                }`}
                              >
                                {isCorrect ? (
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                ) : (
                                  <XCircle className="h-3.5 w-3.5" />
                                )}
                                {isWrong ? `正答: ${blank.answer}` : "正解"}
                              </div>
                            )}
                          </label>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                        <div className="text-xs font-extrabold text-slate-500">解説</div>
                        <div className="mt-2">
                          <ExamText tone="explanation">{problem.explanation}</ExamText>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}

          {!submitted && (
            <div className="sticky bottom-4 z-10 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[0.99]"
              >
                <Send className="h-4 w-4" />
                提出して採点
              </button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs font-bold text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-extrabold text-slate-950">{value}</div>
    </div>
  );
}
