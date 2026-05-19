
'use client'

import { useMemo, useRef, useEffect, useState } from 'react'
import { JetBrains_Mono } from 'next/font/google'
import { useTime } from '@/hooks/useTime'
import BackgroundLayer from '@/components/clock/BackgroundLayer'
import ScanlineOverlay from '@/components/clock/ScanlineOverlay'
import ClockDigit from '@/components/clock/ClockDigit'
import ClockColon from '@/components/clock/ClockColon'
import DateDisplay from '@/components/clock/DateDisplay'
import SecondsBar from '@/components/clock/SecondsBar'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '700'],
})

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default function DigitalClock() {
  const time = useTime()
  const prevMinuteRef = useRef<number>(-1)
  const prevHourRef = useRef<number>(-1)
  const [minuteFlash, setMinuteFlash] = useState(false)
  const [hourFlash, setHourFlash] = useState(false)

  useEffect(() => {
    if (!time) return undefined

    const m = time.getMinutes()
    const h = time.getHours()

    if (prevMinuteRef.current !== -1 && prevMinuteRef.current !== m) {
      setMinuteFlash(true)
      const t = setTimeout(() => setMinuteFlash(false), 400)
      return () => clearTimeout(t)
    }
    prevMinuteRef.current = m

    if (prevHourRef.current !== -1 && prevHourRef.current !== h) {
      setHourFlash(true)
      const t = setTimeout(() => setHourFlash(false), 500)
      return () => clearTimeout(t)
    }
    prevHourRef.current = h

    return undefined
  }, [time])

  const fontClass = `font-[family-name:var(--font-jetbrains)]`

  const { hh, mm, ss, seconds, dateStr, isoStr, srText } = useMemo(() => {
    if (!time) {
      return {
        hh: ['0', '0'] as [string, string],
        mm: ['0', '0'] as [string, string],
        ss: ['0', '0'] as [string, string],
        seconds: 0,
        dateStr: '',
        isoStr: '',
        srText: '',
      }
    }
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    const padded = pad(h)
    const paddedM = pad(m)
    const paddedS = pad(s)
    return {
      hh: [padded[0], padded[1]] as [string, string],
      mm: [paddedM[0], paddedM[1]] as [string, string],
      ss: [paddedS[0], paddedS[1]] as [string, string],
      seconds: s,
      dateStr: formatDate(time),
      isoStr: time.toISOString(),
      srText: `Het is ${h} uur, ${m} minuten en ${s} seconden`,
    }
  }, [time])

  return (
    <div
      className={`${jetbrains.variable} relative flex flex-col items-center justify-center min-h-screen overflow-hidden`}
      style={{ background: '#050810' }}
    >
      <BackgroundLayer />
      <ScanlineOverlay />

      {/* Mount fade wrapper */}
      <div
        className="relative z-10 flex flex-col items-center gap-5 px-6 sm:px-10 py-8 sm:py-12 mount-fade"
        style={{
          boxShadow: '0 0 80px #00f5ff08, 0 0 160px #00f5ff04',
        }}
      >
        {/* Hour flash effect */}
        {hourFlash && (
          <div
            className="fixed inset-0 pointer-events-none z-20"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, #00f5ff18 0%, transparent 70%)',
            }}
          />
        )}

        {/* Date */}
        {time && <DateDisplay dateStr={dateStr} fontClass={fontClass} />}

        {/* Time display */}
        <time
          dateTime={isoStr}
          className={`flex items-center gap-1 sm:gap-2 md:gap-4 ${minuteFlash ? 'brightness-flash' : ''}`}
          style={{
            filter: minuteFlash ? 'brightness(1.3)' : 'brightness(1)',
            transition: 'filter 0.4s ease-out',
          }}
        >
          {/* Screen reader only */}
          <span className="sr-only">{srText}</span>

          {/* HH */}
          <div className="flex items-center">
            <ClockDigit value={hh[0]} fontClass={fontClass} />
            <ClockDigit value={hh[1]} fontClass={fontClass} />
          </div>

          <ClockColon fontClass={fontClass} />

          {/* MM */}
          <div className="flex items-center">
            <ClockDigit value={mm[0]} fontClass={fontClass} />
            <ClockDigit value={mm[1]} fontClass={fontClass} />
          </div>

          <ClockColon fontClass={fontClass} />

          {/* SS */}
          <div className="flex items-center">
            <ClockDigit value={ss[0]} fontClass={fontClass} />
            <ClockDigit value={ss[1]} fontClass={fontClass} />
          </div>
        </time>

        {/* Labels */}
        <div
          className="flex items-center w-full"
          style={{ gap: 'clamp(1.5rem, 8vw, 5rem)', justifyContent: 'center' }}
        >
          {['HOURS', 'MINUTES', 'SECONDS'].map((label) => (
            <span
              key={label}
              className={`${fontClass} text-[#4a6a7a] text-[0.65rem] tracking-[0.4em] uppercase hidden sm:block`}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Seconds progress bar */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mount-fade" style={{ animationDelay: '1.2s' }}>
          <SecondsBar seconds={seconds} />
        </div>

        {/* ARIA live region — updates every minute only */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {time && seconds === 0 ? srText : ''}
        </div>
      </div>
    </div>
  )
}
