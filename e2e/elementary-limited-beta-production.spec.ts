import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/elementary",
  "/elementary/grade-3",
  "/elementary/grade-3/math",
  "/elementary/grade-3/math/units/division",
  "/elementary/grade-3/math/units/division/lessons/division-meaning",
  "/elementary/grade-3/japanese",
  "/elementary/grade-3/japanese/units/story-reading",
  "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change",
  "/elementary/grade-3/social-studies",
  "/elementary/grade-3/social-studies/units/local-community",
  "/elementary/grade-3/social-studies/units/local-community/lessons/read-neighborhood-map",
  "/elementary/for-guardians",
  "/elementary/credits",
  "/learn",
] as const;

const HIDDEN_ROUTES = [
  "/elementary/showcase/content-inventory",
  "/elementary/showcase/curriculum",
  "/elementary/showcase/publication-readiness",
  "/elementary/showcase/limited-beta-release",
  "/elementary/showcase/lesson-blocks",
  "/elementary/showcase/visual-assets",
  "/elementary/showcase/division-dialogue",
  "/elementary/grade-4",
  "/elementary/grade-5",
  "/elementary/grade-6",
  "/elementary/grade-3/science",
  "/elementary/grade-3/exam-prep",
  "/elementary/grade-3/unknown-subject",
  "/elementary/grade-3/math/units/unknown-unit",
  "/elementary/grade-3/math/units/division/lessons/unknown-lesson",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

async function expectLimitedBetaBadge(page: Page) {
  const notice = page.getByTestId("elementary-beta-notice-full");
  await expect(notice).toBeVisible();
  const baseText = await notice.locator("ruby").first().evaluate((ruby) =>
    [...ruby.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent ?? "")
      .join(""),
  );
  expect(baseText).toBe("限定β版");
}

test("approved limited beta routes are public in production", async ({ page }) => {
  for (const route of PUBLIC_ROUTES) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
});

test("excluded elementary scopes remain 404 in production", async ({ page }) => {
  for (const route of HIDDEN_ROUTES) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(404);
  }
});

test("limited beta is visible, linked from learn, and remains noindex", async ({ page }) => {
  await page.goto("/learn");
  const card = page.getByRole("link", { name: "小学生版を開く" });
  await expect(card).toBeVisible();
  await expect(card).toContainText("小学3年生・限定β・3講座");
  await card.click();
  await expect(page).toHaveURL(/\/elementary$/);
  await expectLimitedBetaBadge(page);
  await expect(page.getByText("もんだいは24問です。", { exact: true })).toBeVisible();
  await expect(page.getByText("小学3年生で学ぶことの、すべてではありません。", { exact: true })).toBeVisible();
  await expect(page.getByText("学んだきろくは、ほぞんしません。", { exact: true })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /follow/);
});

test("elementary stays out of sitemap and global navigation", async ({ page, request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/elementary");

  await page.goto("/elementary");
  await expect(page.locator('nav[aria-label="主要ナビゲーション"] a[href^="/elementary"]')).toHaveCount(0);
});

for (const width of [375, 390, 768, 1280]) {
  test(`public beta pages are responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/learn", "/elementary", "/elementary/for-guardians", "/elementary/credits"]) {
      await page.goto(route);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
    }
  });
}

test("public beta has no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  for (const route of ["/learn", "/elementary", "/elementary/for-guardians", "/elementary/credits"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(serious, `${route}\n${serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")}`).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("representative high-school routes remain public", async ({ page }) => {
  for (const route of ["/math", "/english"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
  }
});
