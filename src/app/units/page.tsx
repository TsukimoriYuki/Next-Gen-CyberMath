import type { Metadata } from "next";
import { getUnitSummaries } from "@/lib/content";
import { UnitCard } from "@/components/shell/UnitCard";

export const metadata: Metadata = {
  title: "単元",
  description: "単元から高校数学の問題と授業を選ぶ。",
};

export default function UnitsPage() {
  const units = getUnitSummaries();
  const groups = [
    { key: "ia", label: "数学 I・A", dot: "bg-neon-cyan", units: units.filter((u) => u.order < 20) },
    { key: "iib", label: "数学 II・B", dot: "bg-neon-violet", units: units.filter((u) => u.order >= 30 && u.order < 50) },
    { key: "adv", label: "発展ショーケース", dot: "bg-neon-magenta", units: units.filter((u) => u.order >= 50) },
  ].filter((g) => g.units.length > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">
          単元を選ぶ
        </h1>
        <p className="mt-2 text-muted-foreground">
          学びたい分野のカードを選ぶと、その単元の問題と授業に進めます。
        </p>
      </header>

      {groups.map((g) => (
        <section key={g.key} className="mt-10 first:mt-8">
          <div className="flex items-center gap-3">
            <span className={`h-2 w-2 rounded-full ${g.dot}`} />
            <h2 className="font-display text-lg font-bold tracking-wide">
              {g.label}
            </h2>
            <span className="h-px flex-1 bg-border/60" />
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.units.map((u) => (
              <UnitCard key={u.slug} unit={u} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
