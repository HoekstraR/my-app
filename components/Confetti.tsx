
'use client';

// Confetti-animatie die afspeelt bij het bereiken van 100
// Gebruikt pure CSS-animaties en willekeurige posities voor een feestelijk effect

import { useEffect, useState } from 'react';

// Type voor elk confetti-deeltje
interface ConfettiDeeltje {
  id: number;
  x: number;         // Horizontale startpositie (%)
  vertraging: number; // Animatievertraging (s)
  duur: number;      // Animatieduur (s)
  kleur: string;     // Kleur van het deeltje
  grootte: number;   // Grootte in pixels
  vorm: 'vierkant' | 'cirkel' | 'ster'; // Vorm van het deeltje
}

// Beschikbare vrolijke kleuren voor de confetti
const CONFETTI_KLEUREN = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF',
  '#FF922B', '#CC5DE8', '#F06595', '#74C0FC',
  '#51CF66', '#FCC419',
];

// Beschikbare vormen
const VORMEN: ConfettiDeeltje['vorm'][] = ['vierkant', 'cirkel', 'ster'];

// Maak een willekeurig getal binnen een bereik
function willekeurig(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

// Genereer de confetti-deeltjes
function maakDeeltjes(aantal: number): ConfettiDeeltje[] {
  return Array.from({ length: aantal }, (_, i) => ({
    id: i,
    x: willekeurig(0, 100),
    vertraging: willekeurig(0, 2.5),
    duur: willekeurig(2.5, 4.5),
    kleur: CONFETTI_KLEUREN[Math.floor(Math.random() * CONFETTI_KLEUREN.length)],
    grootte: Math.floor(willekeurig(8, 18)),
    vorm: VORMEN[Math.floor(Math.random() * VORMEN.length)],
  }));
}

export default function Confetti() {
  // Genereer eenmalig de deeltjes bij het mounten van het component
  const [deeltjes] = useState<ConfettiDeeltje[]>(() => maakDeeltjes(80));

  // Zorg dat de pagina niet meescrollt door de confetti
  useEffect(() => {
    return undefined;
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-50"
      aria-hidden="true" // Decoratief — onzichtbaar voor schermlezers
    >
      {deeltjes.map((deeltje) => {
        // Bepaal de CSS-stijl op basis van de vorm
        const basisStijl: React.CSSProperties = {
          position: 'absolute',
          top: '-20px',
          left: `${deeltje.x}%`,
          width: `${deeltje.grootte}px`,
          height: `${deeltje.grootte}px`,
          backgroundColor: deeltje.kleur,
          animationName: 'confettiVal',
          animationDuration: `${deeltje.duur}s`,
          animationDelay: `${deeltje.vertraging}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          borderRadius: deeltje.vorm === 'cirkel' ? '50%' : deeltje.vorm === 'ster' ? '0' : '2px',
          transform: deeltje.vorm === 'ster' ? 'rotate(45deg)' : `rotate(${willekeurig(0, 360)}deg)`,
        };

        return <div key={deeltje.id} style={basisStijl} />;
      })}

      {/* Animatie-definitie voor de vallende confetti */}
      <style>{`
        @keyframes confettiVal {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
