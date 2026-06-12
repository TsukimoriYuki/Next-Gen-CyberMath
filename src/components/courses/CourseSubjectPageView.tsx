import Link from "next/link";
import { ArrowRight, ChevronLeft, Clock, Layers } from "lucide-react";
import type { CourseSubject } from "@/types/course";

export function CourseSubjectPageView({ subject }: { subject: CourseSubject }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="inline-flex items-center gap-1 hover:text-blue-600">
            <ChevronLeft className="h-3.5 w-3.5" />
            講座集トップ
          </Link>
          <span>/</span>
          <span className="font-bold text-slate-900">{subject.subjectName}</span>
        </div>

        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
            style={{
              borderColor: `${subject.color}33`,
              background: `${subject.color}12`,
              color: subject.color,
            }}
          >
            <Layers className="h-3.5 w-3.5" />
            {subject.subjectId}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {subject.subjectName}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            {subject.description}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {subject.units.map((unit) => {
            const lessonCount = unit.lessons.length;
            const totalMinutes = unit.lessons.reduce(
              (sum, lesson) => sum + lesson.estimatedMinutes,
              0,
            );

            return (
              <article
                key={unit.unitId}
                className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 h-1 w-16 rounded-full" style={{ background: subject.color }} />
                <h2 className="text-xl font-extrabold text-slate-950">{unit.unitTitle}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {unit.unitDescription}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    {lessonCount}講座
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
                    <Clock className="h-3 w-3" />
                    {totalMinutes > 0 ? `約${totalMinutes}分` : "講座準備中"}
                  </span>
                </div>
                <Link
                  href={`/courses/${subject.subjectId}/${unit.unitId}`}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  講座を見る
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

