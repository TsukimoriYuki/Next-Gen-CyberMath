import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FileText, Gauge, HelpCircle, Timer, Type } from "lucide-react";
import { SPEED_READING_PROBLEMS } from "@/data/english-speed-reading";
import { SpeedReadingRandomButton } from "@/components/english/SpeedReadingRandomButton";
import {
  ENGLISH_LEVEL_META,
  ENGLISH_LEVEL_SLUG,
  formatSpeedReadingTime,
  getEnglishLevelBySlug,
  getSpeedReadingEstimatedSeconds,
  getSpeedReadingTargetWpm,
  getSpeedReadingWordCount,
  type EnglishLevel,
} from "@/lib/english-types";

/** レベルごとの説明文（目標WPMの考え方を1行で添える） */
const LEVEL_DESCRIPTION: Record<EnglishLevel, string> = {
  TEXTBOOK:
    "100WPMを目標に、基礎語彙と短文で速読の土台をつくります。まずは正確に読み切ることから。",
  COMMON_TEST:
    "150WPMを目標に、時間内に大量の英文を処理する練習をします。情報を素早く正確に拾います。",
  PRIVATE_UNI:
    "150WPMを目標に、私大頻出の抽象論説を読み切ります。論理展開と語彙を高速で処理します。",
  NATIONAL_UNI:
    "120WPMを目標に、高密度の複文を精密に読み解きます。速度より構文の正確さを優先します。",
};

export function generateStaticParams() {
  return (Object.values(ENGLISH_LEVEL_SLUG) as string[]).map((level) => ({
    level,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: slug } = await params;
  const level = getEnglishLevelBySlug(slug);
  if (!level) return {};
  return { title: `${ENGLISH_LEVEL_META[level].label} 速読長文` };
}

export default async function SpeedReadingLevelListPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level: slug } = await params;
  const level = getEnglishLevelBySlug(slug);
  if (!level) notFound();

  const meta = ENGLISH_LEVEL_META[level];
  const problems = SPEED_READING_PROBLEMS.filter((p) => p.level === level);
  if (problems.length === 0) notFound();

  const levelTargetWpm = getSpeedReadingTargetWpm(problems[0]);
  const ids = problems.map((p) => p.id);

  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Ambient grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Back to level select */}
        <Link
          href="/english/speed-reading"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 transition-colors hover:text-emerald-500"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          レベル選択へ
        </Link>

        {/* Header */}
        <header className="mt-8 mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: `color-mix(in srgb, ${meta.accent} 12%, transparent)`,
              border: `1px solid color-mix(in srgb, ${meta.accent} 35%, transparent)`,
              color: meta.accent,
            }}
          >
            <Timer className="h-3.5 w-3.5" />
            {meta.name} · 長文一覧
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            {meta.label} 速読長文
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            {LEVEL_DESCRIPTION[level]}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 font-mono font-semibold text-slate-600">
              収録 {problems.length} 題
            </span>
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 font-mono font-semibold text-sky-700">
              目標 {levelTargetWpm} WPM
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-slate-500">
            <span className="font-semibold text-slate-700">通常で読む</span>
            ：時間を計りながら自分のペースで読みます（スピードサポートUIなし）。
            <span className="ml-2 font-semibold text-sky-700">
              スピードサポートで読む
            </span>
            ：目標WPMに沿って、いま読むべき位置を本文中にハイライト表示します。
          </p>
        </header>

        {/* Passage list */}
        <div className="grid gap-4 sm:grid-cols-2">
          {problems.map((problem) => {
            const wordCount = getSpeedReadingWordCount(problem);
            const targetWpm = getSpeedReadingTargetWpm(problem);
            const estimatedSeconds = getSpeedReadingEstimatedSeconds(problem);
            const questionCount = problem.questions.length;

            return (
              <article
                key={problem.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Title + level */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h2 className="font-display text-lg font-bold leading-snug text-slate-900">
                    {problem.title}
                  </h2>
                  <span
                    className="shrink-0 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold"
                    style={{
                      background: `color-mix(in srgb, ${meta.accent} 12%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${meta.accent} 35%, transparent)`,
                      color: meta.accent,
                    }}
                  >
                    {meta.label}
                  </span>
                </div>

                {/* Metrics */}
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Type className="h-3.5 w-3.5 text-slate-400" />
                    <dt className="sr-only">本文語数</dt>
                    <dd>
                      <span className="font-mono font-semibold text-slate-800">
                        {wordCount}
                      </span>{" "}
                      語
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-slate-400" />
                    <dt className="sr-only">目標WPM</dt>
                    <dd>
                      目標{" "}
                      <span className="font-mono font-semibold text-slate-800">
                        {targetWpm}
                      </span>{" "}
                      WPM
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Timer className="h-3.5 w-3.5 text-slate-400" />
                    <dt className="sr-only">目標読了時間</dt>
                    <dd>
                      目標{" "}
                      <span className="font-mono font-semibold text-slate-800">
                        {formatSpeedReadingTime(estimatedSeconds)}
                      </span>
                    </dd>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                    <dt className="sr-only">設問数</dt>
                    <dd>
                      設問{" "}
                      <span className="font-mono font-semibold text-slate-800">
                        {questionCount}
                      </span>{" "}
                      問
                    </dd>
                  </div>
                </dl>

                {/* Tags */}
                {problem.tags && problem.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {problem.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Link
                    href={`/english/speed-reading/${problem.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    通常で読む
                  </Link>
                  <Link
                    href={`/english/speed-reading/${problem.id}?speedSupport=1`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400 bg-sky-500 px-3 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-sky-600"
                  >
                    <Gauge className="h-3.5 w-3.5" />
                    スピードサポートで読む
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Supplementary random CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-slate-200 pt-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
            迷ったら、ランダムで1題
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <SpeedReadingRandomButton ids={ids} label="ランダムに1題（通常）" />
            <SpeedReadingRandomButton
              ids={ids}
              speedSupport
              label="ランダムに1題（スピードサポート）"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-300 bg-sky-50 px-4 py-2.5 font-mono text-xs font-semibold text-sky-700 transition hover:bg-sky-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
