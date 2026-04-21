
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => Math.max(0, c - 1));
  const reset = () => setCount(0);

  const isZero = count === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm flex flex-col items-center gap-8">

        {/* Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Teller</h1>
          <p className="text-sm text-gray-400 mt-1">Kan niet onder nul gaan</p>
        </div>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
          <span className="text-6xl font-extrabold text-white tabular-nums select-none">
            {count}
          </span>
        </div>

        {/* Increment / Decrement buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={decrement}
            disabled={isZero}
            aria-label="Verminder"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm
              bg-red-50 text-red-500 border border-red-100
              hover:bg-red-100 hover:shadow-md hover:shadow-red-100
              active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-red-50 disabled:hover:shadow-none
              transition-all duration-150"
          >
            <Minus className="w-5 h-5" />
            Minus
          </button>

          <button
            onClick={increment}
            aria-label="Verhoog"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm
              bg-indigo-600 text-white border border-indigo-600
              hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200
              active:scale-95
              transition-all duration-150"
          >
            <Plus className="w-5 h-5" />
            Plus
          </button>
        </div>

        {/* Reset button */}
        <button
          onClick={reset}
          disabled={isZero}
          aria-label="Reset"
          className="flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium
            text-gray-400 bg-gray-50 border border-gray-200
            hover:text-gray-600 hover:bg-gray-100 hover:shadow-sm
            active:scale-95
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-50 disabled:hover:shadow-none
            transition-all duration-150"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
}
