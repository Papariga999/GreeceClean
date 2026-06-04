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

function seededRatio(id: number, salt: number): number {
  const value = Math.sin(id * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

// Confetti burst — client-only, runs once on mount
function Confetti() {
  const COLORS = ['#006994', '#6B7C3A', '#C9A96E', '#9A3517', '#C57A3C', '#7360F2']
  const bits = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: 30 + seededRatio(i, 1) * 40,
    delay: seededRatio(i, 2) * 0.3,
    dur: 1.1 + seededRatio(i, 3) * 0.7,
    rot: seededRatio(i, 4) * 720 - 360,
    dx: seededRatio(i, 5) * 140 - 70,
    dy: 220 + seededRatio(i, 6) * 380,
    size: 6 + seededRatio(i, 7) * 6,
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
        style={{ background: '#E3EAD2', color: '#495427' }}
      >
        {before}
        <strong style={{ color: '#006994' }}>{total}</strong>
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
