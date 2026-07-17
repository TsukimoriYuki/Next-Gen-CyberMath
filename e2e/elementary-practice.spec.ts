import { expect, test, type Locator } from "@playwright/test";

// 小学生版 pilot の採点UIを確認する。
// 実行例: npx playwright test --config playwright.elementary-pilot.config.ts

const MATH_LESSON = "/elementary/grade-3/math/units/division/lessons/division-meaning";
const JP_LESSON = "/elementary/grade-3/japanese/units/story-reading/lessons/feelings-change";

async function openPractice(
  page: import("@playwright/test").Page,
  route = MATH_LESSON,
): Promise<Locator> {
  await page.goto(route);
  const practice = page.locator('[data-testid="elementary-practice-set"]');
  await expect(practice).toBeVisible();
  await practice.scrollIntoViewIfNeeded();
  return practice;
}

async function selectRadio(scope: Locator, name: string): Promise<Locator> {
  const submit = scope.getByRole("button", { name: "答え合わせ" });
  const radio = scope.getByRole("radio", { name });
  await radio.check();
  await expect(radio).toBeChecked();
  await expect(submit).toBeEnabled();
  return submit;
}

async function fillNumeric(scope: Locator, value: string): Promise<Locator> {
  const submit = scope.getByRole("button", { name: "答え合わせ" });
  const input = scope.getByRole("textbox");
  await input.fill(value);
  await expect(input).toHaveValue(value);
  await expect(submit).toBeEnabled();
  return submit;
}

test("single-choice grading shows feedback and reveals the answer only after checking", async ({ page }) => {
  const practice = await openPractice(page);
  await expect(practice.getByText("正しい答え")).toHaveCount(0);

  const submit = await selectRadio(practice, "12÷3");
  await submit.click();

  await expect(practice.getByText("できました！")).toBeVisible();
  await expect(practice.getByText("せつめい")).toBeVisible();
  await expect(practice.getByText("正しい答え")).toBeVisible();
});

test("numeric input accepts a typed answer and grades it", async ({ page }) => {
  const practice = await openPractice(page);

  await practice.getByRole("button", { name: "つぎへ" }).click();
  const submit = await fillNumeric(practice, "3");
  await submit.click();
  await expect(practice.getByText("できました！")).toBeVisible();
});

test("multiple-choice grading accepts the complete answer set", async ({ page }) => {
  const practice = await openPractice(page, JP_LESSON);
  for (let i = 0; i < 7; i += 1) {
    await practice.getByRole("button", { name: "つぎへ" }).click();
  }
  await expect(practice.getByText("問題 8 / 8")).toBeVisible();
  await expect(practice.getByText("正しい答え")).toHaveCount(0);

  const first = practice.getByRole("checkbox", {
    name: "あおいは、花を風からまもろうとした。",
  });
  const second = practice.getByRole("checkbox", {
    name: "みなとは、さいごにあおいにあやまった。",
  });
  await first.check();
  await second.check();
  await expect(first).toBeChecked();
  await expect(second).toBeChecked();

  const submit = practice.getByRole("button", { name: "答え合わせ" });
  await expect(submit).toBeEnabled();
  await submit.click();
  await expect(practice.getByText("できました！")).toBeVisible();
  await expect(practice.getByText("正しい答え")).toBeVisible();
});
