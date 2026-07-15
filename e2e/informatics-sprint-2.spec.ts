import { expect, test } from "@playwright/test";

// 情報Ⅰ 第2スプリントの追加ルートだけをproduction buildで確認する。
// hidden教科なので、一覧・講座・問題の直リンクはすべて404であることが正しい。

const SPRINT2_HIDDEN_ROUTES = [
  "/courses/informatics-1/computer-digital-data",
  "/courses/informatics-1/computer-digital-data/computer-components-operation",
  "/courses/informatics-1/computer-digital-data/number-systems-bits",
  "/courses/informatics-1/computer-digital-data/digital-text-image-audio",
  "/courses/informatics-1/computer-digital-data/data-size-compression-error",
  "/informatics/problems/joho-comp-cpu-role",
  "/informatics/problems/joho-bin-to-decimal",
  "/informatics/problems/joho-media-image-size",
  "/informatics/problems/joho-size-transfer-time",
] as const;

for (const route of SPRINT2_HIDDEN_ROUTES) {
  test(`sprint 2 hidden informatics route returns 404: ${route}`, async ({
    page,
  }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}

test("sprint 2 informatics routes stay absent from sitemap and public subjects", async ({
  page,
  request,
}) => {
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.status()).toBe(200);
  expect(await sitemapResponse.text()).not.toContain("informatics");

  const subjectsResponse = await page.goto("/subjects");
  expect(subjectsResponse?.status()).toBe(200);
  const content = await page.content();
  expect(content).not.toContain("/informatics");
  expect(content).not.toContain("情報Ⅰ");
});
