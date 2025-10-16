export type TokenCostItem = { key: string; label: string; cost: number };

export function calculateTotalTokens(selected: Array<TokenCostItem | null | undefined>): number {
  return selected.reduce((sum, item) => sum + (item?.cost ?? 0), 0);
}
