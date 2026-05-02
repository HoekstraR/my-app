
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Action = 'increment' | 'decrement' | 'reset'

export default function Counter() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const logAction = async (action: Action, newValue: number) => {
    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase
      .from('counter_logs')
      .insert({ action, count_value: newValue })

    if (insertError) {
      setError('Opslaan mislukt. Probeer opnieuw.')
      console.error('Supabase insert error:', insertError)
    }

    setLoading(false)
  }

  const handleIncrement = async () => {
    const newValue = count + 1
    setCount(newValue)
    await logAction('increment', newValue)
  }

  const handleDecrement = async () => {
    const newValue = count - 1
    setCount(newValue)
    await logAction('decrement', newValue)
  }

  const handleReset = async () => {
    const newValue = 0
    setCount(newValue)
    await logAction('reset', newValue)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Counter display */}
      <div className="relative flex items-center justify-center w-48 h-48 rounded-full bg-white shadow-xl border border-slate-100">
        <span className="text-6xl font-bold text-slate-800 tabular-nums">
          {count}
        </span>
        {loading && (
          <span className="absolute bottom-5 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <svg
              className="animate-spin h-3.5 w-3.5 text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12" cy="12" r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Opslaan…
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </p>
      )}

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={loading}
          className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm text-slate-600 text-2xl font-semibold
                     hover:bg-slate-50 hover:border-slate-300 hover:shadow-md
                     active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
          aria-label="Decrement"
        >
          −
        </button>

        <button
          onClick={handleReset}
          disabled={loading}
          className="px-5 h-10 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-500 text-sm font-medium
                     hover:bg-slate-50 hover:border-slate-300 hover:shadow-md
                     active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
          aria-label="Reset"
        >
          Reset
        </button>

        <button
          onClick={handleIncrement}
          disabled={loading}
          className="w-14 h-14 rounded-2xl bg-indigo-600 shadow-sm text-white text-2xl font-semibold
                     hover:bg-indigo-500 hover:shadow-md
                     active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150"
          aria-label="Increment"
        >
          +
        </button>
      </div>

      {/* Subtle hint */}
      <p className="text-xs text-slate-400">
        Elke klik wordt opgeslagen in Supabase
      </p>
    </div>
  )
}
