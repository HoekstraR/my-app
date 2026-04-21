
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-black tracking-tight">Teller</h1>

      <div className="text-8xl font-bold text-black tabular-nums w-48 text-center">
        {count}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="w-14 h-14 rounded-full bg-gray-100 text-black text-2xl font-bold hover:bg-gray-200 active:scale-95 transition-all"
          aria-label="Verlagen"
        >
          −
        </button>

        <button
          onClick={() => setCount(0)}
          className="px-5 py-2 rounded-full border border-gray-300 bg-white text-black text-sm font-medium hover:bg-gray-50 active:scale-95 transition-all"
          aria-label="Reset"
        >
          Reset
        </button>

        <button
          onClick={() => setCount((c) => c + 1)}
          className="w-14 h-14 rounded-full bg-black text-white text-2xl font-bold hover:bg-gray-800 active:scale-95 transition-all"
          aria-label="Verhogen"
        >
          +
        </button>
      </div>
    </div>
  );
}
