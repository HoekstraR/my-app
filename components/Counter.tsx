
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type Action = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<CounterLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  const fetchLogs = useCallback(async () => {
    const { data } = await supabase
      .from('counter_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (data && data.length > 0) {
      setLogs(data);
      setCount(data[0].count_value);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchLogs();
    return undefined;
  }, [fetchLogs]);

  const handleAction = async (action: Action) => {
    if (actionLoading) return;
    setActionLoading(true);

    let newCount = count;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else if (action === 'reset') newCount = 0;

    setCount(newCount);

    const { data } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount })
      .select()
      .single();

    if (data) {
      setLogs(prev => [data, ...prev].slice(0, 10));
    }

    setActionLoading(false);
  };

  const actionLabel: Record<Action, string> = {
    increment: '+1',
    decrement: '−1',
    reset: 'reset',
  };

  const actionColor: Record<Action, string> = {
    increment: 'text-emerald-400',
    decrement: 'text-rose-400',
    reset: 'text-amber-400',
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center border-b border-gray-800">
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest mb-2">Teller</p>
            {loading ? (
              <div className="h-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : (
              <p className="text-8xl font-black text-white tabular-nums leading-none">
                {count}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="px-8 py-6 flex gap-3">
            <button
              onClick={() => handleAction('decrement')}
              disabled={actionLoading || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-rose-500/20 border border-gray-700 hover:border-rose-500/50 text-gray-300 hover:text-rose-400 rounded-xl py-3.5 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleAction('reset')}
              disabled={actionLoading || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-amber-500/20 border border-gray-700 hover:border-amber-500/50 text-gray-300 hover:text-amber-400 rounded-xl py-3.5 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleAction('increment')}
              disabled={actionLoading || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 hover:border-indigo-400 text-white rounded-xl py-3.5 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Log */}
          <div className="border-t border-gray-800">
            <div className="px-8 py-4 flex items-center justify-between">
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Recente acties</p>
              <span className="text-gray-600 text-xs">{logs.length} / 10</span>
            </div>

            <div className="px-8 pb-8 space-y-2">
              {loading ? (
                <div className="flex justify-center py-6">
                  <div className="w-5 h-5 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
                </div>
              ) : logs.length === 0 ? (
                <p className="text-gray-600 text-sm text-center py-4">Nog geen acties. Druk op een knop!</p>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={log.id}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-800/60 border border-gray-800 ${i === 0 ? 'ring-1 ring-indigo-500/30' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold w-16 ${actionColor[log.action as Action]}`}>
                        {actionLabel[log.action as Action] ?? log.action}
                      </span>
                      <span className="text-gray-300 text-sm tabular-nums">→ {log.count_value}</span>
                    </div>
                    <span className="text-gray-600 text-xs tabular-nums">
                      {new Date(log.created_at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
