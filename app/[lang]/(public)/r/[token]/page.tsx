import TrackingPage, { generateMetadata as generateBaseMetadata } from '@/app/(public)/r/[token]/page'

type Params = Promise<{ lang: string; token: string }>

function tokenParams(params: Params): Promise<{ token: string }> {
  return params.then(({ token }) => ({ token }))
}

export function generateMetadata({ params }: { params: Params }) {
  return generateBaseMetadata({ params: tokenParams(params) })
}

export default function LocalizedTrackingPage({ params }: { params: Params }) {
  return <TrackingPage params={tokenParams(params)} />
}
