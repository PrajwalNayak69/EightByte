import { NextResponse } from "next/server";
import yahooFinance from "yahoo-finance2";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 20 });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbolsParam = searchParams.get("symbols");

  if (!symbolsParam) {
    return NextResponse.json({ error: "Missing ?symbols=" }, { status: 400 });
  }

  const symbols = symbolsParam.split(",").map((s) => s.trim());
  const results: any[] = [];

  for (const symbol of symbols) {
    const cached = cache.get(symbol);
    if (cached) {
      console.log(`Cache hit: ${symbol}`);
      results.push({ symbol, ...cached, fromCache: true });
      continue;
    }

    try {
      console.log(`Fetching fresh: ${symbol}`);
      const quote = await yahooFinance.quote(symbol);

      const cmp = quote?.regularMarketPrice ?? null;
      const currency = quote?.currency ?? "—";
      const lastUpdated = new Date().toISOString();

      const result = { cmp, currency, lastUpdated };
      cache.set(symbol, result); 
      results.push({ symbol, ...result, fromCache: false });
    } catch (err) {
      console.error(`Failed ${symbol}:`, err);
      results.push({ symbol, cmp: null, error: "fetch_failed" });
    }
  }

  return NextResponse.json({ data: results });
}
