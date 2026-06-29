import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import {
  PREMIUM_COURSE_SUBJECTS,
  STANDARD_COURSE_SUBJECTS,
} from "@/data/course-curriculum";
import { getLessonsForIndex } from "@/lib/content";
import type { CourseSubject } from "@/types/course";
import type { Lesson } from "@/lib/types";

export const metadata: Metadata = {
  title: "講座集",
  description:
    "数学IA・数学II,B,C・数学III,Cの基礎講座と、有料版の発展講座を単元ごとに整理した講座集です。",
  alternates: {
    canonical: "/courses",
  },
  openGraph: {
    title: "講座集 | Cyber Math",
    description:
      "高校数学の基礎講座と発展講座を単元ごとに整理した講座一覧。",
    url: "/courses",
  },
};

export default function CoursesIndexPage() {
  const lessonGroups = getLessonsForIndex();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <GraduationCap className="h-3.5 w-3.5" />
            Courses
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            講座集
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            科目から単元、単元から講座へ進める学習用の入口です。受験数学の土台を固める基礎講座と、今後追加予定の発展講座・有料版を分けて表示しています。
          </p>
        </header>

        <CourseSection title="基礎講座" subjects={STANDARD_COURSE_SUBJECTS} />
        <CourseSection
          title="発展講座・有料版"
          subjects={PREMIUM_COURSE_SUBJECTS}
          className="mt-10"
        />
        <LessonSection groups={lessonGroups} className="mt-10" />
      </main>
    </div>
  );
}

function CourseSection({
  title,
  subjects,
  className,
}: {
  title: string;
  subjects: CourseSubject[];
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xl font-extrabold text-slate-950">{title}</h2>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {subjects.map((subject) => (
          <CourseSubjectCard key={subject.subjectId} subject={subject} />
        ))}
      </div>
    </section>
  );
}

function CourseSubjectCard({ subject }: { subject: CourseSubject }) {
  const lessonCount = subject.units.reduce(
    (sum, unit) => sum + unit.lessons.length,
    0,
  );
  const isPremium = subject.courseKind === "premium";

  return (
    <Link
      href={`/courses/${subject.subjectId}`}
      className="group flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: `${subject.color}14`,
          color: subject.color,
          border: `1px solid ${subject.color}33`,
        }}
      >
        <BookOpen className="h-5 w-5" />
      </div>
      <div className="flex flex-wrap items-start gap-2">
        <h3 className="text-xl font-extrabold text-slate-950">
          {subject.subjectName}
        </h3>
        {subject.badges?.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700"
          >
            {badge}
          </span>
        ))}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {subject.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
          {subject.units.length}単元
        </span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
          {isPremium && lessonCount === 0 ? "講座公開予定" : `${lessonCount}講座`}
        </span>
      </div>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
        {isPremium ? "予定を見る" : "単元を見る"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

function LessonSection({
  groups,
  className,
}: {
  groups: { unit: string; lessons: Lesson[] }[];
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="text-xl font-extrabold text-slate-950">単元別講座</h2>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="space-y-5">
        {groups.map((group) => (
          <div
            key={group.unit}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 text-sm font-extrabold text-slate-700">
              {group.unit}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.lessons.map((lesson) => (
                <Link
                  key={lesson.slug}
                  href={`/lessons/${lesson.slug}`}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    {lesson.title}
                  </div>
                  {lesson.summary && (
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
                      {lesson.summary}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
                    講座を開く
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
