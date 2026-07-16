import type { Metadata } from "next";
import Link from "next/link";
import { ElementaryVisualAsset } from "@/components/elementary/ElementaryVisualAsset";
import styles from "@/components/elementary/ElementaryVisualAsset.module.css";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import type { ElementaryInlineContent } from "@/types/elementary-content";

const fallbackText: ElementaryInlineContent = [
  { type: "text", text: "3人へ、クッキーを4こずつ分けた図です。" },
];

export const metadata: Metadata = {
  title: elementaryUiCopy("visual-showcase-metadata-title"),
  description: elementaryUiCopy("visual-showcase-metadata-description"),
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ElementaryVisualAssetsShowcasePage() {
  return (
    <main className={styles.page} data-text-audience="developer">
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>開発用の視覚素材見本</h1>
        <p className={styles.pageLead}>正式教材ではありません。素材表示、権利表示、fallbackを確認するページです。</p>
        <Link className={styles.pageLink} href="/elementary/credits">画像・図のクレジットを見る</Link>
      </header>
      <div className={styles.assetGrid}>
        <section className={styles.panel} aria-labelledby="original-asset-heading">
          <h2 className={styles.panelTitle} id="original-asset-heading">独自作成SVG</h2>
          <ElementaryVisualAsset assetId="division-cookies-12-into-3" fallbackText={fallbackText} />
        </section>
        <section className={styles.panel} aria-labelledby="fallback-heading">
          <h2 className={styles.panelTitle} id="fallback-heading">fallback表示</h2>
          <ElementaryVisualAsset assetId="showcase-missing-asset" fallbackText={fallbackText} />
        </section>
      </div>
    </main>
  );
}
