import { defineConfig, devices } from "@playwright/test";

const PORT = 3128;
const BASE_URL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./e2e",
  testMatch: "elementary-visual-assets.spec.ts",
  timeout: 30_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: { baseURL: BASE_URL, trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: `${BASE_URL}/elementary/showcase/visual-assets`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
