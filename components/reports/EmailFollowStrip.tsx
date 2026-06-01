'use client'

import { useState } from 'react'

type Strings = {
  title: string
  subtitle: string
  placeholder: string
  btn: string
  done: string
}

type Props = {
  token: string
  strings: Strings
}

export default function EmailFollowStrip({ token, strings: s }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [email, setEmail]       = useState('')
  const [done, setDone]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(false)

  if (done) {
    return (
      <div className="rounded-2xl bg-primary-50 px-4 py-3 text-center">
        <span className="text-sm font-semibold text-action">{s.done}</span>
      </div>
    )
  }

  const submit = async () => {
    if (!email.trim()) return
    setLoading(true)
    setError(false)
    try {
      const res = await fetch(`/api/report/${token}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (res.ok) {
        setDone(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-2xl bg-primary-50 p-4">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="flex w-full items-center gap-3 text-left"
        >
          <span className="text-xl">🔔</span>
          <span className="flex-1">
            <span className="block text-sm font-bold text-primary">{s.title}</span>
            <span className="block text-xs text-gray-500">{s.subtitle}</span>
          </span>
          <span className="text-lg text-primary">›</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(false) }}
              onKeyDown={e => { if (e.key === 'Enter') submit() }}
              placeholder={s.placeholder}
              className="gc-input flex-1 rounded-xl px-3 py-2.5 text-sm"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={submit}
              disabled={loading || !email.trim()}
              className="btn-primary rounded-xl px-4 py-2.5 text-sm disabled:opacity-50"
              aria-label={s.btn}
            >
              {s.btn}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-500 pl-1">
              ✗ {s.subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
