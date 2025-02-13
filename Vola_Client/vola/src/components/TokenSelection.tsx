"use client";
import { useState } from "react";
import TokenDropdown from "./ui/TokenDropdown";
import PriceRangeInput from "./ui/PriceRangeInput";
import DurationSelector from "./ui/DurationSelector";
import VolatilityParams from "./VolatilityParams";
; 
import { addTransaction } from "@/constant/api";

import { get_Token_User_Balance } from "@/contract/contract";


 



export default function TokenSelection() {
  const [volatility, setVolatility] = useState<number>(5); // Default volatility %
  const [duration,setDuration] = useState<number>(0)
  const [wethAmount, setWethAmount] = useState("");
  const [daiAmount, setDaiAmount] = useState("");
  const [amount,setAmount]= useState<number>(0)
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
      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
      }
      if (!duration || duration <= 0) {
        alert("Please enter a valid duration.");
        return;
      }
      if (!volatility || volatility <= 0) {
        alert("Please enter a valid volatility percentage.");
        return;
      }
    const response = await addTransaction(privateKey,amount,Weth,DaiToken,duration,volatility)
    console.log(response);
    // alert(`${privateKey},${duration},${volatility},${DaiToken}, ${Weth}`)
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
        {/* wETH, CELO, ETH Dropdown & Input */}
        <div className="flex flex-col items-center space-y-2">
          <TokenDropdown
            iconSrc="./assets/svg/eth-icon.svg"
            tokenName="wETH"
            balance="678.5"
            options={[
              { name: "ETH", icon: "./assets/svg/eth-icon.svg", balance: "900.5",tokenAddress :"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" },
              { name: "wETH", icon: "./assets/svg/eth-icon.svg", balance: "500.2" ,tokenAddress :"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"},
              { name: "CELO", icon: "./assets/svg/celo-icon.svg", balance: "300.8" ,tokenAddress: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14"},
            ]}
          />
          {/* <input
            type="number"
            value={wethAmount}
            onChange={(e) => setWethAmount(e.target.value)}
            className="w-32 bg-transparent border border-[#5E6AD2] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#A1A5C3]"
            placeholder="0.00"
          /> */}
        </div>

        {/* Stable Tokens (DAI, USDT, USDC, cUSD, cEUR, eXOF) */}
        <div className="flex flex-col items-center space-y-2">
          <TokenDropdown
            iconSrc="./assets/svg/dai-icon.svg"
            tokenName="DAI"
            balance="678.5"
            options={[
              { name: "DAI", icon: "./assets/svg/dai-icon.svg", balance: "678.5" ,tokenAddress:"0xB4F1737Af37711e9A5890D9510c9bB60e170CB0D" },
              { name: "USDT", icon: "./assets/svg/usdt-icon.svg", balance: "800.0", tokenAddress:"0x58eb19ef91e8a6327fed391b51ae1887b833cc91"  },
              { name: "USDC", icon: "./assets/svg/usdc-icon.svg", balance: "1200.5",tokenAddress:"0xbe72E441BF55620febc26715db68d3494213D8Cb"  },
              { name: "cUSD", icon: "./assets/svg/cusd-icon.svg", balance: "450.7",tokenAddress:"0xbe72E441BF55620febc26715db68d3494213D8Cb"  },
              { name: "cEUR", icon: "./assets/svg/ceur-icon.svg", balance: "230.6",tokenAddress:"0xbe72E441BF55620febc26715db68d3494213D8Cb"  },
              { name: "eXOF", icon: "./assets/svg/exof-icon.svg", balance: "540.9",tokenAddress:"0xbe72E441BF55620febc26715db68d3494213D8Cb"  },
            ]}
          />
          {/* <input
            type="number"
            value={daiAmount}
            onChange={(e) => setDaiAmount(e.target.value)}
            className="w-32 bg-transparent border border-[#5E6AD2] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#A1A5C3]"
            placeholder="0.00"
          /> */}
        </div>
      </div>

      {/* Price Range & Duration */}
      <div className="grid grid-cols-2 gap-4">
        <PriceRangeInput amount={amount}  setAmount={setAmount} />
        <DurationSelector duration={duration} setDuration={setDuration} />
      </div>

      {/* Start Button */}
      <button  onClick={handleAddTransaction} className="w-full py-3 text-white bg-[#5E6AD2] rounded-lg text-lg font-medium hover:bg-[#4A57C0] transition">
        START
      </button>
    </div>
  );
}
