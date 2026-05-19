
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  dayName: string;
  dateStr: string;
  ampm: string;
  timezone: string;
  prevSeconds: string;
}

function getTimeState(): TimeState {
  const now = new Date();
  const h24 = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const hours = String(h24 % 12 || 12).padStart(2, '0');
  const minutes = String(m).padStart(2, '0');
  const seconds = String(s).padStart(2, '0');
  const ampm = h24 >= 12 ? 'PM' : 'AM';

  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dayName = days[now.getDay()];
  const dateStr = `${String(now.getDate()).padStart(2, '0')} / ${months[now.getMonth()]} / ${now.getFullYear()}`;

  const tzOffset = -now.getTimezoneOffset();
  const tzSign = tzOffset >= 0 ? '+' : '-';
  const tzHours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
  const tzMins = String(Math.abs(tzOffset) % 60).padStart(2, '0');
  const timezone = `UTC${tzSign}${tzHours}:${tzMins}`;

  return { hours, minutes, seconds, dayName, dateStr, ampm, timezone, prevSeconds: seconds };
}

export default function CyberpunkClock() {
  const [time, setTime] = useState<TimeState | null>(null);
  const [secKey, setSecKey] = useState(0);
  const [flickering, setFlickering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const flickerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Bug 2 fix: set initial time on client only (avoids hydration mismatch)
    setTime(getTimeState());

    const tick = () => {
      const next = getTimeState();
      setTime(prev => {
        if (prev && prev.seconds !== next.seconds) {
          setSecKey(k => k + 1);
        }
        return next;
      });
    };

    // Bug 1 fix: hoist both IDs to outer scope so cleanup can clear both
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const now = Date.now();
    const delay = 1000 - (now % 1000);
    const alignTimeout = setTimeout(() => {
      tick();
      intervalId = setInterval(tick, 1000);
    }, delay);

    return () => {
      clearTimeout(alignTimeout);
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, []);

  const scheduleFlicker = useCallback(() => {
    if (reducedMotion) return;
    const delay = (8 + Math.random() * 7) * 1000;
    flickerTimerRef.current = setTimeout(() => {
      setFlickering(true);
      setTimeout(() => {
        setFlickering(false);
        scheduleFlicker();
      }, 80);
    }, delay);
  }, [reducedMotion]);

  useEffect(() => {
    scheduleFlicker();
    return () => {
      if (flickerTimerRef.current) clearTimeout(flickerTimerRef.current);
    };
  }, [scheduleFlicker]);

  const ariaLabel = `Huidige tijd: ${time.hours} uur ${time.minutes} minuten ${time.seconds} seconden`;

  const cyanGlow: React.CSSProperties = {
    textShadow: '0 0 7px #00f5ff, 0 0 10px #00f5ff, 0 0 21px #00f5ff, 0 0 42px #0fa, 0 0 82px #0fa',
    opacity: flickering ? 0.7 : 1,
    transition: flickering ? 'opacity 80ms' : 'opacity 80ms',
  };

  const greenGlow: React.CSSProperties = {
    textShadow: '0 0 7px #39ff14, 0 0 10px #39ff14, 0 0 21px #39ff14',
  };

  const gridBg: React.CSSProperties = {
    backgroundImage:
      'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
  };

  const cardShadow: React.CSSProperties = {
    boxShadow:
      '0 0 0 1px #0d4f5c, 0 0 40px rgba(0,245,255,0.08), inset 0 0 60px rgba(0,0,0,0.4)',
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#050a0e]"
      style={gridBg}
    >
      {/* Clock card */}
      <div
        className="clock-card relative max-w-3xl w-full mx-4 bg-[#0a1520] border border-[#0d4f5c] overflow-hidden"
        style={cardShadow}
      >
        {/* Scanlines overlay */}
        <div
          className="scanlines absolute inset-0 pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Scanline sweep */}
        {!reducedMotion && (
          <div
            className="scan-sweep absolute left-0 right-0 h-px pointer-events-none z-20"
            style={{ background: 'rgba(0,245,255,0.3)' }}
            aria-hidden="true"
          />
        )}

        {/* Corner brackets */}
        <div className="corner-tl absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#00f5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px #00f5ff' }} />
        <div className="corner-tr absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#00f5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px #00f5ff' }} />
        <div className="corner-bl absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#00f5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px #00f5ff' }} />
        <div className="corner-br absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#00f5ff]" aria-hidden="true" style={{ boxShadow: '0 0 6px #00f5ff' }} />

        {/* Side accents */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#00f5ff]"
          aria-hidden="true"
          style={{ boxShadow: '0 0 8px #00f5ff, 0 0 20px #00a8b5' }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#00f5ff]"
          aria-hidden="true"
          style={{ boxShadow: '0 0 8px #00f5ff, 0 0 20px #00a8b5' }}
        />

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#0d4f5c]">
          <span
            className="text-[10px] tracking-[0.3em] text-[#4a7a8a] uppercase font-jetbrains"
          >
            SYS.CLOCK v2.4.1
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[#39ff14] text-[10px] ${reducedMotion ? '' : 'status-dot-pulse'}`}
              aria-hidden="true"
            >
              ●
            </span>
            <span className="text-[10px] tracking-[0.3em] text-[#4a7a8a] uppercase font-jetbrains">
              ONLINE
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="px-6 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-12">
          {/* Primary time display */}
          <div
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            aria-label={ariaLabel}
            className="flex items-end justify-center gap-2"
          >
            {/* Hours */}
            <span
              className="text-[5rem] sm:text-[7rem] lg:text-[10rem] font-bold tracking-[0.15em] text-[#00f5ff] font-jetbrains leading-none select-none"
              style={cyanGlow}
              aria-hidden="true"
            >
              {time.hours}
            </span>

            {/* Separator colon */}
            <span
              className={`text-[4rem] sm:text-[6rem] lg:text-[8rem] font-thin text-[#00f5ff] font-jetbrains leading-none pb-3 sm:pb-4 select-none ${reducedMotion ? '' : 'colon-blink'}`}
              style={{ textShadow: '0 0 8px #00f5ff, 0 0 20px #00f5ff' }}
              aria-hidden="true"
            >
              :
            </span>

            {/* Minutes */}
            <span
              className="text-[5rem] sm:text-[7rem] lg:text-[10rem] font-bold tracking-[0.15em] text-[#00f5ff] font-jetbrains leading-none select-none"
              style={cyanGlow}
              aria-hidden="true"
            >
              {time.minutes}
            </span>

            {/* Seconds — digit slide per tick */}
            <span
              key={secKey}
              className={`text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-bold tracking-[0.1em] text-[#39ff14] font-jetbrains leading-none pb-2 sm:pb-3 lg:pb-4 self-end select-none ${reducedMotion ? '' : 'digit-slide-in'}`}
              style={greenGlow}
              aria-hidden="true"
            >
              {time.seconds}
            </span>
          </div>

          {/* Secondary info bar */}
          <div className="mt-6 border-t border-[#0d4f5c] pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
            {/* Left: day + date */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs tracking-[0.4em] text-[#4a7a8a] uppercase font-sharetech">
                {displayTime.dayName}
              </span>
              <span className="text-base tracking-[0.25em] text-[#4a7a8a] font-sharetech">
                {displayTime.dateStr}
              </span>
            </div>

            {/* Right: AM/PM badge + timezone */}
            <div className="flex flex-col items-start sm:items-end gap-0.5">
              <span
                className="border border-[#bf00ff] px-2 py-0.5 text-sm font-bold tracking-[0.3em] text-[#bf00ff] font-sharetech"
                style={{ filter: 'drop-shadow(0 0 6px #bf00ff)' }}
              >
                {displayTime.ampm}
              </span>
              <span className="text-xs tracking-[0.35em] text-[#4a7a8a] uppercase font-sharetech">
                {displayTime.timezone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
