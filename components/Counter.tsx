
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  const countColor =
    count > 0 ? 'text-green-600' : count < 0 ? 'text-red-600' : 'text-gray-800';

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Teller
        </h1>

        {/* Count display */}
        <div className="w-48 h-48 rounded-full border-4 border-gray-200 flex items-center justify-center shadow-inner">
          <span className={`text-6xl font-bold tabular-nums transition-colors duration-200 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* +/- Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            className="w-16 h-16 rounded-full bg-white text-black text-3xl font-bold border border-gray-300 shadow hover:bg-gray-100 active:scale-95 transition-all duration-100"
            aria-label="Verlagen"
          >
            −
          </button>

          <button
            onClick={increment}
            className="w-16 h-16 rounded-full bg-black text-white text-3xl font-bold border border-black shadow hover:bg-gray-800 active:scale-95 transition-all duration-100"
            aria-label="Verhogen"
          >
            +
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          className="px-6 py-2 rounded-full bg-white text-black border border-gray-300 text-sm font-medium hover:bg-gray-100 active:scale-95 transition-all duration-100"
          aria-label="Resetten"
        >
          Reset
        </button>
      </div>
    </main>
  );
}
