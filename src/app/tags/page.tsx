import type { Metadata } from "next";
import Link from "next/link";
import { Hash } from "lucide-react";
import { getAllTags } from "@/lib/content";
import { tagColor, tagSlug } from "@/data/tags";

export const metadata: Metadata = {
  title: "概念タグ",
  description: "概念タグで問題と授業を横断する。知識のネットワーク。",
};

export default function TagsIndexPage() {
  const tags = getAllTags();
  const max = Math.max(1, ...tags.map((t) => t.total));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em] text-neon-cyan">
          <Hash className="h-3.5 w-3.5" />
          Concept Tags
        </div>
        <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight">
          概念で横断する
        </h1>
        <p className="mt-2 text-muted-foreground">
          単元の壁を越えて、同じ「考え方」でつながる問題と授業をたどる。
        </p>
      </header>

      <div className="mt-10 flex flex-wrap items-center gap-2.5">
        {tags.map(({ tag, total }) => {
          const color = tagColor(tag);
          // 使用頻度でフォントサイズを変える（0.85rem〜1.5rem）。
          const size = 0.85 + (total / max) * 0.65;
          return (
            <Link
              key={tag}
              href={`/tags/${tagSlug(tag)}`}
              className="rounded-full border px-3 py-1 font-mono transition-transform hover:-translate-y-0.5"
              style={{
                color,
                fontSize: `${size}rem`,
                borderColor: `color-mix(in oklch, ${color} 35%, transparent)`,
                background: `color-mix(in oklch, ${color} 7%, transparent)`,
              }}
            >
              #{tag}
              <span className="ml-1.5 text-[0.65em] opacity-60">{total}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
