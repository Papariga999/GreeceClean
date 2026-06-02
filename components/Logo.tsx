import Image from 'next/image'

type Variant = 'symbol' | 'white' | 'lockup'

const SRC: Record<Variant, string> = {
  symbol: '/brand/logo-symbol.png',
  white:  '/brand/logo-symbol-white.png',
  lockup: '/brand/logo-lockup.png',
}

// symbol natural ratio ≈ 221 × 301 (w × h)
type Props = { variant?: Variant; size?: number; priority?: boolean }

export default function Logo({ variant = 'symbol', size = 28, priority = false }: Props) {
  if (variant === 'lockup') {
    return (
      <Image
        src={SRC.lockup}
        alt="GreeceClean"
        width={Math.round(size * 3.1)}
        height={size}
        priority={priority}
      />
    )
  }
  const h = Math.round(size * (301 / 221))
  return (
    <Image
      src={SRC[variant]}
      alt="GreeceClean"
      width={size}
      height={h}
      priority={priority}
    />
  )
}
