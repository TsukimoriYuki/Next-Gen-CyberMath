// Server Component - 大問別ドリルページの共通レイアウト
import Link from "next/link";
import { ArrowLeft, BookOpen, Timer } from "lucide-react";
import type { CommonTestSection, CommonTestSubject } from "@/data/common-test";
import type { CommonTestDrillQuestion } from "@/data/common-test-drills";
import { CommonTestDrillRunner } from "./CommonTestDrillRunner";

interface Props {
  subject: CommonTestSubject;
  section: CommonTestSection;
  questions: CommonTestDrillQuestion[];
  sectionId: string;
}

export function DrillSectionPageShell({
  subject,
  section,
  questions,
  sectionId,
}: Props) {
  const { theme } = subject;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/common-test" className="hover:text-blue-700">
            共通テスト対策
          </Link>
          <span>/</span>
          <Link href={subject.route} className="hover:text-blue-700">
            {subject.shortTitle}
          </Link>
          <span>/</span>
          <span className="text-slate-700">第{section.number}問</span>
        </nav>

        <Link
          href={subject.route}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {subject.shortTitle}の大問一覧に戻る
        </Link>

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
              style={{
                background: `rgba(${theme.glowRgb},0.10)`,
                color: theme.primary,
              }}
            >
              <BookOpen className="h-3.5 w-3.5" />
              第{section.number}問 大問別ドリル
            </span>
            {section.isElective && (
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                選択問題
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
              <Timer className="h-3.5 w-3.5" />
              推奨 {section.recommendedMinutes}分 / {section.maxScore}点
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {section.title}
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            {section.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {topic}
              </span>
            ))}
          </div>
        </header>

        <section className="mt-6">
          <CommonTestDrillRunner
            questions={questions}
            subjectId={subject.id}
            sectionId={sectionId}
            sectionTitle={section.title}
            sectionNumber={section.number}
            recommendedMinutes={section.recommendedMinutes}
            theme={theme}
            subjectRoute={subject.route}
          />
        </section>
      </div>
    </main>
  );
}
