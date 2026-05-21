
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
        style={{ backgroundColor: '#FFF176', minHeight: '100vh' }}
        className="flex items-center justify-center"
      />
    );
  }

  return (
    <main
      className="scanlines relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#FFF176',
        backgroundImage:
          'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* Logo — fixed rechtsboven, buiten glasspaneel */}
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          width: '120px',
          height: 'auto',
        }}
      />

      {/* Glow blob 1 — oranje, links boven */}
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
          backgroundColor: '#FFA500',
          opacity: 0.22,
          filter: 'blur(120px)',
          pointerEvents: 'none',
          animationDuration: '8s',
        }}
      />

      {/* Glow blob 2 — amber, rechts onder */}
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
          backgroundColor: '#FFB300',
          opacity: 0.22,
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
          backgroundColor: 'rgba(255,255,255,0.35)',
          border: '1px solid rgba(0,0,0,0.12)',
          boxShadow:
            '0 0 80px rgba(180,100,0,0.1), 0 0 160px rgba(180,100,0,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms, border-color 500ms',
        }}
      >
        {/* Hover-state lichte border — via CSS class */}
        <div className="clock-inner px-6 py-8 sm:px-10 sm:py-9 lg:px-12 lg:py-10">

          {/* Label */}
          <p
            className="mb-6 text-xs font-normal tracking-[0.3em] uppercase"
            style={{
              fontFamily: "'Orbitron', monospace",
              color: '#7A5800',
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
                    color: '#1A1200',
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
                    color: '#B45000',
                    textShadow: '0 0 16px rgba(180,80,0,0.5), 0 0 32px rgba(180,80,0,0.25)',
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
                    color: '#1A1200',
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
                    color: '#7A5800',
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
                    color: '#1A1200',
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
                'linear-gradient(to right, transparent, rgba(180,100,0,0.35), rgba(200,120,0,0.2), transparent)',
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
                color: '#5C3D00',
              }}
            >
              {time.dateString}
            </span>
            <span
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 'clamp(10px, 2vw, 14px)',
                letterSpacing: '0.15em',
                color: '#5C3D00',
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
                  backgroundColor: '#CC0044',
                  boxShadow: '0 0 8px rgba(200,0,60,0.7), 0 0 16px rgba(200,0,60,0.35)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontWeight: 700,
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: '#CC0044',
                  textShadow: '0 0 10px rgba(200,0,60,0.4)',
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
                color: '#7A5800',
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
