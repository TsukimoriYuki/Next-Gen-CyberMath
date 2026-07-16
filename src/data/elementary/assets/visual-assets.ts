import type {
  ElementaryVisualAsset,
} from "@/types/elementary-assets";
import type {
  ElementaryInlineContent,
  ElementaryInlineSegment,
} from "@/types/elementary-content";

const text = (value: string): ElementaryInlineSegment => Object.freeze({ type: "text", text: value });
const plain = (value: string): ElementaryInlineContent => Object.freeze([text(value)]);

const divisionCookiesAsset: ElementaryVisualAsset = Object.freeze({
  id: "division-cookies-12-into-3",
  kind: "diagram",
  title: "12個のクッキーを3人に等分する図",
  creator: "Cyber Math",
  source: Object.freeze({
    sourceType: "original",
    downloadedFilename: "division-cookies-12-into-3.svg",
  }),
  localPath: "/elementary/assets/division-cookies-12-into-3.svg",
  rightsStatus: "cyber-math-original",
  licenseId: null,
  licenseUrl: null,
  attributionText: "Cyber Math独自作成",
  shortCredit: plain("Cyber Mathが作った図"),
  modification: Object.freeze({ modified: false }),
  retrievedAt: "2026-07-17",
  reviewedAt: "2026-07-17",
  reviewStatus: "approved",
  sourceVerified: true,
  humanReviewNotes: "独自作成SVG。外部素材、外部参照、個人情報を含まないことを確認済み。",
  checksumSha256: "6dd384baed2a03111b5f3706ce2e3a137f47119eca9ad666185aed517cd74c0c",
  mimeType: "image/svg+xml",
  width: 960,
  height: 480,
  fileSizeBytes: 2565,
  alt: plain("12このクッキーを3人へ4こずつ分けた図"),
  caption: plain("3人へ同じ数ずつ分けると、一人分は4こです。"),
  decorative: false,
  usage: Object.freeze({
    purpose: "concept-explanation",
    gradeIds: Object.freeze(["grade-3"] as const),
    subjectIds: Object.freeze(["math"] as const),
    lessonIds: Object.freeze(["elementary-grade-3-math-division-dialogue-showcase"] as const),
  }),
});

export const ELEMENTARY_VISUAL_ASSETS: readonly ElementaryVisualAsset[] = Object.freeze([
  divisionCookiesAsset,
]);
