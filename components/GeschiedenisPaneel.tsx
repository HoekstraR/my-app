
'use client';

// =====================================================================
// GeschiedenisPaneel — Toont de laatste 20 acties in een zijpaneel
// Elke actie toont: welke teller, +1/-1/reset, tijdstempel
// =====================================================================

import type { GeschiedenisItem } from './TellerApp';

interface GeschiedenisPaneelProps {
  geschiedenis: GeschiedenisItem[];
  onWis: () => void;
}

// Formatteer een datum naar leesbare tijd (HH:MM:SS)
function formateerTijd(datum: Date): string {
  return datum.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

// Kleurmapping voor de actiebadge
const ACTIE_STIJL: Record<string, string> = {
  '+1': 'bg-green-100 text-green-700 border-green-300',
  '-1': 'bg-red-100 text-red-700 border-red-300',
  reset: 'bg-gray-100 text-gray-600 border-gray-300',
};

// Kleurmapping voor de teller-naam badge
const TELLER_KLEUR_STIJL: Record<string, string> = {
  rood: 'bg-red-500',
  groen: 'bg-green-500',
  blauw: 'bg-blue-500',
};

// Emoji per actie
const ACTIE_EMOJI: Record<string, string> = {
  '+1': '➕',
  '-1': '➖',
  reset: '↺',
};

export default function GeschiedenisPaneel({ geschiedenis, onWis }: GeschiedenisPaneelProps) {
  return (
    <aside
      className="xl:w-72 w-full bg-white rounded-3xl shadow-xl border-4 border-purple-200 p-4 flex flex-col"
      aria-label="Geschiedenis van acties"
      role="complementary"
    >
      {/* Paneelkoptekst */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-black text-purple-700">
          📋 Wat deed je?
        </h2>
        {geschiedenis.length > 0 && (
          <button
            onClick={onWis}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold px-3 py-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Wis alle geschiedenis"
          >
            Wis alles
          </button>
        )}
      </div>

      {/* Lege toestand */}
      {geschiedenis.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <span className="text-5xl mb-3" role="img" aria-label="Geen acties">
            🤷
          </span>
          <p className="text-gray-400 font-semibold text-sm">
            Nog niets gedaan!
          </p>
          <p className="text-gray-300 text-xs mt-1">
            Druk op + om te beginnen
          </p>
        </div>
      )}

      {/* Lijst van acties */}
      {geschiedenis.length > 0 && (
        <ol
          className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1"
          aria-label={`${geschiedenis.length} recente acties`}
        >
          {geschiedenis.map((item, volgnummer) => {
            const tellerBolletje = TELLER_KLEUR_STIJL[item.tellerKleur] ?? 'bg-gray-400';
            const actieBadge = ACTIE_STIJL[item.actie] ?? 'bg-gray-100 text-gray-600 border-gray-300';
            const actieEmoji = ACTIE_EMOJI[item.actie] ?? '?';

            return (
              <li
                key={item.id}
                className={`flex items-center gap-2 rounded-2xl border p-2 text-sm transition-all ${
                  volgnummer === 0 ? 'border-purple-300 bg-purple-50' : 'border-gray-100 bg-gray-50'
                }`}
                aria-label={`${item.tellerNaam} teller: ${item.actie === 'reset' ? 'gereset' : item.actie}, nieuwe waarde ${item.nieuweWaarde}, om ${formateerTijd(item.tijdstempel)}`}
              >
                {/* Gekleurde bolletje voor de teller */}
                <span
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${tellerBolletje}`}
                  aria-hidden="true"
                />

                {/* Teller-naam */}
                <span className="font-bold text-gray-700 flex-shrink-0 w-10 text-xs">
                  {item.tellerNaam}
                </span>

                {/* Actiebadge */}
                <span
                  className={`text-xs font-black px-2 py-0.5 rounded-full border ${actieBadge} flex-shrink-0`}
                  aria-hidden="true"
                >
                  {actieEmoji} {item.actie}
                </span>

                {/* Nieuwe waarde */}
                <span className="font-black text-gray-800 text-sm flex-shrink-0">
                  = {item.nieuweWaarde}
                </span>

                {/* Tijdstempel */}
                <span className="text-gray-400 text-xs ml-auto flex-shrink-0">
                  {formateerTijd(item.tijdstempel)}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      {/* Subtekst onderaan */}
      {geschiedenis.length > 0 && (
        <p className="text-center text-xs text-gray-300 mt-2 font-semibold">
          Laatste {geschiedenis.length} acties
        </p>
      )}
    </aside>
  );
}
