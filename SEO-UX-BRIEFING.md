# GreeceClean — SEO & UX Improvement Briefing (for Codex / Antigravity)

**Date:** 2026-06-03
**Production domain (canonical):** `https://greececlean.vercel.app`
**Languages:** Greek (`el`, default), English (`en`), German (`de`)
**Stack:** Next.js 16 (App Router, React 19), TypeScript strict, Supabase, Tailwind, Vercel.

> Read this top-to-bottom, then work the phases **in order**, one PR per phase. Phase 1 is low-risk and ships SEO wins immediately. Phase 2 is the architectural change (locale routing) and is the biggest SEO lever — do it carefully. Phase 3 is UX/accessibility. Phase 4 is verification.

---

## 0. Non-negotiable guardrails

- **Do not change the visual design**, layout, color system, or component structure unless a task explicitly says so. These are SEO/UX/markup changes, not a redesign.
- **All user-facing strings go through `lib/i18n`** in all three locales. Never hardcode UI text. Any new string = new key added to `el.json`, `en.json`, `de.json` with **identical key sets** (a test enforces parity — keep it green).
- **No accounts, no login, no email/PII collection** for citizens (existing product constraint). SEO/analytics must stay cookieless beyond the existing `locale` cookie unless a task says otherwise.
- **No payments / pricing / billing.**
- Preserve existing **placeholders** (`{n}`, `{url}`) and **emojis** in copy — they are intentional UI.
- Keep `npm run typecheck`, `npm run lint`, and `npm run test` green before merging each phase.
- **Backward compatibility:** existing shared links must keep working — especially report tracking links like `/r/<token>` that are already circulating. A redirect is fine; a 404 is not.

---

## 1. Current state (audited 2026-06-03)

| Area | Status | Detail |
|---|---|---|
| Per-page `<title>`/description | ⚠️ partial | Only `app/(public)/page.tsx` localizes via `generateMetadata()`. `report`, `map`, `partners`, `top`, `region` export a single **static** `metadata` (one language). |
| **i18n URLs** | ❌ **critical** | Language is a **cookie** (`/api/locale`). The same URL serves EL/EN/DE. Googlebot only ever sees default **el** → **EN/DE content is unindexable**. |
| **hreflang / alternates** | ❌ missing | No `alternates.languages`. Impossible while one URL serves all languages. |
| **sitemap.xml** | ❌ missing | No `app/sitemap.ts`. |
| **robots.txt** | ❌ missing | No `app/robots.ts`. |
| **Structured data (JSON-LD)** | ❌ missing | No `Organization`, `WebSite`, `Dataset`, or `BreadcrumbList`. Big opportunity for a civic/open-data project. |
| Canonical URLs | ❌ missing | No `alternates.canonical`. `metadataBase` is set (good). |
| OG / Twitter | ✅ ok | Static `og-image.png`; dynamic OG on `r/[token]` exists. OG `locale` hardcoded `el_GR`. |
| `<html lang>` | ✅ dynamic | `app/layout.tsx` sets `lang={locale}` from cookie. |
| PWA manifest | ✅ present | `public/manifest.json` (shortcut names are Greek-only — minor). |
| Admin guard | ⚠️ note | `proxy.ts` exports `proxy()`, not a standard `middleware.ts`. Verify it's actually executing; Phase 2 introduces a real `middleware.ts` that must absorb/coexist with this admin logic. |

**Effort markers:** `getLocale()` is called in **14 files**, `useLocale()` in **5 client components**, and there are **~23 hardcoded internal `<Link href="/…">`** that will need locale-prefixing in Phase 2.

---

## PHASE 1 — Technical SEO foundation (low risk, ship first)

None of this requires the routing change. Do it first.

### 1.1 `app/robots.ts`
Generate robots with a sitemap pointer. Disallow `/admin` and `/api`.
```ts
import type { MetadataRoute } from 'next'
const BASE = process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.vercel.app'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  }
}
```

### 1.2 `app/sitemap.ts`
List the public, indexable routes. Pull **approved** report tracking pages and the municipality scorecards from Supabase (server-side, `supabaseAdmin`) so the long tail gets indexed. Exclude `/admin`, `/api`, and `noindex` pages (`privacy`, `terms`, `impressum` are currently `robots:{index:false}` — keep them out of the sitemap).
- Static entries: `/`, `/map`, `/report`, `/partners`, `/region`, `/top`.
- Dynamic: `/r/<token>` for `is_approved = true`, `/scorecard/<id>` for seeded municipalities.
- In Phase 2 this becomes locale-aware (one entry per locale with `alternates.languages`). For Phase 1, emit the current single-URL set.

### 1.3 Localize metadata on every page
Convert each static `metadata` export in `report/`, `map/`, `partners/`, `top/`, `region/` to an `async generateMetadata()` that reads `getLocale()` and pulls strings from `lib/i18n` — mirror the existing pattern in `app/(public)/page.tsx`. Add new i18n keys under a `meta` namespace, e.g.:
```
meta.report.title / meta.report.description
meta.map.title    / meta.map.description
meta.partners.title / meta.partners.description
meta.top.title    / meta.top.description
meta.region.title / meta.region.description
```
Editorial caps (project convention, not a ranking rule): title ≤ ~60 chars, description ≤ ~155 chars, unique per page, plain language, no keyword stuffing.

### 1.4 Canonical + dynamic OG locale
- Add `alternates: { canonical: <absolute url of current page> }` to each page's metadata.
- Set `openGraph.locale` from the active locale (`el_GR` / `en_GB` / `de_DE`) instead of the hardcoded `el_GR` in `app/layout.tsx`.

### 1.5 Structured data (JSON-LD)
Add a small server component that injects `<script type="application/ld+json">`. High-value types for this project:
- **`Organization`** (name, url, logo, sameAs → LinkedIn) — site-wide in `app/layout.tsx`.
- **`WebSite`** (+ `inLanguage`) — site-wide.
- **`Dataset`** — the public reports/leaderboard are open civic data; a `Dataset` node on `/map` or `/top` can earn dataset-rich treatment.
- **`BreadcrumbList`** — on deep pages (`/r/<token>`, `/scorecard/<id>`).
- **`GovernmentService` / `Service`** — optional, describes the reporting service.
Keep JSON-LD values sourced from real data; never invent ratings or counts.

**Phase 1 acceptance:** `/, /robots.txt, /sitemap.xml` resolve; Google Rich Results Test validates the JSON-LD; each public page has a unique localized title/description and a canonical.

---

## PHASE 2 — i18n routing rearchitecture (the core SEO change)

**Goal:** give each language its own crawlable URL and wire hreflang, so EN/DE become indexable. Move from cookie-locale to **path-locale** (`/el`, `/en`, `/de`).

### 2.1 Target URL shape
```
/el            /en            /de            (home per language)
/el/map        /en/map        /de/map
/el/report     /en/report     /de/report
/el/partners   /en/partners   /de/partners
/el/top  /el/region  …and so on
/el/r/<token>  (localized tracking)         ← keep /r/<token> working too (see 2.6)
```
`https://greececlean.vercel.app/` redirects to a locale (see 2.4).

### 2.2 Route restructure
- Introduce a dynamic segment `app/[lang]/...` and move the existing `(public)` route group under it: `app/[lang]/(public)/…`. Admin (`app/admin`) and API (`app/api`) **stay unprefixed**.
- Add `generateStaticParams()` returning `[{lang:'el'},{lang:'en'},{lang:'de'}]`.
- Validate `lang` against `LOCALES` in the layout; unknown → `notFound()`.

### 2.3 Locale source of truth
- Change `lib/i18n` so the dictionary is resolved from the **route param**, not the cookie. Update `getLocale()` callers (14 files) to receive `lang` from `params` (server components) or from `LocaleProvider` (client). Keep `getDictionary(lang)` unchanged.
- `app/[lang]/layout.tsx` sets `<html lang={lang}>` from the param and wraps children in `LocaleProvider locale={lang}`.

### 2.4 Middleware (`middleware.ts`)
Create a real `middleware.ts` at repo root that:
1. Skips `/_next`, static files, `/api`, `/admin`, and already-prefixed paths.
2. For unprefixed public paths, picks a locale by priority: **`locale` cookie → `Accept-Language` → default `el`**, then **redirects** (302) to the prefixed URL. **No silent content swap** — a real redirect, per Google's i18n guidance (avoid auto-redirect loops; allow manual override).
3. **Merge the existing admin-guard** logic currently in `proxy.ts` into this middleware (or keep proxy logic but ensure both run). Confirm whether `proxy.ts` is actually wired — standard Next.js requires `middleware.ts`. Consolidate to avoid two competing matchers.

### 2.5 hreflang + canonical
In `app/[lang]/(public)/.../generateMetadata`, for every page emit:
```ts
alternates: {
  canonical: `${BASE}/${lang}${path}`,
  languages: {
    el: `${BASE}/el${path}`,
    en: `${BASE}/en${path}`,
    de: `${BASE}/de${path}`,
    'x-default': `${BASE}/el${path}`,
  },
}
```
Use valid language codes only (no country-only values). Each page must have self-referential + return hreflang links.

### 2.6 Links, switcher, backward compatibility
- **Internal links (~23):** prefix all `<Link href="/…">` with the active locale. Cleanest: a tiny `localizedHref(lang, path)` helper or a thin `LocaleLink` wrapper used in `Header.tsx`, `Footer.tsx`, and every page. Do not leave bare `/report` links — they'd bounce through middleware.
- **LanguageSwitcher.tsx:** instead of POSTing to `/api/locale` + `router.refresh()`, navigate to the **same pathname under the new locale** (swap the first segment) and set the `locale` cookie to remember the choice. Preserve the current path and query.
- **`/api/locale`** can stay (to persist the preference cookie) but is no longer what changes the page.
- **Legacy `/r/<token>` and `/scorecard/<id>`:** keep these working. Either (a) middleware redirects them to `/<cookie-or-default-locale>/r/<token>`, or (b) keep an unprefixed passthrough that resolves locale from cookie. Existing shared/QR links must not 404.
- Update `sitemap.ts` (1.2) to emit one URL per locale with `alternates`.

### 2.7 Risks / watch-list
- `export const dynamic = 'force-dynamic'` is already used on data pages — fine with `[lang]`.
- Don't create redirect loops (middleware must ignore already-prefixed paths).
- Admin and API must remain unprefixed and unaffected.
- The `r/[token]/opengraph-image.tsx` route must keep resolving under both old and new paths.

**Phase 2 acceptance:** `/en` and `/de` render full English/German pages at distinct URLs; `view-source` shows correct `<html lang>` and three `hreflang` + `x-default` links per page; old `/r/<token>` links still resolve; Search Console "International Targeting" shows no hreflang errors.

---

## PHASE 3 — UX & accessibility

### 3.1 Language discoverability & switching
- The switcher is three small flag glyphs at `opacity-50` (`LanguageSwitcher.tsx`) — easy to miss and flag-as-language is an accessibility anti-pattern. Add a visible current-language **label** (e.g. "EL ▾") and keep `aria-label`s. Ensure each control is a real `<button>`/`<a>` with a focus ring.
- After Phase 2, switching preserves the current page (don't dump the user back on the homepage).

### 3.2 Accessibility baseline (WCAG)
- Add a **skip-to-content** link as the first focusable element in `app/layout.tsx`.
- Decorative images → `alt=""`; meaningful images → descriptive alt sourced from i18n (the logo repeats `alt="GreeceClean"` in several places — fine for the brand mark, but the hero/símbολο duplicates can be decorative).
- Verify all form fields in `ReportForm.tsx` and `PartnerForm.tsx` have programmatically associated `<label>`s (not placeholder-only), visible focus states, required indicators, and that error text is conveyed in **text** (not color/icon alone) and linked via `aria-describedby`.
- Confirm color contrast on `text-action-300` over the primary background and on muted grays meets AA.
- Map: the `"Φόρτωση χάρτη…"` state should have an accessible loading announcement; ensure Leaflet controls are keyboard-reachable.

### 3.3 Report flow (primary conversion)
- The multi-step form is good. Add: per-step progress is announced to screen readers; the "skip description & submit" path stays one tap; on submit failure, map the typed error to a localized, human message (already mostly done in `form.submitErrors.*`).
- Make the tracking page (`r/[token]`) status timeline unmistakable (submitted → forwarded → resolved) — confirm it's a visible timeline, not just a badge.

### 3.4 Localization completeness gaps (found during audit)
- `app/(public)/top/page.tsx`: the empty state `"Καμία ανοιχτή αναφορά"` is **Greek-only** (no EN/DE branch) and shows Greek to all users. Route it through `lib/i18n` (add `landing.topEmpty` or `top.empty`). The filter-tab labels and footer note there use inline ternaries — move to i18n for consistency.
- `public/manifest.json` shortcut names are Greek-only; consider localized manifests or neutral names.
- `region` page `<title>` is English-only — fixed by Phase 1.3 / Phase 2.5.

### 3.5 Performance (SEO-adjacent, Core Web Vitals)
- Ensure `next/image` is used for all raster images with explicit sizes (logo already uses it). Lazy-load below-the-fold imagery.
- Keep the Leaflet/map bundle out of the critical path (dynamic import — likely already the case via `MapWrapper`/`MapClient`); confirm it isn't blocking LCP on `/` (the map is only on `/map`).
- Run Lighthouse on `/`, `/report`, `/map`; target ≥ 90 Performance / 100 Accessibility / 100 SEO on mobile.

---

## PHASE 4 — Verification & acceptance

Gate the work with these checks:
1. `npm run typecheck` → 0 errors. `npm run lint` → clean. `npm run test` → green (keep the i18n key-parity test passing; add a test that every public page exposes hreflang in Phase 2).
2. **Sitemap & robots:** `/sitemap.xml` and `/robots.txt` resolve and list the right URLs.
3. **Rich Results / Schema:** JSON-LD validates in Google's Rich Results Test and Schema.org validator.
4. **hreflang:** validate with an hreflang checker; confirm self + return tags and `x-default`.
5. **Crawl:** `/en` and `/de` return full localized HTML at distinct URLs (curl + `view-source`, not just the browser with a cookie).
6. **Backward compat:** a previously shared `/r/<token>` link still works.
7. **Lighthouse** mobile run meets the targets in 3.5.
8. **Search Console:** submit the sitemap; check Coverage and International Targeting after a few days.

---

## Suggested PR sequence
1. **PR1 — SEO foundation:** robots.ts, sitemap.ts, localized `generateMetadata` on all pages, canonical, JSON-LD. (Phase 1)
2. **PR2 — Locale routing:** `[lang]` segment, `middleware.ts`, locale-aware links + switcher, hreflang, legacy-link redirects, locale-aware sitemap. (Phase 2)
3. **PR3 — UX & a11y:** switcher label, skip link, alt/labels/contrast, top-page i18n gaps, Lighthouse fixes. (Phase 3)

Each PR: include before/after notes, the acceptance checks for that phase, and screenshots where visual.

## Definition of done
EN and DE pages are crawlable at their own URLs with correct hreflang and canonical; sitemap and robots are live; structured data validates; the language switcher preserves the current page and is accessible; legacy tracking links still resolve; Lighthouse mobile hits the targets; and all checks in Phase 4 pass — with **no design regressions** and **no hardcoded strings** introduced.
