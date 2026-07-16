import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/elementary",
  "/elementary/grade-3",
  "/elementary/showcase/lesson-blocks",
] as const;

function captureClientErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    const text = message.text();
    if (/webpack-hmr/u.test(text)) return;
    if (message.type() === "error" || /hydration/iu.test(text)) errors.push(text);
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("hidden開発ルートと学年別rubyが正しく表示される", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  for (const route of ROUTES) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }

  await page.goto("/elementary/showcase/lesson-blocks");
  await expect(page.getByText("ひなのちゃん", { exact: true }).first()).toBeVisible();
  const teacher = page.locator("[data-dialogue-line][data-speaker='tomiyama']").first();
  await expect(teacher).toBeVisible();
  await expect(teacher.locator("ruby")).toContainText("冨山");
  await expect(teacher.locator("ruby rt")).toHaveText("とみやま");
  await expect(teacher).toContainText("先生");
  await expect(teacher.locator("[aria-label='先生の とみやま せんせい']")).toBeVisible();
  await expect(page.getByText("冨山先生", { exact: true })).toHaveCount(0);
  await expect(page.getByTestId("elementary-character-fallback-tomiyama").first()).toHaveText("と");
  expect(clientErrors).toEqual([]);
});

for (const width of [375, 390, 768, 1280]) {
  test(`${width}pxでrubyと会話が画面内に収まる`, async ({ page }) => {
    const clientErrors = captureClientErrors(page);
    await page.setViewportSize({ width, height: width < 700 ? 812 : 900 });
    const response = await page.goto("/elementary/showcase/lesson-blocks");
    expect(response?.status()).toBe(200);
    const layout = await page.evaluate(() => {
      const rubies = Array.from(document.querySelectorAll<HTMLElement>("ruby"));
      const bodyText = document.querySelector<HTMLElement>("[data-dialogue-line] p");
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        rubyBounds: rubies.map((ruby) => {
          const { left, right } = ruby.getBoundingClientRect();
          return { left, right };
        }),
        bodyFontSize: bodyText ? Number.parseFloat(getComputedStyle(bodyText).fontSize) : 0,
        lineHeight: bodyText ? Number.parseFloat(getComputedStyle(bodyText).lineHeight) : 0,
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.rubyBounds.every(({ left, right }) => left >= 0 && right <= layout.viewportWidth + 1)).toBe(true);
    expect(layout.bodyFontSize).toBeGreaterThanOrEqual(18);
    expect(layout.lineHeight / layout.bodyFontSize).toBeGreaterThanOrEqual(1.75);
    expect(clientErrors).toEqual([]);
  });
}

test("対象3ルートにseriousまたはcriticalのa11y違反がない", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(
      results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      ),
    ).toEqual([]);
  }
});
