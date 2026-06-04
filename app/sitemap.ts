import type { MetadataRoute } from 'next'
import { isSupabaseConfigured, supabaseAdmin } from '@/lib/supabase'
import { SEED_REPORTS } from '@/lib/seed-data'
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/types'
import { absoluteUrl } from '@/lib/seo'
import { localizedHref } from '@/lib/i18n/routing'

const STATIC_PATHS = ['/', '/map', '/report', '/partners', '/region', '/top']

type SitemapRow = {
  path: string
  lastModified?: string | Date | null
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']
  priority?: number
}

function localizedEntries(row: SitemapRow): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: absoluteUrl(localizedHref(locale, row.path)),
    lastModified: row.lastModified ? new Date(row.lastModified) : new Date(),
    changeFrequency: row.changeFrequency,
    priority: row.priority,
    alternates: {
      languages: {
        el: absoluteUrl(localizedHref('el', row.path)),
        en: absoluteUrl(localizedHref('en', row.path)),
        de: absoluteUrl(localizedHref('de', row.path)),
        'x-default': absoluteUrl(localizedHref(DEFAULT_LOCALE, row.path)),
      },
    },
  }))
}

async function getReportRows(): Promise<SitemapRow[]> {
  if (!isSupabaseConfigured) {
    return SEED_REPORTS.map((report) => ({
      path: `/r/${report.public_token}`,
      lastModified: report.resolved_at ?? report.notified_at ?? report.created_at,
      changeFrequency: 'weekly',
      priority: 0.55,
    }))
  }

  try {
    const { data } = await supabaseAdmin
      .from('reports')
      .select('public_token, updated_at, created_at')
      .eq('is_approved', true)
      .order('updated_at', { ascending: false })
      .limit(5000)

    return (data ?? [])
      .filter((row): row is { public_token: string; updated_at: string | null; created_at: string | null } =>
        typeof row.public_token === 'string',
      )
      .map((row) => ({
        path: `/r/${row.public_token}`,
        lastModified: row.updated_at ?? row.created_at,
        changeFrequency: 'weekly',
        priority: 0.55,
      }))
  } catch {
    return []
  }
}

async function getScorecardRows(): Promise<SitemapRow[]> {
  if (!isSupabaseConfigured) return []

  try {
    const { data } = await supabaseAdmin
      .from('municipalities')
      .select('id, created_at')
      .eq('is_auto_created', false)
      .limit(5000)

    return (data ?? [])
      .filter((row): row is { id: string; created_at: string | null } => typeof row.id === 'string')
      .map((row) => ({
        path: `/scorecard/${row.id}`,
        lastModified: row.created_at,
        changeFrequency: 'weekly',
        priority: 0.45,
      }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRows = STATIC_PATHS.map((path): SitemapRow => ({
    path,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }))

  const [reports, scorecards] = await Promise.all([getReportRows(), getScorecardRows()])

  return [...staticRows, ...reports, ...scorecards].flatMap(localizedEntries)
}
