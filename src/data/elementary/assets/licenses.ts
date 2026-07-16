import type {
  ElementaryAssetLicense,
  ElementaryAssetLicenseId,
} from "@/types/elementary-assets";

const LICENSES = [
  {
    id: "public-domain",
    displayName: "Public Domain",
    officialUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    attributionRequired: false,
    shareAlikeRequired: false,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者・所蔵者、Public Domain（根拠を併記）",
    reviewRequired: true,
    notes: "Public Domain Markはライセンスではないため、権利消滅等の根拠を別に確認する。",
  },
  {
    id: "cc0-1.0",
    displayName: "CC0 1.0 Universal",
    officialUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    attributionRequired: false,
    shareAlikeRequired: false,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者（CC0 1.0）",
    reviewRequired: true,
    notes: "権利者によるCC0適用と、肖像権等の別権利を個別に確認する。",
  },
  {
    id: "cc-by-3.0",
    displayName: "CC BY 3.0 Unported",
    officialUrl: "https://creativecommons.org/licenses/by/3.0/",
    attributionRequired: true,
    shareAlikeRequired: false,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者（CC BY 3.0、変更の有無を併記）",
    reviewRequired: true,
    notes: "作者、作品名、出典、ライセンス、変更の有無を表示する。",
  },
  {
    id: "cc-by-4.0",
    displayName: "CC BY 4.0 International",
    officialUrl: "https://creativecommons.org/licenses/by/4.0/",
    attributionRequired: true,
    shareAlikeRequired: false,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者（CC BY 4.0、変更の有無を併記）",
    reviewRequired: true,
    notes: "作者、出典、ライセンス、変更の有無を表示する。",
  },
  {
    id: "cc-by-sa-3.0",
    displayName: "CC BY-SA 3.0 Unported",
    officialUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    attributionRequired: true,
    shareAlikeRequired: true,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者（CC BY-SA 3.0、変更の有無・継承条件を併記）",
    reviewRequired: true,
    notes: "改変物には同一または互換ライセンスの継承条件がある。",
  },
  {
    id: "cc-by-sa-4.0",
    displayName: "CC BY-SA 4.0 International",
    officialUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    attributionRequired: true,
    shareAlikeRequired: true,
    commercialUseAllowed: true,
    modificationAllowed: true,
    creditTemplate: "作品名 — 作者（CC BY-SA 4.0、変更の有無・継承条件を併記）",
    reviewRequired: true,
    notes: "改変物には同一または互換ライセンスの継承条件がある。",
  },
] satisfies readonly ElementaryAssetLicense[];

export const ELEMENTARY_ASSET_LICENSES: readonly ElementaryAssetLicense[] = Object.freeze(
  LICENSES.map((license) => Object.freeze(license)),
);

export const ELEMENTARY_ASSET_LICENSES_BY_ID = Object.freeze(
  Object.fromEntries(ELEMENTARY_ASSET_LICENSES.map((license) => [license.id, license])),
) as Readonly<Record<ElementaryAssetLicenseId, ElementaryAssetLicense>>;

export function getElementaryAssetLicense(id: string): ElementaryAssetLicense | undefined {
  return ELEMENTARY_ASSET_LICENSES_BY_ID[id as ElementaryAssetLicenseId];
}
