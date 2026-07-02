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
  "/common-test/lectures/numbers-expressions-core-skills",
  "/common-test/lectures/sets-logic-necessary-sufficient",
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
const PREPARING_ROUTES_NEED_ALT_NAV = ["/courses/math-3c", "/exam-sets/advanced-private"];

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

for (const route of PREPARING_ROUTES_NEED_ALT_NAV) {
  test(`${route} — 準備中でも他ページへの代替導線がある`, async ({ page }) => {
    await page.goto(route);
    const links = page.locator("a[href^='/']");
    const count = await links.count();
    expect(count, `${route} should offer at least one link elsewhere on the site`).toBeGreaterThan(1);
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

test("/common-test/simulator/math-2bc-70 — 旧プリセットは非公開notice を表示する", async ({ page }) => {
  await page.goto("/common-test/simulator/math-2bc-70");
  const bodyText = await page.locator("body").innerText();
  expect(bodyText).toContain("旧試作版のため非公開です");
});

test("手動作成版PDF模試 — PDFがそのまま配信され、問題本文を再構成していない", async ({ page, request }) => {
  await page.goto("/common-test/simulator/common-test-math-1a-manual-001");
  const iframeCount = await page.locator("iframe").count();
  expect(iframeCount, "manual mock page should embed the PDF via <iframe>").toBeGreaterThan(0);

  const pdfResponse = await request.get("/mock-exams/math1a/common-test-math-1a-manual-001.pdf");
  expect(pdfResponse.status()).toBe(200);
  expect(pdfResponse.headers()["content-type"]).toContain("application/pdf");

  await page.goto("/common-test/simulator/common-test-math-1a-manual-002");
  const iframeCount002 = await page.locator("iframe").count();
  expect(iframeCount002, "manual 002 page should embed the PDF via <iframe>").toBeGreaterThan(0);

  const pdfResponse002 = await request.get("/mock-exams/math1a/common-test-math-1a-manual-002.pdf");
  expect(pdfResponse002.status()).toBe(200);
  expect(pdfResponse002.headers()["content-type"]).toContain("application/pdf");
});
