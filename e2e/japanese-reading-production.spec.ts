import { expect, test } from "@playwright/test";

test("Japanese beta is public in production", async ({ page }) => {
  const response = await page.goto("/japanese");
  expect(response?.status()).toBe(200);
  await expect(page.getByText("ベータ公開", { exact: true })).toBeVisible();
});
