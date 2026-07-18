import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const WAVE_TWO_UNITS = [
  ["/elementary/grade-3/math/units/large-numbers", 1],
  ["/elementary/grade-3/math/units/addition-subtraction", 1],
  ["/elementary/grade-3/math/units/written-multiplication", 2],
  ["/elementary/grade-3/math/units/measurement", 3],
  ["/elementary/grade-3/math/units/triangles", 1],
  ["/elementary/grade-3/math/units/circles-spheres", 1],
  ["/elementary/grade-3/math/units/tables-bar-graphs", 1],
] as const;

const WAVE_TWO_LESSONS = [
  "/elementary/grade-3/math/units/large-numbers/lessons/read-large-numbers",
  "/elementary/grade-3/math/units/addition-subtraction/lessons/large-number-addition-subtraction",
  "/elementary/grade-3/math/units/written-multiplication/lessons/two-digit-times-one-digit",
  "/elementary/grade-3/math/units/written-multiplication/lessons/three-digit-times-one-digit",
  "/elementary/grade-3/math/units/measurement/lessons/measure-length",
  "/elementary/grade-3/math/units/measurement/lessons/measure-weight",
  "/elementary/grade-3/math/units/measurement/lessons/time-and-duration",
  "/elementary/grade-3/math/units/triangles/lessons/classify-triangles",
  "/elementary/grade-3/math/units/circles-spheres/lessons/circles-and-spheres",
  "/elementary/grade-3/math/units/tables-bar-graphs/lessons/tables-and-bar-graphs",
] as const;

async function hasHorizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
}

async function answerNumeric(page: Page, route: string, choiceCount: number, answer: string) {
  await page.goto(route);
  const practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < choiceCount; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("textbox").fill(answer);
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();
}

test("wave 2 preview exposes seven hidden units and ten lessons only in development", async ({ page }) => {
  let lessonCount = 0;
  for (const [route, expectedLessons] of WAVE_TWO_UNITS) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.getByTestId("elementary-lesson-card"), route).toHaveCount(expectedLessons);
    lessonCount += expectedLessons;
  }
  expect(lessonCount).toBe(10);
  for (const route of WAVE_TWO_LESSONS) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.getByTestId("elementary-practice-set")).toBeVisible();
    await expect(page.getByTestId("elementary-practice-set").getByText("問題 1 / 8", { exact: true })).toBeVisible();
    await expect(page.getByText(/publicationStatus|registry|hidden/iu)).toHaveCount(0);
  }
});

test("wave 2 internal record keeps human review pending and public counts unchanged", async ({ page }) => {
  const response = await page.goto("/elementary/showcase/expansion-wave-2");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1);
  for (const text of ["7単元", "10講座", "80問", "8件", "hidden", "pending", "not-reviewed"]) {
    await expect(page.getByText(text, { exact: true }).first()).toBeVisible();
  }
  await page.goto("/elementary");
  await expect(page.getByText("ぜんぶで9つのこうざです。", { exact: true })).toBeVisible();
  await expect(page.getByText("もんだいはぜんぶで72問です。", { exact: true })).toBeVisible();
  await page.goto("/elementary/credits");
  await expect(page.getByTestId("elementary-credit-list").locator("article")).toHaveCount(6);
});

test("representative numeric answers grade correctly in seven number and measurement lessons", async ({ page }) => {
  for (const [route, choiceCount, answer] of [
    [WAVE_TWO_LESSONS[0], 4, "60200"], [WAVE_TWO_LESSONS[1], 4, "3873"],
    [WAVE_TWO_LESSONS[2], 4, "96"], [WAVE_TWO_LESSONS[3], 4, "492"],
    [WAVE_TWO_LESSONS[4], 4, "3"], [WAVE_TWO_LESSONS[5], 4, "3000"], [WAVE_TWO_LESSONS[6], 4, "120"],
  ] as const) await answerNumeric(page, route, choiceCount, answer);
});

test("representative geometry and graph answers grade correctly", async ({ page }) => {
  await page.goto(WAVE_TWO_LESSONS[7]);
  let practice = page.getByTestId("elementary-practice-set");
  for (let index = 0; index < 5; index += 1) await practice.getByRole("button", { name: "つぎへ" }).click();
  await practice.getByRole("checkbox", { name: "正三角形である" }).check();
  await practice.getByRole("checkbox", { name: "同じ長さのへんが2本あると見ることもできる" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await page.goto(WAVE_TWO_LESSONS[8]);
  practice = page.getByTestId("elementary-practice-set");
  await practice.getByRole("radio", { name: "中心" }).check();
  await practice.getByRole("button", { name: "答え合わせ" }).click();
  await expect(practice.getByText("できました！")).toBeVisible();

  await answerNumeric(page, WAVE_TWO_LESSONS[9], 6, "4");
});

for (const width of [375, 390, 768, 1280]) {
  test(`wave 2 lessons and review page are responsive at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [WAVE_TWO_LESSONS[0], WAVE_TWO_LESSONS[7], WAVE_TWO_LESSONS[9], "/elementary/showcase/expansion-wave-2"]) {
      await page.goto(route);
      expect(await hasHorizontalOverflow(page), route).toBe(false);
    }
  });
}

test("wave 2 lesson surfaces have no serious accessibility or browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [WAVE_TWO_LESSONS[0], WAVE_TWO_LESSONS[4], WAVE_TWO_LESSONS[7], WAVE_TWO_LESSONS[9], "/elementary/showcase/expansion-wave-2"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical"), route).toEqual([]);
  }
  expect(errors).toEqual([]);
});
