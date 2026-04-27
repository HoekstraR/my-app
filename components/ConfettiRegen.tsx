
'use client';

// =====================================================================
// ConfettiRegen — Confetti-animatie voor de feestmodus
// Gebruikt pure CSS-animaties via inline stijlen (geen externe bibliotheek)
// =====================================================================

import { useMemo } from 'react';

// Kleurenlijst voor de confettistukjes
const CONFETTI_KLEUREN = [
  '#ff6b6b', // rood
  '#ffd93d', // geel
  '#6bcb77', // groen
  '#4d96ff', // blauw
  '#ff6bff', // roze
  '#ff9f43', // oranje
  '#a29bfe', // paars
  '#00cec9', // turquoise
];

// Type voor één confettideeltje
interface ConfettiDeeltje {
  id: number;
  kleur: string;
  links: number;       // horizontale startpositie in %
  vertraging: number;  // animatie-vertraging in seconden
  duur: number;        // animatieduur in seconden
  grootte: number;     // grootte in pixels
  rotatie: number;     // beginrotatie in graden
  vorm: 'vierkant' | 'cirkel' | 'ruit';
}

// Genereer eenmalig een lijst van confettideeltjes
function genereerDeeltjes(aantal: number): ConfettiDeeltje[] {
  return Array.from({ length: aantal }, (_, i) => ({
    id: i,
    kleur: CONFETTI_KLEUREN[Math.floor(Math.random() * CONFETTI_KLEUREN.length)],
    links: Math.random() * 100,
    vertraging: Math.random() * 3,
    duur: 2 + Math.random() * 3,
    grootte: 8 + Math.random() * 12,
    rotatie: Math.random() * 360,
    vorm: (['vierkant', 'cirkel', 'ruit'] as const)[Math.floor(Math.random() * 3)],
  }));
}

export default function ConfettiRegen() {
  // Genereer 80 deeltjes (eenmalig via useMemo)
  const deeltjes = useMemo(() => genereerDeeltjes(80), []);

  return (
    <>
      {/* CSS-animaties voor de vallende confetti */}
      <style>{`
        @keyframes confettiVal {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes confettiSlingeren {
          0%, 100% { margin-left: 0px; }
          25% { margin-left: 30px; }
          75% { margin-left: -30px; }
        }

        .confetti-deeltje {
          animation:
            confettiVal var(--duur) var(--vertraging) linear forwards,
            confettiSlingeren var(--slingerduur) var(--vertraging) ease-in-out infinite;
        }
      `}</style>

      {/* Confetti-overlay (pointer-events: none zodat knoppen klikbaar blijven) */}
      <div
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        {deeltjes.map((deeltje) => (
          <div
            key={deeltje.id}
            className="confetti-deeltje absolute top-0"
            style={{
              left: `${deeltje.links}%`,
              width: `${deeltje.grootte}px`,
              height: `${deeltje.grootte}px`,
              backgroundColor: deeltje.kleur,
              borderRadius:
                deeltje.vorm === 'cirkel'
                  ? '50%'
                  : deeltje.vorm === 'ruit'
                  ? '0'
                  : '2px',
              transform:
                deeltje.vorm === 'ruit'
                  ? `rotate(${deeltje.rotatie}deg)`
                  : `rotate(${deeltje.rotatie}deg)`,
              '--duur': `${deeltje.duur}s`,
              '--vertraging': `${deeltje.vertraging}s`,
              '--slingerduur': `${deeltje.duur * 0.6}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}
