
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const isNegative = count < 0;
  const isPositive = count > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">

        {/* Title */}
        <h1 className="text-slate-400 text-sm font-semibold uppercase tracking-[0.25em]">
          Teller
        </h1>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-56 h-56 rounded-full bg-slate-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-slate-700">
          {/* Subtle glow ring */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-500 blur-xl opacity-20 ${
              isPositive ? 'bg-emerald-400' : isNegative ? 'bg-rose-400' : 'bg-slate-500'
            }`}
          />
          <span
            className={`relative text-7xl font-black tabular-nums transition-colors duration-300 ${
              isPositive
                ? 'text-emerald-400'
                : isNegative
                ? 'text-rose-400'
                : 'text-slate-200'
            }`}
          >
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          {/* Decrement */}
          <button
            onClick={() => setCount((c) => c - 1)}
            className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-rose-500 hover:border-rose-400 hover:text-white active:scale-95 transition-all duration-150 shadow-lg"
            aria-label="Verlaag teller"
          >
            <Minus size={22} strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={() => setCount(0)}
            className="group flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700 border border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-slate-200 active:scale-95 transition-all duration-150 shadow-md"
            aria-label="Reset teller"
          >
            <RotateCcw size={16} strokeWidth={2.5} />
          </button>

          {/* Increment */}
          <button
            onClick={() => setCount((c) => c + 1)}
            className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-emerald-500 hover:border-emerald-400 hover:text-white active:scale-95 transition-all duration-150 shadow-lg"
            aria-label="Verhoog teller"
          >
            <Plus size={22} strokeWidth={2.5} />
          </button>

        </div>

        {/* Step label */}
        <p className="text-slate-600 text-xs tracking-widest uppercase select-none">
          stap 1
        </p>

      </div>
    </div>
  );
}
