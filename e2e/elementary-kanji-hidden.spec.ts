import { expect, test } from "@playwright/test";

for (const route of [
  "/elementary",
  "/elementary/grade-3",
  "/elementary/showcase/lesson-blocks",
]) {
  test(`${route}はproductionで404`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
    await expect(page.getByTestId("elementary-shell")).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute("content", /noindex/u);
  });
}

test("productionの公開トップに小学生版リンクがない", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator('a[href^="/elementary"]')).toHaveCount(0);
});
