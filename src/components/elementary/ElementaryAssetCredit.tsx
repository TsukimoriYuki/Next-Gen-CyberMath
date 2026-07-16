import Link from "next/link";
import { elementaryUiCopy } from "@/data/elementary/ui-copy";
import type { ElementaryVisualAsset } from "@/types/elementary-assets";
import { ElementaryText } from "./ElementaryText";
import styles from "./ElementaryVisualAsset.module.css";

export function ElementaryAssetCredit({
  asset,
  detailsOnly = false,
}: {
  asset: ElementaryVisualAsset;
  detailsOnly?: boolean;
}) {
  return (
    <div className={styles.credit} data-asset-credit={asset.id}>
      {!detailsOnly ? <ElementaryText content={asset.shortCredit} /> : null}
      <Link className={styles.creditLink} href={`/elementary/credits#${asset.id}`}>
        {elementaryUiCopy("visual-credit-link")}
      </Link>
    </div>
  );
}
