import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { COURSE_SUBJECTS } from "@/data/course-curriculum";

export const metadata: Metadata = {
  title: "講座集 | CYBER OS",
  description:
    "数学IA・数学II,B,C・数学III,Cの講座を単元ごとに整理した講座集です。",
};

export default function CoursesIndexPage() {
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
            科目から単元、単元から講座へ進める学習用の入口です。講座本文は各講座の詳細ページで確認できます。
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {COURSE_SUBJECTS.map((subject) => {
            const lessonCount = subject.units.reduce(
              (sum, unit) => sum + unit.lessons.length,
              0,
            );

            return (
              <Link
                key={subject.subjectId}
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
                <h2 className="text-xl font-extrabold text-slate-950">
                  {subject.subjectName}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {subject.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    {subject.units.length}単元
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    {lessonCount}講座
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-600">
                  単元を見る
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
