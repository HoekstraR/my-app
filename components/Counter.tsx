
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">Teller</h1>

        <div className="text-8xl font-bold text-black tabular-nums w-40 text-center">
          {count}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="w-14 h-14 rounded-full bg-white text-black border border-gray-300 text-2xl font-medium hover:bg-gray-100 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verminderen"
          >
            −
          </button>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-14 h-14 rounded-full bg-black text-white text-2xl font-medium hover:bg-gray-800 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Verhogen"
          >
            +
          </button>
        </div>

        <button
          onClick={() => setCount(0)}
          className="text-sm text-gray-500 hover:text-black underline underline-offset-4 transition-colors focus:outline-none"
          aria-label="Reset teller"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
