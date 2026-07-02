import Link from "next/link";
import { ArrowLeft, BookMarked, Clock, Target } from "lucide-react";
import { MathText } from "@/components/math/Math";
import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";
import { StickyProblemViewer } from "./StickyProblemViewer";
import { ProblemInsightList } from "./ProblemInsightList";
import { ExamThinkingFlow } from "./ExamThinkingFlow";
import { MistRecoveryTable } from "./MistRecoveryTable";
import { RelatedMathCourseLinks } from "./RelatedMathCourseLinks";

export function CommonTestProblemLecturePage({ lecture }: { lecture: CommonTestProblemLecture }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <StickyProblemViewer pdfUrl={lecture.pdfUrl} title={lecture.title} />

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Link
          href="/common-test/problem-lectures"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          問題解体型講座一覧へ戻る
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500">
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
              {lecture.subjectLabel}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
              {lecture.targetSection}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1">
              <Clock className="h-3 w-3" />
              {lecture.estimatedTime}
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1">
              {lecture.difficulty}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            {lecture.title}
          </h1>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lecture.concepts.map((concept) => (
              <span
                key={concept}
                className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700"
              >
                {concept}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-extrabold text-slate-950">この講座で鍛えること</h2>
          </div>
          <ul className="space-y-1.5">
            {lecture.goals.map((goal) => (
              <li key={goal} className="flex gap-2 text-sm leading-6 text-slate-700">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                <MathText>{goal}</MathText>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 space-y-6">
          <ProblemInsightList items={lecture.insights} />
          <ExamThinkingFlow steps={lecture.thinkingFlow} />

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <BookMarked className="h-4 w-4 text-blue-600" />
              <h2 className="text-sm font-extrabold text-slate-950">詳しい解説</h2>
            </div>
            <div className="space-y-4">
              {lecture.explanations.map((section) => (
                <div key={section.heading} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-sm font-extrabold text-slate-900">{section.heading}</h3>
                  <div className="mt-1.5 text-sm leading-7 text-slate-700">
                    <MathText>{section.body}</MathText>
                  </div>
                  {section.mathCourseLink && (
                    <Link
                      href={section.mathCourseLink.href}
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                    >
                      基礎が不安なら: {section.mathCourseLink.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>

          <MistRecoveryTable items={lecture.mistakes} />

          <RelatedMathCourseLinks
            relatedMathCourses={lecture.relatedMathCourses}
            relatedCoreLectures={lecture.relatedCoreLectures}
            relatedMocks={lecture.relatedMocks}
            nextProblemLectures={lecture.nextProblemLectures}
          />
        </div>
      </main>
    </div>
  );
}
