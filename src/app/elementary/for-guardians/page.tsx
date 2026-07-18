import type { Metadata } from "next";
import Link from "next/link";
import { ElementaryBetaNotice } from "@/components/elementary/ElementaryBetaNotice";
import { buildElementaryContentInventory } from "@/lib/elementary-inventory";
import styles from "./GuardianPage.module.css";

export const metadata: Metadata = {
  title: "保護者・教育者の方へ",
  description: "Cyber Math小学生版・限定betaの範囲、採点、保存、教材品質をご案内します。",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ElementaryGuardianPage() {
  const inventory = buildElementaryContentInventory();
  const totals = inventory.totals;
  const subjects = Object.fromEntries(inventory.subjects.map((subject) => [subject.subject, subject]));

  return (
    <div
      className={styles.page}
      data-testid="elementary-guardian-page"
      data-text-audience="developer"
      data-page-audience="guardian"
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>FOR GUARDIANS AND EDUCATORS</p>
        <h1>保護者・教育者の方へ</h1>
        <p>
          Cyber Math小学生版は、小学3年生の算数・国語・社会から始めた限定betaのpilot教材です。
          現在の{totals.lessonCount}講座だけで小学3年生全体に対応しているものではありません。
        </p>
      </header>
      <ElementaryBetaNotice />

      <section className={styles.section} aria-labelledby="guardian-current-scope">
        <h2 id="guardian-current-scope">現在確認できる範囲</h2>
        <dl className={styles.metrics}>
          <div><dt>対象</dt><dd>小学3年生pilot</dd></div>
          <div><dt>教科</dt><dd>算数・国語・社会</dd></div>
          <div><dt>講座</dt><dd>{totals.lessonCount}講座</dd></div>
          <div><dt>採点できる問題</dt><dd>{totals.problemCount}問</dd></div>
          <div><dt>算数</dt><dd>{subjects.math?.lessonCount ?? 0}講座・{subjects.math?.problemCount ?? 0}問</dd></div>
          <div><dt>国語</dt><dd>{subjects.japanese?.lessonCount ?? 0}講座・{subjects.japanese?.problemCount ?? 0}問</dd></div>
          <div><dt>社会</dt><dd>{subjects["social-studies"]?.lessonCount ?? 0}講座・{subjects["social-studies"]?.problemCount ?? 0}問</dd></div>
        </dl>
        <p className={styles.note}>
          問題数は教材の範囲を示す一つの情報です。問題数だけで品質や学年全体への対応を示すものではありません。
        </p>
      </section>

      <section className={styles.section} aria-labelledby="guardian-quality-method">
        <h2 id="guardian-quality-method">教材の確認方法</h2>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3>学習指導要領との対応</h3>
            <p>文部科学省の資料を参照し、該当する学習内容と講座・問題の対応を管理しています。現在の対応範囲は一部です。</p>
          </article>
          <article className={styles.card}>
            <h3>学年別漢字とふりがな</h3>
            <p>小学3年生までの配当漢字を基準に、未習漢字と必要なふりがなを専用QAで検査しています。</p>
          </article>
          <article className={styles.card}>
            <h3>画像・図の権利管理</h3>
            <p>現在使う2件の図はCyber Mathのオリジナルです。権利状態、用途、クレジットを管理しています。外部素材は使用していません。</p>
            <Link href="/elementary/credits">画像・図のクレジットを確認する</Link>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="guardian-grading">
        <h2 id="guardian-grading">採点とデータの扱い</h2>
        <div className={styles.cardGrid}>
          <article className={styles.card}>
            <h3>採点方式</h3>
            <p>
              選択式と数値入力を、問題registryに登録した正答と照合します。
              生成AIやAIによる自由記述の自動採点は使っていません。
            </p>
          </article>
          <article className={styles.card}>
            <h3>学習履歴と進捗</h3>
            <p>
              現在は学習履歴、回答履歴、学習進捗をサーバーやデータベースへ保存していません。
              画面を閉じた後に続きから再開する機能も未実装です。
            </p>
          </article>
          <article className={styles.card}>
            <h3>個人情報</h3>
            <p>
              pilot講座と問題を使うために、子どもの氏名、学校名、住所、連絡先などの個人情報入力を求めません。
            </p>
          </article>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="guardian-not-implemented">
        <h2 id="guardian-not-implemented">まだ実装していないこと</h2>
        <ul className={styles.list}>
          <li>保護者アカウント、学習履歴・進捗保存、復習キューとの接続</li>
          <li>小学3年生の全単元、小学4〜6年生、理科、中学受験コース</li>
          <li>個別最適化、音声、ゲーム、3D教材</li>
        </ul>
      </section>

      <section className={`${styles.section} ${styles.reviewPanel}`} aria-labelledby="guardian-review-status">
        <h2 id="guardian-review-status">人間レビューと公開判断</h2>
        <p>
          ユーザー本人が、子ども向け文言、保護者向け説明、画像・図の権利管理を確認し、
          算数・国語・社会の教材内容も実画面で確認して、問題なしと承認しました。
          ユーザー本人の明示承認に基づき、現在は限定betaとして公開しています。
          小学3年生全範囲への対応ではなく、内容や画面を改善中のため正式公開ではありません。
        </p>
      </section>
    </div>
  );
}
