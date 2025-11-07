"use client";
import { useEffect, useState, useMemo } from "react";
import PortfolioTable from "@/components/PortfolioTable";
import data from "@/data/portfolio.json";
import { StockRow } from "@/types/portfolio";

export default function Home() {
  const [rows, setRows] = useState<StockRow[]>([]);
  useEffect(() => {
    const initial = data.map((d: any) => ({
      ...d,
      investment: d.purchasePrice * d.qty,
    }));
    setRows(initial);
  }, []);

  async function fetchCMP() {
    const symbols = rows.map((r) => r.symbol).join(",");
    if (!symbols) return;

    try {
      const res = await fetch(`/api/quotes?symbols=${symbols}`);
      const json = await res.json();

      const updated = rows.map((r) => {
        const live = json.data.find((d: any) => d.symbol === r.symbol);
        const cmp = live?.cmp ?? r.cmp ?? 0;
        const presentValue = cmp * r.qty;
        const gainLoss = presentValue - r.investment;
        return { ...r, cmp, presentValue, gainLoss, lastUpdated: live?.lastUpdated };
      });
      setRows(updated);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }

  useEffect(() => {
    fetchCMP();
    const id = setInterval(fetchCMP, 15000);
    return () => clearInterval(id);
  }, []);

  const totalInvestment = useMemo(
    () => rows.reduce((sum, r) => sum + r.investment, 0),
    [rows]
  );
  const totalValue = useMemo(
    () => rows.reduce((sum, r) => sum + (r.presentValue ?? r.investment), 0),
    [rows]
  );

  const withPercent = useMemo(
    () =>
      rows.map((r) => ({
        ...r,
        portfolioPct: ((r.investment / totalInvestment) * 100).toFixed(2),
      })),
    [rows, totalInvestment]
  );

  const grouped = useMemo(() => {
    const sectors: Record<string, StockRow[]> = {};
    withPercent.forEach((r) => {
      sectors[r.sector] = sectors[r.sector] || [];
      sectors[r.sector].push(r);
    });
    return sectors;
  }, [withPercent]);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Live Portfolio Dashboard</h1>

      <p className="text-gray-600">
        Total Investment: ₹{totalInvestment.toLocaleString()} | Present Value: ₹
        {totalValue.toLocaleString()} | Net Gain/Loss:{" "}
        <span
          className={
            totalValue - totalInvestment >= 0 ? "text-green-600" : "text-red-600"
          }
        >
          ₹{(totalValue - totalInvestment).toFixed(2)}
        </span>
      </p>

      {Object.entries(grouped).map(([sector, stocks]) => {
        const sectorInvestment = stocks.reduce((s, r) => s + r.investment, 0);
        const sectorValue = stocks.reduce(
          (s, r) => s + (r.presentValue ?? r.investment),
          0
        );
        const gainLoss = sectorValue - sectorInvestment;

        return (
          <section key={sector}>
            <h2 className="text-xl font-semibold mb-2">{sector}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Total Investment: ₹{sectorInvestment.toLocaleString()} | Value: ₹
              {sectorValue.toLocaleString()} |{" "}
              <span
                className={gainLoss >= 0 ? "text-green-600" : "text-red-600"}
              >
                Gain/Loss: ₹{gainLoss.toFixed(2)}
              </span>
            </p>
            <PortfolioTable rows={stocks} />
          </section>
        );
      })}
    </main>
  );
}
