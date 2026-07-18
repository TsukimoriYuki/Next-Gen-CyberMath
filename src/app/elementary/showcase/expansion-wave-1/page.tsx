import type { Metadata } from "next";
import Link from "next/link";
import { ELEMENTARY_EXPANSION_WAVE_1 } from "@/data/elementary/expansion-wave-1";
import { getElementaryLessonById, getElementaryUnitById } from "@/lib/elementary-lessons";
import styles from "../content-inventory/ContentInventory.module.css";

export const metadata: Metadata = {
  title: "小学3年生 expansion wave 1",
  description: "小学生版の次期教材候補を確認する内部ページです。",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const subjectSlug = (subject: string) => subject;

export default function ElementaryExpansionWaveOnePage() {
  const lessons = ELEMENTARY_EXPANSION_WAVE_1.lessonIds.flatMap((id) => {
    const lesson = getElementaryLessonById(id);
    if (!lesson) return [];
    const unit = getElementaryUnitById(lesson.unitId);
    return unit ? [{ lesson, unit }] : [];
  });
  const assetCount = new Set(lessons.flatMap(({ lesson }) => lesson.visualAssetIds)).size;
  const problemCount = lessons.reduce((total, { lesson }) => total + lesson.problemIds.length, 0);

  return (
    <div className={styles.page} data-testid="elementary-expansion-wave-1" data-text-audience="developer">
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL EXPANSION RELEASE RECORD</p>
        <h1>小学3年生 expansion wave 1</h1>
        <p>developer / guardian向けの内部確認ページです。教材は人間レビューと明示承認を経て限定βへ追加されましたが、この確認ページ自体はproductionで非公開です。</p>
      </header>

      <section className={styles.section} aria-labelledby="expansion-status-heading">
        <h2 id="expansion-status-heading">状態と件数</h2>
        <dl className={styles.definitionGrid}>
          <div><dt>公開状態</dt><dd>{ELEMENTARY_EXPANSION_WAVE_1.publicationStatus}</dd></div>
          <div><dt>候補状態</dt><dd>{ELEMENTARY_EXPANSION_WAVE_1.releaseStatus}</dd></div>
          <div><dt>明示承認</dt><dd>{ELEMENTARY_EXPANSION_WAVE_1.explicitReleaseApproval}</dd></div>
          <div><dt>自動公開</dt><dd>しない</dd></div>
          <div><dt>新規単元</dt><dd>{ELEMENTARY_EXPANSION_WAVE_1.unitIds.length}単元</dd></div>
          <div><dt>新規講座</dt><dd>{lessons.length}講座</dd></div>
          <div><dt>新規問題</dt><dd>{problemCount}問</dd></div>
          <div><dt>新規教材画像</dt><dd>{assetCount}件</dd></div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="expansion-lessons-heading">
        <h2 id="expansion-lessons-heading">開発環境で確認する講座</h2>
        <div className={styles.subjectGrid}>
          {lessons.map(({ lesson, unit }) => (
            <article className={styles.subjectCard} key={lesson.id}>
              <h3>{lesson.id}</h3>
              <p>{lesson.problemIds.length}問・{lesson.estimatedMinutes}分</p>
              <Link href={`/elementary/grade-3/${subjectSlug(lesson.subject)}/units/${unit.slug}/lessons/${lesson.slug}`}>
                講座を確認する
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="expansion-review-heading">
        <h2 id="expansion-review-heading">人間レビューの記録</h2>
        <dl className={styles.definitionGrid}>
          {Object.entries(ELEMENTARY_EXPANSION_WAVE_1.humanReviews).map(([area, status]) => (
            <div key={area}><dt>{area}</dt><dd>{status}</dd></div>
          ))}
        </dl>
        <p>算数・国語・社会の内容、保護者向け説明、公開判断は、ユーザー本人の実画面確認と明示承認を記録しています。AIによる承認ではありません。</p>
      </section>
    </div>
  );
}
