
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 flex flex-col items-center gap-8 w-72">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-700 tracking-wide">Teller</h1>

        {/* Counter display */}
        <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
          <span className="text-5xl font-extrabold text-white tabular-nums">{count}</span>
        </div>

        {/* Increment / Decrement buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            disabled={count === 0}
            className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Verlagen"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={increment}
            className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200 transition-colors"
            aria-label="Verhogen"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={reset}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 text-sm font-medium transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
