import { expect, test } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/informatics",
  "/courses/informatics-1",
  "/courses/informatics-1/information-society-problem-solving/info-society-problem-solving",
  "/informatics/problems/joho-ps-steps-order",
] as const;

for (const route of PUBLIC_ROUTES) {
  test(`beta informatics route is public: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByText("ベータ公開").first()).toBeVisible();
  });
}

test("informatics beta appears in subjects with no empty exam or review card", async ({ page }) => {
  await page.goto("/subjects");
  const card = page.locator('[data-subject-card="informatics"]');
  await expect(card).toContainText("情報Ⅰ");
  await expect(card).toContainText("β");

  await page.goto("/informatics");
  await expect(page.getByRole("heading", { name: "基礎講座" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "演習問題" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "復習する" })).toBeVisible();
  await expect(page.getByText("16講座")).toBeVisible();
  await expect(page.getByText("120問")).toBeVisible();
  await expect(page.getByText("模試", { exact: true })).toHaveCount(0);
});

test("informatics canonical routes are in sitemap", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("/informatics</loc>");
  expect(body).toContain("/courses/informatics-1/programming-algorithms");
  expect(body).toContain("/informatics/problems/joho-data-bias-model-ct");
});

test("informatics pages expose canonical metadata", async ({ page }) => {
  await page.goto("/informatics/problems/joho-net-transfer-time");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/informatics\/problems\/joho-net-transfer-time$/,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test("public math and english subjects stay available", async ({ page }) => {
  for (const route of ["/math", "/english"]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }
});
