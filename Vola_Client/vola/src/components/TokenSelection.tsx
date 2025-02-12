import { Settings2 } from "lucide-react";
import TokenCard from "./ui/TokenCard";
import PriceRangeInput from "./ui/PriceRangeInput";
import DurationSelector from "./ui/DurationSelector";

export default function TokenSelection() {
  return (
    <div className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-xl p-6 space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[#A1A5C3] text-sm">
          Select a stable token and a utility token
        </span>
        <div className="flex items-center space-x-2 text-[#5E6AD2] cursor-pointer">
          <Settings2 size={16} />
          <span className="text-sm">Set volatility parameters</span>
        </div>
      </div>

      {/* Token Selection */}
      <div className="grid grid-cols-2 gap-4">
        <TokenCard
          iconSrc="./assets/svg/eth-icon.svg"
          bgColor="bg-[#627EEA]"
          tokenName="wETH"
          price="8775.72"
          balance="678.5"
        />
        <TokenCard
          iconSrc="./assets/svg/dai-icon.svg"
          bgColor="bg-[#F3BA2F]"
          tokenName="DAI"
          price="2015.2"
          balance="678.5"
        />
      </div>

      {/* Price Range & Duration */}
      <div className="grid grid-cols-2 gap-4">
        <PriceRangeInput />
        <DurationSelector />
      </div>

      {/* Start Button */}
      <button className="w-full py-3 text-white bg-[#5E6AD2] rounded-lg text-lg font-medium hover:bg-[#4A57C0] transition">
        START
      </button>
    </div>
  );
}
