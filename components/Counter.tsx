
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Action = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastAction, setLastAction] = useState<Action | null>(null);

  useEffect(() => {
    async function fetchLatest() {
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // PGRST116 = no rows found → start at 0
        if (error.code === 'PGRST116') {
          setCount(0);
        } else {
          console.error('Error fetching counter:', error.message);
        }
      } else if (data) {
        setCount(data.count_value);
      }

      setLoading(false);
    }

    void fetchLatest();
  }, []);

  async function handleAction(action: Action) {
    let newValue: number;
    if (action === 'increment') newValue = count + 1;
    else if (action === 'decrement') newValue = count - 1;
    else newValue = 0;

    setLoading(true);
    setLastAction(action);
    setCount(newValue);

    const { error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newValue });

    if (error) {
      console.error('Error logging action:', error.message);
      // revert on failure
      setCount(count);
    }

    setLoading(false);
  }

  const actionLabel: Record<Action, string> = {
    increment: 'opgehoogd',
    decrement: 'verlaagd',
    reset: 'gereset',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 w-full max-w-sm shadow-2xl text-center">

        {/* Title */}
        <p className="text-blue-300 text-sm font-semibold tracking-widest uppercase mb-6">
          Teller
        </p>

        {/* Count display */}
        <div className="relative mb-8">
          <div className="text-8xl font-black text-white tabular-nums leading-none">
            {loading && count === 0 ? (
              <span className="text-white/30 text-5xl">…</span>
            ) : (
              <span className={count < 0 ? 'text-red-400' : count > 0 ? 'text-green-400' : 'text-white'}>
                {count}
              </span>
            )}
          </div>
          {lastAction && !loading && (
            <p className="text-white/40 text-xs mt-3 tracking-wide">
              Zojuist {actionLabel[lastAction]}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          {/* Decrement */}
          <button
            onClick={() => void handleAction('decrement')}
            disabled={loading}
            className="flex-1 py-4 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-300 text-2xl font-bold
                       hover:bg-red-500/30 hover:border-red-400/50 hover:text-red-200
                       active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-150"
            aria-label="Verlaag"
          >
            −
          </button>

          {/* Reset */}
          <button
            onClick={() => void handleAction('reset')}
            disabled={loading}
            className="flex-1 py-4 rounded-2xl bg-white/10 border border-white/20 text-white/60 text-sm font-semibold
                       hover:bg-white/15 hover:border-white/30 hover:text-white/80
                       active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-150"
            aria-label="Reset naar 0"
          >
            Reset
          </button>

          {/* Increment */}
          <button
            onClick={() => void handleAction('increment')}
            disabled={loading}
            className="flex-1 py-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-300 text-2xl font-bold
                       hover:bg-green-500/30 hover:border-green-400/50 hover:text-green-200
                       active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                       transition-all duration-150"
            aria-label="Verhoog"
          >
            +
          </button>
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="mt-6 flex items-center justify-center gap-2 text-white/30 text-xs">
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Opslaan…
          </div>
        )}

        {/* Footer hint */}
        <p className="mt-8 text-white/20 text-xs">
          Elke actie wordt opgeslagen in Supabase
        </p>
      </div>
    </div>
  );
}
