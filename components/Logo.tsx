const P = {
  color: { leaf: 'rgba(107,124,58,0.22)', leafStroke: '#6B7C3A', wave1: '#006994', wave2: 'rgba(0,144,196,0.40)', dot: '#0090C4', ring: 'rgba(0,144,196,0.28)' },
  white: { leaf: 'rgba(255,255,255,0.22)', leafStroke: '#FFFFFF', wave1: '#FFFFFF', wave2: 'rgba(255,255,255,0.45)', dot: '#FFFFFF', ring: 'rgba(255,255,255,0.30)' },
  ink:   { leaf: 'rgba(107,124,58,0.30)',  leafStroke: '#8A9A4D', wave1: '#0090C4', wave2: 'rgba(0,144,196,0.45)', dot: '#0090C4', ring: 'rgba(255,255,255,0.16)' },
}

export function BrandMark({
  size = 44,
  variant = 'color',
  ring = true,
}: {
  size?: number
  variant?: 'color' | 'white' | 'ink'
  ring?: boolean
}) {
  const p = P[variant]
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" role="img" aria-label="Katharos">
      {ring && <circle cx="60" cy="60" r="55" stroke={p.ring} strokeWidth="1" />}
      <path d="M18 72 Q30 60 42 72 Q54 84 66 72 Q78 60 90 72 Q100 81 102 75" stroke={p.wave1} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M22 80 Q34 68 46 80 Q58 92 70 80 Q82 68 94 80" stroke={p.wave2} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M60 20 C60 20 40 40 40 55 C40 66 49 74 60 74 C71 74 80 66 80 55 C80 40 60 20 60 20Z" fill={p.leaf} stroke={p.leafStroke} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="60" cy="55" r="3" fill={p.dot} />
    </svg>
  )
}

export function Logo({
  mark = 30,
  on = 'light',
}: {
  mark?: number
  on?: 'light' | 'blue' | 'ink'
}) {
  const onDark = on === 'blue' || on === 'ink'
  const variant = on === 'blue' ? 'white' : on === 'ink' ? 'ink' : 'color'
  const word = onDark ? '#FAFAF8' : '#1A1A2E'
  const a = on === 'blue' ? '#FFFFFF' : '#0090C4'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
      <BrandMark size={mark * 1.45} variant={variant} ring />
      <span style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: mark * 1.35, fontWeight: 300, letterSpacing: '0.16em', color: word }}>
        K<span style={{ color: a }}>a</span>tharos
      </span>
    </span>
  )
}

export default Logo
