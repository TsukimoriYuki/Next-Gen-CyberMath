import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  "/elementary/showcase/visual-assets",
  "/elementary/credits",
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

test("視覚素材showcaseとcreditsがregistryから表示される", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  for (const route of ROUTES) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }

  await page.goto("/elementary/showcase/visual-assets");
  const figure = page.getByTestId("elementary-visual-asset");
  await expect(figure).toHaveCount(1);
  const image = figure.locator("img");
  await expect(image).toHaveAttribute("alt", "12このクッキーを3人へ4こずつ分けた図");
  await expect(image).toHaveAttribute("src", "/elementary/assets/division-cookies-12-into-3.svg");
  await expect(image).toHaveAttribute("width", "960");
  await expect(image).toHaveAttribute("height", "480");
  await expect(figure.locator("figcaption")).toContainText("3人へ同じ数ずつ分けると、一人分は4こです。");
  await expect(figure).toContainText("Cyber Mathが作った図");
  await expect(figure.getByRole("link", { name: "図の出どころ" })).toHaveAttribute("href", "/elementary/credits#division-cookies-12-into-3");
  await expect(page.getByTestId("elementary-visual-fallback")).toContainText("3人へ、クッキーを4こずつ分けた図です。");
  expect(await page.locator("img[src^='http']").count()).toBe(0);

  await page.goto("/elementary/credits");
  const credit = page.locator("[data-credit-asset='division-cookies-12-into-3']");
  await expect(credit).toContainText("Cyber Math");
  await expect(credit).toContainText("Cyber Math独自作成");
  await expect(credit).toContainText("改変なし");
  await expect(credit.locator("a[href='/elementary/assets/division-cookies-12-into-3.svg']")).toBeVisible();
  expect(clientErrors).toEqual([]);
});

test("わり算見本講座にvisual blockと説明が両方ある", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  const response = await page.goto("/elementary/showcase/lesson-blocks");
  expect(response?.status()).toBe(200);
  const visualBlock = page.locator("[data-lesson-block='visual']");
  await expect(visualBlock).toHaveCount(1);
  await expect(visualBlock.getByTestId("elementary-visual-asset")).toBeVisible();
  await expect(page.getByText("12このクッキーを3人へ1こずつ配ると、4回でぜんぶ配り終わります。", { exact: true })).toBeVisible();
  expect(clientErrors).toEqual([]);
});

for (const width of [375, 390, 768, 1280]) {
  test(`${width}pxで画像・caption・creditが画面内に収まる`, async ({ page }) => {
    const clientErrors = captureClientErrors(page);
    await page.setViewportSize({ width, height: width < 700 ? 812 : 900 });
    await page.goto("/elementary/showcase/visual-assets");
    const layout = await page.evaluate(() => {
      const image = document.querySelector<HTMLImageElement>("[data-testid='elementary-visual-asset'] img");
      const figure = document.querySelector<HTMLElement>("[data-testid='elementary-visual-asset']");
      const credit = document.querySelector<HTMLElement>("[data-asset-credit]");
      return {
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        imageRight: image?.getBoundingClientRect().right ?? 0,
        figureRight: figure?.getBoundingClientRect().right ?? 0,
        creditRight: credit?.getBoundingClientRect().right ?? 0,
        imageWidth: image?.getBoundingClientRect().width ?? 0,
        imageHeight: image?.getBoundingClientRect().height ?? 0,
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.imageRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.figureRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.creditRight).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.imageWidth).toBeGreaterThan(0);
    expect(layout.imageHeight).toBeGreaterThan(0);
    expect(clientErrors).toEqual([]);
  });
}

test("対象3ルートにseriousまたはcriticalのa11y違反がない", async ({ page }) => {
  for (const route of ROUTES) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
  }
});
