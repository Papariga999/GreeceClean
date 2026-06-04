# Briefing — Adopt the new GreeceClean logo & colors across all pages

**For:** Claude Code, working in the `Papariga999/GreeceClean` repo (Next.js + Tailwind + Supabase).
**Goal:** Replace the old identity (blue `#005BAE` / olive `#6B8E23` + the old droplet `icon.svg`) with the **refreshed 2026 GreeceClean identity** — the pin‑as‑“G” logo with the eco leaf + Aegean waves, and the new Aegean‑Blue / Eco‑Green palette — on **every page and component**.

Work in small, reviewable commits. Don’t change product copy, routes, or data — this is a visual rebrand only.

---

## 1. Logo assets

Four production‑ready PNGs have been prepared (transparent background). Add them to the repo and use them everywhere a logo appears.

| File | What it is | Use on |
|------|-----------|--------|
| `logo-symbol.png` | Color pin‑“G” (blue body, green leaf, white waves) | Light backgrounds, map pins, favicons |
| `logo-symbol-white.png` | White pin‑“G” + green leaf, transparent interior | Blue/dark backgrounds (header, splash) |
| `logo-lockup.png` | Full lockup: symbol + “GreeceClean” + tagline | Landing hero, footer, emails, OG image |
| `app-icon.png` | Rounded blue square + white mark | PWA icon, apple‑touch‑icon |

**Steps**
1. Place the four PNGs in `public/brand/` (e.g. `public/brand/logo-symbol.png`).
2. **Replace the old launcher** `public/icon.svg`:
   - Generate PWA icons from `app-icon.png` at **192×192** and **512×512** → `public/icon-192.png`, `public/icon-512.png`.
   - Update `public/manifest.json` `icons[]` to point at those (drop the old `icon.svg` entry). Set `theme_color` and `background_color` to `#0D6FDB`.
   - Add `apple-touch-icon` (180×180 from `app-icon.png`) and a `favicon` (32×32 from `logo-symbol.png`) and reference them in `app/layout.tsx` `metadata.icons`.
3. If you have access to a **vector (SVG)** of the mark, prefer it for the inline header/footer logo and favicon — the PNGs are raster and will soften at very large sizes. (Ask the user for the SVG if not in the repo.)

**Ideal:** add a small `components/Logo.tsx` that renders the right asset by context, so no page hardcodes a path:

```tsx
import Image from 'next/image'

type Props = { variant?: 'symbol' | 'white' | 'lockup'; size?: number }
const SRC = {
  symbol: '/brand/logo-symbol.png',
  white:  '/brand/logo-symbol-white.png',
  lockup: '/brand/logo-lockup.png',
}
// symbol aspect ratio ≈ 221:301 (w:h)
export default function Logo({ variant = 'symbol', size = 28 }: Props) {
  if (variant === 'lockup')
    return <Image src={SRC.lockup} alt="GreeceClean" width={size * 3.1} height={size} priority />
  const h = Math.round(size * (301 / 221))
  return <Image src={SRC[variant]} alt="GreeceClean" width={size} height={h} priority />
}
```

**Replace these usages:**
- `components/Header.tsx` — the 🌿 emoji + “GreeceClean” text lockup → `<Logo variant="white" size={26} />` + the wordmark (white “Greece” / light‑green “Clean”), since the header bar is blue.
- `components/Footer.tsx` — add `<Logo variant="symbol" />` next to the copyright if desired.
- Landing hero (`app/(public)/page.tsx`) — optionally show `<Logo variant="lockup" />`.
- **Map pins** (`components/MapClient.tsx`) — replace the Leaflet `divIcon` / default marker with `logo-symbol.png` as the pin image (the symbol already *is* a teardrop pin). Add a white outline/`drop-shadow` for legibility and keep the cluster count badge. Suggested: `L.icon({ iconUrl: '/brand/logo-symbol.png', iconSize: [30, 41], iconAnchor: [15, 41], popupAnchor: [0, -38] })`.
- Any `<title>`/OG/Twitter image → regenerate from `logo-lockup.png`.

---

## 2. Color tokens

The brand moved from **`#005BAE` / `#6B8E23`** to **Aegean Blue `#0D6FDB` / Eco Green `#39B24A`**, each with a full 50–900 ramp, plus **Sea Mist `#F2F7FB`** as a light brand surface.

### 2a. `tailwind.config.ts` — replace the `primary` and `action` scales

```ts
// theme.extend.colors
primary: {
  DEFAULT: '#0D6FDB',
  50:  '#EAF2FC', 100: '#D2E3FB', 200: '#A6C7F7', 300: '#79ABF3', 400: '#4D8FEF',
  500: '#0D6FDB', 600: '#0B57AD', 700: '#084A92', 800: '#063463', 900: '#031C36',
},
action: {
  DEFAULT: '#39B24A',
  50:  '#ECF7EE', 100: '#D7EFDB', 200: '#AEDFB6', 300: '#BFE0C6', 400: '#5DBF6D',
  500: '#39B24A', 600: '#2E8C3B', 700: '#2E7D34', 800: '#17471D', 900: '#0B230F',
},
'sea-mist': '#F2F7FB',
```

Because the codebase already uses semantic class names (`bg-primary`, `text-primary`, `hover:bg-primary-600`, `bg-action`, `hover:bg-action-600`, `text-action-300`), **most of the rebrand happens automatically** once these tokens change. Verify the hover/focus steps still read well:
- Primary buttons: `bg-primary hover:bg-primary-600`, focus ring `ring-primary-300`.
- Action buttons: `bg-action hover:bg-action-600`, focus ring `ring-action-300`.
- Hero highlight word (“Clean”) on blue: use `action-300` (`#BFE0C6`) for contrast, not `action-500`.

### 2b. `app/globals.css`

- Update the hero gradient to the new blues: `bg-gradient-to-br from-primary to-primary-600` (now `#0D6FDB → #0B57AD`) — confirm it still uses these tokens.
- If any **raw hex** `#005BAE` or `#6B8E23` are hardcoded anywhere, replace them:
  - `#005BAE` → `#0D6FDB` (and `#00488B` → `#0B57AD` for the hover/dark step)
  - `#6B8E23` → `#39B24A` (and `#55711C` → `#2E8C3B`)
- Light section backgrounds may use `#F9FAFB` (gray‑50) today; where a *brand‑tinted* surface is wanted, switch to `sea-mist` `#F2F7FB`.

### 2c. Grep for stragglers

Search and replace any hardcoded old values across the repo:
```
rg -i "005BAE|00488B|6B8E23|55711C|🌿\s*GreeceClean|icon\.svg"
```
- Map‑pin status tints in `MapClient.tsx` (the lighter `#1d4ed8` / `#15803d` etc.) can stay — those are the **status lifecycle** colors, not brand. Only the brand blue/green change.
- The status / category / priority palettes (yellow/blue/purple/green/red pills, pastel category tints) are **unchanged** — do not touch them.

---

## 3. What NOT to change

- **No copy, route, schema, or i18n changes.** Visual only.
- Keep the **trilingual** behavior and the **no‑login** flow exactly as‑is.
- Keep the **status / priority / category** color systems unchanged.
- Don’t introduce gradients/shadows beyond what exists; the system stays flat with `rounded-2xl` cards and minimal `shadow-sm`.

---

## 4. Acceptance checklist

- [ ] Header, footer, landing, report flow, tracking page, map, and admin dashboard all show the **new mark** (no 🌿 emoji wordmark, no old droplet).
- [ ] Map pins render as the new pin‑“G” with a legible outline + working cluster badges.
- [ ] PWA install icon, favicon, and apple‑touch‑icon are the new app icon.
- [ ] No remaining `#005BAE` / `#6B8E23` / `icon.svg` references (grep is clean).
- [ ] Primary = `#0D6FDB`, Action = `#39B24A` everywhere via Tailwind tokens; hover/focus steps verified.
- [ ] OG/Twitter share image uses the new lockup.
- [ ] Light/dark contrast: white “Greece” + `action-300` “Clean” on the blue header is legible.

---

### Reference — design system
A full design system for this identity (tokens, specimen cards, and interactive UI kits) lives alongside this briefing: see `colors_and_type.css` (all tokens as CSS variables), `README.md` (visual + content foundations), and `ui_kits/` (website + admin recreations) for exact spacing, type, and component treatments to match.
