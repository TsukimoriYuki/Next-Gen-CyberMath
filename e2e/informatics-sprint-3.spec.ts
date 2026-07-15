import { expect, test } from "@playwright/test";

const SPRINT3_ROUTES = [
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

for (const route of SPRINT3_ROUTES) {
  test(`sprint 3 route is available in beta: ${route}`, async ({ page }) => {
    expect((await page.goto(route))?.status()).toBe(200);
  });
}

test("number answer reuses finite-decimal normalization", async ({ page }) => {
  await page.goto("/informatics/problems/joho-prog-assignment-value");
  await page.getByLabel("数値を入力").fill("020.000");
  await page.getByRole("button", { name: "答え合わせ" }).click();
  await expect(page.getByText("正解です")).toBeVisible();
});
