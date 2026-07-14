import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock, RotateCcw, Target } from "lucide-react";
import { getAllProblems, getAllSlugs, getProblem, getLesson } from "@/lib/content";
import { DIFFICULTY_META } from "@/lib/types";
import type { Problem } from "@/lib/types";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { TagList } from "@/components/shell/TagChip";
import { MathText } from "@/components/math/Math";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { LabRenderer } from "@/components/graph/LabRenderer";
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

  const meta = DIFFICULTY_META[problem.difficulty];
  const lesson = getLesson(problem.relatedLessonSlug);
  const allProblems = getAllProblems();
  const contextGuide = getProblemContextGuide(problem);
  const similarProblems = getSimilarProblems(problem, allProblems, 3);
  const reverseProblems = getReversePatternProblems(problem, allProblems, 2);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/units"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        単元一覧へ戻る
      </Link>

      {/* Problem header */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <DifficultyBadge difficulty={problem.difficulty} withName />
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {problem.unit}
          </span>
        </div>

        <h1
          className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight"
          style={{ textShadow: `0 0 24px color-mix(in oklch, ${meta.accent} 30%, transparent)` }}
        >
          {problem.title}
        </h1>
        {problem.tagline && (
          <p className="mt-2 text-sm italic text-muted-foreground">
            「{problem.tagline}」
          </p>
        )}
        <TagList tags={problem.tags} className="mt-4 flex flex-wrap gap-1.5" />
      </header>

      {/* Statement */}
      <section className="glass mt-8 rounded-2xl p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-800">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-cyan" />
          問題
        </div>
        <MathText className="text-[15px] text-foreground/90">
          {problem.statement}
        </MathText>
      </section>

      {/* Logic scaffolding (+ embedded lab in the EXPERIMENT step) */}
      <section className="mt-10">
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
    </div>
  );
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
  const fallbackWeapons = problem.tags?.slice(0, 3) ?? [problem.unit, "条件整理", "解法選択"];
  const contextLabel = getExamContextLabel(problem.difficulty);
  const contextBody = isCommonTestDifficulty(problem.difficulty)
    ? contextGuide?.commonTestContext
    : contextGuide?.advancedContext;

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-neon-violet/25 bg-card/70">
      <div className="border-b border-neon-violet/10 bg-neon-violet/5 px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-bold text-neon-violet">
          <RotateCcw className="h-4 w-4" />
          この問題を解いた後の復習導線
        </div>
      </div>
      <div className="space-y-6 p-5">
        <div className="grid gap-3 sm:grid-cols-3">
          <AftercareBox
            icon={<Target className="h-4 w-4 text-neon-lime" />}
            label="この問題の核"
            body={contextGuide?.masteryFocus ?? `${problem.unit}の条件を整理して、最初の一手を選ぶ`}
          />
          <AftercareBox
            icon={<BookOpen className="h-4 w-4 text-neon-cyan" />}
            label="身につく武器"
            body={(contextGuide?.weapons ?? fallbackWeapons).slice(0, 3).join(" / ")}
          />
          <AftercareBox
            icon={<Clock className="h-4 w-4 text-neon-amber" />}
            label="目標解答時間"
            body={`${defaultTargetMinutes(problem)}分`}
          />
        </div>

        {contextGuide?.lecture && (
          <div className="rounded-2xl border border-neon-cyan/20 bg-background/40 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-bold text-neon-cyan">関連する特別授業</div>
                <h2 className="mt-1 font-display text-xl font-extrabold text-foreground">
                  {contextGuide.lecture.title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {contextGuide.lecture.description}
                </p>
              </div>
              <Link
                href={`/common-test/lectures/${contextGuide.lecture.lectureSlug}`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-neon-cyan px-4 py-3 text-sm font-extrabold text-background transition hover:brightness-110"
              >
                補講を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-bold text-foreground">間違えた場合の戻り先</h3>
            <div className="space-y-2">
              {(contextGuide?.recoveryLinks ?? []).slice(0, 3).map((item) => (
                <Link
                  key={`${item.symptom}-${item.href}`}
                  href={item.href}
                  className="block rounded-xl border border-white/10 bg-background/40 p-3 transition hover:border-neon-cyan/40"
                >
                  <div className="text-xs font-bold text-neon-amber">{item.symptom}</div>
                  <div className="mt-0.5 text-sm font-semibold text-foreground">{item.label}</div>
                </Link>
              ))}
              {!contextGuide && (
                <div className="rounded-xl border border-white/10 bg-background/40 p-3 text-sm text-muted-foreground">
                  解説ステップの「着眼点」に戻り、条件を1つずつ言語化してください。
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-foreground">{contextLabel}</h3>
            <p className="rounded-xl border border-white/10 bg-background/40 p-3 text-sm leading-6 text-muted-foreground">
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
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-background/40 p-3">
      <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold leading-6 text-foreground">{body}</div>
    </div>
  );
}

function ProblemLinkGroup({ title, problems }: { title: string; problems: Problem[] }) {
  if (problems.length === 0) return null;
  return (
    <div>
      <h3 className="mb-2 text-sm font-bold text-foreground">{title}</h3>
      <div className="grid gap-2 sm:grid-cols-2">
        {problems.map((problem) => (
          <Link
            key={problem.slug}
            href={`/problems/${problem.slug}`}
            className="rounded-xl border border-white/10 bg-background/40 p-3 transition hover:border-neon-cyan/40"
          >
            <div className="text-sm font-bold text-foreground">{problem.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {problem.unit} / 難度{problem.difficulty}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function defaultTargetMinutes(problem: Problem): number {
  switch (problem.difficulty) {
    case "A":
      return 4;
    case "B":
      return 6;
    case "C":
      return 8;
    case "D":
      return 12;
    case "D_PLUS":
      return 18;
    case "EX":
      return 25;
    case "OLYMPIAD":
      return 40;
    default:
      return 10;
  }
}
