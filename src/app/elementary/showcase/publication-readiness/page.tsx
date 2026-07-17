import type { Metadata } from "next";
import Link from "next/link";
import { buildElementaryPublicationReadiness } from "@/lib/elementary-readiness";
import type {
  ElementaryHumanReviewStatus,
  ElementaryReadinessCheck,
  ElementaryReadinessStatus,
} from "@/types/elementary-readiness";
import styles from "./PublicationReadiness.module.css";

export const metadata: Metadata = {
  title: "小学生版 publication readiness",
  description: "小学生版のβ公開準備を自動確認と人間確認に分けて確認する非公開ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

const STATUS_LABELS: Readonly<Record<ElementaryReadinessStatus, string>> = {
  pass: "✓ pass",
  warning: "△ warning",
  fail: "× fail",
  "not-applicable": "— not-applicable",
  "not-reviewed": "○ not-reviewed",
};

const HUMAN_REVIEW_LABELS: Readonly<Record<ElementaryHumanReviewStatus, string>> = {
  "not-reviewed": "not-reviewed",
  reviewed: "reviewed",
  approved: "approved",
  "changes-requested": "changes-requested",
};

const AREA_LABELS = {
  curriculum: "Curriculum",
  kanji: "学年別漢字・ふりがな",
  "lesson-quality": "講座品質",
  "problem-quality": "問題品質",
  "visual-assets": "画像・図",
  accessibility: "アクセシビリティ",
  responsive: "レスポンシブ",
  publication: "公開制御",
  privacy: "プライバシー",
  "child-safety": "子どもの安全・安心",
  "guardian-information": "保護者向け説明",
  "content-inventory": "コンテンツ集計",
  "technical-stability": "技術的安定性",
} as const;

function CheckCard({ check }: { check: ElementaryReadinessCheck }) {
  return (
    <article
      className={styles.checkCard}
      data-status={check.status}
      data-check-id={check.id}
      data-text-audience="developer"
    >
      <div className={styles.checkHeading}>
        <h3>{check.title}</h3>
        <span className={styles.statusText}>{STATUS_LABELS[check.status]}</span>
      </div>
      <p>{check.description}</p>
      <dl>
        <div><dt>area</dt><dd>{AREA_LABELS[check.area]}</dd></div>
        <div><dt>確認方法</dt><dd>{check.reviewKind === "automatic" ? "自動確認" : "人間確認"}</dd></div>
        <div><dt>evidence</dt><dd>{check.evidence}</dd></div>
        <div><dt>source</dt><dd><code>{check.sourceQa ?? check.source}</code></dd></div>
        {check.reviewKind === "manual" ? (
          <div>
            <dt>人間レビュー状態</dt>
            <dd>{HUMAN_REVIEW_LABELS[check.humanReview?.status ?? "not-reviewed"]}</dd>
          </div>
        ) : null}
      </dl>
      {check.humanReview ? <p className={styles.reviewNote}>{check.humanReview.note}</p> : null}
      {check.nextAction ? <p className={styles.nextAction}><strong>次の作業：</strong>{check.nextAction}</p> : null}
    </article>
  );
}

export default function ElementaryPublicationReadinessPage() {
  const readiness = buildElementaryPublicationReadiness();
  const automaticChecks = readiness.checks.filter((check) => check.reviewKind === "automatic");
  const manualChecks = readiness.checks.filter((check) => check.reviewKind === "manual");
  const unresolved = readiness.checks.filter(
    (check) => check.status === "warning" || check.status === "fail" || check.status === "not-reviewed",
  );
  const betaLabel = readiness.recommendation.beta === "recommend"
    ? "推奨可能"
    : readiness.recommendation.beta === "limited-beta-allowed"
      ? "限定beta可"
      : "まだ推奨しない";

  return (
    <div
      className={styles.page}
      data-testid="elementary-publication-readiness"
      data-text-audience="developer"
      data-page-audience="guardian developer"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL RELEASE REVIEW</p>
        <h1>小学生版 publication readiness</h1>
        <p>
          自動確認と人間確認を分けて、β公開準備を判定します。
          この結果はpublicationStatusを自動変更しません。
        </p>
      </header>

      <section className={styles.section} aria-labelledby="readiness-summary">
        <h2 id="readiness-summary">総合判定</h2>
        <div className={styles.summaryGrid}>
          <article><span>現在の状態</span><strong>{STATUS_LABELS[readiness.overallStatus]}</strong></article>
          <article><span>β公開</span><strong>{betaLabel}</strong></article>
          <article><span>正式公開</span><strong>{readiness.recommendation.formal === "recommend" ? "推奨可能" : "まだ推奨しない"}</strong></article>
          <article><span>publicationStatus</span><strong>{readiness.publicationStatus}</strong></article>
        </div>
        <p className={styles.holdNotice}>
          ユーザー本人の判断は限定beta可です。ただし小学3年生全体対応ではなく、
          正式公開はまだ推奨しません。publicationStatusはhiddenを維持します。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="readiness-inventory">
        <h2 id="readiness-inventory">教材と判定内訳</h2>
        <dl className={styles.metricGrid}>
          <div><dt>正式pilot lesson</dt><dd>{readiness.lessonCount}講座</dd></div>
          <div><dt>採点可能problem</dt><dd>{readiness.problemCount}問</dd></div>
          <div><dt>pass</dt><dd>{readiness.counts.pass}件</dd></div>
          <div><dt>warning</dt><dd>{readiness.counts.warning}件</dd></div>
          <div><dt>fail</dt><dd>{readiness.counts.fail}件</dd></div>
          <div><dt>not-reviewed</dt><dd>{readiness.counts["not-reviewed"]}件</dd></div>
        </dl>
        <p><Link className={styles.link} href="/elementary/showcase/content-inventory">content inventoryの詳細を確認する</Link></p>
      </section>

      <section className={styles.section} aria-labelledby="readiness-areas">
        <h2 id="readiness-areas">area別status</h2>
        <div className={styles.areaGrid}>
          {readiness.areas.map((area) => (
            <article key={area.area} data-status={area.status}>
              <h3>{AREA_LABELS[area.area]}</h3>
              <p className={styles.statusText}>{STATUS_LABELS[area.status]}</p>
              <p>{area.checks.length} checks</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="readiness-automatic">
        <h2 id="readiness-automatic">自動確認</h2>
        <div className={styles.checkGrid}>{automaticChecks.map((check) => <CheckCard key={check.id} check={check} />)}</div>
      </section>

      <section className={styles.section} aria-labelledby="readiness-manual">
        <h2 id="readiness-manual">人間確認</h2>
        <p>ユーザー本人が明示した項目だけをreviewedまたはapprovedとして記録し、3教科の教材内容はnot-reviewedのままです。</p>
        <div className={styles.checkGrid}>{manualChecks.map((check) => <CheckCard key={check.id} check={check} />)}</div>
      </section>

      <section className={styles.section} aria-labelledby="readiness-unresolved">
        <h2 id="readiness-unresolved">warning・fail・not-reviewedと次の作業</h2>
        {unresolved.length ? (
          <ul className={styles.unresolvedList}>
            {unresolved.map((check) => (
              <li key={check.id} data-status={check.status}>
                <strong>{STATUS_LABELS[check.status]}：{check.title}</strong>
                <span>{check.nextAction ?? "該当gateのevidenceを確認する。"}</span>
              </li>
            ))}
          </ul>
        ) : <p>未解決事項はありません。</p>}
        <p><Link className={styles.link} href="/elementary/for-guardians">保護者向け説明を確認する</Link></p>
      </section>
    </div>
  );
}
