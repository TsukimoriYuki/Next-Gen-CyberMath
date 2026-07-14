import { test, expect } from "@playwright/test";
import { PRODUCTION_SITE_URL } from "../src/lib/site";

const SELF_CANONICAL_ROUTES = [
  "/",
  "/math",
  "/units/numbers-and-expressions",
  "/lessons/am-gm-inequality",
  "/problems/expand-by-difference",
  `/tags/${encodeURIComponent("最大最小")}`,
  "/common-test",
  "/common-test/math-1a",
  "/common-test/lectures/numbers-expressions-core-skills",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs",
  "/courses",
  "/courses/math-1a",
  "/courses/math-1a/numbers-and-expressions",
  "/courses/math-1a/numbers-and-expressions/numbers-expressions-learning-map",
  "/english",
  "/english/grammar",
  "/english/speed-reading/sleep-and-memory",
  "/english/comprehension/plastic-ocean-pollution",
  "/english/multi-source/school-library-rules",
] as const;

for (const route of SELF_CANONICAL_ROUTES) {
  test(`${route} has one production self-canonical and matching og:url`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);

    const expected = route === "/" ? PRODUCTION_SITE_URL : `${PRODUCTION_SITE_URL}${route}`;
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    await expect(canonical).toHaveAttribute("href", expected);

    const openGraphUrl = page.locator('meta[property="og:url"]');
    await expect(openGraphUrl).toHaveCount(1);
    await expect(openGraphUrl).toHaveAttribute("content", expected);
  });
}

test("thin tags are noindex and absent from sitemap", async ({ page, request }) => {
  const route = `/tags/${encodeURIComponent("1/12公式")}`;
  const response = await page.goto(route, { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  expect(sitemapXml).not.toContain(`${PRODUCTION_SITE_URL}${route}`);
});

test("noindex, redirect, 404, and development-only routes stay out of sitemap", async ({
  page,
  request,
}) => {
  await page.goto("/common-test/lectures", { waitUntil: "domcontentloaded" });
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

  await page.goto("/lessons", { waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname).toBe("/courses");

  const notFoundResponse = await page.goto("/not-a-real-public-page", {
    waitUntil: "domcontentloaded",
  });
  expect(notFoundResponse?.status()).toBe(404);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

  const sitemapXml = await (await request.get("/sitemap.xml")).text();
  for (const route of [
    "/common-test/lectures</loc>",
    "/lessons</loc>",
    "/exam-sets</loc>",
    "/paper-sample",
    "/structured-prototype",
    "/common-test-math-1a-mock-001",
  ]) {
    expect(sitemapXml).not.toContain(route);
  }
  expect(sitemapXml).not.toContain("<lastmod>");
  expect(sitemapXml).not.toContain("localhost");
});
