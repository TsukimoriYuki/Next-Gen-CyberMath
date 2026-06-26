"use client";

// ── 共通テスト 本番分析パネル ───────────────────────────────────────────
// 外枠はCYBER OS風、講評本文は自然な受験指導の日本語カードで表示する。
// ログイン不要。/api/common-test/oracle を叩き、結果を localStorage にキャッシュする。

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Loader2,
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  Clock,
  Target,
  ListChecks,
  RefreshCcwDot,
  Flag,
} from "lucide-react";
import type { CommonTestExamHistoryItem } from "@/lib/common-test-exam-history";
import type {
  CommonTestSubjectId,
} from "@/data/common-test";
import { COMMON_TEST_SUBJECTS_MAP } from "@/data/common-test";
import type { CommonTestTheme } from "@/data/common-test";
import type { CommonTestAiAnalysisResult } from "@/lib/common-test-ai-analysis";
import { buildCommonTestAiAnalysisInput } from "@/lib/common-test-ai-analysis";
import {
  getCommonTestAiAnalysisEntry,
  saveCommonTestAiAnalysis,
} from "@/lib/common-test-ai-cache";
import { getCommonTestTargetScore } from "@/lib/common-test-targets";

interface Props {
  examHistoryItem: CommonTestExamHistoryItem;
  targetScore?: number;
  theme?: CommonTestTheme;
}

const DEFAULT_THEME: CommonTestTheme = {
  primary: "#a855f7",
  secondary: "#06b6d4",
  glowRgb: "168,85,247",
};

export function CommonTestAiStrategyPanel({
  examHistoryItem,
  targetScore,
  theme = DEFAULT_THEME,
}: Props) {
  const [analysis, setAnalysis] = useState<CommonTestAiAnalysisResult | null>(null);
  const [fromCache, setFromCache] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"gemini" | "rule" | null>(null);
  const [cachedAt, setCachedAt] = useState<string | null>(null);

  // 既存のキャッシュがあれば初期表示に使う。localStorage はサーバーに存在しないため、
  // hydration mismatch を避けてマウント後（および対象が変わった後）に読む。
  useEffect(() => {
    const cached = getCommonTestAiAnalysisEntry(examHistoryItem.id);
    if (cached) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnalysis(cached.analysis);
      setFromCache(true);
      setSource(cached.source ?? null);
      setCachedAt(cached.savedAt ?? null);
    }
  }, [examHistoryItem.id]);

  // 目標点が未指定なら司令室の設定値から安全に解決する
  const resolvedTarget = useCallback((): number | undefined => {
    if (typeof targetScore === "number") return targetScore;
    const sid = examHistoryItem.subjectId;
    if (sid in COMMON_TEST_SUBJECTS_MAP) {
      return getCommonTestTargetScore(sid as CommonTestSubjectId);
    }
    return undefined;
  }, [targetScore, examHistoryItem.subjectId]);

  const runAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const input = buildCommonTestAiAnalysisInput({
        examHistoryItem,
        targetScore: resolvedTarget(),
      });
      const res = await fetch("/api/common-test/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (!data?.ok || !data.analysis) {
        setError(
          typeof data?.error === "string"
            ? data.error
            : "作戦会議の生成に失敗しました。時間をおいて再度お試しください。"
        );
        return;
      }
      const nextSource = data.source === "gemini" ? "gemini" : "rule";
      setAnalysis(data.analysis as CommonTestAiAnalysisResult);
      setSource(nextSource);
      setFromCache(false);
      setCachedAt(new Date().toISOString());
      saveCommonTestAiAnalysis(examHistoryItem.id, data.analysis, nextSource);
    } catch {
      setError("通信がうまくいきませんでした。少し時間をおいてから、もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }, [examHistoryItem, resolvedTarget]);

  const sourceLabel =
    source === "gemini" ? "Gemini分析" : source === "rule" ? "簡易分析" : null;
  const cachedLabel = cachedAt
    ? `${new Date(cachedAt).toLocaleString("ja-JP", {
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}保存`
    : "保存済み";

  // ── 未生成・未キャッシュ：起動ボタン ─────────────────────────────────
  if (!analysis) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `${theme.primary}14`, border: `1px solid ${theme.primary}33` }}
          >
            <Sparkles className="h-5 w-5" style={{ color: theme.primary }} />
          </div>
          <div className="min-w-0">
            <div className="text-base font-extrabold text-slate-900">
              本番分析・次の一手
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
              今回の結果から、得点分析・時間配分・次にやるべき3つの行動を整理します。
            </p>
          </div>
        </div>

        {error && <ErrorNote message={error} />}

        <button
          type="button"
          onClick={runAnalysis}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          style={{ background: theme.primary }}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              分析しています…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              弱点レポートを作る
            </>
          )}
        </button>
      </div>
    );
  }

  // ── 生成済み：分析結果の表示 ─────────────────────────────────────────
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
          <Sparkles className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
          <span className="text-base font-extrabold text-slate-900">
            本番分析・次の一手
          </span>
          {fromCache && (
            <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
              {cachedLabel}
            </span>
          )}
          {sourceLabel && (
            <span
              className="rounded px-1.5 py-0.5 font-mono text-[9px]"
              style={{
                background: source === "gemini" ? "#ecfeff" : "#fffbeb",
                color: source === "gemini" ? "#0891b2" : "#d97706",
              }}
            >
              {sourceLabel}
            </span>
          )}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            今回の結果に合わせて、次に伸ばす場所を3つに絞ります。
          </p>
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={loading}
          className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 transition-colors hover:border-slate-300 disabled:opacity-50 sm:w-auto"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          もう一度分析
        </button>
      </div>

      {error && <ErrorNote message={error} />}

      {/* 総合講評 */}
      <div
        className="rounded-xl border p-4"
        style={{ background: `${theme.primary}0a`, borderColor: `${theme.primary}33` }}
      >
        <p className="text-sm leading-7 text-slate-800">{analysis.summary}</p>
      </div>

      {/* スコア診断・時間診断 */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AdviceCard icon={<Target className="h-3.5 w-3.5" />} label="今回の得点分析" color="#d97706">
          {analysis.scoreDiagnosis}
        </AdviceCard>
        <AdviceCard icon={<Clock className="h-3.5 w-3.5" />} label="時間配分の診断" color="#0891b2">
          {analysis.timeDiagnosis}
        </AdviceCard>
      </div>

      {/* 大問別アドバイス */}
      {analysis.sectionAdvice.length > 0 && (
        <div>
          <PanelLabel color={theme.primary}>大問別アドバイス</PanelLabel>
          <div className="space-y-2">
            {analysis.sectionAdvice.map((s) => (
              <div
                key={s.sectionId || s.title}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3.5"
              >
                <div className="mb-1.5 text-xs font-bold" style={{ color: theme.primary }}>
                  {s.title}
                </div>
                <p className="text-[13px] leading-relaxed text-slate-600">{s.diagnosis}</p>
                {s.nextAction && (
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate-800">
                    <span className="text-slate-400">→ </span>
                    {s.nextAction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 弱点まとめ */}
      {analysis.weakPointSummary && (
        <AdviceCard icon={<Flag className="h-3.5 w-3.5" />} label="弱点まとめ" color="#ea580c">
          {analysis.weakPointSummary}
        </AdviceCard>
      )}

      {/* 次にやるべき3つ */}
      {analysis.nextThreeActions.length > 0 && (
        <div>
          <PanelLabel color={theme.primary}>
            <ListChecks className="mr-1 inline h-3 w-3" />
            次にやるべき3つ
          </PanelLabel>
          <div
            className="space-y-2 rounded-xl border p-2"
            style={{ background: `${theme.primary}0a`, borderColor: `${theme.primary}26` }}
          >
            {analysis.nextThreeActions.map((a, i) => {
              const inner = (
                <>
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-extrabold text-white"
                    style={{ background: theme.primary }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold leading-relaxed text-slate-900">{a.title}</div>
                    <p className="mt-0.5 text-xs leading-6 text-slate-500">{a.reason}</p>
                  </div>
                  {a.href && (
                    <div className="flex shrink-0 items-center gap-1 self-center font-mono text-[10px] text-slate-400">
                      次へ
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </>
              );
              return a.href ? (
                <Link
                  key={i}
                  href={a.href}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition-colors hover:border-slate-300"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 復習キュー・目標点 */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AdviceCard icon={<RefreshCcwDot className="h-3.5 w-3.5" />} label="復習キュー" color="#059669">
          {analysis.reviewQueueAdvice}
        </AdviceCard>
        <AdviceCard icon={<Target className="h-3.5 w-3.5" />} label="目標点までの道筋" color="#2563eb">
          {analysis.targetScoreAdvice}
        </AdviceCard>
      </div>

      {/* 励まし */}
      {analysis.encouragement && (
        <div
          className="rounded-xl border p-4 text-center"
          style={{ background: `${theme.primary}0a`, borderColor: `${theme.primary}26` }}
        >
          <p className="text-[13px] leading-relaxed text-slate-700">{analysis.encouragement}</p>
        </div>
      )}
    </div>
  );
}

// ── サブコンポーネント ────────────────────────────────────────────────────
function PanelLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-2 text-xs font-bold" style={{ color }}>
      {children}
    </div>
  );
}

function AdviceCard({
  icon,
  label,
  color,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold" style={{ color }}>
        {icon}
        {label}
      </div>
      <p className="text-[13px] leading-relaxed text-slate-600">{children}</p>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <div className="mb-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
      <p className="text-xs leading-relaxed text-amber-800">{message}</p>
    </div>
  );
}
