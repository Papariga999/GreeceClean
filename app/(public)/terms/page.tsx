import type { Metadata } from 'next'
import { getLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Terms of Service / Nutzungsbedingungen / Όροι Χρήσης – GreeceClean',
  robots: { index: false },
}

const CONTENT = {
  el: {
    title: 'Όροι Χρήσης',
    updated: 'Τελευταία ενημέρωση: Μάιος 2026',
    sections: [
      { h: 'Αποδοχή όρων', p: 'Χρησιμοποιώντας το GreeceClean αποδέχεστε τους παρόντες όρους χρήσης. Αν διαφωνείτε, παρακαλούμε μην χρησιμοποιήσετε την πλατφόρμα.' },
      { h: 'Αποδεκτή χρήση', p: 'Η πλατφόρμα προορίζεται αποκλειστικά για την αναφορά πραγματικών περιβαλλοντικών παραβάσεων στην Ελλάδα. Απαγορεύεται αυστηρά η υποβολή ψευδών αναφορών, spam ή περιεχομένου που προσβάλλει τρίτους.' },
      { h: 'Περιεχόμενο αναφορών', p: 'Με την υποβολή αναφοράς δηλώνετε ότι οι πληροφορίες είναι αληθείς εξ όσων γνωρίζετε. Δεν επιτρέπεται η ανάρτωση φωτογραφιών που απεικονίζουν πρόσωπα χωρίς συναίνεση ή που παραβιάζουν πνευματικά δικαιώματα.' },
      { h: 'Μέτρια ευθύνη', p: 'Το GreeceClean δεν εγγυάται τη λήψη μέτρων από τους δήμους. Η πλατφόρμα λειτουργεί ως μεσολαβητής μεταξύ πολιτών και δημοτικών αρχών, χωρίς να φέρει νομική ευθύνη για την έκβαση των αναφορών.' },
      { h: 'Τερματισμός πρόσβασης', p: 'Διατηρούμε το δικαίωμα να διαγράφουμε αναφορές και να μπλοκάρουμε χρήστες που κάνουν κατάχρηση της πλατφόρμας, χωρίς προηγούμενη ειδοποίηση.' },
      { h: 'Εφαρμοστέο δίκαιο', p: 'Οι παρόντες όροι διέπονται από το ελληνικό και ευρωπαϊκό δίκαιο.' },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    sections: [
      { h: 'Acceptance of terms', p: 'By using GreeceClean you agree to these terms of service. If you disagree, please do not use the platform.' },
      { h: 'Acceptable use', p: 'The platform is intended exclusively for reporting real environmental violations in Greece. Submitting false reports, spam, or content that offends third parties is strictly prohibited.' },
      { h: 'Report content', p: 'By submitting a report you declare that the information is true to the best of your knowledge. You may not upload photos depicting people without consent or that infringe copyright.' },
      { h: 'Limitation of liability', p: 'GreeceClean does not guarantee that municipalities will take action. The platform acts as an intermediary between citizens and municipal authorities without bearing legal responsibility for the outcome of reports.' },
      { h: 'Termination of access', p: 'We reserve the right to delete reports and block users who abuse the platform without prior notice.' },
      { h: 'Applicable law', p: 'These terms are governed by Greek and European law.' },
    ],
  },
  de: {
    title: 'Nutzungsbedingungen',
    updated: 'Zuletzt aktualisiert: Mai 2026',
    sections: [
      { h: 'Annahme der Bedingungen', p: 'Durch die Nutzung von GreeceClean stimmen Sie diesen Nutzungsbedingungen zu. Falls Sie nicht einverstanden sind, nutzen Sie die Plattform bitte nicht.' },
      { h: 'Zulässige Nutzung', p: 'Die Plattform dient ausschließlich der Meldung echter Umweltverstöße in Griechenland. Das Einreichen falscher Meldungen, Spam oder Inhalte, die Dritte verletzen, ist strengstens untersagt.' },
      { h: 'Inhalt der Meldungen', p: 'Durch das Einreichen einer Meldung erklären Sie, dass die Informationen nach bestem Wissen wahr sind. Sie dürfen keine Fotos hochladen, die Personen ohne deren Zustimmung zeigen oder Urheberrechte verletzen.' },
      { h: 'Haftungsbeschränkung', p: 'GreeceClean garantiert nicht, dass Gemeinden Maßnahmen ergreifen werden. Die Plattform fungiert als Vermittler zwischen Bürgern und Gemeindeverwaltungen, ohne rechtliche Verantwortung für den Ausgang der Meldungen zu tragen.' },
      { h: 'Beendigung des Zugangs', p: 'Wir behalten uns das Recht vor, Meldungen zu löschen und Nutzer, die die Plattform missbrauchen, ohne vorherige Ankündigung zu sperren.' },
      { h: 'Anwendbares Recht', p: 'Diese Bedingungen unterliegen griechischem und europäischem Recht.' },
    ],
  },
}

export default async function TermsPage() {
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
