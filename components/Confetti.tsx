
'use client';

// ============================================================
// Confetti — Feestmodus! Laat confetti regenen wanneer een
// teller 100 bereikt. Gebruikt CSS-animaties en willekeurige
// posities voor een vrolijk effect.
// ============================================================

import { useEffect, useState } from 'react';
import { TellerKleur } from './TellerApp';

interface ConfettiDeeltje {
  id: number;
  x: number;        // Horizontale startpositie in procenten
  delay: number;    // Vertraging in seconden
  duur: number;     // Valsnelheid in seconden
  kleur: string;    // CSS-kleur van het deeltje
  grootte: number;  // Grootte in pixels
  vorm: 'vierkant' | 'cirkel' | 'ster'; // Vorm van het deeltje
}

// Alle confetti-kleuren (vrolijk en kleurrijk!)
const CONFETTI_KLEUREN = [
  '#FF6B6B', // Rood
  '#4ECDC4', // Turquoise
  '#45B7D1', // Lichtblauw
  '#96CEB4', // Mintgroen
  '#FFEAA7', // Geel
  '#DDA0DD', // Paars
  '#98D8C8', // Mint
  '#F7DC6F', // Goudgeel
  '#BB8FCE', // Lavendel
  '#85C1E9', // Hemelsblauw
];

interface ConfettiProps {
  tellerKleur: TellerKleur;
}

export default function Confetti({ tellerKleur }: ConfettiProps) {
  // Genereer 80 willekeurige confetti-deeltjes
  const [deeltjes] = useState<ConfettiDeeltje[]>(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duur: 2 + Math.random() * 3,
      kleur: CONFETTI_KLEUREN[Math.floor(Math.random() * CONFETTI_KLEUREN.length)],
      grootte: 8 + Math.floor(Math.random() * 12),
      vorm: (['vierkant', 'cirkel', 'ster'] as const)[Math.floor(Math.random() * 3)],
    }))
  );

  // Naam van de teller voor het felicitatiebericht
  const namen: Record<TellerKleur, string> = {
    rood: 'rode',
    groen: 'groene',
    blauw: 'blauwe',
  };

  return (
    // Overlay over het hele scherm
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      role="alert"
      aria-live="assertive"
      aria-label={`Gefeliciteerd! De ${namen[tellerKleur]} teller heeft 100 bereikt!`}
    >
      {/* Felicitatiebanner in het midden */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-400 px-10 py-6 text-center"
          style={{
            animation: 'feest-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          }}
          aria-hidden="true"
        >
          <p className="text-5xl mb-2">🎉🏆🎉</p>
          <p className="text-3xl font-black text-yellow-600">HOERA!</p>
          <p className="text-lg font-bold text-gray-700 mt-1">
            De {namen[tellerKleur]} teller heeft{' '}
            <span className="text-purple-600">100</span> bereikt!
          </p>
        </div>
      </div>

      {/* Confetti-deeltjes */}
      {deeltjes.map((deeltje) => (
        <div
          key={deeltje.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${deeltje.x}%`,
            top: '-20px',
            width: `${deeltje.grootte}px`,
            height: `${deeltje.grootte}px`,
            backgroundColor: deeltje.kleur,
            borderRadius:
              deeltje.vorm === 'cirkel'
                ? '50%'
                : deeltje.vorm === 'ster'
                ? '0'
                : '2px',
            // Ster-vorm via clip-path
            clipPath:
              deeltje.vorm === 'ster'
                ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                : 'none',
            animation: `confetti-val ${deeltje.duur}s ${deeltje.delay}s ease-in forwards`,
          }}
        />
      ))}

      {/* CSS-animaties voor de confetti */}
      <style>{`
        @keyframes confetti-val {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(Math.random() * 720) + 360}deg);
            opacity: 0;
          }
        }

        @keyframes feest-bounce {
          0% {
            transform: scale(0.3) rotate(-10deg);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) rotate(3deg);
            opacity: 1;
          }
          80% {
            transform: scale(0.95) rotate(-1deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
