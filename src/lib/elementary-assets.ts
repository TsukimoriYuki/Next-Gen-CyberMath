import {
  ELEMENTARY_ASSET_LICENSES_BY_ID,
  ELEMENTARY_VISUAL_ASSETS,
  ELEMENTARY_VISUAL_ASSETS_BY_ID,
} from "@/data/elementary/assets";
import { extractElementaryInlineText } from "@/lib/elementary-text";
import type {
  ElementaryAssetCredit,
  ElementaryVisualAsset,
} from "@/types/elementary-assets";
import type {
  ElementaryGradeId,
  ElementarySubjectId,
} from "@/types/elementary";
import { ELEMENTARY_LESSONS } from "@/data/elementary/lessons";

function byAssetId(left: ElementaryVisualAsset, right: ElementaryVisualAsset): number {
  return left.id.localeCompare(right.id, "en");
}

function isLearnerReady(asset: ElementaryVisualAsset): boolean {
  if (asset.reviewStatus !== "approved" || !asset.sourceVerified) return false;
  if (asset.source.sourceType === "original") {
    return asset.rightsStatus === "cyber-math-original" && asset.licenseId === null;
  }
  if (!asset.licenseId || !asset.licenseUrl) return false;
  const license = ELEMENTARY_ASSET_LICENSES_BY_ID[asset.licenseId];
  if (!license || license.officialUrl !== asset.licenseUrl) return false;
  return asset.rightsStatus !== "public-domain" || Boolean(asset.publicDomainReason);
}

export function getElementaryVisualAsset(id: string): ElementaryVisualAsset | undefined {
  return ELEMENTARY_VISUAL_ASSETS_BY_ID[id];
}

export function getApprovedElementaryVisualAsset(id: string): ElementaryVisualAsset | undefined {
  const asset = getElementaryVisualAsset(id);
  return asset && isLearnerReady(asset) ? asset : undefined;
}

export function getAssetsForLesson(lessonId: string): readonly ElementaryVisualAsset[] {
  return Object.freeze(
    ELEMENTARY_VISUAL_ASSETS.filter(
      (asset) => isLearnerReady(asset) && asset.usage.lessonIds.includes(lessonId),
    ).sort(byAssetId),
  );
}

export function getAssetsForGrade(gradeId: ElementaryGradeId): readonly ElementaryVisualAsset[] {
  return Object.freeze(
    ELEMENTARY_VISUAL_ASSETS.filter(
      (asset) => isLearnerReady(asset) && asset.usage.gradeIds.includes(gradeId),
    ).sort(byAssetId),
  );
}

export function getAssetsForSubject(subjectId: ElementarySubjectId): readonly ElementaryVisualAsset[] {
  return Object.freeze(
    ELEMENTARY_VISUAL_ASSETS.filter(
      (asset) => isLearnerReady(asset) && asset.usage.subjectIds.includes(subjectId),
    ).sort(byAssetId),
  );
}

export function resolveElementaryAssetPath(id: string): string | undefined {
  return getApprovedElementaryVisualAsset(id)?.localPath;
}

export function getCreditsForAsset(assetId: string): ElementaryAssetCredit | undefined {
  const asset = getApprovedElementaryVisualAsset(assetId);
  if (!asset) return undefined;
  const license = asset.licenseId ? ELEMENTARY_ASSET_LICENSES_BY_ID[asset.licenseId] : undefined;
  return Object.freeze({
    assetId: asset.id,
    localPath: asset.localPath,
    title: asset.title,
    kind: asset.kind,
    creator: asset.creator,
    institution: asset.institution,
    sourcePageUrl: asset.source.originalPageUrl,
    licenseDisplayName:
      asset.rightsStatus === "cyber-math-original"
        ? "Cyber Math独自作成"
        : (license?.displayName ?? "未解決"),
    licenseUrl: asset.licenseUrl ?? undefined,
    attributionText: asset.attributionText,
    modificationText: asset.modification.modified
      ? (asset.modification.description ?? "改変あり")
      : "改変なし",
    retrievedAt: asset.retrievedAt,
    publicDomainReason: asset.publicDomainReasonDetail,
    lessonIds: asset.usage.lessonIds,
  });
}

export function getAllApprovedCredits(): readonly ElementaryAssetCredit[] {
  return Object.freeze(
    ELEMENTARY_VISUAL_ASSETS.filter(isLearnerReady)
      .sort(byAssetId)
      .map((asset) => getCreditsForAsset(asset.id))
      .filter((credit): credit is ElementaryAssetCredit => Boolean(credit)),
  );
}

export function getPublishedElementaryCredits(): readonly ElementaryAssetCredit[] {
  const publishedLessonIds = new Set(
    ELEMENTARY_LESSONS.filter((lesson) => lesson.publicationStatus === "beta").map((lesson) => lesson.id),
  );
  return Object.freeze(
    getAllApprovedCredits().filter((credit) => credit.lessonIds.some((lessonId) => publishedLessonIds.has(lessonId))),
  );
}

export type ElementaryAssetTextField = Readonly<{
  assetId: string;
  path: "alt" | "caption" | "shortCredit";
  content: ElementaryVisualAsset["alt"];
  gradeIds: readonly ElementaryGradeId[];
}>;

export function getElementaryAssetTextFields(): readonly ElementaryAssetTextField[] {
  return Object.freeze(
    ELEMENTARY_VISUAL_ASSETS.flatMap((asset) => [
      {
        assetId: asset.id,
        path: "alt" as const,
        content: asset.alt,
        gradeIds: asset.usage.gradeIds,
      },
      ...(asset.caption
        ? [{
            assetId: asset.id,
            path: "caption" as const,
            content: asset.caption,
            gradeIds: asset.usage.gradeIds,
          }]
        : []),
      {
        assetId: asset.id,
        path: "shortCredit" as const,
        content: asset.shortCredit,
        gradeIds: asset.usage.gradeIds,
      },
    ]),
  );
}

export function getElementaryAssetAltText(asset: ElementaryVisualAsset): string {
  return extractElementaryInlineText(asset.alt, { includeRubyReadings: false });
}
