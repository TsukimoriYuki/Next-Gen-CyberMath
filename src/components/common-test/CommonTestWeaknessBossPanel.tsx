"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  Target,
  Clock,
  BookOpen,
  RotateCcw,
} from "lucide-react";
import {
  buildCommonTestWeaknessReport,
  type CommonTestWeaknessReport,
  type CommonTestWeaknessItem,
  type CommonTestWeaknessSeverity,
  type CommonTestWeaknessStatus,
  type CommonTestWeaknessSource,
} from "@/lib/common-test-weakness";
import { getCommonTestDrillHistory } from "@/lib/common-test-history";
import { getCommonTestExamHistory } from "@/lib/common-test-exam-history";
import { getCommonTestTargetScores } from "@/lib/common-test-targets";

// ── スタイル定数 ──────────────────────────────────────────────────────────

const SEVERITY_CONFIG: Record<
  CommonTestWeaknessSeverity,
  { label: string; color: string; bg: string; border: string; dot: string }
> = {
  critical: {
    label: "重大",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.10)",
    border: "rgba(239,68,68,0.30)",
    dot: "#ef4444",
  },
  high: {
    label: "要注意",
    color: "#f97316",
    bg: "rgba(249,115,22,0.10)",
    border: "rgba(249,115,22,0.28)",
    dot: "#f97316",
  },
  medium: {
    label: "注意",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.10)",
    border: "rgba(251,191,36,0.25)",
    dot: "#fbbf24",
  },
  low: {
    label: "軽微",
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.20)",
    dot: "#22d3ee",
  },
};

const STATUS_CONFIG: Record<
  CommonTestWeaknessStatus,
  { label: string; Icon: React.ElementType; color: string }
> = {
  new:             { label: "新規", Icon: AlertTriangle, color: "#ef4444" },
  training:        { label: "練習中", Icon: Minus, color: "#fbbf24" },
  improving:       { label: "改善中", Icon: TrendingUp, color: "#22c55e" },
  "almost-mastered": { label: "ほぼ克服", Icon: TrendingUp, color: "#22d3ee" },
  mastered:        { label: "克服済み", Icon: TrendingUp, color: "#a78bfa" },
};

const SOURCE_LABELS: Record<CommonTestWeaknessSource, string> = {
  exam: "本番演習",
  drill: "ドリル",
  time: "時間超過",
  tag: "弱点タグ",
  "target-gap": "目標差",
};

const SUBJECT_LABELS: Record<string, string> = {
  "math-1a": "数学IA",
  "math-2bc": "数学II・B・C",
  "english-reading": "英語R",
};

// ── 初回ユーザー向け ──────────────────────────────────────────────────────

function FirstTimeGuide() {
  return (
    <div
      className="rounded-2xl p-6 text-center space-y-5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <ShieldAlert className="mx-auto h-10 w-10 text-white/20" />
      <div>
        <p className="font-mono text-sm font-bold text-white/50">
          演習データが不足しています
        </p>
        <p className="mt-2 font-mono text-[11px] leading-relaxed text-white/30">
          本番演習を1回受けるか、大問別ドリルを3つ解くと弱点を自動判定できます。
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "数学IA 第1問", href: "/common-test/math-1a/section-1", color: "#00d2ff" },
          { label: "数学IA 第2問", href: "/common-test/math-1a/section-2", color: "#00d2ff" },
          { label: "英語R 第5問", href: "/common-test/english-reading/section-5", color: "#10b981" },
        ].map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center justify-center gap-2 rounded-xl py-3 px-4 font-mono text-[10px] font-bold transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: s.color,
            }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            {s.label}
          </Link>
        ))}
      </div>
      <Link
        href="/common-test/simulator"
        className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
        style={{
          background: "rgba(251,191,36,0.10)",
          border: "1px solid rgba(251,191,36,0.28)",
          color: "#fbbf24",
        }}
      >
        本番演習を受ける →
      </Link>
    </div>
  );
}

// ── スケルトン ────────────────────────────────────────────────────────────

function WeaknessSkeleton() {
  return (
    <div
      className="animate-pulse rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(239,68,68,0.12)",
        minHeight: 160,
      }}
    >
      <div className="h-10" style={{ background: "rgba(255,255,255,0.03)" }} />
      <div className="space-y-3 p-5">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-20 rounded-xl"
            style={{ background: "rgba(255,255,255,0.03)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── 弱点カード（フル） ───────────────────────────────────────────────────

function WeaknessCard({ item }: { item: CommonTestWeaknessItem }) {
  const sev = SEVERITY_CONFIG[item.severity];
  const sts = STATUS_CONFIG[item.status];
  const StatusIcon = sts.Icon;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: sev.bg, border: `1px solid ${sev.border}` }}
    >
      {/* カードヘッダー */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          background: "rgba(0,0,0,0.20)",
          borderBottom: `1px solid ${sev.border}`,
        }}
      >
        <div className="flex items-center gap-2">
          {/* severity バッジ */}
          <span
            className="rounded-full px-2 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider"
            style={{
              background: sev.bg,
              border: `1px solid ${sev.border}`,
              color: sev.color,
            }}
          >
            {sev.label}
          </span>
          {/* status */}
          <span className="flex items-center gap-1 font-mono text-[9px]" style={{ color: sts.color }}>
            <StatusIcon className="h-3 w-3" />
            {sts.label}
          </span>
        </div>

        {/* sources */}
        <div className="flex flex-wrap gap-1">
          {item.sources.map((s) => (
            <span
              key={s}
              className="rounded px-1.5 py-0.5 font-mono text-[8px]"
              style={{
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.40)",
              }}
            >
              {SOURCE_LABELS[s]}
            </span>
          ))}
        </div>
      </div>

      {/* カードボディ */}
      <div className="px-4 py-3 space-y-2">
        <h3 className="font-display text-sm font-bold text-white">
          {item.title}
        </h3>

        {/* スコア率と時間超過 */}
        <div className="flex flex-wrap gap-3">
          {item.scoreRate != null && (
            <div className="flex items-center gap-1.5 font-mono text-[10px]" style={{ color: sev.color }}>
              <Target className="h-3 w-3" />
              正答率 {item.scoreRate}%
            </div>
          )}
          {item.timeOverSec != null && item.timeOverSec > 0 && (
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-white/45">
              <Clock className="h-3 w-3" />
              +{Math.round(item.timeOverSec / 60)}分超過
            </div>
          )}
          {item.skillTags.length > 0 && (
            <div className="font-mono text-[10px] text-white/35">
              {item.skillTags.join("・")}
            </div>
          )}
        </div>

        {/* 根拠 */}
        {item.evidence.length > 0 && (
          <ul className="space-y-0.5">
            {item.evidence.map((ev, i) => (
              <li key={i} className="font-mono text-[10px] text-white/45">
                ⓘ {ev}
              </li>
            ))}
          </ul>
        )}

        {/* 克服条件 */}
        <div
          className="mt-1 rounded-lg px-3 py-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-white/30 mb-0.5">
            克服条件
          </div>
          <p className="font-mono text-[10px] text-white/55">
            {item.masteryCondition}
          </p>
        </div>
      </div>

      {/* カードフッター */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderTop: `1px solid ${sev.border}` }}
      >
        <span className="font-mono text-[10px] text-white/30">
          推定 {item.estimatedMinutes}分
        </span>
        <Link
          href={item.nextActionHref}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
          style={{
            background: sev.bg,
            border: `1px solid ${sev.border}`,
            color: sev.color,
          }}
        >
          演習する →
        </Link>
      </div>
    </div>
  );
}

// ── コンパクト弱点行（司令室用） ──────────────────────────────────────────

function CompactWeaknessRow({
  item,
  index,
}: {
  item: CommonTestWeaknessItem;
  index: number;
}) {
  const sev = SEVERITY_CONFIG[item.severity];

  return (
    <Link
      href={item.nextActionHref}
      className="flex items-center gap-3 px-4 py-3 transition-all hover:opacity-80"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* 番号 */}
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
        style={{
          background: sev.bg,
          border: `1px solid ${sev.border}`,
          color: sev.color,
        }}
      >
        {index + 1}
      </div>

      {/* タイトル */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-[11px] font-bold text-white truncate">
            {item.title}
          </span>
          <span
            className="shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[8px] font-bold"
            style={{
              background: sev.bg,
              border: `1px solid ${sev.border}`,
              color: sev.color,
            }}
          >
            {sev.label}
          </span>
        </div>
        {item.scoreRate != null && (
          <span className="font-mono text-[9px] text-white/30">
            正答率 {item.scoreRate}%
          </span>
        )}
      </div>

      {/* 矢印 */}
      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/20" />
    </Link>
  );
}

// ── サマリーヘッダー ──────────────────────────────────────────────────────

function SummaryHeader({
  report,
  compact,
}: {
  report: CommonTestWeaknessReport;
  compact: boolean;
}) {
  const hasCritical = report.totalCritical > 0;
  const hasHigh = report.totalHigh > 0;
  const urgent = hasCritical || hasHigh;

  const headerColor = hasCritical
    ? "#ef4444"
    : hasHigh
    ? "#f97316"
    : "#fbbf24";
  const headerBg = hasCritical
    ? "rgba(239,68,68,0.06)"
    : hasHigh
    ? "rgba(249,115,22,0.06)"
    : "rgba(251,191,36,0.04)";
  const headerBorder = hasCritical
    ? "rgba(239,68,68,0.15)"
    : hasHigh
    ? "rgba(249,115,22,0.15)"
    : "rgba(251,191,36,0.12)";

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5"
      style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4" style={{ color: headerColor }} />
        <span
          className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: headerColor }}
        >
          WEAKNESS BOSS
        </span>
        {urgent && (
          <span
            className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-bold"
            style={{
              background: `${hasCritical ? "rgba(239,68,68,0.20)" : "rgba(249,115,22,0.20)"}`,
              border: `1px solid ${hasCritical ? "rgba(239,68,68,0.40)" : "rgba(249,115,22,0.40)"}`,
              color: headerColor,
            }}
          >
            {report.totalCritical + report.totalHigh}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {report.topSubjectId && (
          <span className="font-mono text-[9px] text-white/35">
            最優先：{SUBJECT_LABELS[report.topSubjectId] ?? report.topSubjectId}
          </span>
        )}
        {compact && (
          <Link
            href="/common-test/weakness"
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.50)",
            }}
          >
            詳細 <ChevronRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  );
}

// ── メインコンポーネント ──────────────────────────────────────────────────

interface Props {
  /** true のとき上位3件のみ表示し /common-test/weakness へのリンクを出す */
  compact?: boolean;
  /** true のとき /common-test/weakness へのリンクをフッターに表示する */
  showFullLink?: boolean;
}

export function CommonTestWeaknessBossPanel({
  compact = false,
  showFullLink = false,
}: Props) {
  const [report, setReport] = useState<CommonTestWeaknessReport | null>(null);

  useEffect(() => {
    try {
      const examHistory = getCommonTestExamHistory();
      const drillHistory = getCommonTestDrillHistory();
      const targetScores = getCommonTestTargetScores();
      const r = buildCommonTestWeaknessReport({
        examHistory,
        drillHistory,
        targetScores,
      });
      setReport(r);
    } catch {
      // 万一の例外もUIを壊さない
      setReport({
        generatedAt: new Date().toISOString(),
        summary: "弱点分析を表示できませんでした。",
        items: [],
        totalCritical: 0,
        totalHigh: 0,
      });
    }
  }, []);

  if (!report) return <WeaknessSkeleton />;

  const hasHistory = report.items.length > 0 || report.summary !== "まだ十分な演習履歴がありません。本番演習を1回受けるか、大問別ドリルを3つ解くと弱点を自動判定できます。";
  const displayItems = compact ? report.items.slice(0, 3) : report.items;

  const outerBorder =
    report.totalCritical > 0
      ? "1px solid rgba(239,68,68,0.20)"
      : report.totalHigh > 0
      ? "1px solid rgba(249,115,22,0.18)"
      : "1px solid rgba(251,191,36,0.14)";

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{ background: "rgba(255,255,255,0.02)", border: outerBorder }}
    >
      <SummaryHeader report={report} compact={compact} />

      {/* サマリー文 */}
      <div
        className="px-4 py-3 sm:px-5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="font-mono text-[11px] leading-relaxed text-white/55">
          {report.summary}
        </p>
      </div>

      {/* コンテンツ */}
      {!hasHistory && report.items.length === 0 ? (
        <div className="p-4 sm:p-5">
          <FirstTimeGuide />
        </div>
      ) : displayItems.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="font-mono text-[10px] text-white/25">
            現時点で検出された弱点はありません。
          </p>
        </div>
      ) : compact ? (
        /* コンパクト：行リスト */
        <div>
          {displayItems.map((item, i) => (
            <CompactWeaknessRow key={item.id} item={item} index={i} />
          ))}
        </div>
      ) : (
        /* フル：カードグリッド */
        <div className="p-4 sm:p-5 space-y-4">
          {displayItems.map((item) => (
            <WeaknessCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* フッター */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-white/25">
            {report.items.length > 0
              ? `弱点 ${report.items.length} 件検出`
              : "弱点なし"}
          </span>
          {compact && report.items.length > 3 && (
            <span className="font-mono text-[9px] text-white/20">
              他 {report.items.length - 3} 件
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* 再計算 */}
          <button
            onClick={() => {
              setReport(null);
              setTimeout(() => {
                try {
                  const r = buildCommonTestWeaknessReport({
                    examHistory: getCommonTestExamHistory(),
                    drillHistory: getCommonTestDrillHistory(),
                    targetScores: getCommonTestTargetScores(),
                  });
                  setReport(r);
                } catch {
                  setReport({
                    generatedAt: new Date().toISOString(),
                    summary: "再計算に失敗しました。",
                    items: [],
                    totalCritical: 0,
                    totalHigh: 0,
                  });
                }
              }, 50);
            }}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.40)",
            }}
          >
            <RotateCcw className="h-3 w-3" />
            再計算
          </button>

          {showFullLink && (
            <Link
              href="/common-test/weakness"
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider transition-all hover:opacity-80"
              style={{
                background: "rgba(239,68,68,0.10)",
                border: "1px solid rgba(239,68,68,0.28)",
                color: "#ef4444",
              }}
            >
              詳細
              <ChevronRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
