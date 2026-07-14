"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Target } from "lucide-react";
import type { Problem } from "@/lib/types";
import { DIFFICULTY_META } from "@/lib/types";
import { LogicSteps } from "@/components/scaffolding/LogicSteps";
import { LessonRenderer } from "@/components/lessons/LessonRenderer";

export default function ChallengeProblemsPage() {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectRandomProblem = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/abyss/gacha", { credentials: "include" });
      const payload = await response.json();
      if (!response.ok || !payload.ok || !payload.problem) throw new Error("invalid response");
      setProblem(payload.problem as Problem);
    } catch {
      setError("問題を読み込めませんでした。時間をおいて、もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }, []);

  const difficulty = problem ? DIFFICULTY_META[problem.difficulty] : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <Link href="/math" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          数学トップへ戻る
        </Link>

        <header className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
            <Target className="h-4 w-4" aria-hidden="true" />
            発展・最難関
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">挑戦問題</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            発展・最難関レベルの問題からランダムに1問を選びます。解法をすぐに開かず、まずは着眼点と使えそうな条件を書き出してみてください。
          </p>
          <button
            type="button"
            onClick={selectRandomProblem}
            disabled={loading}
            className="button-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            {loading ? "問題を選んでいます" : problem ? "別の問題を選ぶ" : "ランダムに1問選ぶ"}
          </button>
          {error && <p className="mt-4 text-sm font-semibold text-rose-700" role="alert">{error}</p>}
        </header>

        <div className="mt-8" aria-live="polite">
          {!problem && !loading && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="font-bold text-slate-800">問題を選ぶと、ここに問題文と段階的な解説が表示されます。</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">問題一覧や単元検索には出ない、発展学習用の問題です。</p>
            </div>
          )}

          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-600 shadow-sm">
              問題を読み込んでいます…
            </div>
          )}

          {problem && !loading && (
            <div className="space-y-6">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800">
                    {difficulty?.name ?? problem.difficulty}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600">
                    {problem.unit}
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">{problem.title}</h2>
                {problem.tagline && <p className="mt-2 text-sm leading-6 text-slate-600">{problem.tagline}</p>}
                <div className="mt-6 border-t border-slate-200 pt-6">
                  <LessonRenderer content={problem.statement} />
                </div>
              </article>

              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <LogicSteps slug={problem.slug} steps={problem.steps} />
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
