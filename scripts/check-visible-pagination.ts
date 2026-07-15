import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  collectVisibleRows,
  type CursorBatchRequest,
} from "../src/lib/collect-visible-rows";

type FixtureRow = Readonly<{
  id: string;
  visible: boolean;
}>;

function createFetcher(rows: readonly FixtureRow[]) {
  const requests: CursorBatchRequest[] = [];

  return {
    requests,
    async fetchBatch({ afterId, take }: CursorBatchRequest) {
      requests.push({ afterId, take });
      const cursorIndex = afterId
        ? rows.findIndex((row) => row.id === afterId)
        : -1;
      if (afterId && cursorIndex < 0) return [];
      return rows.slice(cursorIndex + 1, cursorIndex + 1 + take);
    },
  };
}

function assertCursorConsumer(
  relativePath: string,
  direction: "asc" | "desc",
  expectedUses = 1,
) {
  const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
  assert.equal(
    source.match(/collectVisibleRows\s*\(/g)?.length ?? 0,
    expectedUses,
    `${relativePath} must collect visible rows across cursor batches`,
  );
  assert.equal(
    source.match(
      /cursor:\s*afterId\s*\?\s*\{\s*id:\s*afterId\s*\}\s*:\s*undefined/g,
    )?.length ?? 0,
    expectedUses,
    `${relativePath} must use the unique row id as its Prisma cursor`,
  );
  assert.equal(
    source.match(/skip:\s*afterId\s*\?\s*1\s*:\s*undefined/g)?.length ?? 0,
    expectedUses,
    `${relativePath} must skip the previous cursor row`,
  );
  assert.equal(
    source.match(
      new RegExp(`\\{\\s*id:\\s*"${direction}"\\s*\\}`, "g"),
    )?.length ?? 0,
    expectedUses,
    `${relativePath} must use id as the final stable order tie-breaker`,
  );
}

async function main() {
  const hiddenFirstBatch: FixtureRow[] = [
    { id: "hidden-1", visible: false },
    { id: "hidden-2", visible: false },
    { id: "hidden-3", visible: false },
    { id: "visible-1", visible: true },
    { id: "visible-2", visible: true },
  ];
  const paged = createFetcher(hiddenFirstBatch);
  const visible = await collectVisibleRows({
    limit: 2,
    batchSize: 3,
    fetchBatch: paged.fetchBatch,
    isVisible: (row) => row.visible,
  });

  assert.deepEqual(
    visible.map((row) => row.id),
    ["visible-1", "visible-2"],
    "a full hidden first batch must not starve visible rows in the next batch",
  );
  assert.deepEqual(paged.requests, [
    { afterId: undefined, take: 3 },
    { afterId: "hidden-3", take: 3 },
  ]);

  const exhausted = createFetcher([
    { id: "hidden-1", visible: false },
    { id: "hidden-2", visible: false },
    { id: "hidden-3", visible: false },
    { id: "hidden-4", visible: false },
  ]);
  assert.deepEqual(
    await collectVisibleRows({
      limit: 2,
      batchSize: 2,
      fetchBatch: exhausted.fetchBatch,
      isVisible: (row) => row.visible,
    }),
    [],
    "collection must stop after consuming an all-hidden result set",
  );
  assert.equal(exhausted.requests.length, 3);

  for (const file of [
    "src/app/api/review/list/route.ts",
    "src/app/api/review/today/route.ts",
  ]) {
    assertCursorConsumer(file, "asc");
  }
  for (const file of [
    "src/app/api/mentor/mission/route.ts",
    "src/components/mission/EmergencyMissionPanel.tsx",
  ]) {
    assertCursorConsumer(file, "desc");
  }
  assertCursorConsumer("src/app/api/mission/route.ts", "desc", 2);

  console.log(
    "visible-pagination QA passed: hidden leading batches cannot starve later public rows.",
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
