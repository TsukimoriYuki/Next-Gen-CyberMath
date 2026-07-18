import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const HIDDEN_UNITS = [
  "/elementary/grade-3/math/units/decimals",
  "/elementary/grade-3/math/units/fractions",
  "/elementary/grade-3/japanese/units/explanatory-text",
  "/elementary/grade-3/social-studies/units/work-and-sales",
] as const;

const HIDDEN_LESSONS = [
  "/elementary/grade-3/math/units/division/lessons/division-with-remainders",
  "/elementary/grade-3/math/units/decimals/lessons/tenths-and-decimals",
  "/elementary/grade-3/math/units/fractions/lessons/parts-of-a-whole",
  "/elementary/grade-3/japanese/units/explanatory-text/lessons/find-key-sentences",
  "/elementary/grade-3/japanese/units/explanatory-text/lessons/connect-paragraphs",
  "/elementary/grade-3/social-studies/units/work-and-sales/lessons/goods-to-store",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

test("elementary routes use only the elementary navigation", async ({ page }) => {
  await page.goto("/elementary/grade-3/math");
  await expect(page.getByTestId("site-header")).toHaveCount(0);
  const nav = page.getByRole("navigation", { name: "小学生のページ" });
  for (const label of ["小学生トップ", "3年生", "算数", "国語", "社会", "おうちの方へ"]) {
    await expect(nav.getByRole("link", { name: label, exact: true })).toBeVisible();
  }
  await expect(nav.getByRole("link", { name: "算数", exact: true })).toHaveAttribute("aria-current", "page");
  for (const label of ["ログイン", "問題", "模試", "復習", "マイページ"]) await expect(page.getByRole("link", { name: label })).toHaveCount(0);
});

test("public subject pages keep published counts and hide expansion links", async ({ page }) => {
  for (const [route, subject] of [["/elementary/grade-3/math", "算数"], ["/elementary/grade-3/japanese", "国語"], ["/elementary/grade-3/social-studies", "社会"]] as const) {
    await page.goto(route);
    await expect(page.getByTestId("elementary-subject-problem-count")).toHaveText(`${subject}では、いま8問。3教科合計24問です。`);
    await expect(page.locator('a[href*="decimals"],a[href*="fractions"],a[href*="explanatory-text"],a[href*="work-and-sales"],a[href*="division-with-remainders"]')).toHaveCount(0);
  }
  await page.goto("/elementary");
  await expect(page.getByText("どの教科も、いまは1つのこうざです。", { exact: true })).toBeVisible();
  await expect(page.getByText(/1つのおはなし/u)).toHaveCount(0);
});

test("hidden expansion units, lessons, and review page are available in development", async ({ page }) => {
  for (const route of [...HIDDEN_UNITS, ...HIDDEN_LESSONS, "/elementary/showcase/expansion-wave-1"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
  await page.goto("/elementary/showcase/expansion-wave-1");
  await expect(page.getByText("6講座", { exact: true })).toBeVisible();
  await expect(page.getByText("48問", { exact: true })).toBeVisible();
  await expect(page.getByText("pending", { exact: true })).toBeVisible();
  await expect(page.getByText("not-reviewed", { exact: true })).toHaveCount(5);
});

test("representative hidden problems grade each supported answer type", async ({ page }) => {
  await page.goto(HIDDEN_LESSONS[0]);
  let practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 4; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("textbox").fill("2");
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(HIDDEN_LESSONS[3]);
  practice = page.getByTestId("elementary-practice-set");
  await practice.getByRole("radio", { name: "図書室の本をさがしやすくするくふう" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(HIDDEN_LESSONS[5]);
  practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 6; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("checkbox", { name: "品物は何か所かを通る" }).check();
  await practice.getByRole("checkbox", { name: "店から家へ品物がわたる" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();
});

for (const width of [375, 390, 768, 1280]) {
  test(`expansion review surfaces are responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/elementary", HIDDEN_LESSONS[1], "/elementary/showcase/expansion-wave-1"]) {
      await page.goto(route);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
    }
  });
}

test("expansion lesson and showcase have no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [HIDDEN_LESSONS[2], HIDDEN_LESSONS[4], "/elementary/showcase/expansion-wave-1"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical"), route).toEqual([]);
  }
  expect(errors).toEqual([]);
});
