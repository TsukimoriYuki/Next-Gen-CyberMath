import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// axe-core による主要ページの自動アクセシビリティ診断。
// npm run qa:a11y
//
// 厳密なWCAG完全準拠までは求めないが、重大度 serious / critical の違反がないことを
// 最低ラインとして検査する。あわせて、キーボード操作でメインナビゲーションに到達できるか、
// 主要な数式ブロックがモバイル幅で横にはみ出さないかも確認する。

const PAGES_TO_SCAN = [
  "/",
  "/math",
  "/english",
  "/subjects",
  "/learn",
  "/practice",
  "/exams",
  "/review",
  "/mypage",
  "/units",
  "/problems/sine-synthesis-amplitude",
  "/common-test",
  "/mock",
  "/dojo",
  "/courses",
  "/courses/math-1a",
  "/courses/math-1a/numbers-and-expressions",
  "/courses/math-1a/numbers-and-expressions/numbers-expressions-learning-map",
  "/common-test/lectures",
  "/common-test/lectures/numbers-expressions-learning-map",
  "/common-test/simulator",
  "/english/comprehension/plastic-ocean-pollution",
  "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs",
  "/common-test/review",
  "/common-test/history",
  "/mock/history",
  "/quality",
  "/quality/checklist",
  "/challenge-problems",
];

for (const route of PAGES_TO_SCAN) {
  test(`a11y scan: ${route}`, async ({ page }) => {
    // 完全攻略講義や問題解体講義はDOMが大きく、並列実行時はaxe解析が30秒を超えることがある。
    test.slow();
    await page.goto(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    const seriousOrWorse = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    expect(
      seriousOrWorse,
      seriousOrWorse
        .map((v) => `${v.id} (${v.impact}): ${v.help} — ${v.nodes.length} node(s)`)
        .join("\n"),
    ).toEqual([]);
  });
}

test("キーボード操作でメインナビゲーションへ到達できる", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
  expect(firstFocused).toBe("A");

  // 主要ナビゲーションのリンクがTab移動で到達可能であることを確認する。
  let reachedMathLink = false;
  for (let i = 0; i < 15; i++) {
    const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement | null)?.getAttribute("href"));
    if (href === "/math" || href === "/") reachedMathLink = true;
    await page.keyboard.press("Tab");
  }
  expect(reachedMathLink).toBe(true);
});

test("モバイル幅で数式ブロックが横にはみ出さない（問題詳細ページ）", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/problems/sine-synthesis-amplitude");

  const bodyScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  expect(bodyScrollWidth, "page should not require horizontal scroll on mobile width").toBeLessThanOrEqual(
    viewportWidth + 1,
  );
});

test("難度バッジは文字ラベルを持ち、色のみに依存していない", async ({ page }) => {
  await page.goto("/problems/sine-synthesis-amplitude");
  const difficultyText = (
    await page
      .locator("dt", { hasText: /^難度$/ })
      .locator("..")
      .locator("dd")
      .innerText()
  ).trim();
  const labels = ["A", "B", "C", "D", "D+", "EX", "∞"];
  expect(labels.some((label) => difficultyText === label || difficultyText.startsWith(`${label} `))).toBe(true);
});
