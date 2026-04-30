
'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const logAction = async (action: 'increment' | 'decrement', newCount: number) => {
    setStatus('saving');
    setErrorMessage('');

    const { error } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newCount });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message);
    } else {
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const handleIncrement = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await logAction('increment', newCount);
  };

  const handleDecrement = async () => {
    const newCount = count - 1;
    setCount(newCount);
    await logAction('decrement', newCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 w-full max-w-sm text-center">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 tracking-tight">Teller</h1>
        <p className="text-sm text-gray-400 mb-10">Elke klik wordt opgeslagen in Supabase</p>

        {/* Count display */}
        <div className="relative mb-10">
          <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-6xl font-bold text-white tabular-nums">{count}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button
            onClick={handleDecrement}
            disabled={status === 'saving'}
            className="w-16 h-16 rounded-2xl bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 flex items-center justify-center transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            aria-label="Verlaag teller"
          >
            <Minus className="w-6 h-6" strokeWidth={2.5} />
          </button>

          <button
            onClick={handleIncrement}
            disabled={status === 'saving'}
            className="w-16 h-16 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center transition-all duration-150 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg shadow-indigo-200"
            aria-label="Verhoog teller"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>

        {/* Status indicator */}
        <div className="h-6 flex items-center justify-center">
          {status === 'saving' && (
            <span className="text-sm text-gray-400 flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 border-2 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
              Opslaan…
            </span>
          )}
          {status === 'saved' && (
            <span className="text-sm text-emerald-600 font-medium">
              Opgeslagen ✓
            </span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-500 font-medium" title={errorMessage}>
              Fout bij opslaan ✗
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
