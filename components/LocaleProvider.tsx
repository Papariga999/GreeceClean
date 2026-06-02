'use client'

import { createContext, useContext } from 'react'
import type { Locale, Dictionary } from '@/lib/i18n/types'
import el from '@/lib/i18n/el.json'
import en from '@/lib/i18n/en.json'
import de from '@/lib/i18n/de.json'

const dicts = { el, en, de } as Record<Locale, Dictionary>

type LocaleCtx = { locale: Locale; t: Dictionary }
const Ctx = createContext<LocaleCtx | null>(null)

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <Ctx.Provider value={{ locale, t: dicts[locale] }}>
      {children}
    </Ctx.Provider>
  )
}

export function useLocale(): LocaleCtx {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}
