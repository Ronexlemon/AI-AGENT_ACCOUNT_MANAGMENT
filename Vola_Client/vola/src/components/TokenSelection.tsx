"use client";
import { useState } from "react";
import TokenDropdown from "./ui/TokenDropdown";
import PriceRangeInput from "./ui/PriceRangeInput";
import DurationSelector from "./ui/DurationSelector";
import VolatilityParams from "./VolatilityParams";

export default function TokenSelection() {
  const [wethAmount, setWethAmount] = useState("");
  const [daiAmount, setDaiAmount] = useState("");

  return (
    <div className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-xl p-6 space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[#A1A5C3] text-sm">
          Select a stable token and a utility token
        </span>
        <VolatilityParams />
      </div>

      {/* Token Selection */}
      <div className="grid grid-cols-2 gap-4">
        {/* wETH, CELO, ETH Dropdown & Input */}
        <div className="flex flex-col items-center space-y-2">
          <TokenDropdown
            iconSrc="./assets/svg/eth-icon.svg"
            tokenName="wETH"
            balance="678.5"
            options={[
              { name: "ETH", icon: "./assets/svg/eth-icon.svg", balance: "900.5" },
              { name: "wETH", icon: "./assets/svg/eth-icon.svg", balance: "500.2" },
              { name: "CELO", icon: "./assets/svg/celo-icon.svg", balance: "300.8" },
            ]}
          />
          <input
            type="number"
            value={wethAmount}
            onChange={(e) => setWethAmount(e.target.value)}
            className="w-32 bg-transparent border border-[#5E6AD2] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#A1A5C3]"
            placeholder="0.00"
          />
        </div>

        {/* Stable Tokens (DAI, USDT, USDC, cUSD, cEUR, eXOF) */}
        <div className="flex flex-col items-center space-y-2">
          <TokenDropdown
            iconSrc="./assets/svg/dai-icon.svg"
            tokenName="DAI"
            balance="678.5"
            options={[
              { name: "DAI", icon: "./assets/svg/dai-icon.svg", balance: "678.5" },
              { name: "USDT", icon: "./assets/svg/usdt-icon.svg", balance: "800.0" },
              { name: "USDC", icon: "./assets/svg/usdc-icon.svg", balance: "1200.5" },
              { name: "cUSD", icon: "./assets/svg/cusd-icon.svg", balance: "450.7" },
              { name: "cEUR", icon: "./assets/svg/ceur-icon.svg", balance: "230.6" },
              { name: "eXOF", icon: "./assets/svg/exof-icon.svg", balance: "540.9" },
            ]}
          />
          <input
            type="number"
            value={daiAmount}
            onChange={(e) => setDaiAmount(e.target.value)}
            className="w-32 bg-transparent border border-[#5E6AD2] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#A1A5C3]"
            placeholder="0.00"
          />
        </div>
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
