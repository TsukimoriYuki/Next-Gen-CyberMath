import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BookOpenCheck, RefreshCw } from "lucide-react";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
} from "@/components/learning/LearningPage";
import { JAPANESE_COURSE_SUBJECT } from "@/data/courses/japanese";
import {
  JAPANESE_AREA_META,
  JAPANESE_PROBLEMS,
  JAPANESE_READING_PASSAGES,
  type JapaneseArea,
} from "@/data/japanese";
import { requireSubject } from "@/data/subjects";
import { createPublicMetadata } from "@/lib/public-metadata";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

const subject = requireSubject("japanese");

export const metadata: Metadata = createPublicMetadata({
  title: "国語",
  description: "現代文語彙・現代文読解・古文・漢文を、16講座・190問で学ぶ国語ベータ版です。",
  path: "/japanese",
});

const AREA_ORDER: readonly JapaneseArea[] = [
  "modern-vocabulary",
  "modern-reading",
  "classical-japanese",
  "kanbun",
];

export default function JapanesePage() {
  requireSubjectPageAccess("japanese");

  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningPageHero
          eyebrow="国語 β"
          title="根拠と文脈から読む国語"
          description={subject.description}
          actions={[
            { label: "講座から学ぶ", href: "/courses/japanese" },
            { label: "問題を解く", href: "/japanese/problems" },
          ]}
          supporting={
            <dl className="grid grid-cols-3 gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
              <div><dt className="text-xs font-semibold text-amber-800">領域</dt><dd className="mt-1 text-xl font-bold text-slate-950">4</dd></div>
              <div><dt className="text-xs font-semibold text-amber-800">講座</dt><dd className="mt-1 text-xl font-bold text-slate-950">16</dd></div>
              <div><dt className="text-xs font-semibold text-amber-800">問題</dt><dd className="mt-1 text-xl font-bold text-slate-950">190</dd></div>
            </dl>
          }
        />

        <LearningSection
          id="learn"
          title="4領域から学ぶ"
          description="講座で読み方を確認し、対応問題と復習へ進めます。"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {AREA_ORDER.map((area) => {
              const meta = JAPANESE_AREA_META[area];
              const unit = JAPANESE_COURSE_SUBJECT.units.find((entry) => entry.unitId === meta.unitId);
              const problemCount = JAPANESE_PROBLEMS.filter((problem) => problem.area === area).length;
              const practiceHref = area === "modern-reading"
                ? "/japanese/reading"
                : `/japanese/problems?area=${area}`;
              return (
                <article key={area} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <BookOpen className="h-5 w-5 text-violet-700" aria-hidden="true" />
                  <h2 className="mt-3 text-xl font-bold text-slate-950">{meta.label}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{meta.description}</p>
                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    {unit?.lessons.length ?? 0}講座・{area === "modern-reading" ? `${JAPANESE_READING_PASSAGES.length}文章・` : ""}{problemCount}問
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
                    <Link href={`/courses/japanese/${meta.unitId}`} className="inline-flex min-h-11 items-center gap-1 text-blue-700 hover:underline">学習を始める <ArrowRight className="h-4 w-4" /></Link>
                    <Link href={practiceHref} className="inline-flex min-h-11 items-center gap-1 text-violet-800 hover:underline">問題を解く <ArrowRight className="h-4 w-4" /></Link>
                    <Link href="/review" className="inline-flex min-h-11 items-center gap-1 text-emerald-800 hover:underline">復習する <RefreshCw className="h-4 w-4" /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </LearningSection>

        <LearningSection id="practice" title="問題を解く" description="実装済みの選択式演習だけを案内しています。">
          <div className="grid gap-4 md:grid-cols-2">
            <Link href="/japanese/problems" className="action-card group">
              <BookOpenCheck className="h-5 w-5 text-blue-700" aria-hidden="true" />
              <span><strong className="block text-lg text-slate-950">現代文語彙・古文・漢文</strong><span className="mt-2 block text-sm leading-6 text-slate-600">3領域60問を、本文根拠と誤答理由まで確認します。</span></span>
            </Link>
            <Link href="/japanese/reading" className="action-card group">
              <BookOpenCheck className="h-5 w-5 text-violet-700" aria-hidden="true" />
              <span><strong className="block text-lg text-slate-950">現代文読解</strong><span className="mt-2 block text-sm leading-6 text-slate-600">完全オリジナル20文章・100問に取り組みます。</span></span>
            </Link>
            <Link href="/japanese/reading/exams" className="action-card group">
              <BookOpenCheck className="h-5 w-5 text-rose-700" aria-hidden="true" />
              <span><strong className="block text-lg text-slate-950">共通テスト型・現代文大問</strong><span className="mt-2 block text-sm leading-6 text-slate-600">完全オリジナル6セット・30問を時間目安つきで解きます。</span></span>
            </Link>
          </div>
        </LearningSection>

        <LearningSection id="review" title="復習する" description="間違えた問題や迷った問題を復習キューへ登録できます。">
          <Link href="/review" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white"><RefreshCw className="h-4 w-4" />復習キューを開く</Link>
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
