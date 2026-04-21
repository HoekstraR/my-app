
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8">
      <h1 className="text-3xl font-bold text-black tracking-tight">Teller</h1>

      <div className="flex items-center justify-center w-40 h-40 rounded-full border-4 border-gray-300">
        <span className="text-6xl font-bold text-black">{count}</span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="bg-white text-black border border-gray-300 rounded-lg px-6 py-3 text-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          −
        </button>
        <button
          onClick={() => setCount(0)}
          className="bg-white text-black border border-gray-300 rounded-lg px-6 py-3 text-sm font-semibold hover:bg-gray-100 transition-colors"
        >
          Reset
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-white text-black border border-gray-300 rounded-lg px-6 py-3 text-xl font-semibold hover:bg-gray-100 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
