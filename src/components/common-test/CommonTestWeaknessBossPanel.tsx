"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  TrendingUp,
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
    label: "重点",
    color: "#e11d48",
    bg: "#fff1f2",
    border: "#fecdd3",
    dot: "#e11d48",
  },
  high: {
    label: "要注意",
    color: "#ea580c",
    bg: "#fff7ed",
    border: "#fed7aa",
    dot: "#ea580c",
  },
  medium: {
    label: "注意",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
    dot: "#d97706",
  },
  low: {
    label: "軽微",
    color: "#0891b2",
    bg: "#ecfeff",
    border: "#a5f3fc",
    dot: "#0891b2",
  },
};

const STATUS_CONFIG: Record<
  CommonTestWeaknessStatus,
  { label: string; Icon: React.ElementType; color: string }
> = {
  new:             { label: "新規", Icon: AlertTriangle, color: "#e11d48" },
  training:        { label: "練習中", Icon: Minus, color: "#d97706" },
  improving:       { label: "改善中", Icon: TrendingUp, color: "#059669" },
  "almost-mastered": { label: "ほぼ克服", Icon: TrendingUp, color: "#0891b2" },
  mastered:        { label: "克服済み", Icon: TrendingUp, color: "#7c3aed" },
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
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
      <ShieldAlert className="mx-auto h-10 w-10 text-slate-300" />
      <div>
        <p className="text-sm font-bold text-slate-700">
          演習データが不足しています
        </p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          本番演習を1回受けるか、大問別ドリルを3つ解くと弱点を自動判定できます。
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "数学IA 第1問", href: "/common-test/math-1a/section-1" },
          { label: "数学IIBC 第2問", href: "/common-test/math-2bc/section-2" },
          { label: "数学IA 第4問", href: "/common-test/math-1a/section-4" },
        ].map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            <BookOpen className="h-3.5 w-3.5" />
            {s.label}
          </Link>
        ))}
      </div>
      <Link
        href="/common-test/simulator"
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
      >
        本番演習を受ける →
      </Link>
    </div>
  );
}

// ── スケルトン ────────────────────────────────────────────────────────────

function WeaknessSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white" style={{ minHeight: 160 }}>
      <div className="h-10 bg-slate-100" />
      <div className="space-y-3 p-5">
        {[1, 2].map((i) => (
          <div key={i} className="h-20 rounded-xl bg-slate-100" />
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
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* カードヘッダー */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: sev.bg, borderBottom: `1px solid ${sev.border}` }}
      >
        <div className="flex items-center gap-2">
          {/* severity バッジ */}
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
            style={{ background: "#ffffff", border: `1px solid ${sev.border}`, color: sev.color }}
          >
            {sev.label}
          </span>
          {/* status */}
          <span className="flex items-center gap-1 text-[11px] font-medium" style={{ color: sts.color }}>
            <StatusIcon className="h-3 w-3" />
            {sts.label}
          </span>
        </div>

        {/* sources */}
        <div className="flex flex-wrap gap-1">
          {item.sources.map((s) => (
            <span key={s} className="rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-500 ring-1 ring-slate-200">
              {SOURCE_LABELS[s]}
            </span>
          ))}
        </div>
      </div>

      {/* カードボディ */}
      <div className="space-y-2 px-4 py-3">
        <h3 className="text-sm font-bold text-slate-900">
          {item.title}
        </h3>

        {/* スコア率と時間超過 */}
        <div className="flex flex-wrap gap-3">
          {item.scoreRate != null && (
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: sev.color }}>
              <Target className="h-3 w-3" />
              正答率 {item.scoreRate}%
            </div>
          )}
          {item.timeOverSec != null && item.timeOverSec > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              +{Math.round(item.timeOverSec / 60)}分超過
            </div>
          )}
          {item.skillTags.length > 0 && (
            <div className="text-xs text-slate-400">
              {item.skillTags.join("・")}
            </div>
          )}
        </div>

        {/* 根拠 */}
        {item.evidence.length > 0 && (
          <ul className="space-y-0.5">
            {item.evidence.map((ev, i) => (
              <li key={i} className="text-xs text-slate-500">
                ⓘ {ev}
              </li>
            ))}
          </ul>
        )}

        {/* 克服条件 */}
        <div className="mt-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="mb-0.5 text-[10px] font-bold text-slate-400">
            克服条件
          </div>
          <p className="text-xs text-slate-600">
            {item.masteryCondition}
          </p>
        </div>
      </div>

      {/* カードフッター */}
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5">
        <span className="text-xs text-slate-400">
          推定 {item.estimatedMinutes}分
        </span>
        <Link
          href={item.nextActionHref}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white transition-opacity hover:opacity-90"
          style={{ background: sev.color }}
        >
          次の演習へ →
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
      className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-slate-50"
    >
      {/* 番号 */}
      <div
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold"
        style={{ background: sev.bg, border: `1px solid ${sev.border}`, color: sev.color }}
      >
        {index + 1}
      </div>

      {/* タイトル */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[13px] font-bold text-slate-900">
            {item.title}
          </span>
          <span
            className="shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-bold"
            style={{ background: sev.bg, border: `1px solid ${sev.border}`, color: sev.color }}
          >
            {sev.label}
          </span>
        </div>
        {item.scoreRate != null && (
          <span className="text-[11px] text-slate-400">
            正答率 {item.scoreRate}%
          </span>
        )}
      </div>

      {/* 矢印 */}
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
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
    ? "#e11d48"
    : hasHigh
    ? "#ea580c"
    : "#d97706";
  const headerBg = hasCritical
    ? "#fff1f2"
    : hasHigh
    ? "#fff7ed"
    : "#fffbeb";
  const headerBorder = hasCritical
    ? "#fecdd3"
    : hasHigh
    ? "#fed7aa"
    : "#fde68a";

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5"
      style={{ background: headerBg, borderBottom: `1px solid ${headerBorder}` }}
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4" style={{ color: headerColor }} />
        <span className="text-sm font-bold" style={{ color: headerColor }}>
          弱点分析
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: headerColor, opacity: 0.5 }}>
          Weakness
        </span>
        {urgent && (
          <span
            className="flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-bold text-white"
            style={{ background: headerColor }}
          >
            {report.totalCritical + report.totalHigh}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {report.topSubjectId && (
          <span className="text-[11px] text-slate-500">
            最優先：{SUBJECT_LABELS[report.topSubjectId] ?? report.topSubjectId}
          </span>
        )}
        {compact && (
          <Link
            href="/common-test/weakness"
            className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:border-slate-300"
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
    // localStorage はサーバーに存在しないため、hydration mismatch を避けてマウント後に読む
    try {
      const examHistory = getCommonTestExamHistory();
      const drillHistory = getCommonTestDrillHistory();
      const targetScores = getCommonTestTargetScores();
      const r = buildCommonTestWeaknessReport({
        examHistory,
        drillHistory,
        targetScores,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <SummaryHeader report={report} compact={compact} />

      {/* サマリー文 */}
      <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
        <p className="text-xs leading-relaxed text-slate-600">
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
          <p className="text-xs text-slate-400">
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
        <div className="space-y-4 p-4 sm:p-5">
          {displayItems.map((item) => (
            <WeaknessCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* フッター */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            {report.items.length > 0
              ? `弱点 ${report.items.length} 件検出`
              : "弱点なし"}
          </span>
          {compact && report.items.length > 3 && (
            <span className="text-[11px] text-slate-300">
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
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
          >
            <RotateCcw className="h-3 w-3" />
            再計算
          </button>

          {showFullLink && (
            <Link
              href="/common-test/weakness"
              className="flex items-center gap-1 rounded-lg bg-rose-600 px-3 py-1.5 text-[11px] font-bold text-white transition-colors hover:bg-rose-700"
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
