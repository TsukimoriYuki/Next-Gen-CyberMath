import { expect, test } from "@playwright/test";

for (const route of [
  "/elementary/showcase/curriculum",
  "/elementary/showcase/lesson-blocks",
  "/elementary/credits",
  "/elementary",
]) {
  test(`${route}はproductionで404`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/u);
  });
}
