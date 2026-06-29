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
        <Metric label="到達目安" value={tactic.target} />
        <Metric label="伸ばし方" value={tactic.focus} accent />
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
          <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
          本番での目標
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-600">{tactic.examGoal}</p>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs leading-5 text-slate-500">理由: {tactic.reason}</div>
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
      <div className={`mt-0.5 text-sm font-extrabold ${accent ? "text-amber-600" : "text-slate-900"}`}>
        {value}
      </div>
    </div>
  );
}

function getSectionTactic(subjectId: CommonTestSubjectId, section: CommonTestSection) {
  return SECTION_TACTICS[`${subjectId}:${section.number}`] ?? {
    priority: "中" as const,
    target: "満点近く",
    focus: "読み落とし",
    reason: "短時間で現在地を測り、復習キューに弱点を残しやすい大問です。",
    examGoal: "誘導に乗れる設問を確実に取り、時間を使いすぎないことを目標にします。",
  };
}

const SECTION_TACTICS: Record<
  string,
  {
    priority: "高" | "中" | "低";
    target: string;
    focus: string;
    reason: string;
    examGoal: string;
  }
> = {
  "math-1a:1": {
    priority: "高",
    target: "25点以上",
    focus: "公式判断",
    reason: "図形と計量、命題は読み方を固めると短期間で伸ばしやすいです。",
    examGoal: "前半で止まらず、図形条件と誘導式を結びつけて25点以上を狙います。",
  },
  "math-1a:2": {
    priority: "中",
    target: "24点以上",
    focus: "計算精度",
    reason: "二次関数とデータ分析は計算の型を決めると安定します。",
    examGoal: "二次関数を先に固め、データ分析では読み替えミスを減らします。",
  },
  "math-1a:3": {
    priority: "高",
    target: "16点以上",
    focus: "補助線",
    reason: "図形の性質は定理選択が決まると得点に直結します。",
    examGoal: "等しい角、辺の比、中心を見つけて、後半設問まで粘ります。",
  },
  "math-1a:4": {
    priority: "中",
    target: "16点以上",
    focus: "条件整理",
    reason: "確率は条件を表に落とす練習で失点を減らせます。",
    examGoal: "条件付き確率と数え上げを先に取り、重い設問で深追いしすぎないようにします。",
  },
  "math-2bc:2": {
    priority: "高",
    target: "13点以上",
    focus: "微積計算",
    reason: "微分積分は計算精度の改善が得点に反映されやすいです。",
    examGoal: "接線、増減、面積の標準処理を70分内で走り切ります。",
  },
};
