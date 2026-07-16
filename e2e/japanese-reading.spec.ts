import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("modern reading catalog and course render in development", async ({ page }) => {
  await page.goto("/japanese");
  await expect(page.getByText("現代文読解", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("4講座・20文章・100問")).toBeVisible();
  await page.goto("/courses/japanese/modern-reading/reading-critical-structure");
  await expect(page.getByRole("heading", { level: 1, name: "評論文の構造をつかむ" })).toBeVisible();
  await expect(page.getByText("本文への線の引き方", { exact: true })).toBeVisible();
});

for (const [name, url, heading] of [
  ["criticism", "/japanese/reading/jp-reading-01", "速さの外側にある時間"],
  ["fiction", "/japanese/reading/jp-reading-09", "最後の譜面台"],
  ["practical", "/japanese/reading/jp-reading-15", "図書委員会・放課後講座の会場選び"],
] as const) test(`${name} passage and questions render`, async ({ page }) => {
  await page.goto(url);
  await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  await expect(page.getByText("[1]", { exact: true })).toBeVisible();
  await expect(page.locator('section[aria-labelledby$="-heading"]')).toHaveCount(5);
});

test("answer flow reveals evidence, all reasons, review login, and next passage", async ({ page }) => {
  await page.goto("/japanese/reading/jp-reading-01");
  await expect(page.getByText(/本文根拠（段落/)).toHaveCount(0);
  await page.locator("section").filter({ hasText: "問1" }).getByRole("radio").first().check();
  await page.locator("section").filter({ hasText: "問1" }).getByRole("button", { name: "答えを確認する" }).click();
  await expect(page.getByText(/本文根拠（段落/).first()).toBeVisible();
  await expect(page.getByText("全選択肢の確認").first()).toBeVisible();
  await page.getByRole("button", { name: "復習に登録" }).first().click();
  await expect(page.getByText("復習登録には").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /次の文章/ })).toBeVisible();
});

for (const width of [375, 390, 1280]) test(`reading page fits ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/japanese/reading/jp-reading-15");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});

test("representative reading page has no automatic accessibility violations", async ({ page }) => {
  await page.goto("/japanese/reading/jp-reading-09");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
