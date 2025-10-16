import currency from "currency.js";

const GBP_TO_EUR_DEFAULT = 1.15;

export type Rates = { GBP: number; EUR: number };

export async function getRates(): Promise<Rates> {
  // Placeholder: in production fetch from a rates API
  return { GBP: 1, EUR: GBP_TO_EUR_DEFAULT };
}

export async function gbpToTokens(amountGbp: number): Promise<number> {
  return Math.round(currency(amountGbp).multiply(100).value);
}

export async function eurToTokens(amountEur: number): Promise<number> {
  const rates = await getRates();
  const gbp = currency(amountEur).divide(rates.EUR).value; // EUR -> GBP
  return Math.round(currency(gbp).multiply(100).value);
}
