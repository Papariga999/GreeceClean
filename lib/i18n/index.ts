import { cookies } from 'next/headers'
import type { Locale, Dictionary } from './types'
import { LOCALES, DEFAULT_LOCALE } from './types'
import el from './el.json'
import en from './en.json'
import de from './de.json'

export type { Locale, Dictionary }
export { LOCALES, DEFAULT_LOCALE }

const dicts = { el, en, de } as Record<string, Dictionary>

export function getDictionary(locale: Locale): Dictionary {
  return dicts[locale] ?? dicts[DEFAULT_LOCALE]
}

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get('locale')?.value
  return (LOCALES.includes(value as Locale) ? value : DEFAULT_LOCALE) as Locale
}
