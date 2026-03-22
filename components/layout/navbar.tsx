import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { ROUTES } from '@/constants/routes'
import HeartIcon from '@/assets/icons/heart.svg'

export function Navbar() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link
          href={ROUTES.HOME}
          className="text-foreground hover:text-brand-primary text-lg font-bold transition-colors"
        >
          Superhero Roster
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href={ROUTES.FAVORITES}
            className="text-foreground-muted hover:bg-background-subtle hover:text-foreground flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
          >
            <HeartIcon width={16} height={16} />
            <span>Favorites</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
