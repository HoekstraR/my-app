
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  const countColor =
    count > 0
      ? 'text-emerald-500'
      : count < 0
      ? 'text-rose-500'
      : 'text-slate-700';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 w-full max-w-sm flex flex-col items-center gap-8">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teller</h1>

        {/* Count display */}
        <div className="flex items-center justify-center w-40 h-40 rounded-full bg-slate-50 border-4 border-slate-200 shadow-inner">
          <span className={`text-6xl font-extrabold tabular-nums transition-colors duration-200 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* +/- buttons */}
        <div className="flex gap-4">
          <button
            onClick={decrement}
            aria-label="Verlaag teller"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-200 hover:bg-rose-100 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <Minus className="w-7 h-7 stroke-[2.5]" />
          </button>

          <button
            onClick={increment}
            aria-label="Verhoog teller"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <Plus className="w-7 h-7 stroke-[2.5]" />
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={reset}
          aria-label="Reset teller"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-700 active:scale-95 transition-all duration-150 text-sm font-medium shadow-sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
