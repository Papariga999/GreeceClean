# Copy Changelog — Website Copy Improvement (EL / EN / DE)

**Date:** 2026-06-03
**Scope:** User-facing website copy across all public pages, in Greek, English and German.
**Goal:** More natural, human, consistent copy. No design, layout, logic, schema or routing changes.

---

## How to apply (for Codex / Antigravity)

These changes are **already written into the working tree**. To review and ship:

1. Run `git diff -- lib/i18n/el.json lib/i18n/en.json lib/i18n/de.json "app/(public)/terms/page.tsx"` and review the content edits below.
   - Use `git diff --ignore-all-space` for a clean view — the plain diff shows a large line count because the working-tree JSON files already differed from the last commit in **whitespace only** (pre-existing, not from this pass). The actual *content* changes are exactly the ones listed here.
2. Confirm the build is unaffected: `npm run typecheck && npm run lint`. Then validate the i18n key parity test (Phase 3.3) still passes.
3. Commit. Suggested message: `Humanize and tone-align website copy (EL/EN/DE)`.

### Guardrails — do **not** change anything else
- **Keys:** No i18n keys added, removed or renamed. All three dictionaries keep **identical 255-key sets** (verified).
- **Placeholders:** `{n}`, `{url}` preserved in every locale (verified).
- **Emojis / icons:** Deliberately **kept**. They are functional UI labels and brand elements, not AI decoration — the humanizer's "remove emojis" rule does **not** apply to product UI strings.
- **No code/logic edits.** The only `.tsx` change is two string values inside the `terms` page content object (a typo and a mistranslation). No components, props, routes, metadata structure or schema touched.

---

## Tone decisions (applied consistently)

| Audience | Greek | German | English |
|---|---|---|---|
| Citizen-facing pages (home, report, map, tracking, top) | **Informal εσύ** (`Φωτογράφισε`, `Έλεγξε`, `Διάλεξε`) | **Informal du** (already consistent) | Direct / concrete (no T–V distinction) |
| Partner / B2B page | **Formal εσείς** (`Μιλήστε`, `Σας`) — already consistent, left intact | **Formal Sie** — already consistent, left intact | Professional, direct |

The Greek citizen pages previously **mixed** formal and informal address (e.g. headline `Κρατήστε` + button `Κάνε Αναφορά`). This pass makes the citizen voice consistently informal εσύ, matching the chosen split. German and English were already internally consistent.

---

## Changes by file

### `lib/i18n/el.json` (9 content edits)

| Key | Before | After | Why |
|---|---|---|---|
| `landing.heroTitle` | Κρατήστε την Ελλάδα | **Κράτα** την Ελλάδα | Tone: informal εσύ to match the citizen voice |
| `landing.heroDesc` | Φωτογραφίστε παράνομες χωματερές και σκουπίδια. Τα αναφέρουμε αυτόματα στον αρμόδιο δήμο. | Φωτογράφισε μια παράνομη χωματερή ή σκουπίδια και τα προωθούμε στον αρμόδιο δήμο. **Σε λιγότερο από ένα λεπτό, χωρίς λογαριασμό.** | Informal εσύ + added the proven "under a minute, no account" trust hook near the primary CTA |
| `landing.howSteps[2].desc` | Λαμβάνεις **link** παρακολούθησης για να **δεις** την πρόοδο. | Παίρνεις έναν **σύνδεσμο** για να **βλέπεις** την πρόοδο. | Remove anglicism (`link`→`σύνδεσμος`), more natural verb |
| `tracking.notFoundDesc` | Το **link** παρακολούθησης… | Ο **σύνδεσμος** παρακολούθησης… | Consistency with `σύνδεσμος` |
| `tracking.resolvedBy` | {n} άτομα **το κατάφεραν αυτό** μαζί. | **Το πέτυχαν** {n} άτομα μαζί. | Cleaner, less literal phrasing; `{n}` preserved |
| `form.photoCameraError` | Δεν **επετράπη**… **Ελέγξτε** τα δικαιώματα… | Δεν **επιτράπηκε**… **Έλεγξε** τα δικαιώματα… | Tone (informal) + more natural verb form |
| `form.locationError` | …**Ελέγξτε** τα δικαιώματα GPS. | …**Έλεγξε** τα δικαιώματα GPS. | Tone (informal) |
| `form.locationExifNotFound` | …**Παρακαλώ επιλέξτε στο** χάρτη. | …**Διάλεξε σημείο στον** χάρτη. | Tone (informal); drop stiff "Παρακαλώ" |
| `form.locationExifOutsideGreece` | GPS βρέθηκε εκτός Ελλάδας — **επιλέξτε** τοποθεσία **στο** χάρτη. | Το GPS έδειξε σημείο εκτός Ελλάδας. **Διάλεξε** τοποθεσία **στον** χάρτη. | Tone (informal); remove em-dash run-on |

### `lib/i18n/en.json` (2 content edits)

| Key | Before | After | Why |
|---|---|---|---|
| `landing.heroDesc` | Photograph illegal dumps and litter. We automatically report them to the responsible municipality. | Photograph an illegal dump or litter and we forward it to the responsible municipality. **Under a minute, no account.** | Added trust hook near CTA; tighter, more concrete |
| `landing.howSteps[2].desc` | You **receive a tracking link to follow the progress**. | You **get a link to follow what happens next**. | Plainer verb, less stiff |

### `lib/i18n/de.json` (2 content edits)

| Key | Before | After | Why |
|---|---|---|---|
| `landing.heroDesc` | Fotografiere illegale Mülldeponien und Abfälle. Wir melden sie automatisch an die zuständige Gemeinde. | Fotografiere eine illegale Müllkippe oder Abfall und wir leiten die Meldung an die zuständige Gemeinde weiter. **Unter einer Minute, ohne Konto.** | Added trust hook near CTA; natural singular phrasing |
| `landing.howSteps[2].desc` | Du **erhältst einen Tracking-Link, um den Fortschritt zu verfolgen**. | Du **bekommst einen Link, um zu verfolgen, was als Nächstes passiert**. | Warmer, less technical |

### `app/(public)/terms/page.tsx` (2 string fixes, Greek only)

| Location | Before | After | Why |
|---|---|---|---|
| `CONTENT.el` "Report content" body | …η **ανάρτωση** φωτογραφιών… | …η **ανάρτηση** φωτογραφιών… | **Typo fix** (`ανάρτωση` → `ανάρτηση`) |
| `CONTENT.el` liability heading | **Μέτρια ευθύνη** | **Περιορισμός ευθύνης** | **Mistranslation fix.** "Μέτρια ευθύνη" means "moderate liability"; EN/DE both say "Limitation of liability" / "Haftungsbeschränkung" |

---

## What was reviewed and intentionally **left unchanged**

- **Partner page (`partners.*`) — EL/EN/DE.** Already strong, hand-written, and human (concrete facts, honest tone, consistent εσείς/Sie). Over-editing good copy is a net negative, so it stands.
- **Privacy & Impressum pages.** Copy is clear, correct and appropriately formal for legal text. No changes needed.
- **Emojis in CTAs and labels.** Kept (see guardrails).
- **`form.submitErrors.*` (EL).** Already consistently informal (`Πρόσθεσε`, `Διάλεξε`, `Δοκίμασε`) — no fixes needed.

---

## Recommendations NOT applied (need a small code change — your call)

These would improve SEO/UX but require touching code structure, which was out of scope for a copy-only pass:

1. **Per-locale metadata on sub-pages.** `report`, `map`, `partners`, `top` and `region` export a single **static** `metadata` object (Greek- or English-only). Only the home page localizes its title/description via `generateMetadata()`. To give EN/DE users localized titles/descriptions on every page, convert each static `metadata` to a `generateMetadata()` that reads `getLocale()` — same pattern already used in `app/(public)/page.tsx`.
2. **`region` page `<title>`** is English-only (`"Regional Layer - GreeceClean"`) on a trilingual site; localize it via the same pattern.
3. **`top` page empty-state and footer note** use inline ternaries; the empty state `"Καμία ανοιχτή αναφορά"` has no EN/DE branch and would show Greek to all locales. Worth routing through `lib/i18n` for consistency.

---

## Note on the ChatGPT PDF audit

The supplied PDF (`Audit βελτίωσης website copy για το GreeceClean`) **never managed to crawl the live site** (it says so explicitly) and therefore assumed GreeceClean is a **commercial cleaning service**. Its CTA/microcopy library — "Request a quote", "Book a cleaning", "WhatsApp us", "Callback" — does not apply to a civic dumping-report app and was **discarded**.

**Salvaged and applied** from it: the general principles that hold regardless — outcome-led hero with a trust signal near the CTA, plain-language form/error microcopy, unique per-page metadata, descriptive (non-keyword-stuffed) alt text, and one visible language per route. The hreflang/route-splitting advice is a separate infra task (the app currently switches language client-side via a cookie rather than `/el/ /en/ /de/` routes); flagged here for awareness, not actioned.

---

## Validation performed
- All three JSON files parse as valid JSON.
- `el` / `en` / `de` key sets identical: **255 keys each** (Phase 3.3 parity test will pass).
- Placeholders `{n}` and `{url}` present and matching across all locales.
- Only string **values** changed; no keys, structure, or code logic touched.
