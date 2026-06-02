<![CDATA[# 🌿 GreeceClean

> **Civic technology for a cleaner Greece.** Report illegal dumping and litter in under one minute — no account required. We forward reports directly to the responsible municipality.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Table of Contents

- [Mission](#mission)
- [The No-Login Viral Loop](#the-no-login-viral-loop)
- [Key Features](#key-features)
- [User Flow](#user-flow)
- [Visual Branding — Aegean Clean](#visual-branding--aegean-clean)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Future Roadmap](#future-roadmap)

---

## Mission

Greece faces a serious illegal-dumping crisis: construction debris abandoned on mountain roads, tyres burned on beaches, appliances left in riverbeds. The problem is not a lack of law — it is a lack of reporting infrastructure. Municipalities often don't know where the dumps are. Citizens assume someone else will report them. Nothing gets cleaned.

**GreeceClean bridges that gap.**

It turns every smartphone into a reporting terminal. A citizen photographs the problem, the app auto-detects the GPS location, and within seconds a structured report is on its way to the municipality's official inbox. No registration, no bureaucracy, no friction.

### The Political Impact Strategy — Leaderboards

The landing page publishes two public leaderboards:

| Leaderboard | Metric | Purpose |
|------------|--------|---------|
| 🏆 **Cleanliness Champions** | Highest % of resolved reports | Rewards municipalities that act |
| ⚠️ **Room for Improvement** | Most unresolved pending reports | Creates accountability |

By making municipal performance **publicly visible and searchable**, GreeceClean creates political incentive for local governments to act on reports. A mayor who ignores fifty open reports is demonstrably failing their citizens — and that data is public.

---

## The No-Login Viral Loop

GreeceClean deliberately requires **zero account creation**. The entire submission flow takes under 60 seconds:

```
📷 Photo  →  📍 GPS  →  🗂️ Category  →  ✓ Submit  →  🔗 Tracking link
```

Every submission generates a unique, shareable tracking URL (`/r/<12-char-token>`). Users are encouraged to share this link on social media, in local Facebook groups, or with journalists. Each share:

1. Drives awareness of the specific pollution incident
2. Brings new visitors to GreeceClean
3. Creates public pressure on the municipality to resolve it

The tracking page includes one-tap **WhatsApp sharing** and a copy-link button, optimised for the Greek social media landscape where local community groups on WhatsApp and Facebook are highly influential.

---

## Key Features

### ⚡ Fast Reporting — 4 Steps, Under 60 Seconds

| Step | What happens |
|------|-------------|
| **1 · Category** | Tap one of **11 report types**: Illegal Dump, Construction Debris, Roadside Litter, Plastics, Tires, Appliances, Abandoned Vehicle, Green Waste, Bulky Items, Coastal Pollution, Sewage (+ Other). Auto-advances on tap. |
| **2 · Photos** | Capture or upload up to **3 photos**; reorder with ←→ buttons; EXIF GPS is scanned on each upload. Images are compressed server-side (WebP, ≤ 500 KB). |
| **3 · Location** | GPS fires automatically on mount; a Leaflet map opens immediately when GPS resolves — draggable pin + Nominatim search bar. |
| **4 · Submit** | Optional description, then submit (or tap "Skip description & submit →"). Done. |

### 🧠 Smart Priority System

Reports are automatically assigned a priority level at submission time based on category and season:

| Priority | Categories | Notes |
|----------|-----------|-------|
| 🔴 **Urgent** | `sewage`, `illegal_dump` | Always urgent — health/environmental hazard |
| 🔴 **Urgent (seasonal)** | `green_waste` | Urgent during Greek fire season (May 1 – Oct 31) |
| 🟡 **Medium** | `construction_debris`, `abandoned_vehicle`, `coastal_pollution` | Moderate impact |
| ⚪ **Normal** | All other categories | Standard queue |

Priority is displayed in the admin dashboard with a pulsing red beacon for urgent rows. Logic lives in `lib/priority.ts`.

### 📍 EXIF-Based Location Detection

When a photo is selected from the library, the app reads its **EXIF GPS metadata** using the `exifr` library — no GPS permission prompt needed. If EXIF data is present, the location step opens with the map already centred on the photo's coordinates, saving the user another tap.

If no EXIF is found (camera capture, screenshots, WhatsApp images), the device's geolocation API fires automatically as a fallback.

### 🌐 3-Language Support (EL / EN / DE)

The full interface is available in **Greek, English, and German** — serving the Greek diaspora, tourists, and NGO partners in German-speaking countries. Language preference is stored in a cookie and applied server-side for correct SEO meta tags.

| Language | Code | Notes |
|----------|------|-------|
| Greek | `el` | Default — all municipality emails in Greek |
| English | `en` | For international users and tourists |
| German | `de` | For NGO partners, diaspora |

### 🔗 Official Tracking System

Every report generates a permanent public URL (`/r/<token>`) showing:
- Current status with a visual progress stepper (Submitted → Verified → Municipality Notified → Cleaned Up)
- Report photo(s) and location on an OpenStreetMap embed
- Nearest similar reports (Haversine distance — navigate left/right)
- WhatsApp share button

---

## User Flow

```
1. Citizen discovers illegal dump
       │
       ▼
2. Opens greececlean.gr/report on mobile
       │
       ▼
3. Selects category (e.g. "Illegal Dump")
       │
       ▼
4. Takes photo or uploads from library
   └── EXIF GPS extracted automatically (if available)
       │
       ▼
5. Confirms or adjusts location on map
   └── GPS auto-fires, map opens immediately
       │
       ▼
6. Optional: adds description
       │
       ▼
7. Submits report
   ├── Images compressed & uploaded to Supabase Storage
   ├── Report inserted to database (status: pending)
   └── Municipality identified via reverse geocoding
       │
       ▼
8. Receives tracking URL (e.g. greececlean.gr/r/ab12cd34ef56)
       │
       ▼
9. Shares on WhatsApp / social media
       │
       ▼
10. Admin reviews & approves → appears on public map
        │
        ▼
11. Admin forwards to municipality (automated email)
        │
        ▼
12. Municipality marks as cleaned → report resolved ✅
```

---

## Visual Branding — Aegean Clean

GreeceClean uses a custom design system called **"Aegean Clean"**, built on Tailwind CSS with two primary colours drawn from the Greek landscape:

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#005BAE` | Navigation, headings, primary buttons — the deep Aegean blue |
| `action` | `#6B8E23` | CTAs, confirmation states, resolved badges — olive green |

The rounded-corner system (`border-radius: 1rem` as base, up to `1.5rem` for cards) gives the UI a modern, approachable feel appropriate for a civic tool targeting non-technical users.

Typography uses **Inter** with Greek and Latin character subsets loaded via `next/font`.

---

## Quick Start

### Prerequisites

- Node.js >= 20.9
- npm >= 10
- A [Supabase](https://supabase.com) project
- A [Resend](https://resend.com) account (for municipality email forwarding)

### 1. Clone

```bash
git clone https://github.com/Papariga999/GreeceClean.git
cd GreeceClean
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.local.example .env.local
```

Fill in the values — see [Environment Variables](#environment-variables) below.

### 4. Initialise the Database

Run the following SQL files **in order** in your Supabase SQL editor:

```bash
supabase/schema.sql                              # Authoritative tables, RLS, indexes, triggers, storage bucket
supabase/migrations/001_postgis_geometry.sql     # Additive compatibility migration
supabase/migrations/002_email_webhook_trigger.sql # Optional pg_net webhook trigger
supabase/migrations/003_report_timestamps.sql    # Additive compatibility migration
supabase/migrations/004_schema_convergence.sql    # Additive convergence migration
supabase/seed_municipalities.sql                 # Pre-loaded Greek municipalities with emails
supabase/seed.sql                                # Optional sample reports for development
```

> **Note:** `schema.sql` creates the public `reports` storage bucket when run inside Supabase. If your SQL environment cannot access `storage.buckets`, create a public bucket named `reports` manually.

### 5. Run Development Server

```bash
npm run dev
# App available at http://localhost:3000
```

---

## Environment Variables

| Variable | Required | Description |
|----------|:--------:|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon/public key (safe for browser) |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Service role key — **never expose to the browser** |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL of the app (e.g. `https://greececlean.vercel.app`) |
| `ADMIN_PASSWORD` | ✅ | Password for the admin dashboard |
| `ADMIN_COOKIE_SECRET` | ✅ | 32-byte secret for HMAC session signing. Generate: `openssl rand -hex 32` |
| `RESEND_API_KEY` | ✅ | Resend API key for municipality email forwarding |
| `WEBHOOK_SECRET` | ✅ | Bearer token for `/api/send-report-email`. Generate: `openssl rand -hex 32` |
| `GEOCODER_PROVIDER` | ☑️ Optional | Reverse-geocoding provider. Defaults to `nominatim`; unsupported values fall back to Nominatim. |
| `NOMINATIM_USER_AGENT` | ☑️ Optional | Custom User-Agent for Nominatim reverse geocoding. Set this to a project contact string in production. |
| `EMAIL_FROM` | ☑️ Optional | Override sender address (default: `GreeceClean <noreply@greececlean.gr>`) |
| `RESEND_VERIFIED_DOMAIN` | ☑️ Optional | Expected verified Resend domain, e.g. `greececlean.gr`; used for startup/send-time warnings. |

### Resend Domain Setup

Before production email forwarding, add `greececlean.gr` in Resend Domains and publish the DNS records Resend provides:

- SPF/TXT record for authorized sending
- DKIM records for message signing
- Optional DMARC record for domain policy/reporting

Set `EMAIL_FROM` to an address on that verified domain and set `RESEND_VERIFIED_DOMAIN=greececlean.gr`. If the sender domain does not match, the app logs a warning before sending.

---

## Deployment

### Vercel (Recommended)

```bash
# One-time: push to GitHub and connect repo in Vercel dashboard
# Then for each release:
git push origin main   # Vercel auto-deploys on push
```

Set all environment variables in the Vercel project settings under **Settings → Environment Variables**.

### Manual Production Build

```bash
npm run build   # Outputs to /.next
npm run start   # Starts production server on port 3000
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Open a pull request against `main`

All UI strings must be added to all three translation files (`lib/i18n/el.ts`, `en.ts`, `de.ts`) and the `Dictionary` type in `lib/i18n/types.ts`.

---

## Future Roadmap

| Feature | Priority | Notes |
|---------|:--------:|-------|
| 🗺️ **Cluster map** | 🔴 High | Group nearby pins for better large-scale map readability |
| 📄 **PDF report export** | 🟡 Medium | One-page formatted report for printing / official submission |
| 🔔 **Status push notifications** | 🟡 Medium | Browser / PWA notification when report status changes |
| 👤 **User portfolios** | 🟡 Medium | Opt-in local identity; track your own submissions |
| 🏛️ **NGO partnership portal** | 🟡 Medium | Bulk report access and API for partner organisations |
| 📊 **Analytics dashboard** | 🟢 Low | Heatmaps by region, time-to-resolution trends |
| 🌍 **Multi-country expansion** | 🟢 Low | Albania, Bulgaria, North Macedonia with their own municipality data |
| 🤖 **AI category detection** | 🟢 Low | Auto-suggest category from photo using vision API |

### Already shipped (previously roadmap items)

| Feature | Status | Notes |
|---------|:------:|-------|
| 📧 **Municipality email forwarding** | ✅ Live | Auto-email sent by admin on approval via Resend |
| 🏙️ **PostGIS municipality auto-assignment** | ✅ Live | `ST_Within` spatial query auto-assigns `municipality_id` from boundary polygons on insert/update |

---

_For architecture, API reference, database schema, and security details, see [docs/TECHNICAL_DOCS.md](docs/TECHNICAL_DOCS.md). For the real-service verification flow, see [docs/MANUAL_E2E.md](docs/MANUAL_E2E.md)._
]]>
