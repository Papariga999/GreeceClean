# Katharos — Design System

> **Katharos Design System** — the visual language behind **Katharos** (καθαρός, *"pure, clean"*), civic technology for a cleaner Greece. A 2026 rebrand of the former *GreeceClean*: an editorial, quietly-confident identity built on a **leaf-droplet-over-Aegean-waves emblem**, a **Cormorant Garamond / DM Mono** type pairing, and a warm Mediterranean palette. (The previous GreeceClean identity — bright Aegean-blue #0D6FDB + Eco-green #39B24A, Inter, pin-as-"G" — is preserved in `backup_v1_greececlean/`.)

This repository captures the visual language, content voice, and reusable UI of **Katharos**, a civic-tech web app that lets any citizen report illegal dumping and litter to the responsible Greek municipality in under 60 seconds — no account required.

---

## Sources

This design system was reverse-engineered from the product's source code, then rebranded to the Katharos identity. The reader may not have access, but for reference:

- **GitHub:** [`Papariga999/GreeceClean`](https://github.com/Papariga999/GreeceClean) — Next.js 16 + React 19 + Tailwind 3 + Supabase. The `tailwind.config.ts`, `app/globals.css`, `lib/i18n/*`, `lib/categories.ts`, and the `components/` + `app/` trees were the primary source of truth for tokens, copy, and component structure.
- **Brand concept:** the Katharos brand artifact (logo, colours, slogans) — captured in `Katharos Brand Guideline.html` at the project root.

---

## Product Context

Katharos addresses Greece's illegal-dumping crisis. The problem is framed not as a lack of law but a **lack of reporting infrastructure** — municipalities don't know where dumps are, and citizens assume someone else will report them.

**The core loop:** a citizen photographs a problem → the app auto-detects GPS (via photo EXIF or device geolocation) → a structured report is forwarded to the municipality's official email → the citizen gets a permanent, shareable tracking link. Every share creates public pressure on the municipality to act.

**The accountability mechanism:** the landing page publishes two public leaderboards — *Cleanliness Champions* (highest % resolved) and *Room for Improvement* (most unresolved). Municipal performance is made publicly visible and searchable, creating political incentive to act.

### Surfaces / "products"

Katharos is a single web app with three distinct surfaces:

| Surface | Audience | Language | Character |
|---------|----------|----------|-----------|
| **Public website** | Greek citizens, tourists, diaspora | EL / EN / DE | Editorial, civic, mobile-first. Landing page, public map, report tracking pages. |
| **Report flow** | Reporting citizen on a phone | EL / EN / DE | A 4-step wizard (Category → Photos → Location → Submit). Big touch targets, friction-free. |
| **Admin dashboard** | Katharos moderators | Greek only | Dense data table. Approve / forward / reject reports, manage municipality email registry. Internal tool — utilitarian. |

The two UI kits in this system are **`website`** (public-facing, the brand showcase) and **`admin`** (the internal moderation console).

---

## The Name

**καθαρός** — *katharós* — is the Greek word for *pure, clean, clear*. It is the oldest possible promise to make about a landscape: that it can be returned to itself. The brand carries that promise lightly — not a campaign against dirt, but an invitation toward clarity. Where the old identity shouted in bright blue and green, Katharos speaks in a calmer register: Aegean water, olive groves, marble and sand.

---

## Content Fundamentals

How Katharos writes. Voice is **calm, warm, and certain** — it treats the citizen as a capable participant in a shared mission, never as a "user" to be processed.

- **Person & address.** Speaks *to* the citizen with imperative verbs framed as invitations: "Photograph", "Submit Report", "Track Progress". The mission is collective. It's "we" who forward the report on the citizen's behalf.
- **Tone.** Encouraging and quietly confident, never bureaucratic or alarmist. Success copy is genuinely warm. Accountability copy toward municipalities is pointed but factual: *"Which municipalities act — and which ones don't yet"*.
- **Brevity & speed.** Copy reassures the user it'll be fast: *"3 steps · less than 1 minute"*. Microcopy removes friction at every turn.
- **Casing.** Sentence case for body and most UI. Title Case for short button/nav labels and category names. Wide-tracked **uppercase** (DM Mono, `letter-spacing: 0.3em`) for small eyebrow labels only ("WHAT CAN BE REPORTED").
- **Trilingual discipline.** Every string exists in Greek (default), English, and German. Greek is the canonical language — all municipality emails are sent in Greek, and the admin dashboard is Greek-only.
- **Arrows, not emoji, for direction.** Forward-motion microcopy leans on arrow glyphs: "Next →", "← Back", "View the map →". Emoji are used sparingly and only functionally (report categories, status), never as decoration.

### Slogans

| Use | Slogan |
|-----|--------|
| **Lead / International** | *Greece deserves to shine.* |
| **Community / Deutsch** | *Gemeinsam sauber. Gemeinsam Griechenland.* |
| **Short / App badge** | *Katharos — Clean. Report. Change.* |
| **Brand signature** | *For a pure Greece · καθαρός* |

---

## Visual Foundations

The Katharos system is editorial, refined, and warm — built to feel like an act of care rather than a complaint form, while staying credible as civic infrastructure.

### Color
- **A warm Mediterranean palette.** `primary` **Aegean #006994** — a deep sea blue for structure, headings, and primary actions, with **Sky #0090C4** as the brighter accent (links on dark, highlights, the "a" in the wordmark, the centre dot). Each ships as a full 50→900 tint ramp.
- **`action` Olive #6B7C3A** — a muted olive green for confirmation, resolved states, eco/nature, and secondary CTAs (50→900 ramp).
- **Sand #C9A96E** — a warm metallic accent for eyebrows, dividers, and premium detail.
- **Two grounds:** **Marble #F5F2ED** (warm limestone — the light brand surface and page background) and **Ink #1A1A2E** (deep near-black for dark sections, footers, the brand hero/canvas, and the app icon). Warm white **#FAFAF8** for text on dark.
- The neutral scale is **warmed** (slightly toward limestone) for borders and dense UI; hairline borders are **Marble-dark #E8E3DA**.
- **Status palette** (report lifecycle) is a soft, earthy set of tinted pills: warm amber (pending), aegean (in review), muted violet (forwarded), olive (resolved), terracotta (rejected). These are *functional*, not brand.
- **Severity scale** ("how long ignored") is an earthy 4-stop ramp: olive (fresh) → sand → amber → terracotta (long ignored). It appears on map pins, detail counters, Top-10 rows and share cards.

### Typography
- **Two faces, a deliberate contrast.** **Cormorant Garamond** (humanist serif, weights 300–700) sets the voice — wordmark, display, headings, card titles — almost always light (300) or medium (500), with generous letter-spacing. **DM Mono** (monospace, 300/400/500) does all the work — every label, number, button, paragraph, and meta line. The pairing reads as *heritage meeting infrastructure*.
- **No sans-serif.** (This replaces the previous Inter-only system.)
- Headings are usually Aegean or Ink; eyebrows are Sand, wide-tracked, uppercase, mono.

### Backgrounds & imagery
- **No textures, no patterns.** On dark (Ink) surfaces the one motif is a soft **radial bloom** (Aegean or Olive glow). On light surfaces, flat Marble / white fills.
- **User photos** are the primary imagery — reported pollution photos in rounded frames (`radius-lg`, 12px) with `object-cover` and a Marble placeholder. Real, unfiltered, documentary.
- Maps (OpenStreetMap / Leaflet) are embedded in rounded, bordered frames.

### Shape, depth & borders
- **Refined radii.** The signature corner is **12px (`--radius-lg`)** on cards, buttons, inputs, and photo frames — tighter and more architectural than the old pillowy 1.5rem. Base radius 10px; pills / badges / dots / the emblem ring are fully round.
- **Shadows are restrained** and cool-tinted (Ink-based). Cards use `shadow-sm`; raised surfaces `shadow-md`; the dark hero uses a radial `--glow-aegean` rather than a drop shadow.
- **Hairline borders** are Marble-dark on light, low-opacity white on Ink.
- Card = `bg-surface rounded-[12px] shadow-sm border border-[--border] p-6`.

### Motion
- **Restrained and functional.** The dominant transition is a 250ms colour swap on buttons/links (hover → `-600` / darker tint). The brand emblem may gently **float** (4–5s ease-in-out) on hero/splash surfaces only. No parallax, no scroll-jacking; `scroll-smooth` only.

### Layout rules
- **Mobile-first, centered, generous.** Three container widths: `--container-form` (32rem), `--container-prose` (56rem), `--container-wide` (80rem).
- Headers are a fixed Aegean bar; dark sections and footers use Ink. Sections stack vertically with generous rhythm, alternating Marble / white / Ink grounds.

---

## Iconography

- **The logo — a leaf-droplet over Aegean waves.** An olive **leaf/droplet** (place + nature) rises from **Aegean waves** (sea), held in a thin **ring** (wholeness), with a single **sky-blue point** marking the spot. It is pure inline-SVG vector art in `accountability/brand.jsx` (copied into each UI kit) and exposed as React components: `BrandMark` (with `color` / `white` / `ink` / `contour` variants + optional ring/halo), `Lockup` (emblem + "K**a**tharos" wordmark, the *a* in Sky), `AppIcon` (Ink rounded square + Aegean bloom + white emblem), `MapMarker`, and `LockupImage`. **Always prefer these vector components.**
  - **As a map marker:** `MapMarker` renders a legible filled teardrop carrying the leaf-drop DNA, tinted by severity (`days` / `sev`), with Standard, **Active** (enlarged + glow), and **Cluster** (count badge) states.
- **The wordmark** is "K**a**tharos" set in Cormorant Garamond Light with wide tracking (`0.16em`), the second letter **a** in Sky #0090C4 (white on Aegean). Sub-lockup: "καθαρός" or the tagline "CLEAN · REPORT · CHANGE" in DM Mono, uppercase, `0.30em` tracking.
- **Emoji** remain the report-category icon set (🗑️ 🏗️ 🚮 🧴 🛞 🔌 🚗 🌿 🛋️ 🌊 ☣️ ❓) and functional status/action glyphs — but are used **sparingly and only functionally**, never as decoration. Category emoji sit inside a soft tinted circle (`CategoryBadge`).
- **Lucide** line-icons are the structural fallback for chevrons, close, copy, hamburger, etc.
- **Brand assets** (in `assets/`):
  - `app-icon.png` / `icon-192.png` / `icon-512.png` / `favicon-32.png` — Ink rounded square + Aegean bloom + white emblem (PWA + favicons).
  - `logo-symbol.png` / `logo-symbol-white.png` — the emblem on transparent (light / dark surfaces).
  - `logo-lockup.png` — emblem + "Katharos" wordmark.
  - `pin-fresh / recent / aging / ignored.png` — severity map markers.
  - `icon.svg`, `manifest.json` — PWA scaffolding.

---

## Repository Index

Root files:
- **`README.md`** — this file.
- **`Katharos Brand Guideline.html`** — the editorial brand spec: logo system, colour, type, voice & slogans, components. **Start here.**
- **`colors_and_type.css`** — all design tokens as CSS custom properties (Katharos colours, the Cormorant/DM Mono type scale, refined radii, shadows, motion, layout) + semantic helper classes (`.card`, `.btn-primary`, `.btn-action`, `.btn-ghost`, `.gc-input`, `.kt-wordmark`, `.kt-display`, heading classes). The `.gc-*` class names are kept for back-compat.
- **`SKILL.md`** — Agent-Skill manifest.
- **`assets/`** — brand raster assets + PWA manifest.
- **`preview/`** — small HTML specimen cards that populate the Design System tab (colours, type, components, brand).
- **`ui_kits/`** — high-fidelity, interactive recreations of the product surfaces:
  - **`ui_kits/website/`** — public site: header, hero, report-type grid, how-it-works, live stats, impact leaderboards, report tracking, the 4-step report flow, partners page, footer. `index.html` is a clickable walkthrough.
  - **`ui_kits/admin/`** — Greek moderation console.
- **`accountability/`** — the accountability-redesign prototype (design canvas + clickable device prototype).
- **`backup_v1_greececlean/`** — the complete previous **GreeceClean** identity (tokens, logo, docs, kits) preserved as a backup.
