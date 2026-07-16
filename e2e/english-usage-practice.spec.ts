import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const representatives = [
  ["/english/vocab/eng-usage-context-01-address", "多義語 address の文脈判断"],
  ["/english/vocab/eng-usage-context-06-available", "案内メールの available"],
  ["/english/vocab/eng-usage-synonym-05-not-all", "部分否定を保つ言い換え"],
  ["/english/vocab/eng-usage-form-01-effective", "形容詞 effective の選択"],
  ["/english/vocab/eng-usage-collocation-02-match", "動詞と名詞の対応"],
  ["/english/vocab/eng-usage-phrasal-02-result", "result in / result from の対応"],
  ["/english/vocab/eng-usage-verb-02-remind-order", "remindの語順"],
  ["/english/vocab/eng-usage-naa-03-nearly-enough", "nearlyとenoughの位置"],
  ["/english/vocab/eng-usage-conversation-01-email-reply", "申込み変更メールへの返信"],
] as const;

async function choose(page: Page, text: string) {
  const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const name = new RegExp(`^[A-D]\\.\\s+${escaped}(?:[.!?])?$`);
  const radio = page.getByRole("radio", { name });
  if (await radio.count()) await radio.check();
  else await page.getByRole("checkbox", { name }).check();
}

async function submit(page: Page) {
  await page.getByRole("button", { name: "答え合わせ" }).click();
  await expect(page.getByText("正解です")).toBeVisible();
  await expect(page.getByRole("heading", { name: "正答英文" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "自然な日本語訳" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "よくある誤り" })).toBeVisible();
}

test("英語語彙ページに8分類40問の一覧が統合されている", async ({ page }) => {
  await page.goto("/english/vocab#usage-practice");
  await expect(page.getByRole("heading", { name: "語彙・語法演習 40問" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "文脈で判断する語彙" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "会話・案内文での自然な表現" })).toBeVisible();
  await expect(page.getByRole("link", { name: /多義語 address/ })).toBeVisible();
});

test("指定9代表問題が公開され、関連講座と次問題を表示する", async ({ page }) => {
  for (const [route, title] of representatives) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.getByRole("heading", { name: "関連講座" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "次の問題" })).toBeVisible();
  }
});

test("単一・複数・空欄・対応・並べ替え・メールを採点できる", async ({ page }) => {
  await page.goto("/english/vocab/eng-usage-context-01-address");
  await expect(page.getByRole("heading", { name: "正答英文" })).toHaveCount(0);
  await choose(page, "deal with");
  await submit(page);
  await expect(page.getByText("委員たちはその問題に対処し、より安全な配置を提案する予定だ。", { exact: true })).toBeVisible();

  await page.goto("/english/vocab/eng-usage-context-05-limited");
  await choose(page, "The result may not represent every club member");
  await choose(page, "The finding should be interpreted within the survey conditions");
  await submit(page);

  await page.goto("/english/vocab/eng-usage-form-01-effective");
  await choose(page, "effective");
  await submit(page);

  await page.goto("/english/vocab/eng-usage-collocation-02-match");
  await choose(page, "meet / raise / gain");
  await submit(page);

  await page.goto("/english/vocab/eng-usage-verb-02-remind-order");
  await choose(page, "reminded us to bring our ID cards");
  await submit(page);
  await expect(page.getByText("The coach reminded us to bring our ID cards.", { exact: true })).toBeVisible();

  await page.goto("/english/vocab/eng-usage-conversation-01-email-reply");
  await choose(page, "Thank you for letting me know. Please move my booking to Sunday at 10:00");
  await submit(page);
});

test("採点後に全選択肢理由と復習登録を表示する", async ({ page }) => {
  await page.goto("/english/vocab/eng-usage-phrasal-02-result");
  await choose(page, "(1) from / (2) in");
  await submit(page);
  await expect(page.getByText(/原因と結果の向きを逆/)).toBeVisible();
  await page.getByRole("button", { name: "復習に登録" }).click();
  await expect(page.getByText("復習登録には")).toBeVisible();
  await expect(page.getByLabel("解説").getByRole("link", { name: "ログイン" })).toHaveAttribute("href", "/auth/login");
});

for (const width of [375, 390] as const) {
  test(`${width}pxで英文と長い選択肢が横にはみ出さない`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(width === 375 ? "/english/vocab/eng-usage-context-05-limited" : "/english/vocab/eng-usage-verb-02-remind-order");
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(sizes.scroll).toBeLessThanOrEqual(sizes.client);
    await expect(page.locator("label").first()).toBeVisible();
  });
}

test("1280pxの対象詳細ページに重大なa11y違反がない", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/english/vocab/eng-usage-conversation-01-email-reply");
  const results = await new AxeBuilder({ page }).include("main").analyze();
  expect(results.violations.filter((violation) => violation.impact === "critical" || violation.impact === "serious")).toEqual([]);
});
