import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Swords, Scroll, Target } from "lucide-react";
import { getAllDojoProblems } from "@/lib/content";
import { DojoExplorer } from "@/components/dojo/DojoExplorer";
import { DEVIATION_VALUES, DEVIATION_META, UNIVERSITY_GROUP_META } from "@/lib/types";
import type { UniversityGroup } from "@/lib/types";

export const metadata: Metadata = {
  title: "入試良問演習",
  description:
    "大学入試の典型テーマをもとにしたオリジナル類題20選。レベルと単元で絞り込み、複数解法で定石を深掘りします。",
};

export default async function DojoPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const { slug } = await searchParams;
  if (slug) redirect(`/problems/${slug}`);

  const problems = getAllDojoProblems();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-amber"
      >
        <ArrowLeft className="h-4 w-4" />
        トップへ戻る
      </Link>

      {/* ---- ヘッダー ---- */}
      <header className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-amber/30 bg-neon-amber/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-amber">
          <Swords className="h-3.5 w-3.5" />
          大学入試レベル・オリジナル類題
        </div>

        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground"
          style={{ textShadow: "0 0 30px oklch(0.6 0.13 70 / 0.18)" }}>
          入試良問演習
        </h1>
        <p className="mt-2 text-muted-foreground">
          偏差値帯と単元を絞り込み、良問をランダム出題。定石（背景）を把握し、
          複数の解法を比べながら、「なぜ解けるのか」を理解します。
        </p>
      </header>

      {/* ---- 偏差値帯の凡例 ---- */}
      <div className="mt-6 grid grid-cols-5 gap-2">
        {DEVIATION_VALUES.map((v) => {
          const m = DEVIATION_META[v];
          return (
            <div
              key={v}
              className="washi rounded-xl p-2 text-center"
            >
              <div
                className="font-display text-lg font-extrabold"
                style={{ color: m.accent }}
              >
                {v}
              </div>
              <div className="mt-0.5 text-[10px] font-mono text-muted-foreground leading-tight">
                {m.name}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- コンセプトバッジ ---- */}
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          {
            icon: <Scroll className="h-4 w-4" />,
            title: "定石の可視化",
            desc: "「背景タグ」で問題の定石がひと目で分かる。",
          },
          {
            icon: <Target className="h-4 w-4" />,
            title: "なぜ？を開く",
            desc: "式変形・定理名に触れると定義がポップアップ。",
          },
          {
            icon: <Swords className="h-4 w-4" />,
            title: "複数の解法",
            desc: "代数・幾何・ベクトルなど複数アプローチをタブで切替。",
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="washi rounded-xl p-3">
            <div className="mb-1 flex items-center gap-1.5 text-neon-amber">
              {icon}
              <span className="font-display text-xs font-bold">{title}</span>
            </div>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      {/* ---- 私立文系の志望校群別演習 ---- */}
      <section
        className="mt-10 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(232,121,249,0.03)",
          border: "1px solid rgba(232,121,249,0.18)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{
            background: "rgba(232,121,249,0.06)",
            borderBottom: "1px solid rgba(232,121,249,0.12)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold tracking-wide text-blue-800"
            >
              私立文系・志望校群別演習
            </span>
            <span className="font-mono text-[10px] text-muted-foreground ml-1">
              志望校群別・数学対策問題
            </span>
          </div>
          <Link
            href="/english/dojo"
            className="text-xs font-semibold text-blue-800 underline underline-offset-2"
          >
            英語版 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
          {(Object.keys(UNIVERSITY_GROUP_META) as UniversityGroup[]).map((key) => {
            const m = UNIVERSITY_GROUP_META[key];
            return (
              <div
                key={key}
                className="rounded-xl p-3"
                style={{
                  background: `color-mix(in srgb, ${m.accent} 8%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${m.accent} 28%, transparent)`,
                }}
              >
                <div className="text-base font-extrabold text-slate-900">
                  {m.label}
                </div>
                <div className="mt-0.5 text-xs font-medium text-slate-600">
                  {m.deviationRange}
                </div>
                <div className="mt-1 text-xs leading-snug text-slate-600">
                  {m.description}
                </div>
              </div>
            );
          })}
        </div>
        <div className="px-5 pb-4">
          <p className="text-sm leading-relaxed text-slate-600">
            下の探索エリアで{" "}
            <span className="font-semibold text-blue-800">tags: 私立文系</span>{" "}
            を検索すると，各大学群の対策問題を絞り込める。
          </p>
        </div>
      </section>

      {/* ---- インタラクティブ探索エリア ---- */}
      <div className="mt-10">
        <DojoExplorer allProblems={problems} />
      </div>

      {/* ---- 問題一覧（全件サムネイル） ---- */}
      <section className="mt-16">
        <h2 className="mb-4 font-display text-lg font-bold tracking-wide text-foreground">
          収録問題一覧（{problems.length} 問）
        </h2>
        <div className="grid gap-2">
          {problems.map((p) => {
            const devM = p.deviation ? DEVIATION_META[p.deviation] : null;
            return (
              <div key={p.slug} className="washi washi-hover rounded-xl p-3">
                <div className="flex flex-wrap items-baseline gap-2">
                  {devM && (
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: devM.accent }}
                    >
                      {p.deviation}
                    </span>
                  )}
                  <span className="font-mono text-[10px] text-muted-foreground">{p.unit}</span>
                  <span className="font-semibold text-sm text-foreground">{p.title}</span>
                </div>
                {p.backgroundTag && (
                  <div className="mt-1 font-mono text-[10px] text-neon-amber/80">
                    # {p.backgroundTag}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
