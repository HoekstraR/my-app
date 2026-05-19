
'use client'
import { useMemo } from 'react'

interface Particle {
  id: number
  left: string
  delay: string
  duration: string
  size: string
  opacity: number
}

export default function BackgroundLayer() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${8 + i * 7.5}%`,
      delay: `${(i * 1.7) % 8}s`,
      duration: `${10 + (i * 2.3) % 10}s`,
      size: `${2 + (i % 3)}px`,
      opacity: 0.3 + (i % 4) * 0.1,
    }))
  }, [])

  return (
    <>
      {/* Deep background */}
      <div
        className="fixed inset-0 -z-20"
        style={{ background: '#050810' }}
      />

      {/* Animated radial gradients — breathing effect */}
      <div
        className="fixed inset-0 -z-10 bg-breathe"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 25% 60%, #001a3a 0%, transparent 70%),
            radial-gradient(ellipse 40% 30% at 75% 40%, #1a0020 0%, transparent 70%)
          `,
        }}
      />

      {/* Subtle perspective grid */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,210,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,210,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="fixed bottom-0 rounded-full pointer-events-none float-particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: '#00f5ff',
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            boxShadow: `0 0 4px #00f5ff, 0 0 8px #00f5ff66`,
          }}
        />
      ))}
    </>
  )
}
