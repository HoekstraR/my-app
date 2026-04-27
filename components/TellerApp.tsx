
'use client';

// =====================================================================
// TellerApp — Hoofdcomponent voor de kinder-teller-app
// Beheert de staat van alle drie tellers, geschiedenis en feestmodus
// =====================================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import TellerKaart from './TellerKaart';
import GeschiedenisPaneel from './GeschiedenisPaneel';
import TotaalWeergave from './TotaalWeergave';
import ConfettiRegen from './ConfettiRegen';

// Type-definitie voor een geschiedenis-item
export interface GeschiedenisItem {
  id: string;
  tellerNaam: string;
  tellerKleur: string;
  actie: '+1' | '-1' | 'reset';
  nieuweWaarde: number;
  tijdstempel: Date;
}

// Type-definitie voor één teller
export interface TellerData {
  naam: string;
  kleur: string;
  achtergrondKleur: string;
  tekstKleur: string;
  knopKleur: string;
  knopHoverKleur: string;
  emoji: string;
  waarde: number;
}

// Beginwaarden voor de drie tellers
const BEGIN_TELLERS: TellerData[] = [
  {
    naam: 'Rood',
    kleur: 'rood',
    achtergrondKleur: 'bg-red-100',
    tekstKleur: 'text-red-700',
    knopKleur: 'bg-red-500',
    knopHoverKleur: 'hover:bg-red-600',
    emoji: '🍎',
    waarde: 0,
  },
  {
    naam: 'Groen',
    kleur: 'groen',
    achtergrondKleur: 'bg-green-100',
    tekstKleur: 'text-green-700',
    knopKleur: 'bg-green-500',
    knopHoverKleur: 'hover:bg-green-600',
    emoji: '🐸',
    waarde: 0,
  },
  {
    naam: 'Blauw',
    kleur: 'blauw',
    achtergrondKleur: 'bg-blue-100',
    tekstKleur: 'text-blue-700',
    knopKleur: 'bg-blue-500',
    knopHoverKleur: 'hover:bg-blue-600',
    emoji: '🦋',
    waarde: 0,
  },
];

// LocalStorage sleutel voor opgeslagen tellerwaarden
const OPSLAG_SLEUTEL = 'kinder-teller-waarden';
const GESCHIEDENIS_SLEUTEL = 'kinder-teller-geschiedenis';

export default function TellerApp() {
  // Haal opgeslagen waarden op uit localStorage, of gebruik beginwaarden
  const [tellers, setTellers] = useState<TellerData[]>(() => {
    if (typeof window === 'undefined') return BEGIN_TELLERS;
    try {
      const opgeslagen = localStorage.getItem(OPSLAG_SLEUTEL);
      if (opgeslagen) {
        const waarden = JSON.parse(opgeslagen) as number[];
        return BEGIN_TELLERS.map((t, i) => ({ ...t, waarde: waarden[i] ?? 0 }));
      }
    } catch {
      // Bij fout: gebruik beginwaarden
    }
    return BEGIN_TELLERS;
  });

  // Geschiedenis van de laatste 20 acties
  const [geschiedenis, setGeschiedenis] = useState<GeschiedenisItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const opgeslagen = localStorage.getItem(GESCHIEDENIS_SLEUTEL);
      if (opgeslagen) {
        const items = JSON.parse(opgeslagen) as (Omit<GeschiedenisItem, 'tijdstempel'> & { tijdstempel: string })[];
        return items.map((item) => ({ ...item, tijdstempel: new Date(item.tijdstempel) }));
      }
    } catch {
      // Bij fout: lege geschiedenis
    }
    return [];
  });

  // Feestmodus: true wanneer een teller 100 bereikt
  const [feestModus, setFeestModus] = useState(false);
  const feestTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Web Audio API context (wordt aangemaakt bij eerste klik)
  const audioContextRef = useRef<AudioContext | null>(null);

  // Sla tellerwaarden op in localStorage wanneer ze veranderen
  useEffect(() => {
    try {
      localStorage.setItem(OPSLAG_SLEUTEL, JSON.stringify(tellers.map((t) => t.waarde)));
    } catch {
      // Negeer localStorage-fouten
    }
  }, [tellers]);

  // Sla geschiedenis op in localStorage
  useEffect(() => {
    try {
      localStorage.setItem(GESCHIEDENIS_SLEUTEL, JSON.stringify(geschiedenis));
    } catch {
      // Negeer localStorage-fouten
    }
  }, [geschiedenis]);

  // Maak of haal de AudioContext op
  const getAudioContext = useCallback((): AudioContext => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    return audioContextRef.current;
  }, []);

  // Speel een vrolijk geluid af afhankelijk van de actie
  const speelGeluid = useCallback(
    (actie: '+1' | '-1' | 'reset') => {
      try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Verschillende tonen per actie
        if (actie === '+1') {
          // Vrolijk hoog geluid voor optellen
          oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C5
          oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
        } else if (actie === '-1') {
          // Iets lager geluid voor aftrekken
          oscillator.frequency.setValueAtTime(392, ctx.currentTime); // G4
          oscillator.frequency.setValueAtTime(330, ctx.currentTime + 0.1); // E4
          gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.3);
        } else {
          // Reset: woosh-achtig geluid
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(880, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);
          gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.4);
        }
      } catch {
        // Audio niet beschikbaar: stilletjes doorgaan
      }
    },
    [getAudioContext]
  );

  // Voeg een item toe aan de geschiedenis (max 20)
  const voegGeschiedenisToe = useCallback(
    (tellerNaam: string, tellerKleur: string, actie: '+1' | '-1' | 'reset', nieuweWaarde: number) => {
      const nieuwItem: GeschiedenisItem = {
        id: `${Date.now()}-${Math.random()}`,
        tellerNaam,
        tellerKleur,
        actie,
        nieuweWaarde,
        tijdstempel: new Date(),
      };
      setGeschiedenis((oud) => [nieuwItem, ...oud].slice(0, 20));
    },
    []
  );

  // Controleer of feestmodus moet worden geactiveerd
  const controleerFeest = useCallback((nieuweWaarde: number) => {
    if (nieuweWaarde === 100) {
      setFeestModus(true);
      // Feestmodus duurt 5 seconden
      if (feestTimerRef.current) clearTimeout(feestTimerRef.current);
      feestTimerRef.current = setTimeout(() => {
        setFeestModus(false);
      }, 5000);
    }
  }, []);

  // Verhoog een teller met 1
  const verhoog = useCallback(
    (index: number) => {
      setTellers((oud) => {
        const nieuw = [...oud];
        nieuw[index] = { ...nieuw[index], waarde: nieuw[index].waarde + 1 };
        voegGeschiedenisToe(nieuw[index].naam, nieuw[index].kleur, '+1', nieuw[index].waarde);
        controleerFeest(nieuw[index].waarde);
        return nieuw;
      });
      speelGeluid('+1');
    },
    [speelGeluid, voegGeschiedenisToe, controleerFeest]
  );

  // Verlaag een teller met 1 (niet onder 0)
  const verlaag = useCallback(
    (index: number) => {
      setTellers((oud) => {
        const nieuw = [...oud];
        if (nieuw[index].waarde <= 0) return oud; // Niet onder nul gaan
        nieuw[index] = { ...nieuw[index], waarde: nieuw[index].waarde - 1 };
        voegGeschiedenisToe(nieuw[index].naam, nieuw[index].kleur, '-1', nieuw[index].waarde);
        return nieuw;
      });
      speelGeluid('-1');
    },
    [speelGeluid, voegGeschiedenisToe]
  );

  // Reset een teller naar 0
  const reset = useCallback(
    (index: number) => {
      setTellers((oud) => {
        const nieuw = [...oud];
        nieuw[index] = { ...nieuw[index], waarde: 0 };
        voegGeschiedenisToe(nieuw[index].naam, nieuw[index].kleur, 'reset', 0);
        return nieuw;
      });
      speelGeluid('reset');
    },
    [speelGeluid, voegGeschiedenisToe]
  );

  // Wis de volledige geschiedenis
  const wisGeschiedenis = useCallback(() => {
    setGeschiedenis([]);
  }, []);

  // Bereken het totaal van alle drie tellers
  const totaal = tellers.reduce((som, t) => som + t.waarde, 0);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-4 font-sans"
      role="main"
      aria-label="Kinder teller app"
    >
      {/* Feestconfetti bovenaan de pagina */}
      {feestModus && <ConfettiRegen />}

      {/* Paginatitel */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-black text-purple-700 drop-shadow-md tracking-tight">
          🌈 Mijn Teller App 🌈
        </h1>
        <p className="text-lg text-purple-500 font-semibold mt-1">
          Tel alles wat je leuk vindt!
        </p>
      </header>

      {/* Totaalweergave bovenaan */}
      <TotaalWeergave totaal={totaal} />

      {/* Hoofdlayout: tellers + geschiedenis */}
      <div className="flex flex-col xl:flex-row gap-4 max-w-7xl mx-auto">
        {/* De drie tellers naast elkaar */}
        <div
          className="flex flex-col sm:flex-row gap-4 flex-1"
          role="group"
          aria-label="Drie tellers"
        >
          {tellers.map((teller, index) => (
            <TellerKaart
              key={teller.kleur}
              teller={teller}
              index={index}
              onVerhoog={() => verhoog(index)}
              onVerlaag={() => verlaag(index)}
              onReset={() => reset(index)}
            />
          ))}
        </div>

        {/* Geschiedenis-paneel rechts */}
        <GeschiedenisPaneel
          geschiedenis={geschiedenis}
          onWis={wisGeschiedenis}
        />
      </div>

      {/* Feestmelding */}
      {feestModus && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-40"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-bounce border-4 border-yellow-400">
            <p className="text-6xl mb-2">🎉</p>
            <p className="text-3xl font-black text-purple-700">HOERA! 100!</p>
            <p className="text-xl font-bold text-pink-500">Geweldig gedaan!</p>
          </div>
        </div>
      )}
    </div>
  );
}
