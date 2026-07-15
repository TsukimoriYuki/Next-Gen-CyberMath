import { notFound } from "next/navigation";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { MultiSourceViewer } from "@/components/english/MultiSourceViewer";
import {
  ContentMeta,
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { createPublicMetadata } from "@/lib/public-metadata";

export function generateStaticParams() {
  return MULTI_SOURCE_PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = MULTI_SOURCE_PROBLEMS.find((p) => p.id === id);
  if (!problem) return { robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: problem.title,
    description: `${problem.title}で複数資料の情報を統合する英語読解問題です。`,
    path: `/english/multi-source/${id}`,
    openGraphType: "article",
  });
}

export default async function MultiSourceProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = MULTI_SOURCE_PROBLEMS.find((p) => p.id === id);
  if (!problem) notFound();

  const levelMeta = ENGLISH_LEVEL_META[problem.level];

  return (
    <LearningPageShell width="wide">
      <LearningBreadcrumbs
        items={[
          { label: "英語", href: "/english" },
          { label: "複数資料読解", href: "/english/multi-source" },
          { label: problem.title },
        ]}
      />
      <LearningPageHeader
        eyebrow="英語・複数資料読解"
        title={problem.title}
        description={
          <>
            <p>複数の資料を照合しながら、設問に答えてください。</p>
            <ContentMeta
              className="mt-5"
              items={[
                { label: "レベル", value: levelMeta.label },
                { label: "資料", value: problem.sources.length + "件" },
                { label: "設問", value: problem.questions.length + "問" },
                { label: "テーマ", value: problem.tags.join(" / ") },
              ]}
            />
          </>
        }
      />
      <div className="mt-8">
        <MultiSourceViewer problem={problem} />
      </div>
    </LearningPageShell>
  );
}
