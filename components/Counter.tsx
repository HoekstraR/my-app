
'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/database';

type CounterLog = Database['public']['Tables']['counter_logs']['Row'];
type Action = 'increment' | 'decrement' | 'reset';

const ACTION_LABELS: Record<Action, { label: string; emoji: string; color: string }> = {
  increment: { label: 'Increment', emoji: '➕', color: 'text-emerald-600' },
  decrement: { label: 'Decrement', emoji: '➖', color: 'text-rose-500' },
  reset:     { label: 'Reset',     emoji: '🔄', color: 'text-slate-500' },
};

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export default function Counter() {
  const [count, setCount]       = useState(0);
  const [logs, setLogs]         = useState<CounterLog[]>([]);
  const [saving, setSaving]     = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('counter_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (fetchError) {
      console.error('Failed to fetch logs:', fetchError);
    } else {
      setLogs(data ?? []);
    }
    setLoadingLogs(false);
  }, []);

  useEffect(() => {
    void fetchLogs();
  }, [fetchLogs]);

  const handleAction = async (action: Action) => {
    let newCount = count;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else if (action === 'reset') newCount = 0;

    setCount(newCount);
    setSaving(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount });

    if (insertError) {
      console.error('Failed to save log:', insertError);
      setError('Opslaan mislukt. Probeer het opnieuw.');
    } else {
      await fetchLogs();
    }

    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Teller App</h1>
          <p className="text-slate-500 mt-1 text-sm">Elke actie wordt opgeslagen in Supabase</p>
        </div>

        {/* Counter card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
          {/* Count display */}
          <div className="text-center mb-8">
            <div className="text-8xl font-black text-slate-800 tabular-nums leading-none mb-2 transition-all duration-150">
              {count}
            </div>
            <div className="h-5 flex items-center justify-center">
              {saving && (
                <span className="text-xs text-indigo-500 flex items-center gap-1.5 animate-pulse">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  Opslaan…
                </span>
              )}
              {error && !saving && (
                <span className="text-xs text-rose-500">{error}</span>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => void handleAction('decrement')}
              disabled={saving}
              className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 active:scale-95 transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed border border-rose-100 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">➖</span>
              <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Min</span>
            </button>

            <button
              onClick={() => void handleAction('reset')}
              disabled={saving}
              className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-95 transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">🔄</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reset</span>
            </button>

            <button
              onClick={() => void handleAction('increment')}
              disabled={saving}
              className="flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:scale-95 transition-all duration-100 disabled:opacity-40 disabled:cursor-not-allowed border border-emerald-100 group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">➕</span>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Plus</span>
            </button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-4">
            Recente activiteit
          </h2>

          {loadingLogs ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : logs.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">
              Nog geen acties — druk op een knop!
            </p>
          ) : (
            <ul className="space-y-2">
              {logs.map((log) => {
                const meta = ACTION_LABELS[log.action as Action] ?? {
                  label: log.action,
                  emoji: '•',
                  color: 'text-slate-500',
                };
                return (
                  <li
                    key={log.id}
                    className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">{meta.emoji}</span>
                      <span className={`text-sm font-medium ${meta.color}`}>{meta.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-slate-700 tabular-nums">
                        → {log.count_value}
                      </span>
                      <span className="text-xs text-slate-400 tabular-nums">
                        {formatTime(log.created_at)}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
