
'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Action = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    async function loadLastValue() {
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code === 'PGRST116') {
        // No rows yet — start at 0
        setCount(0);
      } else if (data) {
        setCount(data.count_value);
      }

      setLoading(false);
    }

    void loadLastValue();
  }, []);

  async function handleAction(action: Action) {
    if (saving) return;

    let newValue: number;
    if (action === 'increment') {
      newValue = count + 1;
    } else if (action === 'decrement') {
      newValue = count - 1;
    } else {
      newValue = 0;
    }

    setCount(newValue);
    setSaving(true);

    await supabase.from('counter_logs').insert({
      action,
      count_value: newValue,
    });

    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 flex flex-col items-center gap-10 shadow-2xl w-full max-w-sm">

        {/* Title */}
        <h1 className="text-white/70 text-sm font-semibold uppercase tracking-widest">
          Teller
        </h1>

        {/* Count display */}
        <div className="relative flex items-center justify-center w-40 h-40 rounded-full bg-white/5 border border-white/10">
          {loading ? (
            <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
          ) : (
            <span className="text-6xl font-bold text-white tabular-nums select-none">
              {count}
            </span>
          )}
          {saving && (
            <span className="absolute -bottom-6 text-xs text-white/40">opslaan…</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/* Decrement */}
          <button
            onClick={() => void handleAction('decrement')}
            disabled={loading || saving}
            className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all duration-150 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verlaag teller"
          >
            <Minus size={22} />
          </button>

          {/* Reset */}
          <button
            onClick={() => void handleAction('reset')}
            disabled={loading || saving}
            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-white/15 active:scale-95 transition-all duration-150 flex items-center justify-center text-white/50 hover:text-white/80 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Reset teller"
          >
            <RotateCcw size={18} />
          </button>

          {/* Increment */}
          <button
            onClick={() => void handleAction('increment')}
            disabled={loading || saving}
            className="w-14 h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-400 active:scale-95 transition-all duration-150 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verhoog teller"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Subtle footnote */}
        <p className="text-white/25 text-xs text-center">
          Elke klik wordt opgeslagen in Supabase
        </p>
      </div>
    </div>
  );
}
