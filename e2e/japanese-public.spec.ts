import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home and subjects expose Japanese beta exactly once", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-subject-card="japanese"]')).toHaveCount(1);
  await expect(page.locator('[data-subject-card="japanese"]')).toContainText("β");
  await page.goto("/subjects");
  await expect(page.locator('[data-subject-card="japanese"]')).toHaveCount(1);
});

test("learn and practice contain only implemented Japanese paths", async ({ page }) => {
  await page.goto("/learn");
  await expect(page.getByRole("link", { name: /国語の講座を学ぶ/ })).toBeVisible();
  await page.goto("/practice");
  await expect(page.getByRole("link", { name: /国語問題を解く/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /現代文読解を始める/ })).toBeVisible();
});

test("Japanese top shows beta, totals, four areas, and no empty features", async ({ page }) => {
  await page.goto("/japanese");
  await expect(page.getByRole("heading", { level: 1, name: "根拠と文脈から読む国語" })).toBeVisible();
  await expect(page.getByText("ベータ公開", { exact: true }).first()).toBeVisible();
  for (const area of ["現代文語彙", "現代文読解", "古文", "漢文"]) await expect(page.getByRole("heading", { level: 2, name: area })).toBeVisible();
  await expect(page.locator("body")).not.toContainText(/近日公開|準備中|国語模試|過去問|記述式採点/);
  await expect(page.locator("h1")).toHaveCount(1);
});

for (const [label, url, title] of [
  ["modern vocabulary", "/courses/japanese/modern-vocabulary/modern-connectors-logic", "接続語と論理関係"],
  ["modern reading", "/courses/japanese/modern-reading/reading-critical-structure", "評論文の構造をつかむ"],
  ["classical", "/courses/japanese/classical-japanese/classical-auxiliary-verbs", "助動詞と意味の見分け方"],
  ["kanbun", "/courses/japanese/kanbun/kanbun-return-marks", "返り点と書き下し文"],
] as const) test(`${label} public lesson renders`, async ({ page }) => {
  await page.goto(url);
  await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
  await expect(page.getByText("ベータ公開", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /対応問題を解く/ })).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
});

for (const [label, url] of [
  ["classical problem", "/japanese/problems/jp-classical-15"],
  ["kanbun problem", "/japanese/problems/jp-kanbun-01"],
] as const) test(`${label} answer and related course work`, async ({ page }) => {
  await page.goto(url);
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "解答を確認する" }).click();
  await expect(page.getByRole("heading", { name: "本文根拠" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "選択肢の確認" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "対応講座へ戻る" })).toBeVisible();
  await page.getByRole("button", { name: "復習に登録" }).click();
  await expect(page.getByText("復習登録には")).toBeVisible();
});

for (const [label, url, title] of [
  ["criticism", "/japanese/reading/jp-reading-01", "速さの外側にある時間"],
  ["fiction", "/japanese/reading/jp-reading-09", "最後の譜面台"],
  ["multi-source", "/japanese/reading/jp-reading-15", "図書委員会・放課後講座の会場選び"],
] as const) test(`${label} passage has evidence UI and no console errors`, async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto(url);
  await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
  await expect(page.getByText("[1]", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "対応講座" })).toBeVisible();
  await expect(page.locator('section[aria-labelledby$="-heading"]')).toHaveCount(5);
  expect(errors).toEqual([]);
});

test("reading answer reveals evidence, reasons, review, and next passage", async ({ page }) => {
  await page.goto("/japanese/reading/jp-reading-01");
  await page.locator('section[aria-labelledby$="-heading"]').first().getByRole("radio").first().check();
  await page.locator('section[aria-labelledby$="-heading"]').first().getByRole("button", { name: "答えを確認する" }).click();
  await expect(page.getByText(/本文根拠（段落/).first()).toBeVisible();
  await expect(page.getByText("全選択肢の確認").first()).toBeVisible();
  await page.getByRole("button", { name: "復習に登録" }).first().click();
  await expect(page.getByText("復習登録には").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /次の文章/ })).toBeVisible();
});

for (const width of [375, 390, 1280]) test(`public Japanese fits ${width}px`, async ({ page }) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(width === 1280 ? "/japanese" : "/japanese/reading/jp-reading-15");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});

test("Japanese links support keyboard and representative page has no axe violations", async ({ page }) => {
  await page.goto("/japanese");
  const link = page.getByRole("link", { name: "講座から学ぶ" });
  await link.focus();
  await expect(link).toBeFocused();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test("Japanese sitemap and representative public routes return 200", async ({ request }) => {
  for (const route of ["/sitemap.xml", "/japanese", "/subjects", "/japanese/reading/jp-reading-01", "/japanese/problems/jp-classical-15", "/japanese/problems/jp-kanbun-01", "/auth/login"]) {
    expect((await request.get(route)).status(), route).toBe(200);
  }
});
