import Link from "next/link";
import { ArrowRight, BookOpen, ChevronLeft, Clock, Target } from "lucide-react";
import type { CourseLesson, CourseSubject, CourseUnit } from "@/types/course";
import { COURSE_LEVEL_META } from "@/types/course";
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
  const levelMeta = COURSE_LEVEL_META[lesson.level];
  const isPremium = subject.courseKind === "premium";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="inline-flex items-center gap-1 hover:text-blue-600">
            <ChevronLeft className="h-3.5 w-3.5" />
            講座集トップ
          </Link>
          <span>/</span>
          <Link href={`/courses/${subject.subjectId}`} className="hover:text-blue-600">
            {subject.subjectName}
          </Link>
          <span>/</span>
          <Link href={`/courses/${subject.subjectId}/${unit.unitId}`} className="hover:text-blue-600">
            {unit.unitTitle}
          </Link>
        </div>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-1.5" style={{ background: subject.color }} />
          <header className="p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className="rounded-full border px-2.5 py-1 text-xs font-bold"
                style={{
                  borderColor: levelMeta.border,
                  background: levelMeta.bg,
                  color: levelMeta.color,
                }}
              >
                {LEVEL_LABELS[lesson.level]}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                約{lesson.estimatedMinutes}分
              </span>
              {isPremium
                ? ["発展編", "難関大レベル"].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"
                    >
                      {badge}
                    </span>
                  ))
                : null}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              {lesson.lessonTitle}
            </h1>
            <CourseBodyRenderer
              body={lesson.lessonDescription}
              className="mt-3 text-sm leading-relaxed text-slate-600"
            />
          </header>

          {lesson.goals.length > 0 && (
            <section className="border-t border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-extrabold text-slate-900">
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

          <div className="space-y-4 p-5">
            {lesson.lessonBlocks.map((block, index) => (
              <CourseLessonBlockRenderer key={`${block.kind}-${index}`} block={block} />
            ))}
          </div>

          {lesson.checkQuestions.length > 0 && (
            <section className="border-t border-slate-200 p-5">
              <h2 className="mb-3 text-sm font-extrabold text-slate-900">
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
                        className="mt-2 text-xs leading-relaxed text-slate-500"
                      />
                    )}
                  </details>
                ))}
              </div>
            </section>
          )}

          {lesson.relatedPracticeLinks.length > 0 && (
            <section className="border-t border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <h2 className="text-sm font-extrabold text-slate-900">
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
                          className="mt-1 text-xs leading-relaxed text-slate-600"
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
      </main>
    </div>
  );
}
