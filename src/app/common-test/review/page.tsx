import type { Metadata } from "next";
import { CommonTestReviewQueue } from "@/components/common-test/CommonTestReviewQueue";
import {
  LearningBreadcrumbs,
  LearningPageHeader,
  LearningPageShell,
} from "@/components/learning/LearningPageFrame";

export const metadata: Metadata = {
  title: "共通テスト復習キュー",
  description: "共通テスト対策の間隔反復復習キュー。弱点問題を自動スケジューリングして反復演習する。",
  robots: { index: false, follow: true },
};

export default function CommonTestReviewPage() {
  return (
    <LearningPageShell width="reading">
      <LearningBreadcrumbs
        items={[
          { label: "復習", href: "/review" },
          { label: "共通テスト", href: "/common-test" },
          { label: "復習キュー" },
        ]}
      />
      <LearningPageHeader
        eyebrow="共通テスト"
        title="復習キュー"
        description="間隔反復で弱点を定着させます。正解した問題は復習間隔を延ばし、間違えた問題は翌日から確認し直します。"
      />
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="review-cycle">
        <h2 id="review-cycle" className="text-lg font-bold text-slate-950">復習の間隔</h2>
        <ol className="mt-4 grid gap-2 sm:grid-cols-3">
          {["初回 → 翌日", "1回目 → 3日後", "2回目 → 7日後", "3回目 → 14日後", "4回目 → 克服済み"].map((label, index) => (
            <li key={label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <span className="mr-2 font-bold text-blue-700">{index + 1}</span>{label}
            </li>
          ))}
        </ol>
      </section>
      <div className="mt-8">
        <CommonTestReviewQueue />
      </div>
    </LearningPageShell>
  );
}
