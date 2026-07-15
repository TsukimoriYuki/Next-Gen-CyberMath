import { notFound } from "next/navigation";
import { COMPREHENSION_PROBLEMS } from "@/data/english-comprehension";
import { ComprehensionViewer } from "@/components/english/ComprehensionViewer";
import {
  ContentMeta,
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";
import { createPublicMetadata } from "@/lib/public-metadata";

export function generateStaticParams() {
  return COMPREHENSION_PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = COMPREHENSION_PROBLEMS.find((p) => p.id === id);
  if (!problem) return { robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: problem.title,
    description: `${problem.title}の英文構造と論旨を読み解く精読問題です。`,
    path: `/english/comprehension/${id}`,
    openGraphType: "article",
  });
}

export default async function ComprehensionProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = COMPREHENSION_PROBLEMS.find((p) => p.id === id);
  if (!problem) notFound();

  const levelMeta = ENGLISH_LEVEL_META[problem.level];

  return (
    <LearningPageShell width="content">
      <LearningBreadcrumbs
        items={[
          { label: "英語", href: "/english" },
          { label: "精読", href: "/english/comprehension" },
          { label: problem.title },
        ]}
      />
      <LearningPageHeader
        eyebrow="英語・精読"
        title={problem.title}
        description={
          <>
            <p>本文を参照しながら、設問に答えてください。</p>
            <ContentMeta
              className="mt-5"
              items={[
                { label: "レベル", value: levelMeta.label },
                { label: "設問", value: problem.questions.length + "問" },
                { label: "テーマ", value: problem.tags.join(" / ") },
              ]}
            />
          </>
        }
      />
      <div className="mt-8">
        <ComprehensionViewer problem={problem} />
      </div>
    </LearningPageShell>
  );
}
