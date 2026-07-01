import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, History } from "lucide-react";
import { QUALITY_CHANGELOG } from "@/data/quality-status";

export const metadata: Metadata = {
  title: "更新履歴",
  description: "Cyber Mathの品質・表示に関する修正履歴です。",
  alternates: { canonical: "/quality/changelog" },
  openGraph: {
    title: "更新履歴 | Cyber Math",
    description: "品質・表示に関する修正履歴。",
    url: "/quality/changelog",
  },
};

export default function QualityChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/quality/checklist"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        公開QAチェックリストへ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          Changelog
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          更新履歴
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          品質・表示まわりの主な修正を新しい順に記録しています。細かな文言修正まで全ては載せていません。
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {QUALITY_CHANGELOG.map((entry) => (
          <section
            key={entry.date}
            className="rounded-2xl border border-border/70 bg-card/70 p-5"
          >
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-neon-cyan">
              <History className="h-4 w-4" />
              {entry.date}
            </div>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
              {entry.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-neon-cyan/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
