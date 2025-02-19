"use client";
import { useState } from "react";
import { ChevronDown, Settings2 } from "lucide-react";

interface Volatility{
  volatility:number,
  setVolatility:(value:number)=>void
 

}

export default function VolatilityParams({volatility,setVolatility}:Volatility) {
  
  const [isOpen, setIsOpen] = useState(false); // Track dropdown state

  const handleConfirm = () => {
    setIsOpen(false); // Hide input field
  };

  return (
    <div className="relative inline-block">
      {/* Button to open the volatility settings */}
      <button
        className="flex items-center gap-2 text-trade-accent"
        onClick={() => setIsOpen(true)}
      >
        <Settings2 size={18} />
        <span>Volatility: {volatility}%</span>
        <ChevronDown size={18} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)} // Clicking outside closes the modal
        ></div>
      )}

      {/* Input for setting volatility percentage */}
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-[#0D0F1A] p-3 rounded-lg border border-[#5E6AD2] shadow-lg flex items-center gap-2 z-50">
          <input
            type="number"
            value={volatility}
            onChange={(e) => setVolatility(Number(e.target.value))}
            className="w-20 bg-[#131725] p-2 rounded-lg border border-[#5E6AD2] text-white text-center outline-none"
            min="1"
            max="100"
          />
          <button
            onClick={handleConfirm}
            className="bg-[#5E6AD2] text-white px-3 py-1 rounded-md text-sm hover:bg-[#4A57C0] transition"
          >
            Enter
          </button>
        </div>
      )}
    </div>
  );
}
