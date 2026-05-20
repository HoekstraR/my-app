
'use client';

import { useState, useEffect } from 'react';

interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  dateString: string;
  dayString: string;
  timezone: string;
  isoString: string;
  ariaLabel: string;
}

const DAYS_NL = [
  'ZONDAG', 'MAANDAG', 'DINSDAG', 'WOENSDAG',
  'DONDERDAG', 'VRIJDAG', 'ZATERDAG',
];

const MONTHS_NL = [
  'JAN', 'FEB', 'MRT', 'APR', 'MEI', 'JUN',
  'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC',
];

function getTimeState(now: Date): TimeState {
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  const day = DAYS_NL[now.getDay()];
  const date = `${day.slice(0, 2)} ${String(now.getDate()).padStart(2, '0')} ${MONTHS_NL[now.getMonth()]} ${now.getFullYear()}`;

  let tz = 'UTC';
  try {
    tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    /* fallback */
  }

  return {
    hours: h,
    minutes: m,
    seconds: s,
    dateString: date,
    dayString: day,
    timezone: tz,
    isoString: `${h}:${m}:${s}`,
    ariaLabel: `Huidige tijd: ${now.getHours()} uur, ${now.getMinutes()} minuten en ${now.getSeconds()} seconden`,
  };
}

export default function Clock() {
  const [time, setTime] = useState<TimeState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTime(getTimeState(new Date()));
    const timer = setTimeout(() => setMounted(true), 50);
    const interval = setInterval(() => {
      setTime(getTimeState(new Date()));
    }, 1000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!time) {
    return (
      <div
        style={{ backgroundColor: '#050810', minHeight: '100vh' }}
        className="flex items-center justify-center"
      />
    );
  }

  return (
    <main
      className="scanlines relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#050810',
        backgroundImage:
          'radial-gradient(circle, rgba(0,255,200,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Glow blob 1 — cyaan, links boven */}
      <div
        aria-hidden="true"
        className="blob-float"
        style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          backgroundColor: '#00FFC8',
          opacity: 0.06,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          animationDuration: '8s',
        }}
      />

      {/* Glow blob 2 — blauw, rechts onder */}
      <div
        aria-hidden="true"
        className="blob-float-reverse"
        style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: '#00B4FF',
          opacity: 0.06,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          animationDuration: '8s',
        }}
      />

      {/* Glasspaneel */}
      <div
        className="clock-panel relative z-10 w-[90vw] max-w-2xl rounded-2xl transition-all duration-500"
        style={{
          backdropFilter: 'blur(24px)',
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow:
            '0 0 80px rgba(0,255,200,0.08), 0 0 160px rgba(0,255,200,0.04), inset 0 1px 0 rgba(255,255,255,0.08)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms, border-color 500ms',
        }}
      >
        {/* Logo — rechtsboven in glasspaneel */}
        <img
          src="/Logo.png"
          alt="Logo"
          className="absolute top-3 right-3 h-10 w-auto object-contain"
          aria-label="Logo"
        />

        {/* Hover-state lichte border — via CSS class */}
        <div className="clock-inner px-6 py-8 sm:px-10 sm:py-9 lg:px-12 lg:py-10"></div>

          {/* Label */}
          <p
            className="mb-6 text-xs font-normal tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Orbitron', monospace",
              color: '#5A8A7A',
            }}
          >
            System Time
          </p>

          {/* Tijdsweergave */}
          <time
            dateTime={time.isoString}
            aria-label={time.ariaLabel}
            aria-live="polite"
            className="block"
          >
            {/* Hoofdtijd: uren, dubbele punt, minuten + seconden */}
            <div className="flex flex-wrap items-end gap-x-0 gap-y-2">
              {/* Uren + dubbele punt + minuten */}
              <div className="flex items-center">
                <span
                  className="glow-cyan tabular-nums"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    fontSize: 'clamp(4.5rem, 12vw, 10rem)',
                    color: '#E8FFF8',
                    lineHeight: 1,
                  }}
                >
                  {time.hours}
                </span>

                {/* Knipperend dubbele punt */}
                <span
                  className="blink mx-1 sm:mx-2"
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 900,
                    fontSize: 'clamp(4rem, 10vw, 9rem)',
                    color: '#00FFC8',
                    textShadow: '0 0 20px #00FFC8, 0 0 40px rgba(0,255,200,0.5)',
                    lineHeight: 1,
                    display: 'inline-block',
                    width: '0.3em',
                    textAlign: 'center',
                  }}
                >
                  :
                </span>

                <span
                  className="glow-blue tabular-nums"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    fontSize: 'clamp(4.5rem, 12vw, 10rem)',
                    color: '#E8FFF8',
                    lineHeight: 1,
                  }}
                >
                  {time.minutes}
                </span>
              </div>

              {/* Seconden — iets kleiner, uitgelijd onderaan */}
              <div
                className="flex items-end ml-3 sm:ml-4"
                style={{ paddingBottom: 'clamp(0.4rem, 1vw, 0.6rem)' }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 4vw, 3.5rem)',
                    color: '#5A8A7A',
                    lineHeight: 1,
                    marginRight: '0.15em',
                  }}
                >
                  :
                </span>
                <span
                  className="glow-magenta tabular-nums"
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    color: '#E8FFF8',
                    lineHeight: 1,
                  }}
                >
                  {time.seconds}
                </span>
              </div>
            </div>
          </time>

          {/* Scheidingslijn */}
          <hr
            className="my-6 border-0"
            style={{
              height: '1px',
              background:
                'linear-gradient(to right, transparent, rgba(0,255,200,0.3), rgba(0,180,255,0.2), transparent)',
            }}
            aria-hidden="true"
          />

          {/* Datum + dag */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(10px, 2vw, 14px)',
                letterSpacing: '0.1em',
                color: '#A0C4BB',
              }}
            >
              {time.dateString}
            </span>
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(10px, 2vw, 14px)',
                letterSpacing: '0.15em',
                color: '#A0C4BB',
              }}
            >
              {time.dayString}
            </span>
          </div>

          {/* Statusbalk */}
          <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              {/* LIVE stip */}
              <div
                className="animate-pulse"
                aria-hidden="true"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF00A8',
                  boxShadow: '0 0 8px #FF00A8, 0 0 16px rgba(255,0,168,0.4)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: '#FF00A8',
                  textShadow: '0 0 10px rgba(255,0,168,0.5)',
                }}
              >
                LIVE
              </span>
            </div>

            {/* Timezone */}
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(9px, 1.5vw, 11px)',
                letterSpacing: '0.1em',
                color: '#5A8A7A',
              }}
            >
              {time.timezone}
            </span>
          </div>

        </div>
      </div>
    </main>
  );
}
