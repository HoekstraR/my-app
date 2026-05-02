
'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Action = 'increment' | 'decrement' | 'reset';

interface LogEntry {
  id: string;
  action: string;
  count_value: number;
  created_at: string;
}

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    async function init() {
      setLoading(true);

      // Fetch most recent count value
      const { data, error } = await supabase
        .from('counter_logs')
        .select('count_value')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setCount(0);
        }
      } else if (data) {
        setCount(data.count_value);
      }

      // Fetch last 5 log entries
      const { data: recentLogs } = await supabase
        .from('counter_logs')
        .select('id, action, count_value, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentLogs) {
        setLogs(recentLogs);
      }

      setLoading(false);
    }

    void init();
  }, []);

  async function handleAction(action: Action) {
    let newCount: number;
    if (action === 'increment') newCount = count + 1;
    else if (action === 'decrement') newCount = count - 1;
    else newCount = 0;

    setSaving(true);

    const { data: inserted, error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount })
      .select('id, action, count_value, created_at')
      .single();

    if (!error) {
      setCount(newCount);
      if (inserted) {
        setLogs((prev) => [inserted, ...prev].slice(0, 5));
      }
    }

    setSaving(false);
  }

  function formatTime(ts: string): string {
    return new Date(ts).toLocaleTimeString('nl-NL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  function actionLabel(action: string): string {
    if (action === 'increment') return '+1';
    if (action === 'decrement') return '−1';
    return 'reset';
  }

  function actionColor(action: string): string {
    if (action === 'increment') return 'text-emerald-600 bg-emerald-50';
    if (action === 'decrement') return 'text-rose-600 bg-rose-50';
    return 'text-amber-600 bg-amber-50';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Title */}
          <h1 className="text-center text-white/70 text-sm font-semibold tracking-widest uppercase mb-8">
            Teller
          </h1>

          {/* Count display */}
          <div className="flex items-center justify-center mb-10">
            {loading ? (
              <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            ) : (
              <span
                className={`text-8xl font-black tabular-nums transition-all duration-200 ${
                  count > 0
                    ? 'text-emerald-400'
                    : count < 0
                    ? 'text-rose-400'
                    : 'text-white'
                }`}
              >
                {count}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => void handleAction('decrement')}
              disabled={loading || saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 hover:text-rose-100 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-5 h-5" />
              Min
            </button>

            <button
              onClick={() => void handleAction('reset')}
              disabled={loading || saving}
              className="flex items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => void handleAction('increment')}
              disabled={loading || saving}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300 hover:text-emerald-100 font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              Plus
            </button>
          </div>

          {/* Saving indicator */}
          {saving && (
            <p className="text-center text-white/40 text-xs mb-4 animate-pulse">
              Opslaan…
            </p>
          )}

          {/* Log */}
          {!loading && logs.length > 0 && (
            <div className="border-t border-white/10 pt-6">
              <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">
                Recente acties
              </p>
              <ul className="space-y-2">
                {logs.map((log) => (
                  <li key={log.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${actionColor(log.action)}`}
                      >
                        {actionLabel(log.action)}
                      </span>
                      <span className="text-white/60 text-sm tabular-nums">
                        → {log.count_value}
                      </span>
                    </div>
                    <span className="text-white/30 text-xs tabular-nums">
                      {formatTime(log.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && logs.length === 0 && (
            <p className="text-center text-white/30 text-xs mt-2">
              Nog geen acties — klik een knop!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
