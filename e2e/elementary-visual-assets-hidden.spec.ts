import { expect, test } from "@playwright/test";

const HIDDEN_ROUTES = [
  "/elementary/showcase/visual-assets",
  "/elementary/credits",
  "/elementary/showcase/lesson-blocks",
] as const;

test("production相当で小学生の視覚素材ルートは404", async ({ page }) => {
  for (const route of HIDDEN_ROUTES) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  }
});

test("公開ページに視覚素材showcaseとcreditsへのリンクがない", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page.locator("a[href='/elementary/showcase/visual-assets']")).toHaveCount(0);
  await expect(page.locator("a[href='/elementary/credits']")).toHaveCount(0);
});
