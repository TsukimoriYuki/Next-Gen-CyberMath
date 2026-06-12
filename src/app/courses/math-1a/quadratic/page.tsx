import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft, Clock, Target } from "lucide-react";
import { getCourseUnit } from "@/data/course-curriculum";
import { COURSE_LEVEL_META, type CourseLevel, type CourseLesson } from "@/types/course";
import { CourseLessonBlockRenderer } from "@/components/courses/CourseLessonBlockRenderer";
import { CourseBodyRenderer } from "@/components/courses/CourseBodyRenderer";

export const metadata: Metadata = {
  title: "二次関数 講座",
  description: "放物線の形から解の配置まで。初学者・中級者・上級者の3段階で二次関数を完全攻略する。",
};

export default function QuadraticCoursePage() {
  const unit = getCourseUnit("math-1a", "quadratic");
  if (!unit) notFound();

  const levels = ["beginner", "standard", "advanced"] as const;

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      {/* グリッドオーバーレイ */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 480px)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 480px)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        {/* パンくず */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/courses" className="hover:text-blue-600">講座一覧</Link>
          <span>/</span>
          <Link href="/courses/math-1a" className="hover:text-blue-600">数学IA</Link>
          <span>/</span>
          <span className="font-bold text-slate-900">{unit.unitTitle}</span>
        </div>

        {/* ヘッダー */}
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
              数学IA / Math 1A
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {unit.unitTitle}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">{unit.unitDescription}</p>
        </div>

        {/* レベルナビ（アンカーリンク） */}
        <div className="mb-8 flex flex-wrap gap-2">
          {levels.map((level) => {
            const m = COURSE_LEVEL_META[level];
            const count = unit.lessons.filter((l) => l.level === level).length;
            return (
              <a
                key={level}
                href={`#level-${level}`}
                className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-colors hover:opacity-80"
                style={{ borderColor: m.border, background: m.bg, color: m.color }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: m.dot }} />
                {m.label}
                <span className="rounded-full px-1.5 py-0.5 font-mono text-[10px]"
                  style={{ background: `${m.color}1a` }}>
                  {count}
                </span>
              </a>
            );
          })}
        </div>

        {/* 各レベルのセクション */}
        <div className="space-y-10">
          {levels.map((level) => {
            const m = COURSE_LEVEL_META[level];
            const levelLessons = unit.lessons.filter((l) => l.level === level);
            if (levelLessons.length === 0) return null;

            return (
              <section key={level} id={`level-${level}`}>
                {/* レベルヘッダー */}
                <div
                  className="mb-4 flex items-center gap-3 rounded-xl border p-4"
                  style={{ borderColor: m.border, background: m.bg }}
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: m.dot }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-extrabold" style={{ color: m.color }}>
                        {m.label}講座
                      </h2>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: m.color, opacity: 0.6 }}>
                        {m.sublabel}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600">{m.description}</p>
                  </div>
                </div>

                {/* 講座カード */}
                <div className="space-y-4">
                  {levelLessons.map((lesson, idx) => (
                    <LessonCard key={lesson.lessonId} lesson={lesson} index={idx + 1} levelMeta={m} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* 演習への導線 */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-1 text-sm font-bold text-slate-900">演習・模試・復習へ</h3>
          <p className="mb-4 text-xs text-slate-500">
            講座で学んだ内容を、実際の問題で確認しましょう。
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "大問別ドリル（数学IA）", href: "/common-test/math-1a", desc: "単元別 演習" },
              { label: "本番演習", href: "/common-test/simulator", desc: "共通テスト形式" },
              { label: "段階復習", href: "/common-test/review", desc: "弱点を反復" },
              { label: "類題演習（Variant Practice）", href: "/common-test/review", desc: "AI生成の類題" },
              { label: "弱点攻略（Weakness Boss）", href: "/common-test/weakness", desc: "苦手単元を集中的に" },
              { label: "Daily Playlist", href: "/common-test/daily", desc: "今日の学習プラン" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs transition-colors hover:bg-blue-50 hover:border-blue-200"
              >
                <ArrowRight className="h-3 w-3 shrink-0 text-blue-500" />
                <span>
                  <span className="font-bold text-slate-700">{link.label}</span>
                  <span className="ml-1 text-slate-400">{link.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 戻るリンク */}
        <div className="mt-6">
          <Link
            href="/courses/math-1a"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            <ChevronLeft className="h-4 w-4" />
            数学IA 講座一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── 講座カードコンポーネント ──────────────────────────────────────────────

function LessonCard({
  lesson,
  index,
  levelMeta,
}: {
  lesson: CourseLesson;
  index: number;
  levelMeta: (typeof COURSE_LEVEL_META)[CourseLevel];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* 上部アクセントライン */}
      <div className="h-0.5 w-full" style={{ background: levelMeta.color }} />

      <div className="p-5">
        {/* 講座ヘッダー */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold"
                style={{ background: `${levelMeta.color}14`, color: levelMeta.color }}
              >
                {index}
              </span>
              <h3 className="text-base font-extrabold text-slate-900">{lesson.lessonTitle}</h3>
            </div>
            <CourseBodyRenderer
              body={lesson.lessonDescription}
              className="mt-1 text-xs leading-relaxed text-slate-500"
            />
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-500">
              <Clock className="h-3 w-3" />
              約 {lesson.estimatedMinutes} 分
            </span>
          </div>
        </div>

        {/* 目標 */}
        {lesson.goals.length > 0 && (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs font-bold text-slate-700">この講座で身につくこと</span>
            </div>
            <ul className="space-y-1">
              {lesson.goals.map((goal, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                  <CourseBodyRenderer body={goal} className="flex-1 text-xs text-slate-600" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* レッスンブロック */}
        <div className="space-y-3">
          {lesson.lessonBlocks.map((block, i) => (
            <CourseLessonBlockRenderer key={i} block={block} />
          ))}
        </div>

        {/* 確認問題 */}
        {lesson.checkQuestions.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-700">確認問題</h4>
            {lesson.checkQuestions.map((q, i) => (
              <div key={i} className="rounded-xl border border-rose-200 bg-rose-50 p-3">
                <CourseBodyRenderer
                  body={q.question}
                  className="text-xs font-bold text-slate-800"
                />
                <details className="mt-2">
                  <summary className="cursor-pointer text-[11px] font-semibold text-rose-600 hover:text-rose-700">
                    答えを見る
                  </summary>
                  <div className="mt-1.5">
                    <CourseBodyRenderer body={q.answer} className="text-xs text-slate-600" />
                  </div>
                  {q.hint && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      ヒント: {q.hint}
                    </p>
                  )}
                </details>
              </div>
            ))}
          </div>
        )}

        {/* 関連演習リンク */}
        {lesson.relatedPracticeLinks.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {lesson.relatedPracticeLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-600 transition-colors hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700"
              >
                <ArrowRight className="h-3 w-3 text-blue-400" />
                {link.label}
                {link.description && (
                  <span className="text-slate-400">— {link.description}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
