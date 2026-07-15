import Link from "next/link";
import { Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import type { WeakTag, RecommendedLesson } from "@/lib/history";
import { tagColor, tagSlug } from "@/data/tags";

interface Props {
  weakTags: WeakTag[];
  lessons: RecommendedLesson[];
  headingLevel?: 2 | 3 | 4;
}

export function WeakTagPanel({ weakTags, lessons, headingLevel = 2 }: Props) {
  const maxCount = weakTags[0]?.count ?? 1;
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Heading className="mb-1 flex items-center gap-2 text-lg font-bold text-slate-950">
        <Lightbulb className="h-5 w-5 text-blue-700" />
        弱点タグと、おすすめの復習講座
      </Heading>
      <p className="mb-4 text-sm leading-6 text-slate-600">
        これまでに間違えた問題のタグを集計しました。よく間違える概念ほど大きく表示されます。
      </p>

      {weakTags.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          まだ弱点データがありません。模試を受けて自己採点すると、ここに集計されます。
        </p>
      ) : (
        <>
          {/* 弱点タグ（頻度で強調） */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {weakTags.map((w, i) => {
              const c = tagColor(w.tag);
              const intensity = 0.12 + (w.count / maxCount) * 0.28;
              return (
                <Link
                  key={w.tag}
                  href={`/tags/${tagSlug(w.tag)}`}
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors hover:bg-slate-50"
                  style={{
                    color: c,
                    borderColor: `color-mix(in oklch, ${c} 50%, transparent)`,
                    background: `color-mix(in oklch, ${c} ${Math.round(intensity * 100)}%, transparent)`,
                    fontWeight: i === 0 ? 700 : 500,
                  }}
                >
                  #{w.tag}
                  <span className="text-xs opacity-70">×{w.count}</span>
                </Link>
              );
            })}
          </div>

          {/* おすすめ講座 */}
          {lessons.length > 0 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {lessons.map((rec) => (
                <Link
                  key={rec.lesson.slug}
                  href={`/lessons/${rec.lesson.slug}`}
                  className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-950">
                      <BookOpen className="h-4 w-4 shrink-0 text-blue-700" />
                      {rec.lesson.title}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  {rec.lesson.summary && (
                    <p className="mb-2 line-clamp-2 text-sm text-slate-600">
                      {rec.lesson.summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {rec.matchedTags.map((t) => {
                      const c = tagColor(t);
                      return (
                        <span
                          key={t}
                          className="rounded-full px-2 py-0.5 text-xs font-medium"
                          style={{
                            color: c,
                            background: `color-mix(in oklch, ${c} 12%, transparent)`,
                          }}
                        >
                          #{t}
                        </span>
                      );
                    })}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">
              弱点タグに直接対応する講座が見つかりませんでした。上のタグから関連問題を復習しましょう。
            </p>
          )}
        </>
      )}
    </section>
  );
}
