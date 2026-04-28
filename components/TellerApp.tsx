
'use client';

// ============================================================
// TellerApp — Hoofdcomponent van de teller-app
// Beheert de staat van alle drie de tellers, de geschiedenis,
// de feestmodus en de geluidsfunctionaliteit.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import Teller from './Teller';
import Geschiedenis from './Geschiedenis';
import Totaal from './Totaal';
import Confetti from './Confetti';

// Type-definities voor TypeScript
export type TellerKleur = 'rood' | 'groen' | 'blauw';

export interface HistorieItem {
  id: string;
  teller: TellerKleur;
  actie: '+1' | '-1' | 'reset';
  tijdstempel: Date;
  nieuweWaarde: number;
}

export interface TellerStand {
  rood: number;
  groen: number;
  blauw: number;
}

// Beginwaarden ophalen uit localStorage (of 0 als er niets opgeslagen is)
function laadUitStorage(): TellerStand {
  if (typeof window === 'undefined') return { rood: 0, groen: 0, blauw: 0 };
  try {
    const opgeslagen = localStorage.getItem('teller-app-standen');
    if (opgeslagen) {
      return JSON.parse(opgeslagen) as TellerStand;
    }
  } catch {
    // Als het lezen mislukt, beginnen we gewoon op nul
  }
  return { rood: 0, groen: 0, blauw: 0 };
}

// Sla de tellerstanden op in localStorage
function slaOpInStorage(standen: TellerStand): void {
  try {
    localStorage.setItem('teller-app-standen', JSON.stringify(standen));
  } catch {
    // Als opslaan mislukt, gaan we gewoon door
  }
}

// Maak een geluidje aan met de Web Audio API
function speelGeluid(type: 'omhoog' | 'omlaag' | 'reset' | 'feest'): void {
  try {
    // AudioContext aanmaken — werkt in moderne browsers
    const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Verschillende tonen voor verschillende acties
    if (type === 'omhoog') {
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);       // La
      oscillator.frequency.setValueAtTime(660, audioCtx.currentTime + 0.1); // Mi
    } else if (type === 'omlaag') {
      oscillator.frequency.setValueAtTime(330, audioCtx.currentTime);       // Mi lager
      oscillator.frequency.setValueAtTime(220, audioCtx.currentTime + 0.1); // La lager
    } else if (type === 'reset') {
      oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);       // Do
      oscillator.frequency.setValueAtTime(392, audioCtx.currentTime + 0.08);
      oscillator.frequency.setValueAtTime(523, audioCtx.currentTime + 0.16);
    } else if (type === 'feest') {
      // Vrolijk oplopend akkoord voor de feestmodus!
      oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
      oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(1047, audioCtx.currentTime + 0.3);
    }

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.5);
  } catch {
    // Als geluid niet werkt (bijv. in bepaalde browsers), gaan we gewoon door
  }
}

export default function TellerApp() {
  // Staat voor de drie tellerstanden
  const [standen, setStanden] = useState<TellerStand>({ rood: 0, groen: 0, blauw: 0 });
  // Zijn de standen al geladen uit localStorage?
  const [geladen, setGeladen] = useState(false);
  // Geschiedenis van de laatste 20 acties
  const [geschiedenis, setGeschiedenis] = useState<HistorieItem[]>([]);
  // Welke tellers zijn net veranderd (voor animatie)
  const [geanimeerd, setGeanimeerd] = useState<Set<TellerKleur>>(new Set());
  // Feestmodus: welke teller heeft 100 bereikt?
  const [feestTeller, setFeestTeller] = useState<TellerKleur | null>(null);
  // Referentie voor de feest-timeout (om dubbele feestmodus te voorkomen)
  const feestTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Laad de opgeslagen standen bij het opstarten
  useEffect(() => {
    setStanden(laadUitStorage());
    setGeladen(true);
  }, []);

  // Sla de standen op in localStorage wanneer ze veranderen
  useEffect(() => {
    if (geladen) {
      slaOpInStorage(standen);
    }
  }, [standen, geladen]);

  // Voeg een item toe aan de geschiedenis (max. 20 items)
  const voegToeAanGeschiedenis = useCallback(
    (teller: TellerKleur, actie: HistorieItem['actie'], nieuweWaarde: number) => {
      const nieuwItem: HistorieItem = {
        id: `${Date.now()}-${Math.random()}`,
        teller,
        actie,
        tijdstempel: new Date(),
        nieuweWaarde,
      };
      setGeschiedenis((vorige) => [nieuwItem, ...vorige].slice(0, 20));
    },
    []
  );

  // Start een animatie op een teller en stop hem na 400ms
  const startAnimatie = useCallback((teller: TellerKleur) => {
    setGeanimeerd((vorige) => new Set(vorige).add(teller));
    setTimeout(() => {
      setGeanimeerd((vorige) => {
        const nieuw = new Set(vorige);
        nieuw.delete(teller);
        return nieuw;
      });
    }, 400);
  }, []);

  // Controleer of de feestmodus geactiveerd moet worden
  const controleerFeest = useCallback(
    (teller: TellerKleur, waarde: number) => {
      if (waarde === 100) {
        // Annuleer een eventuele lopende feesttimer
        if (feestTimeoutRef.current) clearTimeout(feestTimeoutRef.current);
        setFeestTeller(teller);
        speelGeluid('feest');
        // Stop de feestmodus na 4 seconden
        feestTimeoutRef.current = setTimeout(() => {
          setFeestTeller(null);
        }, 4000);
      }
    },
    []
  );

  // Verwerk een plus-actie op een teller
  const handlePlus = useCallback(
    (teller: TellerKleur) => {
      setStanden((vorige) => {
        const nieuweWaarde = vorige[teller] + 1;
        voegToeAanGeschiedenis(teller, '+1', nieuweWaarde);
        controleerFeest(teller, nieuweWaarde);
        return { ...vorige, [teller]: nieuweWaarde };
      });
      speelGeluid('omhoog');
      startAnimatie(teller);
    },
    [voegToeAanGeschiedenis, controleerFeest, startAnimatie]
  );

  // Verwerk een min-actie op een teller (minimumwaarde is 0)
  const handleMin = useCallback(
    (teller: TellerKleur) => {
      setStanden((vorige) => {
        const nieuweWaarde = Math.max(0, vorige[teller] - 1);
        voegToeAanGeschiedenis(teller, '-1', nieuweWaarde);
        return { ...vorige, [teller]: nieuweWaarde };
      });
      speelGeluid('omlaag');
      startAnimatie(teller);
    },
    [voegToeAanGeschiedenis, startAnimatie]
  );

  // Verwerk een reset-actie op een teller
  const handleReset = useCallback(
    (teller: TellerKleur) => {
      setStanden((vorige) => {
        voegToeAanGeschiedenis(teller, 'reset', 0);
        return { ...vorige, [teller]: 0 };
      });
      speelGeluid('reset');
      startAnimatie(teller);
    },
    [voegToeAanGeschiedenis, startAnimatie]
  );

  // Bereken het totaal van alle drie de tellers
  const totaal = standen.rood + standen.groen + standen.blauw;

  return (
    // Vrolijke achtergrond met sterretjespatroon
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100"
      style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}
    >
      {/* Feestmodus: confetti-regen */}
      {feestTeller && <Confetti tellerKleur={feestTeller} />}

      {/* Bovenbalk met de naam van de app */}
      <header className="text-center py-6 px-4" role="banner">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-700 drop-shadow-lg">
          🎈 Teller App 🎈
        </h1>
        <p className="text-lg text-purple-500 mt-1">Tel mee en word een rekenwonder!</p>
      </header>

      {/* Totaalweergave */}
      <Totaal totaal={totaal} />

      {/* Hoofdgedeelte: tellers links, geschiedenis rechts */}
      <main
        className="max-w-7xl mx-auto px-4 pb-10 flex flex-col lg:flex-row gap-6"
        role="main"
      >
        {/* De drie tellers naast elkaar */}
        <section
          className="flex flex-col sm:flex-row gap-6 flex-1"
          aria-label="De drie tellers"
        >
          <Teller
            kleur="rood"
            waarde={standen.rood}
            isGeanimeerd={geanimeerd.has('rood')}
            onPlus={() => handlePlus('rood')}
            onMin={() => handleMin('rood')}
            onReset={() => handleReset('rood')}
          />
          <Teller
            kleur="groen"
            waarde={standen.groen}
            isGeanimeerd={geanimeerd.has('groen')}
            onPlus={() => handlePlus('groen')}
            onMin={() => handleMin('groen')}
            onReset={() => handleReset('groen')}
          />
          <Teller
            kleur="blauw"
            waarde={standen.blauw}
            isGeanimeerd={geanimeerd.has('blauw')}
            onPlus={() => handlePlus('blauw')}
            onMin={() => handleMin('blauw')}
            onReset={() => handleReset('blauw')}
          />
        </section>

        {/* Geschiedenis-paneel rechts */}
        <aside
          className="w-full lg:w-72 xl:w-80"
          aria-label="Geschiedenis van acties"
        >
          <Geschiedenis items={geschiedenis} />
        </aside>
      </main>
    </div>
  );
}
