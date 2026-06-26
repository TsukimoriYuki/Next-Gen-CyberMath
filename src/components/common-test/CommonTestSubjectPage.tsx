// Server Component - 科目別ページの共通レイアウト
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ClipboardList,
  LineChart,
  Target,
} from "lucide-react";
import type { CommonTestSubject } from "@/data/common-test";
import { CommonTestSectionGrid } from "./CommonTestSectionGrid";
import { getCommonTestExamQuestions } from "@/lib/common-test-exams";

interface Props {
  subject: CommonTestSubject;
}

export function CommonTestSubjectPage({ subject }: Props) {
  const {
    theme,
    title,
    examMinutes,
    targetScoreDefault,
    estimatedScoreMock,
    description,
    sections,
    scoreRoutes,
  } = subject;
  const gap = targetScoreDefault - estimatedScoreMock;
  const prioritySection = getPrioritySection(subject);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          href="/common-test"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          共通テスト対策室に戻る
        </Link>

        <header className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Badge icon={<BookOpen className="h-3.5 w-3.5" />} color={theme.primary}>
              数学特化の大問攻略
            </Badge>
            <Badge icon={<Clock className="h-3.5 w-3.5" />}>
              本番 {examMinutes}分
            </Badge>
            <Badge icon={<Target className="h-3.5 w-3.5" />}>
              目標 {targetScoreDefault}点
            </Badge>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_280px] lg:items-end">
            <div>
              <p className="text-xs font-semibold text-slate-500">
                目標点から逆算して、優先大問を決める
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
                {title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                {description}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>現在の目安</span>
                <span>目標との差</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-3xl font-extrabold text-slate-950">
                  {estimatedScoreMock}
                  <span className="ml-1 text-sm font-semibold text-slate-500">点</span>
                </div>
                <div
                  className={`text-2xl font-extrabold ${
                    gap > 0 ? "text-amber-600" : "text-emerald-600"
                  }`}
                >
                  {gap > 0 ? `+${gap}` : gap}
                </div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: `${Math.min(100, estimatedScoreMock)}%` }}
                />
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">
                まずは「あと何点」を確認し、最短で埋められる大問から練習します。
              </p>
            </div>
          </div>
        </header>

        <section className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-bold text-blue-700">次にやるべき大問</div>
              <h2 className="mt-1 text-lg font-extrabold text-slate-950">
                第{prioritySection.number}問：{prioritySection.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {getPriorityReason(subject.id, prioritySection.number)}
              </p>
            </div>
            <Link
              href={`${subject.route}/section-${prioritySection.number}`}
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              第{prioritySection.number}問を{prioritySection.recommendedMinutes}分練習する
            </Link>
          </div>
        </section>

        <section className="mt-8">
          <SectionTitle
            icon={<ClipboardList className="h-5 w-5" />}
            title="大問別ドリル"
            description="配点・目標時間・優先度を見て、今の得点差を埋める順に練習します。"
          />
          <CommonTestSectionGrid sections={sections} theme={theme} subjectId={subject.id} />
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <ExamSimulatorCard subject={subject} />
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <SectionTitle
              compact
              icon={<LineChart className="h-5 w-5" />}
              title="得点帯別の進め方"
              description="目標点に合わせて、練習する大問の優先順位を調整します。"
            />
            <div className="mt-4 space-y-3">
              {scoreRoutes.map((route) => (
                <div
                  key={route.targetScore}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-bold text-slate-900">{route.label}</div>
                    <div
                      className="rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: `rgba(${hexToRgb(route.accent)},0.12)`,
                        color: route.accent,
                      }}
                    >
                      {route.targetScore}点
                    </div>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {route.strategy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Badge({
  children,
  icon,
  color = "#2563eb",
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
      style={{
        borderColor: `rgba(${hexToRgb(color)},0.22)`,
        background: `rgba(${hexToRgb(color)},0.08)`,
        color,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

function SectionTitle({
  icon,
  title,
  description,
  compact = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "" : "mb-4"}>
      <div className="flex items-center gap-2 text-slate-950">
        <span className="text-blue-600">{icon}</span>
        <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      </div>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function ExamSimulatorCard({ subject }: { subject: CommonTestSubject }) {
  const examId =
    subject.id === "math-1a"
      ? "math-1a-70"
      : subject.id === "math-2bc"
        ? "math-2bc-70"
        : "english-reading-80";
  const questions = getCommonTestExamQuestions(examId);
  const sectionCount = new Set(questions.map((q) => q.sectionId)).size;

  return (
    <Link
      href={`/common-test/simulator/${examId}`}
      className="group rounded-2xl border border-blue-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-extrabold text-blue-700">
          {subject.examMinutes}分
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
            本番演習
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-slate-950">
            {subject.examMinutes}分で本番形式を解く
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {sectionCount}大問・{questions.length}問を本番形式で解き、時間内スコアと時間外スコアの差を確認します。
          </p>
        </div>
        <span className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition group-hover:bg-blue-700">
          {subject.examMinutes}分で本番演習する
        </span>
      </div>
    </Link>
  );
}

function hexToRgb(hex: string): string {
  const m = hex.match(/^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return "37,99,235";
  return `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
}

function getPrioritySection(subject: CommonTestSubject): CommonTestSubject["sections"][number] {
  if (subject.id === "math-1a") {
    return subject.sections.find((section) => section.number === 1) ?? subject.sections[0];
  }
  if (subject.id === "math-2bc") {
    return subject.sections.find((section) => section.number === 2) ?? subject.sections[0];
  }
  return subject.sections[0];
}

function getPriorityReason(subjectId: string, sectionNumber: number): string {
  if (subjectId === "math-1a" && sectionNumber === 1) {
    return "図形と計量・命題は得点効率が高く、誘導読解の練習にもなります。";
  }
  if (subjectId === "math-2bc" && sectionNumber === 2) {
    return "微分積分は時間内に取り切る価値が高く、計算精度の改善が点数に直結します。";
  }
  return "現在の目標差を埋めるために、短時間で確認しやすい大問です。";
}
