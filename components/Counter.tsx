
'use client';

import { useEffect, useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type Action = Database['public']['Tables']['counter_logs']['Insert']['action'];

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function loadLatestCount() {
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows yet — start at 0
          setCount(0);
        } else {
          setErrorMessage('Kon tellerwaarde niet laden.');
        }
      } else {
        setCount(data.count_value);
      }
      setLoading(false);
    }

    void loadLatestCount();
  }, []);

  async function handleAction(action: Action) {
    let newCount: number;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else newCount = 0;

    setSaveStatus('saving');
    setErrorMessage('');

    const { error } = await supabase.from('counter_logs').insert({
      action,
      count_value: newCount,
    });

    if (error) {
      setSaveStatus('error');
      setErrorMessage(`Opslaan mislukt: ${error.message}`);
    } else {
      setCount(newCount);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-600 border-t-indigo-400 animate-spin" />
          <p className="text-slate-400 text-sm tracking-wide">Laden…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="flex flex-col items-center gap-10">
        {/* Card */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl px-16 py-12 shadow-2xl flex flex-col items-center gap-8">

          {/* Title */}
          <h1 className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em]">Teller</h1>

          {/* Counter display */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl scale-150" />
            <span
              className="relative text-8xl font-extrabold tabular-nums text-white transition-all duration-200"
              style={{ textShadow: '0 0 40px rgba(99,102,241,0.4)' }}
            >
              {count}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => void handleAction('decrement')}
              disabled={saveStatus === 'saving'}
              className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-700 hover:bg-red-500/20 hover:border-red-500/50 border border-slate-600 text-slate-300 hover:text-red-400 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Verlaag teller"
            >
              <Minus size={22} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => void handleAction('reset')}
              disabled={saveStatus === 'saving'}
              className="group flex items-center justify-center w-12 h-12 rounded-xl bg-slate-700/60 hover:bg-amber-500/20 hover:border-amber-500/50 border border-slate-600/60 text-slate-400 hover:text-amber-400 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Reset teller"
            >
              <RotateCcw size={16} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => void handleAction('increment')}
              disabled={saveStatus === 'saving'}
              className="group flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/50 text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Verhoog teller"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="h-6 flex items-center justify-center">
          {saveStatus === 'saving' && (
            <p className="text-slate-400 text-sm animate-pulse">Opslaan…</p>
          )}
          {saveStatus === 'saved' && (
            <p className="text-emerald-400 text-sm font-medium transition-opacity duration-500">
              Opgeslagen ✓
            </p>
          )}
          {saveStatus === 'error' && (
            <p className="text-red-400 text-sm font-medium">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
