import type { ReporterStatus } from '@/emails/ReporterStatusUpdate'

export type ReporterNotificationResult =
  | { attempted: false; sent: false; reason: string }
  | { attempted: true; sent: true }
  | { attempted: true; sent: false; reason: string }

export async function notifyReporterStatus(
  reportId: string,
  status: ReporterStatus,
): Promise<ReporterNotificationResult> {
  void reportId
  void status

  return { attempted: false, sent: false, reason: 'reporter notifications disabled for initial phase' }
}
