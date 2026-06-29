"use client";

// 目標点の設定・保存つきスコアトラッカー（司令室用）
import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Check, X } from "lucide-react";
import {
  COMMON_TEST_SUBJECTS,
  type CommonTestSubjectId,
} from "@/data/common-test";
import {
  getCommonTestTargetScores,
  saveCommonTestTargetScores,
  normalizeTargetScore,
  type CommonTestTargetScores,
} from "@/lib/common-test-targets";
import { getLatestCommonTestExamScores } from "@/lib/common-test-exam-history";

export function CommonTestTargetScorePanel() {
  const [targets, setTargets] = useState<CommonTestTargetScores>({});
  const [latestScores, setLatestScores] = useState<Record<string, number>>({});
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<"saved" | "error" | null>(null);

  useEffect(() => {
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTargets(getCommonTestTargetScores());
    setLatestScores(getLatestCommonTestExamScores());
  }, []);

  // 推定スコア: 本番演習履歴があればその最新スコア、無ければ初期推定値(mock)
  const estimateOf = (id: CommonTestSubjectId, mock: number) =>
    latestScores[id] ?? mock;
  const hasLatest = (id: CommonTestSubjectId) => id in latestScores;

  useEffect(() => {
    if (!feedback) return;
    const t = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(t);
  }, [feedback]);

  const targetOf = (id: CommonTestSubjectId, fallback: number) =>
    targets[id] ?? fallback;

  function startEdit() {
    const d: Record<string, string> = {};
    for (const s of COMMON_TEST_SUBJECTS) {
      d[s.id] = String(targetOf(s.id, s.targetScoreDefault));
    }
    setDraft(d);
    setEditing(true);
  }

  function handleSave() {
    const next: CommonTestTargetScores = { ...targets };
    for (const s of COMMON_TEST_SUBJECTS) {
      const v = normalizeTargetScore(draft[s.id]);
      if (v === null) {
        setFeedback("error");
        return;
      }
      next[s.id] = v;
    }
    if (saveCommonTestTargetScores(next)) {
      setTargets(next);
      setEditing(false);
      setFeedback("saved");
    } else {
      setFeedback("error");
    }
  }

  const totalTarget = COMMON_TEST_SUBJECTS.reduce(
    (sum, s) => sum + targetOf(s.id, s.targetScoreDefault),
    0
  );
  const totalEstimate = COMMON_TEST_SUBJECTS.reduce(
    (sum, s) => sum + estimateOf(s.id, s.estimatedScoreMock),
    0
  );
  const totalGap = totalTarget - totalEstimate;
  const anyLatest = COMMON_TEST_SUBJECTS.some((s) => hasLatest(s.id));

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Panel header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">目標点トラッカー</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {feedback === "saved" && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <Check className="h-3.5 w-3.5" />
              目標点を保存しました
            </span>
          )}
          {feedback === "error" && (
            <span className="text-xs font-bold text-rose-600">
              0〜100の数値を入力してください
            </span>
          )}
          <span
            className="text-xs font-bold"
            style={{ color: totalGap <= 30 ? "#059669" : "#d97706" }}
          >
            目標 {totalTarget}点 ／ {anyLatest ? "最新" : "推定"} {totalEstimate}点
          </span>
          {editing ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-700"
              >
                <Check className="h-3.5 w-3.5" />
                保存
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
              >
                <X className="h-3.5 w-3.5" />
                取消
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={startEdit}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600"
            >
              <Pencil className="h-3.5 w-3.5" />
              目標点を設定
            </button>
          )}
        </div>
      </div>

      {/* Subject status grid */}
      <div className="grid grid-cols-1 gap-0 divide-slate-200 sm:grid-cols-3 sm:divide-x">
        {COMMON_TEST_SUBJECTS.map((subject) => {
          const { theme, shortTitle, title, estimatedScoreMock } = subject;
          const estimate = estimateOf(subject.id, estimatedScoreMock);
          const isLatest = hasLatest(subject.id);
          const target = targetOf(subject.id, subject.targetScoreDefault);
          const pct =
            target > 0
              ? Math.min(100, Math.round((estimate / target) * 100))
              : 100;
          const gap = target - estimate;

          return (
            <div key={subject.id} className="px-5 py-4">
              {/* Subject label */}
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: theme.primary }} />
                  {shortTitle}
                </span>
                <span className="text-[10px] text-slate-400">{title}</span>
              </div>

              {/* 推定スコアの出所バッジ */}
              <div className="mb-2">
                {isLatest ? (
                  <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                    最新演習スコア反映済み
                  </span>
                ) : (
                  <span className="inline-block rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                    未診断のため仮スコアを表示中
                  </span>
                )}
              </div>

              {/* Score row */}
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-slate-900">{estimate}</span>
                <span className="text-xs text-slate-400">／</span>
                {editing ? (
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft[subject.id] ?? ""}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, [subject.id]: e.target.value }))
                    }
                    className="w-16 rounded-md border border-blue-300 bg-white px-2 py-0.5 font-mono text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    aria-label={`${title}の目標点`}
                  />
                ) : (
                  <span className="font-mono text-sm font-semibold text-slate-500">{target}</span>
                )}
                <span className="text-[10px] text-slate-400">点</span>
                <span
                  className="ml-auto text-[11px] font-bold"
                  style={{
                    color: gap <= 0 ? "#059669" : gap <= 10 ? "#059669" : gap <= 20 ? "#2563eb" : "#d97706",
                  }}
                >
                  {gap <= 0 ? "目標達成圏" : `あと ${gap}点`}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: theme.primary }}
                />
              </div>

              <div className="mt-1 text-right font-mono text-[9px] text-slate-300">
                目標到達率 {pct}%
              </div>
              {!isLatest && (
                <div className="mt-2 text-[11px] font-medium text-slate-500">
                  まずは10分診断で現在地を測定
                </div>
              )}
            </div>
          );
        })}
      </div>
      {!anyLatest && (
        <div className="border-t border-amber-100 bg-amber-50/70 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-extrabold text-amber-800">
                未診断のため仮スコアを表示中
              </div>
              <p className="mt-1 text-xs leading-5 text-amber-800/80">
                診断を受けると、目標点との差、優先単元、今日の演習があなたの履歴に合わせて更新されます。
              </p>
            </div>
            <Link
              href="/common-test/math-1a"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-amber-700"
            >
              共通テスト診断を受ける
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
