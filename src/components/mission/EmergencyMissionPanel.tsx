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
    take: 5,
  });

  if (missions.length === 0) return null;

  const primary = missions[0];
  const primaryProblem = getProblem(primary.problemSlug);
  const rest = missions.slice(1);

  return (
    <section className="mt-10">
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
        {/* Pulse ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl animate-pulse"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.22 350 / 0.08), transparent)",
          }}
        />

        <div className="relative p-6 sm:p-8">
          {/* Header badge — 件数バッジ付き */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon-magenta/40 bg-neon-magenta/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-magenta">
              <Flame className="h-3.5 w-3.5 animate-pulse" />
              緊急ミッション — 師範からの特命
            </div>
            {missions.length > 1 && (
              <span
                className="rounded-full px-2.5 py-0.5 font-display text-xs font-bold"
                style={{
                  background: "oklch(0.55 0.22 350 / 0.18)",
                  border: "1px solid oklch(0.55 0.22 350 / 0.45)",
                  color: "oklch(0.55 0.22 350)",
                }}
              >
                {missions.length} 件未クリア
              </span>
            )}
          </div>

          {/* Primary mission */}
          <h2
            className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: "oklch(0.35 0.18 350)" }}
          >
            {primaryProblem?.title ?? primary.problemSlug}
          </h2>

          {primaryProblem && (
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {primaryProblem.unit}
              {primaryProblem.university && (
                <span className="ml-3 text-xs opacity-70">{primaryProblem.university}</span>
              )}
            </p>
          )}

          <Link
            href={`/mission/${primary.id}`}
            className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-display text-base font-extrabold tracking-wide transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, oklch(0.55 0.22 350), oklch(0.52 0.2 290))",
              color: "#fff",
              boxShadow: "0 4px 20px oklch(0.55 0.22 350 / 0.35)",
            }}
          >
            <Flame className="h-5 w-5" />
            特命を受ける
            <ArrowRight className="h-4 w-4" />
          </Link>

          {/* Additional missions (compact list) */}
          {rest.length > 0 && (
            <div className="mt-5 space-y-2">
              <p
                className="font-mono text-[10px] uppercase tracking-[0.2em]"
                style={{ color: "oklch(0.55 0.22 350 / 0.7)" }}
              >
                その他の未クリアミッション
              </p>
              {rest.map((m) => {
                const p = getProblem(m.problemSlug);
                return (
                  <Link
                    key={m.id}
                    href={`/mission/${m.id}`}
                    className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors hover:brightness-95"
                    style={{
                      background: "oklch(0.55 0.22 350 / 0.08)",
                      border: "1px solid oklch(0.55 0.22 350 / 0.22)",
                      color: "oklch(0.4 0.15 350)",
                    }}
                  >
                    <span className="font-semibold">
                      {p?.title ?? m.problemSlug}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
