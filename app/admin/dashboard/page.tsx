import type { Metadata } from 'next'
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase'
import AdminReportList, { type AdminReport, type Municipality } from '@/components/AdminReportList'
import MunicipalityEmailList, { type MunicipalityRow } from '@/components/MunicipalityEmailList'

export const metadata: Metadata = {
  title: 'Admin Dashboard – GreeceClean',
}

export const dynamic = 'force-dynamic'

const REPORT_SELECT = 'id, public_token, image_url, lat, lng, category, status, is_approved, created_at, description, municipality_id, municipality:municipality_id(name_el, email_official)'

type EmailLogRow = NonNullable<AdminReport['email_log']> & {
  report_id: string
}

async function attachLatestEmailLogs(reports: AdminReport[]): Promise<AdminReport[]> {
  if (reports.length === 0) return reports

  const ids = reports.map((r) => r.id)
  const { data, error } = await supabaseAdmin
    .from('email_logs')
    .select('report_id, status, recipient_email, sent_at, error_message')
    .in('report_id', ids)
    .order('sent_at', { ascending: false })

  if (error) {
    console.warn('email_logs lookup failed:', error)
    return reports.map((r) => ({ ...r, email_log: null }))
  }

  const latestByReport = new Map<string, EmailLogRow>()
  for (const log of (data ?? []) as EmailLogRow[]) {
    if (!latestByReport.has(log.report_id)) latestByReport.set(log.report_id, log)
  }

  return reports.map((r) => ({ ...r, email_log: latestByReport.get(r.id) ?? null }))
}

async function attachMunicipalityOpenCounts(rows: MunicipalityRow[]): Promise<MunicipalityRow[]> {
  if (rows.length === 0) return rows

  const { data, error } = await supabaseAdmin
    .from('reports')
    .select('municipality_id, status')
    .in('status', ['pending', 'in_review', 'forwarded'])

  if (error) {
    console.warn('municipality report count lookup failed:', error)
    return rows.map((m) => ({ ...m, pending_report_count: 0 }))
  }

  const counts = new Map<string, number>()
  for (const report of (data ?? []) as { municipality_id: string | null }[]) {
    if (!report.municipality_id) continue
    counts.set(report.municipality_id, (counts.get(report.municipality_id) ?? 0) + 1)
  }

  return rows.map((m) => ({ ...m, pending_report_count: counts.get(m.id) ?? 0 }))
}

async function getPendingReports(): Promise<AdminReport[]> {
  if (!isSupabaseConfigured) return []
  const { data } = await supabaseAdmin
    .from('reports')
    .select(REPORT_SELECT)
    .eq('is_approved', false)
    .neq('status', 'rejected')
    .order('created_at', { ascending: false })
  return attachLatestEmailLogs((data ?? []) as unknown as AdminReport[])
}

async function getApprovedReports(): Promise<AdminReport[]> {
  if (!isSupabaseConfigured) return []
  const { data } = await supabaseAdmin
    .from('reports')
    .select(REPORT_SELECT)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })
    .limit(100)
  return attachLatestEmailLogs((data ?? []) as unknown as AdminReport[])
}

async function getRejectedReports(): Promise<AdminReport[]> {
  if (!isSupabaseConfigured) return []
  const { data } = await supabaseAdmin
    .from('reports')
    .select(REPORT_SELECT)
    .eq('status', 'rejected')
    .order('created_at', { ascending: false })
    .limit(50)
  return attachLatestEmailLogs((data ?? []) as unknown as AdminReport[])
}

async function getMunicipalities(): Promise<MunicipalityRow[]> {
  if (!isSupabaseConfigured) return []
  const { data } = await supabaseAdmin
    .from('municipalities')
    .select('id, name_el, name_en, name_de, email_official, region, is_auto_created')
    .order('name_el')
  return attachMunicipalityOpenCounts((data ?? []) as MunicipalityRow[])
}

export default async function AdminDashboard() {
  const [pending, approved, rejected, municipalityRows] = await Promise.all([
    getPendingReports(),
    getApprovedReports(),
    getRejectedReports(),
    getMunicipalities(),
  ])

  const municipalities: Municipality[] = municipalityRows.map((m) => ({ id: m.id, name_el: m.name_el }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Πίνακας Διαχείρισης</h1>
            <p className="text-sm text-gray-500 mt-1">Διαχείριση αναφορών χρηστών</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#municipalities"
              className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border hover:bg-gray-50"
            >
              ↓ Δήμοι & Email
            </a>
            <form action="/api/admin/logout" method="POST">
              <button
                type="submit"
                className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border hover:bg-gray-50"
              >
                Αποσύνδεση
              </button>
            </form>
          </div>
        </div>

        {/* Reports */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Αναμένουν έγκριση</h2>
            <span className="text-xs text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full font-medium">
              {pending.length}
            </span>
          </div>
          <AdminReportList reports={pending} municipalities={municipalities} mode="pending" />
        </section>

        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Εγκεκριμένες</h2>
            <span className="text-xs text-green-800 bg-green-100 px-2 py-0.5 rounded-full font-medium">
              {approved.length}
            </span>
          </div>
          <AdminReportList reports={approved} municipalities={municipalities} mode="approved" />
        </section>

        {rejected.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Απορριφθείσες</h2>
              <span className="text-xs text-red-800 bg-red-100 px-2 py-0.5 rounded-full font-medium">
                {rejected.length}
              </span>
            </div>
            <AdminReportList reports={rejected} municipalities={municipalities} mode="rejected" />
          </section>
        )}

        {/* Municipalities */}
        <section id="municipalities" className="mb-10 scroll-mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Δήμοι & Email</h2>
            <span className="text-xs text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full font-medium">
              {municipalityRows.length}
            </span>
          </div>
          <MunicipalityEmailList municipalities={municipalityRows} />
        </section>

      </div>
    </div>
  )
}
