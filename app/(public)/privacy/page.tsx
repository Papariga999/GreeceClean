import type { Metadata } from 'next'
import { getLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Privacy Policy / Datenschutz / Απόρρητο – GreeceClean',
  robots: { index: false },
}

const CONTENT = {
  el: {
    title: 'Πολιτική Απορρήτου',
    updated: 'Τελευταία ενημέρωση: Μάιος 2026',
    sections: [
      {
        h: 'Ποιοι είμαστε',
        p: 'Το GreeceClean είναι μια πλατφόρμα αναφοράς περιβαλλοντικών παραβάσεων στην Ελλάδα. Επιτρέπει στους πολίτες να αναφέρουν παράνομες χωματερές, σκουπίδια και μόλυνση στον αρμόδιο δήμο τους.',
      },
      {
        h: 'Ποια δεδομένα συλλέγουμε',
        p: 'Κατά την υποβολή αναφοράς συλλέγουμε: φωτογραφίες της παράνομης απόρριψης, γεωγραφικές συντεταγμένες (GPS) της τοποθεσίας, την κατηγορία της παράβασης και, προαιρετικά, μια σύντομη περιγραφή. Δεν απαιτείται εγγραφή χρήστη. Δεν συλλέγουμε ονόματα, email ή τηλέφωνα από τους αναφέροντες.',
      },
      {
        h: 'Πώς χρησιμοποιούμε τα δεδομένα',
        p: 'Τα δεδομένα χρησιμοποιούνται αποκλειστικά για: (α) την εμφάνιση των αναφορών στον δημόσιο χάρτη μετά από έλεγχο, (β) την αποστολή ειδοποίησης στον αρμόδιο δήμο, (γ) τη στατιστική ανάλυση για την παρακολούθηση της κατάστασης των δήμων.',
      },
      {
        h: 'Αποθήκευση δεδομένων',
        p: 'Τα δεδομένα αποθηκεύονται στην υποδομή Supabase (PostgreSQL) με διακομιστές εντός της Ευρωπαϊκής Ένωσης. Οι φωτογραφίες αποθηκεύονται στο Supabase Storage. Τα δεδομένα διατηρούνται έως ότου η αναφορά επιλυθεί ή ζητηθεί διαγραφή.',
      },
      {
        h: 'Cookies',
        p: 'Χρησιμοποιούμε ένα μόνο cookie (locale) για να αποθηκεύουμε τη γλωσσική σας προτίμηση. Δεν χρησιμοποιούμε cookies παρακολούθησης ή διαφήμισης.',
      },
      {
        h: 'Δικαιώματά σας (GDPR)',
        p: 'Έχετε δικαίωμα πρόσβασης, διόρθωσης και διαγραφής των δεδομένων σας. Επικοινωνήστε μαζί μας στο info@greececlean.gr για οποιοδήποτε αίτημα.',
      },
      {
        h: 'Επικοινωνία',
        p: 'info@greececlean.gr',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        h: 'Who we are',
        p: 'GreeceClean is an environmental reporting platform for Greece. It allows citizens to report illegal dumps, roadside litter, and pollution to their responsible municipality.',
      },
      {
        h: 'What data we collect',
        p: 'When submitting a report we collect: photos of the illegal dump, GPS coordinates of the location, the category of the violation, and optionally a short description. No user registration is required. We do not collect names, email addresses, or phone numbers from reporters.',
      },
      {
        h: 'How we use the data',
        p: 'Data is used solely to: (a) display verified reports on the public map, (b) notify the responsible municipality, (c) generate statistics for tracking municipal cleanup performance.',
      },
      {
        h: 'Data storage',
        p: 'Data is stored in Supabase infrastructure (PostgreSQL) with servers located within the European Union. Photos are stored in Supabase Storage. Data is retained until the report is resolved or a deletion request is made.',
      },
      {
        h: 'Cookies',
        p: 'We use a single cookie (locale) to store your language preference. We do not use tracking or advertising cookies.',
      },
      {
        h: 'Your rights (GDPR)',
        p: 'You have the right to access, correct, and delete your data. Contact us at info@greececlean.gr for any request.',
      },
      {
        h: 'Contact',
        p: 'info@greececlean.gr',
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    updated: 'Zuletzt aktualisiert: Mai 2026',
    sections: [
      {
        h: 'Wer wir sind',
        p: 'GreeceClean ist eine Plattform zur Meldung von Umweltverstößen in Griechenland. Sie ermöglicht Bürgern, illegale Mülldeponien, Straßenmüll und Umweltverschmutzung ihrer zuständigen Gemeinde zu melden.',
      },
      {
        h: 'Welche Daten wir erheben',
        p: 'Bei der Einreichung einer Meldung erheben wir: Fotos der illegalen Deponie, GPS-Koordinaten des Standorts, die Kategorie des Verstoßes und optional eine kurze Beschreibung. Eine Benutzerregistrierung ist nicht erforderlich. Wir erheben keine Namen, E-Mail-Adressen oder Telefonnummern von Meldern.',
      },
      {
        h: 'Wie wir die Daten verwenden',
        p: 'Daten werden ausschließlich verwendet für: (a) die Anzeige geprüfter Meldungen auf der öffentlichen Karte, (b) die Benachrichtigung der zuständigen Gemeinde, (c) statistische Auswertungen zur Verfolgung der kommunalen Reinigungsleistung.',
      },
      {
        h: 'Datenspeicherung',
        p: 'Daten werden in der Supabase-Infrastruktur (PostgreSQL) mit Servern innerhalb der Europäischen Union gespeichert. Fotos werden in Supabase Storage gespeichert. Daten werden aufbewahrt, bis die Meldung gelöst wurde oder eine Löschanfrage gestellt wird.',
      },
      {
        h: 'Cookies',
        p: 'Wir verwenden ein einziges Cookie (locale) zur Speicherung Ihrer Sprachpräferenz. Wir verwenden keine Tracking- oder Werbe-Cookies.',
      },
      {
        h: 'Ihre Rechte (DSGVO)',
        p: 'Sie haben das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Kontaktieren Sie uns unter info@greececlean.gr für jegliche Anfragen.',
      },
      {
        h: 'Kontakt',
        p: 'info@greececlean.gr',
      },
    ],
  },
}

export default async function PrivacyPage() {
  const locale = await getLocale()
  const c = CONTENT[locale] ?? CONTENT.el

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2">{c.title}</h1>
      <p className="text-sm text-gray-400 mb-10">{c.updated}</p>
      <div className="space-y-8">
        {c.sections.map((s) => (
          <section key={s.h}>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">{s.h}</h2>
            <p className="text-gray-600 leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
