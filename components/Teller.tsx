
'use client';

// ============================================================
// Teller — Één tellervak (rood, groen of blauw)
// Toont de huidige stand en heeft plus, min en reset knoppen.
// Ondersteunt animaties en is volledig toegankelijk.
// ============================================================

import { TellerKleur } from './TellerApp';

// Kleur-configuratie voor elke teller
const KLEUR_INSTELLINGEN: Record<
  TellerKleur,
  {
    naam: string;
    emoji: string;
    achtergrond: string;
    rand: string;
    tekst: string;
    plusKnop: string;
    minKnop: string;
    resetKnop: string;
    getal: string;
    label: string;
  }
> = {
  rood: {
    naam: 'Rode teller',
    emoji: '🔴',
    achtergrond: 'bg-red-50',
    rand: 'border-red-400',
    tekst: 'text-red-700',
    plusKnop:
      'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white shadow-red-300',
    minKnop:
      'bg-red-200 hover:bg-red-300 active:bg-red-400 text-red-800 shadow-red-200',
    resetKnop:
      'bg-white hover:bg-red-100 active:bg-red-200 text-red-600 border-2 border-red-400',
    getal: 'text-red-600',
    label: 'Rood',
  },
  groen: {
    naam: 'Groene teller',
    emoji: '🟢',
    achtergrond: 'bg-green-50',
    rand: 'border-green-400',
    tekst: 'text-green-700',
    plusKnop:
      'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-green-300',
    minKnop:
      'bg-green-200 hover:bg-green-300 active:bg-green-400 text-green-800 shadow-green-200',
    resetKnop:
      'bg-white hover:bg-green-100 active:bg-green-200 text-green-600 border-2 border-green-400',
    getal: 'text-green-600',
    label: 'Groen',
  },
  blauw: {
    naam: 'Blauwe teller',
    emoji: '🔵',
    achtergrond: 'bg-blue-50',
    rand: 'border-blue-400',
    tekst: 'text-blue-700',
    plusKnop:
      'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-blue-300',
    minKnop:
      'bg-blue-200 hover:bg-blue-300 active:bg-blue-400 text-blue-800 shadow-blue-200',
    resetKnop:
      'bg-white hover:bg-blue-100 active:bg-blue-200 text-blue-600 border-2 border-blue-400',
    getal: 'text-blue-600',
    label: 'Blauw',
  },
};

interface TellerProps {
  kleur: TellerKleur;
  waarde: number;
  isGeanimeerd: boolean;
  onPlus: () => void;
  onMin: () => void;
  onReset: () => void;
}

export default function Teller({
  kleur,
  waarde,
  isGeanimeerd,
  onPlus,
  onMin,
  onReset,
}: TellerProps) {
  const instellingen = KLEUR_INSTELLINGEN[kleur];

  return (
    // Kaartje voor één teller
    <article
      className={`
        flex-1 rounded-3xl border-4 ${instellingen.achtergrond} ${instellingen.rand}
        p-6 flex flex-col items-center gap-5
        shadow-xl transition-transform duration-200
        ${isGeanimeerd ? 'scale-105' : 'scale-100'}
      `}
      aria-label={instellingen.naam}
      role="region"
    >
      {/* Naam van de teller met emoji */}
      <h2
        className={`text-2xl font-bold ${instellingen.tekst} flex items-center gap-2`}
      >
        <span aria-hidden="true">{instellingen.emoji}</span>
        {instellingen.label}
      </h2>

      {/* Het getal — met bounce-animatie bij verandering */}
      <div
        className={`
          w-36 h-36 rounded-full flex items-center justify-center
          border-4 ${instellingen.rand} bg-white shadow-inner
          transition-all duration-300
          ${isGeanimeerd ? 'scale-110 shadow-2xl' : 'scale-100'}
        `}
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${instellingen.label} teller staat op ${waarde}`}
      >
        <span
          className={`
            text-5xl font-black ${instellingen.getal}
            transition-all duration-300
            ${isGeanimeerd ? 'scale-125' : 'scale-100'}
          `}
          style={{
            // Extra bounce-effect via inline animatie
            transform: isGeanimeerd ? 'scale(1.2) rotate(-3deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {waarde}
        </span>
      </div>

      {/* Voortgangsbalk richting 100 */}
      <div
        className="w-full"
        role="progressbar"
        aria-valuenow={Math.min(waarde, 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${instellingen.label} voortgang naar 100`}
      >
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className={`h-4 rounded-full transition-all duration-500 ${
              kleur === 'rood'
                ? 'bg-red-500'
                : kleur === 'groen'
                ? 'bg-green-500'
                : 'bg-blue-500'
            }`}
            style={{ width: `${Math.min((waarde / 100) * 100, 100)}%` }}
          />
        </div>
        <p className={`text-xs text-center mt-1 ${instellingen.tekst}`}>
          {waarde >= 100 ? '🎉 100 bereikt!' : `${Math.min(waarde, 100)}/100`}
        </p>
      </div>

      {/* Plus-knop — grote, duidelijke knop voor kinderhanden */}
      <button
        onClick={onPlus}
        className={`
          w-full py-5 rounded-2xl text-3xl font-black
          ${instellingen.plusKnop}
          shadow-lg active:shadow-md
          transition-all duration-150 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-offset-2
          ${kleur === 'rood' ? 'focus:ring-red-400' : kleur === 'groen' ? 'focus:ring-green-400' : 'focus:ring-blue-400'}
        `}
        aria-label={`${instellingen.label} teller verhogen met 1. Huidige waarde: ${waarde}`}
      >
        + 1
      </button>

      {/* Min-knop */}
      <button
        onClick={onMin}
        disabled={waarde === 0}
        className={`
          w-full py-4 rounded-2xl text-2xl font-bold
          ${instellingen.minKnop}
          shadow-md active:shadow-sm
          transition-all duration-150 active:scale-95
          disabled:opacity-40 disabled:cursor-not-allowed
          focus:outline-none focus:ring-4 focus:ring-offset-2
          ${kleur === 'rood' ? 'focus:ring-red-400' : kleur === 'groen' ? 'focus:ring-green-400' : 'focus:ring-blue-400'}
        `}
        aria-label={`${instellingen.label} teller verlagen met 1. Huidige waarde: ${waarde}`}
        aria-disabled={waarde === 0}
      >
        − 1
      </button>

      {/* Reset-knop */}
      <button
        onClick={onReset}
        className={`
          w-full py-3 rounded-2xl text-lg font-semibold
          ${instellingen.resetKnop}
          shadow-sm
          transition-all duration-150 active:scale-95
          focus:outline-none focus:ring-4 focus:ring-offset-2
          ${kleur === 'rood' ? 'focus:ring-red-400' : kleur === 'groen' ? 'focus:ring-green-400' : 'focus:ring-blue-400'}
        `}
        aria-label={`${instellingen.label} teller terugzetten naar nul`}
      >
        🔄 Reset
      </button>
    </article>
  );
}
