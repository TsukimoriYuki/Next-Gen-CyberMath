import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { extractElementaryInlineText } from "../src/lib/elementary-text";
import type {
  ElementaryAssetInspectionResult,
  ElementaryAssetLicense,
  ElementaryAssetLicenseId,
  ElementaryAssetViolation,
  ElementaryVisualAsset,
} from "../src/types/elementary-assets";

export type ElementaryAssetValidationInput = Readonly<{
  licenses: readonly ElementaryAssetLicense[];
  assets: readonly ElementaryVisualAsset[];
  publicRoot: string;
  knownGradeIds: ReadonlySet<string>;
  knownSubjectIds: ReadonlySet<string>;
  knownLessonIds: ReadonlySet<string>;
  assetReferences: readonly Readonly<{ assetId: string; lessonId: string; field: string }>[];
}>;

const ALLOWED_LICENSE_IDS = new Set<ElementaryAssetLicenseId>([
  "public-domain",
  "cc0-1.0",
  "cc-by-3.0",
  "cc-by-4.0",
  "cc-by-sa-3.0",
  "cc-by-sa-4.0",
]);
const ALLOWED_LICENSE_HOSTS = new Set(["creativecommons.org", "www.creativecommons.org"]);
const ALLOWED_LOCAL_PREFIX = "/elementary/assets/";
const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MIME_BY_EXTENSION: Readonly<Record<string, string>> = Object.freeze({
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
});

function violation(
  assetId: string,
  field: string,
  ruleId: string,
  expected: unknown,
  actual: unknown,
  extras: Readonly<{ filePath?: string; sourceUrl?: string }> = {},
): ElementaryAssetViolation {
  return { assetId, field, ruleId, expected, actual, ...extras };
}

function isHttpsUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isIsoDate(value: string | undefined): boolean {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/u.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`)));
}

function isForbiddenLicenseText(value: string): boolean {
  return /(?:^|[- ])(?:nc|nd)(?:[- ]|$)|educational[- ]use|personal[- ]use|all[- ]rights[- ]reserved|fair[- ]use/iu.test(value);
}

function validateLicenseRegistry(
  licenses: readonly ElementaryAssetLicense[],
  violations: ElementaryAssetViolation[],
) {
  const ids = new Set<string>();
  for (const license of licenses) {
    const id = String(license.id);
    if (ids.has(id)) violations.push(violation(id, "id", "LICENSE_ID_UNIQUE", "unique", id));
    ids.add(id);
    if (!ALLOWED_LICENSE_IDS.has(id as ElementaryAssetLicenseId)) {
      violations.push(violation(id, "id", "LICENSE_ID_ALLOWED", [...ALLOWED_LICENSE_IDS], id));
    }
    if (isForbiddenLicenseText(`${id} ${license.displayName} ${license.notes}`)) {
      violations.push(violation(id, "id", "FORBIDDEN_LICENSE", "no NC, ND, fair-use, or limited-use terms", id));
    }
    if (!license.displayName.trim()) violations.push(violation(id, "displayName", "LICENSE_DISPLAY_NAME_REQUIRED", "non-empty", license.displayName));
    if (!isHttpsUrl(license.officialUrl)) violations.push(violation(id, "officialUrl", "LICENSE_URL_HTTPS", "HTTPS URL", license.officialUrl));
    try {
      const host = new URL(license.officialUrl).hostname;
      if (!ALLOWED_LICENSE_HOSTS.has(host)) violations.push(violation(id, "officialUrl", "LICENSE_URL_DOMAIN", [...ALLOWED_LICENSE_HOSTS], host));
    } catch {
      // The HTTPS rule already reports malformed URLs.
    }
    if (license.commercialUseAllowed !== true) violations.push(violation(id, "commercialUseAllowed", "LICENSE_COMMERCIAL_ALLOWED", true, license.commercialUseAllowed));
    if (license.modificationAllowed !== true) violations.push(violation(id, "modificationAllowed", "LICENSE_MODIFICATION_ALLOWED", true, license.modificationAllowed));
    if (license.reviewRequired !== true) violations.push(violation(id, "reviewRequired", "LICENSE_REVIEW_REQUIRED", true, license.reviewRequired));
    if (id.includes("by") && license.attributionRequired !== true) violations.push(violation(id, "attributionRequired", "LICENSE_ATTRIBUTION_REQUIRED", true, license.attributionRequired));
    if (id.includes("by-sa") !== license.shareAlikeRequired) violations.push(violation(id, "shareAlikeRequired", "LICENSE_SHARE_ALIKE_MATCH", id.includes("by-sa"), license.shareAlikeRequired));
  }
  for (const expected of ALLOWED_LICENSE_IDS) {
    if (!ids.has(expected)) violations.push(violation(expected, "id", "LICENSE_REQUIRED", true, false));
  }
}

function validateSvg(asset: ElementaryVisualAsset, filePath: string, file: Buffer, violations: ElementaryAssetViolation[]) {
  const source = file.toString("utf8");
  const checks: readonly Readonly<{ ruleId: string; pattern: RegExp }>[] = [
    { ruleId: "SVG_SCRIPT_FORBIDDEN", pattern: /<script\b/iu },
    { ruleId: "SVG_FOREIGN_OBJECT_FORBIDDEN", pattern: /<foreignObject\b/iu },
    { ruleId: "SVG_EVENT_HANDLER_FORBIDDEN", pattern: /\son[a-z]+\s*=/iu },
    { ruleId: "SVG_EXTERNAL_HREF_FORBIDDEN", pattern: /(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/|data:)/iu },
    { ruleId: "SVG_REMOTE_IMAGE_FORBIDDEN", pattern: /<image\b[^>]*(?:href|xlink:href)/iu },
    { ruleId: "SVG_UNSAFE_XML_FORBIDDEN", pattern: /<!DOCTYPE|<!ENTITY/iu },
  ];
  for (const check of checks) {
    if (check.pattern.test(source)) violations.push(violation(asset.id, "svg", check.ruleId, "not present", "present", { filePath }));
  }
  if (!/<svg\b[^>]*\bwidth=["']\d+["'][^>]*\bheight=["']\d+["']/iu.test(source) &&
      !/<svg\b[^>]*\bheight=["']\d+["'][^>]*\bwidth=["']\d+["']/iu.test(source)) {
    violations.push(violation(asset.id, "svg.dimensions", "SVG_DIMENSIONS_REQUIRED", "numeric width and height", "missing", { filePath }));
  }
  if (!/<svg\b[^>]*\bviewBox=["'][^"']+["']/iu.test(source)) {
    violations.push(violation(asset.id, "svg.viewBox", "SVG_VIEWBOX_REQUIRED", "viewBox", "missing", { filePath }));
  }
}

function detectMimeType(file: Buffer): string | undefined {
  if (file.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (file.length >= 3 && file[0] === 0xff && file[1] === 0xd8 && file[2] === 0xff) return "image/jpeg";
  if (file.length >= 12 && file.subarray(0, 4).toString("ascii") === "RIFF" && file.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  const textStart = file.subarray(0, Math.min(file.length, 512)).toString("utf8").replace(/^\uFEFF/u, "").trimStart();
  if (/^(?:<\?xml[^>]*>\s*)?<svg\b/iu.test(textStart)) return "image/svg+xml";
  return undefined;
}

function validateAsset(
  asset: ElementaryVisualAsset,
  input: ElementaryAssetValidationInput,
  licenseIds: ReadonlySet<string>,
  violations: ElementaryAssetViolation[],
) {
  const sourceUrl = asset.source.originalPageUrl;
  if (!asset.id.trim()) violations.push(violation(asset.id, "id", "ASSET_ID_REQUIRED", "non-empty", asset.id));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(asset.id)) violations.push(violation(asset.id, "id", "ASSET_ID_STABLE", "lowercase kebab-case", asset.id));
  if (!asset.title.trim()) violations.push(violation(asset.id, "title", "ASSET_TITLE_REQUIRED", "non-empty", asset.title));
  if (!asset.creator.trim()) violations.push(violation(asset.id, "creator", "ASSET_CREATOR_REQUIRED", "non-empty", asset.creator));
  if (!asset.attributionText.trim()) violations.push(violation(asset.id, "attributionText", "ASSET_ATTRIBUTION_REQUIRED", "non-empty", asset.attributionText, { sourceUrl }));
  if (!asset.humanReviewNotes.trim()) violations.push(violation(asset.id, "humanReviewNotes", "ASSET_HUMAN_REVIEW_REQUIRED", "non-empty", asset.humanReviewNotes, { sourceUrl }));
  if (/(?:TODO|TBD|PLACEHOLDER|LOREM)/iu.test(JSON.stringify(asset))) violations.push(violation(asset.id, "metadata", "ASSET_PLACEHOLDER_FORBIDDEN", "reviewed metadata", "placeholder token"));
  if (asset.reviewStatus !== "approved") violations.push(violation(asset.id, "reviewStatus", "ASSET_REVIEW_APPROVED", "approved", asset.reviewStatus, { sourceUrl }));
  if (!asset.sourceVerified) violations.push(violation(asset.id, "sourceVerified", "ASSET_SOURCE_VERIFIED", true, asset.sourceVerified, { sourceUrl }));
  if (!isIsoDate(asset.retrievedAt)) violations.push(violation(asset.id, "retrievedAt", "ASSET_RETRIEVED_DATE", "YYYY-MM-DD", asset.retrievedAt));
  if (!isIsoDate(asset.reviewedAt)) violations.push(violation(asset.id, "reviewedAt", "ASSET_REVIEWED_DATE", "YYYY-MM-DD", asset.reviewedAt));
  if (!Number.isInteger(asset.width) || asset.width <= 0) violations.push(violation(asset.id, "width", "ASSET_WIDTH_POSITIVE", "positive integer", asset.width));
  if (!Number.isInteger(asset.height) || asset.height <= 0) violations.push(violation(asset.id, "height", "ASSET_HEIGHT_POSITIVE", "positive integer", asset.height));
  if (!Number.isInteger(asset.fileSizeBytes) || asset.fileSizeBytes <= 0 || asset.fileSizeBytes >= MAX_FILE_SIZE) violations.push(violation(asset.id, "fileSizeBytes", "ASSET_FILE_SIZE_LIMIT", `1..${MAX_FILE_SIZE - 1}`, asset.fileSizeBytes));
  if (!/^[a-f0-9]{64}$/u.test(asset.checksumSha256)) violations.push(violation(asset.id, "checksumSha256", "ASSET_CHECKSUM_FORMAT", "64 lowercase hex characters", asset.checksumSha256));
  if (!asset.localPath.startsWith(ALLOWED_LOCAL_PREFIX) || /(?:https?:|\/\/|\?|\\|\.\.)/u.test(asset.localPath)) {
    violations.push(violation(asset.id, "localPath", "ASSET_LOCAL_PATH_ALLOWED", `${ALLOWED_LOCAL_PREFIX}... without URL/query/traversal`, asset.localPath));
  }
  const extension = path.extname(asset.localPath).toLowerCase();
  if (MIME_BY_EXTENSION[extension] !== asset.mimeType) violations.push(violation(asset.id, "mimeType", "ASSET_MIME_EXTENSION_MATCH", MIME_BY_EXTENSION[extension], asset.mimeType));
  if (extractElementaryInlineText(asset.alt).trim().length === 0 && !asset.decorative) violations.push(violation(asset.id, "alt", "ASSET_ALT_REQUIRED", "non-empty learner text", "empty"));
  if (asset.decorative) violations.push(violation(asset.id, "decorative", "ASSET_EDUCATIONAL_NOT_DECORATIVE", false, true));
  for (const gradeId of asset.usage.gradeIds) if (!input.knownGradeIds.has(gradeId)) violations.push(violation(asset.id, "usage.gradeIds", "ASSET_GRADE_RESOLVES", "known grade", gradeId));
  for (const subjectId of asset.usage.subjectIds) if (!input.knownSubjectIds.has(subjectId)) violations.push(violation(asset.id, "usage.subjectIds", "ASSET_SUBJECT_RESOLVES", "known subject", subjectId));
  for (const lessonId of asset.usage.lessonIds) if (!input.knownLessonIds.has(lessonId)) violations.push(violation(asset.id, "usage.lessonIds", "ASSET_LESSON_RESOLVES", "known lesson", lessonId));
  if (asset.usage.lessonIds.length === 0) violations.push(violation(asset.id, "usage.lessonIds", "ASSET_USAGE_REQUIRED", "at least one lesson", []));

  if (asset.source.sourceType === "original") {
    if (asset.creator !== "Cyber Math") violations.push(violation(asset.id, "creator", "ORIGINAL_CREATOR", "Cyber Math", asset.creator));
    if (asset.rightsStatus !== "cyber-math-original") violations.push(violation(asset.id, "rightsStatus", "ORIGINAL_RIGHTS_STATUS", "cyber-math-original", asset.rightsStatus));
    if (asset.licenseId !== null || asset.licenseUrl !== null) violations.push(violation(asset.id, "licenseId", "ORIGINAL_NOT_EXTERNAL_LICENSE", null, asset.licenseId));
    if (asset.source.originalPageUrl || asset.source.originalFileUrl) violations.push(violation(asset.id, "source", "ORIGINAL_NO_EXTERNAL_SOURCE", "no external URLs", asset.source));
  } else {
    if (!isHttpsUrl(asset.source.originalPageUrl)) violations.push(violation(asset.id, "source.originalPageUrl", "EXTERNAL_SOURCE_PAGE_REQUIRED", "HTTPS URL", asset.source.originalPageUrl, { sourceUrl }));
    if (!isHttpsUrl(asset.source.originalFileUrl)) violations.push(violation(asset.id, "source.originalFileUrl", "EXTERNAL_FILE_URL_REQUIRED", "HTTPS URL", asset.source.originalFileUrl, { sourceUrl }));
    if (!asset.licenseId || !licenseIds.has(asset.licenseId)) violations.push(violation(asset.id, "licenseId", "ASSET_LICENSE_RESOLVES", "registered license", asset.licenseId, { sourceUrl }));
    if (asset.licenseId && isForbiddenLicenseText(asset.licenseId)) violations.push(violation(asset.id, "licenseId", "FORBIDDEN_LICENSE", "commercial and modifiable license", asset.licenseId, { sourceUrl }));
    const license = asset.licenseId ? input.licenses.find((entry) => entry.id === asset.licenseId) : undefined;
    if (license && asset.licenseUrl !== license.officialUrl) violations.push(violation(asset.id, "licenseUrl", "ASSET_LICENSE_URL_MATCH", license.officialUrl, asset.licenseUrl, { sourceUrl }));
    if (asset.rightsStatus === "public-domain" && !asset.publicDomainReason) violations.push(violation(asset.id, "publicDomainReason", "PUBLIC_DOMAIN_REASON_REQUIRED", "verified reason", asset.publicDomainReason, { sourceUrl }));
    if (asset.rightsStatus === "licensed" && !asset.licenseId) violations.push(violation(asset.id, "licenseId", "LICENSED_ASSET_LICENSE_REQUIRED", "registered license", asset.licenseId, { sourceUrl }));
  }
  if (asset.modification.modified && !asset.modification.description?.trim()) violations.push(violation(asset.id, "modification.description", "MODIFICATION_DESCRIPTION_REQUIRED", "non-empty", asset.modification.description));
  if (!asset.modification.modified && asset.modification.description) violations.push(violation(asset.id, "modification.description", "MODIFICATION_DESCRIPTION_ABSENT", undefined, asset.modification.description));

  const relativePath = asset.localPath.replace(/^\//u, "");
  const filePath = path.resolve(input.publicRoot, relativePath);
  const allowedRoot = path.resolve(input.publicRoot, "elementary", "assets");
  if (!(filePath === allowedRoot || filePath.startsWith(`${allowedRoot}${path.sep}`))) {
    violations.push(violation(asset.id, "localPath", "ASSET_PATH_CONTAINED", allowedRoot, filePath, { filePath }));
    return;
  }
  if (!fs.existsSync(filePath)) {
    violations.push(violation(asset.id, "localPath", "ASSET_FILE_EXISTS", true, false, { filePath }));
    return;
  }
  const file = fs.readFileSync(filePath);
  if (file.byteLength !== asset.fileSizeBytes) violations.push(violation(asset.id, "fileSizeBytes", "ASSET_FILE_SIZE_MATCH", file.byteLength, asset.fileSizeBytes, { filePath }));
  const checksum = crypto.createHash("sha256").update(file).digest("hex");
  if (checksum !== asset.checksumSha256) violations.push(violation(asset.id, "checksumSha256", "ASSET_CHECKSUM_MATCH", checksum, asset.checksumSha256, { filePath }));
  const detectedMimeType = detectMimeType(file);
  if (detectedMimeType !== asset.mimeType) violations.push(violation(asset.id, "mimeType", "ASSET_MIME_CONTENT_MATCH", detectedMimeType, asset.mimeType, { filePath }));
  if (extension === ".svg") validateSvg(asset, filePath, file, violations);
}

export function inspectElementaryAssets(input: ElementaryAssetValidationInput): ElementaryAssetInspectionResult {
  const violations: ElementaryAssetViolation[] = [];
  const warnings: ElementaryAssetViolation[] = [];
  validateLicenseRegistry(input.licenses, violations);
  const licenseIds = new Set(input.licenses.map((license) => String(license.id)));
  const assetIds = new Set<string>();
  const localPaths = new Set<string>();
  const checksumOwners = new Map<string, string>();
  for (const asset of input.assets) {
    if (assetIds.has(asset.id)) violations.push(violation(asset.id, "id", "ASSET_ID_UNIQUE", "unique", asset.id));
    assetIds.add(asset.id);
    if (localPaths.has(asset.localPath)) violations.push(violation(asset.id, "localPath", "ASSET_LOCAL_PATH_UNIQUE", "unique", asset.localPath));
    localPaths.add(asset.localPath);
    const checksumOwner = checksumOwners.get(asset.checksumSha256);
    if (checksumOwner) warnings.push(violation(asset.id, "checksumSha256", "ASSET_CHECKSUM_SHARED", `shared explicitly with ${checksumOwner}`, asset.checksumSha256));
    else checksumOwners.set(asset.checksumSha256, asset.id);
    validateAsset(asset, input, licenseIds, violations);
  }
  for (const reference of input.assetReferences) {
    if (!assetIds.has(reference.assetId)) violations.push(violation(reference.assetId, reference.field, "ASSET_REFERENCE_RESOLVES", "registered asset", reference.assetId));
    if (!input.knownLessonIds.has(reference.lessonId)) violations.push(violation(reference.assetId, reference.field, "ASSET_REFERENCE_LESSON_RESOLVES", "known lesson", reference.lessonId));
  }
  for (const asset of input.assets) {
    if (!input.assetReferences.some((reference) => reference.assetId === asset.id)) warnings.push(violation(asset.id, "usage", "ASSET_UNUSED", "at least one visual block reference", 0));
  }
  return Object.freeze({ violations: Object.freeze(violations), warnings: Object.freeze(warnings) });
}
