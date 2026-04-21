
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-6">
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl shadow-2xl p-12 flex flex-col items-center gap-10 w-full max-w-sm">

        {/* Title */}
        <h1 className="text-white/70 text-sm font-semibold uppercase tracking-widest">
          Teller
        </h1>

        {/* Count display */}
        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-8xl font-bold tabular-nums transition-colors duration-300 ${
              count === 0 ? 'text-white/30' : 'text-white'
            }`}
          >
            {count}
          </span>
          <span className="text-white/40 text-xs font-medium">
            {count === 0 ? 'Begin hier' : count === 1 ? '1 stap gezet' : `${count} stappen gezet`}
          </span>
        </div>

        {/* +/- buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            disabled={count === 0}
            className="w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white transition-all duration-150 active:scale-95 flex items-center justify-center shadow-lg"
            aria-label="Verlagen"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={increment}
            className="w-20 h-20 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white transition-all duration-150 active:scale-95 flex items-center justify-center shadow-xl shadow-indigo-500/30"
            aria-label="Verhogen"
          >
            <Plus className="w-8 h-8" />
          </button>

          <button
            onClick={decrement}
            disabled={count === 0}
            className="w-16 h-16 rounded-2xl bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white transition-all duration-150 active:scale-95 flex items-center justify-center shadow-lg opacity-0 pointer-events-none"
            aria-hidden="true"
          >
            <Minus className="w-6 h-6" />
          </button>
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={decrement}
            disabled={count === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/8 hover:bg-white/15 disabled:opacity-20 disabled:cursor-not-allowed text-white/80 text-sm font-medium transition-all duration-150 active:scale-95 border border-white/10"
            aria-label="Verlagen"
          >
            <Minus className="w-4 h-4" />
            Min
          </button>

          <button
            onClick={reset}
            disabled={count === 0}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/8 hover:bg-red-500/20 disabled:opacity-20 disabled:cursor-not-allowed text-white/60 hover:text-red-400 text-sm font-medium transition-all duration-150 active:scale-95 border border-white/10"
            aria-label="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={increment}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-sm font-medium transition-all duration-150 active:scale-95 border border-indigo-500/30"
            aria-label="Verhogen"
          >
            <Plus className="w-4 h-4" />
            Plus
          </button>
        </div>

      </div>
    </div>
  );
}
