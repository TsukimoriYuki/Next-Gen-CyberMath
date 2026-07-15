import { expect, test } from "@playwright/test";

// 情報Ⅰ（hidden教科）の公開制御を production build で確認する。
// 実行例: npx playwright test e2e/informatics.spec.ts

const HIDDEN_ROUTES = [
  "/informatics",
  "/informatics/problems/joho-ps-steps-order",
  "/informatics/problems/joho-sec-mfa-combination",
  "/courses/informatics-1",
  "/courses/informatics-1/information-society-problem-solving",
  "/courses/informatics-1/information-society-problem-solving/info-society-problem-solving",
];

for (const route of HIDDEN_ROUTES) {
  test(`hidden informatics route returns 404 in production: ${route}`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}

test("informatics does not appear in the sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).not.toContain("informatics");
});

test("informatics does not appear in global navigation or subject listing", async ({
  page,
}) => {
  await page.goto("/subjects");
  const content = await page.content();
  expect(content).not.toContain("/informatics");
  expect(content).not.toContain("情報Ⅰ");
});

test("public math and english subjects stay available", async ({ page }) => {
  for (const route of ["/math", "/english"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }
});
