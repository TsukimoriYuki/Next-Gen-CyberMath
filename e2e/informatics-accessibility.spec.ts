import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const A11Y_ROUTES = [
  "/informatics",
  "/courses/informatics-1",
  "/courses/informatics-1/programming-algorithms/variables-expressions-io",
  "/courses/informatics-1/network-data-use/data-analysis-visualization-modeling",
  "/informatics/problems/joho-prog-assignment-value",
  "/informatics/problems/joho-prog-logic-combination",
  "/informatics/problems/joho-algo-sort-trace",
  "/informatics/problems/joho-prog-input-output-blank",
  "/informatics/problems/joho-algo-search-selection",
] as const;

for (const route of A11Y_ROUTES) {
  test(`informatics a11y: ${route}`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(
      results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      ),
    ).toEqual([]);
  });
}

for (const width of [375, 390, 1280]) {
  test(`informatics top is usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/informatics");
    await expect(page.getByRole("heading", { name: "情報Ⅰ" })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);
  });
}
