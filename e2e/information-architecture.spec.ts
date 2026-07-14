import { expect, test } from "@playwright/test";

const MAJOR_ROUTES = [
  "/",
  "/math",
  "/english",
  "/subjects",
  "/learn",
  "/practice",
  "/exams",
  "/review",
  "/courses",
  "/units",
  "/common-test",
  "/common-test/simulator",
  "/common-test/review",
  "/common-test/history",
  "/mypage",
  "/quality",
  "/challenge-problems",
] as const;

const RETIRED_PUBLIC_TERMS = [
  "MVP build",
  "CYBER OS",
  "COMMAND CENTER",
  "サイバー模試",
  "サイバー計算",
  "CYBER English",
  "Singularity",
  "特異点",
  "深淵",
  "ABYSS",
  "ガチャ",
  "手動作成版",
  "AI生成版",
  "prototype",
  "paper sample",
  "攻略OS",
  "共通テスト対策室",
  "学習処方箋",
  "弱点攻略",
] as const;

for (const route of MAJOR_ROUTES) {
  test(`${route} has one descriptive h1 and no retired public terms`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status(), `${route} should resolve`).toBeLessThan(400);
    await expect(page.locator("h1"), `${route} should have exactly one h1`).toHaveCount(1);
    const body = await page.locator("body").innerText();
    for (const term of RETIRED_PUBLIC_TERMS) {
      expect(body, `${route} should not render retired term "${term}"`).not.toContain(term);
    }
  });
}

test("unknown route renders the accessible 404 page", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "ページが見つかりません" })).toBeVisible();
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "ホームへ戻る" })).toBeVisible();
});

test("legacy challenge URL redirects to the descriptive public route", async ({ page }) => {
  await page.goto("/abyss");
  await expect(page).toHaveURL(/\/challenge-problems$/);
  await expect(page.getByRole("heading", { level: 1, name: "挑戦問題" })).toBeVisible();
});

for (const width of [375, 390]) {
  test(`mobile navigation is operable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/math");

    const button = page.getByTestId("mobile-menu-button");
    await expect(button).toBeVisible();
    await expect(button).toHaveAttribute("aria-expanded", "false");

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const menu = page.getByTestId("mobile-menu");
    await expect(menu).toBeVisible();
    await expect(
      menu.locator('a[aria-current="page"]'),
      "mobile menu should expose exactly one current location",
    ).toHaveCount(1);

    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toHaveCount(0);
    await expect(button).toBeFocused();

    await button.click();
    await menu.getByRole("link", { name: "学ぶ", exact: true }).click();
    await expect(page).toHaveURL(/\/learn$/);
    await expect(page.getByTestId("mobile-menu")).toHaveCount(0);
  });
}

test("desktop navigation exposes one active location", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const route of ["/", "/english/vocab", "/practice", "/common-test", "/review"]) {
    await page.goto(route);
    const navigation = page.getByRole("navigation", { name: "主要ナビゲーション" });
    await expect(navigation).toBeVisible();
    await expect(navigation.locator('a[aria-current="page"]')).toHaveCount(1);
  }
});

test("skip link moves keyboard focus to the main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "本文へ移動" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

for (const width of [375, 390, 768, 1280, 1440]) {
  test(`major learning pages have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/math", "/english", "/common-test"]) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(
        dimensions.scrollWidth,
        `${route} should not overflow at ${width}px`,
      ).toBeLessThanOrEqual(dimensions.innerWidth + 1);
    }
  });
}

for (const route of ["/", "/math", "/english", "/common-test"]) {
  test(`${route} does not repeat a major action URL`, async ({ page }) => {
    await page.goto(route);
    for (const selector of ["[data-hero-action]", "[data-learning-action]"]) {
      const hrefs = await page.locator(selector).evaluateAll((links) =>
        links.map((link) => (link as HTMLAnchorElement).getAttribute("href")),
      );
      expect(new Set(hrefs).size, `${route} has duplicate URLs in ${selector}`).toBe(hrefs.length);
    }
  });
}
