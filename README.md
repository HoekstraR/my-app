
# 🎈 Teller App — Voor Kinderen

Een vrolijke, kleurrijke teller-app gemaakt voor kinderen van 6–10 jaar. Met drie aparte tellers, een totaalweergave, geluidseffecten, animaties en een feestmodus!

---

## 📖 Hoe werkt de app? (voor ouders)

De Teller App heeft **drie gekleurde tellers**: rood, groen en blauw. Elke teller werkt onafhankelijk en heeft drie knoppen:

- **+ 1** (grote groene knop): verhoog de teller met één.
- **− 1** (kleinere knop): verlaag de teller met één. Werkt niet als de teller al op nul staat.
- **🔄 Reset**: zet de teller terug naar nul.

Bovenaan de pagina staat het **totaal**: de som van alle drie de tellers samen.

Aan de rechterkant staat het **geschiedenispaneel**. Dit toont de laatste 20 acties: welke teller veranderd is, of het omhoog of omlaag ging, en hoe laat.

### Speciale effecten

- **Geluid**: bij elke klik klinkt een vrolijk geluidje (omhoog = stijgend toonakkoord, omlaag = dalend, reset = drietje).
- **Animatie**: het getal stuitert wanneer het verandert, en de kaart vergroot even.
- **Voortgangsbalk**: onder elk getal zie je hoe ver je richting 100 bent.
- **Feestmodus**: bereikt een teller precies 100? Dan regent het confetti en klinkt er een feestdeuntje! 🎉

### Opgeslagen standen

De tellerstanden worden automatisch opgeslagen in je browser. Als je de pagina sluit en later terugkomt, staan de tellers nog op dezelfde waarde.

---

## 🎓 Pedagogische waarde

De Teller App is meer dan een speeltje — het ondersteunt de ontwikkeling van kinderen op meerdere gebieden:

### 1. Getalbegrip en optellen
Kinderen leren intuïtief hoe getallen toenemen en afnemen. Door de drie tellers te combineren en het totaal te bekijken, oefenen ze het optellen van meerdere getallen — zonder dat het als huiswerk voelt.

### 2. Oorzaak en gevolg
Elke druk op een knop heeft een direct zichtbaar resultaat: het getal verandert, er klinkt een geluid, de voortgangsbalk beweegt. Dit versterkt het begrip van *actie → reactie*.

### 3. Doelgericht denken
De voortgangsbalk richting 100 moedigt kinderen aan om een doel na te streven. "Nog 23 stappen!" is motiverend voor kinderen in de basisschoolleeftijd.

### 4. Tijdsbegrip
Het geschiedenispaneel toont tijdstempels. Kinderen kunnen zien "dat deed ik om 14:32" — een vroege introductie tot het lezen van de klok en chronologie.

### 5. Categoriseren
Drie aparte tellers nodigen uit tot creatief gebruik: één teller voor appels geteld, één voor peren, één voor bananen. Kinderen leren gegevens te organiseren.

### 6. Beloningssysteem
De feestmodus bij 100 geeft een onverwachte beloning. Dit houdt de motivatie hoog en leert kinderen dat volhouden loont.

---

## 🚀 Hoe kun je de app uitbreiden?

Hier zijn ideeën voor ouders, leerkrachten of ontwikkelaars die de app willen uitbreiden:

### Idee 1: Meer tellers toevoegen
Voeg een vierde teller toe (bijv. geel of paars). Pas het `KLEUR_INSTELLINGEN`-object in `Teller.tsx` aan en voeg de nieuwe kleur toe aan het `TellerStand`-type in `TellerApp.tsx`.

### Idee 2: Aanpasbare stapgrootte
Voeg een instelling toe om niet met 1 maar met 2, 5 of 10 te tellen. Handig voor oudere kinderen die tafels oefenen.

### Idee 3: Naamgeving van tellers
Laat kinderen zelf een naam geven aan elke teller ("Mijn konijnen", "Buurmans katten"). Sla de naam op in localStorage.

### Idee 4: Tijdschallenge
Voeg een timer toe. Hoeveel keer kun je tellen in 60 seconden?

### Idee 5: Highscore-systeem
Sla de hoogste totaalstand op en toon een "Persoonlijk record!"-banner wanneer het overtroffen wordt.

### Idee 6: Exporteer geschiedenis
Voeg een knop toe om de geschiedenis te downloaden als CSV-bestand — handig voor leerkrachten die telresultaten willen bijhouden.

### Idee 7: Multiplayer via URL
Sla de standen op in de URL als query-parameters, zodat twee kinderen dezelfde tellers kunnen bekijken door een link te delen.

---

## ⚙️ Technische beslissingen

### Next.js App Router met Server Components
De hoofdpagina (`app/page.tsx`) is een **Server Component** zonder client-side JavaScript. Alle interactiviteit zit in aparte client components onder `components/`. Dit is de aanbevolen Next.js 15-aanpak: snel, SEO-vriendelijk, en toekomstbestendig.

### Web Audio API voor geluid
In plaats van `.mp3`-bestanden te laden (die buiten het project zouden moeten staan), genereer ik geluiden **programmatisch** via de Web Audio API. Dit heeft drie voordelen:
- Geen externe bestanden nodig.
- Nul laadtijd voor geluiden.
- Volledige controle over toonhoogte en timing.

De geluiden zijn opgebouwd uit sinusgolven (`OscillatorNode`) met een aflopende volumecurve (`GainNode`).

### CSS Animations voor confetti
De confetti gebruikt pure CSS `@keyframes`-animaties via inline `style`-attributen. Geen animatiebibliotheek nodig — dit houdt de bundlegrootte klein en de prestaties hoog.

### localStorage voor persistentie
De tellerstanden worden opgeslagen via `localStorage`. Dit is een bewuste keuze: geen server, geen database, geen account — het werkt volledig offline. De gegevens blijven in de browser van het kind staan.

### TypeScript strict mode
Alle typen zijn expliciet gedefinieerd (geen `any`). Dit voorkomt bugs en maakt de code leesbaar voor toekomstige aanpassers.

### Toegankelijkheid (ARIA)
- Alle knoppen hebben `aria-label`-attributen met duidelijke beschrijvingen.
- Het getal-display gebruikt `aria-live="polite"` zodat schermlezers veranderingen aankondigen.
- Het geschiedenispaneel heeft `role="log"` — de semantisch correcte ARIA-rol voor een live-log.
- De feestmodus gebruikt `role="alert"` met `aria-live="assertive"` voor directe aankondiging.
- Alle knoppen zijn via het toetsenbord bereikbaar (`Tab`, `Enter`, `Spatie`).
- Voortgangsbalken gebruiken `role="progressbar"` met `aria-valuenow`, `aria-valuemin`, en `aria-valuemax`.

### Componentstructuur
```
app/
  page.tsx          — Server Component (geen 'use client')
components/
  TellerApp.tsx     — Hoofdcomponent: staat, logica, event handlers
  Teller.tsx        — Eén tellervak met knoppen
  Totaal.tsx        — Totaalweergave bovenin
  Geschiedenis.tsx  — Geschiedenis-paneel rechts
  Confetti.tsx      — Feestmodus-overlay
```

Deze structuur volgt het **single-responsibility principle**: elke component doet één ding goed, en is makkelijk te vervangen of uit te breiden.

---

## 🛠️ Lokaal draaien

```bash
npm install
npm run dev
```

Open dan [http://localhost:3000](http://localhost:3000) in je browser.

---

Gemaakt met ❤️ voor lerende kinderhanden.
