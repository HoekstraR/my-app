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
            className="w-14 h-14 rounded-full bg-white text-black border border-gray-300 text-2xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verminder teller"
          >
            −
          </button>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-14 h-14 rounded-full bg-black text-white text-2xl font-medium hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verhoog teller"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="text-sm text-gray-500 hover:text-black transition-colors underline underline-offset-2 focus:outline-none"
          aria-label="Reset teller naar nul"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
