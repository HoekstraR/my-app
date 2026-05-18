
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type Action = 'increment' | 'decrement' | 'reset';

const ACTION_LABELS: Record<Action, string> = {
  increment: 'Verhoogd',
  decrement: 'Verlaagd',
  reset: 'Gereset',
};

const ACTION_COLORS: Record<Action, string> = {
  increment: 'text-emerald-600',
  decrement: 'text-rose-500',
  reset: 'text-amber-500',
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<CounterLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Load initial count + recent logs on mount
  useEffect(() => {
    async function init() {
      // Fetch the latest count_value
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        // PGRST116 = no rows found → start at 0
        if (error.code !== 'PGRST116') {
          console.error('Error loading initial count:', error.message);
        }
        setCount(0);
      } else {
        setCount(data.count_value);
      }

      // Fetch recent logs
      await fetchLogs();
      setLoading(false);
    }

    init();
  }, []);

  const fetchLogs = useCallback(async () => {
    const { data, error } = await supabase
      .from('counter_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching logs:', error.message);
      return;
    }
    setLogs(data ?? []);
  }, []);

  const handleAction = useCallback(
    async (action: Action) => {
      if (actionLoading) return;
      setActionLoading(true);

      const newCount =
        action === 'increment'
          ? count + 1
          : action === 'decrement'
          ? count - 1
          : 0;

      setCount(newCount);

      const { error } = await supabase
        .from('counter_logs')
        .insert({ action, count_value: newCount });

      if (error) {
        console.error('Error inserting log:', error.message);
        // Rollback optimistic update
        setCount(count);
      } else {
        await fetchLogs();
      }

      setActionLoading(false);
    },
    [count, actionLoading, fetchLogs]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">

        {/* Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-6 pt-8 pb-4 text-center">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">
              Teller
            </p>
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin" />
              </div>
            ) : (
              <p className={`text-8xl font-bold tabular-nums transition-all duration-150 ${
                count > 0 ? 'text-emerald-400' : count < 0 ? 'text-rose-400' : 'text-slate-200'
              }`}>
                {count}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="px-6 pb-8 flex gap-3 justify-center">
            <button
              onClick={() => handleAction('decrement')}
              disabled={loading || actionLoading}
              title="Verlagen"
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-700 hover:bg-rose-500/20 border border-slate-600 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <Minus size={22} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleAction('reset')}
              disabled={loading || actionLoading}
              title="Reset naar 0"
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-700 hover:bg-amber-500/20 border border-slate-600 hover:border-amber-500/50 text-slate-300 hover:text-amber-400 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <RotateCcw size={20} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleAction('increment')}
              disabled={loading || actionLoading}
              title="Verhogen"
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 hover:border-indigo-400 text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-indigo-900/40"
            >
              <Plus size={22} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Recent logs */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Recente acties
            </p>
          </div>

          {loading ? (
            <div className="py-8 flex justify-center">
              <div className="w-5 h-5 border-2 border-slate-600 border-t-indigo-400 rounded-full animate-spin" />
            </div>
          ) : logs.length === 0 ? (
            <p className="px-4 py-6 text-slate-500 text-sm text-center">
              Nog geen acties — druk op een knop!
            </p>
          ) : (
            <ul className="divide-y divide-slate-700/60">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${ACTION_COLORS[log.action as Action] ?? 'text-slate-300'}`}>
                      {ACTION_LABELS[log.action as Action] ?? log.action}
                    </span>
                    <span className="text-slate-400 text-sm">
                      → <span className="font-mono font-semibold text-slate-200">{log.count_value}</span>
                    </span>
                  </div>
                  <span className="text-slate-500 text-xs font-mono">
                    {formatTime(log.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="text-center text-slate-600 text-xs">
          Elke actie wordt opgeslagen in Supabase
        </p>
      </div>
    </div>
  );
}
