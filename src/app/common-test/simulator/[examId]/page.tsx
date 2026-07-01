import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { getCommonTestExamPreset, resolveExamPresetMeta } from "@/data/common-test-exams";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";
import { CommonTestExamRunner } from "@/components/common-test/exam/CommonTestExamRunner";

interface Props {
  params: Promise<{ examId: string }>;
}

const SUBJECT_ROUTE: Record<string, string> = {
  "math-1a": "/common-test/math-1a",
  "math-2bc": "/common-test/math-2bc",
  "english-reading": "/common-test/english-reading",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { examId } = await params;
  const preset = getCommonTestExamPreset(examId);
  if (!preset) return { title: "Not Found" };
  const meta = resolveExamPresetMeta(preset);
  if (meta.status !== "public") {
    return {
      title: `${preset.title}（旧試作版・非公開）`,
      description: "この演習は旧試作版のため、公開の本番模試としては扱っていません。",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${preset.title} — EXAM SIMULATOR`,
    description: preset.description,
  };
}

export default async function ExamPage({ params }: Props) {
  const { examId } = await params;
  const preset = getCommonTestExamPreset(examId);
  if (!preset) notFound();

  const meta = resolveExamPresetMeta(preset);

  if (meta.status !== "public") {
    // 数学IAの旧プリセットは、手動作成PDF正本の本番模試へ一本化する。
    if (preset.subjectId === "math-1a") {
      redirect("/common-test/simulator/common-test-math-1a-manual-001");
    }
    // 数学II・B・C・英語リーディングにはまだ手動作成PDF版が無いため、
    // 本番模試のふりをさせず、旧試作版であることを明示した案内だけを表示する。
    return <LegacyPresetNotice title={preset.title} subjectRoute={SUBJECT_ROUTE[preset.subjectId]} />;
  }

  const questions = getCommonTestExamQuestions(examId);
  if (questions.length === 0) notFound();

  return <CommonTestExamRunner preset={preset} questions={questions} />;
}

function LegacyPresetNotice({
  title,
  subjectRoute,
}: {
  title: string;
  subjectRoute?: string;
}) {
  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <Link
          href="/common-test/simulator"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          共通テスト型本番模試へ戻る
        </Link>

        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h1 className="text-xl font-black tracking-normal">
            この演習は旧試作版のため非公開です
          </h1>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            「{title}」は、公開の本番模試になる前段階のドリル束（旧試作版）です。
            本番模試としての品質基準（手動作成・監修済み）を満たしていないため、
            現在は公開の本番模試導線からは外しています。
          </p>
          {subjectRoute && (
            <Link
              href={subjectRoute}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              この科目の診断・ドリルを見る
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <Link
          href="/common-test/simulator/common-test-math-1a-manual-001"
          className="mt-4 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 hover:bg-blue-100"
        >
          <FileText className="h-4 w-4" />
          数学I・数学Aの本番模試（手動作成版）を見る
        </Link>
      </div>
    </main>
  );
}
