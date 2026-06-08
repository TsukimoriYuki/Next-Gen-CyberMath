import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Swords, Scroll, Target } from "lucide-react";
import { getAllDojoProblems } from "@/lib/content";
import { DojoExplorer } from "@/components/dojo/DojoExplorer";
import { DEVIATION_VALUES, DEVIATION_META } from "@/lib/types";

export const metadata: Metadata = {
  title: "過去問道場",
  description:
    "偏差値55〜70帯の良問20選。偏差値スライダー×単元絞り込みで良問をランダム出題。「なぜ？」ポップアップと複数解法で定石を深掘りする。",
};

export default function DojoPage() {
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
          Dojo — Past Problems
        </div>

        <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground"
          style={{ textShadow: "0 0 30px oklch(0.6 0.13 70 / 0.18)" }}>
          過去問<span className="text-neon-amber">道場</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          偏差値帯と単元を絞り込み、良問をランダム出題。定石（背景）を把握し、
          複数の解法で「なぜ解けるのか」を体得せよ。
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
