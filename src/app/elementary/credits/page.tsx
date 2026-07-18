import type { Metadata } from "next";
import Link from "next/link";
import { ElementaryText } from "@/components/elementary/ElementaryText";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import { getAllApprovedCredits } from "@/lib/elementary-assets";
import { getElementaryLessonById } from "@/lib/elementary-lessons";
import styles from "@/components/elementary/ElementaryVisualAsset.module.css";

export const metadata: Metadata = {
  title: elementaryUiCopy("credits-metadata-title"),
  description: elementaryUiCopy("credits-metadata-description"),
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function ElementaryCreditsPage() {
  const credits = getAllApprovedCredits();
  const originalCount = credits.filter((credit) => credit.licenseDisplayName === "Cyber Math独自作成").length;
  return (
    <main className={styles.page} data-text-audience="developer" data-page-audience="guardian">
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>画像や図の出どころ</h1>
        <p className={styles.pageLead}>
          小学生版で使う画像や図について、だれが作ったか、どの条件で使っているかをまとめています。
          現在使用中は{credits.length}件で、Cyber Mathのオリジナル{originalCount}件、外部素材{credits.length - originalCount}件です。
        </p>
      </header>
      <div className={styles.creditList} data-testid="elementary-credit-list">
        {credits.map((credit) => (
          <article className={styles.creditCard} id={credit.assetId} key={credit.assetId} data-credit-asset={credit.assetId}>
            <h2 className={styles.creditTitle}>{credit.title}</h2>
            <dl className={styles.detailList}>
              <div><dt>種類</dt><dd>{credit.kind === "map" ? "地図" : credit.kind === "diagram" ? "図" : "教材画像"}</dd></div>
              <div><dt>作者</dt><dd>{credit.creator}</dd></div>
              {credit.institution ? <div><dt>所蔵者</dt><dd>{credit.institution}</dd></div> : null}
              <div>
                <dt>出典</dt>
                <dd>
                  {credit.sourcePageUrl ? (
                    <a className={styles.externalLink} href={credit.sourcePageUrl} target="_blank" rel="noreferrer noopener">
                      原典ページ（外部サイト）
                    </a>
                  ) : (
                    <Link className={styles.pageLink} href={credit.localPath}>Cyber Mathの素材ファイル</Link>
                  )}
                </dd>
              </div>
              <div>
                <dt>権利・ライセンス</dt>
                <dd>
                  {credit.licenseUrl ? (
                    <a className={styles.externalLink} href={credit.licenseUrl} target="_blank" rel="noreferrer noopener">
                      {credit.licenseDisplayName}（外部サイト）
                    </a>
                  ) : credit.licenseDisplayName}
                </dd>
              </div>
              <div><dt>必要なクレジット</dt><dd>{credit.attributionText}</dd></div>
              <div><dt>改変</dt><dd>{credit.modificationText}</dd></div>
              <div>
                <dt>利用箇所</dt>
                <dd>
                  {credit.lessonIds.map((lessonId) => getElementaryLessonById(lessonId)).filter((lesson) => lesson !== undefined).map((lesson, index) => (
                    <span key={lesson.id}>{index > 0 ? "、" : ""}<ElementaryText content={lesson.title} /></span>
                  ))}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </main>
  );
}
