
# Design Spec — Cyberpunk Digital Clock Component

## Design Approach: Creative/Innovative (Sci-Fi / Cyberpunk)

### Rationale
Dit is geen klok — het is een stuk hardware uit een dystopische stad in 2087.
De esthetiek leent van klassieke cyberpunk: neon licht dat door donkere mist
snijdt, terminal-groene displays, CRT-scanlines en de koude gloed van
holografische interfaces. Elke visuele keuze versterkt het gevoel dat dit een
echt apparaat is, geen website-widget.

Het component leeft in een donkere wereld. De achtergrond is bijna zwart,
de cijfers gloeien in cyaan of neon-groen, en subtiele decoratieve elementen
(grid, scanlines, hoekmarkeringen) geven het een fysiek, industrieel karakter.

---

## Component: `<CyberpunkClock />`

Implementeer als `components/CyberpunkClock.tsx` met `'use client'` (gebruikt
`useState` + `useEffect` voor live tijdupdate).

Render via `components/HomePage.tsx` (vervang de placeholder volledig).

---

## 1. Kleurenpalet

| Rol                  | Hex       | Tailwind klasse (literal)         |
|----------------------|-----------|-----------------------------------|
| Achtergrond pagina   | `#050a0e` | `bg-[#050a0e]`                    |
| Klok achtergrond     | `#0a1520` | `bg-[#0a1520]`                    |
| Primaire neon cyaan  | `#00f5ff` | `text-[#00f5ff]`                  |
| Secundaire neon groen| `#39ff14` | `text-[#39ff14]`                  |
| Accent paars         | `#bf00ff` | `text-[#bf00ff]`                  |
| Dim tekst / labels   | `#4a7a8a` | `text-[#4a7a8a]`                  |
| Border cyaan dim     | `#0d4f5c` | `border-[#0d4f5c]`                |
| Border neon actief   | `#00f5ff` | `border-[#00f5ff]`                |
| Separator / colon    | `#00f5ff` | `text-[#00f5ff]`                  |
| Scanline overlay     | `#000000` | (CSS pseudo-element, zie animaties)|

**Glow-kleuren (via Tailwind `drop-shadow` of inline style):**
- Cyaan glow: `drop-shadow: 0 0 8px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00a8b5`
- Groen glow: `drop-shadow: 0 0 8px #39ff14, 0 0 20px #39ff14`
- Paars glow: `drop-shadow: 0 0 8px #bf00ff, 0 0 20px #bf00ff`

---

## 2. Typografie

**Primaire font: `JetBrains Mono`** (Google Fonts via `next/font/google`)
- Fallback: `'Courier New', monospace`
- Reden: scherpe monospace met technische uitstraling, beter leesbaar dan
  Courier maar behoud de terminal-feel.

**Secundaire font: `Share Tech Mono`** (Google Fonts)
- Voor labels, datum en secundaire informatie.

### Typografie-schaal

| Element             | Grootte       | Weight   | Letter-spacing  | Kleur           |
|---------------------|---------------|----------|-----------------|-----------------|
| Uren + Minuten      | `text-[10rem]`| `font-bold` | `tracking-[0.15em]` | `#00f5ff`   |
| Seconden            | `text-[4rem]` | `font-bold` | `tracking-[0.1em]`  | `#39ff14`   |
| Separator (:)       | `text-[8rem]` | `font-thin` | —               | `#00f5ff`       |
| AM/PM badge         | `text-sm`     | `font-bold` | `tracking-[0.3em]`  | `#bf00ff`   |
| Dag van de week     | `text-xs`     | `font-normal` | `tracking-[0.4em]` | `#4a7a8a`  |
| Datum               | `text-base`   | `font-normal` | `tracking-[0.25em]`| `#4a7a8a`  |
| Tijdzone label      | `text-xs`     | `font-normal` | `tracking-[0.35em]`| `#4a7a8a`  |

Alle tekst: `uppercase` waar van toepassing.

---

## 3. Layout & Compositie

### Pagina-wrapper
```
Volledig scherm: min-h-screen w-full
Achtergrond: bg-[#050a0e]
Flex center: flex items-center justify-center
Grid-achtergrond: zie decoratieve elementen
```

### Klok-kaart (hoofdcontainer)
```
Positie: relative (voor pseudo-elementen en decoraties)
Breedte: max-w-3xl w-full mx-auto
Padding: px-16 py-12
Achtergrond: bg-[#0a1520]
Border: border border-[#0d4f5c]
Border-radius: geen (scherpe hoeken passen bij cyberpunk)
Box-shadow: 0 0 0 1px #0d4f5c, 0 0 40px rgba(0,245,255,0.08), inset 0 0 60px rgba(0,0,0,0.4)
```

### Hoekmarkeringen (Corner Brackets)
Vier absolute-gepositioneerde decoratieve hoeken, elk 20×20px:
- Positie: top-0 left-0 / top-0 right-0 / bottom-0 left-0 / bottom-0 right-0
- Kleur: `#00f5ff`
- Stijl: 2px border, alleen twee zijden per hoek (L-vorm)
  - top-left: border-top + border-left
  - top-right: border-top + border-right
  - bottom-left: border-bottom + border-left
  - bottom-right: border-bottom + border-right
- Subtiele cyaan glow op de borders

### Tijdweergave (primaire zone)
```
Layout: flex items-end justify-center gap-2
Verticale uitlijning: baseline (zodat seconden kleiner rechtsonder hangen)
```

Structuur van links naar rechts:
```
[HH] [:] [MM]        ← groot, cyaan, gloeiend
              [SS]   ← kleiner, groen, rechtsonder uitgelijnd (self-align: flex-end, pb-4)
```

### Secundaire informatiebalk (onder de tijd)
```
Layout: flex items-center justify-between mt-6
Border-top: 1px solid #0d4f5c
Padding-top: pt-4
```

Linksonder:
- Dag van de week (bijv. "TUESDAY") — `text-xs tracking-[0.4em] text-[#4a7a8a]`
- Datum (bijv. "19 / 05 / 2026") — `text-base tracking-[0.25em] text-[#4a7a8a]`

Rechtsonder:
- AM/PM badge in een klein kader:
  ```
  border border-[#bf00ff] px-2 py-0.5 text-sm tracking-[0.3em] text-[#bf00ff]
  glow: drop-shadow 0 0 6px #bf00ff
  ```
- Tijdzone (bijv. "UTC+02:00") — `text-xs tracking-[0.35em] text-[#4a7a8a]`

### Statusbalk (optioneel, bovenaan de kaart)
Een dunne balk helemaal bovenaan de kaart:
```
flex items-center justify-between px-2 py-1
border-bottom: 1px solid #0d4f5c
text-[10px] tracking-[0.3em] text-[#4a7a8a] uppercase
```
Links: `"SYS.CLOCK v2.4.1"`
Rechts: een knipperend groen stipje (●) + `"ONLINE"` — animatie: opacity pulse 1.5s

---

## 4. Decoratieve Elementen

### A. Grid-achtergrond (pagina-niveau)
CSS background-image op de pagina-wrapper:
```css
background-image:
  linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px);
background-size: 40px 40px;
```
Implementeer via een inline `style` prop of een CSS-module.
Geeft het gevoel van een holografisch grid-oppervlak.

### B. Scanlines (klok-kaart overlay)
Een absolute div over de volledige kaart, pointer-events: none, z-index: 10:
```css
background: repeating-linear-gradient(
  0deg,
  transparent,
  transparent 2px,
  rgba(0,0,0,0.15) 2px,
  rgba(0,0,0,0.15) 4px
);
```
Dit simuleert CRT-scanlines. Subtiel — niet te zwaar (max 15% opacity).

### C. Horizontale glitch-lijn (decoratief)
Een absolute gepositioneerde dunne lijn (1px hoog) die af en toe over de kaart
"scant" — zie animaties sectie.

### D. Neon glow op cijfers
Implementeer via `style={{ textShadow: "..." }}` op de cijfer-spans:
```
Cyaan (HH/MM): 0 0 7px #00f5ff, 0 0 10px #00f5ff, 0 0 21px #00f5ff, 0 0 42px #0fa, 0 0 82px #0fa
Groen (SS): 0 0 7px #39ff14, 0 0 10px #39ff14, 0 0 21px #39ff14
```

### E. Zij-accenten (verticale streepjes)
Twee verticale lijnen van 3px breed en ~60% hoogte van de kaart:
- Links: absolute left-0 top-1/2 -translate-y-1/2, kleur `#00f5ff`, glow
- Rechts: zelfde maar right-0
- Hoogte: h-[60%]
- Geeft het gevoel van een paneel met energiegeleiders

---

## 5. Animaties & Transities

### A. Seconden — digit flip (of slide)
Elke seconde-update triggert een korte animatie op het SS-element:

**Aanbevolen: vertical clip-slide**
```css
@keyframes digitSlideIn {
  from {
    clip-path: inset(0 0 100% 0);
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    clip-path: inset(0 0 0% 0);
    opacity: 1;
    transform: translateY(0);
  }
}
```
Duur: 150ms, easing: `cubic-bezier(0.23, 1, 0.32, 1)`
Trigger: elke keer dat de seconden-waarde verandert (via key prop op het element).

### B. Separator colon — blink
De `:` separatoren knipperen elke seconde:
```css
@keyframes colonBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.1; }
}
```
Duur: 1s, timing: `steps(1)`, infinite.
Respecteer `prefers-reduced-motion`: als reduced-motion, stop de blink
(toon altijd zichtbaar).

### C. Scanline sweep
Een horizontale lijn (1px, cyaan, 30% opacity) die van top naar bottom
over de kaart beweegt:
```css
@keyframes scanSweep {
  0% { top: -2px; opacity: 0.6; }
  80% { opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}
```
Duur: 4s, easing: `linear`, infinite.
`prefers-reduced-motion`: verberg dit element volledig.

### D. Status-dot pulse
Het groene "ONLINE" stipje pulseert:
```css
@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
}
```
Duur: 1.5s, easing: `ease-in-out`, infinite.

### E. Initiële fade-in van de kaart
Bij mount: de hele klok-kaart fadet in met een lichte upward-translate:
```css
animation: fadeUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### F. Glow-flicker (subtiel, random)
Elke 8–15 seconden (random interval via `setInterval` in JS) triggert een
korte flicker op de cyaan cijfers — opacity gaat kort naar 0.7 en terug
naar 1 in 80ms. Simuleert een instabiele neon-buis.
`prefers-reduced-motion`: uitschakelen.

### Implementatie-hint voor animaties:
Definieer de keyframes in `app/globals.css` (of een CSS module). Gebruik
Tailwind's `animate-*` utilities voor simpele gevallen, en custom keyframes
voor de complexere animaties. Gebruik `useReducedMotion()` hook (of een
simpele `window.matchMedia('(prefers-reduced-motion: reduce)')` check) om
alle bewegende elementen te disablen wanneer nodig.

---

## 6. Responsive Gedrag

| Breakpoint | Uren/Min font | Seconden font | Kaart padding |
|------------|---------------|---------------|---------------|
| Mobile (<640px) | `text-[5rem]` | `text-[2.5rem]` | `px-6 py-8` |
| Tablet (640–1024px) | `text-[7rem]` | `text-[3.5rem]` | `px-10 py-10` |
| Desktop (>1024px) | `text-[10rem]` | `text-[4rem]` | `px-16 py-12` |

Op mobile: de secundaire balk (dag/datum/AM-PM) stapelt verticaal
(`flex-col items-center gap-2`).

---

## 7. Accessibility

### ARIA
```html
<div
  role="timer"
  aria-live="polite"
  aria-atomic="true"
  aria-label="Huidige tijd: [HH] uur [MM] minuten [SS] seconden"
>
```
Update de `aria-label` elke seconde via JavaScript.

### Contrast
- Cyaan `#00f5ff` op `#0a1520` → contrast ratio ≈ 9.4:1 ✅ (WCAG AAA)
- Groen `#39ff14` op `#0a1520` → contrast ratio ≈ 11.2:1 ✅ (WCAG AAA)
- Dim tekst `#4a7a8a` op `#0a1520` → contrast ratio ≈ 3.1:1 ✅ (WCAG AA voor grote tekst)

### Focus & Keyboard
Het component heeft geen interactieve elementen (het is een display-only klok),
dus geen focus-management nodig. Geen tabindex nodig.

### Reduced Motion
Alle animaties (scanline, flicker, digit slide, colon blink) worden
uitgeschakeld via een `useEffect` die `prefers-reduced-motion` detecteert.
Seconden updaten nog steeds live, maar zonder visuele animatie.

---

## 8. Bestandsstructuur

```
components/
  CyberpunkClock.tsx    ← hoofdcomponent ('use client')
  HomePage.tsx          ← vervangt placeholder, rendert <CyberpunkClock />
app/
  globals.css           ← voeg custom keyframes toe hier
```

Voeg toe aan `app/globals.css` (na de bestaande Tailwind import):
```css
@keyframes digitSlideIn { ... }
@keyframes colonBlink { ... }
@keyframes scanSweep { ... }
@keyframes statusPulse { ... }
@keyframes fadeUp { ... }
```

Voeg toe aan `app/layout.tsx` (in de `fonts` sectie naast Geist):
```ts
import { JetBrains_Mono, Share_Tech_Mono } from 'next/font/google'
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })
const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'], variable: '--font-sharetech' })
```
Pas de `className` op `<body>` aan om beide font-variabelen te includeren.

---

## 9. Volledig Visueel Overzicht (ASCII)

```
┌──────────────────────────────────────────────────────────────┐
│ SYS.CLOCK v2.4.1                              ● ONLINE       │  ← statusbalk
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ╔══╗                                              ╔══╗     │  ← hoekmarkeringen
│  ║                                                    ║     │
│                                                              │
│         1 4   :   3 7              4 2               │
│        [cyaan glow]  [cyaan]  [groen glow]           │
│                                                              │
│  ║                                                    ║     │
│  ╚══╝                                              ╚══╝     │
├──────────────────────────────────────────────────────────────┤
│  TUESDAY                              [PM] UTC+02:00        │
│  19 / 05 / 2026                                             │
└──────────────────────────────────────────────────────────────┘
     ↑ scanline sweep (animatie)
     ↑ scanlines overlay (CRT effect)
     ↑ grid-achtergrond op pagina
```

---

## 10. Samenvatting Designkeuzes

| Keuze | Reden |
|-------|-------|
| Scherpe hoeken (geen border-radius) | Industrieel, hardware-gevoel |
| Cyaan + Groen + Paars | Klassieke cyberpunk kleurencombinatie, maximale visuele impact |
| JetBrains Mono | Scherper dan Courier, authentiek terminal-gevoel |
| Seconden apart kleiner + groen | Visuele hiërarchie — tijd is primair, seconden zijn "live data" |
| Scanlines | CRT-nostalgie, geeft het een fysiek display-gevoel |
| Glow-flicker | Simuleert instabiele neon, voegt leven toe zonder ableidend te zijn |
| Grid-achtergrond | Holografische ruimte, verankert de klok in een sci-fi context |
| Statusbalk bovenaan | Maakt het een "systeem" in plaats van een widget |
