import type { Metadata } from "next";
import Link from "next/link";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { JAPANESE_AREA_META, JAPANESE_PROBLEMS } from "@/data/japanese";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "国語 問題一覧",
  description: "現代文語彙・古文・漢文の60問を、本文根拠と全選択肢の誤答理由つきで学びます。",
  path: "/japanese/problems",
});

const DIFFICULTY = {
  basic: "基礎",
  standard: "標準",
  "common-test-ready": "共通テスト準備",
} as const;

export default async function JapaneseProblemsPage({
  searchParams,
}: {
  searchParams: Promise<{ area?: string; course?: string }>;
}) {
  requireSubjectPageAccess("japanese", "problems");
  const { area, course } = await searchParams;
  const problems = JAPANESE_PROBLEMS.filter(
    (problem) =>
      problem.area !== "modern-reading" &&
      (!area || problem.area === area) &&
      (!course || problem.relatedCourseIds.includes(course)),
  );
  return (
    <LearningPageShell>
      <LearningBreadcrumbs items={[{ label: "国語", href: "/japanese" }, { label: "問題一覧" }]} />
      <LearningPageHeader
        eyebrow="国語演習"
        title="本文根拠を確かめる問題"
        description="正解だけでなく、各誤答がなぜ違うかまで確認できます。"
        meta={[
          { label: "表示中", value: `${problems.length}問` },
          { label: "国語全体", value: "160問" },
        ]}
      />
      <Link href="/japanese/reading" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-violet-700 px-5 py-2.5 font-bold text-white">現代文読解 20文章へ</Link>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {problems.map((problem) => (
          <Link
            key={problem.id}
            href={`/japanese/problems/${problem.slug}`}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:bg-blue-50"
          >
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              <span>{JAPANESE_AREA_META[problem.area].label}</span>
              <span>・</span>
              <span>{DIFFICULTY[problem.difficulty]}</span>
              <span>・</span>
              <span>約{problem.estimatedTime}秒</span>
            </div>
            <h2 className="mt-2 text-lg font-bold text-slate-950">{problem.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{problem.prompt}</p>
          </Link>
        ))}
      </div>
    </LearningPageShell>
  );
}
