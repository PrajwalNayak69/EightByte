import { StockRow } from "@/types/portfolio";

export default function PortfolioTable({ rows }: { rows: StockRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Exchange</th>
            <th className="p-2 border">Purchase Price</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Investment</th>
            <th className="p-2 border">CMP</th>
            <th className="p-2 border">Present Value</th>
            <th className="p-2 border">Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.symbol}>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.exchange}</td>
              <td className="p-2 border">{r.purchasePrice}</td>
              <td className="p-2 border">{r.qty}</td>
              <td className="p-2 border">{r.investment}</td>
              <td className="p-2 border">{r.cmp ?? "-"}</td>
              <td className="p-2 border">{r.presentValue ?? "-"}</td>
              <td
                className={`p-2 border ${
                  r.gainLoss && r.gainLoss > 0
                    ? "text-green-600"
                    : r.gainLoss && r.gainLoss < 0
                    ? "text-red-600"
                    : ""
                }`}
              >
                {r.gainLoss ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
