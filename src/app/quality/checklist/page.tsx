import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { getAllProblems, getProblemsByDifficulty, getUnitSummaries } from "@/lib/content";
import { DIFFICULTY_META } from "@/lib/types";
import { LAST_FULL_QA_RUN, QA_CHECK_DESCRIPTIONS } from "@/data/quality-status";

export const metadata: Metadata = {
  title: "公開QAチェックリスト",
  description:
    "Cyber Mathが公開前・公開後に実行しているQAスクリプトの一覧と、現在の公開問題数を示すページです。",
  alternates: { canonical: "/quality/checklist" },
  openGraph: {
    title: "公開QAチェックリスト | Cyber Math Next-Gen",
    description: "実行しているQAスクリプトの一覧と、現在の公開問題数。",
    url: "/quality/checklist",
  },
};

export default function QualityChecklistPage() {
  const allProblems = getAllProblems();
  const byDifficulty = getProblemsByDifficulty();
  const units = getUnitSummaries();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/quality"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        教材・品質方針へ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          Quality Checklist
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          公開QAチェックリスト
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Cyber Mathは、教材の全件を毎回人手でレビューしているわけではありません。自動QAスクリプトで機械的に検査できる項目（数の整合、リンク切れ、テンプレートの誤爆など）は自動化し、数学的な正確性や説明の分かりやすさなど機械では判断しづらい部分を重点的に手動確認する、という現実的な体制で運用しています。
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          最終フルQA実行日：<span className="font-mono text-foreground">{LAST_FULL_QA_RUN}</span>
          （リリースのたびに実行し、この日付を更新しています）
        </p>
      </header>

      {/* Live stats */}
      <section className="mt-8 rounded-2xl border border-border/70 bg-card/70 p-5">
        <h2 className="font-display text-lg font-bold text-foreground">現在の公開問題数</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          このページの数値は、静的なテキストではなく <code className="rounded bg-background/60 px-1 py-0.5 font-mono text-xs">getAllProblems()</code> /{" "}
          <code className="rounded bg-background/60 px-1 py-0.5 font-mono text-xs">getUnitSummaries()</code> から算出しています。数学トップ・単元一覧の表示と同じ関数を使うため、この数字とサイト上の表示がズレることはありません。
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-background/40 p-4">
            <div className="text-xs font-bold text-muted-foreground">公開問題総数</div>
            <div className="mt-1 font-mono text-2xl font-extrabold text-foreground">
              {allProblems.length}
              <span className="ml-1 text-sm font-normal text-muted-foreground">問</span>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-background/40 p-4">
            <div className="text-xs font-bold text-muted-foreground">公開単元数</div>
            <div className="mt-1 font-mono text-2xl font-extrabold text-foreground">
              {units.length}
              <span className="ml-1 text-sm font-normal text-muted-foreground">単元</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-muted-foreground">難度別内訳</div>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {byDifficulty.map((g) => (
              <div
                key={g.difficulty}
                className="rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-center"
              >
                <div className="font-mono text-sm font-bold" style={{ color: DIFFICULTY_META[g.difficulty].accent }}>
                  {DIFFICULTY_META[g.difficulty].label}
                </div>
                <div className="font-mono text-xs text-muted-foreground">{g.problems.length}問</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="text-xs font-bold text-muted-foreground">単元別内訳</div>
          <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3">
            {units.map((u) => (
              <div key={u.slug} className="flex justify-between gap-2">
                <span className="truncate">{u.name}</span>
                <span className="font-mono text-foreground/80">{u.problemCount}問</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QA checks */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-bold text-foreground">実行しているQA項目</h2>
        <div className="mt-4 space-y-3">
          {QA_CHECK_DESCRIPTIONS.map((check) => (
            <div key={check.command} className="rounded-2xl border border-border/70 bg-card/70 p-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-lime" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-foreground">{check.title}</h3>
                    <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {check.command}
                    </code>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{check.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-border/70 bg-card/70 p-5">
        <h2 className="font-display text-lg font-bold text-foreground">更新履歴・誤り報告</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          直近の修正内容は
          <Link href="/quality/changelog" className="mx-1 text-neon-cyan hover:underline">
            更新履歴
          </Link>
          にまとめています。教材や表示の誤りに気づいた場合は
          <Link href="/contact" className="mx-1 text-neon-cyan hover:underline">
            お問い合わせ
          </Link>
          から報告してください。
        </p>
      </section>
    </div>
  );
}
