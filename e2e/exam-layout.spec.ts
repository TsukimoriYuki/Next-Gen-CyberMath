import { test, expect } from "@playwright/test";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 1280, height: 800 },
  { width: 1440, height: 900 },
  { width: 844, height: 390 },
] as const;

for (const viewport of VIEWPORTS) {
  test(`exam headers do not overlap at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/common-test/simulator/common-test-math-1a-manual-001");

    const siteHeader = page.getByTestId("site-header");
    const examHeader = page.getByTestId("exam-header");
    const initialSiteBox = await siteHeader.boundingBox();
    const initialExamBox = await examHeader.boundingBox();
    expect(initialSiteBox).not.toBeNull();
    expect(initialExamBox).not.toBeNull();
    expect(initialSiteBox!.y + initialSiteBox!.height).toBeLessThanOrEqual(initialExamBox!.y + 1);

    await page.evaluate(() => window.scrollTo(0, 700));
    const scrolledSiteBox = await siteHeader.boundingBox();
    const scrolledExamBox = await examHeader.boundingBox();
    expect(scrolledSiteBox).not.toBeNull();
    expect(scrolledExamBox).not.toBeNull();
    const overlap =
      Math.min(scrolledSiteBox!.y + scrolledSiteBox!.height, scrolledExamBox!.y + scrolledExamBox!.height) -
      Math.max(scrolledSiteBox!.y, scrolledExamBox!.y);
    expect(overlap).toBeLessThanOrEqual(0);

    await expect(page.getByRole("button", { name: "提出する" })).toBeVisible();
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);
    expect(scrollWidth).toBeLessThanOrEqual(innerWidth + 1);
  });
}
