import type { ElementaryVisualAsset } from "@/types/elementary-assets";
import { ELEMENTARY_VISUAL_ASSETS } from "./visual-assets";

export { ELEMENTARY_ASSET_LICENSES, ELEMENTARY_ASSET_LICENSES_BY_ID } from "./licenses";
export { ELEMENTARY_VISUAL_ASSETS } from "./visual-assets";

export const ELEMENTARY_VISUAL_ASSETS_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_VISUAL_ASSETS.map((asset) => [asset.id, asset])),
) as Readonly<Record<string, ElementaryVisualAsset>>;
