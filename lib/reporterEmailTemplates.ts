import { render } from '@react-email/render'
import * as React from 'react'
import ReporterStatusUpdate, {
  reporterStatusSubject,
  type ReporterStatus,
  type ReporterStatusLang,
} from '@/emails/ReporterStatusUpdate'

export type ReporterStatusEmailInput = {
  status: ReporterStatus
  lang: ReporterStatusLang
  reportUrl: string
  municipalityName: string | null
}

export async function buildReporterStatusEmail(input: ReporterStatusEmailInput): Promise<{ subject: string; html: string }> {
  const html = await render(
    React.createElement(ReporterStatusUpdate, input),
    { pretty: false },
  )

  return {
    subject: reporterStatusSubject(input.lang, input.status),
    html,
  }
}
