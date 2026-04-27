'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-black tracking-tight">Teller</h1>

        {/* Count display */}
        <div className="w-48 h-48 rounded-full border-4 border-gray-300 flex items-center justify-center">
          <span
            className={`text-6xl font-bold tabular-nums transition-colors duration-200 ${
              count > 0 ? 'text-black' : count < 0 ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-14 h-14 rounded-full bg-white text-black border-2 border-gray-300 text-2xl font-bold hover:bg-gray-100 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verlaag teller"
          >
            −
          </button>

          <button
            onClick={() => setCount(0)}
            className="px-5 py-2 rounded-full bg-white text-black border-2 border-gray-300 text-sm font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Reset teller"
          >
            Reset
          </button>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-14 h-14 rounded-full bg-black text-white border-2 border-black text-2xl font-bold hover:bg-gray-800 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verhoog teller"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
