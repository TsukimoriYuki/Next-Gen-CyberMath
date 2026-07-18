import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.ELEMENTARY_PILOT_PORT ?? 3131);
const BASE_URL = `http://localhost:${PORT}`;
const READY_URL = `${BASE_URL}/elementary/grade-3/math/units/division/lessons/division-meaning`;

export default defineConfig({
  testDir: "./e2e",
  testMatch: /elementary-(pilot-lessons|practice|content-inventory|readiness|limited-beta-release|limited-beta-public|expansion-wave-1|expansion-wave-2)\.spec\.ts/,
  timeout: 45_000,
  expect: { timeout: 7_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run dev -- -p ${PORT}`,
    url: READY_URL,
    env: { NODE_ENV: "development" },
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
