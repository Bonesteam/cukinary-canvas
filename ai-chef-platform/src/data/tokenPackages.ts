export type TokenPackage = { id: string; name: string; tokens: number; priceGBP: number };

export const TOKEN_PACKAGES: TokenPackage[] = [
  { id: "starter", name: "Starter", tokens: 1000, priceGBP: 10 },
  { id: "professional", name: "Professional", tokens: 3000, priceGBP: 27 },
  { id: "premium", name: "Premium", tokens: 6000, priceGBP: 50 },
];
