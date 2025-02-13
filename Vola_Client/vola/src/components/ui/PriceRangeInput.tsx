interface AmountToswap{
  amount:number;
  setAmount:(value:number)=>void
}
export default function PriceRangeInput({amount,setAmount}:AmountToswap) {
    return (
      <div>
        <label className="text-[#A1A5C3] text-sm">Price range:</label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            placeholder="Amount to swap"
            //onchange
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-[#131725] p-2 rounded-lg border border-[#5E6AD2] text-white text-sm text-center"
          />
          {/* <input
            type="text"
            placeholder="Max. Price"
            className="w-full bg-[#131725] p-2 rounded-lg border border-[#5E6AD2] text-white text-sm text-center"
          /> */}
        </div>
      </div>
    );
  }
  