
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
      ? 'text-emerald-400'
      : count < 0
      ? 'text-rose-400'
      : 'text-white';

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-10 border border-gray-800">
        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-widest text-gray-400 uppercase">
          Teller
        </h1>

        {/* Count display */}
        <div
          className={`text-9xl font-bold tabular-nums transition-colors duration-300 ${countColor}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Minus */}
          <button
            onClick={decrement}
            aria-label="Verlagen"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-800 text-rose-400 hover:bg-rose-500 hover:text-white active:scale-95 transition-all duration-150 shadow-lg cursor-pointer"
          >
            <Minus size={28} strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            aria-label="Reset"
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white active:scale-95 transition-all duration-150 shadow cursor-pointer"
          >
            <RotateCcw size={20} strokeWidth={2} />
          </button>

          {/* Plus */}
          <button
            onClick={increment}
            aria-label="Verhogen"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-800 text-emerald-400 hover:bg-emerald-500 hover:text-white active:scale-95 transition-all duration-150 shadow-lg cursor-pointer"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Subtle hint */}
        <p className="text-xs text-gray-600 tracking-wide">
          + verhogen &nbsp;·&nbsp; − verlagen &nbsp;·&nbsp; ↺ reset
        </p>
      </div>
    </div>
  );
}
