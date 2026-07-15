import { expect, test } from "@playwright/test";

test("learn and practice expose informatics beta routes", async ({ page }) => {
  await page.goto("/learn");
  await expect(page.getByRole("link", { name: "情報Ⅰの講座を学ぶ" })).toHaveAttribute(
    "href",
    "/courses/informatics-1",
  );
  await page.goto("/practice");
  await expect(page.getByRole("link", { name: "大問別演習を選ぶ" })).toHaveAttribute(
    "href",
    "/informatics/practice",
  );
});

test("practice catalog and representative choice set work at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/informatics/practice");
  await expect(page.getByRole("heading", { name: "大問別演習 6セット" })).toBeVisible();
  await expect(page.getByRole("link", { name: /情報社会・権利・セキュリティ/ })).toBeVisible();
  await page.goto("/informatics/practice/information-society-security");
  await page.getByRole("button", { name: /目的と評価基準/ }).click();
  await page.getByRole("button", { name: "提出する" }).click();
  await page.getByRole("button", { name: "提出する" }).last().click();
  await expect(page.getByText(/5 \/ 25点/)).toBeVisible();
});

test("numeric and pseudocode practices render at target widths", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/informatics/practice/digital-data-size");
    await expect(page.getByLabel("解答").first()).toBeVisible();
    await page.goto("/informatics/practice/programming-algorithms");
    await expect(page.getByText(/←を代入、==を等価比較/)).toBeVisible();
  }
});
