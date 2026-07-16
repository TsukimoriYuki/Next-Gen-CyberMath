import { expect, test } from "@playwright/test";

const route = "/informatics/mock-exam/information-1-original-001";

test("mock autosaves, resumes, scores, diagnoses, and writes history", async ({ page }) => {
  await page.route("**/api/exam/attempts", async (requestRoute) => {
    await requestRoute.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, score: 0, maxScore: 100 }) });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(route);
  await expect(page.getByRole("heading", { name: /情報Ⅰ 共通テスト型オリジナル模試/ })).toBeVisible();
  await page.getByRole("button", { name: "Q" }).click();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("cyber-os:informatics-exam-draft:informatics-original-mock-001"))).not.toBeNull();
  await page.reload();
  await expect(page.getByRole("button", { name: "Q" })).toHaveClass(/bg-blue-50/);
  await page.getByRole("button", { name: "提出する" }).click();
  await page.getByRole("button", { name: "提出する" }).last().click();
  await expect(page.getByRole("heading", { name: "分野別得点" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "主な誤答原因" })).toBeVisible();
  await expect(page.getByRole("link", { name: "受験履歴を見る" })).toBeVisible();
  await page.goto("/informatics/history");
  await expect(page.getByText("情報Ⅰ オリジナル模試")).toBeVisible();
});

test("mock routes fit target widths and expose canonical metadata", async ({ page }) => {
  for (const width of [375, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(width === 375 ? "/informatics/mock-exam" : route);
    await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(width === 375 ? "/informatics/mock-exam$" : "/information-1-original-001$"));
  }
});
