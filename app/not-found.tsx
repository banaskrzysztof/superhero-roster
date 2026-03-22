import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/constants/routes'

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4 px-4 text-center">
        <h1 className="text-brand-primary text-6xl font-bold">404</h1>
        <h2 className="text-foreground text-2xl font-semibold">Hero not found</h2>
        <p className="text-foreground-muted">Looks like this hero has gone into hiding.</p>
        <Link href={ROUTES.HOME}>
          <Button>Back to roster</Button>
        </Link>
      </div>
    </main>
  )
}
