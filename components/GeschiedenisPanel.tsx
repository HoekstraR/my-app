
'use client';

// Geschiedenispaneel — toont de laatste 20 acties
// Elke actie heeft een kleurcode, de actie zelf en een tijdstempel

import { GeschiedenisItem } from './TellerApp';

interface GeschiedenisPanelProps {
  geschiedenis: GeschiedenisItem[];
}

// Kleur van de badge per teller in de geschiedenis
const BADGE_KLEUREN: Record<string, string> = {
  rood:  'bg-red-100 text-red-700 border-red-300',
  groen: 'bg-green-100 text-green-700 border-green-300',
  blauw: 'bg-blue-100 text-blue-700 border-blue-300',
};

// Kleur van het actie-label
const ACTIE_KLEUREN: Record<GeschiedenisItem['actie'], string> = {
  '+1':   'text-green-600 font-black',
  '-1':   'text-red-500 font-black',
  'reset': 'text-gray-500 font-semibold',
};

// Leesbare naam voor de actie
const ACTIE_LABELS: Record<GeschiedenisItem['actie'], string> = {
  '+1':   '+1',
  '-1':   '−1',
  'reset': '↺ 0',
};

export default function GeschiedenisPanel({ geschiedenis }: GeschiedenisPanelProps) {
  return (
    <section
      className="bg-white rounded-3xl border-4 border-purple-300 shadow-xl p-5 h-full flex flex-col"
      aria-label="Geschiedenis van acties"
    >
      {/* Koptekst van het paneel */}
      <h2 className="text-2xl font-black text-purple-700 mb-4 text-center">
        📋 Geschiedenis
      </h2>

      {/* Lege staat als er nog niks gedaan is */}
      {geschiedenis.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-center">
          <p className="text-gray-400 text-lg font-medium">
            Nog geen acties!<br />
            <span className="text-3xl">👆</span><br />
            Druk op een knop om te beginnen
          </p>
        </div>
      ) : (
        /* Scrollbare lijst van acties */
        <ol
          className="flex-1 overflow-y-auto space-y-2 pr-1"
          aria-label="Lijst van de laatste 20 acties"
        >
          {geschiedenis.map((item, index) => (
            <li
              key={item.id}
              className={`
                flex items-center gap-2 rounded-xl px-3 py-2
                ${index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-gray-50 border border-gray-100'}
                transition-all duration-300
              `}
              aria-label={`${item.teller} teller: ${ACTIE_LABELS[item.actie]}, nieuwe waarde ${item.waarde}, om ${item.tijdstip}`}
            >
              {/* Kleurde badge met de naam van de teller */}
              <span
                className={`
                  text-xs font-bold px-2 py-1 rounded-lg border
                  ${BADGE_KLEUREN[item.kleurNaam]}
                  shrink-0
                `}
                aria-hidden="true"
              >
                {item.teller}
              </span>

              {/* Wat er is gebeurd */}
              <span
                className={`text-lg ${ACTIE_KLEUREN[item.actie]} shrink-0`}
                aria-hidden="true"
              >
                {ACTIE_LABELS[item.actie]}
              </span>

              {/* Pijltje naar nieuwe waarde */}
              <span className="text-gray-400 text-sm shrink-0" aria-hidden="true">
                →
              </span>

              {/* De nieuwe waarde */}
              <span className="text-gray-800 font-bold text-sm shrink-0">
                {item.waarde}
              </span>

              {/* Tijdstempel, naar rechts gedrukt */}
              <span className="text-gray-400 text-xs ml-auto shrink-0">
                {item.tijdstip}
              </span>
            </li>
          ))}
        </ol>
      )}

      {/* Teller hoeveel items er zijn */}
      {geschiedenis.length > 0 && (
        <p className="text-center text-xs text-gray-400 mt-3">
          {geschiedenis.length} van {20} acties getoond
        </p>
      )}
    </section>
  );
}
