const DEFAULT_BASE_URL = "https://next-gen-cyber-math.vercel.app";

const baseUrl = (process.env.LIVE_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, "");

const REQUIRED_ROUTES = [
  "/",
  "/math",
  "/courses",
  "/units",
  "/mypage",
  "/common-test",
  "/common-test/math-1a",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/common-test/simulator/common-test-math-1a-manual-002",
  "/mock",
  "/quality",
  "/privacy",
  "/terms",
  "/contact",
  "/about",
  "/licenses",
];

const issues: string[] = [];

async function fetchText(route: string) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "manual" });
  if (response.status < 200 || response.status >= 400) {
    issues.push(`${route}: expected 2xx/3xx, got ${response.status}`);
  }
  return response.text();
}

function assertIncludes(route: string, html: string, text: string) {
  const htmlWithoutComments = html.replace(/<!--[\s\S]*?-->/g, "");
  if (!html.includes(text) && !htmlWithoutComments.includes(text)) {
    issues.push(`${route}: expected to include "${text}"`);
  }
}

function assertExcludes(route: string, html: string, text: string) {
  const index = html.indexOf(text);
  if (index >= 0) {
    const snippet = html.slice(Math.max(0, index - 80), index + text.length + 80).replace(/\s+/g, " ");
    issues.push(`${route}: should not include "${text}" near "${snippet}"`);
  }
}

async function main() {
  const pages = new Map<string, string>();
  for (const route of REQUIRED_ROUTES) {
    pages.set(route, await fetchText(route));
  }

  const home = pages.get("/") ?? "";
  assertIncludes("/", home, "Cyber Math");
  assertExcludes("/", home, "C Y B E R");

  const commonTest = pages.get("/common-test") ?? "";
  assertIncludes("/common-test", commonTest, "common-test-math-1a-manual-001");
  assertIncludes("/common-test", commonTest, "common-test-math-1a-manual-002");
  assertIncludes("/common-test", commonTest, "math-1a");
  for (const bad of ["64/80", "57/75", "70/85", "Analyzing Data"]) {
    assertExcludes("/common-test", commonTest, bad);
  }

  const math1a = pages.get("/common-test/math-1a") ?? "";
  assertIncludes("/common-test/math-1a", math1a, "common-test-math-1a-manual-001");
  assertIncludes("/common-test/math-1a", math1a, "common-test-math-1a-manual-002");
  assertIncludes("/common-test/math-1a", math1a, "math-1a/section-1");

  const courses = pages.get("/courses") ?? "";
  assertIncludes("/courses", courses, "Courses");
  assertExcludes("/courses", courses, ">0\u8b1b\u5ea7<");
  assertExcludes("/courses", courses, "CYBER OS | CYBER OS");

  const quality = pages.get("/quality") ?? "";
  for (const text of ["Quality", "Cyber Math", "2026"]) {
    assertIncludes("/quality", quality, text);
  }

  const contact = pages.get("/contact") ?? "";
  for (const text of ["Contact", "Cyber Math"]) {
    assertIncludes("/contact", contact, text);
  }

  const paper = pages.get("/common-test/simulator/common-test-math-1a-manual-001") ?? "";
  assertIncludes("/common-test/simulator/common-test-math-1a-manual-001", paper, "70分");
  assertExcludes("/common-test/simulator/common-test-math-1a-manual-001", paper, "Invalid Date");
  const paper002 = pages.get("/common-test/simulator/common-test-math-1a-manual-002") ?? "";
  assertIncludes("/common-test/simulator/common-test-math-1a-manual-002", paper002, "70分");
  assertExcludes("/common-test/simulator/common-test-math-1a-manual-002", paper002, "Invalid Date");

  const sitemap = await fetchText("/sitemap.xml");
  assertIncludes("/sitemap.xml", sitemap, "/common-test/simulator/common-test-math-1a-manual-001");
  assertIncludes("/sitemap.xml", sitemap, "/common-test/simulator/common-test-math-1a-manual-002");

  if (issues.length > 0) {
    console.error(`Live public quality check failed for ${baseUrl}: ${issues.length} issue(s).`);
    for (const issue of issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Live public quality check passed for ${baseUrl}.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
