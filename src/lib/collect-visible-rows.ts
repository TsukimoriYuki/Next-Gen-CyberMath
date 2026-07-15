export type CursorBatchRequest = Readonly<{
  afterId: string | undefined;
  take: number;
}>;

type CollectVisibleRowsOptions<Row extends { id: string }> = Readonly<{
  limit: number;
  batchSize: number;
  fetchBatch: (request: CursorBatchRequest) => Promise<readonly Row[]>;
  isVisible: (row: Row) => boolean;
}>;

/**
 * Collects a bounded number of visible rows without loading the full table.
 * The caller must use `afterId` as a unique Prisma cursor, skip that cursor,
 * and include `id` as the final `orderBy` tie-breaker.
 */
export async function collectVisibleRows<Row extends { id: string }>({
  limit,
  batchSize,
  fetchBatch,
  isVisible,
}: CollectVisibleRowsOptions<Row>): Promise<Row[]> {
  if (!Number.isSafeInteger(limit) || limit < 0) {
    throw new RangeError("limit must be a non-negative safe integer");
  }
  if (!Number.isSafeInteger(batchSize) || batchSize < 1) {
    throw new RangeError("batchSize must be a positive safe integer");
  }
  if (limit === 0) return [];

  const visibleRows: Row[] = [];
  let afterId: string | undefined;

  while (visibleRows.length < limit) {
    const batch = await fetchBatch({ afterId, take: batchSize });

    for (const row of batch) {
      if (isVisible(row)) visibleRows.push(row);
      if (visibleRows.length === limit) break;
    }

    if (visibleRows.length === limit || batch.length < batchSize) break;

    const nextAfterId = batch[batch.length - 1]?.id;
    if (!nextAfterId || nextAfterId === afterId) {
      throw new Error("cursor batch did not advance");
    }
    afterId = nextAfterId;
  }

  return visibleRows;
}
