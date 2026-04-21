'use client'

import { useEffect } from 'react'

/**
 * Invisible component that notifies the Walden platform
 * when the app has successfully rendered (no crash).
 * Used to clear the error overlay after HMR fixes.
 */
export default function HealthSignal() {
  useEffect(() => {
    try {
      window.parent.postMessage({ type: 'walden-healthy' }, '*')
    } catch {
      // Silently fail if postMessage is blocked
    }
  })

  return null
}
