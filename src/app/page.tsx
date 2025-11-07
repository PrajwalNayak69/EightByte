import PortfolioTable from "@/components/PortfolioTable";
import data from "@/data/portfolio.json";
import { StockRow } from "@/types/portfolio";

export default function Home() {
  const rows: StockRow[] = data.map((d) => ({
    ...d,
    cmp: d.purchasePrice, 
    presentValue: d.purchasePrice * d.qty,
    gainLoss: 0,
  }));

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
      <PortfolioTable rows={rows} />
    </main>
  );
}
