import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const RELEASE_ROUTE = "/elementary/showcase/limited-beta-release";
const PROHIBITED_CLAIMS = [
  "完全対応",
  "教科書完全準拠",
  "必ず成績が上がる",
  "小学3年生完成",
  "全国対応済み",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

test("limited beta release page shows ready preflight without publishing controls", async ({ page }) => {
  const response = await page.goto(RELEASE_ROUTE);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("hidden", { exact: true })).toBeVisible();
  await expect(page.getByText("limited-beta", { exact: true })).toBeVisible();
  await expect(page.getByText("✓ ready", { exact: true })).toBeVisible();
  await expect(page.getByText("✓ 完了", { exact: true })).toBeVisible();
  await expect(page.getByText("0件", { exact: true })).toBeVisible();
  await expect(page.getByText("△ hold", { exact: true })).toBeVisible();
  await expect(page.getByText("○ pending", { exact: true })).toBeVisible();
  await expect(page.getByText("無効", { exact: true })).toBeVisible();
  await expect(page.getByText("合計24問", { exact: true })).toBeVisible();
  await expect(page.getByText("算数pilot 1講座・8問", { exact: true })).toBeVisible();
  await expect(page.getByText("国語pilot 1講座・8問", { exact: true })).toBeVisible();
  await expect(page.getByText("社会pilot 1講座・8問", { exact: true })).toBeVisible();
  await expect(page.getByText("小学3年生の全範囲", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "緊急非公開・rollback条件" })).toBeVisible();
  await expect(
    page.locator('[data-testid="elementary-limited-beta-release"] button, [data-testid="elementary-limited-beta-release"] input, [data-testid="elementary-limited-beta-release"] select, [data-testid="elementary-limited-beta-release"] textarea'),
  ).toHaveCount(0);
  const body = await page.locator("body").innerText();
  for (const claim of PROHIBITED_CLAIMS) expect(body).not.toContain(claim);
});

for (const width of [375, 390, 768, 1280]) {
  test(`limited beta release page is responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(RELEASE_ROUTE);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  });
}

test("limited beta release page has no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(RELEASE_ROUTE);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  await expect(page.getByRole("main")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("limited beta release remains absent from navigation and sitemap", async ({ page, request }) => {
  await page.goto("/elementary/grade-3");
  await expect(page.locator('nav[aria-label="主要ナビゲーション"] a[href*="/elementary"]')).toHaveCount(0);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/elementary");
});
