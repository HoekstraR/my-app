'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)

    // Notify the Walden platform with the real error details
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
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#f8fafc',
          padding: '2rem',
        }}>
          <div style={{
            maxWidth: '28rem',
            width: '100%',
            background: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            border: '1px solid #e2e8f0',
            padding: '2rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.75rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
              {error.message || 'An unexpected error occurred.'}
            </p>
            <button
              onClick={() => {
                try {
                  window.parent.postMessage({ type: 'walden-reload-container' }, '*')
                } catch {
                  reset()
                }
              }}
              style={{
                padding: '0.625rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: 500,
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
