# GreeceClean Phase 0 Audit

Date: 2026-05-29

This audit follows `prompt-codex-greececlean-antigravity.md` Phase 0. No application fixes were made in this phase.

## Command Results

| Command | Result | Notes |
| --- | --- | --- |
| `npm install` | Passed | PowerShell blocks `npm.ps1`, so the Windows shim `npm.cmd install` was used. Install reported vulnerabilities. |
| `npm run typecheck` | Passed | `tsc --noEmit` completed with zero errors. |
| `npm run lint` | Failed | Script runs `next lint`; Next 16 treats `lint` as a project directory and fails with `Invalid project directory provided, no such directory: ...\GreeceClean\lint`. There is also no ESLint config file in the repo. |
| `npm run test` | Passed | 1 file passed, 20 tests. Coverage is only `tests/unit/elapsed.test.ts`; report, email, moderation, auth, i18n, and geocoding paths are still untested. |
| `npm run build` | Passed with warning | Production build succeeds. Next warns that it inferred `C:\Users\salva` as the workspace root because a parent `package-lock.json` exists. |
| `npm run dev` | Failed locally | Turbopack starts then panics: `Error in watcher: PathNotFound ... C:\Users\salva`. `npm run dev -- --webpack` starts, but still warns about incorrect workspace-root inference. |
| `npm audit --json` | Failed audit gate | 17 vulnerabilities reported: 1 high, 16 moderate. Notably `next@16.2.4` is below several audited fixed ranges (`<16.2.5` / `<16.2.6`). |

Local toolchain: Node `v24.15.0`, npm `11.12.1`.

Local Supabase verification could not be completed from this environment because `supabase`, `psql`, and Docker CLIs are not installed. The schema review below is static.

## Clean Clone Boot Path

Current documented full-function setup requires more than `.env.local.example` says:

1. Install Node 20+ and npm.
2. Run `npm install`.
3. Copy `.env.local.example` to `.env.local`.
4. Replace all placeholder values. A fresh app cannot submit end-to-end with the example file as-is because the example contains a real-looking Supabase URL/anon key but a placeholder service-role key, so `isSupabaseConfigured` becomes true and API routes attempt real service-role operations.
5. Create a Supabase project.
6. Run SQL in this effective order:
   - `supabase/schema.sql`
   - `supabase/email_notifications.sql`
   - `supabase/migrations/001_postgis_geometry.sql`
   - `supabase/migrations/002_email_webhook_trigger.sql` only if `pg_net` and DB settings are desired
   - `supabase/migrations/003_report_timestamps.sql`
   - `supabase/seed_municipalities.sql` or `scripts/muni_insert.sql`
   - optional `supabase/seed.sql`
7. Manually create a public Supabase Storage bucket named `reports`. This is documented in `docs/GREECECLEAN_HANDOVER.md`, but not in `README.md` quick start and not created by `schema.sql`.
8. Configure Resend and `WEBHOOK_SECRET` for actual municipality email forwarding.
9. Run `npm run dev`.

Blockers to this path:

- `npm run dev` currently fails on this machine under default Turbopack root inference.
- `supabase/schema.sql` is not sufficient by itself and likely fails on a clean DB at `idx_reports_location` because it uses `ll_to_earth(lat, lng)` without enabling the `cube` / `earthdistance` extensions.
- A fresh DB from only `schema.sql` lacks columns and tables required by the app, listed below.
- The `reports` Storage bucket is neither created by SQL nor included in the README quick start.

## Schema vs Code Drift

`supabase/schema.sql` is not authoritative. Code references schema elements that only exist in side files or do not exist yet.

Missing from `schema.sql` but used by code:

| Object | Used by | Defined in |
| --- | --- | --- |
| `municipalities.name_de` | `/api/report`, `/api/send-report-email`, admin dashboard/pages | `supabase/migrations/001_postgis_geometry.sql` |
| `municipalities.region` | admin dashboard/pages, municipality edit route | `supabase/email_notifications.sql` |
| `municipalities.name_el` unique constraint | `seed_municipalities.sql` uses `ON CONFLICT (name_el)` | `supabase/email_notifications.sql` |
| `reports.confirmed_at` | admin approve action | `supabase/migrations/003_report_timestamps.sql` |
| `reports.notified_at` | map/tracking pages, forward action | `supabase/migrations/003_report_timestamps.sql` |
| `reports.resolved_at` | map/tracking pages, mark-cleaned action | `supabase/migrations/003_report_timestamps.sql` |
| `reports.geom` | PostGIS triggers/indexes | `supabase/migrations/001_postgis_geometry.sql` |
| `municipalities.boundary` | PostGIS auto-assignment | `supabase/migrations/001_postgis_geometry.sql` |
| `email_logs` table and indexes | `/api/send-report-email`, admin forward action | `supabase/email_notifications.sql` |
| public `reports` Storage bucket | `/api/report`, admin delete action | not created by repo SQL |

Additional schema issues:

- `schema.sql` inserts sample municipalities every run without `ON CONFLICT`, so it is not idempotent and can create duplicate municipality names.
- If `schema.sql` is re-run and duplicates exist, the later unique constraint in `email_notifications.sql` can fail.
- Numeric migrations are not self-contained; `001_postgis_geometry.sql` assumes `municipalities` and `reports` already exist.
- The migration sequence `schema.sql -> migrations/001-003` still omits `email_logs`, `region`, and the `name_el` unique constraint unless `email_notifications.sql` is run out-of-band.
- `scripts/muni_insert.sql` inserts `name_de`, so it requires the PostGIS migration first.
- `lib/categories.ts` currently accepts 13 categories, while the prompt's domain model specifies 5 (`illegal_dump`, `roadside_litter`, `abandoned_vehicle`, `vandalism`, `other`). This is product/domain drift that needs an explicit decision before Phase 1 changes.

## Dead or Stale Code

- `lib/notifications.ts` is a legacy console-stub notification path. No live imports were found. The active path is `lib/email.ts`, `lib/emailTemplates.ts`, and `emails/MunicipalityReport.tsx`.
- `components/DashboardTabs.tsx` is not imported by any app route or component.
- Documentation is inconsistent about middleware/proxy: current code uses `proxy.ts`, while some docs still refer to `middleware.ts` or call `proxy.ts` legacy.

## Missing Env and Runtime Wiring

- `.env.local` is git-ignored and currently untracked. `.env.local.example` is tracked.
- No committed real service-role key was found in tracked files. Tracked docs contain placeholder examples such as `eyJ...`, not complete JWTs.
- `SUPABASE_SERVICE_ROLE_KEY` is only read from `lib/supabase.ts`. No client component imports `supabaseAdmin`; current imports are server components and API routes.
- `isSupabaseConfigured` only checks URL + anon key, not the service-role key. With `.env.local.example`, the app leaves stub mode and then fails service-role operations with placeholder credentials.
- The admin approve action silently skips auto-email when `NEXT_PUBLIC_APP_URL` or `WEBHOOK_SECRET` is missing. This is the Phase 1.3 blocker.
- Resend domain verification is only lightly documented through `EMAIL_FROM`; there is no startup/domain check.
- `supabaseAdmin` and `supabase` are initialized at module scope in `lib/supabase.ts`. The email client already follows lazy initialization.

## Routes and Normal-Input Failure Risks

- `POST /api/report`
  - Can return 500 on a clean Supabase project if the `reports` Storage bucket has not been manually created.
  - If one upload in a multi-image submit fails after earlier uploads succeeded, uploaded blobs are orphaned.
  - If DB insert fails after uploads succeed, uploaded blobs are orphaned.
  - `resolveMunicipalityId` inserts `name_de`, which fails when only `schema.sql` has been applied.
  - Auto-created municipality rows are not flagged for review.
  - No rate limit exists beyond the honeypot.

- `PATCH /api/admin/report/[id]`
  - Route handlers rely on `proxy.ts` for admin auth and do not revalidate the session cookie inside the route before DB operations.
  - `approve` writes `confirmed_at`, which does not exist after `schema.sql` alone.
  - `approve` can report success while skipping email dispatch entirely when webhook env vars are missing.
  - `forward` sets `status = forwarded` before sending email. If email send fails it returns 207 and logs, which is intentional, but `email_logs` absence is not handled.
  - `forward` returns 422 when municipality email is missing; there is no clear "awaiting municipality email" state.
  - `DELETE` removes only `<token>.webp`, leaving `<token>_2.webp` and `<token>_3.webp` for multi-image reports.

- `POST /api/send-report-email`
  - Correctly requires `Bearer ${WEBHOOK_SECRET}`.
  - Selects `municipality.name_de`, which is absent from `schema.sql`.
  - Inserts into `email_logs`, but ignores the insert result; log failures are invisible.
  - Does not update `reports.status` or `notified_at`; admin `approve` calls this endpoint expecting notification, but the report remains `in_review` even after a successful auto-email.

- Admin dashboard and municipality pages
  - Select `name_de` and `region`; with only `schema.sql`, these queries fail and the UI silently renders empty data because query errors are ignored.
  - Email logs are not surfaced in the dashboard.
  - Missing-email municipalities are counted but not prioritized by pending-report count.

- Public map/tracking pages
  - Select `notified_at` and `resolved_at`; with only `schema.sql`, these queries fail or return no data depending on the Supabase response.
  - Tracking page has a visual status stepper, but it does not show milestone dates on the timeline itself.

## Other Quality Gaps Observed

- Tests currently cover elapsed-time helpers only. The core report, geocoding, email, moderation, and auth flows do not have tests yet.
- The report form surfaces raw API error strings instead of mapping known statuses to localized messages.
- i18n JSON key sets for `el`, `en`, and `de` currently match in a static key comparison, but there is no test enforcing that.
- Public Nominatim calls have no cache or request queue.
- `email_logs` is not exposed in admin.
- README quick start says Node >= 18, but Next 16 requires Node 20.9+.
- README is wrapped in `<![CDATA[...]]>`, which makes it non-standard Markdown when viewed directly.

## Phase 1 Priority Order Confirmed

1. Make `supabase/schema.sql` authoritative and idempotent, including extensions, storage bucket setup or explicit documented bucket SQL, all columns, `email_logs`, RLS, indexes, triggers, and seed conflict behavior.
2. Reconcile migrations so fresh and incremental paths converge.
3. Remove `lib/notifications.ts` and likely `components/DashboardTabs.tsx` if still unused.
4. Change admin approve responses so skipped/failed auto-email is visible to the API caller and admin UI.
5. Fix clean dev boot by pinning the Next/Turbopack workspace root.
6. Fix lint tooling for Next 16 / ESLint 9.

## Phase 1 Follow-up Completed

Completed after the audit in the same pass:

- Replaced `supabase/schema.sql` with an authoritative, idempotent schema including required extensions, app-used columns, `email_logs`, RLS, indexes, triggers, and the public `reports` storage bucket setup.
- Added `supabase/migrations/004_schema_convergence.sql` so existing deployments can converge additively.
- Removed `lib/notifications.ts`.
- Added explicit admin API session validation via `lib/adminAuth.ts`; `proxy.ts` still protects the routes, but route handlers no longer rely on proxy alone.
- Changed approve email dispatch to run after the report update and return `{ emailDispatched: false, reason }` when webhook configuration or delivery fails.
- Made email-log write failures visible in logs/API responses.
- Fixed `npm run lint` for Next 16 / ESLint 9 with `eslint.config.mjs`.
- Pinned Next workspace roots in `next.config.ts`; `npm run dev` now serves `/` successfully under Turbopack.
- Bumped `next` and `eslint-config-next` to `16.2.6`, pinned React packages to `19.2.5`, and ran `npm audit fix`.

Current verification after Phase 1:

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run test`: pass, 1 file / 20 tests.
- `npm run build`: pass.
- `npm run dev`: pass smoke test, `GET /` returned 200.
- `npm audit --audit-level=high`: pass exit code; two moderate advisories remain through Next's bundled PostCSS with no non-breaking fix available from npm audit.

Still not verified locally:

- Applying `supabase/schema.sql` to a clean Supabase instance; no `supabase`, `psql`, or Docker CLI is available in this environment.

## Phase 2 Follow-up Completed

Completed after the Phase 1 verification pass:

- Added cached, queued reverse geocoding in `lib/geocoding.ts` with `GEOCODER_PROVIDER` and `NOMINATIM_USER_AGENT` configuration.
- Made municipality matching deterministic by normalizing Greek names, preferring exact matches, then bounded partial matches, and flagging auto-created municipality rows.
- Cleaned up already-uploaded report images when later uploads or the database insert fail.
- Updated `/api/send-report-email` so a successful email also sets `reports.status = forwarded` and `notified_at`, and returns `statusUpdated` / `logRecorded` flags.
- Surfaced latest `email_logs` status, recipient, timestamp, and errors in the admin report table, with a resend action that re-calls the protected email webhook.
- Marked approved reports with missing municipality email as `Awaiting municipality email` in the admin table.
- Sorted municipality email maintenance by missing email first, then open report count, and displayed unresolved report counts plus auto-created rows.
- Changed municipality email clearing to persist `null` instead of an empty string.
- Expanded admin report deletion to remove all known multi-image storage objects.
- Added focused unit coverage for Greek municipality normalization and Nominatim address field selection.

## Phase 3 Follow-up Completed

Completed after the Phase 2 verification pass:

- Added a lightweight in-memory IP rate limiter for `POST /api/report`, enabled after the honeypot path and before storage/database work. The endpoint now returns `429` with `Retry-After` and rate-limit headers.
- Added typed report-submit error codes for validation, rate-limit, image-processing, storage, and database failures.
- Updated `ReportForm` to map known API error codes/statuses to localized EL/EN/DE user-facing messages instead of raw server strings.
- Added `RESEND_VERIFIED_DOMAIN` documentation and a first-send warning if `EMAIL_FROM` does not match the expected verified Resend domain.
- Added Vitest coverage for:
  - geocoding normalization and address field selection,
  - rate limiter behavior and IP extraction,
  - public report route honeypot, validation, oversize, outside-Greece, invalid-category, and rate-limit responses,
  - protected admin/email route auth rejection,
  - i18n nested key parity and category ID alignment,
  - municipality email template subject/link basics.

Current verification after Phase 3:

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run test`: pass, 7 files / 37 tests.
- `npm run build`: pass.
- Bounded `npm run dev -- --port 3100` smoke: `/`, `/report`, and `/admin/login` returned 200; unauthenticated `/admin/dashboard` returned 307 to `/admin/login`.
- `npm audit --audit-level=high`: pass exit code; two moderate PostCSS advisories remain through Next's bundled PostCSS with no available fix.

Still not verified locally:

- Clean Supabase schema application and live Resend delivery, because this environment does not have Supabase/psql/Docker and no Resend sandbox credentials were used.
- Full multi-image orphan cleanup through a mocked storage/upload route test; the runtime cleanup path is implemented, but current automated route tests focus on pre-storage validation and rate limiting.

## Phase 4 Follow-up Completed

Completed after the Phase 3 verification pass:

- Added optional reporter email updates on the submit form, including localized EL/EN/DE labels, hint text, and invalid-email errors.
- Stored reporter opt-ins in a private `report_subscribers` table instead of the public-readable `reports` table. RLS is enabled and no public policies are defined.
- Added reporter status email templates for `forwarded` and `resolved` updates using the existing Resend/React Email pipeline.
- Wired successful municipality email delivery to send the reporter a `forwarded` update, and admin `mark_cleaned` to send a `resolved` update. Reporter emails are non-blocking and de-duplicated with timestamp columns.
- Updated the public tracking page timeline to show milestone dates for submitted, verified, municipality notified, and resolved states when timestamps are present.
- Updated the privacy page to disclose optional reporter email collection for status updates.
- Added `docs/MANUAL_E2E.md` with the real-service submit -> moderate -> email -> resolve verification script, and linked it from the README.
- Added focused tests for reporter email templates and invalid optional reporter email validation.
- Temporarily disabled the server-side Greece bounding-box rejection per deployment request; coordinates still must be valid latitude/longitude ranges.

Current verification after Phase 4:

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run test`: pass, 8 files / 40 tests.
- `npm run build`: pass.
- Bounded `npm run dev -- --port 3100` smoke: `/`, `/report`, `/privacy`, and `/admin/login` returned 200; unauthenticated `/admin/dashboard` returned 307 to `/admin/login`.
- `npm audit --audit-level=high`: pass exit code; two moderate PostCSS advisories remain through Next's bundled PostCSS with no available fix.

Still not verified locally:

- The full real-service E2E path in `docs/MANUAL_E2E.md`, because this environment has no clean Supabase CLI/psql/Docker target and no Resend sandbox credentials.
