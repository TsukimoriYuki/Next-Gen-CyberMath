// Server Component — 大問別ドリルページの共通レイアウト
import Link from "next/link";
import { ArrowLeft, Timer, Zap } from "lucide-react";
import type { CommonTestSubject, CommonTestSection } from "@/data/common-test";
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
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.glowRgb},0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.glowRgb},0.02) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="pointer-events-none absolute -top-60 -right-60 h-[500px] w-[500px] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${theme.glowRgb},0.06) 0%, transparent 70%)` }}
      />

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] text-white/30">
          <Link href="/common-test" className="hover:text-white/60 transition-colors">
            COMMAND CENTER
          </Link>
          <span>/</span>
          <Link href={subject.route} className="hover:text-white/60 transition-colors">
            {subject.shortTitle}
          </Link>
          <span>/</span>
          <span style={{ color: `rgba(${theme.glowRgb},0.7)` }}>第{section.number}問</span>
        </nav>

        {/* Back link */}
        <Link
          href={subject.route}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs transition-colors"
          style={{ color: `rgba(${theme.glowRgb},0.6)` }}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {subject.shortTitle} TOPへ戻る
        </Link>

        {/* Section header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                background: `rgba(${theme.glowRgb},0.08)`,
                border: `1px solid rgba(${theme.glowRgb},0.25)`,
                color: theme.primary,
              }}
            >
              <Zap className="h-3 w-3" />
              第{section.number}問 DRILL
            </div>
            {section.isElective && (
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase"
                style={{
                  background: "rgba(251,191,36,0.10)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  color: "#fbbf24",
                }}
              >
                選択問題
              </span>
            )}
            <div
              className="flex items-center gap-1 rounded-full px-2.5 py-1 font-mono text-[9px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.50)",
              }}
            >
              <Timer className="h-3 w-3" />
              推奨 {section.recommendedMinutes}分 ／ {section.maxScore}点
            </div>
          </div>

          <h1
            className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
            style={{ color: theme.primary }}
          >
            {section.title}
          </h1>

          {/* Topics */}
          <div className="mt-3 flex flex-wrap gap-2">
            {section.topics.map((t) => (
              <span
                key={t}
                className="rounded-lg px-2.5 py-1 font-mono text-[10px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div
            className="mt-5 h-px"
            style={{
              background: `linear-gradient(90deg, rgba(${theme.glowRgb},0.4), rgba(${theme.glowRgb},0.05), transparent)`,
            }}
          />
        </header>

        {/* Drill runner (Client Component) */}
        <section className="mt-8">
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

        {/* Footer */}
        <p className="mt-16 text-center font-mono text-[9px] tracking-[0.2em] text-white/15 uppercase">
          CYBER OS · Common Test · {subject.shortTitle} · 第{section.number}問
        </p>
      </div>
    </div>
  );
}
