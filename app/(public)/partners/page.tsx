import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale, getDictionary } from '@/lib/i18n'
import PartnerForm from '@/components/PartnerForm'


export const metadata: Metadata = {
  title: 'Partners & Sponsors – GreeceClean',
  description: 'Partner with GreeceClean to support environmental accountability in Greece.',
}

function SectionHead({
  eyebrow, heading, sub, light = false,
}: { eyebrow: string; heading: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${light ? 'text-action-300' : 'text-gray-500'}`}>
        {eyebrow}
      </p>
      <h2 className={`text-3xl md:text-4xl font-extrabold leading-tight tracking-tight ${light ? 'text-white' : 'text-primary'}`}>
        {heading}
      </h2>
      {sub && (
        <p className={`mt-4 text-base leading-relaxed max-w-xl mx-auto ${light ? 'text-primary-200' : 'text-gray-600'}`}>
          {sub}
        </p>
      )}
    </div>
  )
}

function StatCard({ value, sub, desc }: { value: string; sub: string; desc: string }) {
  return (
    <div className="card p-7">
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="text-4xl font-extrabold text-primary leading-none tracking-tight">{value}</span>
        {sub && <span className="text-sm font-bold text-primary-600">{sub}</span>}
      </div>
      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{desc}</p>
    </div>
  )
}

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-sea-mist text-primary-600 rounded-full px-4 py-2 text-sm font-semibold">
      <span className="text-action font-bold">✓</span>
      {label}
    </span>
  )
}

function ClaimCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="card p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <span className="w-[46px] h-[46px] rounded-[14px] bg-primary-50 text-primary font-mono font-extrabold text-sm flex items-center justify-center shrink-0">
          {number}
        </span>
        <div>
          <h3 className="text-lg font-bold text-primary leading-snug">{title}</h3>
          <p className="mt-2 text-[14.5px] text-gray-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default async function PartnersPage() {
  const locale = await getLocale()
  const t = getDictionary(locale).partners

  return (
    <div className="bg-white">

      {/* ── 1 · HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0"
          style={{ background: 'repeating-linear-gradient(135deg, #0B5BB3 0 16px, #0D6FDB 16px 32px)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(150deg, rgba(11,53,99,0.78), rgba(11,87,173,0.90))' }} />
        <div className="relative max-w-3xl mx-auto px-5 py-28 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-action-300 mb-5">{t.heroEyebrow}</p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5">
            {t.heroPre}
            <span className="text-action-300">{t.heroHi}</span>
            {t.heroPost}
          </h1>
          <p className="text-lg md:text-xl text-primary-200 max-w-xl mx-auto leading-relaxed">{t.heroSub}</p>
        </div>
      </section>

      {/* ── 2 · PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow={t.problemEyebrow} heading={t.problemHeading} sub={t.problemLead} />
          <div className="grid sm:grid-cols-3 gap-5 mt-12 mb-8">
            {t.problemStats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
          <p className="text-center text-lg md:text-2xl font-bold text-gray-900 leading-snug tracking-tight max-w-3xl mx-auto">
            {t.problemKicker}
          </p>
          <p className="text-center mt-5 text-xs text-gray-400 max-w-3xl mx-auto leading-relaxed">{t.problemSources}</p>
        </div>
      </section>

      {/* ── 3 · SOLUTION ──────────────────────────────────────────────────────── */}
      <section id="solution" className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow={t.solutionEyebrow} heading={t.solutionHeading} sub={t.solutionSub} />
          <div className="grid sm:grid-cols-3 gap-5 mt-12 mb-8">
            {t.solutionSteps.map((s, i) => (
              <div key={i} className="card p-7">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-full bg-sea-mist flex items-center justify-center text-2xl shrink-0">{s.icon}</span>
                  <span className="font-mono text-xs font-extrabold text-action">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {t.solutionFeatures.map((f) => <FeatureChip key={f} label={f} />)}
          </div>
        </div>
      </section>

      {/* ── 4 · MISSION & VISION ──────────────────────────────────────────────── */}
      <section className="py-20 px-5" style={{ background: 'linear-gradient(155deg, #0D6FDB, #0B3F7E)' }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-action-300 mb-8">{t.mvEyebrow}</p>
          <div className="grid sm:grid-cols-2 gap-7">
            {([
              [t.mvMissionLabel, t.mvMission],
              [t.mvVisionLabel, t.mvVision],
            ] as [string, string][]).map(([label, body]) => (
              <div key={label} className="rounded-3xl p-8 border border-white/15" style={{ background: 'rgba(255,255,255,0.07)' }}>
                <p className="text-xs font-bold uppercase tracking-widest text-action-300 mb-4">{label}</p>
                <p className="text-lg md:text-xl font-semibold text-white leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5 · WHY SUPPORT ───────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-sea-mist">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow={t.claims.eyebrow} heading={t.claims.heading} sub={t.claims.sub} />

          <div className="grid md:grid-cols-2 gap-5 mt-12 mb-10">
            {t.claims.items.map((claim, i) => (
              <ClaimCard
                key={claim.title}
                number={String(i + 1).padStart(2, '0')}
                title={claim.title}
                desc={claim.desc}
              />
            ))}
          </div>

          <div className="card p-8 text-center bg-white/80">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">{t.claims.partnersLabel}</p>
            <p className="text-sm text-gray-500 italic max-w-md mx-auto">{t.claims.partnersNote}</p>
          </div>
        </div>
      </section>

      {/* ── 6 · WHY PARTNER ───────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow={t.whyEyebrow} heading={t.whyHeading} sub={t.whySub} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {t.whyCards.map((c, i) => (
              <div
                key={i}
                className="card p-7 flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-12 rounded-2xl bg-sea-mist flex items-center justify-center text-2xl shrink-0">{c.icon}</span>
                  <h3 className="text-base font-bold text-primary leading-tight">{c.title}</h3>
                </div>
                <ul className="flex flex-col gap-2.5 flex-1 mb-5">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="text-action font-bold shrink-0">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={i === 2 ? '/region' : '#contact'}
                  className="self-start text-sm font-bold text-primary hover:text-primary-600 transition-colors inline-flex items-center gap-1"
                >
                  {i === 2 ? t.whyRegionLink : t.whyCta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 · OFFER ─────────────────────────────────────────────────────────── */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <SectionHead eyebrow={t.offerEyebrow} heading={t.offerHeading} sub={t.offerSub} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 mb-10">
            {t.offerItems.map((o, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-10 h-10 rounded-xl bg-action-50 flex items-center justify-center text-xl shrink-0">{o.icon}</span>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">{o.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>

          {/* independence & transparency block */}
          <div className="rounded-3xl p-9 text-white" style={{ background: '#031C36' }}>
            <div className="text-center max-w-2xl mx-auto mb-7">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-extrabold mb-2">{t.offerTransHeading}</h3>
              <p className="text-sm text-primary-200 leading-relaxed">{t.offerTransSub}</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {t.offerTransPoints.map((p, i) => (
                <div key={i} className="rounded-2xl p-4 flex gap-3 border border-white/10" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <span className="text-action-400 font-bold shrink-0">✓</span>
                  <span className="text-sm leading-relaxed" style={{ color: '#E8F0FA' }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8 · CONTACT ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-20 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionHead eyebrow={t.contactEyebrow} heading={t.contactHeading} sub={t.contactSub} />
          <div className="mt-10">
            <PartnerForm t={t} />
          </div>
          <p className="text-center mt-6 max-w-md mx-auto text-xs text-gray-500 leading-relaxed">{t.contactTrust}</p>
          <p className="text-center mt-3 text-sm text-gray-600">
            {t.contactAltIntro}{' '}
            <a
              href="mailto:partners@greececlean.gr"
              className="text-primary font-semibold font-mono hover:underline"
            >
              partners@greececlean.gr
            </a>
            <span className="text-gray-300 mx-2">·</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              {t.contactAltLinkedin}
            </a>
          </p>
        </div>
      </section>

    </div>
  )
}
