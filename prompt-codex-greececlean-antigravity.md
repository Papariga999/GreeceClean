# Codex / Antigravity — GreeceClean Build-to-Functional Prompt
*Place this file at the repo root as `CLAUDE.md` / `AGENTS.md`, or paste it as Project Instructions in the Antigravity IDE. Goal: take the existing MVP to a fully functional, reproducibly deployable app. **Monetization is explicitly out of scope** — do not add payments, plans, or municipal billing.*

---

## Project: GreeceClean

GreeceClean is a trilingual (Greek / German / English) civic web app for **reporting illegal dumping and litter to Greek municipalities**. A citizen photographs a problem, the app extracts the location (photo EXIF → live GPS → manual map pin), reverse-geocodes it to a municipality, and after admin moderation **emails the report to that municipality's official inbox**. Each report has a public tracking URL, a public map, and a municipality "leaderboard."

It is already a deployed MVP (Vercel + Supabase + Resend). Your job is **not** a rewrite. It is to close the gaps that stop it from being a robust, reproducible, end-to-end functional product.

**Stack:** Next.js 16 (App Router, React 19), TypeScript strict, Supabase (Postgres + Storage + RLS), Resend + React Email, `sharp` (server image compression), Leaflet / react-leaflet, Nominatim (OSM) reverse geocoding, Tailwind, Vitest (installed, currently unused), deployed on Vercel.

---

## Domain model (do not change without instruction)

**Report categories** (`lib/categories.ts`, enum-validated server-side):
`illegal_dump`, `roadside_litter`, `abandoned_vehicle`, `vandalism`, `other`

**Report status state machine** (`report_status` enum):
`pending → in_review → forwarded → resolved` (terminal) / `rejected` (terminal)

- `pending` — submitted, awaiting moderation, not public
- `in_review` — approved (`is_approved = true`), visible publicly, auto-email fired
- `forwarded` — email sent to municipality (sets `notified_at`)
- `resolved` — municipality acted (sets `resolved_at`)
- `rejected` — spam/invalid (`is_approved = false`)

**The core value loop is:** capture → moderate → email municipality → track status. Everything below exists to make that loop reliable and reproducible.

---

## PHASE 0 — Audit first (do this before any change)

1. Run `npm install`, then `npm run typecheck` and `npm run lint`. Record every error.
2. Confirm a **clean clone can boot**: starting from only `.env.local.example`, document every step needed to get `npm run dev` working and a report submitted end-to-end against a fresh Supabase project. Anything undocumented is a bug to fix in Phase 1.
3. Produce a short `AUDIT.md` listing: current schema-vs-code drift, dead code, missing env wiring, and any route that 500s under normal input. Do not fix yet — just map it.

---

## PHASE 1 — Reproducibility & consistency blockers (fix first, in order)

These stop a fresh deploy from working correctly. None are about new features.

### 1.1 — Single source of truth for the database schema (CRITICAL)
The live schema is fragmented across `supabase/schema.sql`, `supabase/migrations/001–003`, `supabase/email_notifications.sql`, and ad-hoc `alter table` patches. Code reads columns and tables that `schema.sql` never defines, e.g.:
- `reports.description`, `reports.confirmed_at`, `reports.notified_at`, `reports.resolved_at`
- `municipalities.name_de`, `municipalities.region`
- the entire **`email_logs`** table (written by `/api/send-report-email` and the admin forward action)

**Fix:** Make `supabase/schema.sql` **authoritative and idempotent** — running it on an empty Postgres must produce the exact schema the code expects, including every column above, the `email_logs` table, all enums, RLS policies, indexes, and triggers. Reconcile the existing migrations so the sequence (`schema.sql` → migrations) is internally consistent and ends in the same state whether applied fresh or incrementally. Verify by applying to a clean local Supabase instance and diffing column lists against every `.select(...)` / `.insert(...)` in the codebase.

### 1.2 — Remove the dead notification path (CRITICAL for maintainability)
`lib/notifications.ts` is a `console.info` **stub** with a `TODO: resend` — it is imported nowhere (verified). The live path is `lib/email.ts` + `lib/emailTemplates.ts` + `emails/MunicipalityReport.tsx`. Delete `lib/notifications.ts` (or merge any still-wanted copy into the live template). Confirm no imports break.

### 1.3 — Fail loudly when the auto-email cannot fire
In `app/api/admin/report/[id]/route.ts`, the `approve` action fires the email webhook only if both `NEXT_PUBLIC_APP_URL` and `WEBHOOK_SECRET` are set — otherwise it **silently does nothing**, so approving a report appears to work but no municipality is ever notified. **Fix:** if those env vars are missing, log a clear warning and surface a non-blocking flag in the API response (e.g. `{ ok: true, emailDispatched: false, reason: 'missing WEBHOOK config' }`) so the admin UI can show "approved but not emailed." Never let the notification fail invisibly.

### 1.4 — Secret hygiene
Confirm `.env.local` is git-ignored and that **no service-role key** is committed anywhere. `.env.local.example` may keep the public anon key and placeholders only. Add a check to `AUDIT.md` confirming the service-role key never reaches client bundles (it must only be used in server code via `lib/supabase.ts` `supabaseAdmin`).

---

## PHASE 2 — Make the core loop reliable

### 2.1 — Geocoding robustness (`lib/geocoding.ts`)
Currently every call hits public **Nominatim** (OSM) with no caching and always returns `municipalityId: null`; the actual municipality match happens later by fuzzy name in `resolveMunicipalityId` (`app/api/report/route.ts`). Problems: Nominatim's usage policy is ~1 req/s and forbids heavy use; no caching; name-matching can silently create duplicate municipalities.

**Fix:**
- Add a server-side cache (in-memory LRU is fine for now; prefer a `geocode_cache` table or Upstash if available) keyed by rounded lat/lng.
- Make `resolveMunicipalityId` deterministic: normalize Greek names (strip accents/case, handle "Δήμος " prefix) before matching against the ~319 seeded municipalities; only auto-create a new municipality as a last resort, and flag auto-created rows (`is_auto_created boolean`) for admin review so the table doesn't fill with junk.
- Respect Nominatim ToS: keep the descriptive `User-Agent`, add a minimal delay/queue, and document a paid-geocoder swap path (env-switchable provider interface `reverseGeocode()` so Nominatim can be replaced without touching callers).

### 2.2 — Municipality email coverage
Many seeded municipalities likely have `email_official = null`, so forwarding fails with a 422. **Fix:** add an admin view (extend `MunicipalityEmailList`) that surfaces municipalities **missing an official email**, sorted by pending-report count, so they can be filled in. When a report is approved but its municipality has no email, set status to `in_review` and mark it clearly as "awaiting municipality email" rather than failing.

### 2.3 — Email deliverability & visibility
- Surface the `email_logs` table in the admin dashboard: per report, show last send status (`sent` / `failed`), recipient, timestamp, and a **"Resend email"** button (re-calls `/api/send-report-email`).
- Document required Resend domain setup (SPF/DKIM for `greececlean.gr`) in the README so municipal emails don't land in spam. Add a startup check that warns if `EMAIL_FROM` domain ≠ a verified Resend domain.

### 2.4 — Submission atomicity (`app/api/report/route.ts`)
When multiple images are uploaded and one upload fails, the route returns 500 but **already-uploaded images are orphaned** in storage. **Fix:** on any failure during a multi-image submit, delete the successfully uploaded blobs before returning the error, so storage stays consistent.

---

## PHASE 3 — Robustness & quality (the app must defend itself)

### 3.1 — Tests (Vitest is installed; there are currently none)
Add unit + route tests for the logic that the product's credibility depends on:
- `lib/geocoding.ts` — parsing of Nominatim address shapes, fallback to wider zoom, accent/prefix normalization.
- `app/api/report/route.ts` — Greece bounding-box rejection, missing-field rejection, invalid category, honeypot path (returns fake token, writes nothing), oversized image rejection, multi-image orphan cleanup.
- `lib/emailTemplates.ts` / `emails/MunicipalityReport.tsx` — subject/HTML built correctly for `el` and `de`.
- `app/api/admin/report/[id]/route.ts` — each action (`approve`, `forward`, `reject`, `deactivate`, `edit`, `mark_cleaned`) produces the correct status transition and the email side-effects fire/skip as expected (mock `sendEmail`).
- Auth: admin routes reject unauthenticated requests; `/api/send-report-email` rejects requests without the correct `Bearer ${WEBHOOK_SECRET}`.

Target: meaningful coverage of the report + email + moderation paths. `npm run test` must pass in CI.

### 3.2 — Rate limiting on the public report endpoint
`/api/report` has a honeypot but **no rate limiting** — a script can flood storage and the DB. Add IP-based rate limiting (Upstash Redis if you introduce it, otherwise a lightweight in-memory/edge limiter) on `POST /api/report`, with sensible limits (e.g. N submissions per IP per hour) and a 429 response. Keep the honeypot.

### 3.3 — i18n completeness
Verify `lib/i18n/{el,en,de}.json` have **identical key sets** (no missing keys silently falling back). Add a tiny test that fails if the three dictionaries diverge in keys.

### 3.4 — Error surfaces
No client-facing error should leak internal detail (already mostly true — keep it). Ensure every API failure path returns a typed `{ error }` with an appropriate status, and the report form maps known statuses (413/422/429/500) to localized, human messages.

---

## PHASE 4 — Functional completeness (close the loop for the reporter)

### 4.1 — Optional reporter status updates
Reports are anonymous (no email collected), so reporters only have the tracking URL. Add an **optional** email field at submit ("get notified when your report is forwarded / resolved" — opt-in, GDPR-friendly, clearly optional). Store it, and on `forwarded` / `resolved` transitions send a localized status email via the existing Resend pipeline. This is the single biggest UX gap in "the loop closing" for the citizen. Keep it optional — never block submission on it.

### 4.2 — Tracking page status timeline
Confirm `app/(public)/r/[token]/page.tsx` renders a clear status timeline (submitted → forwarded → resolved) using `created_at`, `notified_at`, `resolved_at`. If it only shows a badge, upgrade it to a visible timeline so a shared link communicates progress.

### 4.3 — End-to-end verification
Provide a documented manual test script (and where feasible an automated one) that exercises: submit (with EXIF photo) → appears in admin pending → approve → email logged as sent → forward → status `forwarded` → mark cleaned → public map + tracking page reflect `resolved`.

---

## Architecture & conventions

### Security rules (never violate)
- Service-role Supabase client (`supabaseAdmin`) is **server-only**; never import it into client components.
- Never disable or weaken RLS. Public can read only `is_approved = true` reports; anon may insert; everything else is service-role.
- `/api/send-report-email` must always require `Bearer ${WEBHOOK_SECRET}`.
- All admin routes validate the session cookie and validate IDs as UUIDs before any DB op.
- Validate and bound all user input (coordinates within Greece, category in `VALID_CATEGORIES`, description ≤ 500 chars, image size limits).

### Database rules
- `supabase/schema.sql` is the single source of truth and must be idempotent.
- New migrations go in `supabase/migrations/` with sequential numeric prefixes and must be additive (`add column if not exists`, `create ... if not exists`). Never `DROP TABLE`.
- Every new table gets RLS enabled with explicit policies.

### Code conventions
- TypeScript strict — no new `any`; avoid `as unknown as X` without a comment explaining why.
- Keep server/client boundaries clean (`'use client'` only where needed).
- All user-facing strings go through `lib/i18n` in all three locales — never hardcode UI text.
- Reuse the existing `sendEmail` + React Email template pipeline for any new mail.

### Deny patterns (never do)
```
- committing SUPABASE_SERVICE_ROLE_KEY or any real secret
- disabling RLS or adding an unauthenticated mutating endpoint
- DROP TABLE in a migration
- importing supabaseAdmin into a client component
- silent email failures (must log + surface)
- adding payments / pricing / billing (explicitly out of scope)
```

### File reference (verified)
```
app/
  (public)/
    page.tsx              ← landing + leaderboard
    report/page.tsx       ← ReportForm host
    map/page.tsx          ← public map
    r/[token]/page.tsx    ← public tracking page (status timeline lives here)
    privacy|terms|impressum/page.tsx
  admin/
    login/page.tsx
    dashboard/page.tsx    ← moderation + municipality email list
    municipalities/page.tsx
  api/
    report/route.ts             ← public submit (compress, geocode, insert)
    send-report-email/route.ts  ← webhook, Bearer-protected, writes email_logs
    admin/report/[id]/route.ts  ← PATCH actions + forward + DELETE
    admin/municipalities/[id]/route.ts
    admin/login|logout/route.ts
    locale/route.ts
components/
  ReportForm.tsx, LocationPicker.tsx, MapClient.tsx, MapWrapper.tsx,
  AdminReportList.tsx, MunicipalityEmailList.tsx, DashboardTabs.tsx,
  Header.tsx, Footer.tsx, CategoryBadge.tsx, CopyButton.tsx,
  LanguageSwitcher.tsx, LocaleProvider.tsx, reports/ElapsedTimeBadge.tsx
lib/
  supabase.ts, email.ts, emailTemplates.ts, geocoding.ts, categories.ts,
  priority.ts, elapsed.ts, seed-data.ts, notifications.ts (DELETE — dead),
  i18n/{index,types}.ts + {el,en,de}.json
emails/MunicipalityReport.tsx
supabase/  schema.sql, email_notifications.sql, seed*.sql, migrations/001–003
scripts/   batch_1..7.sql, muni_insert.sql  (~319 municipalities)
```

---

## Testing expectations (gate every change)
Before marking any phase complete:
1. `npm run typecheck` → zero errors.
2. `npm run lint` → clean.
3. `npm run test` → all green (you are adding these in Phase 3).
4. Apply `supabase/schema.sql` to a clean local Supabase → schema matches every column/table the code references (Phase 1.1).
5. Run the end-to-end script from Phase 4.3 against a real Supabase + Resend sandbox and confirm a report goes submit → email-sent → resolved.

## Definition of done
A fresh clone, given only documented env vars + a new Supabase project, can: run `schema.sql`, seed municipalities, `npm run dev`, submit a report, moderate it, and have a real email delivered to a municipality — with tests passing and no silent failures anywhere in the loop. Work the phases in order; open one PR per phase with the audit notes and test results in the description.
