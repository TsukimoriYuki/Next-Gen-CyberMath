import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

function captureClientErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    const messageText = message.text();
    if (/webpack-hmr/.test(messageText)) return;
    if (message.type() === "error" || /hydration/i.test(messageText)) {
      errors.push(messageText);
    }
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("developmentで小学生版トップから小学3年生シェルへ移動できる", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  const response = await page.goto("/elementary");
  expect(response?.status()).toBe(200);
  await expect(page.getByTestId("elementary-shell")).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(
    page.getByRole("heading", { level: 1, name: "いっしょに学ぼう" }),
  ).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);

  const shell = page.getByTestId("elementary-shell");
  await expect(shell.locator('a[href*="grade-4"], a[href*="grade-5"], a[href*="grade-6"]')).toHaveCount(0);
  await expect(shell.locator('a[href*="science"], a[href*="exam-prep"]')).toHaveCount(0);
  await expect(shell.locator('a[href^="/elementary/grade-3/"]')).toHaveCount(0);

  await page.getByTestId("elementary-grade-link").click();
  await expect(page).toHaveURL(/\/elementary\/grade-3$/);
  await expect(page.getByRole("heading", { level: 1, name: "小学3年生" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByTestId("elementary-subject-card")).toHaveCount(3);
  for (const subject of ["算数", "国語", "社会"]) {
    await expect(page.getByRole("heading", { level: 3, name: subject })).toBeVisible();
  }
  await expect(page.getByRole("heading", { level: 3, name: "理科" })).toHaveCount(0);
  await expect(page.getByTestId("elementary-subject-card").locator("a")).toHaveCount(0);
  expect(clientErrors).toEqual([]);
});

for (const width of [375, 390, 768, 1280]) {
  test(`${width}pxでレイアウトと操作領域が安全`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 812 : 900 });
    await page.goto("/elementary/grade-3");

    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth + 1);

    const headingBox = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(headingBox?.y ?? -1).toBeGreaterThanOrEqual(0);

    for (const link of await page.getByTestId("elementary-shell").getByRole("link").all()) {
      const box = await link.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(48);
    }
  });
}

test("本文と見出しの文字サイズが小学生向けtokenを満たす", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/elementary/grade-3");
  const sizes = await page.evaluate(() => {
    const heading = document.querySelector("h1");
    const lead = document.querySelector("h1 + p");
    if (!heading || !lead) return null;
    const headingStyle = getComputedStyle(heading);
    const leadStyle = getComputedStyle(lead);
    return {
      heading: Number.parseFloat(headingStyle.fontSize),
      body: Number.parseFloat(leadStyle.fontSize),
      lineHeight: Number.parseFloat(leadStyle.lineHeight),
    };
  });
  expect(sizes).not.toBeNull();
  expect(sizes!.heading).toBeGreaterThanOrEqual(30);
  expect(sizes!.body).toBeGreaterThanOrEqual(18);
  expect(sizes!.lineHeight / sizes!.body).toBeGreaterThanOrEqual(1.75);
});

test("キーボードフォーカスとreduced motionが有効", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/elementary");
  const target = page.getByRole("link", { name: "小学生トップ" });
  await target.focus();
  await expect(target).toBeFocused();
  const focusStyle = await target.evaluate((element) => {
    const style = getComputedStyle(element);
    return { outlineStyle: style.outlineStyle, outlineWidth: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.outlineStyle).not.toBe("none");
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
});

test("小学生版内部シェルにserious/criticalのa11y違反がない", async ({ page }) => {
  await page.goto("/elementary/grade-3");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const seriousOrWorse = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(seriousOrWorse).toEqual([]);
});
