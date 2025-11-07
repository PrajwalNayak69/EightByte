import { StockRow } from "@/types/portfolio";

export default function PortfolioTable({ rows }: { rows: StockRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-700">
      <table className="min-w-full text-sm text-gray-100">
        <thead className="bg-gray-800 uppercase text-xs text-gray-300">
          <tr>
            <th className="p-3 border-b border-gray-700 text-left">Stock</th>
            <th className="p-3 border-b border-gray-700 text-left">Exchange</th>
            <th className="p-3 border-b border-gray-700 text-left">Purchase Price</th>
            <th className="p-3 border-b border-gray-700 text-left">Qty</th>
            <th className="p-3 border-b border-gray-700 text-left">Investment</th>
            <th className="p-3 border-b border-gray-700 text-left">CMP</th>
            <th className="p-3 border-b border-gray-700 text-left">Present Value</th>
            <th className="p-3 border-b border-gray-700 text-left">Gain/Loss</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-800">
          {rows.map((r) => {
            const isGain = (r.gainLoss ?? 0) > 0;
            const isLoss = (r.gainLoss ?? 0) < 0;
            return (
              <tr
                key={r.symbol}
                className="hover:bg-gray-900 transition-colors duration-150"
              >
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.exchange}</td>
                <td className="p-3">₹{r.purchasePrice}</td>
                <td className="p-3">{r.qty}</td>
                <td className="p-3">₹{r.investment.toLocaleString()}</td>
                <td className="p-3">{r.cmp ? `₹${r.cmp}` : "-"}</td>
                <td className="p-3">
                  {r.presentValue ? `₹${r.presentValue.toLocaleString()}` : "-"}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    isGain
                      ? "text-green-400"
                      : isLoss
                      ? "text-red-400"
                      : "text-gray-300"
                  }`}
                >
                  {r.gainLoss ? `₹${r.gainLoss.toFixed(2)}` : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
