
'use client';

// =====================================================================
// TellerKaart — Toont één teller met plus, min en reset knoppen
// Heeft animatie wanneer de waarde verandert
// =====================================================================

import { useState, useEffect, useRef } from 'react';
import type { TellerData } from './TellerApp';

interface TellerKaartProps {
  teller: TellerData;
  index: number;
  onVerhoog: () => void;
  onVerlaag: () => void;
  onReset: () => void;
}

export default function TellerKaart({ teller, index, onVerhoog, onVerlaag, onReset }: TellerKaartProps) {
  // Animatiestatus bijhouden
  const [animatie, setAnimatie] = useState<'omhoog' | 'omlaag' | 'reset' | null>(null);
  const vorigeWaarde = useRef(teller.waarde);

  // Detecteer verandering en start animatie
  useEffect(() => {
    if (teller.waarde !== vorigeWaarde.current) {
      if (teller.waarde > vorigeWaarde.current) {
        setAnimatie('omhoog');
      } else if (teller.waarde < vorigeWaarde.current && vorigeWaarde.current !== 0) {
        setAnimatie('omlaag');
      } else {
        setAnimatie('reset');
      }
      vorigeWaarde.current = teller.waarde;

      // Animatie na 400ms stoppen
      const timer = setTimeout(() => setAnimatie(null), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [teller.waarde]);

  // Bepaal de animatieklasse op basis van de actie
  const getAnimatieKlasse = () => {
    switch (animatie) {
      case 'omhoog':
        return 'scale-125 text-green-600';
      case 'omlaag':
        return 'scale-75 text-red-600';
      case 'reset':
        return 'rotate-12 opacity-50';
      default:
        return '';
    }
  };

  // Kleurenmapping voor de rand van de kaart
  const randKleurMap: Record<string, string> = {
    rood: 'border-red-400',
    groen: 'border-green-400',
    blauw: 'border-blue-400',
  };

  // Schaduwkleur voor de kaart
  const schaduwKleurMap: Record<string, string> = {
    rood: 'shadow-red-200',
    groen: 'shadow-green-200',
    blauw: 'shadow-blue-200',
  };

  const randKleur = randKleurMap[teller.kleur] ?? 'border-gray-400';
  const schaduwKleur = schaduwKleurMap[teller.kleur] ?? 'shadow-gray-200';

  // Toetsenbord-shortcuts: R=reset, + of = verhoog, - verlaag
  const handleToets = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === '+' || event.key === '=') {
      onVerhoog();
    } else if (event.key === '-') {
      onVerlaag();
    } else if (event.key === 'r' || event.key === 'R') {
      onReset();
    }
  };

  return (
    <article
      className={`flex-1 rounded-3xl border-4 ${randKleur} ${teller.achtergrondKleur} shadow-xl ${schaduwKleur} p-6 flex flex-col items-center gap-4 transition-all duration-200`}
      aria-label={`${teller.naam} teller, huidige waarde: ${teller.waarde}`}
      onKeyDown={handleToets}
      tabIndex={0}
    >
      {/* Teller-emoji en naam */}
      <div className="text-center">
        <span className="text-5xl" role="img" aria-hidden="true">
          {teller.emoji}
        </span>
        <h2 className={`text-2xl font-black mt-1 ${teller.tekstKleur}`}>
          {teller.naam}
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Teller {index + 1} — toets: + / -
        </p>
      </div>

      {/* De tellerwaarde met animatie */}
      <div
        className={`text-8xl font-black ${teller.tekstKleur} tabular-nums transition-all duration-300 select-none ${getAnimatieKlasse()}`}
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Waarde: ${teller.waarde}`}
      >
        {teller.waarde}
      </div>

      {/* Feestster bij 100 */}
      {teller.waarde === 100 && (
        <p className="text-2xl animate-spin" aria-label="Honderd bereikt!">
          ⭐
        </p>
      )}

      {/* Voortgangsbalk (0 tot 100) */}
      <div
        className="w-full bg-white rounded-full h-4 overflow-hidden border-2 border-gray-200"
        role="progressbar"
        aria-valuenow={Math.min(teller.waarde, 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Voortgang naar 100: ${Math.min(teller.waarde, 100)}%`}
      >
        <div
          className={`h-full ${teller.knopKleur} transition-all duration-500 rounded-full`}
          style={{ width: `${Math.min(teller.waarde, 100)}%` }}
        />
      </div>

      {/* Knoppen: plus, min, reset */}
      <div className="flex gap-3 items-center">
        {/* Min-knop */}
        <button
          onClick={onVerlaag}
          disabled={teller.waarde <= 0}
          className={`w-16 h-16 rounded-2xl ${teller.knopKleur} ${teller.knopHoverKleur} text-white text-4xl font-black shadow-md transition-all duration-150 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-opacity-50`}
          aria-label={`${teller.naam} teller verlagen met 1`}
          style={{ focusRingColor: 'currentColor' } as React.CSSProperties}
        >
          −
        </button>

        {/* Plus-knop (groot en centraal) */}
        <button
          onClick={onVerhoog}
          className={`w-20 h-20 rounded-2xl ${teller.knopKleur} ${teller.knopHoverKleur} text-white text-5xl font-black shadow-lg transition-all duration-150 active:scale-90 focus:outline-none focus:ring-4 focus:ring-offset-2`}
          aria-label={`${teller.naam} teller verhogen met 1`}
        >
          +
        </button>

        {/* Reset-knop */}
        <button
          onClick={onReset}
          className="w-16 h-16 rounded-2xl bg-gray-400 hover:bg-gray-500 text-white text-2xl font-black shadow-md transition-all duration-150 active:scale-90 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2"
          aria-label={`${teller.naam} teller resetten naar nul`}
        >
          ↺
        </button>
      </div>
    </article>
  );
}
