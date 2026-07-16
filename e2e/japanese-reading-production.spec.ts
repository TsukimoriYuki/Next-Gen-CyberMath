import { expect, test } from "@playwright/test";

test("hidden Japanese remains 404 in production", async ({ page }) => {
  const response = await page.goto("/japanese");
  expect(response?.status()).toBe(404);
});
