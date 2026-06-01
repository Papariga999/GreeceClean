# GreeceClean — Rebrand Handoff Package

Everything Claude Code (or any developer) needs to adopt the refreshed **GreeceClean** identity — the pin‑as‑“G” logo + Aegean‑Blue / Eco‑Green palette — across the `Papariga999/GreeceClean` repo.

## Contents

```
handoff/
├─ BRIEFING_logo_and_color_rebrand.md   ← START HERE: full step-by-step brief
├─ colors_and_type.css                  ← all design tokens as CSS variables (reference)
└─ brand/
   ├─ logo-symbol.png          color pin-“G” (light backgrounds, map pins)
   ├─ logo-symbol-white.png    white pin-“G” + green leaf (blue/dark backgrounds)
   ├─ logo-lockup.png          full lockup: symbol + “GreeceClean” + tagline
   ├─ app-icon.png             rounded blue square + white mark (source)
   ├─ icon-192.png             PWA icon 192×192
   ├─ icon-512.png             PWA icon 512×512 (any maskable)
   ├─ apple-touch-icon.png     180×180
   ├─ favicon-32.png           32×32
   ├─ favicon-64.png           64×64
   └─ manifest.example.json    drop-in manifest icons + theme/background color
```

## Quick start

1. Copy `brand/*.png` into the repo at `public/brand/`.
2. Follow **`BRIEFING_logo_and_color_rebrand.md`** — it covers the logo swaps (Header, Footer, hero, map pins, favicon/PWA) and the exact `tailwind.config.ts` color ramps.
3. Merge `brand/manifest.example.json` into `public/manifest.json`.
4. Wire icons in `app/layout.tsx` `metadata` (snippet below).
5. Run the grep in the brief to catch any hardcoded old hex / `icon.svg`.

### `app/layout.tsx` — metadata.icons snippet

```ts
export const metadata: Metadata = {
  // ...existing
  icons: {
    icon: [
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = { themeColor: '#0D6FDB' }
```

## Brand values (quick reference)

| Token | Value | Use |
|------|-------|-----|
| Primary / Aegean Blue | `#0D6FDB` (hover `#0B57AD`) | nav, headings, primary buttons, header bar |
| Action / Eco Green | `#39B24A` (hover `#2E8C3B`) | CTAs, success, resolved |
| Sea Mist | `#F2F7FB` | light brand surface |

> **Note:** PNGs are raster. If a vector **SVG** of the mark exists, prefer it for the inline header logo + favicon for crispness at any size. Ask the brand owner if it’s not in the repo.
