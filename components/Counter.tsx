
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-10">
      <h1 className="text-4xl font-bold text-black tracking-tight">Teller</h1>

      {/* Count display */}
      <div className="flex items-center justify-center w-48 h-48 rounded-full border-4 border-gray-300">
        <span
          className={`text-6xl font-bold tabular-nums transition-colors duration-200 ${
            count > 0 ? 'text-black' : count < 0 ? 'text-red-600' : 'text-gray-400'
          }`}
        >
          {count}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="w-14 h-14 rounded-full bg-white text-black text-3xl font-bold border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all duration-150 flex items-center justify-center"
          aria-label="Verlaag teller"
        >
          −
        </button>

        <button
          onClick={() => setCount(0)}
          className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium border border-gray-300 hover:bg-gray-100 active:scale-95 transition-all duration-150"
          aria-label="Reset teller"
        >
          Reset
        </button>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-14 h-14 rounded-full bg-black text-white text-3xl font-bold hover:bg-gray-800 active:scale-95 transition-all duration-150 flex items-center justify-center"
          aria-label="Verhoog teller"
        >
          +
        </button>
      </div>
    </div>
  );
}
