'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)

    // Notify the Walden platform with the real error details
    // This reaches the parent before any WebContainer crash noise
    try {
      window.parent.postMessage({
        type: 'walden-error-boundary',
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      }, '*')
    } catch {
      // Silently fail if postMessage is blocked
    }
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-gray-600 mb-6 text-sm">
            An unexpected error occurred. Don&apos;t worry, this happens sometimes.
          </p>
          
          <button
            onClick={() => {
              try {
                window.parent.postMessage({ type: 'walden-reload-container' }, '*')
              } catch {
                reset()
              }
            }}
            className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try again
          </button>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-xs">
              If this problem persists, please contact support.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}