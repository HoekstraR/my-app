
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function HomePage() {
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
    <main className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">

        {/* Title */}
        <h1 className="text-slate-400 text-sm font-semibold tracking-[0.2em] uppercase">
          Teller
        </h1>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-slate-800 shadow-[0_0_60px_-10px_rgba(99,102,241,0.4)] ring-1 ring-slate-700">
          <span className={`text-8xl font-black tabular-nums transition-colors duration-300 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Decrement */}
          <button
            onClick={decrement}
            aria-label="Verlagen"
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 ring-1 ring-slate-700 hover:bg-rose-500 hover:text-white hover:ring-rose-400 active:scale-95 transition-all duration-150 shadow-lg"
          >
            <Minus size={22} strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            aria-label="Reset"
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 text-slate-500 ring-1 ring-slate-700 hover:bg-slate-700 hover:text-slate-300 active:scale-95 transition-all duration-150 shadow-md"
          >
            <RotateCcw size={16} strokeWidth={2.5} />
          </button>

          {/* Increment */}
          <button
            onClick={increment}
            aria-label="Verhogen"
            className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 text-slate-300 ring-1 ring-slate-700 hover:bg-emerald-500 hover:text-white hover:ring-emerald-400 active:scale-95 transition-all duration-150 shadow-lg"
          >
            <Plus size={22} strokeWidth={2.5} />
          </button>
        </div>

        {/* Subtle step hint */}
        <p className="text-slate-600 text-xs tracking-wide">
          − &nbsp; reset &nbsp; +
        </p>
      </div>
    </main>
  );
}
