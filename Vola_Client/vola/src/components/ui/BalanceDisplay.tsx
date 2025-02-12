interface BalanceDisplayProps {
    balance: string;
  }
  
  export default function BalanceDisplay({ balance }: BalanceDisplayProps) {
    return (
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-[#A1A5C3]">Balance: {balance}</span>
        <div className="flex space-x-2">
          <button className="bg-[#1C1F2E] text-xs px-3 py-1 rounded-md text-white">HALF</button>
          <button className="bg-[#1C1F2E] text-xs px-3 py-1 rounded-md text-white">MAX</button>
        </div>
      </div>
    );
  }
  