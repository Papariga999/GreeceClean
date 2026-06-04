import Image from '@/app/(public)/r/[token]/opengraph-image'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

type Params = Promise<{ lang: string; token: string }>

function tokenParams(params: Params): Promise<{ token: string }> {
  return params.then(({ token }) => ({ token }))
}

export default function LocalizedImage({ params }: { params: Params }) {
  return Image({ params: tokenParams(params) })
}
