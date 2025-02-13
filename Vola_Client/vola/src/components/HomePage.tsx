
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const [privateKey, setPrivateKey] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
  
    const isValidKey = (key: string): boolean => {
      return /^[a-fA-F0-9]{64}$/.test(key);
    };
  
    const handlePrivateKeySubmit = () => {
      if (isValidKey(privateKey)) {
        localStorage.setItem('authToken', privateKey);
        router.push('/dashboard');
      } else {
        setError('Private key must contain only hexadecimal characters (0-9, a-f)."');
      }
    };
  
    return (
        <main className="pt-32 pb-16 bg-[#000A22]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#4377FF] mb-6">
                Token Volatility AI Model
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                Advanced artificial intelligence model for predicting and analyzing token volatility patterns.
              </p>
            </div>
  
            <div className="max-w-xl mx-auto mb-16">
              <div className="flex flex-col gap-4">
                <div className="flex">
                <button
                    onClick={handlePrivateKeySubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 
                             rounded-md transition-colors whitespace-nowrap"
                  >
                    Enter
                  </button>
                  <input
                    type="text"
                    value={privateKey}
                    onChange={(e) => {
                      setPrivateKey(e.target.value);
                      setError('');
                    }}
                    placeholder="Input your private key here (try: 0x12345678)"
                    className="flex-1 bg-[#0A1929]/50 border border-blue-900/30 rounded-md px-4 py-3 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
               
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
                <p className="text-gray-400 text-sm mt-2">
                  For testing, use any key starting with 0x (e.g., 0x12345678)
                </p>
              </div>
            </div>
          </div>
        </main>
    );
}

export default HomePage