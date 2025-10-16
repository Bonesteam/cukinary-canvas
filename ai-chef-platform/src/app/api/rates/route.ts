import { NextResponse } from "next/server";
import { getRates } from "@/backend/utils/currencyConverter";

export async function GET() {
  const rates = await getRates();
  return NextResponse.json(rates);
}
