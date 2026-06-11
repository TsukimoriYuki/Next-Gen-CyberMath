"use client";

// ── 共通テスト AI作戦会議パネル ───────────────────────────────────────────
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
  getCommonTestAiAnalysis,
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

  // 既存のキャッシュがあれば初期表示に使う
  useEffect(() => {
    const cached = getCommonTestAiAnalysis(examHistoryItem.id);
    if (cached) {
      setAnalysis(cached);
      setFromCache(true);
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
      setAnalysis(data.analysis as CommonTestAiAnalysisResult);
      setSource(data.source === "gemini" ? "gemini" : "rule");
      setFromCache(false);
      saveCommonTestAiAnalysis(examHistoryItem.id, data.analysis);
    } catch {
      setError("通信に失敗しました。ネットワークを確認して再度お試しください。");
    } finally {
      setLoading(false);
    }
  }, [examHistoryItem, resolvedTarget]);

  const glow = theme.glowRgb;

  // ── 未生成・未キャッシュ：起動ボタン ─────────────────────────────────
  if (!analysis) {
    return (
      <div
        className="rounded-2xl p-5 sm:p-6"
        style={{
          background: `linear-gradient(145deg, rgba(${glow},0.08) 0%, rgba(0,0,0,0.4) 100%)`,
          border: `1px solid rgba(${glow},0.25)`,
        }}
      >
        <div className="flex items-start gap-3 mb-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `rgba(${glow},0.14)`, border: `1px solid rgba(${glow},0.30)` }}
          >
            <Sparkles className="h-5 w-5" style={{ color: theme.primary }} />
          </div>
          <div className="min-w-0">
            <div className="font-display text-base font-extrabold text-white">
              AI作戦会議
            </div>
            <p className="font-mono text-[10px] text-white/45 leading-relaxed mt-0.5">
              今回の結果をもとに、得点分析・時間配分・次にやるべき3つの行動を提案します。
            </p>
          </div>
        </div>

        {error && <ErrorNote message={error} />}

        <button
          type="button"
          onClick={runAnalysis}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          style={{
            background: `linear-gradient(135deg, rgba(${glow},0.30), rgba(${glow},0.15))`,
            border: `1px solid rgba(${glow},0.50)`,
            color: theme.primary,
          }}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              分析中…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              AI作戦会議を開く
            </>
          )}
        </button>
      </div>
    );
  }

  // ── 生成済み：分析結果の表示 ─────────────────────────────────────────
  return (
    <div
      className="rounded-2xl p-5 sm:p-6 space-y-5"
      style={{
        background: `linear-gradient(145deg, rgba(${glow},0.07) 0%, rgba(0,0,0,0.4) 100%)`,
        border: `1px solid rgba(${glow},0.25)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <Sparkles className="h-4 w-4 shrink-0" style={{ color: theme.primary }} />
          <span className="font-display text-base font-extrabold text-white">
            AI作戦会議
          </span>
          {fromCache && (
            <span className="rounded px-1.5 py-0.5 font-mono text-[8px] text-white/40" style={{ background: "rgba(255,255,255,0.06)" }}>
              保存済み
            </span>
          )}
          {source === "rule" && (
            <span className="rounded px-1.5 py-0.5 font-mono text-[8px] text-amber-400/70" style={{ background: "rgba(251,191,36,0.10)" }}>
              簡易分析
            </span>
          )}
          {source === "gemini" && (
            <span className="rounded px-1.5 py-0.5 font-mono text-[8px] text-cyan-300/70" style={{ background: "rgba(34,211,238,0.10)" }}>
              Gemini分析
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={loading}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[9px] transition-all hover:opacity-80 disabled:opacity-50"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)" }}
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
          再生成
        </button>
      </div>

      {error && <ErrorNote message={error} />}

      {/* 総合講評 */}
      <div
        className="rounded-xl p-4"
        style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${glow},0.18)` }}
      >
        <p className="text-sm leading-relaxed text-white/85">{analysis.summary}</p>
      </div>

      {/* スコア診断・時間診断 */}
      <div className="grid gap-3 sm:grid-cols-2">
        <AdviceCard icon={<Target className="h-3.5 w-3.5" />} label="今回の得点分析" color="#fbbf24">
          {analysis.scoreDiagnosis}
        </AdviceCard>
        <AdviceCard icon={<Clock className="h-3.5 w-3.5" />} label="時間配分の診断" color="#22d3ee">
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
                className="rounded-xl p-3.5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="font-mono text-[10px] font-bold mb-1.5" style={{ color: theme.primary }}>
                  {s.title}
                </div>
                <p className="text-[13px] leading-relaxed text-white/70">{s.diagnosis}</p>
                {s.nextAction && (
                  <p className="text-[13px] leading-relaxed text-white/85 mt-1.5">
                    <span className="text-white/40">→ </span>
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
        <AdviceCard icon={<Flag className="h-3.5 w-3.5" />} label="弱点まとめ" color="#f97316">
          {analysis.weakPointSummary}
        </AdviceCard>
      )}

      {/* 次にやるべき3つ */}
      {analysis.nextThreeActions.length > 0 && (
        <div>
          <PanelLabel color={theme.primary}>
            <ListChecks className="inline h-3 w-3 mr-1" />
            次にやるべき3つ
          </PanelLabel>
          <div className="space-y-2">
            {analysis.nextThreeActions.map((a, i) => {
              const inner = (
                <>
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-[11px] font-extrabold"
                    style={{ background: `rgba(${glow},0.16)`, color: theme.primary }}
                  >
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold text-white/90">{a.title}</div>
                    <p className="text-[12px] leading-relaxed text-white/55 mt-0.5">{a.reason}</p>
                  </div>
                  {a.href && <ChevronRight className="h-4 w-4 shrink-0 text-white/30 self-center" />}
                </>
              );
              return a.href ? (
                <Link
                  key={i}
                  href={a.href}
                  className="flex items-start gap-3 rounded-xl p-3 transition-all hover:opacity-85"
                  style={{ background: `rgba(${glow},0.08)`, border: `1px solid rgba(${glow},0.22)` }}
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
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
        <AdviceCard icon={<RefreshCcwDot className="h-3.5 w-3.5" />} label="復習キューの使い方" color="#34d399">
          {analysis.reviewQueueAdvice}
        </AdviceCard>
        <AdviceCard icon={<Target className="h-3.5 w-3.5" />} label="目標点までの道筋" color="#60a5fa">
          {analysis.targetScoreAdvice}
        </AdviceCard>
      </div>

      {/* 励まし */}
      {analysis.encouragement && (
        <div
          className="rounded-xl p-4 text-center"
          style={{ background: `rgba(${glow},0.06)`, border: `1px solid rgba(${glow},0.18)` }}
        >
          <p className="text-[13px] leading-relaxed text-white/80">{analysis.encouragement}</p>
        </div>
      )}
    </div>
  );
}

// ── サブコンポーネント ────────────────────────────────────────────────────
function PanelLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color }}>
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
    <div
      className="rounded-xl p-3.5"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.15em] mb-1.5" style={{ color }}>
        {icon}
        {label}
      </div>
      <p className="text-[13px] leading-relaxed text-white/75">{children}</p>
    </div>
  );
}

function ErrorNote({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2 rounded-xl p-3 mb-3"
      style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.22)" }}
    >
      <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-red-400 mt-0.5" />
      <p className="font-mono text-[10px] text-red-400/80 leading-relaxed">{message}</p>
    </div>
  );
}
