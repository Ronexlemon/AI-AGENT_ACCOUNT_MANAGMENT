import { ChevronDown } from "lucide-react";

export default function DurationSelector() {
  return (
    <div>
      <label className="text-[#A1A5C3] text-sm">Duration of Model:</label>
      <div className="flex gap-2 mt-1">
        <input
          type="number"
          defaultValue="1"
          className="w-16 bg-[#131725] p-2 rounded-lg border border-[#5E6AD2] text-white text-center"
        />
        <button className="flex items-center justify-between px-3 py-2 bg-[#131725] border border-[#5E6AD2] rounded-lg text-white w-full">
          Minute
          <ChevronDown className="text-gray-400" size={18} />
        </button>
      </div>
    </div>
  );
}
