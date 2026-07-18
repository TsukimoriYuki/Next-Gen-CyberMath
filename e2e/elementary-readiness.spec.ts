import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const GUARDIAN_ROUTE = "/elementary/for-guardians";
const READINESS_ROUTE = "/elementary/showcase/publication-readiness";
const INVENTORY_ROUTE = "/elementary/showcase/content-inventory";
const PILOT_LESSONS = [
  "/elementary/grade-3/math/units/division/lessons/division-meaning",
  "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change",
  "/elementary/grade-3/social-studies/units/local-community/lessons/read-neighborhood-map",
] as const;
const PROHIBITED_CLAIMS = [
  "完全対応",
  "教科書完全準拠",
  "必ず成績が上がる",
  "絶対に理解できる",
  "全国の小学3年生に対応済み",
  "個別最適化済み",
  "小学3年生完成",
  "正式公開可能",
  "全国対応済み",
  "保証",
  "必ず伸びる",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

test("guardian page explains scope, privacy, grading, and incomplete features", async ({ page }) => {
  const response = await page.goto(GUARDIAN_ROUTE);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByTestId("elementary-guardian-page")).toContainText("限定beta");
  await expect(page.getByText("9講座", { exact: true })).toBeVisible();
  await expect(page.getByText("72問", { exact: true })).toBeVisible();
  await expect(page.getByText("個人情報入力を求めません", { exact: false })).toBeVisible();
  await expect(page.getByText("学習進捗をサーバーやデータベースへ保存していません", { exact: false })).toBeVisible();
  await expect(page.getByText("AIによる自由記述の自動採点は使っていません", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "まだ実装していないこと" })).toBeVisible();
  await expect(page.getByTestId("elementary-guardian-page")).toContainText("正式公開ではありません");
  await expect(page.getByText("算数・国語・社会の教材内容も実画面で確認", { exact: false })).toBeVisible();
  const body = await page.locator("body").innerText();
  for (const claim of PROHIBITED_CLAIMS) expect(body).not.toContain(claim);
});

test("readiness page records completed reviews and limited beta readiness", async ({ page }) => {
  const response = await page.goto(READINESS_ROUTE);
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByText("限定beta準備完了", { exact: true })).toBeVisible();
  await expect(page.getByText("正式公開はまだ推奨しません", { exact: false })).toBeVisible();
  await expect(page.getByText("まだ推奨しない", { exact: true })).toHaveCount(1);
  await expect(page.getByText("beta", { exact: true })).toBeVisible();
  await expect(page.getByText("9講座", { exact: true })).toBeVisible();
  await expect(page.getByText("72問", { exact: true })).toBeVisible();
  await expect(page.locator('[data-status="warning"]')).toHaveCount(6);
  await expect(page.locator('[data-status="fail"]')).toHaveCount(0);
  await expect(page.locator('[data-check-id][data-status="not-reviewed"]')).toHaveCount(0);
  await expect(page.getByText("算数・国語・社会を含む人間確認は完了", { exact: false })).toBeVisible();
  await expect(page.locator('[data-check-id="review-child-safety"]')).toContainText("approved");
  await expect(page.locator('[data-check-id="review-guardian-information"]')).toContainText("approved");
  await expect(page.locator('[data-check-id="review-asset-rights"]')).toContainText("approved");
  await expect(page.locator('[data-check-id="review-release-decision"]')).toContainText("reviewed");
  for (const id of ["review-math-content", "review-japanese-content", "review-social-content"]) {
    await expect(page.locator(`[data-check-id="${id}"]`)).toContainText("approved");
  }
});

test("formal child-facing pages do not expose developer-only status text", async ({ page }) => {
  for (const route of ["/elementary/grade-3", ...PILOT_LESSONS]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.locator('[data-text-audience="developer"]:not([data-testid="elementary-internal-banner"])'),
    ).toHaveCount(0);
    const mainText = await page.locator("main").innerText();
    expect(mainText, route).not.toContain("Curriculum接続");
    expect(mainText, route).not.toContain("技術基盤メモ");
    expect(mainText, route).not.toContain("registry");
  }
});

for (const width of [375, 390, 768, 1280]) {
  test(`guardian and readiness pages are responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [GUARDIAN_ROUTE, READINESS_ROUTE]) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
      const oversizedChecks = await page.locator('[data-check-id]').evaluateAll((elements) =>
        elements.filter((element) => element.scrollWidth > element.clientWidth + 1).length,
      );
      expect(oversizedChecks, route).toBe(0);
    }
  });
}

test("guardian, readiness, pilot lessons, and inventory have no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [GUARDIAN_ROUTE, READINESS_ROUTE, ...PILOT_LESSONS, INVENTORY_ROUTE]) {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});

test("guardian and readiness pages have no serious or critical accessibility violations", async ({ page }) => {
  for (const route of [GUARDIAN_ROUTE, READINESS_ROUTE]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("readiness status is textual and internal routes are absent from discovery", async ({ page, request }) => {
  await page.goto(READINESS_ROUTE);
  for (const status of ["warning"] as const) {
    const item = page.locator(`[data-check-id][data-status="${status}"]`).first();
    await expect(item).toContainText(status);
  }

  await page.goto("/elementary/grade-3");
  await expect(page.locator('nav[aria-label="主要ナビゲーション"] a[href*="/elementary"]')).toHaveCount(0);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain("/elementary");
});
