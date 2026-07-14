import { test, expect } from "@playwright/test";

// 外部評価者がたどりそうな主要ページを自動で巡回するQA。
// npm run qa:routes:e2e
//
// 検査内容:
//  - 404にならない（2xx/3xxで応答する）
//  - ページタイトルが空でない
//  - h1が存在する
//  - 「単元が見つかりません」等の異常表示が正常ページに出ていない
//  - 「MVP build」が出ていない
//  - 生TeXらしき文字列（$...$の露出、\frac{ などの未変換コマンド）が出ていない
//  - 準備中ページには代替導線（他のページへのリンク）がある
//  - /admin/lectures が未認証で公開されていない

const CORE_ROUTES = [
  "/",
  "/math",
  "/units",
  "/common-test",
  "/common-test/simulator",
  "/common-test/simulator/common-test-math-1a-manual-001",
  "/common-test/simulator/common-test-math-1a-manual-002",
  "/common-test/practice",
  "/common-test/practice/practice-numbers-expressions-01",
  "/common-test/practice/practice-sets-logic-01",
  "/common-test/practice/practice-fusion-01",
  "/common-test/problem-lectures",
  "/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs",
  "/common-test/problem-lectures/ct-ia-q1-back-geometry-measurement",
  "/common-test/problem-lectures/ct-ia-q2-front-quadratic-1",
  "/common-test/problem-lectures/ct-ia-q2-front-quadratic-trapezoid",
  "/common-test/problem-lectures/ct-ia-q2-back-data-analysis",
  "/common-test/problem-lectures/ct-ia-q3-plane-geometry",
  "/common-test/problem-lectures/ct-ia-q3-space-geometry",
  "/common-test/problem-lectures/ct-ia-q4-probability",
  "/common-test/lectures/numbers-expressions-core-skills",
  "/exam-sets",
  "/courses",
  "/calc-drill",
  "/drill",
  "/dojo",
  "/mock",
  "/mypage",
  "/quality",
  "/quality/checklist",
  "/quality/changelog",
  "/quality/roadmap",
  "/privacy",
  "/terms",
  "/contact",
  "/about",
  "/licenses",
];

const REPRESENTATIVE_PROBLEM_ROUTES = [
  "/problems/radian-arc-sector",
  "/problems/sine-synthesis-amplitude",
  "/problems/dojo-addition-formula-proof",
  "/problems/dojo-tan1-irrational-dojo",
  "/problems/tan-one-degree-irrational",
  "/problems/abyss-euler-log-sine",
  "/problems/abyss-markov-equation",
];

const UNIT_ROUTES = [
  "/units/numbers-and-expressions",
  "/units/sets-and-logic",
  "/units/quadratic-functions",
  "/units/measurement-trigonometry",
  "/units/data-analysis",
  "/units/counting-probability",
  "/units/geometry-properties",
  "/units/integer-properties",
  "/units/trigonometric-functions",
  "/units/vectors",
];

const ALL_ROUTES = [...CORE_ROUTES, ...REPRESENTATIVE_PROBLEM_ROUTES, ...UNIT_ROUTES];

// 「準備中」等の代替導線を持つべきページ（本文中に他ページへのリンクが最低1つ必要）。
const NON_PUBLIC_ROUTES = [
  "/common-test/lectures/math-1a-shortcut-formulas",
  "/common-test/lectures/geometry-properties-auxiliary-lines",
  "/courses/math-3c",
  "/courses/math-1a-premium",
  "/courses/math-2bc-premium",
  "/exam-sets/advanced-private",
  "/exam-sets/standard-private/math-1a/standard-private-math-1a-001",
  "/common-test/simulator/paper-sample",
  "/common-test/simulator/common-test-math-1a-manual-001/structured-prototype",
] as const;

const RAW_TEX_PATTERN = /\$[^$\n]{1,80}\$|\\(frac|sqrt|sin|cos|tan|sum|int|left|right)\{/;

for (const route of ALL_ROUTES) {
  test(`${route} — 200/300番台で応答し、title・h1があり、異常表示や生TeXが出ない`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status(), `${route} should not 404/500`).toBeLessThan(400);

    const title = await page.title();
    expect(title.trim().length, `${route} should have a non-empty <title>`).toBeGreaterThan(0);

    const h1Count = await page.locator("h1").count();
    expect(h1Count, `${route} should have at least one <h1>`).toBeGreaterThan(0);

    const bodyText = await page.locator("body").innerText();
    expect(bodyText, `${route} must not show "単元が見つかりません" on a page that resolved`).not.toContain(
      "単元が見つかりません",
    );
    expect(bodyText, `${route} must not show "問題が見つかりません" on a page that resolved`).not.toContain(
      "問題が見つかりません",
    );
    expect(bodyText, `${route} must not show developer-facing "MVP build" text`).not.toContain("MVP build");

    const rawTexMatch = bodyText.match(RAW_TEX_PATTERN);
    expect(rawTexMatch, `${route} should not expose raw TeX in rendered text: ${rawTexMatch?.[0]}`).toBeNull();
  });
}

for (const route of NON_PUBLIC_ROUTES) {
  test(`${route} — productionでは404`, async ({ page }) => {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status(), `${route} should return 404 in production`).toBe(404);
  });
}

test("/admin/lectures — 未認証では管理画面が開けない", async ({ page }) => {
  const response = await page.goto("/admin/lectures", { waitUntil: "domcontentloaded" });
  // 認証ガードは redirect("/") で実装されているため、最終的なURLが /admin から離れていること、
  // かつ管理画面固有のUI（講義エディタ）が描画されていないことを確認する。
  expect(new URL(page.url()).pathname, "/admin/lectures should redirect away when unauthenticated").not.toBe(
    "/admin/lectures",
  );
  expect(response?.status()).toBeLessThan(400);
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).not.toContain("特別講義管理");
});

test("/admin/lectures/new — 未認証では管理画面が開けない", async ({ page }) => {
  await page.goto("/admin/lectures/new", { waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname).not.toBe("/admin/lectures/new");
});

test("/common-test/simulator/math-1a-70 — 旧プリセットは手動PDF版へリダイレクトされる", async ({ page }) => {
  await page.goto("/common-test/simulator/math-1a-70", { waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname).toBe("/common-test/simulator/common-test-math-1a-manual-001");
});

test("/common-test/simulator/math-2bc-70 — 旧プリセットはproductionで404", async ({ page }) => {
  const response = await page.goto("/common-test/simulator/math-2bc-70");
  expect(response?.status()).toBe(404);
});

test("AI prototype — productionでは監修済みPDF模試へredirect", async ({ page }) => {
  await page.goto("/common-test/simulator/common-test-math-1a-mock-001", {
    waitUntil: "domcontentloaded",
  });
  expect(new URL(page.url()).pathname).toBe(
    "/common-test/simulator/common-test-math-1a-manual-001",
  );
});

test("公開一覧 — 空講座・範囲外講義・空模試カテゴリへの導線を出さない", async ({ page }) => {
  await page.goto("/courses");
  const coursesText = await page.locator("body").innerText();
  expect(coursesText).not.toContain("数学III・C");
  expect(coursesText).not.toContain("準備中");

  await page.goto("/common-test/lectures");
  await expect(
    page.locator('a[href="/common-test/lectures/math-1a-shortcut-formulas"]'),
  ).toHaveCount(0);
  await expect(
    page.locator('a[href="/common-test/lectures/geometry-properties-auxiliary-lines"]'),
  ).toHaveCount(0);

  await page.goto("/exam-sets", { waitUntil: "domcontentloaded" });
  expect(new URL(page.url()).pathname).toBe("/mock");
});

test("手動作成版PDF模試 — PDFがそのまま配信され、問題本文を再構成していない", async ({ page, request }) => {
  const pageResponse = await page.goto("/common-test/simulator/common-test-math-1a-manual-001");
  expect(pageResponse?.headers()["x-frame-options"]).toBe("DENY");
  const iframeCount = await page.locator("iframe").count();
  expect(iframeCount, "manual mock page should embed the PDF via <iframe>").toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: "別タブでPDFを開く" })).toBeVisible();

  const pdfResponse = await request.get("/mock-exams/math1a/common-test-math-1a-manual-001.pdf");
  expect(pdfResponse.status()).toBe(200);
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");
  expect(pdfResponse.headers()["x-frame-options"]).toBe("SAMEORIGIN");

  await page.goto("/common-test/simulator/common-test-math-1a-manual-002");
  const iframeCount002 = await page.locator("iframe").count();
  expect(iframeCount002, "manual 002 page should embed the PDF via <iframe>").toBeGreaterThan(0);

  const pdfResponse002 = await request.get("/mock-exams/math1a/common-test-math-1a-manual-002.pdf");
  expect(pdfResponse002.status()).toBe(200);
  expect(pdfResponse002.headers()["content-type"]).toContain("application/pdf");
  expect(pdfResponse002.headers()["x-frame-options"]).toBe("SAMEORIGIN");

  await page.goto("/common-test/problem-lectures/ct-ia-q1-front-algebra-logic-abs");
  await expect(page.getByRole("link", { name: "問題PDFを別タブで開く" }).first()).toBeVisible();
  const lecturePdfResponse = await request.get("/problem1a/ct_algebra_logic_abs_problem.pdf");
  expect(lecturePdfResponse.status()).toBe(200);
  expect(lecturePdfResponse.headers()["content-type"]).toContain("application/pdf");
  expect(lecturePdfResponse.headers()["x-frame-options"]).toBe("SAMEORIGIN");
});
