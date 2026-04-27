
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
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 flex flex-col items-center gap-8 w-full max-w-sm">

        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Teller</h1>

        {/* Count display */}
        <div
          className={`text-8xl font-extrabold tabular-nums transition-colors duration-200 ${
            count === 0 ? 'text-slate-300' : 'text-blue-600'
          }`}
        >
          {count}
        </div>

        {/* Increment / Decrement buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            disabled={count === 0}
            aria-label="Verlaag teller"
            className="w-14 h-14 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={increment}
            aria-label="Verhoog teller"
            className="w-14 h-14 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition-all duration-150 shadow-md"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={reset}
          disabled={count === 0}
          aria-label="Reset teller"
          className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
