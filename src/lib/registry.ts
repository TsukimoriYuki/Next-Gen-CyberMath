export function assertUniqueRegistryKeys<T>(
  items: readonly T[],
  keyOf: (item: T) => string,
  registryName: string,
): void {
  const seen = new Set<string>();
  for (const item of items) {
    const key = keyOf(item);
    if (seen.has(key)) {
      throw new Error(`${registryName} contains duplicate key: ${key}`);
    }
    seen.add(key);
  }
}

export function indexByUniqueRegistryKey<T>(
  items: readonly T[],
  keyOf: (item: T) => string,
  registryName: string,
): Record<string, T> {
  assertUniqueRegistryKeys(items, keyOf, registryName);
  return Object.fromEntries(items.map((item) => [keyOf(item), item]));
}
