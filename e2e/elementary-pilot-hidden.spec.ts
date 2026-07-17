import { expect, test } from "@playwright/test";

// production build では小学生版 pilot ルートが 404 になることを確認する。
// 実行例: npx playwright test --config playwright.elementary-pilot-hidden.config.ts

const HIDDEN_ROUTES = [
  "/elementary",
  "/elementary/grade-3",
  "/elementary/grade-3/math",
  "/elementary/grade-3/math/units/division",
  "/elementary/grade-3/math/units/division/lessons/division-meaning",
  "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change",
  "/elementary/grade-3/social-studies/units/local-community/lessons/read-neighborhood-map",
  "/elementary/showcase/content-inventory",
];

for (const route of HIDDEN_ROUTES) {
  test(`hidden pilot route returns 404 in production: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}

test("elementary pilot routes are absent from the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).not.toContain("/elementary");
});

test("public high-school subjects stay available", async ({ page }) => {
  for (const route of ["/math", "/english"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }
});
