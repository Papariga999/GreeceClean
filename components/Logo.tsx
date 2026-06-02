import Image from 'next/image'

type Variant = 'symbol' | 'white' | 'lockup'

const SRC: Record<Variant, string> = {
  symbol: '/brand/logo-symbol.png',
  white:  '/brand/logo-symbol-white.png',
  lockup: '/brand/logo-lockup.png',
}

const SYMBOL_RATIO = 301 / 221
const LOCKUP_RATIO = 1354 / 425

type Props = { variant?: Variant; size?: number; priority?: boolean }

export default function Logo({ variant = 'symbol', size = 28, priority = false }: Props) {
  if (variant === 'lockup') {
    return (
      <Image
        src={SRC.lockup}
        alt="GreeceClean"
        width={Math.round(size * LOCKUP_RATIO)}
        height={size}
        priority={priority}
      />
    )
  }
  const h = Math.round(size * SYMBOL_RATIO)
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
