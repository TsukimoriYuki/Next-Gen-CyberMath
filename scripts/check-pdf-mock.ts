// 手動作成PDF冊子模試が「正本」として実装されているかを検査する。
// npm run qa:pdf-mock

import fs from "node:fs";
import path from "node:path";
import { COMMON_TEST_MATH_1A_MANUAL_001 } from "../src/data/common-test/manual-mocks/math1a-001";
import { COMMON_TEST_MATH_1A_MANUAL_002 } from "../src/data/common-test/manual-mocks/math1a-002";

const ROOT = process.cwd();
const issues: string[] = [];
const warnings: string[] = [];
const exams = [COMMON_TEST_MATH_1A_MANUAL_001, COMMON_TEST_MATH_1A_MANUAL_002];

function check(condition: boolean, message: string) {
  if (!condition) issues.push(message);
}
function warn(condition: boolean, message: string) {
  if (!condition) warnings.push(message);
}

for (const exam of exams) {
  check(
    typeof exam.pdfUrl === "string" && exam.pdfUrl.length > 0,
    `${exam.id} has no pdfUrl field — the PDF booklet must be the source of truth`,
  );

  if (exam.pdfUrl) {
    const pdfPath = path.join(ROOT, "public", exam.pdfUrl.replace(/^\//, ""));
    check(fs.existsSync(pdfPath), `PDF file referenced by ${exam.id} does not exist on disk: ${pdfPath}`);
    if (fs.existsSync(pdfPath)) {
      const header = fs.readFileSync(pdfPath).subarray(0, 4).toString("ascii");
      check(header === "%PDF", `${exam.id} pdfUrl does not point to a PDF file header: ${exam.pdfUrl}`);
    }
  }

  check(
    exam.sections.length === 4 && exam.totalPoints === 100 && exam.durationMinutes === 70,
    `${exam.id} structured scoring data should be 4 sections / 100 points / 70 minutes`,
  );
  check(
    exam.sections.map((section) => section.points).join("/") === "30/30/20/20",
    `${exam.id} section points should be 30/30/20/20`,
  );
}

const pdfUrls = new Set(exams.map((exam) => exam.pdfUrl));
check(pdfUrls.size === exams.length, "manual mock PDF URLs should not be duplicated");

const viewerCandidates = [
  "src/components/common-test/mock-exam/CommonTestPdfMockViewer.tsx",
  "src/components/common-test/mock-exam/PdfMockBookletViewer.tsx",
];
const viewerPath = viewerCandidates.map((p) => path.join(ROOT, p)).find((p) => fs.existsSync(p));
check(
  Boolean(viewerPath),
  `no PDF booklet viewer component found (looked for: ${viewerCandidates.join(", ")}) — ` +
    "the manual mock route should render the PDF directly instead of reconstructing problem text in React",
);

if (viewerPath) {
  const viewer = fs.readFileSync(viewerPath, "utf8");
  check(/iframe|object|embed/i.test(viewer), `${path.relative(ROOT, viewerPath)} should embed the PDF via <iframe>/<object>/<embed>`);
  check(viewer.includes("download") || viewer.includes("ダウンロード"), `${path.relative(ROOT, viewerPath)} should offer a PDF download link`);
  check(/target=["']_blank["']|別タブ/.test(viewer), `${path.relative(ROOT, viewerPath)} should offer to open the PDF in a new tab`);
  check(/70\s*分|timer/i.test(viewer), `${path.relative(ROOT, viewerPath)} should show a 70-minute timer`);
  check(viewer.includes("exam.pdfUrl"), `${path.relative(ROOT, viewerPath)} should render the exam.pdfUrl passed from data`);
}

warn(
  false,
  "manual reminder: visually verify both manual-001 and manual-002 routes render their PDF booklets directly and do not regenerate problem text from React.",
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
    console.log("pdf-mock check passed (manual-001 and manual-002 PDF booklets are source-of-truth assets).");
  }
}
