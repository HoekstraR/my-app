
'use client';

import { useState } from 'react';
import { Plus, Minus, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Action = 'increment' | 'decrement' | 'reset';
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function Counter() {
  const [count, setCount] = useState(0);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const logAction = async (action: Action, newValue: number): Promise<void> => {
    setSaveStatus('saving');
    const { error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newValue });

    if (error) {
      console.error('Supabase insert error:', error);
      setSaveStatus('error');
    } else {
      setSaveStatus('saved');
    }

    // Reset status after 2 seconds
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  const handleIncrement = (): void => {
    const newValue = count + 1;
    setCount(newValue);
    void logAction('increment', newValue);
  };

  const handleDecrement = (): void => {
    const newValue = count - 1;
    setCount(newValue);
    void logAction('decrement', newValue);
  };

  const handleReset = (): void => {
    const newValue = 0;
    setCount(newValue);
    void logAction('reset', newValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 w-full max-w-sm text-center">

        {/* Title */}
        <h1 className="text-lg font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Teller
        </h1>

        {/* Counter display */}
        <div className="relative mb-10">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <span className="text-5xl font-bold text-white tabular-nums">
              {count}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleDecrement}
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all duration-150 active:scale-95 hover:shadow-md"
            aria-label="Verlaag teller"
          >
            <Minus className="w-5 h-5" />
          </button>

          <button
            onClick={handleIncrement}
            className="w-16 h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all duration-150 active:scale-95 shadow-md shadow-blue-200 hover:shadow-lg"
            aria-label="Verhoog teller"
          >
            <Plus className="w-6 h-6" />
          </button>

          <button
            onClick={handleReset}
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all duration-150 active:scale-95 hover:shadow-md"
            aria-label="Reset teller"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Save status */}
        <div className="h-6 flex items-center justify-center">
          {saveStatus === 'saving' && (
            <span className="text-sm text-slate-400 animate-pulse">Opslaan…</span>
          )}
          {saveStatus === 'saved' && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600">
              <CheckCircle className="w-4 h-4" />
              Opgeslagen ✓
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-sm text-red-500">
              <AlertCircle className="w-4 h-4" />
              Opslaan mislukt
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex justify-center gap-6 text-xs text-slate-400">
          <span>− Verlagen</span>
          <span>+ Verhogen</span>
          <span>↺ Reset</span>
        </div>
      </div>
    </div>
  );
}
