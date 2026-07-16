import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const CURRICULUM_ROUTE = "/elementary/showcase/curriculum";
const LESSON_ROUTE = "/elementary/showcase/lesson-blocks";

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

test("curriculum registryを教科・要件・根拠・coverage別に確認できる", async ({ page }) => {
  const clientErrors = captureClientErrors(page);
  const response = await page.goto(CURRICULUM_ROUTE);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("小学3年生");
  await expect(page.locator('[data-subject="math"]')).toContainText("算数（14 entries）");
  await expect(page.locator('[data-subject="japanese"]')).toContainText("国語（14 entries）");
  await expect(page.locator('[data-subject="social-studies"]')).toContainText("社会（4 entries）");
  await expect(page.locator('[data-subject="science"]')).toHaveCount(0);
  await expect(page.getByText("理科と小学4〜6年の詳細entryはありません。", { exact: true })).toBeVisible();
  await expect(page.locator('[data-requirement="required"]').first()).toContainText("required");
  await expect(page.locator('[data-requirement="enrichment"]').first()).toContainText("enrichment");
  await expect(page.getByText(/knowledge-and-skills（知識・技能）/u).first()).toBeVisible();
  await expect(page.getByText(/assessment suitability:/u).first()).toBeVisible();
  await expect(page.getByText(/prerequisite:/u).first()).toBeVisible();
  await expect(page.getByTestId("division-curriculum-coverage")).toContainText("partial");
  await expect(page.getByTestId("division-curriculum-coverage")).toContainText("not-started");
  await expect(page.getByText("未接続entry", { exact: true })).toBeVisible();
  const sourceLink = page.getByRole("link", { name: /文部科学省公式PDF・新しいタブ/u }).first();
  await expect(sourceLink).toHaveAttribute("href", /^https:\/\/(?:www\.)?mext\.go\.jp\//u);
  await expect(sourceLink).toHaveAttribute("target", "_blank");
  expect(clientErrors).toEqual([]);
});

test("わり算見本はdeveloper情報だけにcurriculumを表示し、教材本文を保つ", async ({ page }) => {
  await page.goto(LESSON_ROUTE);
  const developerPanel = page.getByTestId("elementary-curriculum-developer");
  await expect(developerPanel).toContainText("Curriculum接続");
  await expect(developerPanel).toContainText("除法");
  await expect(developerPanel).toContainText("partial");
  const learnerBlocks = page.locator("[data-lesson-block]");
  expect((await learnerBlocks.allTextContents()).join(" ")).not.toContain("学習指導要領");
  await expect(page.locator('[data-lesson-block="visual"]')).toBeVisible();
  await expect(page.locator("ruby").first()).toBeVisible();
  await expect(page.locator("ruby rt").first()).toHaveText("ざん");
});

test("curriculum確認ページに公開導線がない", async ({ page }) => {
  for (const route of ["/elementary", "/elementary/grade-3"]) {
    await page.goto(route);
    await expect(page.locator(`a[href="${CURRICULUM_ROUTE}"]`)).toHaveCount(0);
  }
});

for (const width of [375, 390, 768, 1280]) {
  test(`${width}pxでカードとsource titleが横にはみ出さない`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 812 : 900 });
    await page.goto(CURRICULUM_ROUTE);
    const layout = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll<HTMLElement>("article"));
      const sourceTitles = Array.from(document.querySelectorAll<HTMLElement>("article h3"));
      return {
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        cardsFit: cards.every((card) => {
          const bounds = card.getBoundingClientRect();
          return bounds.left >= -1 && bounds.right <= window.innerWidth + 1;
        }),
        sourceTitlesFit: sourceTitles.every((title) => title.scrollWidth <= title.clientWidth + 1),
      };
    });
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth + 1);
    expect(layout.cardsFit).toBe(true);
    expect(layout.sourceTitlesFit).toBe(true);
  });
}

test("見出し・landmark・外部リンク・色以外の表示・a11yが有効", async ({ page }) => {
  await page.goto(CURRICULUM_ROUTE);
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByText("required", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("enrichment", { exact: true }).first()).toBeVisible();
  await expect(page.getByText(/lesson coverage: partial/u).first()).toBeVisible();
  const link = page.getByRole("link", { name: /文部科学省公式PDF・新しいタブ/u }).first();
  await link.focus();
  await expect(link).toBeFocused();
  expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).not.toBe("none");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
});
