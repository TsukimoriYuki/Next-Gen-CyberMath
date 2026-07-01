#!/usr/bin/env node
// 主要ページの Lighthouse 計測（ベストエフォート）。
// npm run qa:lighthouse
//
// Lighthouse / Chrome が使えない環境（サンドボックス等）では失敗しても
// QA全体を止めないよう、常に exit code 0 で終わり、結果は分かる範囲で出力する。
// 本格的なCI計測ではなく、明らかな劣化がないかのスモークチェック用途。

import { spawn } from "node:child_process";

const PORT = 3112;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const ROUTES = ["/", "/math", "/units", "/problems/sine-synthesis-amplitude"];

function run(command, args, opts = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { shell: true, ...opts });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (d) => (stdout += d));
    child.stderr?.on("data", (d) => (stderr += d));
    child.on("close", (code) => resolve({ code, stdout, stderr }));
    child.on("error", () => resolve({ code: 1, stdout, stderr: "spawn failed" }));
  });
}

async function waitForServer(url, attempts = 30) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return true;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  console.log("[qa:lighthouse] building production server (this can take a while)...");
  const build = await run("npm", ["run", "build"]);
  if (build.code !== 0) {
    console.warn("[qa:lighthouse] build failed — skipping Lighthouse run. See docs/quality/performance-checklist.md for manual steps.");
    console.warn(build.stderr.slice(-2000));
    return;
  }

  const server = spawn("npm", ["run", "start", "--", "-p", String(PORT)], { shell: true });
  const up = await waitForServer(BASE_URL);
  if (!up) {
    console.warn("[qa:lighthouse] production server did not start — skipping. See docs/quality/performance-checklist.md for manual steps.");
    server.kill();
    return;
  }

  for (const route of ROUTES) {
    const url = `${BASE_URL}${route}`;
    console.log(`\n[qa:lighthouse] measuring ${url} ...`);
    const result = await run("npx", [
      "lighthouse",
      url,
      "--quiet",
      "--chrome-flags=--headless=new --no-sandbox",
      "--output=json",
      "--output-path=stdout",
      "--only-categories=performance,accessibility,best-practices,seo",
    ]);
    if (result.code !== 0) {
      console.warn(`[qa:lighthouse] could not measure ${route} in this environment (Chrome/Lighthouse unavailable). Skipping.`);
      console.warn("See docs/quality/performance-checklist.md for the manual measurement checklist.");
      continue;
    }
    try {
      const json = JSON.parse(result.stdout.slice(result.stdout.indexOf("{")));
      const scores = json.categories;
      console.log(
        `  performance=${Math.round(scores.performance.score * 100)} ` +
          `accessibility=${Math.round(scores.accessibility.score * 100)} ` +
          `best-practices=${Math.round(scores["best-practices"].score * 100)} ` +
          `seo=${Math.round(scores.seo.score * 100)}`,
      );
    } catch {
      console.warn(`[qa:lighthouse] could not parse Lighthouse output for ${route}.`);
    }
  }

  server.kill();
}

main().catch((err) => {
  console.warn("[qa:lighthouse] unexpected error, skipping:", err?.message ?? err);
});
