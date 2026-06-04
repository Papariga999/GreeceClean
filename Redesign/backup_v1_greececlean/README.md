# GreeceClean — Design System

> **GreeceClean Design System** — the visual language behind GreeceClean, civic technology for a cleaner Greece. Refreshed (2026) around the refined **pin-as-“G”** logo (Brand Guideline v1.1 — two-tone eco leaf with midrib + crisp Aegean waves) and the brighter Aegean palette.

This repository captures the visual language, content voice, and reusable UI of **GreeceClean**, a civic-tech web app that lets any citizen report illegal dumping and litter to the responsible Greek municipality in under 60 seconds — no account required.

---

## Sources

This design system was reverse-engineered from the product's source code. The reader may not have access, but for reference:

- **GitHub:** [`Papariga999/GreeceClean`](https://github.com/Papariga999/GreeceClean) — Next.js 16 + React 19 + Tailwind 3 + Supabase. The `tailwind.config.ts`, `app/globals.css`, `lib/i18n/*`, `lib/categories.ts`, and the `components/` + `app/` trees were the primary source of truth for tokens, copy, and component structure.

**Explore the repository above to build richer, more accurate GreeceClean designs** — the i18n dictionaries (`lib/i18n/el.ts`, `en.ts`, `de.ts`) in particular hold the full, trilingual product copy.

---

## Product Context

GreeceClean addresses Greece's illegal-dumping crisis. The problem is framed not as a lack of law but a **lack of reporting infrastructure** — municipalities don't know where dumps are, and citizens assume someone else will report them.

**The core loop:** a citizen photographs a problem → the app auto-detects GPS (via photo EXIF or device geolocation) → a structured report is forwarded to the municipality's official email → the citizen gets a permanent, shareable tracking link. Every share creates public pressure on the municipality to act.

**The accountability mechanism:** the landing page publishes two public leaderboards — *Cleanliness Champions* (highest % resolved) and *Room for Improvement* (most unresolved). Municipal performance is made publicly visible and searchable, creating political incentive to act.

### Surfaces / "products"

GreeceClean is a single web app with three distinct surfaces:

| Surface | Audience | Language | Character |
|---------|----------|----------|-----------|
| **Public website** | Greek citizens, tourists, diaspora | EL / EN / DE | Warm, civic, mobile-first. Landing page, public map, report tracking pages. |
| **Report flow** | Reporting citizen on a phone | EL / EN / DE | A 4-step wizard (Category → Photos → Location → Submit). Big touch targets, emoji-led, friction-free. |
| **Admin dashboard** | GreeceClean moderators | Greek only | Dense data table. Approve / forward / reject reports, manage municipality email registry. Internal tool — utilitarian. |

The two UI kits in this system are **`website`** (public-facing, the brand showcase) and **`admin`** (the internal moderation console).

---

## Content Fundamentals

How GreeceClean writes. Voice is **civic, warm, and action-oriented** — it treats the citizen as a capable participant in a shared mission, never as a "user" to be processed.

- **Person & address.** Speaks *to* the citizen with imperative verbs: "Photograph", "Submit Report", "Track Progress". The mission is collective — "Keep Greece **Clean**", "Help keep Greece clean", "Thank you for making Greece cleaner!". It's "we" who forward the report on the citizen's behalf.
- **Tone.** Encouraging and gently celebratory, not bureaucratic or alarmist. Success copy is genuinely warm: *"Thank you for making Greece cleaner! 🌿"*. Accountability copy toward municipalities is pointed but factual, never insulting: *"Which municipalities act — and which ones don't yet"*.
- **Brevity & speed.** Copy constantly reassures the user it'll be fast: *"3 steps · less than 1 minute"*, *"Skip description & submit →"*. Microcopy removes friction at every turn.
- **Casing.** Sentence case for body and most UI. Title Case for short button/nav labels and category names ("Illegal Landfill", "Coastal Pollution"). One uppercase eyebrow pattern: `text-xs uppercase tracking-widest` ("WHAT CAN BE REPORTED").
- **Emoji as functional vocabulary.** Emoji are *not* decoration — they're the icon system (see Iconography). They appear in CTAs (📷 Make a Report, 🗺️ View the Map), in headings (🏆 Cleanliness Champions, ⚠️ Room for Improvement), success states (✅, 🌿), and as the brand mark itself (🌿 GreeceClean).
- **Trilingual discipline.** Every string exists in Greek (default), English, and German. Greek is the canonical language — all municipality emails are sent in Greek, and the admin dashboard is Greek-only.
- **Arrows for direction.** Navigation and forward-motion microcopy lean on arrow glyphs: "Next →", "← Back", "View the map →", "Submit another report →".

**Representative copy:**
- Hero: *"Keep Greece Clean — Photograph illegal dumps and litter. We automatically report them to the responsible municipality."*
- Steps: *"01 Photograph · 02 Submit Report · 03 Track Progress"*
- Success: *"Thank you for making Greece cleaner! 🌿 — Once our team has verified your report, it will appear on the map and the responsible municipality will be notified."*
- Footer: *"© 2026 GreeceClean — Helping keep Greece clean"* / *"For a clean Greece 🌿"*

---

## Visual Foundations

The GreeceClean system is clean, rounded, and friendly — built to feel approachable to non-technical citizens while staying credible as civic infrastructure.

### Color
- **Two brand colors, refreshed in 2026.** `primary` **#0D6FDB** — a bright **Aegean Blue** used for navigation, headings, primary buttons, and the header bar. `action` **#39B24A** — an **Eco Green** for CTAs, confirmation states, and resolved badges. Each ships as a full 50→900 tint ramp. **Sea Mist #F2F7FB** is the light brand surface. Two documented support tones (Brand Guideline v1.1) round out the palette: **Deep Aegean #064A9B** (dense header/footer fills, deep-contrast surfaces, hover) and **Ink Navy #102A43** (an optional brand navy for headlines/body on light). (These replace the previous deep-navy #005BAE / olive #6B8E23 pairing.)
- **Neutral-dominant canvas.** The app is mostly white surfaces on a `gray-50` (#F9FAFB) page background, with `gray-100` hairline borders. Color is used sparingly and meaningfully — blue for structure/identity, green for positive action and "done".
- **Status palette** is a soft, low-saturation set of tinted pills: yellow (pending), blue (in review), purple (forwarded), green (resolved), red (rejected).
- **Category palette** is pastel — each of the 11+ report categories owns a light `-50` background + `-100` icon circle + `-600` icon color (red dump, stone rubble, teal plastics, cyan coastal, etc.). This makes the category grid feel like a soft, colorful palette rather than a warning panel.

### Typography
- **Inter, exclusively** (Greek + Latin subsets). No serif, no display face. Weight does the work: `400` body, `500` medium labels, `600` semibold buttons/titles, `700` bold headings, `800` extrabold for the hero, stat numbers, and step numerals.
- Headings are almost always **primary blue**; section titles are centered. Body text is `gray-600`; captions `gray-400`.
- One uppercase tracking-widest eyebrow style for section labels.

### Backgrounds & imagery
- **No textures, no patterns, no full-bleed photography in chrome.** The one gradient in the system is the hero: `bg-gradient-to-br from-primary to-primary-600` (a subtle deep-blue diagonal). Everything else is flat fills.
- **User photos** are the only imagery — reported pollution photos, shown in rounded-2xl frames with `object-cover`, capped heights (max-h-72), and a `gray-100` placeholder. Color vibe is whatever the citizen's phone captured: real, unfiltered, documentary. No grain, no duotone, no art-direction.
- Maps (OpenStreetMap / Leaflet) provide the only other "imagery" — embedded in rounded, bordered frames.

### Shape, depth & borders
- **The signature move is the 1.5rem (`rounded-2xl`) corner radius** — on cards, buttons, inputs, photo frames, and map frames alike. Base radius is 1rem; pills/badges/icon-circles/step-dots are fully round.
- **Shadows are minimal.** Cards use `shadow-sm` (a barely-there 1px). The header uses `shadow-md`. The hero's primary CTA gets `shadow-lg` for lift. No inner shadows, no colored glows.
- **Borders are hairline `gray-100`** on white cards; inputs use `gray-300`. Dashed `primary-300` / `gray-300` borders mark photo-upload drop zones.
- Cards = `bg-white rounded-2xl shadow-sm border border-gray-100 p-6`. Memorize this; it's everywhere.

### Motion
- **Restrained, functional, color-first.** The dominant transition is `transition-colors duration-200` on buttons and links (hover swaps to the `-600` tint). Nav links use `duration-150`.
- **Hover/press on tappable tiles:** category tiles `hover:scale-105 active:scale-95` — a subtle grow on hover, shrink on press. Homepage report-type icons `group-hover:scale-110`.
- **Loaders & status:** `animate-spin` on ⏳ hourglasses, `animate-bounce` on the ✅ success mark, `animate-ping` on the urgent-priority red beacon in the admin table.
- No page-transition choreography, no parallax, no scroll-jacking. `scroll-smooth` is the only scroll affordance.

### Hover & press states (summary)
- **Buttons:** background darkens by one step (`primary`→`primary-600`, `action`→`action-600`).
- **Ghost/nav links:** color shifts toward `action-300` (on dark) or `gray-600` (on light).
- **Cards/rows:** background lightens to `gray-50` on hover, `gray-100` on active.
- **Focus:** 2–3px ring in the relevant brand tint (`focus:ring-2 focus:ring-primary` / `primary-300`).

### Layout rules
- **Mobile-first, centered, generous.** Three container widths: `max-w-lg` (form & tracking, ~32rem), `max-w-3xl/4xl` (landing prose), `max-w-6xl/7xl` (header & admin).
- The header is a fixed-height primary-blue bar with `shadow-md`. Sections stack vertically with `py-10`–`py-20` rhythm, alternating white and `gray-50` backgrounds.
- Grids: 3-col category tiles on mobile, 6-col report-type icons on desktop, 2–3 col stat/leaderboard cards.
- No transparency/blur in the chrome except one place: camera-viewfinder overlay buttons use `bg-black/40 backdrop-blur` over the live video feed.

---

## Iconography

GreeceClean's icon language pairs the **brand logo mark** with an **emoji-first** category system (Lucide line-icons as a code fallback).

- **The logo — a pin shaped as a "G".** The primary mark is a map-pin whose silhouette forms the letter **G**, carrying an **eco-green leaf** (nature / responsibility) and **Aegean waves** (sea) inside, tapering to a downward point. It reads as *place + Greece + clean nature*. It is rebuilt as scalable vector art in `accountability/brand.jsx` (also copied into each UI kit) and exposed as React components: `BrandMark`, `Lockup` (wordmark, light & on-blue, with the tagline **“REPORT IT. CLEAN IT. LOVE GREECE.”**), `AppIcon`, and `MapMarker`. **Always prefer these vector components** over the legacy emoji wordmark.
  - **As a map pin:** the mark *is* the pin — `MapMarker` renders Standard, **Active** (enlarged + glow), and **Cluster** (with a count badge) states. See `preview/brand-mappins.html`.
  - **Wordmark:** “Greece” in blue, “Clean” in green (white / light-green on blue surfaces).
- **Emoji are the primary, user-facing icon system.** Every report category has a canonical emoji used consistently across the homepage grid, the form's category picker, category badges, and map popups: 🗑️ Illegal Landfill, 🏗️ Construction Rubble, 🚮 Roadside Litter, 🧴 Plastics, 🛞 Tyres, 🔌 Appliances, 🚗 Abandoned Vehicle, 🌿 Green Waste, 🛋️ Bulky Items, 🌊 Coastal Pollution, ☣️ Sewage & Chemicals, ❓ Other. Emoji also carry CTAs (📷 🗺️ 📍 📋 📨), status (✅ ❌ 🔍 ⚠️ 🏆), and the brand mark (🌿). Category emoji sit inside a colored `-100` circle (`CategoryBadge`).
- **Lucide React** (`lucide-react`) is imported in `lib/categories.ts` as a structural fallback (LandPlot, HardHat, Trash, Disc3, Plug, Car, Waves, Biohazard, etc.) but the live UI renders the emoji. When you need a line icon (chevrons, hamburger, close, copy), reach for **Lucide** to stay faithful — link it from CDN (`https://unpkg.com/lucide-static`) or use the React package. The hamburger menu is hand-built from three `bg-white` bars; the close affordance is a literal `✕`.
- **No icon font.** Bespoke SVGs in the product: the new **logo mark** (vector, `accountability/brand.jsx`), the WhatsApp glyph (tracking share button), and the legacy app/PWA launcher icon.
- **Brand assets** (in `assets/`):
  - `icon.svg` — the PWA launcher icon (the new Aegean-blue rounded square + white pin-“G” mark, embedded). Alongside it ship raster launcher icons `icon-192.png` / `icon-512.png` and `favicon-32.png` for `manifest.json`. (This replaces the legacy white-droplet-on-green icon.)
  - `manifest.json` — PWA manifest.
- **The brand logo lockup** is the vector pin-as-“G” mark + **“GreeceClean”** wordmark (`Lockup` in `brand.jsx`) with the tagline **“REPORT IT. CLEAN IT. LOVE GREECE.”**, replacing the previous 🌿-emoji wordmark.

> Emoji rendering varies by OS/browser. For pixel-consistent emoji across platforms, consider a web emoji font (e.g. Noto Color Emoji) — flagged as a possible enhancement; the product relies on native emoji.

---

## Repository Index

Root files:
- **`README.md`** — this file: product context, content + visual foundations, iconography.
- **`colors_and_type.css`** — all design tokens as CSS custom properties (colors, type scale, radii, shadows, motion, layout) + semantic helper classes (`.card`, `.btn-primary`, `.btn-action`, `.gc-input`, heading classes).
- **`SKILL.md`** — Agent-Skill manifest so this system can be used directly in Claude Code.
- **`assets/`** — `icon.svg` (legacy PWA launcher), `manifest.json`. The current logo is vector (`accountability/brand.jsx`).
- **`preview/`** — small HTML specimen cards that populate the Design System tab (colors, type, components, etc.).
- **`ui_kits/`** — high-fidelity, interactive recreations of the product surfaces:
  - **`ui_kits/website/`** — public site: header, hero, report-type grid, how-it-works, live stats, impact leaderboards, report tracking page, the 4-step report flow, footer. `index.html` is a clickable walkthrough.
  - **`ui_kits/admin/`** — Greek moderation console: report table with priority beacons, status pills, inline edit, municipality email registry.

No slide template was provided in the source, so no `slides/` directory was created.
