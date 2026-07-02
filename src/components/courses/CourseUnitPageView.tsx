import Link from "next/link";
import { ArrowRight, ChevronLeft, Clock } from "lucide-react";
import {
  COURSE_LEVEL_META,
  type CourseLevel,
  type CourseSubject,
  type CourseUnit,
} from "@/types/course";
import { CourseBodyRenderer } from "./CourseBodyRenderer";

const LEVELS: CourseLevel[] = ["beginner", "standard", "advanced"];
const LEVEL_LABELS: Record<CourseLevel, string> = {
  beginner: "初学者",
  standard: "中級者",
  advanced: "上級者",
};

export function CourseUnitPageView({
  subject,
  unit,
}: {
  subject: CourseSubject;
  unit: CourseUnit;
}) {
  const isPremium = subject.courseKind === "premium";
  const levelsToShow = isPremium && unit.lessons.length > 0
    ? LEVELS.filter((level) => unit.lessons.some((lesson) => lesson.level === level))
    : LEVELS;
  const coreLecture =
    subject.subjectId === "math-1a" && unit.unitId === "counting-probability"
      ? {
          href: "/common-test/lectures/probability-guided-reading",
          title: "確率 guided reading 中核講義",
          description:
            "冊子型模試の第4問で崩れやすい、分母の決め方・余事象・包除・条件付き確率をまとめて復習できます。",
        }
      : subject.subjectId === "math-1a" && unit.unitId === "quadratic"
        ? {
            href: "/common-test/lectures/quadratic-case-split-intensive",
            title: "二次関数 場合分け完全攻略 中核講義",
            description:
              "冊子型模試の第2問で崩れやすい、平方完成・軸と定義域・端点比較・合成関数をまとめて復習できます。",
          }
        : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
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
          <span className="font-bold text-slate-900">{unit.unitTitle}</span>
        </div>

        <header className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            Unit
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {unit.unitTitle}
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            {unit.unitDescription}
          </p>
        </header>

        {coreLecture ? (
          <Link
            href={coreLecture.href}
            className="mb-8 flex flex-col gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm transition hover:border-blue-300 hover:bg-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
                Core Lecture
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                {coreLecture.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {coreLecture.description}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-700">
              講義へ戻る
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ) : null}

        <div className="space-y-8">
          {levelsToShow.map((level) => {
            const meta = COURSE_LEVEL_META[level];
            const lessons = unit.lessons.filter((lesson) => lesson.level === level);

            return (
              <section key={level} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: meta.dot }}
                  />
                  <h2 className="text-lg font-extrabold" style={{ color: meta.color }}>
                    {LEVEL_LABELS[level]}
                  </h2>
                  <span className="text-xs text-slate-500">{meta.sublabel}</span>
                  <span className="ml-auto rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-500">
                    {lessons.length}講座
                  </span>
                </div>

                {lessons.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    現在は無料・基礎講座を優先整備中です。このレベルの講座は、公開内容が固まり次第ここに追加します。
                  </p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {lessons.map((lesson) => (
                      <Link
                        key={lesson.lessonId}
                        href={`/courses/${subject.subjectId}/${unit.unitId}/${lesson.lessonId}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <h3 className="text-base font-extrabold text-slate-950">
                          {lesson.lessonTitle}
                        </h3>
                        {isPremium ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {["有料版", "Premium", "難関大レベル"].map((badge) => (
                              <span
                                key={badge}
                                className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700"
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <CourseBodyRenderer
                          body={lesson.lessonDescription}
                          className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600"
                        />
                        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            約{lesson.estimatedMinutes}分
                          </span>
                          <span className="inline-flex items-center gap-1 font-bold text-blue-600">
                            詳細へ
                            <ArrowRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
