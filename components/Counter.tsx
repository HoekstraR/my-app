
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Teller</h1>

        <div className="text-8xl font-bold text-black tabular-nums w-48 text-center">
          {count}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-14 h-14 rounded-full bg-white text-black text-2xl font-medium border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Verminder met 1"
          >
            −
          </button>

          <button
            onClick={() => setCount(0)}
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Reset teller"
          >
            Reset
          </button>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-14 h-14 rounded-full bg-white text-black text-2xl font-medium border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all"
            aria-label="Verhoog met 1"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
