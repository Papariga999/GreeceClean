'use client'

import { useState, useEffect } from 'react'
import ShareSheet from './ShareSheet'

type Strings = {
  resolvedTitle: string      // "Καθαρίστηκε!"
  resolvedBy: string         // "{n} άτομα το κατάφεραν αυτό μαζί"
  resolvedShare: string      // "🎉 Μοιράσου τη νίκη"
  resolvedShareTitle: string // "Μοιράσου τη νίκη"
  copy: string
  copied: string
}

type Props = {
  url: string
  shareText: string
  total: number
  strings: Strings
}

// Confetti burst — client-only, runs once on mount
function Confetti() {
  const COLORS = ['#0D6FDB', '#39B24A', '#F59E0B', '#DC2626', '#1FA64B', '#7360F2']
  const bits = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: 30 + Math.random() * 40,
    delay: Math.random() * 0.3,
    dur: 1.1 + Math.random() * 0.7,
    rot: Math.random() * 720 - 360,
    dx: Math.random() * 140 - 70,
    dy: 220 + Math.random() * 380,
    size: 6 + Math.random() * 6,
    color: COLORS[i % COLORS.length],
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`@keyframes gc-fall{0%{transform:translate(0,-20px) rotate(0deg);opacity:1}100%{transform:translate(var(--dx),var(--dy)) rotate(var(--r));opacity:0}}`}</style>
      {bits.map(b => (
        <span
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.left}%`,
            top: 80,
            width: b.size,
            height: b.size * 0.5,
            background: b.color,
            borderRadius: 1,
            ['--dx' as string]: `${b.dx}px`,
            ['--dy' as string]: `${b.dy}px`,
            ['--r'  as string]: `${b.rot}deg`,
            animation: `gc-fall ${b.dur}s ${b.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
          }}
        />
      ))}
    </div>
  )
}

export default function ResolvedView({ url, shareText, total, strings: s }: Props) {
  const [confetti,   setConfetti]   = useState(true)
  const [sheetOpen,  setSheetOpen]  = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setConfetti(false), 2800)
    return () => clearTimeout(t)
  }, [])

  const [before, after] = s.resolvedBy.split('{n}')

  return (
    <>
      {confetti && <Confetti />}

      {/* Celebration header */}
      <div className="text-center py-4">
        <div className="text-5xl mb-2">🎉</div>
        <h2 className="text-2xl font-extrabold" style={{ color: '#15803D' }}>{s.resolvedTitle}</h2>
      </div>

      {/* Community credit card */}
      <div
        className="rounded-2xl p-4 text-center text-sm leading-relaxed"
        style={{ background: '#F2F5E8', color: '#405515' }}
      >
        {before}
        <strong style={{ color: '#0D6FDB' }}>{total}</strong>
        {after}
      </div>

      {/* Share the win */}
      <button
        onClick={() => setSheetOpen(true)}
        className="btn-action w-full rounded-2xl text-base"
      >
        {s.resolvedShare}
      </button>

      <ShareSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        url={url}
        shareText={shareText}
        strings={{ sheetTitle: s.resolvedShareTitle, copy: s.copy, copied: s.copied }}
      />
    </>
  )
}
