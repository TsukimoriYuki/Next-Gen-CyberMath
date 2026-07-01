import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProblem } from "@/lib/content";
import {
  getExamContextLabel,
  getProblemContextGuide,
  isCommonTestDifficulty,
} from "@/lib/special-lecture-guidance";
import { DifficultyBadge } from "@/components/shell/DifficultyBadge";

// 難度 A〜∞ を1問ずつ選んだ代表問題。メタ情報（この問題の核・出方）は
// getProblemContextGuide から実際の問題ページと同じロジックで取得するため、
// このショーケースと問題詳細ページの表示がズレることはない。
const SHOWCASE_ITEMS: { slug: string; problemType: string }[] = [
  { slug: "radian-arc-sector", problemType: "定義の運用" },
  { slug: "sine-synthesis-amplitude", problemType: "融合・最大最小" },
  { slug: "dojo-addition-formula-proof", problemType: "証明（定義に戻る）" },
  { slug: "dojo-tan1-irrational-dojo", problemType: "証明（背理法・帰納法）" },
  { slug: "tan-one-degree-irrational", problemType: "存在の証明" },
  { slug: "abyss-euler-log-sine", problemType: "特殊関数の積分" },
  { slug: "abyss-markov-equation", problemType: "整数論・競技数学" },
];

export function RepresentativeProblemShowcase() {
  const items = SHOWCASE_ITEMS.map(({ slug, problemType }) => {
    const problem = getProblem(slug);
    if (!problem) return null;
    const guide = getProblemContextGuide(problem);
    const contextLabel = getExamContextLabel(problem.difficulty);
    const contextBody = isCommonTestDifficulty(problem.difficulty)
      ? guide?.commonTestContext
      : guide?.advancedContext;
    return { problem, problemType, guide, contextLabel, contextBody };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  if (items.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-xl font-bold tracking-wide">代表問題サンプル</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        A（基礎）から ∞（競技数学・研究的数学）まで、難度ごとに1問ずつ実際の問題を掲載しています。単元・問題タイプ・身につく力・出方の位置づけは、各問題ページと同じロジックで生成しています。
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ problem, problemType, guide, contextLabel, contextBody }) => (
          <Link
            key={problem.slug}
            href={`/problems/${problem.slug}`}
            className="washi washi-hover group flex flex-col rounded-2xl p-5"
          >
            <div className="flex flex-wrap items-center gap-2">
              <DifficultyBadge difficulty={problem.difficulty} withName />
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {problem.unit}
              </span>
            </div>

            <h3 className="mt-3 font-display text-base font-bold leading-snug text-foreground">
              {problem.title}
            </h3>
            <div className="mt-1 font-mono text-[11px] text-neon-cyan/80">{problemType}</div>

            <div className="mt-3 text-xs leading-6 text-muted-foreground">
              <span className="font-bold text-foreground/80">身につく力：</span>
              {guide?.masteryFocus ?? `${problem.unit}の条件を整理して、最初の一手を選ぶ`}
            </div>
            <div className="mt-2 text-xs leading-6 text-muted-foreground">
              <span className="font-bold text-foreground/80">{contextLabel}：</span>
              {contextBody ??
                (isCommonTestDifficulty(problem.difficulty)
                  ? "小問の誘導に沿って、条件整理から計算へ進む形で出やすい。"
                  : "共通テスト直接対策ではなく、発想力・証明力を鍛える拡張問題として位置づく。")}
            </div>

            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs font-semibold text-neon-cyan">
              問題を見る
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
