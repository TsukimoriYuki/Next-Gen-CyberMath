"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Pencil, X } from "lucide-react";
import { COMMON_TEST_SUBJECTS, type CommonTestSubjectId } from "@/data/common-test";
import {
  getCommonTestTargetScores,
  normalizeTargetScore,
  saveCommonTestTargetScores,
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
    // localStorage is only available after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTargets(getCommonTestTargetScores());
    setLatestScores(getLatestCommonTestExamScores());
  }, []);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 2500);
    return () => clearTimeout(timer);
  }, [feedback]);

  const targetOf = (id: CommonTestSubjectId, fallback: number) => targets[id] ?? fallback;
  const hasLatest = (id: CommonTestSubjectId) => id in latestScores;
  const anyLatest = COMMON_TEST_SUBJECTS.some((subject) => hasLatest(subject.id));

  const totalTarget = COMMON_TEST_SUBJECTS.reduce(
    (sum, subject) => sum + targetOf(subject.id, subject.targetScoreDefault),
    0,
  );
  const totalCurrent = COMMON_TEST_SUBJECTS.reduce(
    (sum, subject) => sum + (latestScores[subject.id] ?? 0),
    0,
  );

  function startEdit() {
    const nextDraft: Record<string, string> = {};
    for (const subject of COMMON_TEST_SUBJECTS) {
      nextDraft[subject.id] = String(targetOf(subject.id, subject.targetScoreDefault));
    }
    setDraft(nextDraft);
    setEditing(true);
  }

  function handleSave() {
    const next: CommonTestTargetScores = { ...targets };
    for (const subject of COMMON_TEST_SUBJECTS) {
      const value = normalizeTargetScore(draft[subject.id]);
      if (value === null) {
        setFeedback("error");
        return;
      }
      next[subject.id] = value;
    }
    if (saveCommonTestTargetScores(next)) {
      setTargets(next);
      setEditing(false);
      setFeedback("saved");
    } else {
      setFeedback("error");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50 px-5 py-3">
        <div className="text-sm font-bold text-slate-900">目標点トラッカー</div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {feedback === "saved" && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <Check className="h-3.5 w-3.5" />
              目標点を保存しました
            </span>
          )}
          {feedback === "error" && (
            <span className="text-xs font-bold text-rose-600">0〜100の数値で入力してください</span>
          )}
          <span className="text-xs font-bold text-slate-600">
            目標 {totalTarget}点 / 現在 {anyLatest ? `${totalCurrent}点` : "未測定"}
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

      <div className="grid grid-cols-1 gap-0 divide-slate-200 sm:grid-cols-3 sm:divide-x">
        {COMMON_TEST_SUBJECTS.map((subject) => {
          const target = targetOf(subject.id, subject.targetScoreDefault);
          const latest = latestScores[subject.id];
          const pct = latest === undefined || target <= 0 ? 0 : Math.min(100, Math.round((latest / target) * 100));
          const gap = latest === undefined ? null : target - latest;

          return (
            <div key={subject.id} className="px-5 py-4">
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="flex items-center gap-1.5 text-sm font-extrabold text-slate-900">
                  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: subject.theme.primary }} />
                  {subject.shortTitle}
                </span>
                <span className="text-[10px] text-slate-400">{subject.title}</span>
              </div>

              <div className="mb-2">
                {latest === undefined ? (
                  <span className="inline-block rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                    診断前
                  </span>
                ) : (
                  <span className="inline-block rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">
                    最新結果を反映済み
                  </span>
                )}
              </div>

              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-mono text-xl font-bold text-slate-900">
                  {latest === undefined ? "未測定" : latest}
                </span>
                <span className="text-xs text-slate-400">/</span>
                {editing ? (
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={draft[subject.id] ?? ""}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, [subject.id]: event.target.value }))
                    }
                    className="w-16 rounded-md border border-blue-300 bg-white px-2 py-0.5 font-mono text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    aria-label={`${subject.title}の目標点`}
                  />
                ) : (
                  <span className="font-mono text-sm font-semibold text-slate-500">{target}</span>
                )}
                <span className="text-[10px] text-slate-400">点</span>
                {gap !== null && (
                  <span className="ml-auto text-[11px] font-bold text-blue-600">
                    {gap <= 0 ? "目標達成" : `あと ${gap}点`}
                  </span>
                )}
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, background: subject.theme.primary }}
                />
              </div>
              <div className="mt-1 text-right font-mono text-[9px] text-slate-300">
                {latest === undefined ? "診断前" : `目標到達率 ${pct}%`}
              </div>
            </div>
          );
        })}
      </div>

      {!anyLatest && (
        <div className="border-t border-amber-100 bg-amber-50/70 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-extrabold text-amber-800">診断前です</div>
              <p className="mt-1 text-xs leading-5 text-amber-800/80">
                ミニ診断、大問別ドリル、冊子型模試を解くと、最新スコアと復習キューがここに反映されます。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/common-test/math-1a"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-100"
              >
                共通テスト対策を始める
              </Link>
              <Link
                href="/common-test/math-1a/section-1"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-xs font-bold text-amber-700 transition-colors hover:bg-amber-100"
              >
                大問別ドリルを解く
              </Link>
              <Link
                href="/common-test/simulator/common-test-math-1a-manual-001"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-amber-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-amber-700"
              >
                冊子型模試を受ける
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
