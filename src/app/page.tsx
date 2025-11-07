"use client";

import { useEffect, useState } from "react";
import PortfolioTable from "@/components/PortfolioTable";
import data from "@/data/portfolio.json";
import { StockRow } from "@/types/portfolio";

export default function Home() {
  const [rows, setRows] = useState<StockRow[]>([]);

  useEffect(() => {
    const initial = data.map((d: unknown) => ({
      ...d,
      investment: d.purchasePrice * d.qty,
    }));
    setRows(initial);
  }, []);

  async function fetchCMP() {
    setRows((prevRows) => {
      const symbols = prevRows.map((r) => r.symbol).join(",");
      if (!symbols) return prevRows;

      fetch(`/api/quotes?symbols=${symbols}`)
        .then((res) => res.json())
        .then((json) => {
          return prevRows.map((r) => {
            const live = json.data.find((d: any) => d.symbol === r.symbol);
            const cmp = live?.cmp ?? r.cmp ?? 0;
            const presentValue = cmp * r.qty;
            const gainLoss = presentValue - r.investment;
            return { ...r, cmp, presentValue, gainLoss };
          });
        })
        .then(setRows)
        .catch((err) => console.error("Fetch failed:", err));

      return prevRows;
    });
  }

  useEffect(() => {
    fetchCMP();
    const id = setInterval(fetchCMP, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Live Portfolio Dashboard</h1>
      <PortfolioTable rows={rows} />
    </main>
  );
}
