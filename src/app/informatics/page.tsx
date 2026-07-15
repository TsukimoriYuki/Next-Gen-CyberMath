import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ListChecks, RotateCcw } from "lucide-react";
import {
  ContentMeta,
  LearningBreadcrumbs,
} from "@/components/learning/LearningPageFrame";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
} from "@/components/learning/LearningPage";
import { INFORMATICS_1_COURSE_SUBJECT } from "@/data/courses";
import {
  INFORMATICS_DIFFICULTY_META,
  INFORMATICS_KIND_META,
  INFORMATICS_PROBLEMS,
  getInformaticsProblemsByLesson,
} from "@/data/informatics/problems";
import { requireSubject } from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";

const INFORMATICS_SUBJECT = requireSubject("informatics");

export const metadata: Metadata = createPublicMetadata({
  title: `${INFORMATICS_SUBJECT.name} β`,
  description: INFORMATICS_SUBJECT.description,
  path: INFORMATICS_SUBJECT.href,
});

export default function InformaticsPage() {
  const subject = INFORMATICS_SUBJECT;
  const units = INFORMATICS_1_COURSE_SUBJECT.units;
  const lessonCount = units.reduce((sum, unit) => sum + unit.lessons.length, 0);
  const reviewStarts = units.flatMap((unit) => {
    const firstLesson = unit.lessons[0];
    const firstProblem = firstLesson
      ? getInformaticsProblemsByLesson(firstLesson.lessonId)[0]
      : undefined;
    return firstLesson && firstProblem
      ? [{ unit, lesson: firstLesson, problem: firstProblem }]
      : [];
  });

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningBreadcrumbs
          items={[{ label: "教科一覧", href: "/subjects" }, { label: "情報Ⅰ" }]}
        />
      <LearningPageHero
        eyebrow="情報Ⅰ"
        title="情報Ⅰ"
        description={subject.description}
        actions={[
          { label: "講座から学ぶ", href: "#learn", primary: true },
          { label: "問題を解く", href: "#practice" },
        ]}
        supporting={
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold text-slate-950">βカリキュラム</p>
            <ContentMeta
              className="mt-3"
              items={[
                { label: "基礎講座", value: `${lessonCount}講座` },
                { label: "演習問題", value: `${INFORMATICS_PROBLEMS.length}問` },
              ]}
            />
          </div>
        }
      />

      <LearningSection
          id="learn"
          title="基礎講座"
          description="実際の場面でどう判断するかを軸に、情報Ⅰの土台を学びます。上から順に進めるのがおすすめです。"
        >
        <div className="space-y-8">
          {units.map((unit) => (
            <div key={unit.unitId}>
              <h3 className="text-lg font-bold text-slate-900">{unit.unitTitle}</h3>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
                {unit.unitDescription}
              </p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {unit.lessons.map((lesson) => (
                  <li key={lesson.lessonId}>
                    <Link
                      href={`/courses/informatics-1/${unit.unitId}/${lesson.lessonId}`}
                      className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50/40"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold text-teal-800">
                        <BookOpen className="h-4 w-4" aria-hidden="true" />
                        講座
                      </span>
                      <span className="mt-1.5 font-bold text-slate-900">
                        {lesson.lessonTitle}
                      </span>
                      <span className="mt-1 text-sm leading-6 text-slate-600">
                        {lesson.lessonDescription}
                      </span>
                      <ContentMeta
                        className="mt-3"
                        items={[
                          { label: "所要時間", value: `約${lesson.estimatedMinutes}分` },
                          { label: "確認問題", value: `${lesson.checkQuestions.length}問` },
                        ]}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </LearningSection>

      <LearningSection
          id="practice"
          title="演習問題"
          description="講座で学んだ判断基準を、単一選択・複数選択・正誤判定・状況判断の形式で確認します。"
        >
        <div className="space-y-8">
          {units.flatMap((unit) =>
            unit.lessons.map((lesson) => {
              const problems = getInformaticsProblemsByLesson(lesson.lessonId);
              if (problems.length === 0) return null;
              return (
                <div key={lesson.lessonId}>
                  <h3 className="text-lg font-bold text-slate-900">
                    {lesson.lessonTitle}
                  </h3>
                  <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white shadow-sm">
                    {problems.map((problem) => (
                      <li key={problem.id}>
                        <Link
                          href={`/informatics/problems/${problem.id}`}
                          className="flex items-center gap-3 p-4 transition-colors hover:bg-slate-50"
                        >
                          <ListChecks
                            className="h-4 w-4 shrink-0 text-teal-700"
                            aria-hidden="true"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold text-slate-900">
                              {problem.title}
                            </span>
                            <span className="mt-0.5 block text-xs text-slate-600">
                              {INFORMATICS_KIND_META[problem.kind].label} ・{" "}
                              {INFORMATICS_DIFFICULTY_META[problem.difficulty].label} ・
                              約{problem.estimatedMinutes}分
                            </span>
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0 text-slate-400"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }),
          )}
        </div>
      </LearningSection>

      <LearningSection
          title="復習する"
          description="各領域の最初の問題から解き直し、問題ページの復習タグで弱点を確認して、対応講座へ戻れます。"
        >
        <ul className="grid gap-3 sm:grid-cols-2">
          {reviewStarts.map(({ unit, lesson, problem }) => (
            <li key={unit.unitId}>
              <Link
                href={`/informatics/problems/${problem.slug ?? problem.id}`}
                className="group flex h-full items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50/40"
              >
                <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                <span>
                  <span className="block font-bold text-slate-900">{unit.unitTitle}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">
                    {lesson.lessonTitle}から復習を始める
                  </span>
                  <span className="mt-2 block text-xs font-semibold text-teal-800">
                    復習タグ: {problem.reviewTags.join(" / ")}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
