
# Design Spec — Futuristische Digitale Klok

## Design Rationale

**Gekozen aanpak: Creative / Innovative — Cyberpunk Minimalism**

Dit is geen klok die je op een muur hangt. Dit is een klok die aanvoelt alsof hij uit een sci-fi film is gestolen — ergens tussen de holografische displays van *Blade Runner 2049* en de terminal-esthetiek van *Ghost in the Shell*. Het concept: een **donker, atmosferisch scherm** met neon-verlichte cijfers die leven en ademen. De klok is het middelpunt van het scherm — geen afleiding, geen clutter. Alleen tijd, licht en beweging.

De visuele taal combineert:
- **Monospace typografie** (terminalaesthetic) voor de cijfers
- **Neon cyan + magenta accenten** op een bijna-zwarte achtergrond
- **Scanlines overlay** voor die retro-futuristische CRT-monitor feel
- **Pulse glows** die meebewegen met de seconden
- **Digit flip animaties** — cijfers schuiven verticaal bij elke update

---

## 1. Layout & Structuur

### Schermopbouw (full-viewport, gecentreerd)

```
┌─────────────────────────────────────────────────────┐
│  [scanlines overlay — fixed, full screen]            │
│                                                      │
│              ┌──────────────────────┐                │
│              │  [decoratieve lijn]   │                │
│              │   MAANDAG 19 MEI 2026 │  ← datum       │
│              │  [decoratieve lijn]   │                │
│              │                      │                │
│              │   23 : 47 : 59       │  ← hoofdklok   │
│              │                      │                │
│              │  HH   MM   SS        │  ← labels       │
│              │                      │                │
│              │  [pulserende ring]   │                │
│              └──────────────────────┘                │
│                                                      │
│  [achtergrond: animated radial gradient]             │
└─────────────────────────────────────────────────────┘
```

### Componenten (van boven naar beneden):

1. **Achtergrond** — Full-screen animated gradient + particles
2. **Scanlines overlay** — Fixed pseudo-element over het hele scherm
3. **Klok-container** — Gecentreerd card, geen border, pure compositie
4. **Datum-balk** — Dag + datum in kleine caps, horizontale decoratielijnen links en rechts
5. **Tijdsdisplay** — HH : MM : SS in grote monospace cijfers
6. **Labels** — Kleine uppercase labels onder elk getal (HOURS / MINUTES / SECONDS)
7. **Seconden-indicator** — Dunne horizontale progressiebalk die elke seconde vult (0→60)
8. **Milliseconden-streep** — Ultra-dunne animerende lijn onder de klok voor levendigheid

### Responsief gedrag:
- **Mobile (< 640px):** Cijfers 20vw breed, datum compact, labels verbergen
- **Tablet (640–1024px):** Cijfers 14vw, volledige datum + labels zichtbaar
- **Desktop (> 1024px):** Cijfers 10vw, maximale visual impact, volledige layout

---

## 2. Kleurenpalet

### Primaire kleuren

| Rol | Hex | Tailwind klasse |
|---|---|---|
| Achtergrond diep | `#050810` | `bg-[#050810]` |
| Achtergrond medium | `#0a0f1e` | `bg-[#0a0f1e]` |
| Neon Cyan (primair accent) | `#00f5ff` | `text-[#00f5ff]` |
| Neon Cyan glow (lichter) | `#7fffff` | (box-shadow / filter) |
| Neon Magenta (secundair accent) | `#ff00aa` | `text-[#ff00aa]` |
| Wit tekst | `#e8f4f8` | `text-[#e8f4f8]` |
| Gedimde tekst (labels) | `#4a6a7a` | `text-[#4a6a7a]` |
| Separator-kleur | `#1a3040` | `border-[#1a3040]` |
| Scanline kleur | `rgba(0,0,0,0.15)` | (CSS, geen Tailwind token) |

### Glow-effecten (CSS box-shadow / text-shadow):
- **Primaire glow (cijfers):** `0 0 20px #00f5ff, 0 0 40px #00f5ff66, 0 0 80px #00f5ff33`
- **Magenta pulse:** `0 0 15px #ff00aa, 0 0 30px #ff00aa44`
- **Subtiele container glow:** `0 0 60px #00f5ff11, inset 0 0 40px #00000066`
- **Colon puls:** `0 0 10px #00f5ff, 0 0 25px #00f5ffaa`

### Achtergrond gradient animatie:
```css
background: radial-gradient(ellipse at 30% 50%, #0d1f3c 0%, #050810 60%);
/* Animated: tweede radial gradient die langzaam van positie verandert */
background: radial-gradient(ellipse at 70% 50%, #1a0a2e 0%, transparent 50%);
```
De twee gradiënten animeren met een `@keyframes` die de positie van 30%/70% naar 40%/60% verschuift over 8 seconden, infinite alternate — geeft een ademend, levend effect.

---

## 3. Typografie

### Font-keuze: `JetBrains Mono` (Google Fonts)
- **Waarom:** JetBrains Mono heeft perfect gelijke cijferbreedtes (tabular nums), een sterke technische uitstraling, en ziet er prachtig uit bij grote formaten. Veel beter dan Geist Mono voor dit gebruik.
- **Fallback:** `'Courier New', monospace`
- **Import:** `next/font/google` met `subsets: ['latin']`

### Typografische schaal:

| Element | Font | Grootte (desktop) | Grootte (mobile) | Gewicht | Letter-spacing |
|---|---|---|---|---|---|
| Klok-cijfers (HH MM SS) | JetBrains Mono | `clamp(5rem, 12vw, 9rem)` | `clamp(3.5rem, 18vw, 5rem)` | 700 (bold) | `-0.05em` |
| Colon separator (:) | JetBrains Mono | `clamp(4rem, 10vw, 7rem)` | `clamp(3rem, 14vw, 4rem)` | 300 (light) | normal |
| Datum | JetBrains Mono | `0.875rem` (14px) | `0.75rem` (12px) | 400 | `0.3em` (wide) |
| Labels (HOURS etc.) | JetBrains Mono | `0.65rem` (10.4px) | verborgen | 400 | `0.4em` |
| Milliseconden (optioneel) | JetBrains Mono | `0.75rem` | verborgen | 300 | `0.1em` |

### Tekst-rendering:
- `font-variant-numeric: tabular-nums` — cruciaal zodat cijfers niet springen bij update
- `text-rendering: optimizeLegibility`
- `-webkit-font-smoothing: antialiased`

---

## 4. Achtergrond & Sfeer

### Lagenstructuur (van achter naar voor):

**Laag 1 — Diepe achtergrond:**
- Kleur: `#050810` (bijna zwart, met een subtiele blauwe tint)
- Full-screen, fixed

**Laag 2 — Animerende radial gradients:**
- Twee overlappende radial gradients die langzaam bewegen
- Cyan: `radial-gradient(ellipse 60% 40% at 25% 60%, #001a3a 0%, transparent 70%)`
- Magenta: `radial-gradient(ellipse 40% 30% at 75% 40%, #1a0020 0%, transparent 70%)`
- Animatie: `@keyframes breathe` — positie verschuift subtiel over 10s, infinite alternate

**Laag 3 — Grid overlay (optioneel, subtiel):**
- Perspectief-grid van dunne lijnen (`#0d2030`, 2% opacity)
- Implementatie: SVG background-image met horizontale en verticale lijnen, 60px grid
- Geeft de illusie van een holografisch projectievlak

**Laag 4 — Scanlines:**
- Fixed overlay over het volledige scherm
- `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)`
- `pointer-events: none`, `z-index: 50`
- Opacity: 0.4 — subtiel genoeg om niet storend te zijn

**Laag 5 — Floating particles (subtiel):**
- 8–12 kleine cirkels (`2–4px` diameter) in neon cyan, laag opacity (`0.3–0.6`)
- Animeren langzaam omhoog en vervagen (`@keyframes float-up`)
- Willekeurige horizontale posities, verschillende snelheden (8s–20s)
- Implementatie: statische array van particles met `style` props voor positie/delay

---

## 5. Visuele Effecten

### A. Digit Glow
De klok-cijfers hebben een meervoudige text-shadow die de neon-glow simuleert:
```css
text-shadow:
  0 0 10px #00f5ff,
  0 0 20px #00f5ff,
  0 0 40px #00f5ffaa,
  0 0 80px #00f5ff44;
```
Bij elke seconde-wissel: kort `pulse` naar helderder glow (0.15s), dan terug.

### B. Colon Blink (levend, niet irritant)
De twee dubbele punten `:` pulseren in opacity:
- Animatie: `@keyframes colon-pulse` — opacity gaat van `1` naar `0.3` en terug
- Duur: `1s`, `ease-in-out`, `infinite`
- De colons hebben ook een subtiele magenta tint: `color: #b0f0ff` met magenta glow

### C. Seconden Progressiebalk
Onder de tijdsdisplay: een dunne horizontale balk (2px hoog):
- Achtergrond: `#1a3040`
- Vulling: `#00f5ff` met `box-shadow: 0 0 8px #00f5ff`
- Breedte: `{seconds / 60 * 100}%` — update elke seconde
- Transitie: `width 0.9s linear` (soepel, niet schokkerig)
- Bij 59→0: reset zonder transitie (instant)

### D. Digit Flip Animatie
Bij elke cijferwijziging (uur, minuut, seconde):
- Het nieuwe cijfer schuift van boven naar beneden in (`translateY(-100%)` → `translateY(0)`)
- Het oude cijfer schuift naar beneden uit (`translateY(0)` → `translateY(100%)`)
- Duur: `0.25s`, `cubic-bezier(0.4, 0, 0.2, 1)`
- Implementatie: `overflow: hidden` container, twee absolute-positioned spans, CSS animatie triggered door key-change
- In React: gebruik `key={digit}` op elk cijfer-element zodat React de animatie herstart bij elke waarde-wijziging

### E. Datum-lijn decoratie
Links en rechts van de datum: dunne horizontale lijnen die zich uitbreiden bij mount:
- Animatie: `width` van `0` naar `100%` in `1.5s ease-out`
- Kleur: `#1a3040` met een subtle cyan glow aan het uiteinde

### F. Outer Container Glow
De klok-container heeft een subtiele buitenste glow:
```css
box-shadow:
  0 0 80px #00f5ff08,
  0 0 160px #00f5ff04;
```

---

## 6. Interactie & Animaties

### Tick-animatie (elke seconde)
1. Seconden-cijfer flipt (zie D)
2. Progressiebalk update soepel
3. Colons pulseren continu

### Minuut-wissel (extra effect)
Wanneer de minuut verandert:
- Kort extra glow-pulse op de volledige tijdsdisplay (`0.3s`)
- `filter: brightness(1.3)` → terug naar `brightness(1)` in `0.4s ease-out`

### Uur-wissel (maximaal effect)
Wanneer het uur verandert:
- Kort `flash` effect: de achtergrond flitst met een cyan radial gradient (`0.5s`)
- Alle drie de getal-groepen flippen

### Hover op de klok-container
- Subtiele scale: `transform: scale(1.01)`
- Iets helderder glow
- Duur: `0.4s ease`
- Geen andere interactie (klok is read-only display)

### Mount-animatie (eerste render)
1. Achtergrond fades in: `opacity 0 → 1` in `1s`
2. Datum schuift in van boven: `translateY(-20px) opacity 0 → 0 opacity 1` in `0.8s 0.3s`
3. Klok-cijfers verschijnen van beneden: `translateY(20px) → 0`, staggered per digit, `0.6s 0.5s`
4. Progressiebalk groeit in: `0.4s 1.2s`

---

## 7. Component Structuur (voor Dex)

```
components/
  DigitalClock.tsx          ← 'use client', hoofd-component
  clock/
    ClockDigit.tsx          ← individueel cijfer met flip-animatie
    ClockColon.tsx          ← pulserende dubbele punt
    DateDisplay.tsx         ← datum + decoratielijnen
    SecondsBar.tsx          ← progressiebalk
    ScanlineOverlay.tsx     ← fixed scanlines overlay
    BackgroundLayer.tsx     ← animated gradient + particles
```

`HomePage.tsx` importeert `DigitalClock` en rendert het full-screen.

---

## 8. Implementatie-details voor Dex

### Font laden (layout.tsx):
```tsx
import { JetBrains_Mono } from 'next/font/google'
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})
```
Voeg `${jetbrainsMono.variable}` toe aan de `className` van `<html>`.

### useTime hook:
```tsx
// hooks/useTime.ts
'use client'
import { useState, useEffect } from 'react'
export function useTime() {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}
```

### Tailwind config (globals.css aanvulling):
Voeg toe in `app/globals.css` na `@import "tailwindcss"`:
```css
@keyframes colon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.25; }
}
@keyframes digit-in {
  from { transform: translateY(-100%); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
@keyframes digit-out {
  from { transform: translateY(0);    opacity: 1; }
  to   { transform: translateY(100%); opacity: 0; }
}
@keyframes bg-breathe {
  0%   { background-position: 25% 60%, 75% 40%; }
  100% { background-position: 35% 50%, 65% 50%; }
}
@keyframes float-particle {
  0%   { transform: translateY(0);    opacity: 0; }
  20%  { opacity: 0.5; }
  80%  { opacity: 0.3; }
  100% { transform: translateY(-80vh); opacity: 0; }
}
@keyframes bar-reset {
  from { transition: none; }
}
@keyframes mount-fade {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Volledige klasse-referentie voor het hoofd-display:
```tsx
// Container
className="relative flex flex-col items-center justify-center min-h-screen bg-[#050810] overflow-hidden"

// Klok wrapper
className="relative z-10 flex flex-col items-center gap-6 px-8 py-10"

// Tijdsdisplay rij
className="flex items-center gap-2 md:gap-4"

// Individueel cijfer
className="font-[family-name:var(--font-jetbrains)] font-bold text-[#00f5ff] 
           [text-shadow:0_0_10px_#00f5ff,0_0_20px_#00f5ff,0_0_40px_#00f5ffaa]
           tabular-nums overflow-hidden relative"
// text-size via style: fontSize: 'clamp(3.5rem, 12vw, 9rem)'

// Colon
className="font-[family-name:var(--font-jetbrains)] font-light text-[#00f5ff]
           [animation:colon-pulse_1s_ease-in-out_infinite]
           [text-shadow:0_0_10px_#00f5ff,0_0_20px_#ff00aa66]"

// Labels
className="font-[family-name:var(--font-jetbrains)] text-[#4a6a7a] 
           text-[0.65rem] tracking-[0.4em] uppercase hidden sm:block"

// Datum
className="font-[family-name:var(--font-jetbrains)] text-[#4a6a7a]
           text-xs sm:text-sm tracking-[0.3em] uppercase"

// Progressiebalk container
className="w-full h-[2px] bg-[#1a3040] rounded-full overflow-hidden"

// Progressiebalk vulling
className="h-full bg-[#00f5ff] rounded-full transition-[width] duration-[900ms] linear
           [box-shadow:0_0_8px_#00f5ff,0_0_16px_#00f5ff44]"

// Scanlines overlay
className="fixed inset-0 z-50 pointer-events-none"
style={{
  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
  opacity: 0.4
}}
```

---

## 9. Accessibility

- **Semantische HTML:** Gebruik `<time dateTime={isoString}>` als wrapper voor de tijdsdisplay
- **Screen reader tekst:** Verberg de visuele klok voor screen readers en bied een `<span className="sr-only">` met de volledige tijd als tekst: `"Het is 23 uur, 47 minuten en 59 seconden"`
- **ARIA live region:** `<div aria-live="polite" aria-atomic="true" className="sr-only">` — update elke minuut (niet elke seconde, te druk)
- **prefers-reduced-motion:** Alle animaties (flip, pulse, particles, background-breathe) worden uitgeschakeld:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
- **Contrast:** Neon cyan `#00f5ff` op `#050810` heeft een contrastverhouding van ~12:1 — ruim boven WCAG AA (4.5:1)
- **Focus:** Geen interactieve elementen behalve de container zelf (geen focus-trap nodig)
- **Taal:** `lang="nl"` op `<html>` (al aanwezig in layout.tsx)

---

## 10. Datum-opmaak (Nederlands)

Gebruik de `Intl.DateTimeFormat` API voor Nederlandse datumopmaak:
```ts
const dateStr = new Intl.DateTimeFormat('nl-NL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
}).format(time)
// Resultaat: "maandag 19 mei 2026"
// Display in uppercase via CSS: text-transform: uppercase
```

---

## Samenvatting visueel concept

> Een zwart scherm. Neon cyan cijfers die zachtjes gloeien alsof ze holografisch zijn geprojecteerd. Scanlines die het geheel de textuur geven van een oud CRT-scherm uit de toekomst. Cijfers die bij elke seconde vloeiend flippen. Een progressiebalk die de tijd visueel telt. Geen knoppen, geen menu's — alleen de pure, ademende aanwezigheid van tijd.
