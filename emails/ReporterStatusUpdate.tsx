import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

export type ReporterStatus = 'forwarded' | 'resolved'
export type ReporterStatusLang = 'el' | 'en' | 'de'

export type ReporterStatusUpdateProps = {
  lang: ReporterStatusLang
  status: ReporterStatus
  reportUrl: string
  municipalityName: string | null
}

const T = {
  el: {
    forwarded: {
      subject: 'Η αναφορά σου προωθήθηκε στον δήμο',
      title: 'Η αναφορά σου προωθήθηκε',
      body: 'Ειδοποιήσαμε τον αρμόδιο δήμο για την αναφορά σου. Μπορείς να παρακολουθείς την πρόοδο από τον σύνδεσμο.',
    },
    resolved: {
      subject: 'Η αναφορά σου σημειώθηκε ως επιλυμένη',
      title: 'Η αναφορά σου επιλύθηκε',
      body: 'Η αναφορά σου σημειώθηκε ως καθαρισμένη/επιλυμένη. Ευχαριστούμε που βοήθησες να γίνει η Ελλάδα καθαρότερη.',
    },
    municipality: 'Δήμος',
    button: 'Προβολή αναφοράς',
    footer: 'Έλαβες αυτό το email επειδή ζήτησες ενημερώσεις για την αναφορά σου στο GreeceClean.',
  },
  en: {
    forwarded: {
      subject: 'Your report was forwarded to the municipality',
      title: 'Your report was forwarded',
      body: 'We notified the responsible municipality about your report. You can follow progress from the tracking link.',
    },
    resolved: {
      subject: 'Your report was marked as resolved',
      title: 'Your report was resolved',
      body: 'Your report was marked as cleaned up/resolved. Thank you for helping make Greece cleaner.',
    },
    municipality: 'Municipality',
    button: 'View report',
    footer: 'You received this email because you asked for status updates for your GreeceClean report.',
  },
  de: {
    forwarded: {
      subject: 'Deine Meldung wurde an die Gemeinde weitergeleitet',
      title: 'Deine Meldung wurde weitergeleitet',
      body: 'Wir haben die zuständige Gemeinde über deine Meldung informiert. Den Fortschritt kannst du über den Tracking-Link verfolgen.',
    },
    resolved: {
      subject: 'Deine Meldung wurde als erledigt markiert',
      title: 'Deine Meldung wurde erledigt',
      body: 'Deine Meldung wurde als bereinigt/erledigt markiert. Danke, dass du hilfst, Griechenland sauberer zu machen.',
    },
    municipality: 'Gemeinde',
    button: 'Meldung anzeigen',
    footer: 'Du erhältst diese E-Mail, weil du Status-Updates für deine GreeceClean-Meldung angefordert hast.',
  },
} as const

export function reporterStatusSubject(lang: ReporterStatusLang, status: ReporterStatus): string {
  return T[lang][status].subject
}

export default function ReporterStatusUpdate({
  lang,
  status,
  reportUrl,
  municipalityName,
}: ReporterStatusUpdateProps) {
  const t = T[lang]
  const statusCopy = t[status]

  return (
    <Html lang={lang}>
      <Head />
      <Preview>{statusCopy.subject}</Preview>
      <Body style={{ margin: 0, backgroundColor: '#f9fafb', fontFamily: 'Arial, Helvetica, sans-serif' }}>
        <Container style={{ maxWidth: 560, margin: '32px auto', padding: '0 16px' }}>
          <Section style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 28 }}>
            <Text style={{ margin: '0 0 8px', color: '#39B24A', fontSize: 13, fontWeight: 'bold' }}>
              GreeceClean
            </Text>
            <Heading as="h1" style={{ margin: '0 0 12px', color: '#0D6FDB', fontSize: 24, lineHeight: '1.25' }}>
              {statusCopy.title}
            </Heading>
            <Text style={{ margin: '0 0 20px', color: '#374151', fontSize: 15, lineHeight: '1.55' }}>
              {statusCopy.body}
            </Text>
            {municipalityName && (
              <Text style={{ margin: '0 0 20px', color: '#4b5563', fontSize: 14 }}>
                <strong>{t.municipality}:</strong> {municipalityName}
              </Text>
            )}
            <Button
              href={reportUrl}
              style={{
                backgroundColor: '#39B24A',
                color: '#ffffff',
                padding: '12px 22px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              {t.button}
            </Button>
            <Text style={{ margin: '22px 0 0', color: '#6b7280', fontSize: 12, lineHeight: '1.5' }}>
              {t.footer}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
