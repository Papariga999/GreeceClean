# Admin UI Kit — Katharos Moderation Console

A high-fidelity recreation of the internal Katharos admin dashboard. **Greek-only**, as in the real product. Open `index.html`.

## What's here

| File | Contents |
|------|----------|
| `index.html` | Loads React + Babel + the urgent-beacon `@keyframes`. Entry point. |
| `data.jsx` | Greek category labels (`CAT_GR`), status map (`STATUS_GR`), `priorityOf()` logic, sample reports, municipality registry, and the `StatusPill` / `PriorityBadge` / `CatCell` badge components. |
| `AdminTable.jsx` | The report table: photo, token, municipality, category, **priority** (pulsing red beacon for urgent), status pill, date, and per-row actions (Verify / Reject / Forward / Edit / Delete) with an inline edit row. |
| `App.jsx` | Login screen + dashboard shell: header, three report sections (Pending / Approved / Rejected) with count chips, and the municipality email registry table. |

## Try it
- The dashboard loads logged-in. Click **Αποσύνδεση** (logout) to see the login screen, then **Σύνδεση** to return.
- In a pending row: **✓ Επαλήθευση** (verify → moves to Approved), **Απόρριψη** (reject), **Επεξεργασία** (inline edit), **Διαγραφή** (delete).
- In an approved row: **📨 Προώθηση** (forward to municipality).

## Fidelity notes
- Cosmetic only — actions mutate local React state, no API/email is sent.
- Priority logic mirrors `lib/priority.ts`: `sewage` & `illegal_dump` are always urgent; `construction_debris`, `abandoned_vehicle`, `coastal_pollution` are medium; everything else normal. (The real app also escalates `green_waste` to urgent during fire season — omitted here.)
- Municipality emails are illustrative samples, not real addresses.
