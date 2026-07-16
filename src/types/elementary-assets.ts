import type {
  ElementaryGradeId,
  ElementarySubjectId,
} from "@/types/elementary";
import type { ElementaryInlineContent } from "@/types/elementary-content";

export type ElementaryAssetLicenseId =
  | "public-domain"
  | "cc0-1.0"
  | "cc-by-3.0"
  | "cc-by-4.0"
  | "cc-by-sa-3.0"
  | "cc-by-sa-4.0";

export type ElementaryAssetKind =
  | "photo"
  | "portrait"
  | "painting"
  | "map"
  | "diagram"
  | "illustration"
  | "document"
  | "chart"
  | "timeline"
  | "animation"
  | "video"
  | "three-dimensional";

export type ElementaryAssetReviewStatus = "pending" | "approved" | "rejected";
export type ElementaryAssetSourceType = "original" | "external";
export type ElementaryAssetRightsStatus =
  | "cyber-math-original"
  | "public-domain"
  | "licensed";
export type ElementaryPublicDomainReason =
  | "copyright-expired"
  | "dedicated-to-public-domain"
  | "government-work"
  | "other-verified";
export type ElementaryAssetUsagePurpose =
  | "concept-explanation"
  | "historical-source"
  | "geographic-reference"
  | "contextual-illustration";

export type ElementaryAssetLicense = Readonly<{
  id: ElementaryAssetLicenseId;
  displayName: string;
  officialUrl: string;
  attributionRequired: boolean;
  shareAlikeRequired: boolean;
  commercialUseAllowed: true;
  modificationAllowed: boolean;
  creditTemplate: string;
  reviewRequired: true;
  notes: string;
}>;

export type ElementaryAssetSource = Readonly<{
  sourceType: ElementaryAssetSourceType;
  originalPageUrl?: string;
  originalFileUrl?: string;
  originalFilename?: string;
  downloadedFilename: string;
}>;

export type ElementaryAssetModification = Readonly<{
  modified: boolean;
  description?: string;
}>;

export type ElementaryAssetUsage = Readonly<{
  purpose: ElementaryAssetUsagePurpose;
  gradeIds: readonly ElementaryGradeId[];
  subjectIds: readonly ElementarySubjectId[];
  lessonIds: readonly string[];
}>;

export type ElementaryVisualAsset = Readonly<{
  id: string;
  kind: ElementaryAssetKind;
  title: string;
  creator: string;
  institution?: string;
  source: ElementaryAssetSource;
  localPath: string;
  rightsStatus: ElementaryAssetRightsStatus;
  licenseId: ElementaryAssetLicenseId | null;
  licenseUrl: string | null;
  attributionText: string;
  shortCredit: ElementaryInlineContent;
  publicDomainReason?: ElementaryPublicDomainReason;
  publicDomainReasonDetail?: string;
  modification: ElementaryAssetModification;
  retrievedAt: string;
  reviewedAt?: string;
  reviewStatus: ElementaryAssetReviewStatus;
  sourceVerified: boolean;
  humanReviewNotes: string;
  checksumSha256: string;
  mimeType: string;
  width: number;
  height: number;
  fileSizeBytes: number;
  alt: ElementaryInlineContent;
  caption?: ElementaryInlineContent;
  decorative: boolean;
  usage: ElementaryAssetUsage;
}>;

export type ElementaryAssetCredit = Readonly<{
  assetId: string;
  localPath: string;
  title: string;
  kind: ElementaryAssetKind;
  creator: string;
  institution?: string;
  sourcePageUrl?: string;
  licenseDisplayName: string;
  licenseUrl?: string;
  attributionText: string;
  modificationText: string;
  retrievedAt: string;
  publicDomainReason?: string;
  lessonIds: readonly string[];
}>;

export type ElementaryAssetViolation = Readonly<{
  assetId: string;
  field: string;
  ruleId: string;
  expected: unknown;
  actual: unknown;
  filePath?: string;
  sourceUrl?: string;
}>;

export type ElementaryAssetInspectionResult = Readonly<{
  violations: readonly ElementaryAssetViolation[];
  warnings: readonly ElementaryAssetViolation[];
}>;
