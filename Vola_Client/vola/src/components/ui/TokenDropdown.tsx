import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface TokenDropdownProps {
  iconSrc: string;
  tokenName: string;
  balance: string;
  options: { name: string; icon: string; balance: string }[];
}

export default function TokenDropdown({ iconSrc, tokenName, balance, options }: TokenDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({ name: tokenName, icon: iconSrc, balance });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative bg-[#1A1C2C] border border-[#5E6AD2] p-4 rounded-lg flex items-center justify-between">
      {/* Token Selection */}
      <div className="flex items-center space-x-2 cursor-pointer mr-3" onClick={() => setIsOpen(!isOpen)}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
          <img src={selectedToken.icon} alt={selectedToken.name} className="w-6 h-6 rounded-full" />
        </div>
        <span className="text-white font-medium">{selectedToken.name}</span>
        <ChevronDown className="w-5 h-5 text-white" />
      </div>

      {/* Balance */}
      <div className="text-right">
        <p className="text-gray-400 text-sm ml-3"> Bal: {selectedToken.balance}</p>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-[#1A1C2C] border border-[#5E6AD2] rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.name}
              className="flex items-center px-4 py-2 text-white hover:bg-[#5E6AD2] cursor-pointer space-x-2"
              onClick={() => {
                setSelectedToken(option);
                setIsOpen(false);
              }}
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
                <img src={option.icon} alt={option.name} className="w-5 h-5 rounded-full" />
              </div>
              <span>{option.name}</span>
              <span className="ml-auto text-sm text-gray-400 ml-3"> Bal: {option.balance}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
