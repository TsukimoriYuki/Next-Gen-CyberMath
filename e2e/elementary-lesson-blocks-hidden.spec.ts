import { expect, test } from "@playwright/test";

test("講座見本はproductionで404", async ({ page }) => {
  const response = await page.goto("/elementary/showcase/lesson-blocks", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(404);
  await expect(page.getByTestId("elementary-lesson-renderer")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/);
});
