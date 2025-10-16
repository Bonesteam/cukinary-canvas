import currency from "currency.js";

const GBP_TO_EUR_DEFAULT = 1.15;

export type Rates = { GBP: number; EUR: number };

export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/GBP", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const eur = data?.rates?.EUR;
      if (typeof eur === 'number' && eur > 0) return { GBP: 1, EUR: eur };
    }
  } catch {}
  try {
    const res = await fetch("https://api.exchangerate.host/latest?base=GBP&symbols=EUR", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const eur = data?.rates?.EUR;
      if (typeof eur === 'number' && eur > 0) return { GBP: 1, EUR: eur };
    }
  } catch {}
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
