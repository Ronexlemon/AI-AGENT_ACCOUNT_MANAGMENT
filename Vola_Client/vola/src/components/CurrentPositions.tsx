"use client"
import { ChevronDown, ChevronRight } from "lucide-react";
import { getLatestPrediction, PredictionData } from "@/constant/api";
import { useEffect, useState } from "react";
import { ApiResponse } from "@/constant/api";

export default function CurrentPositions() {
  const [predictions, setPredictions] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let isMounted = true;

    const fetchPredictions = async () => {
      try {
        const response = await getLatestPrediction();
        console.log("response", response);
        if (isMounted) {
          setPredictions(response.data);
          setLoading(false);
        }
      } catch (error: any) {
        if (isMounted) {
          setError(error);
        }
      }
    };

    fetchPredictions(); // Initial call

    // Set up interval for polling
    const interval = setInterval(() => {
      fetchPredictions();
    }, 10000); // Fetch every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(interval); // Cleanup interval on unmount
    };
  }, []);
  
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-lg font-semibold">Current model positions</h3>
        <button className="text-[#A1A5C3] text-sm hover:text-white border border-[#5E6AD2] p-1 rounded-lg transition-colors">View more</button>
      </div>

      {/* {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-lg p-4 space-y-2 shadow-md"
        > */}
          {/* Token Pair Row */}
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"> */}
              {/* Token Icons */}
              {/* <div className="relative flex items-center">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#627EEA]">
                  <img src="./assets/svg/eth-icon.svg" alt="ETH" className="w-4 h-4" />
                </div>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F3BA2F] -ml-3">
                  <img src="./assets/svg/dai-icon.svg" alt="DAI" className="w-4 h-4" />
                </div>
              </div> */}
              {/* Token Pair Name */}
              {/* <span className="text-white text-sm font-medium">wETH/DAI</span>
            </div> */}
            {/* Volatility Params */}
            {/* <span className="text-[#A1A5C3] text-sm">VP: -5%/10hrs</span> */}
            {/* Expand/Collapse Icon */}
            {/* {i === 1 ? (
              <ChevronDown className="text-[#A1A5C3]" size={18} />
            ) : (
              <ChevronRight className="text-[#A1A5C3]" size={18} />
            )} */}
          {/* </div> */}

          {/* Expanded Balance Section (Only First Item) */}
          {/* {i === 1 && (
            <div className="mt-4">
              <p className="text-[#A1A5C3] text-xs mb-2">Current position balance</p>
              <div className="grid grid-cols-2 gap-4"> */}
                {/* wETH Balance */}
                {/* <div className="flex items-center justify-between bg-[#131725] p-3 rounded-md border border-[#5E6AD2]">
                  <span className="text-white text-xl font-bold">29.36</span>
                  <div className="flex items-center gap-1">
                    <img src="./assets/svg/eth-icon.svg" alt="ETH" className="w-4 h-4" />
                    <span className="text-sm text-white">wETH</span>
                  </div>
                </div> */}
                {/* DAI Balance */}
                {/* <div className="flex items-center justify-between bg-[#131725] p-3 rounded-md border border-[#5E6AD2]">
                  <span className="text-white text-xl font-bold">29.36</span>
                  <div className="flex items-center gap-1">
                    <img src="./assets/svg/dai-icon.svg" alt="DAI" className="w-4 h-4" />
                    <span className="text-sm text-white">DAI</span>
                  </div>
                </div>
              </div>
            </div> */}
          {/* )} */}
        {/* </div> */}
      {/* ))} */}
      {predictions && (
        <div className="bg-[#0D0F1A] border border-[#5E6AD2] rounded-lg p-4 space-y-2 shadow-md">
          {/* Token Pair Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Token Icons */}
              <div className="relative flex items-center">
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#627EEA]">
                  <img src="./assets/svg/eth-icon.svg" alt="ETH" className="w-4 h-4" />
                  
                </div>
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F3BA2F] -ml-3">
                  <img src="./assets/svg/dai-icon.svg" alt="DAI" className="w-4 h-4" />
                </div>
              </div>
              {/* Token Pair Name */}
              <span className="text-white text-sm font-medium">{predictions?.token_pair}</span>
            </div>
            {/* Predicted Price */}
            <span className="text-[#A1A5C3] text-sm">
            VP: {predictions?.predicted_price?.toFixed(16)} %
            </span>
            {/* Expand/Collapse Icon */}
            <ChevronDown className="text-[#A1A5C3]" size={18} />
          </div>

          {/* Expanded Balance Section */}
          <div className="mt-4">
            <p className="text-[#A1A5C3] text-xs mb-2">Current position balance</p>
            <div className="grid grid-cols-2 gap-4">
              {/* Token A Balance */}
              <div className="flex items-center justify-between bg-[#131725] p-3 rounded-md border border-[#5E6AD2]">
                <span className="text-white text-xl font-bold">
                  {Number(predictions?.user_balance_TokenB)?.toFixed(8)}
                </span>
                <div className="flex items-center gap-1">
                  <img src="./assets/svg/eth-icon.svg" alt="ETH" className="w-4 h-4" />
                  <span className="text-sm text-white">wETH</span>
                </div>
              </div>
              {/* Token B Balance */}
              <div className="flex items-center justify-between bg-[#131725] p-3 rounded-md border border-[#5E6AD2]">
                <span className="text-white text-xl font-bold">
                  {Number(predictions?.user_balance_TokenA)?.toFixed(4)}
                </span>
                <div className="flex items-center gap-1">
                  <img src="./assets/svg/dai-icon.svg" alt="DAI" className="w-4 h-4" />
                  <span className="text-sm text-white">DAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
