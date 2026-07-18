import type { Metadata } from "next";
import {
  buildElementarySegmentedContentInventory,
  getElementaryInventoryLabels,
} from "@/lib/elementary-inventory";
import styles from "./ContentInventory.module.css";

export const metadata: Metadata = {
  title: "小学生版 content inventory",
  description: "小学生版pilot教材の件数とcoverageを確認する内部ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const TYPE_LABELS = [
  ["単一選択", "singleChoiceCount"],
  ["複数選択", "multipleChoiceCount"],
  ["数値入力", "numericInputCount"],
] as const;

export default function ElementaryContentInventoryPage() {
  const segmented = buildElementarySegmentedContentInventory();
  const inventory = segmented.publishedBeta;
  const labels = getElementaryInventoryLabels();
  const totals = inventory.totals;

  return (
    <div className={styles.page} data-testid="elementary-content-inventory" data-text-audience="developer">
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL CONTENT INVENTORY</p>
        <h1>小学生版 content inventory</h1>
        <p>
          developer / guardian向けの内部確認ページです。小学3年生の正式pilot registryだけを集計し、
          開発用showcaseは含めません。
        </p>
      </header>

      <section className={styles.section} aria-labelledby="inventory-total-heading">
        <h2 id="inventory-total-heading">学校段階ごとの問題数</h2>
        <div className={styles.cardGrid}>
          <article className={styles.metricCard}><span>高校版</span><strong>1,348問</strong><p>従来の採点可能問題数</p></article>
          <article className={styles.metricCard}><span>小学生版・公開中</span><strong>{totals.problemCount}問</strong><p>限定βの小学3年生pilot</p></article>
          <article className={styles.metricCard}><span>公開中の全体</span><strong>{segmented.combinedProblemCounts.published.toLocaleString("ja-JP")}問</strong><p>高校版と公開中の小学生版</p></article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="inventory-segments-heading">
        <h2 id="inventory-segments-heading">公開範囲と登録範囲</h2>
        <div className={styles.cardGrid}>
          <article className={styles.metricCard}><span>publishedBeta</span><strong>{segmented.publishedBeta.totals.lessonCount}講座・{segmented.publishedBeta.totals.problemCount}問</strong><p>本番の限定βへ表示する範囲</p></article>
          <article className={styles.metricCard}><span>hiddenPilot</span><strong>{segmented.hiddenPilot.totals.lessonCount}講座・{segmented.hiddenPilot.totals.problemCount}問</strong><p>現在の非公開pilot教材</p></article>
          <article className={styles.metricCard}><span>registeredTotal</span><strong>{segmented.registeredTotal.totals.lessonCount}講座・{segmented.registeredTotal.totals.problemCount}問</strong><p>registryに登録された全体</p></article>
        </div>
        <p>登録ベースの高校版との合計は{segmented.combinedProblemCounts.registered.toLocaleString("ja-JP")}問です。公開中の合計とは分けて表示します。</p>
      </section>

      <section className={styles.section} aria-labelledby="inventory-grade-heading">
        <h2 id="inventory-grade-heading">{labels.grades["grade-3"]}</h2>
        <dl className={styles.definitionGrid}>
          <div><dt>教科</dt><dd>{inventory.subjects.length}教科</dd></div>
          <div><dt>単元</dt><dd>{totals.unitCount}単元</dd></div>
          <div><dt>講座</dt><dd>{totals.lessonCount}講座</dd></div>
          <div><dt>問題</dt><dd>{totals.problemCount}問</dd></div>
          <div><dt>承認済み教材画像</dt><dd>{totals.visualAssetCount}件</dd></div>
          <div><dt>公開状態</dt><dd>{totals.publicationStatus}</dd></div>
          <div><dt>review status</dt><dd>{totals.reviewStatus}</dd></div>
        </dl>
      </section>

      <section className={styles.section} aria-labelledby="inventory-subject-heading">
        <h2 id="inventory-subject-heading">教科別</h2>
        <div className={styles.subjectGrid}>
          {inventory.subjects.map((subject) => (
            <article key={`${subject.grade}:${subject.subject}`} className={styles.subjectCard} data-subject={subject.subject}>
              <h3>{subject.subject ? labels.subjects[subject.subject] : "未設定"}</h3>
              <dl>
                <div><dt>講座</dt><dd>{subject.lessonCount}講座</dd></div>
                <div><dt>問題</dt><dd>{subject.problemCount}問</dd></div>
                <div><dt>教材画像</dt><dd>{subject.visualAssetCount}件</dd></div>
                <div><dt>lesson coverage</dt><dd>partial {subject.lessonCoverage.partial}件</dd></div>
                <div><dt>assessment coverage</dt><dd>partial {subject.assessmentCoverage.partial}件</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="inventory-breakdown-heading">
        <h2 id="inventory-breakdown-heading">問題の内訳</h2>
        <div className={styles.twoColumn}>
          <article className={styles.detailCard}>
            <h3>問題形式</h3>
            <dl>{TYPE_LABELS.map(([label, key]) => <div key={key}><dt>{label}</dt><dd>{totals[key]}問</dd></div>)}</dl>
          </article>
          <article className={styles.detailCard}>
            <h3>難易度</h3>
            <dl>
              <div><dt>basic</dt><dd>{totals.basicCount}問</dd></div>
              <div><dt>standard</dt><dd>{totals.standardCount}問</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="inventory-curriculum-heading">
        <h2 id="inventory-curriculum-heading">curriculum参照とcoverage</h2>
        <dl className={styles.definitionGrid}>
          <div><dt>entry参照</dt><dd>{totals.curriculumEntryReferenceCount}件</dd></div>
          <div><dt>objective参照</dt><dd>{totals.curriculumObjectiveReferenceCount}件</dd></div>
          <div><dt>lesson coverage</dt><dd>partial {totals.lessonCoverage.partial}件、covered {totals.lessonCoverage.covered}件</dd></div>
          <div><dt>assessment coverage</dt><dd>partial {totals.assessmentCoverage.partial}件、covered {totals.assessmentCoverage.covered}件</dd></div>
        </dl>
      </section>
    </div>
  );
}
