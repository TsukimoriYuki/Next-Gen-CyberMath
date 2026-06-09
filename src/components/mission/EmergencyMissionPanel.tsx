import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getProblem } from "@/lib/content";

export async function EmergencyMissionPanel() {
  const session = await getSession();
  if (!session) return null;

  const missions = await prisma.emergencyMission.findMany({
    where: { userId: session.sub, isCompleted: false },
    orderBy: { createdAt: "desc" },
    take: 1,
  });

  if (missions.length === 0) return null;

  const mission = missions[0];
  const problem = getProblem(mission.problemSlug);

  return (
    <section className="mt-10">
      {/* Pulsing alert wrapper */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.98 0.01 340 / 0.95), oklch(0.96 0.02 300 / 0.88))",
          border: "1px solid oklch(0.55 0.22 350 / 0.45)",
          boxShadow:
            "0 0 0 1px oklch(0.55 0.22 350 / 0.2), 0 8px 32px oklch(0.55 0.22 350 / 0.12)",
        }}
      >
        {/* Pulse ring — CSS animation */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.22 350 / 0.08), transparent)",
          }}
        />

        <div className="relative p-6 sm:p-8">
          {/* Header badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-magenta/40 bg-neon-magenta/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-magenta">
            <Flame className="h-3.5 w-3.5 animate-pulse" />
            緊急ミッション — 師範からの特命
          </div>

          <h2
            className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: "oklch(0.35 0.18 350)" }}
          >
            {problem?.title ?? mission.problemSlug}
          </h2>

          {problem && (
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {problem.unit}
              {problem.university && (
                <span className="ml-3 text-xs opacity-70">{problem.university}</span>
              )}
            </p>
          )}

          {/* CTA */}
          <Link
            href={`/mission/${mission.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-display text-base font-extrabold tracking-wide transition-all hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.52 0.2 290))",
              color: "#fff",
              boxShadow: "0 4px 20px oklch(0.55 0.22 350 / 0.35)",
            }}
          >
            <Flame className="h-5 w-5" />
            特命を受ける
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
