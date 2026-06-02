'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'

export type MunicipalityRow = {
  id: string
  name_el: string
  name_en: string
  name_de: string | null
  email_official: string | null
  region: string | null
  is_auto_created?: boolean | null
  pending_report_count: number
}

type EditDraft = {
  name_el: string
  name_de: string
  email_official: string
  region: string
}

const INPUT_CLS =
  'border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white'

function StatusDot({ email }: { email: string | null }) {
  if (!email) {
    return <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-300" title="Χωρίς email" />
  }
  return <span className="inline-block w-2.5 h-2.5 rounded-full bg-action" title="Έχει email" />
}

export default function MunicipalityEmailList({
  municipalities,
}: {
  municipalities: MunicipalityRow[]
}) {
  const router = useRouter()
  const [editId, setEditId] = useState<string | null>(null)
  const [draft,  setDraft]  = useState<EditDraft>({ name_el: '', name_de: '', email_official: '', region: '' })
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  function startEdit(m: MunicipalityRow) {
    setEditId(m.id)
    setDraft({ name_el: m.name_el, name_de: m.name_de ?? '', email_official: m.email_official ?? '', region: m.region ?? '' })
    setError(null)
  }

  function cancelEdit() {
    setEditId(null)
    setError(null)
  }

  async function save(id: string) {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/municipalities/${id}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name_el:        draft.name_el.trim(),
          name_de:        draft.name_de.trim(),
          email_official: draft.email_official.trim(),
          region:         draft.region.trim(),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string }
        throw new Error(body.error ?? `HTTP ${res.status}`)
      }
      setEditId(null)
      router.refresh()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Σφάλμα αποθήκευσης')
    } finally {
      setSaving(false)
    }
  }

  const withEmail    = municipalities.filter((m) => m.email_official).length
  const withoutEmail = municipalities.length - withEmail
  const openReports = municipalities.reduce((sum, m) => sum + m.pending_report_count, 0)
  const sortedMunicipalities = municipalities.slice().sort((a, b) => {
    const aMissingEmail = a.email_official ? 0 : 1
    const bMissingEmail = b.email_official ? 0 : 1
    if (aMissingEmail !== bMissingEmail) return bMissingEmail - aMissingEmail
    if (a.pending_report_count !== b.pending_report_count) {
      return b.pending_report_count - a.pending_report_count
    }
    return a.name_el.localeCompare(b.name_el, 'el')
  })

  return (
    <div>
      <div className="flex gap-4 text-sm mb-5">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-action" />
          <strong>{withEmail}</strong> με email
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gray-300" />
          <strong>{withoutEmail}</strong> χωρίς email
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" />
          <strong>{openReports}</strong> open reports
        </span>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-6" />
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Δήμος (GR)</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Γερμανικό όνομα</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Περιφέρεια</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Email επικοινωνίας</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Open reports</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 w-28" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {municipalities.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm italic">
                    Δεν βρέθηκαν αποτελέσματα
                  </td>
                </tr>
              )}
              {sortedMunicipalities.map((m) => (
                <Fragment key={m.id}>
                  {/* Main row */}
                  <tr className={`transition-colors ${editId === m.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <td className="px-4 py-3">
                      <StatusDot email={m.email_official} />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      <div className="flex flex-col gap-1">
                        <span>{m.name_el}</span>
                        {m.is_auto_created && (
                          <span className="text-[11px] text-orange-600 font-semibold">Auto-created</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {m.name_de
                        ? <span className="text-xs font-mono">{m.name_de}</span>
                        : <span className="text-gray-300 italic text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{m.region ?? '—'}</td>
                    <td className="px-4 py-3">
                      {m.email_official
                        ? <a
                            href={`mailto:${m.email_official}`}
                            className="text-primary hover:underline font-mono text-xs"
                          >
                            {m.email_official}
                          </a>
                        : <span className="text-gray-300 italic text-xs">Δεν έχει οριστεί</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex min-w-8 justify-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        m.pending_report_count > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {m.pending_report_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => editId === m.id ? cancelEdit() : startEdit(m)}
                        className="text-xs text-blue-600 font-semibold hover:underline"
                      >
                        {editId === m.id ? 'Ακύρωση' : 'Επεξεργασία'}
                      </button>
                    </td>
                  </tr>

                  {/* Inline edit row */}
                  {editId === m.id && (
                    <tr className="bg-blue-50 border-t border-blue-100">
                      <td colSpan={7} className="px-4 py-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 max-w-3xl">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Ελληνικό όνομα <span className="text-red-400">*</span>
                            </label>
                            <input
                              type="text"
                              value={draft.name_el}
                              onChange={(e) => setDraft((d) => ({ ...d, name_el: e.target.value }))}
                              className={INPUT_CLS}
                              placeholder="π.χ. Δήμος Αθηναίων"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Γερμανικό όνομα
                              <span className="ml-1 text-gray-400 font-normal">(→ αποστολή email στα Γερμανικά)</span>
                            </label>
                            <input
                              type="text"
                              value={draft.name_de}
                              onChange={(e) => setDraft((d) => ({ ...d, name_de: e.target.value }))}
                              className={INPUT_CLS}
                              placeholder="π.χ. Gemeinde Rhodos"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Email επικοινωνίας
                            </label>
                            <input
                              type="email"
                              value={draft.email_official}
                              onChange={(e) => setDraft((d) => ({ ...d, email_official: e.target.value }))}
                              className={INPUT_CLS}
                              placeholder="info@municipality.gr"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Περιφέρεια
                            </label>
                            <input
                              type="text"
                              value={draft.region}
                              onChange={(e) => setDraft((d) => ({ ...d, region: e.target.value }))}
                              className={INPUT_CLS}
                              placeholder="π.χ. Νότιο Αιγαίο"
                            />
                          </div>
                        </div>
                        {error && <p className="text-red-500 text-xs mb-2">⚠ {error}</p>}
                        <div className="flex gap-2">
                          <button
                            onClick={() => save(m.id)}
                            disabled={saving || !draft.name_el.trim()}
                            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
                          >
                            {saving ? 'Αποθήκευση…' : 'Αποθήκευση'}
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-xs font-semibold hover:bg-gray-50"
                          >
                            Ακύρωση
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
