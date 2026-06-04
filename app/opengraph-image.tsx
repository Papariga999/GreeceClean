import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime     = 'nodejs'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  const lockupBuf  = readFileSync(join(process.cwd(), 'public/brand/logo-lockup.png'))
  const lockupSrc  = `data:image/png;base64,${lockupBuf.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          background: '#006994',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={lockupSrc} width={820} alt="GreeceClean" />
      </div>
    ),
    { ...size },
  )
}
