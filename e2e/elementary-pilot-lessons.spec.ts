import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// 小学生版 pilot 講座（hidden）の開発表示を確認する。
// 実行例: npx playwright test --config playwright.elementary-pilot.config.ts

const MATH_LESSON = "/elementary/grade-3/math/units/division/lessons/division-meaning";
const JP_LESSON = "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change";
const SOCIAL_LESSON =
  "/elementary/grade-3/social-studies/units/local-community/lessons/read-neighborhood-map";

test("grade-3 subject cards link into subject → unit → lesson", async ({ page }) => {
  await page.goto("/elementary/grade-3");
  const subjectCards = page.locator('[data-testid="elementary-subject-card"]');
  await expect(subjectCards).toHaveCount(3);

  await page.goto("/elementary/grade-3/math");
  const unitCards = page.locator('[data-testid="elementary-unit-card"]');
  await expect(unitCards.first()).toBeVisible();
  await unitCards.first().click();
  await expect(page).toHaveURL(/\/units\/division$/);

  const lessonCards = page.locator('[data-testid="elementary-lesson-card"]');
  await expect(lessonCards.first()).toBeVisible();
  await lessonCards.first().click();
  await expect(page).toHaveURL(/\/lessons\/division-meaning$/);
});

test("math lesson renders dialogue, characters, visual, and an 8-problem practice set", async ({ page }) => {
  await page.goto(MATH_LESSON);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('[data-testid="elementary-lesson-renderer"]')).toBeVisible();
  await expect(page.locator('[data-testid="elementary-dialogue-block"]').first()).toBeVisible();
  await expect(page.getByText("ひなのちゃん").first()).toBeVisible();
  await expect(page.locator("ruby").first()).toBeVisible();
  await expect(page.locator('[data-testid="elementary-visual-asset"]')).toBeVisible();
  const practice = page.locator('[data-testid="elementary-practice-set"]');
  await expect(practice).toBeVisible();
  await expect(practice.getByText("/ 8")).toBeVisible();
});

test("Japanese lesson shows the original story and practice set", async ({ page }) => {
  await page.goto(JP_LESSON);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("ホウセンカ").first()).toBeVisible();
  await expect(page.locator('[data-testid="elementary-practice-set"]')).toBeVisible();
});

test("social lesson shows the neighborhood map with alt text", async ({ page }) => {
  await page.goto(SOCIAL_LESSON);
  await expect(page.locator("h1")).toHaveCount(1);
  const image = page.locator('[data-testid="elementary-visual-asset"] img');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", /あおば小学校/);
});

for (const width of [375, 390, 768, 1280]) {
  test(`lesson has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(SOCIAL_LESSON);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}

test("lesson pages have no serious or critical accessibility violations", async ({ page }) => {
  for (const route of [MATH_LESSON, SOCIAL_LESSON]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious, serious.map((v) => `${v.id}: ${v.help}`).join("\n")).toEqual([]);
  }
});

test("global navigation exposes no elementary links", async ({ page }) => {
  await page.goto("/elementary/grade-3");
  const elementaryLinksInNav = page.locator(
    'nav[aria-label="主要ナビゲーション"] a[href*="/elementary"]',
  );
  await expect(elementaryLinksInNav).toHaveCount(0);
});
