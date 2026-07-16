import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const representativeRoutes = [
  ["データ", "/informatics/problems/info-unit-data-01-data-types", "データの種類と尺度"],
  ["データ", "/informatics/problems/info-unit-data-09-misleading-axis", "縦軸を省略したグラフ"],
  ["プログラミング", "/informatics/problems/info-unit-prog-02-counter-trace", "条件付きカウンタのトレース"],
  ["プログラミング", "/informatics/problems/info-unit-prog-09-function-purpose", "関数の目的と戻り値"],
  ["ネットワーク", "/informatics/problems/info-unit-network-04-fault-diagnosis", "通信障害箇所の判断"],
  ["セキュリティ", "/informatics/problems/info-unit-security-04-phishing-response", "フィッシング疑いへの初動"],
  ["デジタル表現", "/informatics/problems/info-unit-digital-02-image-size", "画像の解像度と色深度"],
  ["コンピュータ", "/informatics/problems/info-unit-computer-03-performance-logic", "性能指標と論理回路"],
  ["情報デザイン", "/informatics/problems/info-unit-design-01-accessibility", "対象利用者とアクセシビリティ"],
  ["情報社会", "/informatics/problems/info-unit-society-02-problem-solving", "問題解決の評価と改善"],
] as const;

async function choose(page: Page, choiceText: string) {
  await page.locator("label").filter({ hasText: choiceText }).locator("input").check();
}

async function submitAndCheck(page: Page) {
  await page.getByRole("button", { name: "答え合わせ" }).click();
  await expect(page.getByText("正解です")).toBeVisible();
  await expect(page.getByRole("heading", { name: "解説" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "よくある誤答" })).toBeVisible();
}

test("情報Ⅰ一覧から40問が既存単元へ統合されている", async ({ page }) => {
  await page.goto("/informatics#practice");
  await expect(page.getByText("120問")).toBeVisible();
  await expect(page.getByRole("link", { name: /データの種類と尺度/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /条件付きカウンタのトレース/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /フィッシング疑いへの初動/ })).toBeVisible();
});

test("8領域の代表10問が公開され、関連講座と次問題へ進める", async ({ page }) => {
  for (const [, route, title] of representativeRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "対応する講座" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "次の問題" })).toBeVisible();
  }
});

test("6形式を採点し、解答後だけ根拠と全誤答理由を表示する", async ({ page }) => {
  await page.goto("/informatics/problems/info-unit-data-01-data-types");
  await expect(page.getByText(/^正答：/)).toHaveCount(0);
  await choose(page, "草丈(cm)");
  await submitAndCheck(page);
  await expect(page.getByText(/量的データであり/)).toBeVisible();

  await page.goto("/informatics/problems/info-unit-data-05-scatter-correlation");
  await choose(page, "開放時間が長い教室ほど");
  await choose(page, "開放時間以外の条件も記録");
  await submitAndCheck(page);
  await expect(page.locator("p").filter({ hasText: /正答：.*開放時間/ })).toBeVisible();

  await page.goto("/informatics/problems/info-unit-data-02-mean-median");
  await page.getByLabel("数値を入力").fill("２５");
  await submitAndCheck(page);
  await expect(page.getByText("正答：25", { exact: true })).toBeVisible();

  await page.goto("/informatics/problems/info-unit-prog-07-search-order");
  await choose(page, "②→①→③");
  await submitAndCheck(page);

  await page.goto("/informatics/problems/info-unit-data-04-cross-tab");
  await expect(page.getByRole("table")).toBeVisible();
  await choose(page, "50%");
  await submitAndCheck(page);

  await page.goto("/informatics/problems/info-unit-prog-02-counter-trace");
  await expect(page.getByRole("region", { name: "疑似コード" })).toBeVisible();
  await choose(page, "2");
  await submitAndCheck(page);
  await expect(page.locator("p.whitespace-pre-line").filter({ hasText: /countは0→0→1→1→2/ })).toBeVisible();
});

test("復習登録は未ログイン時にログイン導線を返す", async ({ page }) => {
  await page.goto("/informatics/problems/info-unit-security-04-phishing-response");
  await choose(page, "リンクを開かず");
  await submitAndCheck(page);
  await page.getByRole("button", { name: "復習に登録" }).click();
  await expect(page.getByText("復習登録には")).toBeVisible();
  await expect(page.getByLabel("解説").getByRole("link", { name: "ログイン" })).toHaveAttribute("href", "/auth/login");
});

for (const width of [375, 390] as const) {
  test(`${width}pxで表と疑似コードが画面全体を横にはみ出さない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(width === 375
      ? "/informatics/problems/info-unit-data-09-misleading-axis"
      : "/informatics/problems/info-unit-prog-10-sort-complexity");
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
    await expect(page.locator(width === 375 ? "table" : "pre")).toBeVisible();
  });
}

test("1280pxの対象ページに重大なa11y違反がない", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/informatics/problems/info-unit-data-04-cross-tab");
  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious")).toEqual([]);
});
