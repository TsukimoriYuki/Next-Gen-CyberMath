import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("hidden Japanese catalog is available in development", async ({ page }) => {
  await page.goto("/japanese");
  await expect(page.getByRole("heading", { level: 1, name: "根拠と文脈から読む国語" })).toBeVisible();
  await expect(page.getByText("未公開・開発確認用")).toBeVisible();
  await expect(page.locator("body")).toContainText(/\d+問/);
});

for (const testCase of [
  ["漢文", "/courses/japanese/kanbun/kanbun-return-marks", "返り点と書き下し文"],
  ["古文", "/courses/japanese/classical-japanese/classical-auxiliary-verbs", "助動詞と意味の見分け方"],
  ["現代文語彙", "/courses/japanese/modern-vocabulary/modern-connectors-logic", "接続語と論理関係"],
] as const) {
  test(`${testCase[0]} representative lesson renders`, async ({ page }) => {
    await page.goto(testCase[1]);
    await expect(page.getByRole("heading", { level: 1, name: testCase[2] })).toBeVisible();
    await expect(page.getByText("実際に解く順番", { exact: true })).toBeVisible();
    await expect(page.getByText("詳しい解説", { exact: true }).first()).toBeVisible();
  });
}

test("Japanese problem answer, explanation, and review login path work", async ({ page }) => {
  await page.goto("/japanese/problems/jp-kanbun-01");
  await page.getByLabel(/A\. 知らず/).check();
  await page.getByRole("button", { name: "解答を確認する" }).click();
  await expect(page.getByRole("heading", { name: "正解" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "本文根拠" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "詳しい解説" })).toBeVisible();
  await page.getByRole("button", { name: "復習に登録" }).click();
  await expect(page.getByText("復習登録には")).toBeVisible();
});

for (const width of [375, 390, 1280]) {
  test(`Japanese problem is readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/japanese/problems/jp-classical-15");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
  });
}

test("representative Japanese problem has no automatic accessibility violations", async ({ page }) => {
  await page.goto("/japanese/problems/jp-kanbun-20");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
