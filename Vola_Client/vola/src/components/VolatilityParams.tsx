import { ChevronDown, Settings2 } from "lucide-react";

export default function VolatilityParams() {
  return (
    <button className="flex items-center gap-2 text-trade-accent">
      <Settings2 size={18} />
      <span>Set volatility parameters</span>
      <ChevronDown size={18} />
    </button>
  );
}
