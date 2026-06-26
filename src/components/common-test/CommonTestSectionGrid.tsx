// Server Component - 大問別ドリルカード一覧
import Link from "next/link";
import { ChevronRight, Timer, TrendingUp } from "lucide-react";
import type {
  CommonTestSection,
  CommonTestSubjectId,
  CommonTestTheme,
} from "@/data/common-test";

interface Props {
  sections: CommonTestSection[];
  theme: CommonTestTheme;
  subjectId: CommonTestSubjectId;
}

export function CommonTestSectionGrid({ sections, theme, subjectId }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {sections.map((section) => (
        <SectionCard
          key={section.number}
          section={section}
          theme={theme}
          subjectId={subjectId}
        />
      ))}
    </div>
  );
}

function SectionCard({
  section,
  theme,
  subjectId,
}: {
  section: CommonTestSection;
  theme: CommonTestTheme;
  subjectId: CommonTestSubjectId;
}) {
  const drillHref = `/common-test/${subjectId}/section-${section.number}`;
  const tactic = getSectionTactic(subjectId, section);
  const growth = Math.max(0, tactic.targetScore - tactic.currentScore);

  return (
    <article className="flex min-h-[300px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-xs font-extrabold"
              style={{
                background: `rgba(${theme.glowRgb},0.10)`,
                color: theme.primary,
              }}
            >
              第{section.number}問
            </span>
            {section.isElective && (
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                選択問題
              </span>
            )}
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold"
              style={{
                background: tactic.priority === "高" ? "#fff1f2" : tactic.priority === "中" ? "#fffbeb" : "#f8fafc",
                color: tactic.priority === "高" ? "#e11d48" : tactic.priority === "中" ? "#d97706" : "#64748b",
              }}
            >
              優先度 {tactic.priority}
            </span>
          </div>
          <h3 className="mt-3 text-base font-extrabold leading-snug text-slate-950">
            {section.title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
          <Timer className="h-3.5 w-3.5" />
          {section.recommendedMinutes}分
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {section.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Metric label="配点" value={`${section.maxScore}点`} />
        <Metric label="目標時間" value={`${section.recommendedMinutes}分`} />
        <Metric label="現在" value={`${tactic.currentScore}/${section.maxScore}`} />
        <Metric label="目標" value={`${tactic.targetScore}/${section.maxScore}`} />
        <Metric label="平均時間" value={`${tactic.averageMinutes}分`} />
        <Metric label="伸びしろ" value={`+${growth}点`} accent />
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
          <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
          本番での目標
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-600">{tactic.examGoal}</p>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-5 text-slate-500">
          理由：{tactic.reason}
        </div>
        <Link
          href={drillHref}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          第{section.number}問を{section.recommendedMinutes}分練習する
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <div className="text-[10px] font-bold text-slate-500">{label}</div>
      <div className={`mt-0.5 font-mono text-sm font-extrabold ${accent ? "text-amber-600" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}

function getSectionTactic(subjectId: CommonTestSubjectId, section: CommonTestSection) {
  const base = SECTION_TACTICS[`${subjectId}:${section.number}`] ?? {
    currentScore: Math.max(0, section.maxScore - 7),
    targetScore: Math.max(1, section.maxScore - 2),
    averageMinutes: section.recommendedMinutes + 2,
    priority: "中" as const,
    reason: "短時間で現在地を測り、復習キューに弱点を残せます。",
    examGoal: "誘導に乗れる問題を確実に取り、難問は時間を使いすぎない。",
  };

  return {
    ...base,
    targetScore: Math.min(section.maxScore, base.targetScore),
    currentScore: Math.min(section.maxScore, base.currentScore),
  };
}

const SECTION_TACTICS: Record<
  string,
  {
    currentScore: number;
    targetScore: number;
    averageMinutes: number;
    priority: "高" | "中" | "低";
    reason: string;
    examGoal: string;
  }
> = {
  "math-1a:1": {
    currentScore: 18,
    targetScore: 25,
    averageMinutes: 23,
    priority: "高",
    reason: "図形と計量・命題は得点効率が高く、目標80点への差を埋めやすい。",
    examGoal: "前半を落とさず、図形誘導は途中式まで粘って25点を狙う。",
  },
  "math-1a:2": {
    currentScore: 20,
    targetScore: 24,
    averageMinutes: 22,
    priority: "中",
    reason: "二次関数は伸ばしやすい一方、データの分析に時間を吸われすぎない調整が必要。",
    examGoal: "二次関数を先に固め、データ処理は計算ミスを最小化する。",
  },
  "math-1a:3": {
    currentScore: 11,
    targetScore: 16,
    averageMinutes: 17,
    priority: "高",
    reason: "図形の性質は定理選択が決まると短時間で得点を伸ばせる。",
    examGoal: "方べき・メネラウスの使いどころを判断して16点を狙う。",
  },
  "math-1a:4": {
    currentScore: 12,
    targetScore: 16,
    averageMinutes: 16,
    priority: "中",
    reason: "確率は条件整理の型を作ると安定しやすい。",
    examGoal: "条件付き確率と数え上げを先に取り、重い設問は深追いしない。",
  },
  "math-2bc:1": {
    currentScore: 9,
    targetScore: 12,
    averageMinutes: 13,
    priority: "中",
    reason: "図形と三角関数は小問を取り切るだけで安定得点になります。",
    examGoal: "円と直線・三角関数の基本変形を落とさず12点を狙う。",
  },
  "math-2bc:2": {
    currentScore: 8,
    targetScore: 13,
    averageMinutes: 15,
    priority: "高",
    reason: "微分積分は計算精度の改善がそのまま得点に反映されます。",
    examGoal: "接線・増減・面積の標準処理を時間内に完走する。",
  },
  "math-2bc:3": {
    currentScore: 13,
    targetScore: 18,
    averageMinutes: 18,
    priority: "高",
    reason: "数列は誘導読解の型ができると大きく伸ばせます。",
    examGoal: "漸化式の誘導を読み落とさず、前半で確実に点を積む。",
  },
  "math-2bc:4": {
    currentScore: 9,
    targetScore: 12,
    averageMinutes: 12,
    priority: "低",
    reason: "選択候補として基礎確認に留め、数学本体の必答を優先します。",
    examGoal: "選ぶ場合は定義確認で失点を減らし、長い計算は深追いしない。",
  },
  "math-2bc:5": {
    currentScore: 10,
    targetScore: 13,
    averageMinutes: 12,
    priority: "中",
    reason: "ベクトルは得意化できれば選択問題の安定枠になります。",
    examGoal: "内積・位置ベクトルを素早く処理して13点を狙う。",
  },
  "math-2bc:6": {
    currentScore: 8,
    targetScore: 11,
    averageMinutes: 12,
    priority: "低",
    reason: "曲線は選択判断が重要。まず取れる設問だけ見極めます。",
    examGoal: "標準変形を拾い、時間を使いすぎる設問は切る。",
  },
  "math-2bc:7": {
    currentScore: 8,
    targetScore: 11,
    averageMinutes: 12,
    priority: "低",
    reason: "複素数平面は選択候補として、基本操作の確認に絞ります。",
    examGoal: "偏角・回転の基本を取り、難しい図形処理は深入りしない。",
  },
};
