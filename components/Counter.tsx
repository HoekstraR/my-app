
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);
  const isPositive = count > 0;
  const isNegative = count < 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-10">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-widest uppercase text-slate-400 letter-spacing-widest">
            Teller
          </h1>
        </div>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-64 h-64 rounded-full bg-slate-800/60 border border-slate-700/50 shadow-2xl shadow-purple-900/40 backdrop-blur-sm">
          {/* Glow ring */}
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-20 transition-all duration-500 ${
              isPositive
                ? 'bg-emerald-400'
                : isNegative
                ? 'bg-rose-400'
                : 'bg-slate-400'
            }`}
          />
          <span
            className={`relative text-8xl font-black tabular-nums transition-colors duration-300 ${
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
        <div className="flex items-center gap-5">
          {/* Decrement */}
          <button
            onClick={() => setCount((c) => c - 1)}
            className="group flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 shadow-lg hover:bg-rose-500/20 hover:border-rose-500/60 hover:text-rose-400 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Verlaag teller"
          >
            <Minus className="w-7 h-7" strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={() => setCount(0)}
            className="group flex items-center justify-center w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-500 shadow hover:bg-slate-700 hover:text-slate-300 hover:border-slate-500 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Reset teller"
          >
            <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
          </button>

          {/* Increment */}
          <button
            onClick={() => setCount((c) => c + 1)}
            className="group flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 shadow-lg hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:text-emerald-400 active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Verhoog teller"
          >
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          </button>
        </div>

        {/* Subtle hint */}
        <p className="text-slate-600 text-sm tracking-wide">
          + verhoog &nbsp;·&nbsp; − verlaag &nbsp;·&nbsp; ↺ reset
        </p>
      </div>
    </div>
  );
}
