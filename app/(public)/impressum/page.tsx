import type { Metadata } from 'next'
import { getLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Impressum – GreeceClean',
  robots: { index: false },
}

const LABELS = {
  el: { title: 'Impressum', provider: 'Πάροχος υπηρεσίας', address: 'Διεύθυνση', contact: 'Επικοινωνία', responsible: 'Υπεύθυνος περιεχομένου', note: 'Σημείωση', noteText: 'Αυτή η πλατφόρμα δεν φέρει καμία ευθύνη για την ακρίβεια των αναφορών που υποβάλλουν οι χρήστες. Κάθε αναφορά ελέγχεται πριν δημοσιευτεί στον χάρτη.' },
  en: { title: 'Impressum', provider: 'Service provider', address: 'Address', contact: 'Contact', responsible: 'Responsible for content', note: 'Note', noteText: 'This platform bears no responsibility for the accuracy of user-submitted reports. Each report is reviewed before appearing on the public map.' },
  de: { title: 'Impressum', provider: 'Dienstanbieter', address: 'Adresse', contact: 'Kontakt', responsible: 'Verantwortlich für den Inhalt', note: 'Hinweis', noteText: 'Diese Plattform übernimmt keine Verantwortung für die Richtigkeit der von Nutzern eingereichten Meldungen. Jede Meldung wird vor der Veröffentlichung auf der Karte geprüft.' },
}

export default async function ImpressumPage() {
  const locale = await getLocale()
  const l = LABELS[locale] ?? LABELS.el

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-10">{l.title}</h1>

      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{l.provider}</h2>
          <p className="font-medium text-gray-800">GreeceClean</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{l.address}</h2>
          <p>
            GreeceClean<br />
            Athen, Griechenland<br />
            {/* Replace with your actual legal address before going live */}
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{l.contact}</h2>
          <p>
            E-Mail: <a href="mailto:info@greececlean.gr" className="text-primary hover:underline">info@greececlean.gr</a>
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">{l.responsible}</h2>
          <p>GreeceClean Team</p>
        </section>

        <section className="bg-gray-50 rounded-2xl p-4 text-sm">
          <p className="font-semibold text-gray-700 mb-1">{l.note}</p>
          <p>{l.noteText}</p>
        </section>
      </div>
    </div>
  )
}
