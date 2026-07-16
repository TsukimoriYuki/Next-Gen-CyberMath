import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, History } from "lucide-react";
import {
  LearningPage,
  LearningPageContainer,
  LearningPageHero,
  LearningSection,
} from "@/components/learning/LearningPage";
import { LearningBreadcrumbs } from "@/components/learning/LearningPageFrame";
import { INFORMATICS_MOCK_EXAM_001 } from "@/data/informatics/mock-exam";
import { createPublicMetadata } from "@/lib/public-metadata";

export const metadata: Metadata = createPublicMetadata({
  title: "情報Ⅰ オリジナル模試",
  description: "Web版を正本とする、完全オリジナルの情報Ⅰ共通テスト型模試です。",
  path: "/informatics/mock-exam",
});

export default function InformaticsMockExamPage() {
  const exam = INFORMATICS_MOCK_EXAM_001;
  return (
    <LearningPage>
      <LearningPageContainer>
        <LearningBreadcrumbs items={[{ label: "情報Ⅰ", href: "/informatics" }, { label: "オリジナル模試" }]} />
        <LearningPageHero
          eyebrow="情報Ⅰ β"
          title="60分のオリジナル模試で、知識を使う力を確かめる。"
          description="大学入試センターの本試験や公式模試ではありません。Cyber Mathが独自に作成したWeb版の共通テスト型演習です。"
          actions={[
            { label: "模試を開始・再開", href: `/informatics/mock-exam/${exam.slug}`, primary: true },
            { label: "受験履歴", href: "/informatics/history" },
          ]}
        />
        <LearningSection title={exam.title} description="自動保存・中断再開・サーバー側採点・分野別診断に対応しています。">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 text-sm font-bold text-slate-700">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />60分</span>
              <span>4大問</span><span>100点</span><span>Web版が正本</span>
            </div>
            <ol className="mt-5 grid gap-3 md:grid-cols-2">
              {exam.sections.map((section) => (
                <li key={section.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="font-black text-slate-950">{section.title}　{section.points}点</span>
                  <span className="mt-1 block text-sm text-slate-600">{section.unit}</span>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/informatics/mock-exam/${exam.slug}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white">
                模試を開始・再開 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/informatics/history" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700">
                <History className="h-4 w-4" />履歴を見る
              </Link>
            </div>
          </div>
        </LearningSection>
      </LearningPageContainer>
    </LearningPage>
  );
}
