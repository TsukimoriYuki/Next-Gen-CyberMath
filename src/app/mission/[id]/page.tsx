import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Flame, Swords } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProblem } from "@/lib/content";
import { DIFFICULTY_META } from "@/lib/types";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";
import { MissionViewer } from "@/components/mission/MissionViewer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const mission = await prisma.emergencyMission.findUnique({
    where: { id },
    select: { problemSlug: true },
  });
  if (!mission) return { title: "ミッション" };
  const problem = getProblem(mission.problemSlug);
  return { title: `緊急ミッション — ${problem?.title ?? mission.problemSlug}` };
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");

  const { id } = await params;
  const mission = await prisma.emergencyMission.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true } } },
  });

  if (!mission) notFound();
  if (session.role !== "MENTOR" && mission.userId !== session.sub) notFound();

  const problem = getProblem(mission.problemSlug);
  if (!problem) notFound();

  const meta = DIFFICULTY_META[problem.difficulty];

  return (
    // Full-page dark overlay — creates tension distinct from the light dojo
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.1 0.04 265)" }}
    >
      {/* Ambient glow radials */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "oklch(0.55 0.22 350)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "oklch(0.52 0.2 290)" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: "oklch(0.6 0.08 265)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.75 0.18 350)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.6 0.08 265)")}
        >
          <ArrowLeft className="h-4 w-4" />
          ホームへ戻る
        </Link>

        {/* Mission header */}
        <header className="mt-8">
          {/* Alert badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-[0.2em]"
            style={{
              background: "oklch(0.55 0.22 350 / 0.15)",
              border: "1px solid oklch(0.55 0.22 350 / 0.4)",
              color: "oklch(0.75 0.18 350)",
            }}
          >
            <Flame className="h-3.5 w-3.5 animate-pulse" />
            Emergency Mission — 特命
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <DifficultyBadge difficulty={problem.difficulty} withName />
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: "oklch(0.55 0.08 265)" }}
            >
              {problem.unit}
            </span>
          </div>

          <h1
            className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
            style={{
              color: "oklch(0.92 0.02 240)",
              textShadow: `0 0 32px color-mix(in oklch, ${meta.accent} 40%, transparent)`,
            }}
          >
            {problem.title}
          </h1>

          {problem.tagline && (
            <p className="mt-2 text-sm italic" style={{ color: "oklch(0.55 0.08 265)" }}>
              「{problem.tagline}」
            </p>
          )}

          {/* Mission meta row */}
          <div
            className="mt-4 flex flex-wrap items-center gap-4 rounded-xl px-4 py-2.5 font-mono text-xs"
            style={{
              background: "oklch(0.55 0.22 350 / 0.08)",
              border: "1px solid oklch(0.55 0.22 350 / 0.2)",
              color: "oklch(0.65 0.1 290)",
            }}
          >
            <span className="flex items-center gap-1.5">
              <Swords className="h-3.5 w-3.5" style={{ color: "oklch(0.65 0.18 350)" }} />
              送り手：師範
            </span>
            <span>→ {mission.user.name}</span>
            <span style={{ color: "oklch(0.45 0.05 265)" }}>
              {new Date(mission.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Mission viewer — handles statement + LogicSteps + comment reveal */}
        <div className="mt-10">
          <MissionViewer
            problem={problem}
            mission={{
              id: mission.id,
              problemSlug: mission.problemSlug,
              comment: mission.comment,
              isCompleted: mission.isCompleted,
            }}
          />
        </div>
      </div>
    </div>
  );
}
