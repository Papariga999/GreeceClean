---
name: greececlean-design
description: Use this skill to generate well-branded interfaces and assets for GreeceClean, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick reference

- **`README.md`** — product context, content voice, visual foundations, iconography. Start here.
- **`colors_and_type.css`** — all design tokens (CSS custom properties) + helper classes (`.card`, `.btn-primary`, `.btn-action`, `.gc-input`). Link or copy this into any artifact.
- **`assets/`** — `icon.svg` (PWA launcher), `manifest.json`.
- **`preview/`** — specimen cards for every token/component.
- **`ui_kits/website/`** — interactive public-site recreation (landing, 4-step report flow, tracking, map).
- **`ui_kits/admin/`** — Greek moderation console (report table, priority beacons, municipality registry).

## The 10-second brand
- Two colors: **#0D6FDB** Aegean Blue (structure, identity) + **#39B24A** Eco Green (action, "done"). White / Sea Mist `#F2F7FB` surfaces.
- **Logo:** the pin-as-"G" mark with eco leaf + Aegean waves — use the vector components in `accountability/brand.jsx` (`BrandMark`, `Lockup`, `AppIcon`, `MapMarker`). The mark doubles as the map pin.
- **Inter** only, weights 400–800. Headings are blue.
- **`rounded-2xl` (1.5rem)** everywhere — cards, buttons, inputs, photo frames. Hairline `gray-100` borders, barely-there `shadow-sm`.
- **Emoji are the category icon system** — each report category owns a canonical emoji in a tinted circle (the logo mark is brand/pins, not categories).
- Voice: civic, warm, fast. "Keep Greece Clean." Trilingual (EL default / EN / DE); admin is Greek-only.
