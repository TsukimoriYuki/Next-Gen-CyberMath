import type { Metadata } from "next";
import Link from "next/link";
import { ELEMENTARY_EXPANSION_WAVE_2 } from "@/data/elementary/expansion-wave-2";
import { ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS } from "@/data/elementary/problems/expansion-wave-2";
import { getElementaryLessonById, getElementaryUnitById } from "@/lib/elementary-lessons";
import styles from "../content-inventory/ContentInventory.module.css";

export const metadata: Metadata = {
  title: "小学3年生 算数 expansion wave 2",
  description: "人間レビュー前の算数教材を確認する内部ページです。",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ElementaryExpansionWaveTwoPage() {
  const lessons = ELEMENTARY_EXPANSION_WAVE_2.lessonIds.flatMap((id) => {
    const lesson = getElementaryLessonById(id);
    if (!lesson) return [];
    const unit = getElementaryUnitById(lesson.unitId);
    return unit ? [{ lesson, unit }] : [];
  });
  const typeCounts = Object.freeze({
    single: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "single-choice").length,
    multiple: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "multiple-choice").length,
    numeric: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.type === "numeric-input").length,
  });
  const difficultyCounts = Object.freeze({
    basic: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.difficulty === "basic").length,
    standard: ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.filter((problem) => problem.difficulty === "standard").length,
  });

  return (
    <div className={styles.page} data-testid="elementary-expansion-wave-2" data-text-audience="developer">
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL REVIEW CANDIDATE</p>
        <h1>小学3年生 算数 expansion wave 2</h1>
        <p>developer / guardian向けの内部確認ページです。新規教材はhiddenで、人間による内容確認と明示承認の前です。</p>
      </header>

      <section className={styles.section} aria-labelledby="wave-two-status-heading">
        <h2 id="wave-two-status-heading">状態と件数</h2>
        <dl className={styles.definitionGrid}>
          <div><dt>公開状態</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.publicationStatus}</dd></div>
          <div><dt>技術QA</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.technicalQaStatus}</dd></div>
          <div><dt>人間レビュー</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.humanReviews.math}</dd></div>
          <div><dt>公開承認</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.explicitReleaseApproval}</dd></div>
          <div><dt>新規単元</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.unitIds.length}単元</dd></div>
          <div><dt>新規講座</dt><dd>{lessons.length}講座</dd></div>
          <div><dt>新規問題</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2_PROBLEMS.length}問</dd></div>
          <div><dt>新規教材画像</dt><dd>{ELEMENTARY_EXPANSION_WAVE_2.assetIds?.length ?? 0}件</dd></div>
          <div><dt>問題形式</dt><dd>単一選択{typeCounts.single}・複数選択{typeCounts.multiple}・数値入力{typeCounts.numeric}</dd></div>
          <div><dt>むずかしさ</dt><dd>基本{difficultyCounts.basic}・標準{difficultyCounts.standard}</dd></div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="wave-two-lessons-heading">
        <h2 id="wave-two-lessons-heading">開発環境で確認する10講座</h2>
        <div className={styles.subjectGrid}>
          {lessons.map(({ lesson, unit }) => (
            <article className={styles.subjectCard} key={lesson.id}>
              <h3>{lesson.id}</h3>
              <p>8問・coverage partial・人間レビュー前</p>
              <Link href={`/elementary/grade-3/math/units/${unit.slug}/lessons/${lesson.slug}`}>講座を確認する</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="wave-two-review-heading">
        <h2 id="wave-two-review-heading">次の人間レビュー</h2>
        <p>計算、図との対応、学年のはんい、子ども向け文、保護者説明、公開判断を実画面で確認します。技術QAの完了は、教材内容の承認を意味しません。</p>
      </section>
    </div>
  );
}
