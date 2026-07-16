import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const representativeProblems = [
  ["数と式", "m1a-ne-01-expand-check", "choice"],
  ["集合と命題", "m1a-sl-04-proposition-multi", "choice"],
  ["二次関数", "m1a-qf-05-table-translation", "table"],
  ["図形と計量", "m1a-gm-02-right-triangle-length", "numeric"],
  ["データの分析", "m1a-da-05-table-standardization", "table"],
  ["場合の数", "m1a-co-05-method-multi", "choice"],
  ["確率", "m1a-pr-02-complement", "numeric"],
  ["図形の性質", "m1a-gp-05-ceva-order", "choice"],
] as const;

test("数学の単元一覧から新しい演習へ進める", async ({ page }) => {
  await page.goto("/units/numbers-and-expressions");
  await expect(page.locator('a[href="/problems/m1a-ne-01-expand-check"]')).toBeVisible();
});

for (const [area, slug, inputKind] of representativeProblems) {
  test(`${area}の代表問題を表示できる`, async ({ page }) => {
    await page.goto(`/problems/${slug}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('section[aria-label="採点可能な数学IA単元別演習"]')).toBeVisible();
    await expect(page.getByText(area, { exact: true }).first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText("KPD");

    if (inputKind === "numeric") {
      await expect(page.locator('input[inputmode="decimal"]')).toBeVisible();
    } else {
      await expect(page.locator('button[aria-pressed="false"]').first()).toBeVisible();
    }
    if (inputKind === "table") await expect(page.locator("table")).toBeVisible();
  });
}

test("選択問題は誤答理由・復習候補・次問を表示する", async ({ page }) => {
  await page.goto("/problems/m1a-ne-01-expand-check");
  await page.locator('button[aria-pressed="false"]').first().click();
  await expect(page.getByText("見直しましょう", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "選んだ答えが違う理由" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "詳細解説" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "復習キュー候補" })).toBeVisible();
  await expect(page.getByRole("link", { name: "次の問題" })).toHaveAttribute(
    "href",
    "/problems/m1a-ne-02-radical-square",
  );
});

test("数値入力問題を採点できる", async ({ page }) => {
  await page.goto("/problems/m1a-gm-02-right-triangle-length");
  await page.locator('input[inputmode="decimal"]').fill("12");
  await page.getByRole("button", { name: "答え合わせ" }).click();
  await expect(page.getByText("正解です", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "詳細解説" })).toBeVisible();
});

for (const width of [375, 390, 1280]) {
  test(`数学IA単元別演習が${width}pxに収まる`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/problems/m1a-da-05-table-standardization");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      ),
    ).toBe(false);
  });
}

test("代表問題に自動検出可能なアクセシビリティ違反がない", async ({ page }) => {
  await page.goto("/problems/m1a-ne-01-expand-check");
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});
