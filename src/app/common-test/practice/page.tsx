import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, ListChecks } from "lucide-react";
import { SECTION_PRACTICE_EXAMS } from "@/data/common-test/section-practice";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "大問型演習",
  description:
    "第1問前半（数と式・集合と命題）を中心に、誘導のある大問1問分の演習を、対応する中核講義とセットで練習できます。",
  alternates: { canonical: "/common-test/practice" },
  openGraph: {
    title: `大問型演習 | ${SITE_NAME}`,
    description: "誘導のある大問1問分の演習を、中核講義とセットで練習する。",
    url: "/common-test/practice",
  },
};

export default function SectionPracticeIndexPage() {
  const grouped = new Map<string, typeof SECTION_PRACTICE_EXAMS>();
  for (const exam of SECTION_PRACTICE_EXAMS) {
    const unit = exam.sections[0]?.unit ?? "その他";
    const list = grouped.get(unit) ?? [];
    list.push(exam);
    grouped.set(unit, list);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/common-test"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
      >
        <ArrowLeft className="h-4 w-4" />
        共通テスト対策室へ戻る
      </Link>

      <header className="mt-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          <ListChecks className="h-3.5 w-3.5" />
          Section Practice
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          大問型演習
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          冊子型模試（PDF正本）とは別に、第1問前半（数と式・集合と命題）を中心とした、誘導のある大問1問分の
          演習です。小問集合ではなく、実際の大問と同じように前の空欄の結果を次の空欄で使う構成にしています。
          解いたあとは、対応する中核講義へ戻って復習できます。
        </p>
      </header>

      {Array.from(grouped.entries()).map(([unit, exams]) => (
        <section key={unit} className="mt-8">
          <h2 className="font-display text-lg font-bold text-foreground">{unit}</h2>
          <div className="mt-3 space-y-3">
            {exams.map((exam) => {
              const section = exam.sections[0];
              return (
                <Link
                  key={exam.id}
                  href={`/common-test/practice/${exam.id}`}
                  className="block rounded-2xl border border-border/70 bg-card/70 p-5 transition hover:border-neon-cyan/40"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                      <Clock className="h-3 w-3" />
                      {exam.durationMinutes}分目安
                    </span>
                    <span className="rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                      {exam.totalPoints}点
                    </span>
                    <span className="rounded-full border border-white/10 bg-background/40 px-2.5 py-0.5">
                      {section?.questions.length ?? 0}問
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground">{exam.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{section?.theme}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-neon-cyan">
                    演習を始める
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      <section className="mt-10 rounded-2xl border border-border/70 bg-card/70 p-5">
        <h2 className="font-display text-lg font-bold text-foreground">対応する中核講義</h2>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          判断フローや代表例題を先に確認したい場合は、
          <Link href="/common-test/lectures/numbers-expressions-core-skills" className="mx-1 text-neon-cyan hover:underline">
            数と式 徹底講座
          </Link>
          、
          <Link href="/common-test/lectures/sets-logic-necessary-sufficient" className="mx-1 text-neon-cyan hover:underline">
            集合と命題 判定講座
          </Link>
          を先に読んでから演習に進むこともできます。
        </p>
      </section>
    </div>
  );
}
