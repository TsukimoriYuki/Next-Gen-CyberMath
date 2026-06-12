import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { COURSE_SUBJECTS } from "@/data/course-curriculum";
import { COURSE_LEVEL_META } from "@/types/course";

export const metadata: Metadata = {
  title: "講座一覧",
  description: "初学者・中級者・上級者の3段階で体系的に学ぶ講座一覧。",
};

export default function CoursesIndexPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* 薄いグリッドオーバーレイ */}
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
        {/* ヘッダー */}
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              Courses
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            講座一覧
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            初学者・中級者・上級者の3段階で、理解を積み上げる。
          </p>
        </div>

        {/* レベル説明 */}
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {(["beginner", "standard", "advanced"] as const).map((level) => {
            const m = COURSE_LEVEL_META[level];
            return (
              <div
                key={level}
                className="rounded-xl border p-4"
                style={{ borderColor: m.border, background: m.bg }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: m.dot }}
                  />
                  <span className="text-sm font-bold" style={{ color: m.color }}>
                    {m.label}
                  </span>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.18em]"
                    style={{ color: m.color, opacity: 0.6 }}
                  >
                    {m.sublabel}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{m.description}</p>
              </div>
            );
          })}
        </div>

        {/* 科目カード */}
        <div className="space-y-4">
          {COURSE_SUBJECTS.map((subject) => {
            const hasUnits = subject.units.length > 0;
            const unitCount = subject.units.length;
            const lessonCount = subject.units.reduce((acc, u) => acc + u.lessons.length, 0);

            return (
              <div
                key={subject.subjectId}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* カラーバー */}
                <div className="h-1 w-full" style={{ background: subject.color }} />

                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  {/* アイコン */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-extrabold"
                    style={{
                      background: `${subject.color}14`,
                      color: subject.color,
                      border: `1px solid ${subject.color}33`,
                    }}
                  >
                    <BookOpen className="h-5 w-5" />
                  </div>

                  {/* テキスト */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-extrabold text-slate-900">{subject.subjectName}</h2>
                      {!hasUnits && (
                        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-400">
                          準備中
                        </span>
                      )}
                      {hasUnits && (
                        <>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-mono text-slate-500">
                            {unitCount} 単元
                          </span>
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-mono text-slate-500">
                            {lessonCount} 講座
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{subject.description}</p>
                  </div>

                  {/* CTA */}
                  {hasUnits ? (
                    <Link
                      href={`/courses/${subject.subjectId}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      単元を見る
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-400">
                      準備中
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 既存コンテンツへの導線 */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold text-slate-900">演習・模試・復習との連携</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "大問別ドリル", href: "/common-test/math-1a", desc: "単元別 小問演習" },
              { label: "本番演習", href: "/common-test/simulator", desc: "共通テスト形式" },
              { label: "段階復習", href: "/common-test/review", desc: "弱点を反復" },
              { label: "類題演習", href: "/common-test/review", desc: "AI生成の類題" },
              { label: "概念授業（旧形式）", href: "/lessons/stars-and-bars", desc: "重複組合せなど個別授業" },
              { label: "Daily Playlist", href: "/common-test/daily", desc: "今日の学習メニュー" },
            ].map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs transition-colors hover:bg-blue-50 hover:border-blue-200"
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
