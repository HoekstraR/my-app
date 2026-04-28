
'use client';

// ============================================================
// Geschiedenis — Toont de laatste 20 acties in een paneel
// Elke actie laat zien: welke teller, wat er gebeurde, en wanneer.
// ============================================================

import { HistorieItem, TellerKleur } from './TellerApp';

interface GeschiedenisProps {
  items: HistorieItem[];
}

// Kleur- en emoji-configuratie per teller
const TELLER_STIJL: Record<
  TellerKleur,
  { emoji: string; tekst: string; achtergrond: string; rand: string }
> = {
  rood: {
    emoji: '🔴',
    tekst: 'text-red-700',
    achtergrond: 'bg-red-50',
    rand: 'border-red-200',
  },
  groen: {
    emoji: '🟢',
    tekst: 'text-green-700',
    achtergrond: 'bg-green-50',
    rand: 'border-green-200',
  },
  blauw: {
    emoji: '🔵',
    tekst: 'text-blue-700',
    achtergrond: 'bg-blue-50',
    rand: 'border-blue-200',
  },
};

// Actie-emoji's: plus = omhoog, min = omlaag, reset = cirkel
function actieEmoji(actie: HistorieItem['actie']): string {
  if (actie === '+1') return '⬆️';
  if (actie === '-1') return '⬇️';
  return '🔄';
}

// Maak een leesbare tijdstempel: "14:32:05"
function formatTijd(datum: Date): string {
  return datum.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Naam van de teller in het Nederlands met hoofdletter
function tellerNaam(kleur: TellerKleur): string {
  const namen: Record<TellerKleur, string> = {
    rood: 'Rood',
    groen: 'Groen',
    blauw: 'Blauw',
  };
  return namen[kleur];
}

export default function Geschiedenis({ items }: GeschiedenisProps) {
  return (
    <div
      className="bg-white rounded-3xl shadow-xl border-4 border-purple-300 p-5 h-full"
      aria-label="Geschiedenis van alle acties"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {/* Koptekst van het paneel */}
      <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center gap-2">
        <span aria-hidden="true">📋</span>
        Geschiedenis
      </h2>

      {/* Als er nog geen acties zijn */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <span className="text-5xl mb-3" aria-hidden="true">👆</span>
          <p className="text-center text-sm font-medium">
            Druk op een knop om te beginnen!
          </p>
        </div>
      ) : (
        // Lijst van de laatste 20 acties
        <ol
          className="space-y-2 overflow-y-auto max-h-[calc(100vh-320px)]"
          aria-label="Lijst van recente acties"
        >
          {items.map((item, index) => {
            const stijl = TELLER_STIJL[item.teller];
            const isNieuwste = index === 0;

            return (
              <li
                key={item.id}
                className={`
                  rounded-xl border p-3 flex items-center gap-3
                  ${stijl.achtergrond} ${stijl.rand}
                  transition-all duration-300
                  ${isNieuwste ? 'ring-2 ring-purple-300 shadow-md' : 'opacity-90'}
                `}
                aria-label={`
                  ${tellerNaam(item.teller)} teller:
                  ${item.actie === '+1' ? 'omhoog' : item.actie === '-1' ? 'omlaag' : 'gereset'}
                  om ${formatTijd(item.tijdstempel)}.
                  Nieuwe waarde: ${item.nieuweWaarde}
                `}
              >
                {/* Teller-emoji */}
                <span className="text-xl" aria-hidden="true">
                  {stijl.emoji}
                </span>

                {/* Beschrijving van de actie */}
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${stijl.tekst}`}>
                    {tellerNaam(item.teller)}{' '}
                    <span aria-hidden="true">{actieEmoji(item.actie)}</span>{' '}
                    {item.actie === 'reset' ? 'reset' : item.actie}
                  </p>
                  <p className="text-xs text-gray-500">
                    Waarde: <strong>{item.nieuweWaarde}</strong> • {formatTijd(item.tijdstempel)}
                  </p>
                </div>

                {/* "Nieuw" badge voor de allerlaatste actie */}
                {isNieuwste && (
                  <span
                    className="text-xs bg-purple-500 text-white rounded-full px-2 py-0.5 font-bold shrink-0"
                    aria-label="Nieuwste actie"
                  >
                    Nieuw
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      )}

      {/* Teller voor het aantal acties */}
      {items.length > 0 && (
        <p className="text-xs text-gray-400 text-center mt-3">
          {items.length} van 20 acties weergegeven
        </p>
      )}
    </div>
  );
}
