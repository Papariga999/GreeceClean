# Website UI Kit — Katharos Public Site

A high-fidelity, interactive recreation of the Katharos public-facing website. Open `index.html` for a clickable walkthrough.

## What's here

| File | Contents |
|------|----------|
| `index.html` | Loads React + Babel and all components. Entry point. |
| `components.jsx` | Shared primitives + chrome: `CATEGORIES` data, `CategoryBadge`, `Header` (with nav + EL/EN/DE switcher), `SiteFooter`, `Card`. Exported to `window`. |
| `Landing.jsx` | The landing page: blue gradient hero, "What can be reported" emoji grid, How-it-works cards, live stat cards, and the two impact leaderboards (Champions / Room for Improvement). |
| `ReportFlow.jsx` | The signature 4-step report wizard: Category → Photos → Location → Submit, plus the success screen. Step dots, pastel category tiles, photo thumbnails, OSM map embed. Fully clickable. |
| `Tracking.jsx` | The public report-tracking page (photo, map, details, progress stepper, WhatsApp + copy share) and a simple public `MapView`. |
| `partners-i18n.jsx` | Full trilingual copy (EL · EN · DE) for the Partners / Sponsors subpage — `window.PARTNERS_I18N`. |
| `PartnerForm.jsx` | B2B partner contact form: inline validation, GDPR consent, hidden honeypot, and normal / loading / success / error states (with a small prototype-only state previewer). |
| `Partners.jsx` | The Partners / Sponsors subpage (`#partners`): hero, problem stats, how-it-works, mission & vision, the "why it's worth supporting" 6-claim grid, the 5-audience "Why partner" card grid, what-we-offer + independence block, and the contact section. Imagery uses labelled placeholders. |
| `App.jsx` | View router switching between home / report / map / tracking / partners. Lifts the EL/EN/DE language state and supports `#hash` deep-links. |

## Try it
- Click **Report** in the header → walk the 4-step flow → on success, **View tracking page**.
- Click category tiles, add photos (placeholder images), advance through steps.
- Toggle **EL / EN / DE** in the header (visual only here; the real app is fully trilingual).

## Fidelity notes
- Components are cosmetic recreations — no real GPS, EXIF, upload, or Supabase calls. Photos use `picsum.photos` placeholders; maps use OpenStreetMap embeds.
- Copy is the real English product copy from `lib/i18n/en.ts`. Tokens come from `colors_and_type.css`.
