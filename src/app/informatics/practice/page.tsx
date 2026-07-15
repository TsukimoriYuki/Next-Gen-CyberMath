import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  LearningBreadcrumbs,
  ContentMeta,
} from "@/components/learning/LearningPageFrame";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
} from "@/components/learning/LearningPage";
import { INFORMATICS_SECTION_PRACTICES } from "@/data/informatics/exam-practice";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "情報Ⅰ 共通テスト型大問別演習",
  description:
    "情報社会、情報デザイン、デジタル表現、プログラミング、ネットワーク、データ分析を資料読解型の大問で練習します。",
  path: "/informatics/practice",
});

export default function InformaticsPracticePage() {
  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningBreadcrumbs
          items={[
            { label: "情報Ⅰ", href: "/informatics" },
            { label: "大問別演習" },
          ]}
        />
        <LearningPageHero
          eyebrow="情報Ⅰ β"
          title="共通テスト型の資料問題を、大問ごとに練習する。"
          description="完全オリジナルの6セットです。会話や表から条件を読み取り、採点後は誤答原因と対応講座を確認できます。"
          actions={[
            { label: "演習を選ぶ", href: "#practice", primary: true },
            { label: "情報Ⅰトップ", href: "/informatics" },
          ]}
        />
        <LearningSection
          id="practice"
          title="大問別演習 6セット"
          description="各セット20分・25点。設問は独立して採点されます。"
        >
          <ul className="grid gap-4 lg:grid-cols-2">
            {INFORMATICS_SECTION_PRACTICES.map((exam, index) => (
              <li key={exam.id}>
                <Link
                  href={`/informatics/practice/${exam.slug ?? exam.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:bg-teal-50/30"
                >
                  <span className="text-xs font-bold text-teal-800">
                    演習 {index + 1}
                  </span>
                  <span className="mt-2 text-lg font-black text-slate-950">
                    {exam.title}
                  </span>
                  <span className="mt-2 text-sm leading-6 text-slate-600">
                    {exam.sections[0]?.theme}
                  </span>
                  <ContentMeta
                    className="mt-4"
                    items={[
                      { label: "目安", value: `${exam.durationMinutes}分` },
                      {
                        label: "設問",
                        value: `${exam.sections[0]?.questions.length ?? 0}問`,
                      },
                      { label: "配点", value: `${exam.totalPoints}点` },
                    ]}
                  />
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal-800">
                    この大問を解く
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
