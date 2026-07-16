import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ListChecks } from "lucide-react";
import {
  LearningPageHeader,
  LearningPageShell,
  LearningSectionHeader,
} from "@/components/learning/LearningPageFrame";
import { JAPANESE_AREA_META, JAPANESE_PROBLEMS, JAPANESE_READING_PASSAGES } from "@/data/japanese";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = {
  title: "国語（開発確認用）",
  robots: { index: false, follow: false },
};

export default function JapanesePage() {
  requireSubjectPageAccess("japanese");
  const areas = Object.entries(JAPANESE_AREA_META);

  return (
    <LearningPageShell>
      <LearningPageHeader
        eyebrow="国語"
        title="根拠と文脈から読む国語"
        description="大量暗記ではなく、語の対比、文法、主語、人物関係、本文根拠を順に確認する学習基盤です。"
        meta={[
          { label: "公開状態", value: "hidden（開発確認用）" },
          { label: "対象", value: "現代文語彙・古文・漢文" },
          { label: "問題数", value: `${JAPANESE_PROBLEMS.length}問` },
        ]}
      />

      <section className="mt-10" aria-labelledby="japanese-areas">
        <LearningSectionHeader
          title="領域から学ぶ"
          description="講座で読み方を確認してから、対応する問題で根拠の取り方を練習します。"
        />
        <div id="japanese-areas" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {areas.map(([area, meta]) => {
            const count = JAPANESE_PROBLEMS.filter((problem) => problem.area === area).length;
            return (
              <article key={area} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
                <h2 className="mt-3 text-xl font-bold text-slate-950">{meta.label}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{meta.description}</p>
                <p className="mt-3 text-sm font-semibold text-slate-700">{area === "modern-reading" ? `4講座・${JAPANESE_READING_PASSAGES.length}文章・${count}問` : `${count}問`}</p>
                <Link
                  href={`/courses/japanese/${meta.unitId}`}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-blue-700 hover:underline"
                >
                  講座を見る <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                {area === "modern-reading" ? <Link href="/japanese/reading" className="ml-4 inline-flex min-h-11 items-center font-semibold text-violet-800 hover:underline">演習へ</Link> : null}
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <ListChecks className="h-5 w-5 text-violet-700" aria-hidden="true" />
        <h2 className="mt-3 text-xl font-bold text-slate-950">問題一覧</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          領域・難易度・本文根拠を確認しながら、全問題へ進めます。
        </p>
        <Link
          href="/japanese/problems"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-violet-800 hover:underline"
        >
          問題一覧へ <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </LearningPageShell>
  );
}
