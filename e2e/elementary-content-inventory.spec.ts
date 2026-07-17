import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const INVENTORY_ROUTE = "/elementary/showcase/content-inventory";

test("content inventory separates high school, elementary, and combined totals", async ({ page }) => {
  await page.goto(INVENTORY_ROUTE);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("高校版").first()).toBeVisible();
  await expect(page.getByText("1,348問")).toBeVisible();
  await expect(page.getByText("24問").first()).toBeVisible();
  await expect(page.getByText("1,372問")).toBeVisible();
  await expect(page.getByText("3単元")).toBeVisible();
  await expect(page.getByText("3講座")).toBeVisible();
  await expect(page.getByText("17問")).toBeVisible();
  await expect(page.getByText("18問")).toBeVisible();
  await expect(page.getByText("showcaseは含めません")).toBeVisible();
});

test("content inventory shows all subject and curriculum breakdowns", async ({ page }) => {
  await page.goto(INVENTORY_ROUTE);
  for (const subject of ["算数", "国語", "社会"]) {
    const card = page.locator("[data-subject]").filter({ hasText: subject });
    await expect(card).toHaveCount(1);
    await expect(card.getByText("1講座")).toBeVisible();
    await expect(card.getByText("8問")).toBeVisible();
  }
  await expect(page.getByText("entry参照").locator("..")).toContainText("3件");
  await expect(page.getByText("objective参照").locator("..")).toContainText("9件");
  await expect(page.getByText("lesson coverage").last().locator("..")).toContainText("partial 3件");
  await expect(page.getByText("assessment coverage").last().locator("..")).toContainText("partial 3件");
  await expect(page.getByText("hidden", { exact: true })).toBeVisible();
  await expect(page.getByText("pilot", { exact: true })).toBeVisible();
});

for (const width of [375, 390, 768, 1280]) {
  test(`content inventory is responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(INVENTORY_ROUTE);
    await expect(page.locator("h1")).toHaveCount(1);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}

test("content inventory has no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(INVENTORY_ROUTE);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  expect(errors).toEqual([]);
});
