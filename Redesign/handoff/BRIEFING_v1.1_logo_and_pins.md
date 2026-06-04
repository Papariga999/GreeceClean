# Briefing — Swap logo + map pins everywhere (GreeceClean v1.1)

**For:** the developer working in `Papariga999/GreeceClean` (Next.js + Tailwind + Supabase) and/or the **Android** app.
**Goal:** make the **revised v1.1 pin-as-“G” logo** and the **severity-tinted map pins** the *only* logo/marker artwork in the codebase. Replace every remaining instance of the old mark and the plain colored map dots.

> This is a visual swap only — **no copy, route, schema, or i18n changes.** Work in small, reviewable commits.

---

## 0. What changed in v1.1

- The mark is the refined **pin-as-“G”**: bolder G, **two-tone eco leaf with a midrib**, crisper **Aegean waves**, tapered point.
- The **G is deliberately its own letterform — it must NOT read like the Google “G”.** If you ever regenerate or trace the mark, keep this distinction.
- Wordmark: **“Greece”** Aegean Blue `#0D6FDB` · **“Clean”** Eco Green `#39B24A`. Tagline `REPORT IT. CLEAN IT. LOVE GREECE.` (uppercase, letter-spaced).
- Colors are unchanged from the 2026 refresh (Aegean Blue `#0D6FDB` / Eco Green `#39B24A` / Sea Mist `#F2F7FB`).

All artwork below is final and lives in **`handoff/brand/`**.

---

## 1. Logo assets — replace these files

Copy into `public/brand/` (overwrite the existing ones):

| File (`handoff/brand/`) | Use |
|---|---|
| `logo-lockup.png` | full lockup (symbol + wordmark + tagline) — hero, footer, emails, OG |
| `logo-symbol.png` | colour pin-“G” — light backgrounds, favicons |
| `logo-symbol-white.png` | white pin-“G” + green leaf — blue/dark backgrounds (header, splash) |
| `app-icon.png` | rounded blue square + white mark — source for PWA/launcher |
| `icon-192.png` · `icon-512.png` | PWA icons |
| `apple-touch-icon.png` | 180×180 |
| `favicon-32.png` · `favicon-64.png` | favicons (blue square + white mark — bold at small sizes) |

**Swap every usage** (these are the known spots — grep to be sure):
- `components/Header.tsx` — white mark on the blue bar + the two-colour wordmark.
- `components/Footer.tsx` — symbol next to the copyright.
- Landing hero (`app/(public)/page.tsx`) — optional full `logo-lockup.png`.
- `app/layout.tsx` `metadata.icons` (favicon + apple-touch) and `manifest.json` (`icon-192/512`, `theme_color: #0D6FDB`).
- OG/Twitter image — regenerate from `logo-lockup.png` (1200×630).
- **Delete the legacy `public/icon.svg`** (old white-droplet-on-green) if it still exists, and drop any `icon.svg` entry from the manifest.

A single `<Logo variant="symbol|white|lockup" />` component (see the older `BRIEFING_logo_and_color_rebrand.md`) keeps paths out of pages.

---

## 2. Map pins — replace the colored dots with the severity pin-“G”

The map currently uses plain colored dots / a generic marker. Swap the **shape** to the brand pin-“G” while keeping the **severity colour** (the age read is important).

**Assets:** `handoff/brand/pins/pin-{fresh,recent,aging,ignored}.png` — the brand pin tinted by days-open, leaf + waves knocked out. Each is 221×301 (w:h ≈ 0.734), transparent.

| Pin | Severity | Days open | Fill |
|---|---|---|---|
| `pin-fresh.png` | fresh | `< 7` | `#1FA64B` green |
| `pin-recent.png` | recent | `< 30` | `#F2B70C` amber |
| `pin-aging.png` | aging | `< 60` | `#F4761B` orange |
| `pin-ignored.png` | ignored | `≥ 60` | `#E23B3B` red |

**Leaflet drop-in** (`components/MapClient.tsx`):

```ts
const SEVERITY_PIN = {
  fresh:   '/brand/pins/pin-fresh.png',
  recent:  '/brand/pins/pin-recent.png',
  aging:   '/brand/pins/pin-aging.png',
  ignored: '/brand/pins/pin-ignored.png',
}
const severityKey = (d: number) =>
  d < 7 ? 'fresh' : d < 30 ? 'recent' : d < 60 ? 'aging' : 'ignored'

const pinIcon = (daysOpen: number) => L.icon({
  iconUrl:   SEVERITY_PIN[severityKey(daysOpen)],
  iconSize:  [30, 41],     // ~221:301 scaled
  iconAnchor:[15, 41],     // tip touches the coordinate
  popupAnchor:[0, -38],
  className: 'gc-pin',     // drop-shadow for legibility (below)
})
```
```css
.gc-pin { filter: drop-shadow(0 0 1.5px #fff) drop-shadow(0 2px 3px rgba(0,0,0,.35)); }
```

- **Resolved** reports → `pin-fresh.png` (green already reads as “good”).
- **Clusters** → keep the count badge; tint the cluster bubble by the **worst** severity in the cluster.
- **Report-detail mini-map** → same `pinIcon(daysOpen)`.
- For retina, add a 2× `iconRetinaUrl`, or use an inline SVG `divIcon` tinted via CSS if you prefer vector.

> Reference implementation: the design system renders exactly this via `MapMarker` in `accountability/brand.jsx` (`<MapMarker days={47} cluster={5} />`) and showcases all states in `preview/brand-mappins.html`. Thresholds/colours there match this table.

---

## 3. Android app (native)

If you ship a native Android app, the full launcher set is ready in **`handoff/brand/android/`** — adaptive `ic_launcher.xml`, `ic_launcher_foreground/background`, all `mipmap-*` densities, the 512×512 Play Store icon and the background colour resource. Drop-in + manifest wiring: `handoff/brand/android/README.md`.

---

## 4. Grep for stragglers

```
rg -i "icon\.svg|🌿\s*GreeceClean|005BAE|6B8E23"      # old launcher / emoji wordmark / old hex
rg -i "divIcon|L\.marker\(|default.*marker|circleMarker"  # remaining plain map markers
```
Keep the **status / priority / category** colour systems unchanged — only the brand blue/green and the marker *shape* change.

---

## 5. Acceptance checklist

- [ ] Header, footer, landing, report flow, tracking, map, admin all show the **v1.1 mark** (no old droplet, no 🌿 emoji wordmark).
- [ ] Favicon, apple-touch, PWA install icon = new app icon; `theme_color = #0D6FDB`.
- [ ] OG/Twitter share image = new lockup.
- [ ] **Cluster map + report-detail map** render the **severity pin-“G”** with correct day thresholds + legible outline; cluster badges intact.
- [ ] Legacy `icon.svg` removed; grep is clean.
- [ ] (Android) launcher icon installed from `brand/android/`, masks (circle/squircle) keep the mark in the safe zone.
