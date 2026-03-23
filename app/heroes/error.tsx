'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-foreground mb-4 text-4xl font-bold">Failed to load heroes</h1>
        <p className="text-foreground-muted mb-6">
          We couldn&#39;t load the heroes data. Please try again.
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link href={ROUTES.HOME}>
            <Button variant="secondary">Go home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
