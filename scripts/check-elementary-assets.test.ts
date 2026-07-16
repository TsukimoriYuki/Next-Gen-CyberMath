import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { ELEMENTARY_ASSET_LICENSES } from "../src/data/elementary/assets/licenses";
import type { ElementaryVisualAsset } from "../src/types/elementary-assets";
import { inspectElementaryAssets } from "./elementary-assets-validation";

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "cyber-math-assets-"));
const publicRoot = path.join(tempRoot, "public");
const assetDirectory = path.join(publicRoot, "elementary", "assets");
fs.mkdirSync(assetDirectory, { recursive: true });

const safeSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50" viewBox="0 0 100 50"><rect width="100" height="50"/></svg>';
const safeFilePath = path.join(assetDirectory, "fixture.svg");
fs.writeFileSync(safeFilePath, safeSvg, "utf8");
const safeBytes = fs.readFileSync(safeFilePath);
const checksum = crypto.createHash("sha256").update(safeBytes).digest("hex");

const baseAsset: ElementaryVisualAsset = {
  id: "fixture-original",
  kind: "diagram",
  title: "fixture",
  creator: "Cyber Math",
  source: { sourceType: "original", downloadedFilename: "fixture.svg" },
  localPath: "/elementary/assets/fixture.svg",
  rightsStatus: "cyber-math-original",
  licenseId: null,
  licenseUrl: null,
  attributionText: "Cyber Math独自作成",
  shortCredit: [{ type: "text", text: "Cyber Mathが作った図" }],
  modification: { modified: false },
  retrievedAt: "2026-07-17",
  reviewedAt: "2026-07-17",
  reviewStatus: "approved",
  sourceVerified: true,
  humanReviewNotes: "fixture review",
  checksumSha256: checksum,
  mimeType: "image/svg+xml",
  width: 100,
  height: 50,
  fileSizeBytes: safeBytes.byteLength,
  alt: [{ type: "text", text: "四角い図" }],
  caption: [{ type: "text", text: "たしかめる図" }],
  decorative: false,
  usage: { purpose: "concept-explanation", gradeIds: ["grade-3"], subjectIds: ["math"], lessonIds: ["lesson"] },
};

const externalAsset: ElementaryVisualAsset = {
  ...baseAsset,
  id: "fixture-external",
  creator: "Example Creator",
  source: {
    sourceType: "external",
    originalPageUrl: "https://example.org/file-page",
    originalFileUrl: "https://example.org/file.svg",
    originalFilename: "file.svg",
    downloadedFilename: "fixture.svg",
  },
  rightsStatus: "public-domain",
  licenseId: "public-domain",
  licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
  publicDomainReason: "copyright-expired",
  publicDomainReasonDetail: "copyright term expired",
  attributionText: "Example Creator, Public Domain",
};

type Fixture = Readonly<{
  name: string;
  asset: ElementaryVisualAsset;
  expectedRule?: string;
  expectPass?: boolean;
  before?: () => void;
  after?: () => void;
  references?: readonly Readonly<{ assetId: string; lessonId: string; field: string }>[];
}>;

const fixture = (name: string, patch: Partial<ElementaryVisualAsset>, expectedRule: string): Fixture => ({
  name,
  asset: { ...baseAsset, ...patch },
  expectedRule,
});

const fixtures: readonly Fixture[] = [
  fixture("unknown license", { source: externalAsset.source, rightsStatus: "licensed", licenseId: "unknown" as never, licenseUrl: "https://example.org/license", creator: "Creator" }, "ASSET_LICENSE_RESOLVES"),
  fixture("NC license", { source: externalAsset.source, rightsStatus: "licensed", licenseId: "cc-by-nc-4.0" as never, licenseUrl: "https://example.org/license", creator: "Creator" }, "FORBIDDEN_LICENSE"),
  fixture("ND license", { source: externalAsset.source, rightsStatus: "licensed", licenseId: "cc-by-nd-4.0" as never, licenseUrl: "https://example.org/license", creator: "Creator" }, "FORBIDDEN_LICENSE"),
  fixture("educational use only", { source: externalAsset.source, rightsStatus: "licensed", licenseId: "educational-use-only" as never, licenseUrl: "https://example.org/license", creator: "Creator" }, "FORBIDDEN_LICENSE"),
  fixture("missing attribution", { attributionText: "" }, "ASSET_ATTRIBUTION_REQUIRED"),
  fixture("missing source", { ...externalAsset, source: { sourceType: "external", downloadedFilename: "fixture.svg" } }, "EXTERNAL_SOURCE_PAGE_REQUIRED"),
  fixture("checksum mismatch", { checksumSha256: "0".repeat(64) }, "ASSET_CHECKSUM_MATCH"),
  fixture("missing file", { localPath: "/elementary/assets/missing.svg" }, "ASSET_FILE_EXISTS"),
  fixture("external hotlink", { localPath: "https://example.org/file.svg" }, "ASSET_LOCAL_PATH_ALLOWED"),
  fixture("pending learner asset", { reviewStatus: "pending" }, "ASSET_REVIEW_APPROVED"),
  fixture("unverified source", { sourceVerified: false }, "ASSET_SOURCE_VERIFIED"),
  fixture("invalid local path", { localPath: "/elementary/assets/../secret.svg" }, "ASSET_LOCAL_PATH_ALLOWED"),
  {
    name: "unsafe SVG script",
    asset: { ...baseAsset, checksumSha256: crypto.createHash("sha256").update('<svg width="100" height="50" viewBox="0 0 100 50"><script/></svg>').digest("hex"), fileSizeBytes: Buffer.byteLength('<svg width="100" height="50" viewBox="0 0 100 50"><script/></svg>') },
    expectedRule: "SVG_SCRIPT_FORBIDDEN",
    before: () => fs.writeFileSync(safeFilePath, '<svg width="100" height="50" viewBox="0 0 100 50"><script/></svg>'),
    after: () => fs.writeFileSync(safeFilePath, safeSvg),
  },
  {
    name: "unsafe SVG external href",
    asset: { ...baseAsset, checksumSha256: crypto.createHash("sha256").update('<svg width="100" height="50" viewBox="0 0 100 50"><use href="https://example.org/a.svg"/></svg>').digest("hex"), fileSizeBytes: Buffer.byteLength('<svg width="100" height="50" viewBox="0 0 100 50"><use href="https://example.org/a.svg"/></svg>') },
    expectedRule: "SVG_EXTERNAL_HREF_FORBIDDEN",
    before: () => fs.writeFileSync(safeFilePath, '<svg width="100" height="50" viewBox="0 0 100 50"><use href="https://example.org/a.svg"/></svg>'),
    after: () => fs.writeFileSync(safeFilePath, safeSvg),
  },
  fixture("missing alt", { alt: [] }, "ASSET_ALT_REQUIRED"),
  { name: "approved original SVG", asset: baseAsset, expectPass: true },
  { name: "approved external PD asset", asset: externalAsset, expectPass: true },
  { name: "unknown asset reference", asset: baseAsset, expectedRule: "ASSET_REFERENCE_RESOLVES", references: [{ assetId: "missing", lessonId: "lesson", field: "blocks[0].assetId" }] },
];

let failures = 0;
for (const entry of fixtures) {
  entry.before?.();
  const result = inspectElementaryAssets({
    licenses: ELEMENTARY_ASSET_LICENSES,
    assets: [entry.asset],
    publicRoot,
    knownGradeIds: new Set(["grade-3"]),
    knownSubjectIds: new Set(["math"]),
    knownLessonIds: new Set(["lesson"]),
    assetReferences: entry.references ?? [{ assetId: entry.asset.id, lessonId: "lesson", field: "blocks[0].assetId" }],
  });
  entry.after?.();
  const passed = entry.expectPass
    ? result.violations.length === 0
    : result.violations.some((violation) => violation.ruleId === entry.expectedRule);
  if (!passed) {
    failures += 1;
    console.error(`${entry.name} FAILED: expected ${entry.expectPass ? "no violations" : entry.expectedRule}; got ${result.violations.map((value) => value.ruleId).join(", ")}`);
  }
}

fs.rmSync(tempRoot, { recursive: true, force: true });
if (failures > 0) {
  console.error(`elementary asset fixture FAILED: ${failures}/${fixtures.length}`);
  process.exitCode = 1;
} else {
  console.log(`elementary asset fixture passed: ${fixtures.length} license, file, SVG, review, accessibility, and reference boundaries.`);
}
