
'use client';

// ============================================================
// Totaal — Toont de som van alle drie de tellers
// Met een vrolijke animatie wanneer het totaal verandert.
// ============================================================

import { useEffect, useState } from 'react';

interface TotaalProps {
  totaal: number;
}

export default function Totaal({ totaal }: TotaalProps) {
  // Bijhouden of het totaal zojuist is veranderd (voor animatie)
  const [geanimeerd, setGeanimeerd] = useState(false);
  const [vorigTotaal, setVorigTotaal] = useState(totaal);

  useEffect(() => {
    if (totaal !== vorigTotaal) {
      // Start de animatie
      setGeanimeerd(true);
      setVorigTotaal(totaal);
      // Stop de animatie na 400ms
      const timer = setTimeout(() => setGeanimeerd(false), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [totaal, vorigTotaal]);

  return (
    <div
      className="flex justify-center mb-8 px-4"
      aria-live="polite"
      aria-label={`Totaal van alle tellers: ${totaal}`}
    >
      <div
        className={`
          bg-white rounded-3xl shadow-2xl border-4 border-purple-400
          px-10 py-5 flex items-center gap-4
          transition-all duration-300
          ${geanimeerd ? 'scale-110 border-purple-600 shadow-purple-300' : 'scale-100'}
        `}
      >
        {/* Stersticker */}
        <span className="text-4xl" aria-hidden="true">⭐</span>

        <div className="text-center">
          <p className="text-sm font-semibold text-purple-400 uppercase tracking-widest">
            Totaal
          </p>
          <p
            className="text-6xl font-black text-purple-700"
            style={{
              // Bouncy spring-animatie voor het getal
              transform: geanimeerd ? 'scale(1.2) rotate(2deg)' : 'scale(1) rotate(0deg)',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              display: 'inline-block',
            }}
          >
            {totaal}
          </p>
        </div>

        {/* Raketsymbool */}
        <span className="text-4xl" aria-hidden="true">🚀</span>
      </div>
    </div>
  );
}
