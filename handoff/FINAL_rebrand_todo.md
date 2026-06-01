# GreeceClean — Final Rebrand Adjustments (dev to-do)

Based on a visual review of the live site (greececlean.vercel.app): homepage, map, and report detail page. The logo + color rebrand is **adopted across all pages** — header, footer, hero, cards, buttons, timeline, votes, share, and **favicon** are all correct (Primary `#0D6FDB`, Action `#39B24A`). 🎉

Only the items below remain.

---

## 1. Add the social share image (OG / Twitter)  ❗ required
The pages currently ship **no `og:image` / `twitter:image`** — shared links render with no preview image.

- Create a **1200×630** share card from `logo-lockup.png` (mark + wordmark on white or Aegean‑blue), save as `public/brand/og-image.png`.
- In `app/layout.tsx` metadata:
  ```ts
  openGraph: {
    /* ...existing */
    images: [{ url: '/brand/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/brand/og-image.png'] },
  ```
- Optional: per‑report dynamic OG image on `/r/[token]` (photo + days‑open + δήμος) for stronger social pressure — nice‑to‑have, not blocking.

## 2. Map markers — adopt brand pin shape  ⚠️ recommended
Both the cluster map and the report‑detail map use plain colored dots / a generic green pin. Keep the **severity color** (that's correct and important) but switch the marker **shape** to the brand pin‑“G” so the map is on‑brand.

- **Ready‑made assets provided:** `handoff/brand/pins/pin-{fresh,recent,aging,ignored}.png` — the brand pin tinted green → amber → orange → red by days‑open, white leaf+waves knocked out.
- See `handoff/brand/pins/README.md` for the drop‑in Leaflet `L.icon` snippet, severity thresholds, and cluster guidance.
- `iconSize ≈ [30,41]`, `iconAnchor [15,41]`; keep the cluster count badge.

## 3. Use the full lockup somewhere prominent  ◦ optional
`logo-lockup.png` (symbol + wordmark + tagline) isn't used anywhere. Consider it in the **landing hero** or the **footer** for stronger brand presence. Cosmetic only.

---

## Already verified — no action needed
- ✅ Header / footer / report‑page logo = new mark
- ✅ Favicon + PWA install icon swapped from the old droplet
- ✅ Primary `#0D6FDB` & Action `#39B24A` applied via Tailwind tokens across all pages
- ✅ Hero highlight word in light green on blue
- ✅ Cards (`rounded‑2xl`, soft shadow), Inter type, spacing intact
- ✅ Status / priority / category color systems left unchanged (correct)
- ✅ Engagement (votes, follow) + severity counter mechanics live

**Priority order:** 1 (OG image) → 2 (brand map pins) → 3 (lockup placement).
