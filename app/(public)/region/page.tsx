import type { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary, getLocale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Regional Layer - GreeceClean',
  description: 'A regional GreeceClean landing point for tourism partners and destinations.',
}

function PlaceholderPanel({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden border border-primary-100 ${className}`}
      style={{
        background: 'repeating-linear-gradient(135deg, #E7F0F9 0 13px, #F2F7FB 13px 26px)',
      }}
    >
      <div className="absolute inset-0 bg-white/10" />
      <span className="relative font-mono text-[11px] text-gray-400 tracking-wide">{label}</span>
    </div>
  )
}

function QrPlaceholder() {
  return (
    <div className="grid grid-cols-5 gap-1 rounded-2xl bg-white p-3 shadow-sm border border-gray-100" aria-hidden="true">
      {Array.from({ length: 25 }).map((_, i) => {
        const dark = [0, 1, 2, 5, 10, 12, 14, 16, 18, 20, 21, 24].includes(i)
        return <span key={i} className={`aspect-square rounded-sm ${dark ? 'bg-primary' : 'bg-sea-mist'}`} />
      })}
    </div>
  )
}

export default async function RegionPage() {
  const locale = await getLocale()
  const t = getDictionary(locale).partners.regionLayer

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden text-white min-h-[520px] flex items-end">
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(135deg, #0B5BB3 0 18px, #0D6FDB 18px 36px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-700/80 to-primary/70" />
        <div className="relative w-full max-w-5xl mx-auto px-5 pt-24 pb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-action-300 mb-5">{t.heroEyebrow}</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5">{t.heroTitle}</h1>
            <p className="text-lg text-primary-100 leading-relaxed max-w-xl mb-8">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/report" className="btn-action text-base px-7 py-3.5 shadow-lg">
                {t.reportCta}
              </Link>
              <Link href="/partners#contact" className="bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold px-7 py-3.5 rounded-2xl transition-colors text-base">
                {t.partnerCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-5 bg-sea-mist">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
          <PlaceholderPanel label="destination image placeholder" className="rounded-2xl min-h-[320px] flex items-center justify-center" />

          <div className="card p-7 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{t.qrLabel}</p>
              <div className="flex items-start gap-5">
                <div className="w-32 shrink-0">
                  <QrPlaceholder />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-primary leading-tight">{t.qrTitle}</h2>
                  <p className="text-sm text-gray-600 leading-relaxed mt-3">{t.qrSub}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-primary-200 bg-primary-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-2">{t.sponsorLabel}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{t.sponsorNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-primary text-center mb-10">{t.stepsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {t.steps.map((step, i) => (
              <div key={step.title} className="card p-7">
                <p className="font-mono text-xs font-extrabold text-action mb-3">0{i + 1}</p>
                <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-5 bg-primary-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-extrabold leading-tight">{t.partnerNudgeTitle}</p>
          <p className="text-primary-200 mt-4 leading-relaxed">{t.partnerNudgeSub}</p>
          <Link href="/partners#contact" className="btn-action inline-flex mt-7">
            {t.partnerNudgeCta}
          </Link>
        </div>
      </section>
    </div>
  )
}
