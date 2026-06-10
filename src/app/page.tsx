import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Sparkles, Swords, FileText, Zap, LineChart, BookOpen, Layers, Skull } from "lucide-react";
import {
  getAllProblems,
  getChallengeProblems,
  getProblem,
  formatDateJP,
} from "@/lib/content";
import { DIFFICULTY_META, DIFFICULTY_ORDER, type Problem } from "@/lib/types";
import { DailyTriple } from "@/components/daily/DailyTriple";
import { EmergencyMissionPanel } from "@/components/mission/EmergencyMissionPanel";
import { MessageBar } from "@/components/messages/MessageBar";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function getDailyProblems(now: Date): Promise<Problem[]> {
  // UTC midnight of today — must match how DailyChallengeEditor saves dates.
  const todayUTC = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );
  try {
    const challenges = await prisma.dailyChallenge.findMany({
      where: { date: todayUTC },
      include: { problem: { select: { slug: true } } },
      orderBy: { slot: "asc" },
    });
    if (challenges.length === 3) {
      const problems = challenges
        .map((c) => getProblem(c.problem.slug))
        .filter((p): p is Problem => p !== undefined);
      if (problems.length === 3) return problems;
    }
  } catch {
    // DB unavailable — fall through to static fallback
  }
  return getChallengeProblems(now);
}

export default async function HomePage() {
  const now = new Date();
  const daily = await getDailyProblems(now);
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
              今日の挑戦へ
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dojo"
              className="inline-flex items-center gap-2 rounded-xl border border-neon-amber/40 bg-neon-amber/5 px-5 py-3 text-sm font-semibold text-neon-amber transition-colors hover:bg-neon-amber/15"
            >
              <Swords className="h-4 w-4" />
              道場へ入門
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
            const width = 52 + i * 11;
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
      <section className="mt-16" id="daily">
        <DailyTriple problems={daily} dateLabel={formatDateJP(now)} />
      </section>

      {/* Navigation panels */}
      <section className="mt-16">
        <h2 className="font-display text-xl font-bold tracking-wide">
          道場への扉
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          目的に合わせて入り口を選べ。
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* 道場 */}
          <Link
            href="/dojo"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-amber/10 text-neon-amber transition-transform group-hover:scale-105">
                <Swords className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  過去問道場
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  大学入試の精選問題を、論理ステップで完全攻略する。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-amber">
                  入門する <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* サイバー模試 */}
          <Link
            href="/mock"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-magenta/10 text-neon-magenta transition-transform group-hover:scale-105">
                <FileText className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  サイバー模試
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  タグ・難易度・時間を自在にカスタムした本番形式テスト。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-magenta">
                  受験する <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* 計算特訓 */}
          <Link
            href="/drill"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10 text-neon-cyan transition-transform group-hover:scale-105">
                <Zap className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  計算特訓
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  速度と精度を鍛える反復計算ドリル。毎日の習慣に。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-cyan">
                  特訓開始 <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* 弱点診断 */}
          <Link
            href="/mock/history"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-lime/10 text-neon-lime transition-transform group-hover:scale-105">
                <LineChart className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  弱点診断
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  過去の模試結果から弱点タグを分析し、学習戦略を立てる。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-lime">
                  診断する <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* 授業スキルツリー */}
          <Link
            href="/lessons"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-magenta/10 text-neon-magenta transition-transform group-hover:scale-105">
                <BookOpen className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  授業スキルツリー
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  概念のつながりをたどる。証明から極意まで 3 段構成で体得する。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-magenta">
                  受講する <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* 単元一覧 */}
          <Link
            href="/units"
            className="washi washi-hover group block rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-violet/10 text-neon-violet transition-transform group-hover:scale-105">
                <Layers className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-lg font-bold text-foreground">
                  単元一覧
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  単元から問題を探す。カリキュラム順に体系的に攻略する。
                </div>
                <div className="mt-3 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-violet">
                  探索する <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 特異点 - Singularity - パネル */}
        <div className="mt-5">
          <Link
            href="/abyss"
            className="group relative block overflow-hidden rounded-2xl transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.08) 0%, rgba(0,0,0,0.6) 50%, rgba(234,179,8,0.06) 100%)",
              border: "1px solid rgba(168,85,247,0.25)",
              boxShadow: "0 0 40px rgba(168,85,247,0.06)",
            }}
          >
            {/* Shimmer on hover */}
            <span
              className="pointer-events-none absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.12) 50%, transparent 100%)",
              }}
            />
            <div className="relative flex items-center gap-5 px-6 py-5">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{
                  background: "rgba(168,85,247,0.12)",
                  border: "1px solid rgba(168,85,247,0.3)",
                  color: "#a855f7",
                }}
              >
                <Skull className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="font-display text-lg font-bold bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #a855f7, #eab308)",
                    }}
                  >
                    特異点 — Singularity
                  </span>
                  <span className="rounded-full border border-purple-700/40 bg-purple-900/20 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-purple-500">
                    Phase 4
                  </span>
                </div>
                <div className="mt-0.5 text-sm text-gray-500">
                  深淵の超難問をランダム召喚。解けるなら、挑め。
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-purple-600 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>

        {/* 緊急ミッション — ログイン済みユーザーに未クリアミッションがある場合のみ表示 */}
        <Suspense fallback={null}>
          <EmergencyMissionPanel />
        </Suspense>

        {/* 師範からのメッセージ */}
        <Suspense fallback={null}>
          <div className="mt-5">
            <MessageBar />
          </div>
        </Suspense>
      </section>
    </div>
  );
}
