import type { Metadata } from "next";
import { getUnitSummaries } from "@/lib/content";
import { UnitCard } from "@/components/shell/UnitCard";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";

export const metadata: Metadata = {
  title: "単元",
  description: "数学I・Aから発展分野まで、単元から高校数学の問題と授業を選ぶページです。",
  alternates: {
    canonical: "/units",
  },
  openGraph: {
    title: "数学の単元・問題",
    description: "単元から高校数学の問題、授業、復習導線へ進むための一覧ページ。",
    url: "/units",
  },
};

export default function UnitsPage() {
  const units = getUnitSummaries();
  const groups = [
    { key: "ia", label: "数学 I・A", units: units.filter((u) => u.order < 20) },
    { key: "iib", label: "数学 II・B", units: units.filter((u) => u.order >= 30 && u.order < 50) },
    { key: "adv", label: "発展問題", units: units.filter((u) => u.order >= 50) },
  ].filter((g) => g.units.length > 0);

  return (
    <LearningPageShell width="content">
      <LearningBreadcrumbs items={[{ label: "数学", href: "/math" }, { label: "単元別問題" }]} />
      <LearningPageHeader
        eyebrow="数学"
        title="単元を選ぶ"
        description="学びたい分野を選ぶと、その単元の問題と関連講座へ進めます。"
      />

      {groups.map((g) => (
        <section key={g.key} className="mt-10 first:mt-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-950">
              {g.label}
            </h2>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.units.map((u) => (
              <UnitCard key={u.slug} unit={u} />
            ))}
          </div>
        </section>
      ))}
    </LearningPageShell>
  );
}
