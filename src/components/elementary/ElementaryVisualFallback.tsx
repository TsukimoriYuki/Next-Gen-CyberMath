import type { ElementaryInlineContent } from "@/types/elementary-content";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryVisualAsset.module.css";

export function ElementaryVisualFallback({
  assetId,
  fallbackText,
}: {
  assetId?: string;
  fallbackText: ElementaryInlineContent;
}) {
  return (
    <div className={styles.fallback} data-testid="elementary-visual-fallback" data-missing-asset={assetId}>
      <span className={styles.fallbackLabel}>図が見えないとき</span>
      <ElementaryText content={fallbackText} />
      {process.env.NODE_ENV !== "production" && assetId ? (
        <span className={styles.diagnostic} data-text-audience="developer" data-asset-error="unresolved">
          未解決の素材ID: {assetId}
        </span>
      ) : null}
    </div>
  );
}
