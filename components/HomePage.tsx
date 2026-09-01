
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
      ? 'text-emerald-500'
      : count < 0
      ? 'text-rose-500'
      : 'text-slate-700';

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col items-center gap-8 w-80">

        {/* Title */}
        <h1 className="text-xl font-semibold text-slate-500 tracking-widest uppercase">
          Teller
        </h1>

        {/* Count display */}
        <div
          className={`text-8xl font-bold tabular-nums transition-colors duration-300 ${countColor}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </div>

        {/* Increment / Decrement */}
        <div className="flex items-center gap-4">
          <button
            onClick={decrement}
            aria-label="Verminder met 1"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 hover:bg-rose-100 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <Minus size={28} strokeWidth={2.5} />
          </button>

          <button
            onClick={increment}
            aria-label="Verhoog met 1"
            className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 hover:bg-emerald-100 active:scale-95 transition-all duration-150 shadow-sm"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          aria-label="Reset naar 0"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-95 transition-all duration-150 text-sm font-medium"
        >
          <RotateCcw size={15} strokeWidth={2.5} />
          Reset
        </button>
      </div>
    </main>
  );
}
