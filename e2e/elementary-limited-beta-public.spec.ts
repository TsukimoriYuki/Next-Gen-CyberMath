import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const LESSONS = [
  "/elementary/grade-3/math/units/division/lessons/division-meaning",
  "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change",
  "/elementary/grade-3/social-studies/units/local-community/lessons/read-neighborhood-map",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

async function expectLimitedBetaBadge(page: Page) {
  const notice = page.getByTestId("elementary-beta-notice-full");
  await expect(notice).toBeVisible();
  const baseText = await notice.locator("ruby").first().evaluate((ruby) =>
    [...ruby.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .map((node) => node.textContent ?? "")
      .join(""),
  );
  expect(baseText).toBe("限定β版");
}

test("learn card opens the approved elementary limited beta", async ({ page }) => {
  await page.goto("/learn");
  const card = page.getByRole("link", { name: "小学生版を開く" });
  await expect(card).toBeVisible();
  await expect(card).toContainText("小学3年生・限定β・9講座・72問");
  await card.click();
  await expect(page).toHaveURL(/\/elementary$/);
  await expectLimitedBetaBadge(page);
});

test("approved pages explain limited scope and data handling", async ({ page }) => {
  for (const route of [
    "/elementary",
    "/elementary/grade-3",
    "/elementary/grade-3/math",
    "/elementary/grade-3/japanese",
    "/elementary/grade-3/social-studies",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expectLimitedBetaBadge(page);
    await expect(page.locator("h1")).toHaveCount(1);
  }

  await page.goto("/elementary");
  await expect(page.getByText("もんだいはぜんぶで72問です。", { exact: true })).toBeVisible();
  await expect(page.getByText("小学3年生で学ぶことの、すべてではありません。", { exact: true })).toBeVisible();
  await expect(page.getByText("学んだきろくは、ほぞんしません。", { exact: true })).toBeVisible();

  await page.goto("/elementary/for-guardians");
  await expect(page.getByText("学習履歴", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("AIによる自由記述の自動採点は使っていません", { exact: false })).toBeVisible();
  await expect(page.getByText("個人情報入力を求めません", { exact: false })).toBeVisible();
});

test("all pilot lessons show one compact beta marker", async ({ page }) => {
  for (const route of LESSONS) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByTestId("elementary-beta-notice-compact")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

for (const width of [375, 390, 768, 1280]) {
  test(`limited beta entry points are responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/learn", "/elementary", "/elementary/grade-3", "/elementary/for-guardians"]) {
      await page.goto(route);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
    }
  });
}

test("limited beta entry points have no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/learn", "/elementary", "/elementary/for-guardians"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const serious = results.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );
    expect(serious, `${route}\n${serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")}`).toEqual([]);
  }
  expect(errors).toEqual([]);
});
