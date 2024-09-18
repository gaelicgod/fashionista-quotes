import { Suspense } from 'react'
import { FashionQuoteGeneratorClient } from '@/components/FashionQuoteGeneratorClient'
import { FashionQuoteSkeleton } from '@/components/FashionQuoteSkeleton'

export default function Page() {
  return (
    <Suspense fallback={<FashionQuoteSkeleton />}>
      <FashionQuoteGeneratorClient />
    </Suspense>
  )
}