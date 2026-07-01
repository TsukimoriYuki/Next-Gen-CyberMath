import { defineConfig, devices } from "@playwright/test";

const PORT = 3111;
const BASE_URL = `http://127.0.0.1:${PORT}`;

// 外部評価者がたどりそうな主要ページを自動で巡回するための Playwright QA。
// npm run qa:routes:e2e / npm run qa:a11y
export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // next dev + Turbopack can transiently 500 on the first hit to a not-yet-compiled
  // dynamic route when many tests hit different pages in parallel right after startup.
  // Running against a production build avoids that flake and matches what an external
  // evaluator would actually see.
  webServer: {
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
