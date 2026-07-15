import Link from "next/link";
import { BookMarked, Target } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { MathText } from "@/components/math/Math";
import type { CommonTestProblemLecture } from "@/types/common-test-problem-lecture";
import { StickyProblemViewer } from "./StickyProblemViewer";
import { ProblemInsightList } from "./ProblemInsightList";
import { ExamThinkingFlow } from "./ExamThinkingFlow";
import { MistRecoveryTable } from "./MistRecoveryTable";
import { RelatedMathCourseLinks } from "./RelatedMathCourseLinks";

export function CommonTestProblemLecturePage({ lecture }: { lecture: CommonTestProblemLecture }) {
  return (
    <LearningPageShell width="split">
      <div className="lg:grid lg:grid-cols-[minmax(380px,42vw)_minmax(0,1fr)] lg:items-start lg:gap-8">
        <div className="mx-auto min-w-0 max-w-3xl lg:col-start-2 lg:row-start-1 lg:mx-0">
          <LearningBreadcrumbs
            items={[
              { label: "試験対策", href: "/exams" },
              { label: "共通テスト", href: "/common-test" },
              { label: "問題解体型講座", href: "/common-test/problem-lectures" },
              { label: lecture.title },
            ]}
          />
          <LearningPageHeader
            eyebrow="問題解体型講座"
            title={lecture.title}
            meta={[
              { label: "科目", value: lecture.subjectLabel },
              { label: "対象", value: lecture.targetSection },
              { label: "所要時間", value: lecture.estimatedTime },
              { label: "難易度", value: lecture.difficulty },
              { label: "主な内容", value: lecture.concepts.join("・") },
            ]}
          />
        </div>

        <aside className="hidden lg:sticky lg:top-4 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:block lg:h-[calc(100dvh-2rem)] lg:min-h-0">
          <StickyProblemViewer pdfUrl={lecture.pdfUrl} title={lecture.title} variant="side" />
        </aside>

        <div className="mx-auto min-w-0 max-w-3xl lg:col-start-2 lg:row-start-2 lg:mx-0">
          <div className="mt-6 lg:hidden">
            <StickyProblemViewer pdfUrl={lecture.pdfUrl} title={lecture.title} variant="top" />
          </div>

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-950">この講座で学ぶこと</h2>
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
                <h2 className="text-xl font-bold text-slate-950">詳しい解説</h2>
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
                        className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-blue-700 hover:underline"
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
        </div>
      </div>
    </LearningPageShell>
  );
}
