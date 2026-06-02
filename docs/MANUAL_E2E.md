# GreeceClean Manual End-to-End Verification

Use this against a real Supabase project and Resend sandbox/domain.

## Setup

1. Apply `supabase/schema.sql`.
2. Apply `supabase/migrations/001_postgis_geometry.sql` through `004_schema_convergence.sql`.
3. Apply `supabase/seed_municipalities.sql`.
4. Create/verify the public Supabase Storage bucket named `reports`.
5. Configure `.env.local` with Supabase, admin, Resend, `WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`, `EMAIL_FROM`, and `RESEND_VERIFIED_DOMAIN`.
6. Run `npm run dev`.

## Flow

1. Open `/report`.
2. Submit a report inside Greece with:
   - one photo with EXIF GPS if available,
   - a valid category,
   - optional description.
3. Confirm the success page returns a `/r/<token>` tracking link.
4. In Supabase, confirm:
   - `reports.status = pending`,
   - images exist in Storage,
   - no reporter email is collected.
5. Log in to `/admin/login`.
6. In `/admin/dashboard`, approve the pending report.
7. Confirm:
   - report becomes public,
   - municipality email attempt is visible in the Email column,
   - `email_logs` contains `sent` or `failed`.
8. Open the tracking link and confirm the timeline shows submitted/verified/forwarded dates.
9. Mark the report cleaned in admin.
10. Confirm:
    - `reports.status = resolved`,
    - `resolved_at` is set,
    - the public tracking timeline shows the resolved date,
    - public map/tracking no longer show it as open.

## Failure Checks

1. Submit coordinates outside Greece and confirm a localized 422 message.
2. Submit an image over 10 MB and confirm a localized 413 message.
3. Temporarily remove a municipality email and approve a report; confirm the admin row shows `Awaiting municipality email`.
4. Trigger repeated report submissions from the same IP and confirm a 429 rate-limit response.
