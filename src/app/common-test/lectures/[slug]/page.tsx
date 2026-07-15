import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { getSpecialLectureBySlug, PUBLIC_SPECIAL_LECTURES } from "@/data/specialLectures";
import { LectureExperience } from "@/components/lectures/LectureExperience";
import { LectureNextRecommendation } from "@/components/lectures/LectureNextRecommendation";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { MASTERY_LECTURE_GUIDES } from "@/lib/special-lecture-guidance";

export function generateStaticParams() {
  return [
    ...PUBLIC_SPECIAL_LECTURES.map((lecture) => ({ slug: lecture.slug })),
    ...MASTERY_LECTURE_GUIDES.filter((guide) => guide.isPublished !== false).flatMap((guide) =>
      guide.legacySlugs.map((slug) => ({ slug })),
    ),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lecture = getSpecialLectureBySlug(slug);
  if (!lecture) return { title: "講義が見つかりません" };
  const title = `${lecture.title} — 特別講義`;
  const canonical = `/common-test/lectures/${lecture.slug}`;
  return {
    title,
    description: lecture.description,
    robots: lecture.noindex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description: lecture.description,
      url: canonical,
      type: "article",
    },
  };
}

export default async function LectureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lecture = getSpecialLectureBySlug(slug);
  if (!lecture) notFound();

  return (
    <LearningPageShell width="content" className="max-w-5xl">
      <LearningBreadcrumbs
        items={[
          { label: "共通テスト対策", href: "/common-test" },
          { label: "特別講義", href: "/common-test/lectures" },
          { label: lecture.title },
        ]}
      />
      <LearningPageHeader
        eyebrow="特別講義 / 重点講座"
        title={lecture.title}
        description={lecture.description}
        meta={[
          { label: "科目", value: lecture.subject },
          { label: "単元", value: lecture.unit },
          { label: "難度", value: lecture.difficulty },
          { label: "推奨時間", value: `${lecture.recommendedMinutes}分` },
        ]}
      />

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-bold text-slate-700">この講義で扱うもの</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {lecture.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-slate-50 px-2 py-1 text-xs font-bold text-slate-700 ring-1 ring-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
        <BookOpen className="h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
        まず本文で判断順を作り、問題ブロックで同じ流れを再現します。
      </div>

      <LectureExperience lecture={lecture} />
      <LectureNextRecommendation currentSlug={lecture.slug} />
    </LearningPageShell>
  );
}
