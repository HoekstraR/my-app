
'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type Action = 'increment' | 'decrement' | 'reset';

const ACTION_LABELS: Record<Action, string> = {
  increment: '+1',
  decrement: '−1',
  reset: 'Reset',
};

const ACTION_COLORS: Record<Action, string> = {
  increment: 'text-emerald-600',
  decrement: 'text-rose-500',
  reset: 'text-slate-500',
};

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [history, setHistory] = useState<CounterLog[]>([]);

  useEffect(() => {
    async function loadInitialState() {
      const { data, error } = await supabase
        .from('counter_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data && data.length > 0) {
        setCount(data[0].count_value);
        setHistory(data);
      }
      setLoading(false);
    }

    void loadInitialState();
  }, []);

  async function logAction(action: Action, newValue: number) {
    setSaving(true);
    const { data, error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newValue })
      .select()
      .single();

    if (!error && data) {
      setHistory((prev) => [data, ...prev].slice(0, 5));
    }
    setSaving(false);
  }

  async function handleIncrement() {
    const newValue = count + 1;
    setCount(newValue);
    await logAction('increment', newValue);
  }

  async function handleDecrement() {
    const newValue = count - 1;
    setCount(newValue);
    await logAction('decrement', newValue);
  }

  async function handleReset() {
    const newValue = 0;
    setCount(newValue);
    await logAction('reset', newValue);
  }

  function formatTime(iso: string): string {
    return new Date(iso).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Main counter card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Teller
        </p>

        {loading ? (
          <div className="flex items-center justify-center h-28">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div
            className={`text-8xl font-black tabular-nums transition-all duration-200 mb-8 ${
              count > 0
                ? 'text-emerald-500'
                : count < 0
                ? 'text-rose-500'
                : 'text-slate-800'
            }`}
          >
            {count}
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleDecrement}
            disabled={loading || saving}
            className="w-14 h-14 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verlaag"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={handleReset}
            disabled={loading || saving}
            className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleIncrement}
            disabled={loading || saving}
            className="w-14 h-14 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verhoog"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {saving && (
          <p className="mt-4 text-xs text-slate-400 animate-pulse">Opslaan…</p>
        )}
      </div>

      {/* History card */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
            Recente geschiedenis
          </p>
          <ul className="space-y-2">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-slate-400 tabular-nums">
                  {formatTime(entry.created_at)}
                </span>
                <span
                  className={`font-semibold ${ACTION_COLORS[entry.action]}`}
                >
                  {ACTION_LABELS[entry.action]}
                </span>
                <span className="text-slate-700 font-mono font-bold">
                  {entry.count_value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
