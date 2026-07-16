import Image from "next/image";
import { ElementaryAssetCredit } from "./ElementaryAssetCredit";
import { ElementaryText } from "./ElementaryText";
import { ElementaryVisualFallback } from "./ElementaryVisualFallback";
import {
  getApprovedElementaryVisualAsset,
  getElementaryAssetAltText,
} from "@/lib/elementary-assets";
import type { ElementaryInlineContent } from "@/types/elementary-content";
import styles from "./ElementaryVisualAsset.module.css";

export function ElementaryVisualAsset({
  assetId,
  fallbackText,
  captionOverride,
  creditDisplay = "inline",
}: {
  assetId?: string;
  fallbackText: ElementaryInlineContent;
  captionOverride?: ElementaryInlineContent;
  creditDisplay?: "inline" | "credits-page";
}) {
  const asset = assetId ? getApprovedElementaryVisualAsset(assetId) : undefined;
  if (!asset) return <ElementaryVisualFallback assetId={assetId} fallbackText={fallbackText} />;

  const caption = captionOverride ?? asset.caption;
  return (
    <figure className={styles.figure} data-testid="elementary-visual-asset" data-visual-asset={asset.id}>
      <Image
        className={styles.image}
        src={asset.localPath}
        width={asset.width}
        height={asset.height}
        alt={getElementaryAssetAltText(asset)}
        sizes="(max-width: 768px) calc(100vw - 4rem), 40rem"
        unoptimized={asset.mimeType === "image/svg+xml"}
      />
      <figcaption className={styles.caption}>
        {caption ? <ElementaryText content={caption} /> : null}
        <ElementaryAssetCredit asset={asset} detailsOnly={creditDisplay === "credits-page"} />
      </figcaption>
    </figure>
  );
}
