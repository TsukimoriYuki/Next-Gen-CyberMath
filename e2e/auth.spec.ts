import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/auth/login", "/auth/register"] as const) {
  test(`${route} has accessible authentication UI`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByLabel("名前")).toBeVisible();
    await expect(page.getByLabel("パスコード", { exact: true })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/CYBER OS|MVP build|道場の門を開く/);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
}

test("registration explains learner and instructor requirements", async ({ page }) => {
  await page.goto("/auth/register");
  await expect(page.getByText("新規登録では8〜128文字が必要です。")).toBeVisible();
  await expect(page.getByText("通常の学習者アカウントでは空欄のまま登録できます。")).toBeVisible();
  await expect(page.getByLabel("指導者向け招待コードを表示")).toBeVisible();
});

test("auth APIs distinguish invalid input without exposing secrets", async ({ request }) => {
  const register = await request.post("/api/auth/register", { data: {} });
  expect(register.status()).toBe(400);
  const registerBody = JSON.stringify(await register.json());
  expect(registerBody).toContain("MISSING_INPUT");

  const login = await request.post("/api/auth/login", { data: {} });
  expect(login.status()).toBe(400);
  const combined = `${registerBody}${JSON.stringify(await login.json())}`;
  expect(combined).not.toMatch(/DATABASE_URL|JWT_SECRET|MENTOR_PASSCODE|prisma|cookie/i);
});
