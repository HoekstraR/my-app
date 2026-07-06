
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function HomePage() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  const countColor =
    count > 0 ? 'text-emerald-400' : count < 0 ? 'text-rose-400' : 'text-white';

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-10">

        {/* Title */}
        <h1 className="text-2xl font-semibold tracking-widest uppercase text-slate-400 select-none">
          Teller
        </h1>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.5)] ring-1 ring-slate-700">
          <span className={`text-7xl font-bold tabular-nums transition-colors duration-300 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-5">
          {/* Decrement */}
          <button
            onClick={decrement}
            aria-label="Verlaag teller"
            className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 ring-1 ring-slate-700 text-slate-300 hover:bg-rose-500 hover:ring-rose-400 hover:text-white active:scale-95 transition-all duration-150 shadow-lg cursor-pointer"
          >
            <Minus size={28} strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            aria-label="Reset teller"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 ring-1 ring-slate-700 text-slate-500 hover:bg-slate-700 hover:text-slate-200 active:scale-95 transition-all duration-150 shadow-md cursor-pointer"
          >
            <RotateCcw size={20} strokeWidth={2} />
          </button>

          {/* Increment */}
          <button
            onClick={increment}
            aria-label="Verhoog teller"
            className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 ring-1 ring-slate-700 text-slate-300 hover:bg-emerald-500 hover:ring-emerald-400 hover:text-white active:scale-95 transition-all duration-150 shadow-lg cursor-pointer"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Subtle hint */}
        <p className="text-xs text-slate-600 tracking-wide select-none">
          {count === 0 ? 'Druk op + of − om te beginnen' : count > 0 ? `${count} stap${count !== 1 ? 'pen' : ''} omhoog` : `${Math.abs(count)} stap${Math.abs(count) !== 1 ? 'pen' : ''} omlaag`}
        </p>
      </div>
    </main>
  );
}
