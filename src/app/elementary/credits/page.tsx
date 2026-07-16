import type { Metadata } from "next";
import Link from "next/link";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import { getAllApprovedCredits } from "@/lib/elementary-assets";
import styles from "@/components/elementary/ElementaryVisualAsset.module.css";

export const metadata: Metadata = {
  title: elementaryUiCopy("credits-metadata-title"),
  description: elementaryUiCopy("credits-metadata-description"),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryCreditsPage() {
  const credits = getAllApprovedCredits();
  return (
    <main className={styles.page} data-text-audience="developer">
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>画像や図の出どころ</h1>
        <p className={styles.pageLead}>
          小学生版で使う画像や図について、だれが作ったか、どの条件で使っているかをまとめています。
        </p>
      </header>
      <div className={styles.creditList} data-testid="elementary-credit-list">
        {credits.map((credit) => (
          <article className={styles.creditCard} id={credit.assetId} key={credit.assetId} data-credit-asset={credit.assetId}>
            <h2 className={styles.creditTitle}>{credit.title}</h2>
            <dl className={styles.detailList}>
              <div><dt>種類</dt><dd>{credit.kind}</dd></div>
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
              <div><dt>利用箇所</dt><dd>{credit.lessonIds.join(", ")}</dd></div>
              <div><dt>確認日</dt><dd>{credit.retrievedAt}</dd></div>
              {credit.publicDomainReason ? <div><dt>Public Domainの根拠</dt><dd>{credit.publicDomainReason}</dd></div> : null}
            </dl>
          </article>
        ))}
      </div>
    </main>
  );
}
