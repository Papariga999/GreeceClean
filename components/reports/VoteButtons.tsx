'use client'

import { useState, useEffect } from 'react'

type Strings = {
  title: string
  important: string
  importantSub: string
  stillThere: string
  stillThereSub: string
  peopleCare: string
}

type Props = {
  token: string
  initialVotes: number
  initialConfirmations: number
  strings: Strings
}

type StoredVote = { vote?: boolean; confirm?: boolean }

function SingleVoteBtn({
  voted,
  count,
  label,
  sub,
  icon,
  accent,
  accentBg,
  onClick,
}: {
  voted: boolean
  count: number
  label: string
  sub: string
  icon: string
  accent: string
  accentBg: string
  onClick: () => void
}) {
  const [pop, setPop] = useState(false)
  const handleClick = () => {
    if (voted) return
    setPop(true)
    setTimeout(() => setPop(false), 320)
    onClick()
  }
  return (
    <button
      onClick={handleClick}
      style={{
        flex: 1,
        background: voted ? accentBg : '#fff',
        border: `1.5px solid ${voted ? accent : '#E5E7EB'}`,
        borderRadius: 18,
        padding: '12px 10px',
        cursor: voted ? 'default' : 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        transition: 'background .15s, border-color .15s',
      }}
      aria-pressed={voted}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span
          style={{
            fontSize: 19,
            display: 'inline-block',
            transform: pop ? 'scale(1.4)' : 'scale(1)',
            transition: 'transform .28s cubic-bezier(.3,1.6,.5,1)',
          }}
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: accent,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {count}
        </span>
      </span>
      <span style={{ fontSize: 12, fontWeight: 700, color: voted ? accent : '#111827' }}>
        {label}
      </span>
      <span style={{ fontSize: 10.5, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.25 }}>
        {sub}
      </span>
    </button>
  )
}

export default function VoteButtons({ token, initialVotes, initialConfirmations, strings: s }: Props) {
  const [votes, setVotes] = useState(initialVotes)
  const [confs, setConfs] = useState(initialConfirmations)
  const [votedVote, setVotedVote] = useState(false)
  const [votedConf, setVotedConf] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`gc_voted_${token}`)
      if (stored) {
        const v = JSON.parse(stored) as StoredVote
        if (v.vote) setVotedVote(true)
        if (v.confirm) setVotedConf(true)
      }
    } catch { /* ignore */ }
  }, [token])

  const handle = async (type: 'vote' | 'confirm') => {
    const isVote = type === 'vote'
    if ((isVote && votedVote) || (!isVote && votedConf)) return

    // Optimistic update
    if (isVote) { setVotes(v => v + 1); setVotedVote(true) }
    else { setConfs(v => v + 1); setVotedConf(true) }

    // Persist locally
    try {
      const existing = JSON.parse(localStorage.getItem(`gc_voted_${token}`) ?? '{}') as StoredVote
      localStorage.setItem(`gc_voted_${token}`, JSON.stringify({ ...existing, [isVote ? 'vote' : 'confirm']: true }))
    } catch { /* ignore */ }

    // Fire and forget — failure is silent (optimistic counts remain)
    fetch(`/api/report/${token}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    }).catch(() => {})
  }

  const total = votes + confs
  const [before, after] = s.peopleCare.split('{n}')

  return (
    <div className="card p-4">
      <div className="flex gap-3">
        <SingleVoteBtn
          voted={votedVote}
          count={votes}
          label={s.important}
          sub={s.importantSub}
          icon="👍"
          accent="#0D6FDB"
          accentBg="#EAF2FC"
          onClick={() => handle('vote')}
        />
        <SingleVoteBtn
          voted={votedConf}
          count={confs}
          label={s.stillThere}
          sub={s.stillThereSub}
          icon="🔴"
          accent="#DC2626"
          accentBg="#FEE2E2"
          onClick={() => handle('confirm')}
        />
      </div>
      <p className="text-center text-sm text-gray-500 mt-3">
        {before}<strong className="text-primary">{total}</strong>{after}
      </p>
    </div>
  )
}
