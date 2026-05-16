import { render } from '@react-email/render'
import * as React from 'react'
import MunicipalityReport, { type Lang, type Priority } from '@/emails/MunicipalityReport'
import { calculateReportPriority } from '@/lib/priority'

export type ReportForEmail = {
  id: string
  public_token: string
  category: string
  description: string | null
  lat: number
  lng: number
  image_url: string | null
  created_at: string
  status: string
}

export type MunicipalityForEmail = {
  id: string
  name_el: string
  email_official: string
  lang?: Lang
}

export async function buildMunicipalityReportEmail(
  report: ReportForEmail,
  municipality: MunicipalityForEmail,
): Promise<{ subject: string; html: string }> {
  const appUrl   = process.env.NEXT_PUBLIC_APP_URL ?? 'https://greececlean.gr'
  const lang     = municipality.lang ?? 'el'
  const priority = calculateReportPriority(report.category, new Date(report.created_at)) as Priority

  const SUBJECTS: Record<Lang, string> = {
    el: `[ΠΡΟΣΟΧΗ] Νέα αναφορά περιβάλλοντος — ${municipality.name_el}`,
    en: `[ATTENTION] New environmental report — ${municipality.name_el}`,
    de: `[ACHTUNG] Neue Umweltmeldung — ${municipality.name_el}`,
  }

  const html = await render(
    React.createElement(MunicipalityReport, {
      reportUrl:        `${appUrl}/r/${report.public_token}`,
      mapsUrl:          `https://www.google.com/maps?q=${report.lat},${report.lng}`,
      imageUrl:         report.image_url,
      categoryId:       report.category,
      municipalityName: municipality.name_el,
      submittedDate:    new Date(report.created_at).toLocaleDateString(
        lang === 'el' ? 'el-GR' : lang === 'de' ? 'de-DE' : 'en-GB',
        { day: '2-digit', month: 'long', year: 'numeric' },
      ),
      description: report.description,
      priority,
      lang,
    }),
    { pretty: false },
  )

  return { subject: SUBJECTS[lang] ?? SUBJECTS.el, html }
}

/** @deprecated Use buildMunicipalityReportEmail (now async + React Email) */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
