import ScorecardPage, { generateMetadata as generateBaseMetadata } from '@/app/(public)/scorecard/[id]/page'

type Params = Promise<{ id: string; lang: string }>

function idParams(params: Params): Promise<{ id: string }> {
  return params.then(({ id }) => ({ id }))
}

export function generateMetadata({ params }: { params: Params }) {
  return generateBaseMetadata({ params: idParams(params) })
}

export default function LocalizedScorecardPage({ params }: { params: Params }) {
  return <ScorecardPage params={idParams(params)} />
}
