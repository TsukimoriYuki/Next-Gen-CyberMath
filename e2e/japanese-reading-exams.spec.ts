import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("現代文大問演習の一覧に6セットを表示する", async ({ page }) => {
  await page.goto("/japanese/reading/exams");
  await expect(page.getByRole("heading", { level: 1, name: "現代文大問演習 6セット" })).toBeVisible();
  await expect(page.locator('a[href^="/japanese/reading/jp-ct-modern-"]')).toHaveCount(6);
  await expect(page.getByText("6セット・30問", { exact: true })).toBeVisible();
});

for (const [label, slug, visibleText] of [
  ["評論・単一文章", "jp-ct-modern-01", "道具が残す問い"],
  ["評論・本文と表", "jp-ct-modern-02", "架空施設・青葉交流室の待ち時間調査"],
  ["二評論比較", "jp-ct-modern-03", "文章B　名前が先に歩くとき"],
  ["小説", "jp-ct-modern-04", "封筒の置き場所"],
  ["小説と補助資料", "jp-ct-modern-05", "翌日の理央から真帆へのメッセージ"],
  ["実用文・複数資料", "jp-ct-modern-06", "委員会の条件確認表"],
] as const) {
  test(`${label}の代表表示`, async ({ page }) => {
    await page.goto(`/japanese/reading/${slug}`);
    await expect(page.getByText(visibleText).first()).toBeVisible();
    await expect(page.locator('section[aria-labelledby$="-heading"]')).toHaveCount(5);
    await expect(page.getByText("0 / 5問", { exact: true })).toBeVisible();
    await expect(page.getByText("0 / 5点", { exact: true })).toBeVisible();
    await expect(page.getByRole("complementary", { name: "対応講座" })).toBeVisible();
  });
}

test("単一選択の誤答後に根拠・全誤答理由・復習・次大問を表示する", async ({ page }) => {
  await page.goto("/japanese/reading/jp-ct-modern-01");
  const question = page.locator('section[aria-labelledby$="-heading"]').first();
  await question.getByRole("radio").nth(1).check();
  await question.getByRole("button", { name: "答えを確認する" }).click();
  await expect(question.getByText("正解は A", { exact: true })).toBeVisible();
  await expect(question.getByRole("heading", { name: /本文根拠/ })).toBeVisible();
  await expect(question.getByText("全選択肢の確認", { exact: true })).toBeVisible();
  await expect(question.locator("ul li")).toHaveCount(4);
  await question.getByRole("button", { name: "復習に登録" }).click();
  await expect(question.getByText(/復習登録には/)).toBeVisible();
  await expect(page.getByText("1 / 5問", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /次の大問/ })).toHaveAttribute("href", "/japanese/reading/jp-ct-modern-02");
});

test("複数選択を採点できる", async ({ page }) => {
  await page.goto("/japanese/reading/jp-ct-modern-02");
  const question = page.locator('section[aria-labelledby$="-heading"]').nth(2);
  await question.getByRole("checkbox").nth(0).check();
  await question.getByRole("checkbox").nth(2).check();
  await question.getByRole("button", { name: "答えを確認する" }).click();
  await expect(question.getByText("正解", { exact: true })).toBeVisible();
});

for (const [label, slug, questionIndex, correctIndex] of [
  ["対応選択", "jp-ct-modern-03", 2, 1],
  ["並べ替え", "jp-ct-modern-03", 3, 0],
  ["資料条件選択", "jp-ct-modern-06", 3, 0],
] as const) {
  test(`${label}を採点できる`, async ({ page }) => {
    await page.goto(`/japanese/reading/${slug}`);
    const question = page.locator('section[aria-labelledby$="-heading"]').nth(questionIndex);
    await question.getByRole("radio").nth(correctIndex).check();
    await question.getByRole("button", { name: "答えを確認する" }).click();
    await expect(question.getByText("正解", { exact: true })).toBeVisible();
  });
}

for (const width of [375, 390, 1280]) {
  test(`現代文大問が${width}pxに収まる`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/japanese/reading/jp-ct-modern-06");
    if (width < 1000) {
      await expect(page.getByRole("button", { name: "本文・資料" })).toBeVisible();
      await page.getByRole("button", { name: "設問" }).click();
      await expect(page.locator('section[aria-labelledby$="-heading"]').first()).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  });
}

test("現代文大問の代表画面に自動検出可能なa11y違反がない", async ({ page }) => {
  await page.goto("/japanese/reading/jp-ct-modern-02");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
