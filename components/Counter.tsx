
'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (action: 'increment' | 'decrement') => {
    setLoading(true);
    setError(null);

    const newValue = action === 'increment' ? count + 1 : count - 1;

    const { error: supabaseError } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newValue });

    if (supabaseError) {
      setError(`Opslaan mislukt: ${supabaseError.message}`);
    } else {
      setCount(newValue);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 rounded-3xl shadow-2xl p-14 flex flex-col items-center gap-10 border border-slate-700">
        {/* Title */}
        <h1 className="text-slate-400 text-lg font-medium tracking-widest uppercase">
          Teller
        </h1>

        {/* Count display */}
        <div className="text-white font-bold text-9xl tabular-nums select-none leading-none">
          {count}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-8">
          {/* Decrement */}
          <button
            onClick={() => handleClick('decrement')}
            disabled={loading}
            aria-label="Verlagen"
            className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center shadow-lg shadow-red-900/40"
          >
            <Minus className="w-9 h-9 text-white" strokeWidth={2.5} />
          </button>

          {/* Increment */}
          <button
            onClick={() => handleClick('increment')}
            disabled={loading}
            aria-label="Verhogen"
            className="w-20 h-20 rounded-full bg-green-500 hover:bg-green-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center shadow-lg shadow-green-900/40"
          >
            <Plus className="w-9 h-9 text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <p className="text-slate-400 text-sm animate-pulse">Opslaan…</p>
        )}

        {/* Error message */}
        {error && !loading && (
          <p className="text-red-400 text-sm text-center max-w-xs">{error}</p>
        )}
      </div>
    </div>
  );
}
