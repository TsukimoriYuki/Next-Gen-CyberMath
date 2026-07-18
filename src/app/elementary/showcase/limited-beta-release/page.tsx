import type { Metadata } from "next";
import { ElementaryText } from "@/components/elementary/ElementaryText";
import { buildElementaryLimitedBetaRelease } from "@/lib/elementary-release";
import styles from "./LimitedBetaRelease.module.css";

export const metadata: Metadata = {
  title: "小学生版 limited beta release",
  description: "小学生版の限定beta公開範囲と事前確認を表示する非公開ページです。",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryLimitedBetaReleasePage() {
  const release = buildElementaryLimitedBetaRelease();

  return (
    <div
      className={styles.page}
      data-testid="elementary-limited-beta-release"
      data-text-audience="developer"
      data-page-audience="guardian developer"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>INTERNAL RELEASE PREFLIGHT</p>
        <h1>小学生版 limited beta release</h1>
        <p>
          限定betaの公開対象と事前条件を確認するページです。
          現在の公開範囲とrollback条件を確認します。この画面から公開状態を変更することはできません。
        </p>
      </header>

      <section className={styles.section} aria-labelledby="release-summary">
        <h2 id="release-summary">公開前の状態</h2>
        <dl className={styles.metrics}>
          <div><dt>現在</dt><dd>{release.currentChannel}</dd></div>
          <div><dt>目標</dt><dd>{release.targetChannel}</dd></div>
          <div><dt>release state</dt><dd>{release.releaseState}</dd></div>
          <div><dt>preflight</dt><dd>{release.readiness === "ready" ? "✓ ready" : "× blocked"}</dd></div>
          <div><dt>人間レビュー</dt><dd>{release.humanReviewComplete ? "✓ 完了" : "× 未完了"}</dd></div>
          <div><dt>not-reviewed</dt><dd>{release.humanReviewComplete ? "0件" : "あり"}</dd></div>
          <div><dt>正式公開</dt><dd>△ {release.formalReleaseRecommendation}</dd></div>
          <div><dt>明示的な公開承認</dt><dd>○ {release.explicitReleaseApproval}</dd></div>
          <div><dt>自動公開</dt><dd>{release.automaticRelease ? "有効" : "無効"}</dd></div>
        </dl>
        <p className={styles.notice}>
          publicationStatusは{release.currentPublicationStatus}です。限定betaは明示承認済みで、
          自動公開は無効のままです。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="release-preview">
        <h2 id="release-preview">限定beta表示のpreview</h2>
        <div className={styles.preview} data-text-audience="learner" data-grade="grade-3">
          <p className={styles.badge} aria-label="げんていベータばん">
            <ElementaryText content={release.learnerDisplay.badge} />
          </p>
          {release.learnerDisplay.messages.map((message, index) => (
            <p key={index}><ElementaryText content={message} /></p>
          ))}
        </div>
        <p>保護者・公開責任者向けの表記：{release.learnerDisplay.guardianBadge}</p>
      </section>

      <section className={styles.section} aria-labelledby="release-scope">
        <h2 id="release-scope">公開対象と非公開対象</h2>
        <div className={styles.columns}>
          <article>
            <h3>公開対象</h3>
            <ul>{release.approvedScope.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
          </article>
          <article>
            <h3>非公開対象</h3>
            <ul>{release.excludedScope.map((item) => <li key={item.id}>{item.label}</li>)}</ul>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="release-prerequisites">
        <h2 id="release-prerequisites">公開前の条件</h2>
        <div className={styles.cards}>
          {release.prerequisites.map((item) => (
            <article key={item.id}>
              <h3>{item.label}</h3>
              <p><code>{item.source}</code></p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="release-warnings">
        <h2 id="release-warnings">warningと正式公開</h2>
        <ul>
          <li>小学3年生の全単元ではなく、9講座・72問に限ったpilotです。</li>
          <li>小学4〜6年生、理科、長期運用実績を含む正式公開条件は満たしていません。</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="release-rollback">
        <h2 id="release-rollback">緊急非公開・rollback条件</h2>
        <ul className={styles.rollbackList}>
          {release.rollbackConditions.map((item) => <li key={item.id}>{item.label}</li>)}
        </ul>
        <p className={styles.notice}>
          条件に該当したら小学生版だけをhiddenへ戻し、対象QA・build・production 404を確認します。
          学習履歴を保存していないため、DB rollbackは不要です。
        </p>
      </section>
    </div>
  );
}
