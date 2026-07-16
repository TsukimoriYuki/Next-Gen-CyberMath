import path from "node:path";
import {
  ELEMENTARY_ASSET_LICENSES,
  ELEMENTARY_VISUAL_ASSETS,
} from "../src/data/elementary/assets";
import { ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE } from "../src/data/elementary/showcases/division-dialogue";
import { ELEMENTARY_GRADES } from "../src/data/elementary/grades";
import { ELEMENTARY_SUBJECTS } from "../src/data/elementary/subjects";
import { inspectElementaryAssets } from "./elementary-assets-validation";

const lesson = ELEMENTARY_DIVISION_DIALOGUE_SHOWCASE;
const assetReferences = lesson.blocks.flatMap((block, blockIndex) =>
  block.type === "visual" && block.assetId
    ? [{ assetId: block.assetId, lessonId: lesson.id, field: `blocks[${blockIndex}].assetId` }]
    : [],
);

const result = inspectElementaryAssets({
  licenses: ELEMENTARY_ASSET_LICENSES,
  assets: ELEMENTARY_VISUAL_ASSETS,
  publicRoot: path.join(process.cwd(), "public"),
  knownGradeIds: new Set(ELEMENTARY_GRADES.map((grade) => grade.id)),
  knownSubjectIds: new Set(ELEMENTARY_SUBJECTS.map((subject) => subject.id)),
  knownLessonIds: new Set([lesson.id]),
  assetReferences,
});

const approved = ELEMENTARY_VISUAL_ASSETS.filter((asset) => asset.reviewStatus === "approved").length;
const pending = ELEMENTARY_VISUAL_ASSETS.filter((asset) => asset.reviewStatus === "pending").length;
const external = ELEMENTARY_VISUAL_ASSETS.filter((asset) => asset.source.sourceType === "external").length;
const original = ELEMENTARY_VISUAL_ASSETS.filter((asset) => asset.source.sourceType === "original").length;
console.log(`elementary asset licenses: ${ELEMENTARY_ASSET_LICENSES.length}`);
console.log(`elementary assets: ${ELEMENTARY_VISUAL_ASSETS.length} (approved ${approved}, pending ${pending}, external ${external}, original ${original})`);
console.log(`elementary asset references: ${assetReferences.length}`);
console.log(`elementary asset warnings: ${result.warnings.length}`);

if (result.violations.length > 0) {
  console.error(`elementary asset QA FAILED: ${result.violations.length} violation(s).`);
  result.violations.forEach((entry) => console.error(JSON.stringify(entry)));
  process.exitCode = 1;
} else {
  console.log("elementary asset QA passed: licenses, local files, rights, checksums, SVG safety, and references are valid.");
}
