import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ListChecks } from "lucide-react";
import { QUALITY_ROADMAP, type RoadmapStatus } from "@/data/quality-roadmap";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "教材ロードマップ",
  description:
    "AIによる問題の大量生成ではなく、中核教材の手動監修を優先するための、次に仕上げるべき教材の優先順位一覧です。",
  alternates: { canonical: "/quality/roadmap" },
  openGraph: {
    title: `教材ロードマップ | ${SITE_NAME}`,
    description: "次に手動で仕上げるべき教材の優先順位一覧。",
    url: "/quality/roadmap",
  },
};

const STATUS_LABEL: Record<RoadmapStatus, string> = {
  todo: "未着手",
  "in-progress": "作業中",
  done: "完了",
};

const STATUS_CLASS: Record<RoadmapStatus, string> = {
  todo: "bg-slate-100 text-slate-600",
  "in-progress": "bg-amber-50 text-amber-700",
  done: "bg-emerald-50 text-emerald-700",
};

export default function QualityRoadmapPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/quality"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        教材・品質方針へ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          <ListChecks className="h-3.5 w-3.5" />
          Roadmap
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          教材ロードマップ
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {SITE_NAME}が「鉄緑会級」を目指すうえで次に必要なのは、機能追加や問題の量産ではなく、
          中核となる教材を手動で仕上げることだと考えています。以下は、その優先順位です。
          未完成を隠すのではなく、改善の方向性として公開しています。
        </p>
      </header>

      <div className="mt-8 space-y-3">
        {QUALITY_ROADMAP.map((item) => (
          <div key={item.priority} className="rounded-2xl border border-border/70 bg-card/70 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-neon-cyan">#{item.priority}</span>
              <span className="rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5 text-[11px] font-bold text-muted-foreground">
                {item.category}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${STATUS_CLASS[item.status]}`}>
                {STATUS_LABEL[item.status]}
              </span>
            </div>
            <h2 className="mt-2 font-display text-lg font-bold text-foreground">{item.title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.summary}</p>
          </div>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-border/70 bg-card/70 p-5">
        <h2 className="font-display text-lg font-bold text-foreground">進捗の確認</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          個々の修正履歴は
          <Link href="/quality/changelog" className="mx-1 text-neon-cyan hover:underline">
            更新履歴
          </Link>
          に、現在の公開問題数・QA項目は
          <Link href="/quality/checklist" className="mx-1 text-neon-cyan hover:underline">
            公開QAチェックリスト
          </Link>
          にまとめています。
        </p>
      </section>
    </div>
  );
}
