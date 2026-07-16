import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Target } from "lucide-react";
import { getAllProblems, getAllSlugs, getProblem, getLesson } from "@/lib/content";
import { DIFFICULTY_META } from "@/lib/types";
import type { Problem } from "@/lib/types";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
  LearningSectionHeader,
} from "@/components/learning/LearningPageFrame";
import { MathText } from "@/components/math/Math";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { MathUnitPracticeRunner } from "@/components/math/MathUnitPracticeRunner";
import { LabRenderer } from "@/components/graph/LabRenderer";
import { MATH_1A_COURSE_SUBJECT } from "@/data/courses/math-1a";
import { getNextMathUnitPracticeProblem } from "@/data/math-1a-unit-practice";
import { tagSlug } from "@/data/tags";
import {
  getExamContextLabel,
  getProblemContextGuide,
  getReversePatternProblems,
  getSimilarProblems,
  isCommonTestDifficulty,
  type ProblemContextGuide,
} from "@/lib/special-lecture-guidance";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/problems/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) return { title: "問題が見つかりません" };
  const description = problem.tagline ?? `${problem.unit} の問題`;
  return {
    title: problem.title,
    description,
    alternates: { canonical: `/problems/${slug}` },
    openGraph: {
      title: `${problem.title} | Cyber Math`,
      description,
      url: `/problems/${slug}`,
    },
  };
}

export default async function ProblemPage({
  params,
}: PageProps<"/problems/[slug]">) {
  const { slug } = await params;
  const problem = getProblem(slug);
  if (!problem) notFound();

  const difficulty = DIFFICULTY_META[problem.difficulty];
  const lesson = getLesson(problem.relatedLessonSlug);
  const allProblems = getAllProblems();
  const contextGuide = getProblemContextGuide(problem);
  const similarProblems = getSimilarProblems(problem, allProblems, 3);
  const reverseProblems = getReversePatternProblems(problem, allProblems, 2);
  const practice = problem.unitPractice;
  const nextPracticeProblem = practice
    ? getNextMathUnitPracticeProblem(problem.slug)
    : undefined;
  const courseLinks = practice
    ? practice.relatedCourseIds.flatMap((courseId) => {
        for (const unit of MATH_1A_COURSE_SUBJECT.units) {
          const courseLesson = unit.lessons.find((candidate) => candidate.lessonId === courseId);
          if (courseLesson) {
            return [{
              id: courseId,
              label: courseLesson.lessonTitle,
              href: `/courses/math-1a/${unit.unitId}/${courseId}`,
            }];
          }
        }
        return [];
      })
    : [];

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "数学", href: "/math" },
          { label: "単元一覧", href: "/units" },
          { label: problem.title },
        ]}
      />

      <article>
        <LearningPageHeader
          eyebrow="問題演習"
          title={problem.title}
          description={problem.tagline}
          meta={[
            { label: "単元", value: problem.unit },
            {
              label: "難度",
              value: `${difficulty.label} ${difficulty.name}`,
            },
          ]}
        />

        <TagLinks tags={problem.tags} />

        {practice ? (
          <div className="mt-10">
            <MathUnitPracticeRunner
              practice={toPublicPractice(practice)}
              statement={problem.statement}
              unitHref={`/units/${getUnitRouteSlug(practice.unitId)}`}
              nextProblem={
                nextPracticeProblem
                  ? {
                      title: nextPracticeProblem.title,
                      href: `/problems/${nextPracticeProblem.slug}`,
                    }
                  : undefined
              }
              courseLinks={courseLinks}
            />
          </div>
        ) : (
          <>
            <section className="mt-10">
              <LearningSectionHeader title="問題" />
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <MathText className="text-base leading-8 text-slate-900">
                  {problem.statement}
                </MathText>
              </div>
            </section>

            <section className="mt-12" aria-label="解説">
              <LogicSteps
                slug={problem.slug}
                steps={problem.steps}
                labSlot={
                  problem.hasGraph && problem.graphKey ? (
                    <LabRenderer graphKey={problem.graphKey} />
                  ) : undefined
                }
                relatedLesson={
                  lesson ? { slug: lesson.slug, title: lesson.title } : undefined
                }
              />
            </section>

            <ProblemAftercare
              problem={problem}
              contextGuide={contextGuide}
              similarProblems={similarProblems}
              reverseProblems={reverseProblems}
            />
          </>
        )}
      </article>
    </LearningPageShell>
  );
}

function toPublicPractice(practice: NonNullable<Problem["unitPractice"]>) {
  const { internalKpd, ...publicPractice } = practice;
  void internalKpd;
  return publicPractice;
}

function getUnitRouteSlug(unitId: string) {
  return ({
    quadratic: "quadratic-functions",
    "figures-and-measurement": "measurement-trigonometry",
  } as Record<string, string>)[unitId] ?? unitId;
}

function ProblemAftercare({
  problem,
  contextGuide,
  similarProblems,
  reverseProblems,
}: {
  problem: Problem;
  contextGuide?: ProblemContextGuide;
  similarProblems: Problem[];
  reverseProblems: Problem[];
}) {
  const fallbackSkills = problem.tags?.slice(0, 3) ?? [problem.unit, "条件整理", "解法選択"];
  const contextLabel = getExamContextLabel(problem.difficulty);
  const contextBody = isCommonTestDifficulty(problem.difficulty)
    ? contextGuide?.commonTestContext
    : contextGuide?.advancedContext;

  return (
    <section className="mt-14">
      <LearningSectionHeader
        title="復習と関連学習"
        description="解答後に確認したいポイントと、次の学習先をまとめています。"
      />

      <div className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <AftercareBox
            icon={<Target className="h-4 w-4 text-blue-700" />}
            label="この問題のポイント"
            body={contextGuide?.masteryFocus ?? `${problem.unit}の条件を整理して、最初の一手を選ぶ`}
          />
          <AftercareBox
            icon={<BookOpen className="h-4 w-4 text-emerald-700" />}
            label="確認する考え方"
            body={(contextGuide?.weapons ?? fallbackSkills).slice(0, 3).join(" / ")}
          />
        </div>

        {contextGuide?.lecture && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-800">関連講座</p>
                <h3 className="mt-1 text-lg font-bold text-slate-950">
                  {contextGuide.lecture.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {contextGuide.lecture.description}
                </p>
              </div>
              <Link
                href={`/common-test/lectures/${contextGuide.lecture.lectureSlug}`}
                className="button-secondary shrink-0"
              >
                講座を見る
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-base font-bold text-slate-950">
              間違えた場合の確認先
            </h3>
            <div className="space-y-2">
              {(contextGuide?.recoveryLinks ?? []).slice(0, 3).map((item) => (
                <Link
                  key={`${item.symptom}-${item.href}`}
                  href={item.href}
                  className="block rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <div className="text-sm font-semibold text-amber-800">{item.symptom}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">{item.label}</div>
                </Link>
              ))}
              {!contextGuide && (
                <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-600">
                  解説ステップの「着眼点」に戻り、条件を1つずつ言語化してください。
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-base font-bold text-slate-950">{contextLabel}</h3>
            <p className="rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-600">
              {contextBody ??
                (isCommonTestDifficulty(problem.difficulty)
                  ? "小問の誘導に沿って、条件整理から計算へ進む形で出やすい。"
                  : "共通テスト直接対策ではなく、発想力・証明力を鍛える拡張問題として位置づく。")}
            </p>
          </div>
        </div>

        <ProblemLinkGroup title="似た問題" problems={similarProblems} />
        <ProblemLinkGroup title="逆パターンの問題" problems={reverseProblems} />
      </div>
    </section>
  );
}

function AftercareBox({
  icon,
  label,
  body,
}: {
  icon: ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        {icon}
        {label}
      </div>
      <div className="mt-2 text-sm font-semibold leading-6 text-slate-900">{body}</div>
    </div>
  );
}

function ProblemLinkGroup({ title, problems }: { title: string; problems: Problem[] }) {
  if (problems.length === 0) return null;

  return (
    <div>
      <h3 className="mb-2 text-base font-bold text-slate-950">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {problems.map((problem) => (
          <Link
            key={problem.slug}
            href={`/problems/${problem.slug}`}
            className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <div className="font-semibold text-slate-900 group-hover:text-blue-800">
              {problem.title}
            </div>
            <div className="mt-1 text-sm text-slate-600">
              {problem.unit} / 難度 {DIFFICULTY_META[problem.difficulty].label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function TagLinks({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null;

  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="関連タグ">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/tags/${tagSlug(tag)}`}
            className="inline-flex min-h-11 items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
