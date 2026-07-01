import fs from "node:fs";
import path from "node:path";
import sitemap from "../src/app/sitemap";
import { PRODUCTION_SITE_URL, PUBLIC_INFO_LINKS, getSiteUrl } from "../src/lib/site";

const ROOT = process.cwd();
const issues: string[] = [];
const warnings: string[] = [];

const REQUIRED_PAGE_ROUTES = [
  "/",
  "/math",
  "/courses",
  "/units",
  "/mypage",
  "/common-test",
  "/common-test/math-1a",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/mock",
  "/quality",
  "/privacy",
  "/terms",
  "/contact",
  "/about",
  "/licenses",
  "/auth/register",
];

const REQUIRED_SITEMAP_ROUTES = [
  "/",
  "/math",
  "/courses",
  "/units",
  "/common-test",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/quality",
  "/privacy",
  "/terms",
  "/contact",
  "/about",
  "/licenses",
  "/common-test/lectures/math-1a-shortcut-formulas",
];

const TARGETED_MOJIBAKE_FILES = [
  "src/app/common-test/page.tsx",
  "src/app/common-test/math-1a/page.tsx",
  "src/app/courses/page.tsx",
  "src/app/mypage/page.tsx",
  "src/app/quality/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/auth/register/page.tsx",
  "src/components/auth/AuthForm.tsx",
  "src/components/common-test/CommonTestSubjectCard.tsx",
  "src/components/common-test/CommonTestSubjectPage.tsx",
  "src/components/common-test/CommonTestTargetScorePanel.tsx",
  "src/components/common-test/CommonTestSectionGrid.tsx",
  "src/components/common-test/CommonTestLearningPrescription.tsx",
  "src/components/common-test/CommonTestMissionCard.tsx",
  "src/components/common-test/CommonTestReviewSummary.tsx",
  "src/components/public/PublicInfoPage.tsx",
  "src/data/common-test.ts",
  "src/lib/site.ts",
];

const BAD_PUBLIC_TEXT = [
  "C Y B E R",
  "脳波スキャン中",
  "Analyzing Data",
  "未診断のため仮スコア",
  "64/80",
  "57/75",
  "70/85",
  "CYBER OS | CYBER OS",
];

const MOJIBAKE_PATTERNS = [
  "�",
  "ã",
  "Ã",
  "Â",
  "縺",
  "譁",
  "蜃",
  "蠑",
  "驥",
  "髮",
  "繧",
  "荳",
  "邱",
  "隕",
  "謨",
  "蜈",
  "蝠",
  "蛻",
  "蟄",
];

const RAW_MATH_PATTERN =
  /(\$(?!\{)[^$\n]+\$|\\(?:frac|dfrac|sin|cos|sqrt|theta|angle|cdot)\b|0\s*\/\s*0)/;

function read(relativePath: string) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function exists(relativePath: string) {
  return fs.existsSync(path.join(ROOT, relativePath));
}

function lineOf(text: string, index: number) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function routeFile(route: string) {
  if (route === "/") return "src/app/page.tsx";
  if (route.startsWith("/common-test/simulator/")) {
    return "src/app/common-test/simulator/[examId]/page.tsx";
  }
  return `src/app/${route.slice(1)}/page.tsx`;
}

function checkRouteFiles() {
  for (const route of REQUIRED_PAGE_ROUTES) {
    const file = routeFile(route);
    if (!exists(file)) {
      issues.push(`missing public route file for ${route}: ${file}`);
    }
  }
}

function checkSiteConfig() {
  if (getSiteUrl() !== PRODUCTION_SITE_URL) {
    warnings.push(`NEXT_PUBLIC_SITE_URL is ${getSiteUrl()}, production constant is ${PRODUCTION_SITE_URL}`);
  }
  const footerHrefs = new Set<string>(PUBLIC_INFO_LINKS.map((link) => link.href));
  for (const route of ["/quality", "/privacy", "/terms", "/contact", "/about", "/licenses"]) {
    if (!footerHrefs.has(route)) {
      issues.push(`footer/public info links must include ${route}`);
    }
  }
}

async function checkSitemap() {
  const entries = await sitemap();
  const urls = entries.map((entry) => entry.url);
  for (const route of REQUIRED_SITEMAP_ROUTES) {
    const expected = `${getSiteUrl()}${route}`;
    if (!urls.includes(expected)) {
      issues.push(`sitemap missing ${expected}`);
    }
  }
}

function checkTargetedMojibake() {
  for (const file of TARGETED_MOJIBAKE_FILES) {
    if (!exists(file)) {
      issues.push(`missing targeted QA file ${file}`);
      continue;
    }
    const source = read(file);
    for (const pattern of MOJIBAKE_PATTERNS) {
      const index = source.indexOf(pattern);
      if (index >= 0) {
        issues.push(`${file}:${lineOf(source, index)} mojibake candidate "${pattern}"`);
      }
    }
  }
}

function checkBadPublicText() {
  const files = [
    ...TARGETED_MOJIBAKE_FILES,
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "src/lib/site.ts",
  ].filter(exists);

  for (const file of files) {
    const source = read(file);
    for (const text of BAD_PUBLIC_TEXT) {
      const index = source.indexOf(text);
      if (index >= 0) {
        issues.push(`${file}:${lineOf(source, index)} should not expose "${text}"`);
      }
    }
  }
}

function checkHomeHeadline() {
  const source = read("src/app/page.tsx");
  const h1 = source.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  if (!h1) {
    issues.push("src/app/page.tsx: missing H1");
    return;
  }
  const text = h1[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  if (text.includes("C Y B E R") || !text.includes("高校数学")) {
    issues.push(`home H1 should be a descriptive service headline, got "${text}"`);
  }
}

function checkCoursesPage() {
  const source = read("src/app/courses/page.tsx");
  if (source.includes("0講座")) {
    issues.push("src/app/courses/page.tsx: empty course cards must say 準備中, not 0講座");
  }
  if (!source.includes("準備中")) {
    issues.push("src/app/courses/page.tsx: should include 準備中 state for empty course cards");
  }
  if (!source.includes('title: "講座集"')) {
    issues.push("src/app/courses/page.tsx: metadata title should be 講座集");
  }
}

function checkMyPageNoDataState() {
  const source = read("src/app/mypage/page.tsx");
  for (const text of ["まだ学習データがありません", "共通テスト対策を始める", "大問別ドリルを解く", "冊子型模試を受ける"]) {
    if (!source.includes(text)) {
      issues.push(`src/app/mypage/page.tsx: no-data state must include "${text}"`);
    }
  }
}

function checkCommonTestRouting() {
  const commonTestPage = read("src/app/common-test/page.tsx");
  const subjectCard = read("src/components/common-test/CommonTestSubjectCard.tsx");
  const subjectPage = read("src/components/common-test/CommonTestSubjectPage.tsx");
  const commonData = read("src/data/common-test.ts");
  const specialLectures = read("src/data/specialLectures.ts");

  for (const [file, source] of [
    ["src/app/common-test/page.tsx", commonTestPage],
    ["src/data/specialLectures.ts", specialLectures],
  ] as const) {
    if (!source.includes("common-test-math-1a-manual-001")) {
      issues.push(`${file}: main math IA exam route should point to common-test-math-1a-manual-001`);
    }
  }

  // CommonTestSubjectCard / CommonTestSubjectPage now resolve the math-1a mock link through the
  // common-test-experiences registry instead of hardcoding the id — check they use the registry
  // (correctness of the registry's resolution itself is covered by qa:common-test-routing).
  for (const [file, source] of [
    ["src/components/common-test/CommonTestSubjectCard.tsx", subjectCard],
    ["src/components/common-test/CommonTestSubjectPage.tsx", subjectPage],
  ] as const) {
    if (!source.includes("common-test-experiences") || !source.includes("findPublicExperience")) {
      issues.push(`${file}: main math IA exam route should resolve via the common-test-experiences registry (findPublicExperience)`);
    }
  }

  if (!commonTestPage.includes("PDF本文を正本として転記した4大問 / 100点 / 70分")) {
    issues.push("src/app/common-test/page.tsx: manual PDF mock specs should be visible in the main CTA");
  }

  const math1ABlock = commonData.split('id: "math-1a"')[1]?.split('id: "math-2bc"')[0] ?? "";
  for (const forbidden of ["選択問題", "両方を仕上げる", "estimatedScoreMock: 64"]) {
    if (math1ABlock.includes(forbidden)) {
      issues.push(`src/data/common-test.ts math-1a block should not include old wording "${forbidden}"`);
    }
  }
}

function checkQualityAndContactPages() {
  const quality = read("src/app/quality/page.tsx");
  for (const text of [
    "オリジナル教材",
    "過去問本文",
    "数式表示",
    "公開前QA",
    "模試品質レビュー",
    "誤り報告",
    "2026年7月1日",
  ]) {
    if (!quality.includes(text)) {
      issues.push(`src/app/quality/page.tsx: should include "${text}"`);
    }
  }

  const contact = read("src/app/contact/page.tsx");
  for (const text of ["教材内容の誤り報告", "一般のお問い合わせ", "削除依頼", "脆弱性報告"]) {
    if (!contact.includes(text)) {
      issues.push(`src/app/contact/page.tsx: should include "${text}"`);
    }
  }
}

function checkRegisterMentorCodeWording() {
  const form = read("src/components/auth/AuthForm.tsx");
  const page = read("src/app/auth/register/page.tsx");
  if (!form.includes("指導者向け招待コード") || !page.includes("指導者向け招待コード")) {
    issues.push("register: mentor code UI should be described as 指導者向け招待コード");
  }
  if (!form.includes("学校・塾などで案内された場合のみ")) {
    issues.push("register: mentor code placeholder/hint should say 学校・塾などで案内された場合のみ");
  }
  if (form.includes("師範コード") || page.includes("師範コード")) {
    issues.push("register: should not expose 師範コード wording");
  }
}

function checkRawMathInUiText() {
  for (const file of TARGETED_MOJIBAKE_FILES.filter(exists)) {
    const source = read(file);
    const unsafeLiteralPattern =
      /\b(title|label|ctaLabel|buttonLabel|buttonText|ariaLabel|placeholder)\s*:\s*("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
    for (const match of source.matchAll(unsafeLiteralPattern)) {
      const literal = match[2].slice(1, -1);
      if (RAW_MATH_PATTERN.test(literal)) {
        issues.push(`${file}:${lineOf(source, match.index ?? 0)} raw math in UI literal: ${literal}`);
      }
    }
  }
}

async function main() {
  checkRouteFiles();
  checkSiteConfig();
  await checkSitemap();
  checkTargetedMojibake();
  checkBadPublicText();
  checkHomeHeadline();
  checkCoursesPage();
  checkMyPageNoDataState();
  checkCommonTestRouting();
  checkQualityAndContactPages();
  checkRegisterMentorCodeWording();
  checkRawMathInUiText();

  if (issues.length > 0) {
    console.error(`Public quality check failed: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
  } else {
    console.log("Public quality check passed.");
    if (warnings.length > 0) {
      console.warn(`Warnings: ${warnings.length}`);
      for (const warning of warnings) console.warn(`- ${warning}`);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
