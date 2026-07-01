// 手動作成PDF冊子模試が「正本」として実装されているかを検査する。
// npm run qa:pdf-mock
//
// 採点・配点・スロット整合そのものは npm run qa:manual-mock が検証済み。
// このスクリプトは「問題本文をPDFとしてそのまま表示しているか」を検査する。
//
// 検査内容:
//  - PDFファイルが public 配下に存在する
//  - PDF URLが手動模試データに設定されている
//  - PDF冊子ビューア（iframe/object等でPDFを直接表示するコンポーネント）が存在する
//  - 問題本文をReactコンポーネントとして再生成していない（本番導線側）
//  - 採点データ（構造化データ）は別途存在する

import fs from "node:fs";
import path from "node:path";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "../src/data/common-test/manual-mocks/math1a-001";

const ROOT = process.cwd();
const issues: string[] = [];
const warnings: string[] = [];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}
function warn(condition: boolean, message: string) {
  if (!condition) warnings.push(message);
}

const exam = COMMON_TEST_MATH_1A_MANUAL_001 as typeof COMMON_TEST_MATH_1A_MANUAL_001 & {
  pdfUrl?: string;
};

check(
  typeof exam.pdfUrl === "string" && exam.pdfUrl.length > 0,
  "COMMON_TEST_MATH_1A_MANUAL_001 has no pdfUrl field yet — the manual mock still has no PDF as its source of truth " +
    "(see docs/quality/pdf-mock-status.md for the pending decision on which PDF file to use)",
);

if (exam.pdfUrl) {
  const pdfPath = path.join(ROOT, "public", exam.pdfUrl.replace(/^\//, ""));
  check(fs.existsSync(pdfPath), `PDF file referenced by pdfUrl does not exist on disk: ${pdfPath}`);
}

const viewerCandidates = [
  "src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx",
  "src/components/common-test/mock-exam/PdfMockBookletViewer.tsx",
];
const viewerPath = viewerCandidates.map((p) => path.join(ROOT, p)).find((p) => fs.existsSync(p));
check(
  Boolean(viewerPath),
  `no PDF booklet viewer component found (looked for: ${viewerCandidates.join(", ")}) — ` +
    "the manual mock route should render the PDF directly (iframe/object) instead of reconstructing problem text in React",
);

if (viewerPath) {
  const viewer = fs.readFileSync(viewerPath, "utf8");
  check(/iframe|object|embed/i.test(viewer), `${path.relative(ROOT, viewerPath)} should embed the PDF via <iframe>/<object>/<embed>`);
  check(viewer.includes("download") || viewer.includes("ダウンロード"), `${path.relative(ROOT, viewerPath)} should offer a PDF download link`);
  check(/target=["']_blank["']|新しいタブ|別タブ/.test(viewer), `${path.relative(ROOT, viewerPath)} should offer to open the PDF in a new tab`);
  check(/70\s*分|タイマー|timer/i.test(viewer), `${path.relative(ROOT, viewerPath)} should show a 70-minute timer`);
}

// 採点データ（構造化データ）は別途存在するはず — これは qa:manual-mock が仕様面まで検証する。
check(
  exam.sections.length === 4 && exam.totalPoints === 100 && exam.durationMinutes === 70,
  "structured scoring data (sections/totalPoints/durationMinutes) should still exist independently of the PDF for grading — see npm run qa:manual-mock for full checks",
);

warn(
  false,
  "reminder: once pdfUrl exists, verify manually that the manual-001 route renders the PDF directly and does NOT regenerate problem text from React (this script cannot visually confirm rendering).",
);

report();

function report() {
  if (warnings.length > 0) {
    console.warn(`pdf-mock check: ${warnings.length} warning(s).`);
    for (const w of warnings) console.warn(`- ${w}`);
  }
  if (issues.length > 0) {
    console.error(`pdf-mock check FAILED: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log("pdf-mock check passed (PDF booklet is the source of truth for math-1a manual-001).");
  }
}
