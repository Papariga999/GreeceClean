import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

// ── Types ────────────────────────────────────────────────────────────────────

export type Lang = 'el' | 'en' | 'de'
export type Priority = 'urgent' | 'medium' | 'normal'

export type MunicipalityReportProps = {
  reportUrl:       string
  mapsUrl:         string
  imageUrl:        string | null
  categoryId:      string
  municipalityName: string
  submittedDate:   string
  description:     string | null
  priority:        Priority
  lang?:           Lang
}

// ── Category metadata ────────────────────────────────────────────────────────

const CATEGORIES: Record<string, { emoji: string; el: string; en: string; de: string }> = {
  illegal_dump:        { emoji: '🗑️', el: 'Παράνομη Χωματερή',      en: 'Illegal Dump',           de: 'Illegale Deponie' },
  construction_debris: { emoji: '🏗️', el: 'Μπάζα & Οικοδομικά',     en: 'Construction Debris',    de: 'Bauschutt' },
  roadside_litter:     { emoji: '🚮', el: 'Σκουπίδια',               en: 'Roadside Litter',        de: 'Straßenmüll' },
  plastics:            { emoji: '🧴', el: 'Πλαστικά',                en: 'Plastics',               de: 'Plastik' },
  tires:               { emoji: '🛞', el: 'Ελαστικά',                en: 'Tires',                  de: 'Reifen' },
  appliances:          { emoji: '🔌', el: 'Λευκές Συσκευές',         en: 'Appliances',             de: 'Elektrogeräte' },
  abandoned_vehicle:   { emoji: '🚗', el: 'Εγκαταλελειμμένο Όχημα', en: 'Abandoned Vehicle',      de: 'Verlassenes Fahrzeug' },
  green_waste:         { emoji: '🌿', el: 'Κλαδιά & Βλάστηση',      en: 'Green Waste',            de: 'Grünabfälle' },
  bulky_items:         { emoji: '🛋️', el: 'Ογκώδη Αντικείμενα',     en: 'Bulky Items',            de: 'Sperrmüll' },
  coastal_pollution:   { emoji: '🌊', el: 'Ρύπανση Ακτής',           en: 'Coastal Pollution',      de: 'Küstenverschmutzung' },
  sewage:              { emoji: '☣️', el: 'Λύματα & Χημικά',         en: 'Sewage / Chemicals',     de: 'Abwasser / Chemikalien' },
  vandalism:           { emoji: '🔨', el: 'Βανδαλισμός',             en: 'Vandalism',              de: 'Vandalismus' },
  other:               { emoji: '❓', el: 'Άλλο',                    en: 'Other',                  de: 'Sonstiges' },
}

// ── Translations ─────────────────────────────────────────────────────────────

const T = {
  el: {
    preview:      (cat: string, muni: string) => `Νέα αναφορά: ${cat} — ${muni}`,
    badge:        '[ΠΡΟΣΟΧΗ] ΝΕΑ ΑΝΑΦΟΡΑ',
    subtitle:     'Η ακόλουθη αναφορά αφορά την περιοχή αρμοδιότητάς σας και χρειάζεται διεκπεραίωση.',
    municipality: 'Δήμος',
    category:     'Κατηγορία',
    priority:     'Προτεραιότητα',
    date:         'Ημερομηνία',
    description:  'Περιγραφή',
    photo:        'ΦΩΤΟΓΡΑΦΙΑ',
    mapsLink:     'Άνοιγμα στο Google Maps →',
    viewBtn:      'Προβολή Αναφοράς →',
    orOpen:       'Ή ανοίξτε απευθείας:',
    footer:       'Αυτό το email στάλθηκε αυτόματα από το GreeceClean.gr. Αν δεν αφορά τον δήμο σας, παρακαλούμε αγνοήστε το.',
    priorities:   { urgent: '🔴 Επείγον', medium: '🟡 Μέτρια', normal: '🟢 Κανονική' },
  },
  en: {
    preview:      (cat: string, muni: string) => `New report: ${cat} — ${muni}`,
    badge:        '[ATTENTION] NEW REPORT',
    subtitle:     'The following report concerns your municipality\'s area of responsibility.',
    municipality: 'Municipality',
    category:     'Category',
    priority:     'Priority',
    date:         'Date',
    description:  'Description',
    photo:        'PHOTO',
    mapsLink:     'Open in Google Maps →',
    viewBtn:      'View Report →',
    orOpen:       'Or open directly:',
    footer:       'This email was sent automatically by GreeceClean.gr. If it does not concern your municipality, please ignore it.',
    priorities:   { urgent: '🔴 Urgent', medium: '🟡 Medium', normal: '🟢 Normal' },
  },
  de: {
    preview:      (cat: string, muni: string) => `Neue Meldung: ${cat} — ${muni}`,
    badge:        '[ACHTUNG] NEUE MELDUNG',
    subtitle:     'Die folgende Meldung betrifft den Zuständigkeitsbereich Ihrer Gemeinde.',
    municipality: 'Gemeinde',
    category:     'Kategorie',
    priority:     'Priorität',
    date:         'Datum',
    description:  'Beschreibung',
    photo:        'FOTO',
    mapsLink:     'In Google Maps öffnen →',
    viewBtn:      'Meldung anzeigen →',
    orOpen:       'Oder direkt öffnen:',
    footer:       'Diese E-Mail wurde automatisch von GreeceClean.gr gesendet. Falls sie nicht Ihre Gemeinde betrifft, ignorieren Sie sie bitte.',
    priorities:   { urgent: '🔴 Dringend', medium: '🟡 Mittel', normal: '🟢 Normal' },
  },
} as const

// ── Priority styles ───────────────────────────────────────────────────────────

const PRIORITY_STYLE: Record<Priority, { bg: string; text: string; border: string }> = {
  urgent: { bg: '#FEE2E2', text: '#991B1B', border: '#FCA5A5' },
  medium: { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  normal: { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7' },
}

const PRIMARY = '#006994'
const ACTION  = '#6B7C3A'
const TEXT    = '#1f2937'
const MUTED   = '#6b7280'
const BORDER  = '#e5e7eb'
const BG      = '#f9fafb'

// ── Component ─────────────────────────────────────────────────────────────────

export default function MunicipalityReport({
  reportUrl,
  mapsUrl,
  imageUrl,
  categoryId,
  municipalityName,
  submittedDate,
  description,
  priority,
  lang = 'el',
}: MunicipalityReportProps) {
  const t   = T[lang] ?? T.el
  const cat = CATEGORIES[categoryId] ?? { emoji: '📍', el: categoryId, en: categoryId, de: categoryId }
  const catLabel  = cat[lang] ?? cat.el
  const prioStyle = PRIORITY_STYLE[priority]
  const prioLabel = t.priorities[priority]

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{t.preview(catLabel, municipalityName)}</Preview>

      <Body style={{ backgroundColor: BG, margin: 0, padding: 0, fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Container style={{ maxWidth: 600, margin: '32px auto', padding: '0 16px' }}>

          {/* ── Card ── */}
          <Section style={{ backgroundColor: '#ffffff', borderRadius: 12, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>

            {/* Header */}
            <Section style={{ backgroundColor: PRIMARY, padding: '20px 32px' }}>
              <Text style={{ margin: 0, color: '#ffffff', fontSize: 20, fontWeight: 'bold', letterSpacing: '-0.3px' }}>
                <span>Greece</span><span style={{ color: '#BFE0C6' }}>Clean</span>
              </Text>
              <Text style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                Official Environmental Report
              </Text>
            </Section>

            {/* Body */}
            <Section style={{ padding: '32px' }}>

              {/* Badge + title */}
              <Text style={{ margin: '0 0 6px', color: PRIMARY, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {t.badge}
              </Text>
              <Heading as="h1" style={{ margin: '0 0 6px', fontSize: 24, color: TEXT, lineHeight: '1.3' }}>
                {cat.emoji} {catLabel}
              </Heading>
              <Text style={{ margin: '0 0 24px', fontSize: 14, color: MUTED, lineHeight: '1.5' }}>
                {t.subtitle}
              </Text>

              {/* Priority badge — highlighted red when urgent */}
              <Section style={{
                backgroundColor: prioStyle.bg,
                border: `1px solid ${prioStyle.border}`,
                borderRadius: 8,
                padding: '10px 16px',
                marginBottom: 24,
              }}>
                <Text style={{ margin: 0, fontSize: 14, fontWeight: 'bold', color: prioStyle.text }}>
                  {t.priority}: {prioLabel}
                </Text>
              </Section>

              {/* Details table */}
              <Hr style={{ borderColor: BORDER, margin: '0 0 16px' }} />

              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '6px 0', color: MUTED, fontSize: 13, width: 140, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{t.municipality}</td>
                    <td style={{ padding: '6px 0', color: TEXT, fontSize: 14, verticalAlign: 'top', fontWeight: 'bold' }}>{municipalityName}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: MUTED, fontSize: 13, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{t.category}</td>
                    <td style={{ padding: '6px 0', color: TEXT, fontSize: 14, verticalAlign: 'top' }}>{cat.emoji} {catLabel}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '6px 0', color: MUTED, fontSize: 13, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{t.date}</td>
                    <td style={{ padding: '6px 0', color: TEXT, fontSize: 14, verticalAlign: 'top' }}>{submittedDate}</td>
                  </tr>
                  {description && (
                    <tr>
                      <td style={{ padding: '6px 0', color: MUTED, fontSize: 13, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{t.description}</td>
                      <td style={{ padding: '6px 0', color: TEXT, fontSize: 14, verticalAlign: 'top', fontStyle: 'italic' }}>{description}</td>
                    </tr>
                  )}
                </tbody>
              </table>

              <Hr style={{ borderColor: BORDER, margin: '16px 0 24px' }} />

              {/* Google Maps link */}
              <Link href={mapsUrl} style={{ color: PRIMARY, fontSize: 14, fontWeight: 'bold', textDecoration: 'none' }}>
                📍 {t.mapsLink}
              </Link>

              {/* Photo */}
              {imageUrl && (
                <Section style={{ margin: '24px 0' }}>
                  <Text style={{ margin: '0 0 8px', color: MUTED, fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {t.photo}
                  </Text>
                  <Link href={imageUrl}>
                    <Img
                      src={imageUrl}
                      alt="Report photo"
                      width="536"
                      style={{ maxWidth: '100%', borderRadius: 8, border: `1px solid ${BORDER}`, display: 'block' }}
                    />
                  </Link>
                </Section>
              )}

              {/* CTA button */}
              <Section style={{ margin: '28px 0 16px' }}>
                <Button
                  href={reportUrl}
                  style={{
                    backgroundColor: ACTION,
                    color: '#ffffff',
                    padding: '14px 28px',
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  {t.viewBtn}
                </Button>
              </Section>

              <Text style={{ margin: '8px 0 0', fontSize: 13, color: MUTED }}>
                {t.orOpen}{' '}
                <Link href={reportUrl} style={{ color: PRIMARY, wordBreak: 'break-all' }}>
                  {reportUrl}
                </Link>
              </Text>

            </Section>

            {/* Footer */}
            <Section style={{ backgroundColor: BG, borderTop: `1px solid ${BORDER}`, padding: '20px 32px', textAlign: 'center' as const }}>
              <Text style={{ margin: 0, fontSize: 12, color: MUTED, lineHeight: '1.5' }}>
                {t.footer}
              </Text>
              <Text style={{ margin: '8px 0 0', fontSize: 11, color: BORDER }}>
                GreeceClean.gr · Environmental Reporting Platform · Greece
              </Text>
            </Section>

          </Section>
          {/* /Card */}

        </Container>
      </Body>
    </Html>
  )
}
