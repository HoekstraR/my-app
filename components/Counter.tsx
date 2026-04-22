
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 flex flex-col items-center gap-10 shadow-2xl w-full max-w-sm">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-wide">Teller</h1>
          <p className="text-slate-400 text-sm mt-1">Klik de knoppen om te tellen</p>
        </div>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-44 h-44 rounded-full bg-white/5 border border-white/10 shadow-inner">
          <span className={`text-7xl font-black tabular-nums transition-colors duration-300 ${countColor}`}>
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-5">
          {/* Decrement */}
          <button
            onClick={decrement}
            aria-label="Verlagen"
            className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-400 flex items-center justify-center hover:bg-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-150 shadow-lg"
          >
            <Minus className="w-6 h-6" strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            aria-label="Reset"
            className="w-12 h-12 rounded-xl bg-slate-700/60 border border-slate-600/50 text-slate-400 flex items-center justify-center hover:bg-slate-600/60 hover:text-white hover:scale-105 active:scale-95 transition-all duration-150 shadow-md"
          >
            <RotateCcw className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Increment */}
          <button
            onClick={increment}
            aria-label="Verhogen"
            className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-150 shadow-lg"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Status label */}
        <p className="text-xs text-slate-500 tracking-widest uppercase">
          {count === 0 ? 'Nul' : count > 0 ? `+${count} boven nul` : `${Math.abs(count)} onder nul`}
        </p>
      </div>
    </div>
  );
}
