
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type Action = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [logs, setLogs] = useState<CounterLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [busy, setBusy] = useState<boolean>(false);

  // On mount: fetch the last known count value + last 10 logs
  useEffect(() => {
    const init = async () => {
      // Fetch latest count value
      const { data: latest, error: latestErr } = await supabase
        .from('counter_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (latestErr) {
        console.error('Error fetching latest count:', latestErr);
      } else if (latest && latest.length > 0) {
        setCount(latest[0].count_value);
      }

      // Fetch last 10 logs
      const { data: recentLogs, error: logsErr } = await supabase
        .from('counter_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (logsErr) {
        console.error('Error fetching logs:', logsErr);
      } else {
        setLogs(recentLogs ?? []);
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleAction = async (action: Action) => {
    if (busy) return;
    setBusy(true);

    let newCount: number;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else newCount = 0;

    // Optimistic local update
    setCount(newCount);

    const { data, error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount })
      .select()
      .single();

    if (error) {
      console.error('Error inserting log:', error);
      // Revert on error
      setCount(count);
    } else if (data) {
      // Prepend new log and keep only 10
      setLogs((prev) => [data, ...prev].slice(0, 10));
    }

    setBusy(false);
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const actionLabel: Record<Action, string> = {
    increment: '＋ increment',
    decrement: '− decrement',
    reset: '↺ reset',
  };

  const actionColor: Record<Action, string> = {
    increment: 'text-emerald-400',
    decrement: 'text-rose-400',
    reset: 'text-amber-400',
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6">

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

          {/* Title */}
          <h1 className="text-center text-gray-400 text-xs font-semibold tracking-widest uppercase mb-6">
            Counter
          </h1>

          {/* Count display */}
          <div className="flex items-center justify-center mb-8">
            {loading ? (
              <div className="w-8 h-8 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
            ) : (
              <span className="text-8xl font-black text-white tabular-nums leading-none">
                {count}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleAction('decrement')}
              disabled={busy || loading}
              className="flex items-center justify-center h-14 rounded-xl bg-gray-800 hover:bg-rose-500/20 hover:border-rose-500/50 border border-gray-700 text-gray-300 hover:text-rose-400 text-2xl font-bold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Decrement"
            >
              −
            </button>

            <button
              onClick={() => handleAction('reset')}
              disabled={busy || loading}
              className="flex items-center justify-center h-14 rounded-xl bg-gray-800 hover:bg-amber-500/20 hover:border-amber-500/50 border border-gray-700 text-gray-300 hover:text-amber-400 text-sm font-semibold tracking-wide transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
              aria-label="Reset"
            >
              Reset
            </button>

            <button
              onClick={() => handleAction('increment')}
              disabled={busy || loading}
              className="flex items-center justify-center h-14 rounded-xl bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white text-2xl font-bold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-indigo-500/20"
              aria-label="Increment"
            >
              +
            </button>
          </div>
        </div>

        {/* Log list */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between">
            <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
              Recent activity
            </span>
            <span className="text-gray-600 text-xs">last 10</span>
          </div>

          <div className="overflow-y-auto max-h-64">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-5 h-5 border-2 border-gray-700 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : logs.length === 0 ? (
              <p className="text-center text-gray-600 text-sm py-10">
                No activity yet — make a move!
              </p>
            ) : (
              <ul className="divide-y divide-gray-800/60">
                {logs.map((log, i) => (
                  <li
                    key={log.id}
                    className={`flex items-center justify-between px-5 py-3 transition-colors ${i === 0 ? 'bg-gray-800/40' : ''}`}
                  >
                    <span className={`text-sm font-medium ${actionColor[log.action as Action] ?? 'text-gray-400'}`}>
                      {actionLabel[log.action as Action] ?? log.action}
                    </span>
                    <div className="flex items-center gap-3 text-right">
                      <span className="text-white font-bold tabular-nums text-sm">
                        {log.count_value}
                      </span>
                      <span className="text-gray-600 text-xs tabular-nums">
                        {formatTime(log.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
