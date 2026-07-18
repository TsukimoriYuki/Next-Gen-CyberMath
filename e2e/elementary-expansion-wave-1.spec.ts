import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const EXPANSION_UNITS = [
  "/elementary/grade-3/math/units/decimals",
  "/elementary/grade-3/math/units/fractions",
  "/elementary/grade-3/japanese/units/explanatory-text",
  "/elementary/grade-3/social-studies/units/work-and-sales",
] as const;

const EXPANSION_LESSONS = [
  "/elementary/grade-3/math/units/division/lessons/division-with-remainders",
  "/elementary/grade-3/math/units/decimals/lessons/tenths-and-decimals",
  "/elementary/grade-3/math/units/fractions/lessons/parts-of-a-whole",
  "/elementary/grade-3/japanese/units/explanatory-text/lessons/find-key-sentences",
  "/elementary/grade-3/japanese/units/explanatory-text/lessons/connect-paragraphs",
  "/elementary/grade-3/social-studies/units/work-and-sales/lessons/goods-to-store",
] as const;

const ALL_UNITS = [
  ["/elementary/grade-3/math/units/division", 2],
  ["/elementary/grade-3/math/units/decimals", 1],
  ["/elementary/grade-3/math/units/fractions", 1],
  ["/elementary/grade-3/japanese/units/story-reading", 1],
  ["/elementary/grade-3/japanese/units/explanatory-text", 2],
  ["/elementary/grade-3/social-studies/units/local-community", 1],
  ["/elementary/grade-3/social-studies/units/work-and-sales", 1],
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

test("public subject pages show the approved expansion counts and links", async ({ page }) => {
  for (const [route, subject, subjectProblems] of [["/elementary/grade-3/math", "算数", 32], ["/elementary/grade-3/japanese", "国語", 24], ["/elementary/grade-3/social-studies", "社会", 16]] as const) {
    await page.goto(route);
    await expect(page.getByTestId("elementary-subject-problem-count")).toHaveText(`${subject}では、いま${subjectProblems}問。3教科合計72問です。`);
  }
  await page.goto("/elementary/grade-3/math");
  await expect(page.getByTestId("elementary-unit-card")).toHaveCount(3);
  await page.goto("/elementary/grade-3/japanese");
  await expect(page.getByTestId("elementary-unit-card")).toHaveCount(2);
  await page.goto("/elementary/grade-3/social-studies");
  await expect(page.getByTestId("elementary-unit-card")).toHaveCount(2);
  await page.goto("/elementary");
  await expect(page.getByText("算数は4つ、国語は3つ、社会は2つのこうざがあります。", { exact: true })).toBeVisible();
  await expect(page.getByText("もんだいはぜんぶで72問です。", { exact: true })).toBeVisible();
  await expect(page.getByText(/1つのおはなし/u)).toHaveCount(0);
});

test("approved expansion units and lessons are available with the internal release record in development", async ({ page }) => {
  for (const route of [...EXPANSION_UNITS, ...EXPANSION_LESSONS, "/elementary/showcase/expansion-wave-1"]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
  }
  await page.goto("/elementary/showcase/expansion-wave-1");
  await expect(page.getByText("6講座", { exact: true })).toBeVisible();
  await expect(page.getByText("48問", { exact: true })).toBeVisible();
  await expect(page.getByText("beta", { exact: true })).toBeVisible();
  await expect(page.getByText("active", { exact: true })).toBeVisible();
  await expect(page.getByText("approved", { exact: true })).toHaveCount(6);
});

test("all seven units link to all nine published lessons without dead links", async ({ page }) => {
  let lessonLinks = 0;
  for (const [route, expectedLessons] of ALL_UNITS) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    const cards = page.getByTestId("elementary-lesson-card");
    await expect(cards, route).toHaveCount(expectedLessons);
    lessonLinks += expectedLessons;
    for (const link of await cards.all()) {
      const href = await link.getAttribute("href");
      expect(href, route).toBeTruthy();
    }
  }
  expect(lessonLinks).toBe(9);
});

test("representative approved expansion problems grade each supported answer type", async ({ page }) => {
  await page.goto(EXPANSION_LESSONS[0]);
  let practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 4; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("textbox").fill("2");
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(EXPANSION_LESSONS[1]);
  practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 4; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("textbox").fill("0.3");
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(EXPANSION_LESSONS[2]);
  practice = page.getByTestId("elementary-practice-set");
  await practice.getByRole("radio", { name: "1/4" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(EXPANSION_LESSONS[3]);
  practice = page.getByTestId("elementary-practice-set");
  await practice.getByRole("radio", { name: "図書室の本をさがしやすくするくふう" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(EXPANSION_LESSONS[4]);
  practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 6; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("checkbox", { name: "くふうと理由" }).check();
  await practice.getByRole("checkbox", { name: "くらべたことと分かったこと" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(EXPANSION_LESSONS[5]);
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
    for (const route of ["/elementary", EXPANSION_LESSONS[1], "/elementary/showcase/expansion-wave-1"]) {
      await page.goto(route);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
    }
  });
}

test("expansion lesson and showcase have no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [EXPANSION_LESSONS[2], EXPANSION_LESSONS[4], "/elementary/showcase/expansion-wave-1"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical"), route).toEqual([]);
  }
  expect(errors).toEqual([]);
});
