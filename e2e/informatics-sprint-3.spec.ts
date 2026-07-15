import { expect, test } from "@playwright/test";

const SPRINT3_HIDDEN_ROUTES = [
  "/courses/informatics-1/programming-algorithms",
  "/courses/informatics-1/programming-algorithms/variables-expressions-io",
  "/courses/informatics-1/programming-algorithms/branching-loops",
  "/courses/informatics-1/programming-algorithms/arrays-functions-decomposition",
  "/courses/informatics-1/programming-algorithms/algorithms-search-simulation",
  "/informatics/problems/joho-prog-assignment-value",
  "/informatics/problems/joho-prog-loop-sum",
  "/informatics/problems/joho-prog-array-sum",
  "/informatics/problems/joho-algo-simulation-ct",
] as const;

for (const route of SPRINT3_HIDDEN_ROUTES) {
  test(`sprint 3 hidden informatics route returns 404: ${route}`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
  });
}

test("sprint 3 remains absent from public listings and sitemap", async ({ page, request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("informatics");

  await page.goto("/subjects");
  expect(await page.content()).not.toContain("情報Ⅰ");
});
