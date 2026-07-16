import Link from "next/link";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import type { CourseLesson, CourseSubject, CourseUnit } from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";
import { CourseLessonBlockRenderer } from "./CourseLessonBlockRenderer";

const LEVEL_LABELS = {
  beginner: "初学者",
  standard: "中級者",
  advanced: "上級者",
} as const;

export function CourseLessonPageView({
  subject,
  unit,
  lesson,
}: {
  subject: CourseSubject;
  unit: CourseUnit;
  lesson: CourseLesson;
}) {
  const isPremium = subject.courseKind === "premium";
  const metadata = [
    { label: "対象レベル", value: LEVEL_LABELS[lesson.level] },
    { label: "所要時間", value: `約${lesson.estimatedMinutes}分` },
    { label: "単元", value: unit.unitTitle },
    ...(lesson.prerequisites.length > 0
      ? [{ label: "前提知識", value: lesson.prerequisites.join("・") }]
      : []),
    ...(isPremium ? [{ label: "講座種別", value: "発展編" }] : []),
  ];

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "講座", href: "/courses" },
          { label: subject.subjectName, href: `/courses/${subject.subjectId}` },
          { label: unit.unitTitle, href: `/courses/${subject.subjectId}/${unit.unitId}` },
          { label: lesson.lessonTitle },
        ]}
      />
      <LearningPageHeader
        status={subject.subjectId === "japanese" ? "beta" : undefined}
        eyebrow={subject.subjectName}
        title={lesson.lessonTitle}
        description={
            <CourseBodyRenderer
              body={lesson.lessonDescription}
              className="text-base leading-7 text-slate-600"
            />
        }
        meta={metadata}
      />

      <article className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {lesson.goals.length > 0 && (
            <section className="bg-slate-50 p-5 sm:p-6" aria-labelledby="lesson-goals">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <h2 id="lesson-goals" className="text-xl font-bold text-slate-950">
                  この講座の目標
                </h2>
              </div>
              <ul className="space-y-2">
                {lesson.goals.map((goal) => (
                  <li key={goal} className="flex gap-2 text-sm text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <CourseBodyRenderer body={goal} className="text-sm leading-relaxed text-slate-600" />
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="space-y-4 border-t border-slate-200 p-5 sm:p-6">
            {lesson.lessonBlocks.map((block, index) => (
              <CourseLessonBlockRenderer key={`${block.kind}-${index}`} block={block} />
            ))}
          </div>

          {lesson.checkQuestions.length > 0 && (
            <section className="border-t border-slate-200 p-5 sm:p-6" aria-labelledby="check-questions">
              <h2 id="check-questions" className="mb-4 text-xl font-bold text-slate-950">
                確認問題
              </h2>
              <div className="space-y-3">
                {lesson.checkQuestions.map((question, index) => (
                  <details
                    key={`${question.question}-${index}`}
                    className="rounded-xl border border-rose-200 bg-rose-50 p-4"
                  >
                    <summary className="cursor-pointer text-sm font-bold text-slate-900">
                      <CourseBodyRenderer body={question.question} className="inline text-sm text-slate-900" />
                    </summary>
                    <CourseBodyRenderer
                      body={question.answer}
                      className="mt-3 text-sm leading-relaxed text-slate-700"
                    />
                    {question.hint && (
                      <CourseBodyRenderer
                        body={`ヒント: ${question.hint}`}
                        className="mt-2 text-sm leading-relaxed text-slate-600"
                      />
                    )}
                  </details>
                ))}
              </div>
            </section>
          )}

          {lesson.relatedPracticeLinks.length > 0 && (
            <section className="border-t border-slate-200 bg-slate-50 p-5 sm:p-6" aria-labelledby="related-learning">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <h2 id="related-learning" className="text-xl font-bold text-slate-950">
                  関連演習・次に読む講座
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {lesson.relatedPracticeLinks.map((link) => (
                  <Link
                    key={`${link.href}-${link.label}`}
                    href={link.href}
                    className="group flex min-w-0 items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <div className="min-w-0">
                      <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-700">
                        {link.label}
                      </span>
                      {link.description ? (
                        <CourseBodyRenderer
                          body={link.description}
                          className="mt-1 text-sm leading-relaxed text-slate-600"
                        />
                      ) : null}
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 group-hover:text-blue-600" />
                  </Link>
                ))}
              </div>
            </section>
          )}
      </article>
    </LearningPageShell>
  );
}
