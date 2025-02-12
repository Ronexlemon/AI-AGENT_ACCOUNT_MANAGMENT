import CurrentPositions from "../../components/CurrentPositions";
import PreviousOrders from "../../components/PreviousOrders";
import TokenSelection from "../../components/TokenSelection";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-dark p-6">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-bold text-white">VolaAI</h1> 
        <div className="px-4 py-2 bg-trade-accent rounded-lg">
          <span className="font-mono text-white">0x4s...545</span> 
        </div>
      </header>

      <main className="max-w-7xl mx-auto space-y-12">
        <section>
          <h2 className="text-4xl font-bold mb-8 text-white">
            Token Volatility AI Model
          </h2> 

          <div className="grid lg:grid-cols-2 gap-8">
            <TokenSelection />
            <CurrentPositions />
          </div>
        </section>

        <PreviousOrders />
      </main>
    </div>
  );
}
