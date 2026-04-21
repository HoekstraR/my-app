
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
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-10 flex flex-col items-center gap-8 w-80">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teller</h1>

        {/* Count display */}
        <div className="flex items-center justify-center w-36 h-36 rounded-full bg-blue-50 border-4 border-blue-200">
          <span className="text-6xl font-extrabold text-blue-600 tabular-nums">
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Decrement */}
          <button
            onClick={decrement}
            disabled={count === 0}
            aria-label="Verlaag teller"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600 hover:bg-red-200 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <Minus className="w-6 h-6" />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            disabled={count === 0}
            aria-label="Reset teller"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Increment */}
          <button
            onClick={increment}
            aria-label="Verhoog teller"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all shadow-md"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Floor hint */}
        {count === 0 && (
          <p className="text-xs text-slate-400 -mt-4">Minimum bereikt</p>
        )}
      </div>
    </div>
  );
}
