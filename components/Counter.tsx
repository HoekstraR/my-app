
'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];

type Action = 'increment' | 'decrement' | 'reset';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [logs, setLogs] = useState<CounterLog[]>([]);

  useEffect(() => {
    async function init() {
      setLoading(true);
      await Promise.all([fetchLatestCount(), fetchRecentLogs()]);
      setLoading(false);
    }
    void init();
  }, []);

  async function fetchLatestCount() {
    const { data, error } = await supabase
      .from('counter_logs')
      .select('count_value')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // PGRST116 = no rows found — start at 0
      if (error.code !== 'PGRST116') {
        console.error('Error fetching latest count:', error);
      }
      setCount(0);
    } else if (data) {
      setCount(data.count_value);
    }
  }

  async function fetchRecentLogs() {
    const { data, error } = await supabase
      .from('counter_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (error) {
      console.error('Error fetching logs:', error);
    } else {
      setLogs(data ?? []);
    }
  }

  async function logAction(action: Action, newCount: number) {
    const { error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount });

    if (error) {
      console.error('Error inserting log:', error);
    }
  }

  async function handleIncrement() {
    setActionLoading(true);
    const newCount = count + 1;
    await logAction('increment', newCount);
    setCount(newCount);
    await fetchRecentLogs();
    setActionLoading(false);
  }

  async function handleDecrement() {
    setActionLoading(true);
    const newCount = count - 1;
    await logAction('decrement', newCount);
    setCount(newCount);
    await fetchRecentLogs();
    setActionLoading(false);
  }

  async function handleReset() {
    setActionLoading(true);
    const newCount = 0;
    await logAction('reset', newCount);
    setCount(newCount);
    await fetchRecentLogs();
    setActionLoading(false);
  }

  function formatTimestamp(ts: string): string {
    return new Date(ts).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  function actionLabel(action: string): string {
    switch (action) {
      case 'increment': return '+1';
      case 'decrement': return '−1';
      case 'reset': return '↺ reset';
      default: return action;
    }
  }

  function actionColor(action: string): string {
    switch (action) {
      case 'increment': return 'text-green-600';
      case 'decrement': return 'text-red-500';
      case 'reset': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-sm p-8 flex flex-col items-center gap-8">

        {/* Title */}
        <h1 className="text-xl font-semibold text-slate-500 tracking-wide uppercase">Teller</h1>

        {/* Counter display */}
        <div className="flex items-center justify-center w-36 h-36 rounded-full bg-slate-50 border-4 border-slate-200 shadow-inner">
          {loading ? (
            <span className="text-3xl text-slate-300 animate-pulse">…</span>
          ) : (
            <span className="text-6xl font-bold text-slate-800 tabular-nums">{count}</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrement}
            disabled={loading || actionLoading}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-red-50 border-2 border-red-200 text-red-500 hover:bg-red-100 hover:border-red-300 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verlaag teller"
          >
            <Minus className="w-6 h-6" />
          </button>

          <button
            onClick={handleReset}
            disabled={loading || actionLoading}
            className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border-2 border-slate-200 text-slate-400 hover:bg-slate-100 hover:border-slate-300 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Reset teller"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleIncrement}
            disabled={loading || actionLoading}
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-green-50 border-2 border-green-200 text-green-600 hover:bg-green-100 hover:border-green-300 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Verhoog teller"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Recent logs */}
        <div className="w-full">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Recente acties
          </h2>
          {logs.length === 0 ? (
            <p className="text-sm text-slate-300 text-center py-4">Nog geen acties</p>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <span className={`font-semibold w-16 ${actionColor(log.action)}`}>
                    {actionLabel(log.action)}
                  </span>
                  <span className="font-mono text-slate-700 text-base">{log.count_value}</span>
                  <span className="text-slate-400 text-xs">{formatTimestamp(log.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
