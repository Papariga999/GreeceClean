# Handover — Adopt the **Katharos** visual identity

**For:** Codex (Antigravity), working in the production `GreeceClean` repository
**Scope:** **Visual rebrand only** — logo, map pins, colours, fonts.
**Do NOT change:** component structure, routes, data flow, i18n strings, product copy, business logic, API calls, DB schema, or any user-facing wording. This is a skin swap, not a refactor.

> The product is being rebranded from **GreeceClean** to **Katharos** (καθαρός — Greek for *"pure, clean"*). This document covers only the four visual layers. A separate decision will handle renaming the product string itself — **for this task, leave all visible "GreeceClean" copy as-is unless a line item below explicitly says otherwise.**

---

## 0. TL;DR — what changes

| Layer | From (GreeceClean) | To (Katharos) |
|---|---|---|
| **Primary** | Aegean Blue `#0D6FDB` | Aegean `#006994` + Sky accent `#0090C4` |
| **Action/Eco** | Eco Green `#39B24A` | Olive `#6B7C3A` |
| **Accent** | — | Sand `#C9A96E` |
| **Light ground** | `#F2F7FB` / white | Marble `#F5F2ED` |
| **Dark ground** | navy/blue | Ink `#1A1A2E` |
| **Display/heading font** | Inter (bold) | **Cormorant Garamond** (light serif) |
| **Body/UI font** | Inter | **DM Mono** |
| **Logo** | filled pin "G" | leaf-droplet over Aegean waves, ring + sky dot |
| **Map pins** | blue/green status pins | severity teardrop (olive→sand→amber→terracotta) |

Work through sections **1 → 4** below. Each has exact file targets and paste-ready values.

---

## 1. Colour — token swap

The cleanest path is to **redefine the design tokens in place** so every consumer inherits the new palette. Do a global find-and-replace of the raw hexes **and** update the named token definitions.

### 1a. `tailwind.config.ts` — `theme.extend.colors`

Replace the brand colour scales. Keep the **same key names** (`primary`, `action`, etc.) so utility classes like `bg-primary`, `text-action-600` keep working untouched:

```ts
colors: {
  primary: {            // was Aegean Blue #0D6FDB
    DEFAULT: '#006994', // Aegean
    50:'#E6EFF3',100:'#C0DAE3',200:'#8BBDCD',300:'#56A0B7',400:'#2285A4',
    500:'#006994',600:'#005A80',700:'#004A6A',800:'#003851',900:'#002636',
  },
  sky: {                // NEW — bright accent (links on dark, the "a", dots)
    DEFAULT:'#0090C4',
    50:'#E6F4FA',100:'#C0E4F1',200:'#87CDE6',300:'#4FB6DB',400:'#1F9FCF',
    500:'#0090C4',600:'#0079A4',700:'#006184',
  },
  action: {             // was Eco Green #39B24A
    DEFAULT:'#6B7C3A',  // Olive
    50:'#F0F2E9',100:'#DCE1C8',200:'#C0C99B',300:'#A4B16E',400:'#889A4D',
    500:'#6B7C3A',600:'#5A6830',700:'#495427',800:'#353D1C',900:'#232911',
  },
  sand: {               // NEW — warm metallic accent / eyebrows
    DEFAULT:'#C9A96E',
    50:'#F8F3EA',100:'#EFE3CC',200:'#E0C9A0',300:'#D1B681',600:'#A8843F',700:'#8A6B30',
  },
  marble: { DEFAULT:'#F5F2ED', dark:'#E8E3DA' },  // warm light ground + hairline
  ink:    { DEFAULT:'#1A1A2E', 700:'#23233C' },   // dark ground
},
```

### 1b. `app/globals.css` — CSS custom properties

If the repo also defines `--*` variables (it does, in `@layer base :root`), mirror the same values there:

```css
:root {
  --primary: #006994;  --primary-600: #005A80;  --primary-700: #004A6A;
  --sky: #0090C4;
  --action: #6B7C3A;   --action-600: #5A6830;
  --sand: #C9A96E;
  --marble: #F5F2ED;   --marble-dark: #E8E3DA;
  --ink: #1A1A2E;
  /* page background → Marble */
  --bg: var(--marble);
}
```

### 1c. Raw hex sweep (catch hardcoded values)

Run a repo-wide replace for stragglers in inline styles, Leaflet config, email templates, and chart colours. **Map exactly:**

```
#0D6FDB → #006994     #0B57AD → #005A80     #0B3F7E → #004A6A
#39B24A → #6B7C3A     #2E8C3B → #5A6830     #2E7D34 → #495427
#F2F7FB → #F5F2ED     #E0EAF4 → #E8E3DA
```
(Case-insensitive. A full 32-pair mapping table is in the design-system repo at `colors_and_type.css` if you hit tints not listed here.)

### 1d. Status & severity colours

The **report-lifecycle status pills** and the **"how long ignored" severity ramp** move to an earthy set. Update wherever these are defined (likely `lib/status.ts` / `lib/severity.ts` or a constants file):

```ts
// Status pills  {bg, fg}
pending   : { bg:'#F4EFD8', fg:'#6E5A12' }   // warm amber
inReview  : { bg:'#D9E8EF', fg:'#004A6A' }   // aegean
forwarded : { bg:'#E7E3F0', fg:'#4B3F73' }   // muted violet
resolved  : { bg:'#E3EAD2', fg:'#495427' }   // olive
rejected  : { bg:'#F2DDD6', fg:'#8A3B23' }   // terracotta

// Severity ramp (days a report has waited)
fresh   : '#5A6830'   // < 7d   olive
recent  : '#C9A96E'   // < 30d  sand
aging   : '#C57A3C'   // < 60d  amber
ignored : '#9A3517'   // 60d+   terracotta
```

---

## 2. Fonts — Inter → Cormorant Garamond + DM Mono

The new system pairs a **humanist serif for display/headings** with a **monospace for all UI/body/numerals**. There is **no sans-serif** anymore.

### 2a. Load the fonts (`app/layout.tsx`, `next/font/google`)

```ts
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['greek','latin'], weight: ['300','400','500','600','700'],
  variable: '--font-display', display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['greek','latin'], weight: ['300','400','500'],
  variable: '--font-mono', display: 'swap',
});
// apply both variables on <html> or <body>:
<body className={`${cormorant.variable} ${dmMono.variable}`}>
```
Remove the existing `Inter(...)` import and its className.

### 2b. `tailwind.config.ts` — `theme.extend.fontFamily`

```ts
fontFamily: {
  // body / UI / everything by default → DM Mono (replaces sans)
  sans:    ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
  mono:    ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
  display: ['var(--font-display)', 'Georgia', 'serif'],
  serif:   ['var(--font-display)', 'Georgia', 'serif'],
},
```
Mapping `sans` → DM Mono means **existing `font-sans` usages and the default body font flip to mono automatically** — no per-element edits needed for body text.

### 2c. Headings → serif

Headings should use the serif at **light/medium** weight (300–500), not bold. Two options:

- **Global (preferred):** in `globals.css`, add
  ```css
  h1,h2,h3,h4 { font-family: var(--font-display); font-weight: 500; letter-spacing: 0.01em; }
  .wordmark, .display { font-family: var(--font-display); font-weight: 300; letter-spacing: 0.16em; }
  ```
- Or change `font-sans font-bold` → `font-display font-medium` on heading components only.

> ⚠️ Cormorant is a **light** face — `font-bold` (700) on large display text will look heavy/wrong. Prefer `font-light`/`font-normal`/`font-medium`. Body stays DM Mono at 400.

---

## 3. Logo — leaf-droplet over Aegean waves

Replace the old pin/"G" mark everywhere it appears (header, footer, splash, favicon, share cards, emails). The mark is **pure SVG** — no raster dependency. Drop in a `Logo` component and swap usages.

### 3a. `components/brand/Logo.tsx` (new file)

```tsx
// Variants: 'color' (on light), 'white' (on Aegean), 'ink' (on dark)
const P = {
  color: { leaf:'rgba(107,124,58,0.22)', leafStroke:'#6B7C3A', wave1:'#006994', wave2:'rgba(0,144,196,0.40)', dot:'#0090C4', ring:'rgba(0,144,196,0.28)' },
  white: { leaf:'rgba(255,255,255,0.22)', leafStroke:'#FFFFFF', wave1:'#FFFFFF', wave2:'rgba(255,255,255,0.45)', dot:'#FFFFFF', ring:'rgba(255,255,255,0.30)' },
  ink:   { leaf:'rgba(107,124,58,0.30)',  leafStroke:'#8A9A4D', wave1:'#0090C4', wave2:'rgba(0,144,196,0.45)', dot:'#0090C4', ring:'rgba(255,255,255,0.16)' },
};

export function BrandMark({ size = 44, variant = 'color', ring = true }) {
  const p = P[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" role="img" aria-label="Katharos">
      {ring && <circle cx="60" cy="60" r="55" stroke={p.ring} strokeWidth="1" />}
      <path d="M18 72 Q30 60 42 72 Q54 84 66 72 Q78 60 90 72 Q100 81 102 75" stroke={p.wave1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M22 80 Q34 68 46 80 Q58 92 70 80 Q82 68 94 80" stroke={p.wave2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M60 20 C60 20 40 40 40 55 C40 66 49 74 60 74 C71 74 80 66 80 55 C80 40 60 20 60 20Z" fill={p.leaf} stroke={p.leafStroke} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="60" cy="55" r="3" fill={p.dot} />
    </svg>
  );
}

// Wordmark lockup — "Katharos" in Cormorant Light, the "a" in Sky.
export function Logo({ mark = 30, on = 'light' }: { mark?: number; on?: 'light'|'blue'|'ink' }) {
  const onDark = on === 'blue' || on === 'ink';
  const variant = on === 'blue' ? 'white' : on === 'ink' ? 'ink' : 'color';
  const word = onDark ? '#FAFAF8' : '#1A1A2E';
  const a = on === 'blue' ? '#FFFFFF' : '#0090C4';
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:12 }}>
      <BrandMark size={mark * 1.45} variant={variant} ring />
      <span style={{ fontFamily:'var(--font-display), Georgia, serif', fontSize:mark*1.35, fontWeight:300, letterSpacing:'0.16em', color:word }}>
        K<span style={{ color:a }}>a</span>tharos
      </span>
    </span>
  );
}
```

### 3b. Swap usages

- Header (on Aegean bar): `<Logo on="blue" />`
- Footer / dark sections (on Ink): `<Logo on="ink" />`
- Light surfaces: `<Logo on="light" />`
- Bare mark (compact/mobile): `<BrandMark variant="…" />`

> The wordmark text is **"Katharos"** with the second letter in Sky. If the header currently hardcodes the string "GreeceClean", that is the **one** copy string this task changes — replace it with the `Logo` component. Leave all other body copy alone.

### 3c. Static assets (`public/`)

Regenerate these from the new mark (the design-system repo ships ready-made PNGs in `assets/` you can copy directly):
`favicon.ico` / `icon-192.png` / `icon-512.png` / `apple-icon.png` → **Ink rounded square + Aegean radial bloom + white emblem**. Also update `manifest.json` `theme_color` → `#006994`, `background_color` → `#1A1A2E`.

---

## 4. Map pins — severity teardrop

The Leaflet markers change from status-coloured pins to a **filled teardrop carrying the leaf-drop DNA**, tinted by **how long the report has waited**. Find the marker factory (likely `components/map/markerIcon.ts` using `L.divIcon` / `L.icon`).

### 4a. Severity → colour

```ts
function pinColor(days: number) {
  if (days < 7)  return '#5A6830'; // fresh   — olive
  if (days < 30) return '#C9A96E'; // recent  — sand
  if (days < 60) return '#C57A3C'; // aging   — amber
  return '#9A3517';                // ignored — terracotta
}
```

### 4b. `L.divIcon` SVG (paste-ready)

```ts
const pinSvg = (fill: string, active = false) => `
<svg width="${active?34:28}" height="${active?46:38}" viewBox="0 0 44 60" fill="none"
     style="filter:drop-shadow(0 0 1.4px rgba(255,255,255,.95)) drop-shadow(0 3px 4px rgba(0,0,0,.30))">
  <path d="M22 2 C11 2 2 11 2 22 C2 36 22 58 22 58 C22 58 42 36 42 22 C42 11 33 2 22 2Z" fill="${fill}"/>
  <path d="M22 9 C22 9 13 17 13 24 C13 29 17 33 22 33 C27 33 31 29 31 24 C31 17 22 9 22 9Z" fill="rgba(255,255,255,0.92)"/>
  <circle cx="22" cy="24" r="2.4" fill="${fill}"/>
</svg>`;

const icon = (days: number, active = false) => L.divIcon({
  html: pinSvg(pinColor(days), active),
  className: 'kt-pin',
  iconSize:   [active?34:28, active?46:38],
  iconAnchor: [ (active?34:28)/2, active?46:38 ],  // tip = geo point
  popupAnchor:[ 0, -(active?46:38)+6 ],
});
```

### 4c. Clusters

If `MarkerClusterGroup` is used, recolour cluster bubbles to **Ink `#1A1A2E`** with a white count and 2px white border (replace the old blue cluster CSS in `globals.css` / the cluster `iconCreateFunction`).

Raster fallbacks (`pin-fresh/recent/aging/ignored.png`) are in the design-system `assets/` if you prefer `L.icon` over inline SVG.

---

## 5. Verification checklist

- [ ] No `#0D6FDB` / `#39B24A` (or their tint variants) remain — grep the repo.
- [ ] No `Inter` import or `font-family` referencing Inter remains.
- [ ] Headings render in Cormorant (serif), body/UI in DM Mono.
- [ ] Header, footer, favicon, PWA icons, share/email templates all show the new leaf-drop mark.
- [ ] Map pins are teardrops tinted by age; clusters are Ink; tip anchors on the geo point.
- [ ] **Diff sanity:** the only copy string touched is the header/footer wordmark → "Katharos". All routes, i18n keys, body copy, and logic are byte-identical otherwise.
- [ ] Light pages sit on Marble `#F5F2ED`; dark sections/hero on Ink `#1A1A2E`.

---

## Reference assets (design-system repo)

Everything above is realised in the Katharos design system — copy from it rather than re-deriving:

| Need | File |
|---|---|
| All tokens (colour ramps, type scale, radii, shadows) | `colors_and_type.css` |
| Logo / pin React source (canonical) | `accountability/brand.jsx` → `BrandMark`, `Logo`/`Lockup`, `MapMarker`, `AppIcon` |
| Ready PNGs (icons, favicons, lockup, pins) | `assets/` |
| Full visual spec (logo, colour, type, voice) | `Katharos Brand Guideline.html` |
| Old identity (rollback reference) | `backup_v1_greececlean/` |
