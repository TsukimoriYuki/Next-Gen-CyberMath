import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProblem } from "@/lib/content";
import { collectVisibleRows } from "@/lib/collect-visible-rows";
import { canAccessMissionProblem } from "@/lib/mission-publication";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";

function resolveTitle(slug: string): string | undefined {
  if (!slug.startsWith("english/")) return getProblem(slug)?.title;
  const [, mode, id] = slug.split("/");
  if (mode === "speed-reading") return SPEED_READING_PROBLEMS.find((p) => p.id === id)?.title;
  if (mode === "comprehension") return COMPREHENSION_PROBLEMS.find((p) => p.id === id)?.title;
  if (mode === "multi-source") return MULTI_SOURCE_PROBLEMS.find((p) => p.id === id)?.title;
  return undefined;
}

export async function EmergencyMissionPanel() {
  const session = await getSession();
  if (!session) return null;

  const missions = await collectVisibleRows({
    limit: 5,
    batchSize: 25,
    fetchBatch: ({ afterId, take }) =>
      prisma.emergencyMission.findMany({
        where: { userId: session.sub, isCompleted: false },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        take,
        cursor: afterId ? { id: afterId } : undefined,
        skip: afterId ? 1 : undefined,
      }),
    isVisible: (mission) => canAccessMissionProblem(mission.problemSlug),
  });

  if (missions.length === 0) return null;

  const primary = missions[0];
  const primaryTitle = resolveTitle(primary.problemSlug);
  const rest = missions.slice(1);

  return (
    <section
      className="mt-10 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm"
      aria-labelledby="individual-mission-heading"
    >
      <div className="border-b border-blue-100 bg-blue-50 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700"
            aria-hidden="true"
          >
            <Flame className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-blue-700">個別課題</p>
            <h2
              id="individual-mission-heading"
              className="mt-0.5 text-xl font-bold tracking-tight text-slate-950"
            >
              指導者からの個別課題
            </h2>
          </div>
          {missions.length > 1 && (
            <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold text-blue-800">
              {missions.length}件未完了
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-sm font-semibold text-slate-600">最初に取り組む課題</p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
          {primaryTitle ?? primary.problemSlug}
        </h3>

        <Link
          href={`/mission/${primary.id}`}
          className="button-primary mt-5 gap-2 focus-visible:outline-offset-4"
        >
          課題を開く
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        {rest.length > 0 && (
          <div className="mt-6 border-t border-slate-200 pt-5">
            <p className="text-sm font-bold text-slate-800">その他の未完了課題</p>
            <div className="mt-3 space-y-2">
              {rest.map((m) => {
                const title = resolveTitle(m.problemSlug);
                return (
                  <Link
                    key={m.id}
                    href={`/mission/${m.id}`}
                    className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-800 focus-visible:outline-offset-4"
                  >
                    <span>{title ?? m.problemSlug}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-500"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
