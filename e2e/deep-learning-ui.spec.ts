import { expect, test, type Page } from "@playwright/test";

// 深い学習ページの共通骨格を代表ルートで確認する。
// 画面幅とルートの全組合せは作らず、各幅に崩れやすいページ種別を割り当てる。
// 実行例: npx playwright test e2e/deep-learning-ui.spec.ts

type RouteSample = Readonly<{
  label: string;
  route: string;
}>;

const ROUTES = {
  coursesIndex: {
    label: "講座一覧",
    route: "/courses",
  },
  courseSubject: {
    label: "数学IA講座一覧",
    route: "/courses/math-1a",
  },
  courseUnit: {
    label: "数学IA単元講座一覧",
    route: "/courses/math-1a/numbers-and-expressions",
  },
  courseDetail: {
    label: "講座詳細",
    route: "/courses/math-1a/numbers-and-expressions/polynomial-basics",
  },
  problemDetail: {
    label: "問題詳細",
    route: "/problems/sine-synthesis-amplitude",
  },
  unitsIndex: {
    label: "単元一覧",
    route: "/units",
  },
  unitDetail: {
    label: "単元詳細",
    route: "/units/numbers-and-expressions",
  },
  comprehensionDetail: {
    label: "英語精読詳細",
    route: "/english/comprehension/plastic-ocean-pollution",
  },
  multiSourceDetail: {
    label: "英語複数資料詳細",
    route: "/english/multi-source/summer-program-overseas",
  },
  speedReadingDetail: {
    label: "英語速読詳細",
    route: "/english/speed-reading/ai-and-environment",
  },
  problemLecture: {
    label: "問題解体型講座",
    route: "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs",
  },
  commonTestPracticeIndex: {
    label: "共通テスト大問型演習一覧",
    route: "/common-test/practice",
  },
  problemLecturesIndex: {
    label: "問題解体型講座一覧",
    route: "/common-test/problem-lectures",
  },
  specialLecturesIndex: {
    label: "特別講義一覧",
    route: "/common-test/lectures",
  },
  specialLectureDetail: {
    label: "特別講義詳細",
    route: "/common-test/lectures/numbers-expressions-core-skills",
  },
  simulatorIndex: {
    label: "共通テスト型本番模試一覧",
    route: "/common-test/simulator",
  },
  pdfMock: {
    label: "PDF型模試",
    route: "/common-test/simulator/common-test-math-1a-manual-001",
  },
  commonTestReview: {
    label: "共通テスト復習",
    route: "/common-test/review",
  },
  commonTestHistory: {
    label: "共通テスト履歴",
    route: "/common-test/history",
  },
  mockHistory: {
    label: "模試履歴",
    route: "/mock/history",
  },
  mypage: {
    label: "マイページ",
    route: "/mypage",
  },
} as const satisfies Record<string, RouteSample>;

// 受験中のPDF模試は集中用の専用shellを維持するため、共通shell検査からは除外し、
// 下段の専用interactionテストでlandmark・操作性・overflowを検証する。
const DEEP_PAGE_SAMPLES = Object.values(ROUTES).filter(
  (sample) => sample !== ROUTES.pdfMock,
);

const RESPONSIVE_SAMPLES = [
  {
    name: "375x812",
    viewport: { width: 375, height: 812 },
    page: ROUTES.courseDetail,
  },
  {
    name: "390x844",
    viewport: { width: 390, height: 844 },
    page: ROUTES.mockHistory,
  },
  {
    name: "768x1024",
    viewport: { width: 768, height: 1024 },
    page: ROUTES.problemDetail,
  },
  {
    name: "1024x900",
    viewport: { width: 1024, height: 900 },
    page: ROUTES.multiSourceDetail,
  },
  {
    name: "1280x900",
    viewport: { width: 1280, height: 900 },
    page: ROUTES.problemLecture,
  },
  {
    name: "1440x900",
    viewport: { width: 1440, height: 900 },
    page: ROUTES.commonTestHistory,
  },
  {
    name: "844x390 landscape",
    viewport: { width: 844, height: 390 },
    page: ROUTES.speedReadingDetail,
  },
] as const;

async function assertCommonStructure(page: Page, sample: RouteSample) {
  const response = await page.goto(sample.route);
  const status = response?.status() ?? 0;
  expect(status, sample.label + " (" + sample.route + ") should resolve").toBeGreaterThanOrEqual(200);
  expect(status, sample.label + " (" + sample.route + ") should not return 4xx/5xx").toBeLessThan(400);

  await expect(
    page.locator('[data-page-shell="learning"]'),
    sample.label + " should render exactly one shared learning shell",
  ).toHaveCount(1);
  await expect(
    page.getByRole("main"),
    sample.label + " should expose exactly one main landmark",
  ).toHaveCount(1);
  await expect(
    page.locator("h1"),
    sample.label + " should render exactly one h1",
  ).toHaveCount(1);

  const breadcrumbs = page.getByRole("navigation", { name: "パンくず" });
  await expect(
    breadcrumbs,
    sample.label + " should expose exactly one breadcrumb navigation",
  ).toHaveCount(1);
  await expect(
    breadcrumbs.locator('[aria-current="page"]'),
    sample.label + ' breadcrumb should expose exactly one aria-current="page"',
  ).toHaveCount(1);
  await expect(
    breadcrumbs.locator("li").last().locator('[aria-current="page"]'),
    sample.label + " breadcrumb current item should be last",
  ).toHaveCount(1);
}

async function assertNoHorizontalOverflow(page: Page, sample: RouteSample) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(
    dimensions.scrollWidth,
    sample.label +
      " (" +
      sample.route +
      ") should not overflow horizontally: scrollWidth=" +
      dimensions.scrollWidth +
      ", clientWidth=" +
      dimensions.clientWidth,
  ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

test("代表的な深い学習ページが共通骨格とlandmarkを使う", async ({ page }) => {
  test.setTimeout(90_000);
  for (const sample of DEEP_PAGE_SAMPLES) {
    const response = await page.goto(sample.route);
    const status = response?.status() ?? 0;

    expect.soft(
      status,
      sample.label + " (" + sample.route + ") should resolve without 4xx/5xx",
    ).toBeGreaterThanOrEqual(200);
    expect.soft(
      status,
      sample.label + " (" + sample.route + ") should resolve without 4xx/5xx",
    ).toBeLessThan(400);
    await expect.soft(
      page.locator('[data-page-shell="learning"]'),
      sample.label + " should render exactly one shared learning shell",
    ).toHaveCount(1);
    await expect.soft(
      page.getByRole("main"),
      sample.label + " should expose exactly one main landmark",
    ).toHaveCount(1);
    await expect.soft(
      page.locator("h1"),
      sample.label + " should render exactly one h1",
    ).toHaveCount(1);

    const breadcrumbs = page.getByRole("navigation", { name: "パンくず" });
    await expect.soft(
      breadcrumbs,
      sample.label + " should expose exactly one breadcrumb navigation",
    ).toHaveCount(1);
    await expect.soft(
      breadcrumbs.locator('[aria-current="page"]'),
      sample.label + ' breadcrumb should expose exactly one aria-current="page"',
    ).toHaveCount(1);
    await expect.soft(
      breadcrumbs.locator("li").last().locator('[aria-current="page"]'),
      sample.label + " breadcrumb current item should be last",
    ).toHaveCount(1);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect.soft(
      dimensions.scrollWidth,
      sample.label + " should not overflow at the default desktop viewport",
    ).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  }
});

for (const sample of RESPONSIVE_SAMPLES) {
  test(
    sample.page.label + " は " + sample.name + " で横overflowしない",
    async ({ page }) => {
      await page.setViewportSize(sample.viewport);
      await assertCommonStructure(page, sample.page);
      await assertNoHorizontalOverflow(page, sample.page);
    },
  );
}

test("模試履歴のSSR loading fallbackが支援技術へ状態を通知する", async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) throw new Error("Playwright baseURL is required for the loading-state test");

  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
  });
  const page = await context.newPage();

  try {
    const response = await page.goto(ROUTES.mockHistory.route);
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByRole("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);

    const loading = page.getByRole("status");
    await expect(loading).toContainText("演習履歴を読み込んでいます");
    await expect(loading).toHaveAttribute("aria-live", "polite");
    await expect(loading).toHaveAttribute("aria-busy", "true");
  } finally {
    await context.close();
  }
});

// 公開ルートから意図的にerror.tsxを発火させるテスト専用入口は設けない。
// error境界のalert・再試行・戻り先はcheck-deep-learning-ui.tsで検査し、
// ブラウザでは到達可能な失敗状態である404の回復導線を確認する。
test("到達可能な404状態は単一landmarkと回復導線を持つ", async ({ page }) => {
  const response = await page.goto("/__deep-learning-ui-missing-route__");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(
    page.getByRole("heading", { level: 1, name: "ページが見つかりません" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "ホームへ戻る" })).toBeVisible();
});

test("PDF型模試のモバイルタブはキーボードで冊子と解答用紙を切り替えられる", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto(ROUTES.pdfMock.route);
  expect(response?.status()).toBeLessThan(400);

  const tabList = page.getByRole("tablist", { name: "模試の表示切り替え" });
  const pdfTab = tabList.getByRole("tab", { name: "PDF問題冊子" });
  const answersTab = tabList.getByRole("tab", { name: "解答用紙" });
  await expect(pdfTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "PDF問題冊子" })).toBeVisible();

  for (const tab of [pdfTab, answersTab]) {
    const box = await tab.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }

  await pdfTab.focus();
  await pdfTab.press("End");
  await expect(answersTab).toBeFocused();
  await expect(answersTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: "解答用紙" })).toBeVisible();

  await answersTab.press("Home");
  await expect(pdfTab).toBeFocused();
  await expect(pdfTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("link", { name: "別タブでPDFを開く" })).toBeVisible();
  await assertNoHorizontalOverflow(page, ROUTES.pdfMock);
});

test("英語詳細のモバイル切り替えは状態を通知し44px操作領域を保つ", async ({
  page,
}) => {
  const samples = [
    {
      page: ROUTES.comprehensionDetail,
      first: "本文",
      second: "設問",
      region: "設問",
    },
    {
      page: ROUTES.multiSourceDetail,
      first: "資料",
      second: "設問",
      region: "設問",
    },
  ] as const;

  await page.setViewportSize({ width: 375, height: 812 });
  for (const sample of samples) {
    const response = await page.goto(sample.page.route);
    expect(response?.status()).toBeLessThan(400);
    const switcher = page.getByRole("group", { name: "表示する内容" });
    const first = switcher.getByRole("button", { name: sample.first, exact: true });
    const second = switcher.getByRole("button", { name: sample.second, exact: true });
    await expect(first).toHaveAttribute("aria-pressed", "true");

    for (const button of [first, second]) {
      const box = await button.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }

    await second.click();
    await expect(second).toHaveAttribute("aria-pressed", "true");
    await expect(first).toHaveAttribute("aria-pressed", "false");
    await expect(page.getByRole("region", { name: sample.region })).toBeVisible();
    await assertNoHorizontalOverflow(page, sample.page);
  }
});

test("速読サポートは進捗と44pxのタイマー操作を提供する", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto(ROUTES.speedReadingDetail.route + "?speedSupport=1");
  expect(response?.status()).toBeLessThan(400);
  await expect(
    page.getByRole("heading", { level: 2, name: "スピードサポート ON" }),
  ).toBeVisible();

  const progress = page.getByRole("progressbar", { name: "目標読了ペースの進捗" });
  await expect(progress).toHaveAttribute("aria-valuemin", "0");
  await expect(progress).toHaveAttribute("aria-valuemax", "100");

  const pause = page.getByRole("button", { name: "一時停止" });
  const resume = page.getByRole("button", { name: "再開" });
  for (const button of [pause, resume, page.getByRole("button", { name: "リセット" })]) {
    const box = await button.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }

  await pause.click();
  await expect(resume).toBeEnabled();
  await resume.focus();
  await expect(resume).toBeFocused();
  await assertNoHorizontalOverflow(page, ROUTES.speedReadingDetail);
});
