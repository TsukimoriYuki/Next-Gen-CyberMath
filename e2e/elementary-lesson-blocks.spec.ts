import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const SHOWCASE_ROUTE = "/elementary/showcase/lesson-blocks";

function captureClientErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    const messageText = message.text();
    if (/webpack-hmr/.test(messageText)) return;
    if (message.type() === "error" || /hydration/i.test(messageText)) errors.push(messageText);
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("開発用見本が構造化ブロック順で表示される", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  const response = await page.goto(SHOWCASE_ROUTE);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByText("開発用の講座見本", { exact: true })).toBeVisible();
  await expect(page.getByText("これは表示と構造を確認する見本で、正式教材ではありません。", { exact: true })).toBeVisible();
  await expect(page.getByText("ひなのちゃん", { exact: true }).first()).toBeVisible();
  await expect(page.locator("ruby").filter({ hasText: "冨山" }).first()).toBeVisible();
  await expect(page.locator("ruby").filter({ hasText: "冨山" }).first().locator("rt")).toHaveText("とみやま");
  await expect(page.getByTestId("elementary-character-fallback-hinano").first()).toHaveText("ひ");
  await expect(page.getByTestId("elementary-character-fallback-tomiyama").first()).toHaveText("と");
  await expect(page.locator("ruby")).not.toHaveCount(0);
  await expect(page.locator("ruby rt").first()).toHaveText("ざん");

  const blockTypes = await page.locator("[data-lesson-block]").evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-lesson-block")),
  );
  expect(blockTypes).toEqual([
    "opening-question",
    "learning-goals",
    "dialogue",
    "visual",
    "explanation",
    "key-point",
    "guided-example",
    "retry",
    "dialogue",
    "summary",
    "enrichment",
  ]);
  for (const blockType of [
    "opening-question",
    "learning-goals",
    "dialogue",
    "explanation",
    "key-point",
    "guided-example",
    "retry",
    "summary",
  ]) {
    await expect(page.locator(`[data-lesson-block="${blockType}"]`).first()).toBeVisible();
  }
  await expect(page.getByText(/Unknown elementary lesson block/)).toHaveCount(0);
  expect(clientErrors).toEqual([]);
});

test("見本への公開リンクがない", async ({ page }) => {
  for (const route of ["/elementary", "/elementary/grade-3"]) {
    await page.goto(route);
    await expect(page.locator(`a[href="${SHOWCASE_ROUTE}"]`)).toHaveCount(0);
  }
});

for (const width of [375, 390, 768, 1280]) {
  test(`${width}pxで会話と例題が画面内に収まる`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 812 : 900 });
    await page.goto(SHOWCASE_ROUTE);
    const layout = await page.evaluate(() => {
      const bubbles = Array.from(document.querySelectorAll<HTMLElement>("[data-dialogue-line]"));
      const names = Array.from(document.querySelectorAll<HTMLElement>("[data-dialogue-line] [aria-label]"));
      const bodyText = document.querySelector<HTMLElement>("[data-dialogue-line] p");
      const heading = document.querySelector<HTMLElement>("h1");
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        bubbleBounds: bubbles.map((bubble) => bubble.getBoundingClientRect()).map(({ left, right }) => ({ left, right })),
        namesFit: names.every((name) => name.scrollWidth <= name.clientWidth + 1),
        bodyFontSize: bodyText ? Number.parseFloat(getComputedStyle(bodyText).fontSize) : 0,
        lineHeight: bodyText ? Number.parseFloat(getComputedStyle(bodyText).lineHeight) : 0,
        headingTop: heading?.getBoundingClientRect().top ?? -1,
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.bubbleBounds.every(({ left, right }) => left >= 0 && right <= layout.viewportWidth + 1)).toBe(true);
    expect(layout.namesFit).toBe(true);
    expect(layout.bodyFontSize).toBeGreaterThanOrEqual(18);
    expect(layout.lineHeight / layout.bodyFontSize).toBeGreaterThanOrEqual(1.75);
    expect(layout.headingTop).toBeGreaterThanOrEqual(0);
    await expect(page.getByTestId("elementary-guided-example")).toBeVisible();
  });
}

test("会話の読み順・見出し・フォーカス・a11yが有効", async ({ page }) => {
  await page.goto(SHOWCASE_ROUTE);
  const sections = page.locator("[data-lesson-block] > section");
  const sectionCount = await sections.count();
  expect(sectionCount).toBe(11);
  for (let index = 0; index < sectionCount; index += 1) {
    await expect(sections.nth(index)).toHaveAttribute("aria-labelledby", /.+/);
  }
  const dialogueOrder = await page.locator("ol[aria-label='会話のならび'] [data-dialogue-line]").evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute("data-dialogue-line")),
  );
  expect(dialogueOrder).toEqual([
    "division-subtract-once-line",
    "division-acknowledge-line",
    "division-notice-remainder-line",
    "division-sharing-prompt-line",
    "division-explain-prompt-line",
    "division-self-explanation-line",
    "division-closing-line",
  ]);
  await expect(page.locator("[data-dialogue-line][data-speaker='hinano']").first()).toContainText("ひなのちゃん");
  await expect(page.locator("[data-dialogue-line][data-speaker='tomiyama']").first()).toContainText("冨山");
  await expect(page.locator("[data-dialogue-line][data-speaker='tomiyama']").first()).toContainText("先生");
  const navLink = page.getByRole("link", { name: "小学生トップ" });
  await navLink.focus();
  await expect(navLink).toBeFocused();
  const focusStyle = await navLink.evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe("none");

  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
});
