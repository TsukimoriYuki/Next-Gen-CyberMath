// Server Component - 大問別ドリルカード一覧
import Link from "next/link";
import { ChevronRight, Timer } from "lucide-react";
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

  return (
    <article className="flex min-h-[230px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
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

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <div className="text-xs text-slate-500">
          配点 <span className="font-bold text-slate-900">{section.maxScore}</span> 点
        </div>
        <Link
          href={drillHref}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          この大問を練習する
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
