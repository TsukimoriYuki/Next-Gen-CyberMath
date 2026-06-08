import Link from "next/link";
import { ArrowRight, Sparkles, LineChart, Zap } from "lucide-react";
import {
  getAllProblems,
  getChallengeProblems,
  formatDateJP,
} from "@/lib/content";
import { DIFFICULTY_META, DIFFICULTY_ORDER } from "@/lib/types";
import { DailyTriple } from "@/components/daily/DailyTriple";
import { ProblemCard } from "@/components/shell/ProblemCard";

export default function HomePage() {
  const now = new Date();
  const daily = getChallengeProblems(now);
  const all = getAllProblems();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="glass rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            高校数学 · 次世代学習プラットフォーム
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            数学の<span className="text-neon-cyan text-glow-12">美しさ</span>と
            <br className="hidden sm:block" />
            真の<span className="text-neon-magenta text-glow-12">理解</span>を、
            極限まで。
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            動くグラフで実験し、論理を一段ずつ自分の手で開く。基礎{" "}
            <span className="font-mono text-neon-lime">A</span> から、発想に感動のある超難問{" "}
            <span className="font-mono text-neon-magenta">D+</span>{" "}
            まで攻略する、サイバー学習体験。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#daily"
              className="glow-magenta inline-flex items-center gap-2 rounded-xl bg-neon-magenta/15 px-5 py-3 text-sm font-semibold text-neon-magenta transition-colors hover:bg-neon-magenta/25"
            >
              私からの挑戦へ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/drill"
              className="inline-flex items-center gap-2 rounded-xl border border-neon-amber/40 bg-neon-amber/5 px-5 py-3 text-sm font-semibold text-neon-amber transition-colors hover:bg-neon-amber/15"
            >
              <Zap className="h-4 w-4" />
              計算特訓
            </Link>
            <Link
              href="/mock/history"
              className="inline-flex items-center gap-2 rounded-xl border border-neon-cyan/40 bg-neon-cyan/5 px-5 py-3 text-sm font-semibold text-neon-cyan transition-colors hover:bg-neon-cyan/15"
            >
              <LineChart className="h-4 w-4" />
              マイページ
            </Link>
            <Link
              href="/units"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
            >
              単元から探す
            </Link>
          </div>
        </div>
      </section>

      {/* Difficulty pyramid */}
      <section className="mt-16">
        <h2 className="font-display text-xl font-bold tracking-wide">
          難易度ピラミッド
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          A から D+ へ。上に行くほど、解法そのものが美しくなる。
        </p>

        <div className="mt-6 flex flex-col items-center gap-2">
          {[...DIFFICULTY_ORDER].reverse().map((d, i) => {
            const meta = DIFFICULTY_META[d];
            const count = all.filter((p) => p.difficulty === d).length;
            const width = 52 + i * 11; // narrow at top (D+), wide at base (A)
            return (
              <div
                key={d}
                className="glass glass-hover flex items-center justify-between rounded-xl px-5 py-3"
                style={{
                  width: `${width}%`,
                  borderColor: `color-mix(in oklch, ${meta.accent} 35%, transparent)`,
                }}
              >
                <span
                  className="font-display text-lg font-bold"
                  style={{ color: meta.accent }}
                >
                  {meta.label}
                </span>
                <span className="text-sm text-muted-foreground">
                  {meta.name}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {count} 問
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily triple */}
      <section className="mt-16">
        <DailyTriple problems={daily} dateLabel={formatDateJP(now)} />
      </section>

      {/* Full catalog */}
      <section className="mt-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-xl font-bold tracking-wide">
              すべての問題
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {all.length} 問を収録。難易度順に並んでいます。
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {all
            .slice()
            .sort(
              (a, b) =>
                DIFFICULTY_ORDER.indexOf(a.difficulty) -
                DIFFICULTY_ORDER.indexOf(b.difficulty),
            )
            .map((p) => (
              <ProblemCard key={p.slug} problem={p} />
            ))}
        </div>
      </section>
    </div>
  );
}
