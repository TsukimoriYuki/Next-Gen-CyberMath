import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { MULTI_SOURCE_PROBLEMS } from "@/data/english-multisource";
import { MultiSourceViewer } from "@/components/english/MultiSourceViewer";
import { ENGLISH_LEVEL_META } from "@/lib/english-types";

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
  if (!problem) return {};
  return { title: problem.title };
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
    <div className="english-academic min-h-screen bg-slate-50 text-slate-900">
      {/* Ambient grid */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Back */}
        <Link
          href="/english/multi-source"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          問題一覧へ
        </Link>

        {/* Header */}
        <div className="mt-6 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="rounded-full px-2.5 py-0.5 font-mono text-xs font-semibold"
              style={{
                background: `color-mix(in srgb, ${levelMeta.accent} 14%, transparent)`,
                border: `1px solid color-mix(in srgb, ${levelMeta.accent} 38%, transparent)`,
                color: levelMeta.accent,
              }}
            >
              {levelMeta.label}
            </span>
            <span className="text-xs text-slate-500">
              {problem.sources.length}資料 / {problem.questions.length}問 /{" "}
              {problem.tags.join(" / ")}
            </span>
          </div>
          <h1 className="font-display text-xl font-extrabold text-slate-950 sm:text-2xl">
            {problem.title}
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            左ペインの複数資料を照合しながら、右ペインの設問に答えてください。
          </p>
        </div>

        {/* Viewer */}
        <MultiSourceViewer problem={problem} />
      </div>
    </div>
  );
}
