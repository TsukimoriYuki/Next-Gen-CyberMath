import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ArrowUpRight,
  FlaskConical,
  Zap,
  Swords,
  ArrowRight,
} from "lucide-react";
import {
  getAllLessonSlugs,
  getLesson,
  getProblem,
  slugForUnit,
} from "@/lib/content";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { TagList } from "@/components/shell/TagChip";

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lessons/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) return { title: "講座が見つかりません" };
  return { title: lesson.title, description: lesson.summary ?? `${lesson.unit} の講座` };
}

// ─────────────────────────────────────────────────────────────
// Rich section header (reusable inline component)
// ─────────────────────────────────────────────────────────────
function SectionHeader({
  icon,
  label,
  sublabel,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  accent: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{
          color: accent,
          background: `color-mix(in oklch, ${accent} 12%, transparent)`,
          border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
        }}
      >
        {icon}
      </span>
      <div>
        <div
          className="font-display text-lg font-extrabold leading-none tracking-tight"
          style={{ color: accent }}
        >
          {label}
        </div>
        <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {sublabel}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default async function LessonPage({
  params,
}: PageProps<"/lessons/[slug]">) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();

  const relatedProblems = (lesson.relatedProblemSlugs ?? [])
    .map((s) => getProblem(s))
    .filter((p) => p !== undefined);

  const practiceP = lesson.practiceProblemSlug
    ? getProblem(lesson.practiceProblemSlug)
    : undefined;

  const isRich = !!(lesson.proof || lesson.application || lesson.practiceProblemSlug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-magenta"
      >
        <ArrowLeft className="h-4 w-4" />
        講座集へ戻る
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neon-magenta/90">
          <BookOpen className="h-3.5 w-3.5" />
          Concept Lesson
          <Link
            href={`/units/${slugForUnit(lesson.unit)}`}
            className="text-muted-foreground hover:text-neon-cyan"
          >
            {lesson.unit}
          </Link>
        </div>
        <h1
          className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
          style={{
            textShadow:
              "0 0 28px color-mix(in oklch, var(--neon-magenta) 30%, transparent)",
          }}
        >
          {lesson.title}
        </h1>
        {lesson.summary && (
          <p className="mt-3 text-muted-foreground">{lesson.summary}</p>
        )}
        <TagList tags={lesson.tags} className="mt-4 flex flex-wrap gap-1.5" />
      </header>

      <div className="my-8 h-px bg-gradient-to-r from-transparent via-neon-magenta/40 to-transparent" />

      {/* ── Concept overview (always shown) ── */}
      {lesson.content && (
        <div className="glass rounded-2xl p-6 sm:p-8">
          <LessonRenderer content={lesson.content} />
        </div>
      )}

      {/* ══════════════════════════════════════════════════════
          Rich 3-Section Layout
          （proof / application / practiceProblemSlug がある授業のみ）
          ══════════════════════════════════════════════════════ */}
      {isRich && (
        <div className="mt-10 space-y-10">

          {/* ─── Section 1: 【真理】Strict Proof ─── */}
          {lesson.proof && (
            <section>
              <SectionHeader
                icon={<FlaskConical className="h-5 w-5" />}
                label="真理"
                sublabel="Strict Proof — 厳密な証明"
                accent="var(--neon-cyan)"
              />
              <div
                className="glass rounded-2xl p-6 sm:p-8"
                style={{
                  borderColor: "color-mix(in oklch, var(--neon-cyan) 30%, transparent)",
                  background:
                    "linear-gradient(135deg, oklch(1 0 0 / 0.82), oklch(0.97 0.008 215 / 0.65))",
                }}
              >
                <LessonRenderer content={lesson.proof} />
              </div>
            </section>
          )}

          {/* ─── Section 2: 【極意】How to Apply ─── */}
          {lesson.application && (
            <section>
              <SectionHeader
                icon={<Zap className="h-5 w-5" />}
                label="極意"
                sublabel="How to Apply — 実戦での活かし方"
                accent="var(--neon-amber)"
              />
              <div
                className="washi rounded-2xl p-6 sm:p-8"
                style={{
                  borderColor: "color-mix(in oklch, var(--neon-amber) 38%, transparent)",
                }}
              >
                <LessonRenderer content={lesson.application} />
              </div>
            </section>
          )}

          {/* ─── Section 3: 【実践】Try in Dojo ─── */}
          {lesson.practiceProblemSlug && (
            <section>
              <SectionHeader
                icon={<Swords className="h-5 w-5" />}
                label="実践"
                sublabel="Try in Dojo — この武器を試す"
                accent="var(--neon-magenta)"
              />
              <div
                className="glass rounded-2xl p-6 sm:p-8"
                style={{
                  borderColor:
                    "color-mix(in oklch, var(--neon-magenta) 25%, transparent)",
                  background:
                    "linear-gradient(135deg, oklch(1 0 0 / 0.8), oklch(0.97 0.01 350 / 0.6))",
                }}
              >
                {practiceP && (
                  <div className="mb-5">
                    <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                      <DifficultyBadge difficulty={practiceP.difficulty} />
                      <span className="uppercase tracking-wider">{practiceP.unit}</span>
                    </div>
                    <p className="mt-2 font-display text-base font-semibold text-foreground">
                      {practiceP.title}
                    </p>
                    {practiceP.tagline && (
                      <p className="mt-1 text-sm italic text-muted-foreground">
                        「{practiceP.tagline}」
                      </p>
                    )}
                  </div>
                )}

                {/* Cyber CTA button */}
                <Link
                  href={`/dojo?slug=${lesson.practiceProblemSlug}`}
                  className="group inline-flex items-center gap-3 rounded-xl px-6 py-4 font-display text-base font-extrabold tracking-wide transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, color-mix(in oklch, var(--neon-magenta) 18%, transparent), color-mix(in oklch, var(--neon-violet) 12%, transparent))",
                    border:
                      "1px solid color-mix(in oklch, var(--neon-magenta) 45%, transparent)",
                    color: "var(--neon-magenta)",
                    boxShadow:
                      "0 0 0 1px color-mix(in oklch, var(--neon-magenta) 20%, transparent), 0 6px 20px color-mix(in oklch, var(--neon-magenta) 10%, transparent)",
                  }}
                >
                  <Swords className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  この武器を道場で試す
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="mt-3 text-xs text-muted-foreground">
                  論理ステップを一段ずつ自分の手で開きながら解く。
                </p>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── Related problems (legacy / non-rich lessons) ── */}
      {!isRich && relatedProblems.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-cyan/90">
            この講座で解ける問題
          </h2>
          <div className="grid gap-3">
            {relatedProblems.map((p) => (
              <Link
                key={p.slug}
                href={`/problems/${p.slug}`}
                className="glass glass-hover group flex items-center gap-3 rounded-xl p-4"
              >
                <DifficultyBadge difficulty={p.difficulty} />
                <span className="flex-1 font-display font-semibold text-foreground">
                  {p.title}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-neon-cyan" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
