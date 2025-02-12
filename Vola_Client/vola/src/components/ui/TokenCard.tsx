import { ChevronDown } from "lucide-react";
import BalanceDisplay from "./BalanceDisplay";

interface TokenCardProps {
  iconSrc: string;
  bgColor: string;
  tokenName: string;
  price: string;
  balance: string;
}

export default function TokenCard({
  iconSrc,
  bgColor,
  tokenName,
  price,
  balance,
}: TokenCardProps) {
  return (
    <div className="bg-[#131725] p-4 rounded-lg border border-[#5E6AD2]">
      <div className="flex items-center space-x-2">
        {/* Token Icon */}
        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${bgColor}`}>
          <img src={iconSrc} alt={tokenName} className="w-6 h-6" />
        </div>

        {/* Token Name & Price */}
        <div className="flex-1 flex items-center justify-between">
          <span className="text-white text-sm">{tokenName}</span>
          <span className="text-2xl font-bold text-white">{price}</span>
        </div>

        {/* Dropdown Icon */}
        <ChevronDown className="text-gray-400" size={18} />
      </div>

      {/* Balance and Action Buttons */}
      <BalanceDisplay balance={balance} />
    </div>
  );
}
