
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type CounterAction = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [logs, setLogs] = useState<CounterLog[]>([]);

  const fetchLogs = useCallback(async () => {
    const { data } = await supabase
      .from('counter_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setLogs(data);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching initial count:', error);
      } else if (data) {
        setCount(data.count_value);
      }

      await fetchLogs();
      setInitializing(false);
    };

    init();
  }, [fetchLogs]);

  const handleAction = async (action: CounterAction) => {
    if (loading) return;
    setLoading(true);

    let newCount: number;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else newCount = 0;

    const { error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount });

    if (error) {
      console.error('Error inserting log:', error);
    } else {
      setCount(newCount);
      await fetchLogs();
    }

    setLoading(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const actionLabel: Record<CounterAction, string> = {
    increment: '＋ Verhoogd',
    decrement: '− Verlaagd',
    reset: '↺ Reset',
  };

  const actionColor: Record<CounterAction, string> = {
    increment: 'text-emerald-600',
    decrement: 'text-rose-500',
    reset: 'text-amber-500',
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-sm">
      {/* Counter display */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Teller</p>
        <div className="text-8xl font-bold tabular-nums text-slate-800 min-w-[4ch] text-center">
          {initializing ? (
            <span className="text-5xl text-slate-300 animate-pulse">…</span>
          ) : (
            count
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleAction('decrement')}
          disabled={loading || initializing}
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 hover:bg-rose-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          aria-label="Verlaag teller"
        >
          <Minus className="w-6 h-6" strokeWidth={2.5} />
        </button>

        <button
          onClick={() => handleAction('reset')}
          disabled={loading || initializing}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-600 hover:bg-amber-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          aria-label="Reset teller"
        >
          <RotateCcw className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <button
          onClick={() => handleAction('increment')}
          disabled={loading || initializing}
          className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 hover:bg-emerald-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          aria-label="Verhoog teller"
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
        </button>
      </div>

      {/* Loading indicator */}
      {loading && (
        <p className="text-xs text-slate-400 animate-pulse">Opslaan…</p>
      )}

      {/* Log */}
      {logs.length > 0 && (
        <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 pt-3 pb-2">
            Laatste acties
          </p>
          <ul className="divide-y divide-slate-100">
            {logs.map((log) => (
              <li key={log.id} className="flex items-center justify-between px-4 py-2">
                <span className={`text-sm font-medium ${actionColor[log.action]}`}>
                  {actionLabel[log.action]}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold tabular-nums text-slate-700">
                    {log.count_value}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatTime(log.created_at)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
