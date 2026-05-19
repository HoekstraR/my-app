
# Design Spec — Futuristische Digitale Klok
**Project:** NextJS 15 WebContainer App  
**Component:** `components/HomePage.tsx` (client component, `'use client'`)  
**Ontworpen door:** Didi  
**Design aanpak:** Creative/Innovative — Cyberpunk × Glassmorphism hybride  

---

## Design Rationale

De klok is geen gadget — het is een *statement*. Het concept is geïnspireerd op de HUD-interfaces uit sci-fi films (Blade Runner, Ghost in the Shell): een donkere wereld verlicht door neon, met digitale ruis en glasachtige transparantie. De typografie domineert het scherm — de tijd IS het design. Alles eromheen is decoratie die de tijdsweergave versterkt zonder het af te leiden.

De keuze voor een donker thema (dark mode, expliciet gevraagd door de gebruiker) is doelbewust: neon accenten knallen het hardst op een diepe achtergrond. Dit is een van de zeldzame gevallen waarbij dark mode de juiste keuze is.

**Visueel concept:** Een zwevend glasspaneel in een diepe nacht-achtergrond, omgeven door subtiele neon glow-ringen, met een scanline-overlay die de CRT-monitor-esthetiek oproept. De cijfers pulseren zacht — alsof ze leven.

---

## 1. Layout & Compositie

### Paginastructuur
- Volledige viewport: `min-h-screen` met gecentreerde content (`flex items-center justify-center`)
- Achtergrond: diep donker, niet puur zwart — zie kleurpalet
- Eén centraal klokpaneel, zweeft in het midden van het scherm
- Geen navigatie, geen header, geen footer — de klok IS de pagina

### Klokpaneel
- Breedte: `max-w-2xl w-full` (mobiel: `w-[90vw]`, desktop: `max-w-2xl`)
- Padding: `px-12 py-10` (desktop), `px-6 py-8` (mobiel)
- Vorm: `rounded-2xl` (border-radius: 16px)
- Glassmorphism: `backdrop-blur-xl bg-white/5 border border-white/10`
- Box shadow: `shadow-[0_0_80px_rgba(0,255,200,0.08),0_0_160px_rgba(0,255,200,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]`

### Interne structuur (top → bottom)
1. **Label bovenaan** — kleine tekst "SYSTEM TIME" met letter-spacing
2. **Tijdsweergave** — gigantische monospace uren:minuten:seconden
3. **Scheidingslijn** — subtiele neon lijn
4. **Secundaire info rij** — datum links, dag-van-de-week rechts
5. **Statusbalk onderaan** — kleine decoratieve elementen (timezone, een knipperend "LIVE" indicator)

### Decoratieve achtergrond-elementen (buiten het paneel)
- Twee grote, vage neon cirkels (glow blobs) — links-boven en rechts-onder
- Een subtiele grid-overlay over de hele pagina (CSS background-image met kleine stippen of lijnen)
- Scanline-effect als pseudo-element over de hele pagina

---

## 2. Kleurenpalet

> **Let op voor Dex:** Dit ontwerp gebruikt dark mode (expliciet gevraagd). Alle kleuren zijn literal Tailwind classes of inline hex waarden. Geen semantische tokens.

### Achtergrondkleuren
| Doel | Hex | Tailwind / inline |
|------|-----|-------------------|
| Pagina achtergrond | `#050810` | `style={{ backgroundColor: '#050810' }}` |
| Glasspaneel fill | `rgba(255,255,255,0.04)` | `bg-white/[0.04]` |
| Glasspaneel border | `rgba(255,255,255,0.09)` | `border-white/[0.09]` |

### Neon accentkleuren (de "ziel" van het ontwerp)
| Doel | Hex | Gebruik |
|------|-----|---------|
| Primair neon (cyaan-groen) | `#00FFC8` | Uren-cijfers glow, actieve elementen |
| Secundair neon (elektrisch blauw) | `#00B4FF` | Minuten-cijfers, borders |
| Tertiair neon (magenta) | `#FF00A8` | Seconden-cijfers, "LIVE" indicator |
| Dimmed neon (voor labels) | `#4DFFD9` | Subteksten, labels |

### Tekstkleuren
| Doel | Hex | Tailwind |
|------|-----|----------|
| Primaire tijdstekst | `#E8FFF8` | `text-[#E8FFF8]` |
| Labels / secundaire tekst | `#5A8A7A` | `text-[#5A8A7A]` |
| Datum tekst | `#A0C4BB` | `text-[#A0C4BB]` |

### Glow shadows (inline styles voor text-shadow)
```
Uren glow:    text-shadow: 0 0 20px #00FFC8, 0 0 40px #00FFC880, 0 0 80px #00FFC840
Minuten glow: text-shadow: 0 0 20px #00B4FF, 0 0 40px #00B4FF80, 0 0 80px #00B4FF40
Seconden glow: text-shadow: 0 0 20px #FF00A8, 0 0 40px #FF00A880, 0 0 80px #FF00A840
```

---

## 3. Typografie

### Primaire font: "Orbitron"
- Bron: Google Fonts via `<link>` tag in `app/layout.tsx`
- URL: `https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap`
- Karakter: futuristisch, geometrisch, tech-feel — ideaal voor klok-cijfers
- Gebruik: tijdscijfers, labels, statusbalk

### Secundaire font: "Share Tech Mono"
- Bron: Google Fonts via dezelfde `<link>` tag
- URL: `https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap`
- Karakter: monospace, terminal-esthetiek
- Gebruik: datum, dag, timezone, kleine info-teksten

### Typografische schaal

| Element | Font | Grootte (desktop) | Grootte (mobiel) | Gewicht | Letter-spacing |
|---------|------|-------------------|------------------|---------|----------------|
| Tijdscijfers (HH:MM) | Orbitron | `text-[10rem]` / 160px | `text-[4.5rem]` / 72px | 900 | `-0.02em` |
| Seconden (:SS) | Orbitron | `text-[5rem]` / 80px | `text-[2.5rem]` / 40px | 700 | `-0.02em` |
| "SYSTEM TIME" label | Orbitron | `text-xs` / 12px | `text-xs` | 400 | `0.3em` |
| Datum | Share Tech Mono | `text-sm` / 14px | `text-xs` | 400 | `0.1em` |
| Dag van de week | Share Tech Mono | `text-sm` / 14px | `text-xs` | 400 | `0.15em` |
| "LIVE" indicator | Orbitron | `text-[10px]` | `text-[10px]` | 700 | `0.2em` |
| Timezone | Share Tech Mono | `text-[11px]` | `text-[10px]` | 400 | `0.1em` |

### Tijdsweergave layout
De uren en minuten staan naast elkaar, gescheiden door een knipperend `:` karakter.
De seconden staan rechts-onder, iets kleiner, als subscript van de hoofdtijd.

```
┌─────────────────────────────────────┐
│  SYSTEM TIME                        │
│                                     │
│   14:37          :42                │
│         ──────────────              │
│  MAANDAG 19 MEI 2026    UTC+02:00   │
│  ● LIVE                             │
└─────────────────────────────────────┘
```

---

## 4. Animaties & Interacties

> Alle animaties respecteren `prefers-reduced-motion`. Gebruik `@media (prefers-reduced-motion: reduce)` om animaties uit te schakelen.

### 4.1 Seconden-teller flip
- **Effect:** Elke seconde verandert het getal met een snelle verticale slide-out/slide-in
- **Implementatie:** CSS `@keyframes` of Tailwind `transition` op `translateY`
- **Duur:** 150ms ease-out voor uitschuiven, 150ms ease-in voor inschuiven
- **Tailwind:** Gebruik `transition-all duration-150 ease-out`

### 4.2 Knipperend dubbele punt (`:`)
- **Effect:** De `:` tussen uren en minuten knippert elke seconde
- **Implementatie:** CSS `@keyframes blink` — `opacity: 1 → 0 → 1` elke 1 seconde
- **Keyframes:**
  ```css
  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
  ```
- **Duur:** `animation: blink 1s step-start infinite`

### 4.3 Neon glow pulse op de tijdscijfers
- **Effect:** De text-shadow glow pulseert zacht — ademt in en uit
- **Implementatie:** CSS `@keyframes glowPulse`
- **Keyframes:**
  ```css
  @keyframes glowPulse {
    0%, 100% { 
      text-shadow: 0 0 20px #00FFC8, 0 0 40px #00FFC880;
    }
    50% { 
      text-shadow: 0 0 30px #00FFC8, 0 0 60px #00FFC8A0, 0 0 100px #00FFC840;
    }
  }
  ```
- **Duur:** `animation: glowPulse 3s ease-in-out infinite`

### 4.4 Scanline-effect (decoratief)
- **Effect:** Dunne horizontale lijnen over de hele achtergrond — CRT monitor esthetiek
- **Implementatie:** CSS `::before` pseudo-element op de body/main container
- **CSS:**
  ```css
  .scanlines::before {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.15) 2px,
      rgba(0, 0, 0, 0.15) 4px
    );
    pointer-events: none;
    z-index: 10;
  }
  ```
- **Intensity:** Subtiel — niet afleidend. `rgba(0,0,0,0.15)` max.

### 4.5 Achtergrond glow blobs
- **Effect:** Twee grote, vage neon cirkels die langzaam bewegen/pulseren
- **Implementatie:** Twee `div` elementen met `position: fixed`, `border-radius: 50%`, `filter: blur(120px)`, en een langzame `@keyframes` animatie op `transform: scale()`
- **Blob 1 (cyaan-groen):** Links-boven, `#00FFC8` met `opacity: 0.06`, 600px diameter
- **Blob 2 (elektrisch blauw):** Rechts-onder, `#00B4FF` met `opacity: 0.06`, 500px diameter
- **Animatie:** `animation: blobFloat 8s ease-in-out infinite alternate`
  ```css
  @keyframes blobFloat {
    from { transform: scale(1) translate(0, 0); }
    to { transform: scale(1.15) translate(20px, -20px); }
  }
  ```

### 4.6 "LIVE" indicator
- **Effect:** Een kleine rode/magenta stip knippert naast het woord "LIVE"
- **Implementatie:** `animate-pulse` (Tailwind) op een `w-2 h-2 rounded-full` div
- **Kleur:** `background-color: #FF00A8`

### 4.7 Paneel hover state
- **Effect:** Bij hover over het glasspaneel licht de border iets meer op
- **Implementatie:** `transition-all duration-500` + hover border kleur
- **Hover border:** `rgba(0,255,200,0.25)` → `rgba(0,255,200,0.45)`

### 4.8 Initiële mount animatie
- **Effect:** Het paneel fadeert in en schuift licht omhoog bij het laden
- **Implementatie:** `useEffect` met een state toggle na mount, CSS transition
- **Keyframes:** `opacity: 0, translateY(20px)` → `opacity: 1, translateY(0)`
- **Duur:** 800ms `ease-out`, 200ms delay

---

## 5. Decoratieve grid achtergrond

Subtiele stippengrid over de hele pagina:
```css
background-image: radial-gradient(circle, rgba(0,255,200,0.08) 1px, transparent 1px);
background-size: 40px 40px;
```
Dit geeft een tech/blueprint gevoel zonder de klok te overstemmen.

---

## 6. Responsive gedrag

| Breakpoint | Tijdscijfers | Seconden | Paneel padding |
|------------|-------------|----------|----------------|
| Mobile (`< 640px`) | `text-[4.5rem]` (72px) | `text-[2.5rem]` (40px) | `px-6 py-8` |
| Tablet (`640px–1024px`) | `text-[7rem]` (112px) | `text-[3.5rem]` (56px) | `px-10 py-9` |
| Desktop (`> 1024px`) | `text-[10rem]` (160px) | `text-[5rem]` (80px) | `px-12 py-10` |

Op mobiel: de seconden schuiven naar een eigen rij onder de hoofdtijd, gecentreerd.

---

## 7. Accessibility

### Contrast
- Tijdscijfers `#E8FFF8` op `#050810` achtergrond → contrast ratio ≈ **16:1** (ver boven WCAG AA)
- Labels `#5A8A7A` op `#050810` → contrast ratio ≈ **3.8:1** (voldoet aan WCAG AA voor kleine tekst)
- "LIVE" tekst `#FF00A8` op donkere achtergrond → contrast ratio ≈ **5.2:1** ✓

### Semantische HTML
- Gebruik `<time>` element voor de tijdsweergave met `dateTime` attribuut (bijv. `dateTime="14:37:42"`)
- `aria-live="polite"` op de tijdcontainer zodat screenreaders updates aankondigen
- `aria-label="Huidige tijd: 14 uur, 37 minuten en 42 seconden"` op het `<time>` element
- Scanline pseudo-element heeft `aria-hidden="true"`

### Motion preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Focus states
- Geen interactieve elementen in dit ontwerp, maar als er ooit knoppen komen: `focus:ring-2 focus:ring-[#00FFC8] focus:outline-none`

### Touch targets
- Geen touch-interactie vereist voor de klok zelf

---

## 8. Technische implementatie-instructies voor Dex

### Font laden (in `app/layout.tsx`)
```html
<link
  href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap"
  rel="stylesheet"
/>
```

### CSS animaties (in `app/globals.css`)
Voeg toe na `@import "tailwindcss";`:
```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 20px #00FFC8, 0 0 40px rgba(0,255,200,0.5); }
  50% { text-shadow: 0 0 30px #00FFC8, 0 0 60px rgba(0,255,200,0.6), 0 0 100px rgba(0,255,200,0.25); }
}

@keyframes glowPulseBlue {
  0%, 100% { text-shadow: 0 0 20px #00B4FF, 0 0 40px rgba(0,180,255,0.5); }
  50% { text-shadow: 0 0 30px #00B4FF, 0 0 60px rgba(0,180,255,0.6), 0 0 100px rgba(0,180,255,0.25); }
}

@keyframes glowPulseMagenta {
  0%, 100% { text-shadow: 0 0 20px #FF00A8, 0 0 40px rgba(255,0,168,0.5); }
  50% { text-shadow: 0 0 30px #FF00A8, 0 0 60px rgba(255,0,168,0.6), 0 0 100px rgba(255,0,168,0.25); }
}

@keyframes blobFloat {
  from { transform: scale(1) translate(0, 0); }
  to { transform: scale(1.15) translate(20px, -20px); }
}

@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Component structuur (`components/HomePage.tsx`)
```
'use client'

State:
- time: { hours, minutes, seconds } — geüpdated via setInterval elke 1000ms
- mounted: boolean — voor fade-in animatie

Render structuur:
<main> (volledige viewport, achtergrond + scanlines + grid)
  <div> (blob 1 — cyaan links boven, fixed, blur)
  <div> (blob 2 — blauw rechts onder, fixed, blur)
  
  <div> (glasspaneel, gecentreerd)
    <p> "SYSTEM TIME" label
    
    <time dateTime="..." aria-label="...">
      <div> (flex row, tijdscijfers)
        <span> uren (Orbitron 900, neon cyaan glow)
        <span> ":" (knippert, zelfde kleur)
        <span> minuten (Orbitron 900, neon blauw glow)
        <span> ":" (klein, gedimmed)
        <span> seconden (Orbitron 700, neon magenta glow, kleiner)
      </div>
    </time>
    
    <hr> (subtiele neon lijn, rgba(0,255,200,0.2))
    
    <div> (flex row, space-between)
      <span> datum (Share Tech Mono)
      <span> dag van de week (Share Tech Mono)
    </div>
    
    <div> (flex row, items-center, gap)
      <div> (pulserende stip, magenta)
      <span> "LIVE" (Orbitron, klein)
      <span> timezone rechts (Share Tech Mono)
    </div>
  </div>
</main>
```

### Tijdnotatie
- Uren en minuten: altijd 2 cijfers met leading zero (`String(h).padStart(2, '0')`)
- Seconden: altijd 2 cijfers met leading zero
- Datum: Nederlands formaat — "MA 19 MEI 2026"
- Dag: volledige naam in hoofdletters — "MAANDAG"
- Timezone: `Intl.DateTimeFormat().resolvedOptions().timeZone` of fallback "UTC+02:00"

---

## 9. Visuele referenties

Het eindresultaat moet aanvoelen als een kruising tussen:
- **Blade Runner 2049** — de oranje/cyaan kleurcontrasten, de donkere atmosfeer
- **Ghost in the Shell** — de holografische HUD-interfaces
- **Apple Vision Pro** — de glassmorphism transparantie en verfijning

Het is een klok die mensen laat stoppen en zeggen: "Wauw, dat is mooi."
