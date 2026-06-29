import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import {
  getSpecialLectureBySlug,
  SPECIAL_LECTURES,
  type Lecture,
  type LectureBlock,
} from "../src/data/specialLectures";
import { MASTERY_LECTURE_GUIDES } from "../src/lib/special-lecture-guidance";
import {
  getAllLessons,
  getAllProblems,
  getAllSlugs,
  getProblem,
} from "../src/lib/content";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";
import { generateMetadata as generateEnglishReadingSectionMetadata } from "../src/app/common-test/english-reading/[sectionId]/page";
import { generateMetadata as generateLectureMetadata } from "../src/app/common-test/lectures/[slug]/page";
import { generateMetadata as generateMath1ASectionMetadata } from "../src/app/common-test/math-1a/[sectionId]/page";
import { generateMetadata as generateMath2BCSectionMetadata } from "../src/app/common-test/math-2bc/[sectionId]/page";
import {
  PRODUCTION_SITE_URL,
  PUBLIC_INFO_LINKS,
  getSiteUrl,
} from "../src/lib/site";

const ROOT = process.cwd();
const SCAN_DIRS = ["src/data", "src/components", "src/app", "src/lib"];
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".md", ".mdx"]);
const REQUIRED_PUBLIC_ROUTES = [
  "/about",
  "/privacy",
  "/terms",
  "/contact",
  "/licenses",
  "/quality",
];
const REQUIRED_SECURITY_HEADERS = [
  "Content-Security-Policy-Report-Only",
  "Referrer-Policy",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Permissions-Policy",
  "Strict-Transport-Security",
];
const IMPORTANT_METADATA_ROUTES = [
  "/",
  "/math",
  "/common-test",
  "/courses",
  "/units",
  "/common-test/lectures",
  "/about",
  "/quality",
  "/privacy",
  "/terms",
  "/contact",
  "/licenses",
  "/auth/login",
  "/auth/register",
];
const REQUIRED_SITEMAP_ROUTES = [
  "/",
  "/math",
  "/common-test",
  "/courses",
  "/units",
  "/common-test/lectures",
  "/quality",
  "/privacy",
  "/terms",
  "/contact",
  "/about",
  "/licenses",
  "/common-test/lectures/math-1a-shortcut-formulas",
  "/common-test/lectures/quadratic-case-split-intensive",
];
const REQUIRED_QA_DOCS = [
  "docs/performance-checklist.md",
  "docs/release-checklist.md",
  "docs/accessibility-backlog.md",
  "docs/release-qa-results.md",
];

const MOJIBAKE_PATTERNS = [
  "�",
  "ã",
  "ã\u0081",
  "ã\u0082",
  "ã\u0083",
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
  "數",
  "隕",
];

const UNSAFE_UI_TEXT_PATTERN =
  /\b(ctaLabel|buttonLabel|buttonText|ariaLabel)\s*:\s*("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g;
const RAW_MATH_PATTERN = /(\$(?!\{)[^$\n]+\$|\\(?:frac|dfrac|sin|cos|sqrt|theta|angle|cdot)\b|\bNaN\b|\bundefined\b|\bInvalid Date\b|0\s*\/\s*0)/;

const issues: string[] = [];
const warnings: string[] = [];

function relative(file: string) {
  return path.relative(ROOT, file).replaceAll("\\", "/");
}

function walk(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
  return files;
}

function lineOf(text: string, index: number) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function appRouteFile(route: string) {
  if (route === "/") return path.join(ROOT, "src/app/page.tsx");
  return path.join(ROOT, "src/app", route.slice(1), "page.tsx");
}

function warn(message: string) {
  warnings.push(message);
}

function isLocalUrl(url: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:\/|$)/.test(url);
}

function expectedUrl(route: string) {
  return `${getSiteUrl()}${route}`;
}

function asRecord(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : undefined;
}

function metadataUrlValue(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof URL) return value.toString();

  const record = asRecord(value);
  if (record && "url" in record) return metadataUrlValue(record.url);

  return "";
}

function metadataUrlMatchesRoute(value: string, route: string) {
  return value === route || value === expectedUrl(route);
}

function unquoteSourceLiteral(value: string) {
  return value.slice(1, -1);
}

function checkSourceFiles() {
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(ROOT, dir))) {
      const source = fs.readFileSync(file, "utf8");
      const rel = relative(file);

      for (const pattern of MOJIBAKE_PATTERNS) {
        const index = source.indexOf(pattern);
        if (index >= 0) {
          issues.push(`${rel}:${lineOf(source, index)} mojibake candidate "${pattern}"`);
        }
      }

      UNSAFE_UI_TEXT_PATTERN.lastIndex = 0;
      for (const match of source.matchAll(UNSAFE_UI_TEXT_PATTERN)) {
        const value = unquoteSourceLiteral(match[2]);
        if (value.includes("${")) continue;
        if (RAW_MATH_PATTERN.test(value)) {
          issues.push(
            `${rel}:${lineOf(source, match.index ?? 0)} raw math in ${match[1]}: ${value}`,
          );
        }
      }
    }
  }
}

function collectStringValues(value: unknown, values: string[]) {
  if (typeof value === "string") {
    values.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStringValues(item, values);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) collectStringValues(item, values);
  }
}

function blockIdsForLecture(lecture: Lecture) {
  return new Set(lecture.blocks.map((block) => block.id));
}

function checkDuplicateLectureBlockIds() {
  for (const lecture of SPECIAL_LECTURES) {
    const seen = new Set<string>();
    for (const block of lecture.blocks) {
      if (seen.has(block.id)) {
        issues.push(`${lecture.slug}: duplicate lecture block id ${block.id}`);
      }
      seen.add(block.id);
    }
  }
}

function validateLectureHref(href: string, currentLecture: Lecture, context: string) {
  if (!href.includes("#")) return;

  if (href.startsWith("#")) {
    const blockId = href.slice(1);
    if (!blockIdsForLecture(currentLecture).has(blockId)) {
      issues.push(`${context}: missing anchor ${href} in ${currentLecture.slug}`);
    }
    return;
  }

  const match = href.match(/^\/common-test\/lectures\/([^#]+)#(.+)$/);
  if (!match) return;

  const [, lectureSlug, blockId] = match;
  const lecture = getSpecialLectureBySlug(lectureSlug);
  if (!lecture) {
    issues.push(`${context}: unknown lecture route ${lectureSlug}`);
    return;
  }
  if (!blockIdsForLecture(lecture).has(blockId)) {
    issues.push(`${context}: missing anchor #${blockId} in ${lecture.slug}`);
  }
}

function checkLectureAnchors() {
  for (const lecture of SPECIAL_LECTURES) {
    lecture.blocks.forEach((block: LectureBlock, index: number) => {
      const values: string[] = [];
      collectStringValues(block, values);
      for (const value of values) {
        if (value.startsWith("#") || value.startsWith("/common-test/lectures/")) {
          validateLectureHref(value, lecture, `${lecture.slug}:block[${index}]`);
        }
      }
    });
  }

  for (const guide of MASTERY_LECTURE_GUIDES) {
    for (const link of guide.recoveryLinks) {
      validateLectureHref(link.href, getSpecialLectureBySlug(guide.lectureSlug)!, `${guide.lectureSlug}:recoveryLinks`);
    }
  }
}

function checkContentRelations() {
  const lessonSlugs = new Set(getAllLessons().map((lesson) => lesson.slug));
  const lectureSlugs = new Set(SPECIAL_LECTURES.map((lecture) => lecture.slug));

  for (const slug of getAllSlugs()) {
    const problem = getProblem(slug);
    if (!problem) {
      issues.push(`problems:${slug}: getProblem returned undefined`);
      continue;
    }
    if (problem.relatedLessonSlug && !lessonSlugs.has(problem.relatedLessonSlug)) {
      issues.push(`${problem.slug}: unknown relatedLessonSlug ${problem.relatedLessonSlug}`);
    }
    for (const step of problem.steps) {
      if (step.relatedLessonSlug && !lessonSlugs.has(step.relatedLessonSlug)) {
        issues.push(`${problem.slug}: step ${step.order} unknown relatedLessonSlug ${step.relatedLessonSlug}`);
      }
    }
  }

  for (const guide of MASTERY_LECTURE_GUIDES) {
    if (!lectureSlugs.has(guide.lectureSlug)) {
      issues.push(`mastery guide references missing lecture ${guide.lectureSlug}`);
    }
  }

  // Public problem lists should not contain empty titles or tags that render as dead cards.
  for (const problem of getAllProblems()) {
    if (!problem.title.trim()) issues.push(`${problem.slug}: empty title`);
    if (!problem.statement.trim()) issues.push(`${problem.slug}: empty statement`);
  }
}

function checkPublicRoutesAndFooter() {
  for (const route of REQUIRED_PUBLIC_ROUTES) {
    const file = appRouteFile(route);
    if (!fs.existsSync(file)) {
      issues.push(`missing public route file ${relative(file)}`);
    }
  }

  const footerRoutes = new Set<string>(PUBLIC_INFO_LINKS.map((link) => link.href));
  for (const route of REQUIRED_PUBLIC_ROUTES) {
    if (!footerRoutes.has(route)) {
      issues.push(`footer missing required link ${route}`);
    }
  }

  for (const link of PUBLIC_INFO_LINKS) {
    if (!fs.existsSync(appRouteFile(link.href))) {
      issues.push(`footer link points to missing route ${link.href}`);
    }
    if (!link.label.trim()) {
      issues.push(`footer link has empty label ${link.href}`);
    }
  }

  for (const file of ["src/app/robots.ts", "src/app/sitemap.ts"]) {
    if (!fs.existsSync(path.join(ROOT, file))) {
      issues.push(`missing ${file}`);
    }
  }
}

function checkMetadataCoverage() {
  for (const route of IMPORTANT_METADATA_ROUTES) {
    const file = appRouteFile(route);
    if (!fs.existsSync(file)) {
      issues.push(`metadata route missing file ${route}`);
      continue;
    }
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("metadata")) {
      issues.push(`${relative(file)}: missing metadata export`);
    }
    if (!source.includes("description")) {
      issues.push(`${relative(file)}: missing metadata description`);
    }
    if (route !== "/" && !source.includes("canonical")) {
      issues.push(`${relative(file)}: missing canonical metadata`);
    }
    if (!source.includes("openGraph")) {
      issues.push(`${relative(file)}: missing openGraph metadata`);
    }
    if (route !== "/" && !source.includes("url:")) {
      warnings.push(`${relative(file)}: openGraph url is not explicit`);
    }
    if (source.includes("CYBER OS")) {
      issues.push(`${relative(file)}: legacy CYBER OS title remains`);
    }
  }

  const titles = new Map<string, string[]>();
  for (const route of IMPORTANT_METADATA_ROUTES) {
    const file = appRouteFile(route);
    if (!fs.existsSync(file)) continue;
    const source = fs.readFileSync(file, "utf8");
    const match = source.match(/title:\s*(?:\{[\s\S]*?absolute:\s*)?["`]([^"`]+)["`]/);
    if (!match) continue;
    const title = match[1];
    const routes = titles.get(title) ?? [];
    routes.push(route);
    titles.set(title, routes);
  }
  for (const [title, routes] of titles) {
    if (routes.length > 1) {
      issues.push(`duplicate metadata title "${title}" on ${routes.join(", ")}`);
    }
  }
}

function checkSecurityHeaders() {
  const configPath = path.join(ROOT, "next.config.ts");
  if (!fs.existsSync(configPath)) {
    issues.push("missing next.config.ts");
    return;
  }
  const source = fs.readFileSync(configPath, "utf8");
  for (const header of REQUIRED_SECURITY_HEADERS) {
    if (!source.includes(header)) {
      issues.push(`next.config.ts missing security header ${header}`);
    }
  }
}

function checkQaDocs() {
  for (const file of REQUIRED_QA_DOCS) {
    const fullPath = path.join(ROOT, file);
    if (!fs.existsSync(fullPath)) {
      issues.push(`missing QA document ${file}`);
      continue;
    }
    const source = fs.readFileSync(fullPath, "utf8");
    if (!source.trim()) {
      issues.push(`empty QA document ${file}`);
    }
  }
}

function checkSiteUrlConfig() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const siteUrl = getSiteUrl();

  try {
    const parsed = new URL(siteUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      issues.push(`NEXT_PUBLIC_SITE_URL has unsupported protocol: ${siteUrl}`);
    }
  } catch {
    issues.push(`NEXT_PUBLIC_SITE_URL is not a valid URL: ${siteUrl}`);
    return;
  }

  if (!raw) {
    warn(
      `NEXT_PUBLIC_SITE_URL is not set. Falling back to ${PRODUCTION_SITE_URL}; set it explicitly in Vercel before release.`,
    );
  } else if (isLocalUrl(raw)) {
    warn(
      `NEXT_PUBLIC_SITE_URL points to a local URL (${raw}). This is fine for local QA, but production must use ${PRODUCTION_SITE_URL}.`,
    );
  }

  if (siteUrl.endsWith("/")) {
    issues.push(`getSiteUrl() should not return a trailing slash: ${siteUrl}`);
  }
}

function checkSitemapAndRobots() {
  const siteUrl = getSiteUrl();
  const sitemapEntries = sitemap();
  const sitemapUrls = new Set(sitemapEntries.map((entry) => entry.url));

  for (const route of REQUIRED_SITEMAP_ROUTES) {
    const url = expectedUrl(route);
    if (!sitemapUrls.has(url)) {
      issues.push(`sitemap missing ${url}`);
    }
  }

  for (const entry of sitemapEntries) {
    if (!entry.url.startsWith(`${siteUrl}/`) && entry.url !== siteUrl) {
      issues.push(`sitemap URL does not use site URL prefix: ${entry.url}`);
    }
  }

  const robotsConfig = robots();
  const robotSitemaps = Array.isArray(robotsConfig.sitemap)
    ? robotsConfig.sitemap
    : [robotsConfig.sitemap].filter(Boolean);
  const expectedSitemap = `${siteUrl}/sitemap.xml`;
  if (!robotSitemaps.includes(expectedSitemap)) {
    issues.push(`robots.txt does not reference ${expectedSitemap}`);
  }
}

async function checkRepresentativeDynamicMetadata() {
  const checks: Array<{ route: string; metadata: Promise<Metadata> }> = [
    {
      route: "/common-test/lectures/math-1a-shortcut-formulas",
      metadata: generateLectureMetadata({
        params: Promise.resolve({ slug: "math-1a-shortcut-formulas" }),
      }),
    },
    {
      route: "/common-test/math-1a/section-2",
      metadata: generateMath1ASectionMetadata({
        params: Promise.resolve({ sectionId: "section-2" }),
      }),
    },
    {
      route: "/common-test/math-2bc/section-3",
      metadata: generateMath2BCSectionMetadata({
        params: Promise.resolve({ sectionId: "section-3" }),
      }),
    },
    {
      route: "/common-test/english-reading/section-5",
      metadata: generateEnglishReadingSectionMetadata({
        params: Promise.resolve({ sectionId: "section-5" }),
      }),
    },
  ];

  for (const check of checks) {
    const metadata = await check.metadata;
    const alternates = asRecord(metadata.alternates);
    const openGraph = asRecord(metadata.openGraph);
    const canonical = metadataUrlValue(alternates?.canonical);
    const ogUrl = metadataUrlValue(openGraph?.url);

    if (!metadata.description) {
      issues.push(`${check.route}: missing dynamic metadata description`);
    }
    if (!metadata.title) {
      issues.push(`${check.route}: missing dynamic metadata title`);
    }
    if (!canonical || !metadataUrlMatchesRoute(canonical, check.route)) {
      issues.push(`${check.route}: dynamic canonical should point to its own route`);
    }
    if (!ogUrl || !metadataUrlMatchesRoute(ogUrl, check.route)) {
      issues.push(`${check.route}: dynamic openGraph url should point to its own route`);
    }
  }
}

function checkDuplicateStaticIds() {
  for (const dir of ["src/app", "src/components"]) {
    for (const file of walk(path.join(ROOT, dir))) {
      const source = fs.readFileSync(file, "utf8");
      const ids = new Map<string, number[]>();
      for (const match of source.matchAll(/\sid=["']([^"']+)["']/g)) {
        const id = match[1];
        const lines = ids.get(id) ?? [];
        lines.push(lineOf(source, match.index ?? 0));
        ids.set(id, lines);
      }
      for (const [id, lines] of ids) {
        if (lines.length > 1) {
          warn(`${relative(file)}: duplicate literal id "${id}" on lines ${lines.join(", ")}`);
        }
      }
    }
  }
}

function checkReviewShortcutRoutes() {
  for (const route of ["/review", "/history"]) {
    const file = appRouteFile(route);
    if (!fs.existsSync(file)) {
      issues.push(`missing shortcut route ${route}`);
      continue;
    }
    const source = fs.readFileSync(file, "utf8");
    if (!source.includes("redirect(")) {
      issues.push(`${relative(file)}: shortcut route should redirect`);
    }
  }
}

async function main() {
  checkSourceFiles();
  checkSiteUrlConfig();
  checkPublicRoutesAndFooter();
  checkMetadataCoverage();
  checkSecurityHeaders();
  checkQaDocs();
  checkSitemapAndRobots();
  await checkRepresentativeDynamicMetadata();
  checkDuplicateStaticIds();
  checkDuplicateLectureBlockIds();
  checkLectureAnchors();
  checkContentRelations();
  checkReviewShortcutRoutes();

  if (issues.length > 0) {
    console.error(`Public quality check failed: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    if (warnings.length > 0) {
      console.warn(`Public quality warnings: ${warnings.length} warning(s).`);
      for (const warning of warnings) console.warn(`- ${warning}`);
    }
    process.exitCode = 1;
  } else {
    console.log("Public quality check passed.");
    if (warnings.length > 0) {
      console.warn(`Public quality warnings: ${warnings.length} warning(s).`);
      for (const warning of warnings) console.warn(`- ${warning}`);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
