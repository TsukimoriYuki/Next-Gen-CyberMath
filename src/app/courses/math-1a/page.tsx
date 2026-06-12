import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ChevronLeft, Clock } from "lucide-react";
import { getCourseSubject } from "@/data/course-curriculum";
import { COURSE_LEVEL_META, type CourseLevel } from "@/types/course";

export const metadata: Metadata = {
  title: "数学IA 講座",
  description: "数学IAの単元別講座。初学者から上級者まで3段階で体系的に学ぶ。",
};

export default function MathIACoursePage() {
  const subject = getCourseSubject("math-1a");
  if (!subject) notFound();

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* グリッドオーバーレイ */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 400px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 400px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {/* パンくず */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="flex items-center gap-1 hover:text-blue-600">
            <ChevronLeft className="h-3.5 w-3.5" />
            講座一覧
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{subject.subjectName}</span>
        </div>

        {/* ヘッダー */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1"
            style={{ borderColor: `${subject.color}33`, background: `${subject.color}0d` }}>
            <BookOpen className="h-3.5 w-3.5" style={{ color: subject.color }} />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: subject.color }}>
              {subject.subjectId.replace(/-/g, " ")}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {subject.subjectName} 講座
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{subject.description}</p>
        </div>

        {/* 単元カード一覧 */}
        {subject.units.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-slate-500">単元を準備中です。しばらくお待ちください。</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subject.units.map((unit) => {
              const levelCounts: Record<CourseLevel, number> = { beginner: 0, standard: 0, advanced: 0 };
              for (const lesson of unit.lessons) {
                levelCounts[lesson.level]++;
              }
              const totalMinutes = unit.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);

              return (
                <div
                  key={unit.unitId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="h-1 w-full" style={{ background: subject.color }} />
                  <div className="p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-xl font-extrabold text-slate-900">{unit.unitTitle}</h2>
                        <p className="mt-1 text-sm text-slate-500">{unit.unitDescription}</p>

                        {/* レベル別バッジ */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {(["beginner", "standard", "advanced"] as const).map((level) => {
                            const count = levelCounts[level];
                            if (count === 0) return null;
                            const m = COURSE_LEVEL_META[level];
                            return (
                              <span
                                key={level}
                                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                                style={{ background: m.bg, color: m.color, border: `1px solid ${m.border}` }}
                              >
                                <span
                                  className="h-1.5 w-1.5 rounded-full"
                                  style={{ background: m.dot }}
                                />
                                {m.label} {count}講座
                              </span>
                            );
                          })}
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                            <Clock className="h-3 w-3" />
                            合計約 {totalMinutes} 分
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link
                        href={`/courses/${subject.subjectId}/${unit.unitId}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                        style={{ background: subject.color }}
                      >
                        受講する
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>

                    {/* 講座タイトル一覧（折りたたみプレビュー） */}
                    <div className="mt-4 grid gap-1.5 sm:grid-cols-3">
                      {(["beginner", "standard", "advanced"] as const).map((level) => {
                        const levelLessons = unit.lessons.filter((l) => l.level === level);
                        if (levelLessons.length === 0) return null;
                        const m = COURSE_LEVEL_META[level];
                        return (
                          <div
                            key={level}
                            className="rounded-xl border p-3"
                            style={{ borderColor: m.border, background: m.bg }}
                          >
                            <div className="mb-2 flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
                              <span className="text-xs font-bold" style={{ color: m.color }}>
                                {m.label}
                              </span>
                            </div>
                            <ul className="space-y-0.5">
                              {levelLessons.map((lesson) => (
                                <li key={lesson.lessonId} className="text-xs text-slate-600 leading-relaxed">
                                  {lesson.lessonTitle}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 演習への導線 */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 text-sm font-bold text-slate-900">演習・模試・復習</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: "大問別ドリル（数学IA）", href: "/common-test/math-1a", desc: "単元別に演習" },
              { label: "本番演習", href: "/common-test/simulator", desc: "共通テスト形式" },
              { label: "段階復習", href: "/common-test/review", desc: "弱点を反復強化" },
              { label: "Weakness Boss（弱点攻略）", href: "/common-test/weakness", desc: "苦手単元を集中攻略" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs transition-colors hover:bg-blue-50 hover:border-blue-200"
              >
                <ArrowRight className="h-3 w-3 shrink-0 text-blue-500" />
                <span>
                  <span className="font-bold text-slate-700">{link.label}</span>
                  <span className="ml-1 text-slate-400">{link.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
