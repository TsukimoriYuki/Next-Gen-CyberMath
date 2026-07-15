import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, FileText, FlaskConical } from "lucide-react";
import { SubjectPublicationNotice } from "@/components/learning/SubjectPublicationNotice";
import { COMMON_TEST_MATH_1A_AI_PROTOTYPE_001 } from "@/data/common-test-mock-exams";
import { resolveTopLevelSubjectId } from "@/lib/subject-publication";
import { requireSubjectPageAccess } from "@/lib/subject-route-guard";

export const metadata: Metadata = {
  title: "共通テスト型 数学I・数学A 試作版",
  description:
    "この旧試作版は公開導線から外しています。共通テスト型本番模試はオリジナル模試 第1回を利用してください。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CommonTestMath1APrototypePage() {
  const subjectId = resolveTopLevelSubjectId(
    COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.subject,
  );
  if (!subjectId) notFound();

  // The legacy URL remains a public redirect in production. Its draft content
  // is only inspectable in local development.
  const redirectAccess = requireSubjectPageAccess(subjectId, "exams", {
    resourcePublished: true,
  });
  if (redirectAccess.runtime !== "development") {
    redirect("/common-test/simulator/common-test-math-1a-manual-001");
  }

  const resourcePublished =
    COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.status === "published" &&
    COMMON_TEST_MATH_1A_AI_PROTOTYPE_001.devOnly !== true;
  const access = requireSubjectPageAccess(subjectId, "exams", {
    resourcePublished,
  });

  return (
    <>
      <SubjectPublicationNotice access={access} />
      <div className="min-h-screen bg-stone-50 px-4 py-10 text-slate-950">
        <div className="mx-auto max-w-2xl border border-stone-300 bg-white p-6 shadow-sm">
          <Link
            href="/common-test/simulator"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            模試一覧へ戻る
          </Link>

          <div className="mt-6 inline-flex items-center gap-2 border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-extrabold text-amber-800">
            <FlaskConical className="h-4 w-4" />
            試作版・非公開
          </div>
          <h1 className="mt-4 text-2xl font-black tracking-normal">
            このAI生成模試は公開用の本番模試ではありません
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            旧URLの `common-test-math-1a-mock-001`
            は、低品質なAI生成試作版として公開導線から外しました。
            共通テスト型本番模試として最初に触れるページは、PDF本文を正本として転記したオリジナル模試
            第1回です。
          </p>
          <Link
            href="/common-test/simulator/common-test-math-1a-manual-001"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-blue-700 px-4 py-3 text-sm font-extrabold text-white hover:bg-blue-800"
          >
            <FileText className="h-4 w-4" />
            オリジナル模試 第1回へ進む
          </Link>
        </div>
      </div>
    </>
  );
}
