import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProblem } from "@/lib/content";
import { canAccessMissionProblem } from "@/lib/mission-publication";
import { DIFFICULTY_META } from "@/lib/types";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { MissionViewer } from "@/components/mission/MissionViewer";
import { EnglishMissionViewer } from "@/components/english/EnglishMissionViewer";

export const dynamic = "force-dynamic";

// ── English slug helper ────────────────────────────────────────────────────
// Slug format: "english/{mode}/{id}"
function resolveEnglishProblem(slug: string) {
  const parts = slug.split("/");
  if (parts.length !== 3 || parts[0] !== "english") return null;
  const [, mode, id] = parts;
  if (mode === "speed-reading") {
    const p = SPEED_READING_PROBLEMS.find((x) => x.id === id);
    if (!p) return null;
    return { mode: "speed-reading" as const, problem: p, title: p.title, level: p.level };
  }
  if (mode === "comprehension") {
    const p = COMPREHENSION_PROBLEMS.find((x) => x.id === id);
    if (!p) return null;
    return { mode: "comprehension" as const, problem: p, title: p.title, level: p.level };
  }
  if (mode === "multi-source") {
    const p = MULTI_SOURCE_PROBLEMS.find((x) => x.id === id);
    if (!p) return null;
    return { mode: "multi-source" as const, problem: p, title: p.title, level: p.level };
  }
  return null;
}

const MODE_LABEL: Record<string, string> = {
  "speed-reading": "速読長文",
  "comprehension": "長文読解＆文法",
  "multi-source": "マルチソース照合",
};

// ── Metadata ───────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const session = await getSession();
  if (!session) return { title: "ミッション" };

  const mission = await prisma.emergencyMission.findUnique({
    where: { id },
    select: { problemSlug: true, userId: true },
  });
  if (
    !mission ||
    (session.role !== "MENTOR" && mission.userId !== session.sub) ||
    !canAccessMissionProblem(mission.problemSlug)
  ) {
    return { title: "ミッション" };
  }
  if (mission.problemSlug.startsWith("english/")) {
    const info = resolveEnglishProblem(mission.problemSlug);
    return { title: `個別課題 — ${info?.title ?? mission.problemSlug}` };
  }
  const problem = getProblem(mission.problemSlug);
  return { title: `個別課題 — ${problem?.title ?? mission.problemSlug}` };
}

// ── Page ───────────────────────────────────────────────────────────────────

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
  if (!canAccessMissionProblem(mission.problemSlug)) notFound();

  // ── English mission ──────────────────────────────────────────────────────
  if (mission.problemSlug.startsWith("english/")) {
    const info = resolveEnglishProblem(mission.problemSlug);
    if (!info) notFound();

    const levelMeta = ENGLISH_LEVEL_META[info.level];

    return (
      <LearningPageShell width="reading">
        <LearningBreadcrumbs
          items={[
            { label: "ホーム", href: "/" },
            { label: "個別課題" },
            { label: info.title },
          ]}
        />
        <LearningPageHeader
          eyebrow="個別課題 · 英語"
          title={info.title}
          meta={[
            { label: "形式", value: MODE_LABEL[info.mode] },
            { label: "レベル", value: levelMeta.label },
            { label: "送り手", value: "指導者" },
            { label: "対象", value: mission.user.name },
            {
              label: "配信日",
              value: new Date(mission.createdAt).toLocaleDateString("ja-JP", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
            },
          ]}
        />

        <div className="mt-10">
          <EnglishMissionViewer
            mode={info.mode}
            problem={info.problem}
            mission={{
              id: mission.id,
              comment: mission.comment,
              isCompleted: mission.isCompleted,
            }}
          />
        </div>
      </LearningPageShell>
    );
  }

  // ── Math mission ─────────────────────────────────────────────────────────
  const problem = getProblem(mission.problemSlug);
  if (!problem) notFound();

  const meta = DIFFICULTY_META[problem.difficulty];

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "ホーム", href: "/" },
          { label: "個別課題" },
          { label: problem.title },
        ]}
      />
      <LearningPageHeader
        eyebrow="個別課題 · 数学"
        title={problem.title}
        description={problem.tagline}
        meta={[
          { label: "単元", value: problem.unit },
          { label: "難度", value: `${meta.label} ${meta.name}` },
          { label: "送り手", value: "指導者" },
          { label: "対象", value: mission.user.name },
          {
            label: "配信日",
            value: new Date(mission.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
          },
        ]}
      />

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
    </LearningPageShell>
  );
}
