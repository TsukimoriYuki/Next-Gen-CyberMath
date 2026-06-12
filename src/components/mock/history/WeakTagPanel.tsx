import Link from "next/link";
import { Lightbulb, BookOpen, ArrowRight } from "lucide-react";
import type { WeakTag, RecommendedLesson } from "@/lib/history";
import { tagColor, tagSlug } from "@/data/tags";

interface Props {
  weakTags: WeakTag[];
  lessons: RecommendedLesson[];
}

export function WeakTagPanel({ weakTags, lessons }: Props) {
  const maxCount = weakTags[0]?.count ?? 1;

  return (
    <section className="glass glow-magenta rounded-2xl p-5">
      <h2 className="mb-1 flex items-center gap-2 font-display text-sm font-bold tracking-wide text-neon-magenta">
        <Lightbulb className="h-4 w-4" />
        弱点タグと、おすすめの復習講座
      </h2>
      <p className="mb-4 text-xs text-muted-foreground">
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
                  className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs transition-transform hover:-translate-y-0.5"
                  style={{
                    color: c,
                    borderColor: `color-mix(in oklch, ${c} 50%, transparent)`,
                    background: `color-mix(in oklch, ${c} ${Math.round(intensity * 100)}%, transparent)`,
                    fontWeight: i === 0 ? 700 : 500,
                  }}
                >
                  #{w.tag}
                  <span className="text-[10px] opacity-70">×{w.count}</span>
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
                  className="glass glass-hover group rounded-xl p-4"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-display text-sm font-bold text-foreground">
                      <BookOpen className="h-4 w-4 shrink-0 text-neon-cyan" />
                      {rec.lesson.title}
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  {rec.lesson.summary && (
                    <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
                      {rec.lesson.summary}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {rec.matchedTags.map((t) => {
                      const c = tagColor(t);
                      return (
                        <span
                          key={t}
                          className="rounded-full px-2 py-0.5 font-mono text-[10px]"
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
            <p className="text-xs text-muted-foreground">
              弱点タグに直接対応する講座が見つかりませんでした。上のタグから関連問題を復習しましょう。
            </p>
          )}
        </>
      )}
    </section>
  );
}
