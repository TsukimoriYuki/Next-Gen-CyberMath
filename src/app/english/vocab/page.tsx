import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, BookOpen } from "lucide-react";
import { VocabFlashcardGame } from "@/components/english/VocabFlashcardGame";
import { createPublicMetadata } from "@/lib/public-metadata";
import {
  ENGLISH_USAGE_AREA_META,
  ENGLISH_USAGE_DIFFICULTY_LABEL,
  ENGLISH_USAGE_PROBLEMS,
} from "@/data/english-usage";

export const metadata: Metadata = createPublicMetadata({
  title: "英単語フラッシュカード",
  description: "入試頻出英単語を反復して定着させるフラッシュカードです。",
  path: "/english/vocab",
});

export default function VocabPage() {
  return (
    <div className="english-academic relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <Link
          href="/english"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-emerald-600 hover:text-emerald-400 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          英語
        </Link>

        <header className="mt-6 mb-8">
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.25em]"
            style={{
              background: "rgba(16,185,129,0.07)",
              border: "1px solid rgba(16,185,129,0.22)",
              color: "#10b981",
            }}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Vocabulary · フラッシュカード
          </div>
          <h1
            className="font-display text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl"
          >
            英単語フラッシュカード
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            学術・社会・科学・ビジネス — 試験頻出語彙 B1〜C1 を反復で定着させる
          </p>
        </header>

        <VocabFlashcardGame />

        <section id="usage-practice" className="mt-12" aria-labelledby="usage-practice-title">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">Vocabulary &amp; Usage Practice</p>
          <h2 id="usage-practice-title" className="mt-2 text-3xl font-extrabold text-slate-950">語彙・語法演習 40問</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">文脈、言い換え、語形、コロケーション、動詞語法、会話表現を採点付きで練習します。</p>
          <div className="mt-8 space-y-8">
            {Object.entries(ENGLISH_USAGE_AREA_META).map(([area, meta]) => {
              const problems = ENGLISH_USAGE_PROBLEMS.filter((problem) => problem.area === area);
              return <div key={area}><h3 className="text-lg font-bold text-slate-900">{meta.label}</h3><ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">{problems.map((problem) => <li key={problem.id}><Link href={`/english/vocab/${problem.slug}`} className="flex min-h-14 items-center justify-between gap-3 p-4 hover:bg-blue-50"><span className="min-w-0 break-words font-semibold text-slate-900">{problem.title}</span><span className="shrink-0 text-xs text-slate-500">{ENGLISH_USAGE_DIFFICULTY_LABEL[problem.difficulty]}・約{problem.estimatedTime}秒</span></Link></li>)}</ul></div>;
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
