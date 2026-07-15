import { expect, test } from "@playwright/test";

const SPRINT4_ROUTES = [
  "/courses/informatics-1/network-data-use",
  "/courses/informatics-1/network-data-use/network-communication",
  "/courses/informatics-1/network-data-use/internet-web-dns",
  "/courses/informatics-1/network-data-use/databases-data-organization",
  "/courses/informatics-1/network-data-use/data-analysis-visualization-modeling",
  "/informatics/problems/joho-net-transfer-time",
  "/informatics/problems/joho-web-http-https",
  "/informatics/problems/joho-db-join-ct",
  "/informatics/problems/joho-data-bias-model-ct",
] as const;

for (const route of SPRINT4_ROUTES) {
  test(`sprint 4 route is available in beta: ${route}`, async ({ page }) => {
    expect((await page.goto(route))?.status()).toBe(200);
  });
}

test("lesson, problem, and review paths connect", async ({ page }) => {
  await page.goto("/courses/informatics-1/network-data-use/network-communication");
  await page.getByRole("link", { name: /ネットワークと通信の仕組みの演習へ/ }).click();
  await expect(page).toHaveURL(/joho-net-lan-wan$/);
  await expect(page.getByText(/復習タグ/)).toBeVisible();
  await page.getByRole("link", { name: /ネットワークと通信の仕組み/ }).last().click();
  await expect(page).toHaveURL(/network-communication$/);
});
