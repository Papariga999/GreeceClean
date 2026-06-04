---
name: katharos-design
description: Use this skill to generate well-branded interfaces and assets for Katharos (καθαρός — civic technology for a cleaner Greece), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (start with `Katharos Brand Guideline.html`).
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **`Katharos Brand Guideline.html`** — the editorial brand spec (logo, colour, type, voice, slogans). Start here.
- **`README.md`** — product context, content voice, visual foundations, iconography.
- **`colors_and_type.css`** — all design tokens (CSS custom properties) + helper classes (`.card`, `.btn-primary`, `.btn-action`, `.btn-ghost`, `.gc-input`). Link or copy this into any artifact.
- **`assets/`** — brand rasters (app icon, favicons, emblem, lockup, severity pins), `icon.svg`, `manifest.json`.
- **`preview/`** — specimen cards for every token/component.
- **`ui_kits/website/`** — interactive public-site recreation (landing, 4-step report flow, tracking, map, partners).
- **`ui_kits/admin/`** — Greek moderation console (report table, priority beacons, municipality registry).
- **`backup_v1_greececlean/`** — the previous *GreeceClean* identity, preserved.

## The 10-second brand
- **Palette:** **#006994** Aegean (structure, identity) + **#0090C4** Sky (accent) + **#6B7C3A** Olive (action, "done") + **#C9A96E** Sand (detail). Two grounds: **#F5F2ED** Marble (light) and **#1A1A2E** Ink (dark).
- **Logo:** an olive **leaf-droplet over Aegean waves** in a thin ring, sky-blue centre dot — use the vector components in `accountability/brand.jsx` (`BrandMark`, `Lockup`, `AppIcon`, `MapMarker`). Wordmark is "K**a**tharos" (the *a* in Sky). The mark becomes a filled severity-tinted teardrop as a map marker.
- **Type:** **Cormorant Garamond** (light serif) for wordmark/display/headings + **DM Mono** for all UI/labels/body/numerals. No sans-serif.
- **Refined radii** — **12px** on cards/buttons/inputs (not pillowy). Hairline Marble-dark borders, restrained Ink-tinted `shadow-sm`; dark sections use a radial Aegean bloom.
- **Emoji** are the report-category icon set + functional status glyphs only — used sparingly, never as decoration.
- Voice: calm, warm, certain. *"Greece deserves to shine."* · *"Clean. Report. Change."* Trilingual (EL default / EN / DE); admin is Greek-only.
