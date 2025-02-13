"use client"
import TokenCard from "./ui/TokenCard";
import PriceRangeInput from "./ui/PriceRangeInput";
import DurationSelector from "./ui/DurationSelector";
import VolatilityParams from "./VolatilityParams"; 
import { addTransaction } from "@/constant/api";
import { useState } from "react";
import { get_Token_User_Balance } from "@/contract/contract";

export default function TokenSelection() {
  const [volatility, setVolatility] = useState<number>(5); // Default volatility %
  const [duration,setDuration] = useState<number>(0)
  // required_fields = ["private_key", "amount", "buy_token", "sell_token","percentage"]
  const privateKey = localStorage.getItem("authToken");
  const handleAddTransaction =async( )=>{
    //check for private_key
    const DaiToken = "0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D"
    const Weth = "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"
    if(!privateKey){
      alert("Please Add the key");
      return;
      }
    //const response = await addTransaction(privateKey,amount,buy_token=Weth,sell_token=DaiToken,duration,volatility)
    //console.log(response);
    alert(`${privateKey},${duration},${volatility},${DaiToken}, ${Weth}`)
  }
  return (
    <div className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-xl p-6 space-y-6 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-[#A1A5C3] text-sm">
          Select a stable token and a utility token
        </span>
        <VolatilityParams volatility={volatility} setVolatility={setVolatility} /> 
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
        <DurationSelector duration={duration} setDuration={setDuration} />
      </div>

      {/* Start Button */}
      <button  onClick={handleAddTransaction} className="w-full py-3 text-white bg-[#5E6AD2] rounded-lg text-lg font-medium hover:bg-[#4A57C0] transition">
        START
      </button>
    </div>
  );
}
