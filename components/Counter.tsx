
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 flex flex-col items-center gap-10 shadow-2xl">

        {/* Title */}
        <h1 className="text-white/70 text-xl font-semibold tracking-widest uppercase">
          Teller
        </h1>

        {/* Counter display */}
        <div className="flex items-center justify-center w-48 h-48 rounded-full bg-white/10 border-4 border-white/20 shadow-inner">
          <span className="text-7xl font-bold text-white tabular-nums">
            {count}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          {/* Decrement */}
          <button
            onClick={decrement}
            disabled={count === 0}
            className="group flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/20 border border-red-400/40 text-red-300 transition-all duration-200 hover:bg-red-500/40 hover:border-red-400/70 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-red-500/20"
            aria-label="Verlaag teller"
          >
            <Minus className="w-7 h-7" strokeWidth={2.5} />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            disabled={count === 0}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white/50 transition-all duration-200 hover:bg-white/20 hover:text-white/80 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/10"
            aria-label="Reset teller"
          >
            <RotateCcw className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Increment */}
          <button
            onClick={increment}
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 transition-all duration-200 hover:bg-emerald-500/40 hover:border-emerald-400/70 hover:scale-105 active:scale-95"
            aria-label="Verhoog teller"
          >
            <Plus className="w-7 h-7" strokeWidth={2.5} />
          </button>

        </div>

        {/* Floor indicator */}
        {count === 0 && (
          <p className="text-white/30 text-sm">
            Minimum bereikt
          </p>
        )}

      </div>
    </div>
  );
}
