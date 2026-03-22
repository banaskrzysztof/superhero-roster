'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

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
        <h1 className="text-foreground mb-4 text-4xl font-bold">Something went wrong!</h1>
        <p className="text-foreground-muted mb-6">
          We encountered an unexpected error. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  )
}
