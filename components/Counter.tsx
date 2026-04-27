'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-black tracking-tight">Teller</h1>

        {/* Count display */}
        <div
          className={`text-8xl font-extrabold tabular-nums transition-colors duration-200 ${
            count > 0
              ? 'text-black'
              : count < 0
              ? 'text-gray-700'
              : 'text-gray-700'
          }`}
        >
          {count}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            className="w-16 h-16 rounded-full bg-white text-black text-3xl font-bold border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verlaag teller"
          >
            −
          </button>

          <button
            onClick={increment}
            className="w-16 h-16 rounded-full bg-black text-white text-3xl font-bold hover:bg-gray-800 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verhoog teller"
          >
            +
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          className="text-sm text-gray-700 underline underline-offset-4 hover:text-black transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-black rounded"
          aria-label="Reset teller naar nul"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
