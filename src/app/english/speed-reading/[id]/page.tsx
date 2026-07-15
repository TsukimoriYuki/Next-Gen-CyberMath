import { notFound } from "next/navigation";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { SpeedReadingGame } from "@/components/english/SpeedReadingGame";
import {
  ContentMeta,
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";
import {
  ENGLISH_LEVEL_META,
  ENGLISH_LEVEL_SLUG,
  formatSpeedReadingTime,
  getSpeedReadingTimeLimitSeconds,
  getSpeedReadingTargetWpm,
  getSpeedReadingWordCount,
} from "@/lib/english-types";
import { createPublicMetadata } from "@/lib/public-metadata";

export function generateStaticParams() {
  return SPEED_READING_PROBLEMS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problem = SPEED_READING_PROBLEMS.find((p) => p.id === id);
  if (!problem) return { robots: { index: false, follow: false } };
  return createPublicMetadata({
    title: problem.title,
    description: `${problem.title}で読解速度と正確さを鍛える英語速読問題です。`,
    path: `/english/speed-reading/${id}`,
    openGraphType: "article",
  });
}

export default async function SpeedReadingProblemPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ speedSupport?: string | string[] }>;
}) {
  const { id } = await params;
  const { speedSupport } = await searchParams;
  const problem = SPEED_READING_PROBLEMS.find((p) => p.id === id);
  if (!problem) notFound();

  const levelMeta = ENGLISH_LEVEL_META[problem.level];
  const timeLimitSeconds = getSpeedReadingTimeLimitSeconds(problem);
  const targetWpm = getSpeedReadingTargetWpm(problem);
  const wordCount = getSpeedReadingWordCount(problem);
  const speedSupportMode =
    speedSupport === "1" ||
    speedSupport === "true" ||
    (Array.isArray(speedSupport) && speedSupport.includes("1"));

  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "英語", href: "/english" },
          { label: "速読", href: "/english/speed-reading" },
          {
            label: levelMeta.label,
            href:
              "/english/speed-reading/level/" +
              ENGLISH_LEVEL_SLUG[problem.level],
          },
          { label: problem.title },
        ]}
      />
      <LearningPageHeader
        eyebrow="英語・速読"
        title={problem.title}
        description={
          <>
            <p>制限時間を意識しながら英文を読み、設問に答えてください。</p>
            <ContentMeta
              className="mt-5"
              items={[
                { label: "レベル", value: levelMeta.label },
                { label: "本文", value: wordCount + "語" },
                { label: "目標速度", value: targetWpm + " WPM" },
                {
                  label: "制限時間（分:秒）",
                  value: formatSpeedReadingTime(timeLimitSeconds),
                },
                { label: "設問", value: problem.questions.length + "問" },
                {
                  label: "読み方",
                  value: speedSupportMode ? "スピードサポート" : "通常",
                },
                {
                  label: "テーマ",
                  value: problem.tags?.join(" / ") || "―",
                },
              ]}
            />
          </>
        }
      />
      <div className="mt-8">
        <SpeedReadingGame problem={problem} speedSupportMode={speedSupportMode} />
      </div>
    </LearningPageShell>
  );
}
