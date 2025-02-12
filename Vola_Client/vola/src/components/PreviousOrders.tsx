import { Clipboard } from "lucide-react";

export default function PreviousOrders() {
  return (
    <section className="mt-6">
      <h3 className="text-white text-lg font-semibold mb-4">Previous orders</h3>
      <div className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-lg overflow-x-auto">
        <table className="w-full text-white">
          {/* Table Head */}
          <thead>
            <tr className="text-[#A1A5C3] text-sm bg-[#131725]">
              <th className="p-3 text-left">ORDER ID</th>
              <th className="p-3 text-left">STATUS</th>
              <th className="p-3 text-left">TYPE</th>
              <th className="p-3 text-left">SELL AMOUNT</th>
              <th className="p-3 text-left">BUY AMOUNT</th>
              <th className="p-3 text-left">LIMIT PRICE</th>
              <th className="p-3 text-left">SURPLUS</th>
              <th className="p-3 text-left">TIME STAMP</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="border-b border-[#5E6AD2] text-sm">
                {/* Order ID with Copy Icon */}
                <td className="p-3 flex items-center gap-2 text-[#A1A5C3]">
                  0x1c70c22b5...
                  <Clipboard size={14} className="cursor-pointer text-[#A1A5C3] hover:text-white" />
                </td>

                {/* Status Badge */}
                <td className="p-3">
                  <span className="flex items-center gap-2 bg-green-900 text-green-400 px-3 py-1 rounded-md text-xs font-semibold">
                    🛡 FILLED
                  </span>
                </td>

                {/* Sell Type */}
                <td className="p-3 text-red-500 font-medium">Sell</td>

                {/* Sell Amount */}
                <td className="p-3">560.57 DIA</td>

                {/* Buy Amount */}
                <td className="p-3">0.01 WETH</td>

                {/* Limit Price */}
                <td className="p-3">0.01667301 WETH</td>

                {/* Surplus */}
                <td className="p-3 text-green-400 font-medium">
                  94.63% <span className="text-white">10.5788 DAI</span>
                </td>

                {/* Timestamp */}
                <td className="p-3 text-[#A1A5C3]">10/02/2025 - 12:40PM</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
