import { expect, test } from "@playwright/test";

const SPRINT2_ROUTES = [
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

for (const route of SPRINT2_ROUTES) {
  test(`sprint 2 route is available in beta: ${route}`, async ({ page }) => {
    expect((await page.goto(route))?.status()).toBe(200);
  });
}
