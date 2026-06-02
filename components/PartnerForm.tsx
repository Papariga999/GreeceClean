'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/i18n/types'

type Status = 'idle' | 'submitting' | 'success' | 'error'

type FormVals = {
  name: string
  org: string
  role: string
  email: string
  interest: string
  region: string
  message: string
  consent: boolean
  company: string // honeypot
}

type Errs = Partial<Record<keyof Omit<FormVals, 'company'>, string>>

const INITIAL: FormVals = {
  name: '', org: '', role: '', email: '', interest: '',
  region: '', message: '', consent: false, company: '',
}

function inputCls(bad: boolean) {
  return `w-full border rounded-2xl px-4 py-3 text-sm font-sans bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow ${bad ? 'border-red-500' : 'border-gray-300'}`
}

function ErrMsg({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1.5 text-xs text-red-600 font-medium">{msg}</p>
}

function Label({ htmlFor, text, optional }: { htmlFor: string; text: string; optional?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-700 mb-1.5">
      {text}
      {optional && <span className="text-gray-400 font-normal ml-1">· {optional}</span>}
    </label>
  )
}

export default function PartnerForm({ t }: { t: Dictionary['partners'] }) {

  const [status, setStatus] = useState<Status>('idle')
  const [vals, setVals] = useState<FormVals>(INITIAL)
  const [errs, setErrs] = useState<Errs>({})
  const [touched, setTouched] = useState(false)

  const set = (k: keyof FormVals, v: string | boolean) =>
    setVals((s) => ({ ...s, [k]: v }))

  function validate(): Errs {
    const e: Errs = {}
    if (!vals.name.trim()) e.name = t.formErrRequired
    if (!vals.org.trim()) e.org = t.formErrRequired
    if (!vals.email.trim()) {
      e.email = t.formErrRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email.trim())) {
      e.email = t.formErrEmail
    }
    if (!vals.interest) e.interest = t.formErrRequired
    if (!vals.message.trim()) e.message = t.formErrRequired
    if (!vals.consent) e.consent = t.formErrConsent
    return e
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    setTouched(true)
    const e = validate()
    setErrs(e)
    if (Object.keys(e).length) return

    // Honeypot tripped — silently "succeed" client-side
    if (vals.company) { setStatus('success'); return }

    setStatus('submitting')
    try {
      const res = await fetch('/api/partners/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vals.name.trim(),
          org: vals.org.trim(),
          role: vals.role.trim(),
          email: vals.email.trim(),
          interest: vals.interest,
          region: vals.region.trim(),
          message: vals.message.trim(),
          consent: vals.consent,
          company: vals.company,
        }),
      })
      if (!res.ok) throw new Error('error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  function reset() {
    setStatus('idle')
    setTouched(false)
    setVals(INITIAL)
    setErrs({})
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="card p-11 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-action-50 flex items-center justify-center mx-auto mb-5 text-3xl">✓</div>
        <h3 className="text-2xl font-extrabold text-primary mb-2">{t.formSuccessTitle}</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto mb-7">{t.formSuccessBody}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="/map" className="btn-primary text-sm px-6 py-2.5 rounded-2xl">{t.formSuccessBackMap}</a>
          <a href="/" className="bg-white border border-primary-200 text-primary-700 font-semibold text-sm px-6 py-2.5 rounded-2xl hover:bg-primary-50 transition-colors">{t.formSuccessExplore}</a>
        </div>
      </div>
    )
  }

  // ── Error state ──────────────────────────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className="card p-11 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 text-3xl">!</div>
        <h3 className="text-2xl font-extrabold text-primary mb-2">{t.formErrorTitle}</h3>
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto mb-2">{t.formErrorBody}</p>
        <a href="mailto:partners@greececlean.gr" className="text-sm font-semibold text-primary font-mono hover:underline block mb-7">
          partners@greececlean.gr
        </a>
        <button onClick={reset} className="btn-primary px-8 py-2.5 rounded-2xl text-sm">{t.formErrorRetry}</button>
      </div>
    )
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  const loading = status === 'submitting'

  return (
    <form onSubmit={submit} noValidate className="card p-7 max-w-lg mx-auto flex flex-col gap-4">

      {/* Name + Org */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pf-name" text={t.formName} />
          <input id="pf-name" type="text" value={vals.name} placeholder={t.formNamePh} disabled={loading}
            onChange={(e) => set('name', e.target.value)} className={inputCls(touched && !!errs.name)} />
          <ErrMsg msg={touched ? errs.name : undefined} />
        </div>
        <div>
          <Label htmlFor="pf-org" text={t.formOrg} />
          <input id="pf-org" type="text" value={vals.org} placeholder={t.formOrgPh} disabled={loading}
            onChange={(e) => set('org', e.target.value)} className={inputCls(touched && !!errs.org)} />
          <ErrMsg msg={touched ? errs.org : undefined} />
        </div>
      </div>

      {/* Role + Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pf-role" text={t.formRole} optional={t.formOptional} />
          <input id="pf-role" type="text" value={vals.role} placeholder={t.formRolePh} disabled={loading}
            onChange={(e) => set('role', e.target.value)} className={inputCls(false)} />
        </div>
        <div>
          <Label htmlFor="pf-email" text={t.formEmail} />
          <input id="pf-email" type="email" value={vals.email} placeholder={t.formEmailPh} disabled={loading}
            onChange={(e) => set('email', e.target.value)} className={inputCls(touched && !!errs.email)} />
          <ErrMsg msg={touched ? errs.email : undefined} />
        </div>
      </div>

      {/* Interest */}
      <div>
        <Label htmlFor="pf-interest" text={t.formInterest} />
        <div className="relative">
          <select id="pf-interest" value={vals.interest} disabled={loading}
            onChange={(e) => set('interest', e.target.value)}
            className={`${inputCls(touched && !!errs.interest)} appearance-none pr-9 ${vals.interest ? 'text-gray-900' : 'text-gray-400'} cursor-pointer`}
          >
            <option value="">{t.formInterestPh}</option>
            {t.formInterestOptions.map((o) => <option key={o} value={o} className="text-gray-900">{o}</option>)}
          </select>
          <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-xs">▼</span>
        </div>
        <ErrMsg msg={touched ? errs.interest : undefined} />
      </div>

      {/* Region */}
      <div>
        <Label htmlFor="pf-region" text={t.formRegion} optional={t.formOptional} />
        <input id="pf-region" type="text" value={vals.region} placeholder={t.formRegionPh} disabled={loading}
          onChange={(e) => set('region', e.target.value)} className={inputCls(false)} />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="pf-message" text={t.formMessage} />
        <textarea id="pf-message" rows={4} value={vals.message} placeholder={t.formMessagePh} disabled={loading}
          onChange={(e) => set('message', e.target.value.slice(0, 1000))}
          className={`${inputCls(touched && !!errs.message)} resize-y min-h-24`}
        />
        <ErrMsg msg={touched ? errs.message : undefined} />
      </div>

      {/* Honeypot — visually hidden */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor="pf-company">Company</label>
        <input id="pf-company" type="text" tabIndex={-1} autoComplete="off"
          value={vals.company} onChange={(e) => set('company', e.target.value)} />
      </div>

      {/* Consent */}
      <div>
        <label htmlFor="pf-consent" className="flex gap-2.5 items-start cursor-pointer text-xs text-gray-600 leading-relaxed">
          <input id="pf-consent" type="checkbox" checked={vals.consent} disabled={loading}
            onChange={(e) => set('consent', e.target.checked)}
            className="w-4 h-4 mt-0.5 accent-primary shrink-0 cursor-pointer" />
          <span>
            {t.formConsent}{' '}
            <a href="/privacy" className="text-primary font-semibold underline">{t.formConsentLink}</a>
          </span>
        </label>
        <ErrMsg msg={touched ? errs.consent : undefined} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-action mt-1 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-default"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
        )}
        {loading ? t.formSubmitting : t.formSubmit}
      </button>

    </form>
  )
}
